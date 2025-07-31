// components/NotificationBell.tsx - INTELIGENTE COM AUTO-DISMISS
'use client';

import { useState, useEffect, useRef } from 'react';
import { Bell, AlertCircle, Receipt, Eye, Clock, X, Check } from 'lucide-react';
import { api, Despesa } from '@/lib/api';
import { pontoAPI, PontoMensal } from '@/lib/pontoApi';
import Link from 'next/link';

interface Notification {
  id: string;
  tipo: 'despesa_pendente' | 'despesa_aprovada' | 'despesa_rejeitada' | 'ponto_pendente' | 'ponto_aprovado';
  titulo: string;
  descricao: string;
  data: string;
  despesa?: Despesa;
  ponto?: PontoMensal;
  lida: boolean;
}

interface NotificationBellProps {
  user: any;
}

export default function NotificationBell({ user }: NotificationBellProps) {
  const [notificacoes, setNotificacoes] = useState<Notification[]>([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const [loading, setLoading] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const isAdmin = user?.cargo === 'Gestor' || 
                  user?.role?.type === 'administrator' ||
                  user?.username === 'admin';

  // SISTEMA DE CACHE DE NOTIFICAÇÕES LIDAS
  const getReadNotifications = (): string[] => {
    try {
      const stored = localStorage.getItem(`readNotifications_${user?.id}`);
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  };

  const markAsRead = (notificationId: string) => {
    try {
      const readIds = getReadNotifications();
      if (!readIds.includes(notificationId)) {
        readIds.push(notificationId);
        localStorage.setItem(`readNotifications_${user?.id}`, JSON.stringify(readIds));
      }
    } catch (error) {
      console.error('Erro ao marcar como lida:', error);
    }
  };

  const markAllAsRead = () => {
    try {
      const allIds = notificacoes.map(n => n.id);
      localStorage.setItem(`readNotifications_${user?.id}`, JSON.stringify(allIds));
      setNotificacoes(prev => prev.map(n => ({ ...n, lida: true })));
    } catch (error) {
      console.error('Erro ao marcar todas como lidas:', error);
    }
  };

  useEffect(() => {
    if (user) {
      fetchNotifications();
      // REFRESH MAIS FREQUENTE: A CADA 10 SEGUNDOS
      const interval = setInterval(fetchNotifications, 10000);
      return () => clearInterval(interval);
    }
  }, [user]);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setShowDropdown(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const fetchNotifications = async () => {
    if (!user) return;

    try {
      setLoading(true);
      
      const [despesasResponse, pontosResponse] = await Promise.all([
        api.getDespesas().catch(() => ({ data: [] })),
        pontoAPI.buscarPontos(isAdmin, user.id).catch(() => [])
      ]);
      
      const despesas = despesasResponse.data || [];
      const pontos = pontosResponse || [];
      const readIds = getReadNotifications();
      
      let novasNotificacoes: Notification[] = [];

      if (isAdmin) {
        // ADMIN: Pendências para aprovar
        const despesasPendentes = despesas.filter((d: Despesa) => 
          d.status === 'pendente' && d.users_permissions_user?.id !== user.id
        );

        const pontosPendentes = pontos.filter((p: PontoMensal) => 
          p.status === 'pendente' && p.funcionario.id !== user.id
        );

        novasNotificacoes = [
          ...despesasPendentes.map((despesa: Despesa) => ({
            id: `despesa-pendente-${despesa.id}`,
            tipo: 'despesa_pendente' as const,
            titulo: 'Nova despesa para aprovação',
            descricao: `${despesa.users_permissions_user?.nomecompleto} - ${despesa.descricao}`,
            data: despesa.createdAt,
            despesa,
            lida: readIds.includes(`despesa-pendente-${despesa.id}`)
          })),
          ...pontosPendentes.map((ponto: PontoMensal) => ({
            id: `ponto-pendente-${ponto.id}`,
            tipo: 'ponto_pendente' as const,
            titulo: 'Novo ponto para aprovação',
            descricao: `${ponto.funcionario.nomecompleto} - ${ponto.mes}/${ponto.ano} (${ponto.total_horas}h)`,
            data: ponto.createdAt,
            ponto,
            lida: readIds.includes(`ponto-pendente-${ponto.id}`)
          }))
        ];
      } else {
        // FUNCIONÁRIO: Aprovações nas últimas 48h (aumentado para dar tempo de ver)
        const cutoffDate = new Date();
        cutoffDate.setHours(cutoffDate.getHours() - 48); // 48 horas

        const minhasDespesas = despesas.filter((d: Despesa) => 
          d.users_permissions_user?.id === user.id &&
          new Date(d.updatedAt) > cutoffDate &&
          (d.status === 'aprovada' || d.status === 'rejeitada')
        );

        const meusPontos = pontos.filter((p: PontoMensal) => 
          p.funcionario.id === user.id &&
          new Date(p.updatedAt) > cutoffDate &&
          p.status === 'aprovado'
        );

        novasNotificacoes = [
          ...minhasDespesas.map((despesa: Despesa) => ({
            id: `despesa-${despesa.status}-${despesa.id}`,
            tipo: despesa.status === 'aprovada' ? 'despesa_aprovada' as const : 'despesa_rejeitada' as const,
            titulo: despesa.status === 'aprovada' ? 'Despesa aprovada' : 'Despesa rejeitada',
            descricao: despesa.descricao,
            data: despesa.updatedAt,
            despesa,
            lida: readIds.includes(`despesa-${despesa.status}-${despesa.id}`)
          })),
          ...meusPontos.map((ponto: PontoMensal) => ({
            id: `ponto-aprovado-${ponto.id}`,
            tipo: 'ponto_aprovado' as const,
            titulo: 'Ponto aprovado',
            descricao: `${ponto.mes}/${ponto.ano} - ${ponto.total_horas}h aprovadas`,
            data: ponto.updatedAt,
            ponto,
            lida: readIds.includes(`ponto-aprovado-${ponto.id}`)
          }))
        ];
      }

      // FILTRAR APENAS NÃO LIDAS - LIDAS SOMEM COMPLETAMENTE
      const filteredNotifications = novasNotificacoes.filter(notif => !notif.lida);

      filteredNotifications.sort((a, b) => new Date(b.data).getTime() - new Date(a.data).getTime());
      setNotificacoes(filteredNotifications);
      
    } catch (error) {
      console.error('❌ Erro ao buscar notificações:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleNotificationClick = (notificacao: Notification) => {
    // MARCA COMO LIDA E REMOVE DA LISTA IMEDIATAMENTE
    markAsRead(notificacao.id);
    setNotificacoes(prev => prev.filter(n => n.id !== notificacao.id));
  };

  const handleViewDetails = (notificacao: Notification) => {
    handleNotificationClick(notificacao);
    setShowDropdown(false);
  };

  const dismissNotification = (notificationId: string, event: React.MouseEvent) => {
    event.stopPropagation();
    markAsRead(notificationId);
    setNotificacoes(prev => prev.filter(n => n.id !== notificationId));
  };

  const getNotificationIcon = (tipo: string) => {
    switch (tipo) {
      case 'despesa_pendente':
        return <AlertCircle className="w-4 h-4 text-yellow-600" />;
      case 'despesa_aprovada':
        return <Receipt className="w-4 h-4 text-green-600" />;
      case 'despesa_rejeitada':
        return <Receipt className="w-4 h-4 text-red-600" />;
      case 'ponto_pendente':
        return <Clock className="w-4 h-4 text-orange-600" />;
      case 'ponto_aprovado':
        return <Clock className="w-4 h-4 text-blue-600" />;
      default:
        return <Bell className="w-4 h-4 text-gray-600" />;
    }
  };

  const formatRelativeTime = (dateString: string) => {
    const now = new Date();
    const date = new Date(dateString);
    const diffInMinutes = Math.floor((now.getTime() - date.getTime()) / (1000 * 60));
    
    if (diffInMinutes < 1) return 'Agora mesmo';
    if (diffInMinutes < 60) return `${diffInMinutes}m atrás`;
    
    const diffInHours = Math.floor(diffInMinutes / 60);
    if (diffInHours < 24) return `${diffInHours}h atrás`;
    
    const diffInDays = Math.floor(diffInHours / 24);
    return `${diffInDays}d atrás`;
  };

  const naoLidas = notificacoes.filter(n => !n.lida).length;

  return (
    <div className="relative" ref={dropdownRef}>
      {/* Bell Icon */}
      <button
        onClick={() => setShowDropdown(!showDropdown)}
        className="relative p-3 rounded-xl text-gray-600 hover:text-gray-800 hover:bg-gray-100 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-opacity-50"
        aria-label="Notificações"
      >
        <Bell className={`w-6 h-6 ${naoLidas > 0 ? 'text-red-500 animate-pulse' : ''}`} />
        
        {naoLidas > 0 && (
          <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-medium">
            {naoLidas > 9 ? '9+' : naoLidas}
          </span>
        )}
      </button>

      {/* Dropdown */}
      {showDropdown && (
        <div className="absolute right-0 mt-2 w-96 bg-white rounded-xl shadow-xl border border-gray-200 z-50 max-h-96 overflow-hidden">
          
          {/* Header */}
          <div className="p-4 border-b border-gray-100">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold text-gray-900">Notificações</h3>
              <div className="flex items-center space-x-2">
                {naoLidas > 0 && (
                  <button
                    onClick={markAllAsRead}
                    className="text-xs text-primary-600 hover:text-primary-700 font-medium flex items-center space-x-1"
                  >
                    <Check className="w-3 h-3" />
                    <span>Marcar todas</span>
                  </button>
                )}
                <button
                  onClick={() => setShowDropdown(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>
            {naoLidas > 0 && (
              <p className="text-sm text-gray-600 mt-1">
                {naoLidas} {naoLidas === 1 ? 'nova notificação' : 'novas notificações'}
              </p>
            )}
          </div>

          {/* Lista de Notificações */}
          <div className="max-h-80 overflow-y-auto">
            {loading ? (
              <div className="p-6 text-center">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-600 mx-auto"></div>
                <p className="text-gray-600 mt-2">Carregando...</p>
              </div>
            ) : notificacoes.length === 0 ? (
              <div className="p-6 text-center">
                <Bell className="w-12 h-12 text-gray-300 mx-auto mb-2" />
                <p className="text-gray-600">Nenhuma notificação</p>
              </div>
            ) : (
              <div className="divide-y divide-gray-100">
                {notificacoes.map((notificacao) => (
                  <div
                    key={notificacao.id}
                    className={`p-4 hover:bg-gray-50 transition-colors relative ${
                      !notificacao.lida ? 'bg-blue-50 border-l-4 border-l-blue-500' : 'opacity-75'
                    }`}
                    onClick={() => handleNotificationClick(notificacao)}
                  >
                    <div className="flex items-start space-x-3">
                      <div className="flex-shrink-0 mt-1">
                        {getNotificationIcon(notificacao.tipo)}
                      </div>
                      
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between">
                          <p className={`text-sm font-medium truncate ${
                            !notificacao.lida ? 'text-gray-900' : 'text-gray-600'
                          }`}>
                            {notificacao.titulo}
                          </p>
                          <div className="flex items-center space-x-2 ml-2">
                            <span className="text-xs text-gray-500">
                              {formatRelativeTime(notificacao.data)}
                            </span>
                            <button
                              onClick={(e) => dismissNotification(notificacao.id, e)}
                              className="opacity-0 group-hover:opacity-100 hover:bg-gray-200 rounded-full p-1 transition-opacity"
                            >
                              <X className="w-3 h-3 text-gray-400" />
                            </button>
                          </div>
                        </div>
                        
                        <p className={`text-sm mt-1 line-clamp-2 ${
                          !notificacao.lida ? 'text-gray-700' : 'text-gray-500'
                        }`}>
                          {notificacao.descricao}
                        </p>
                        
                        <div className="mt-2">
                          <Link href={notificacao.despesa ? "/dashboard/despesas" : "/dashboard/ponto"}>
                            <button
                              onClick={() => handleViewDetails(notificacao)}
                              className="text-xs text-primary-600 hover:text-primary-700 font-medium flex items-center space-x-1"
                            >
                              <Eye className="w-3 h-3" />
                              <span>Ver detalhes</span>
                            </button>
                          </Link>
                        </div>
                      </div>

                      {!notificacao.lida && (
                        <div className="flex-shrink-0 w-2 h-2 bg-blue-500 rounded-full ml-2 mt-1.5"></div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Footer */}
          {notificacoes.length > 0 && (
            <div className="p-4 border-t border-gray-100 space-y-2">
              <Link href="/dashboard/despesas">
                <button
                  onClick={() => setShowDropdown(false)}
                  className="w-full text-center text-sm text-primary-600 hover:text-primary-700 font-medium py-1"
                >
                  Ver todas as despesas
                </button>
              </Link>
              <Link href="/dashboard/ponto">
                <button
                  onClick={() => setShowDropdown(false)}
                  className="w-full text-center text-sm text-blue-600 hover:text-blue-700 font-medium py-1"
                >
                  Ver registros de ponto
                </button>
              </Link>
            </div>
          )}
        </div>
      )}
    </div>
  );
}