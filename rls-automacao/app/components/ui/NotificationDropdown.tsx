// components/ui/NotificationDropdown.tsx - ATUALIZADO COM PONTO
import React, { useRef, useEffect, useState } from 'react';
import { ChevronRight, Clock, Info, CheckCircle, AlertCircle, Receipt, Eye } from 'lucide-react';
import { api, Despesa } from '@/lib/api';
import { pontoAPI, PontoMensal } from '@/lib/pontoApi';
import Link from 'next/link';

interface Notification {
  id: string;
  message: string;
  type: 'info' | 'success' | 'warning' | 'error' | 'ponto';
  timestamp: Date;
  read: boolean;
  despesa?: Despesa;
  ponto?: PontoMensal;
  user?: {
    nomecompleto: string;
    email: string;
  };
}

interface NotificationDropdownProps {
  isOpen: boolean;
  onClose: () => void;
  currentUser: any; // Recebe o usuário do layout
}

export default function NotificationDropdown({
  isOpen,
  onClose,
  currentUser,
}: NotificationDropdownProps) {
  const dropdownRef = useRef<HTMLDivElement>(null);
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [loading, setLoading] = useState(false);

  // Buscar notificações quando abrir
  useEffect(() => {
    if (isOpen && currentUser) {
      fetchNotifications();
    }
  }, [isOpen, currentUser]);

  // Fecha ao clicar fora
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        onClose();
      }
    }
    
    const timeoutId = setTimeout(() => {
      if (isOpen) {
        document.addEventListener('mousedown', handleClickOutside);
      }
    }, 100);

    return () => {
      clearTimeout(timeoutId);
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen, onClose]);

  const fetchNotifications = async () => {
    try {
      setLoading(true);
      
      const isAdmin = currentUser?.cargo === 'Gestor' || 
                     currentUser?.role?.type === 'administrator' ||
                     currentUser?.username === 'admin';

      // Buscar dados em paralelo
      const [despesasResponse, pontosResponse] = await Promise.all([
        api.getDespesas().catch(() => ({ data: [] })),
        pontoAPI.buscarPontos(isAdmin, currentUser.id).catch(() => [])
      ]);

      const despesas = despesasResponse.data || [];
      const pontos = pontosResponse || [];
      
      let novasNotificacoes: Notification[] = [];

      if (isAdmin) {
        // ADMIN: Pendências para aprovar
        const despesasPendentes = despesas.filter((d: Despesa) => 
          d.status === 'pendente' && d.users_permissions_user?.id !== currentUser.id
        );

        const pontosPendentes = pontos.filter((p: PontoMensal) => 
          p.status === 'pendente' && p.funcionario.id !== currentUser.id
        );

        novasNotificacoes = [
          ...despesasPendentes.map((despesa: Despesa) => ({
            id: `despesa-${despesa.id}`,
            message: `Nova despesa: ${despesa.descricao}`,
            type: 'warning' as const,
            timestamp: new Date(despesa.createdAt),
            read: false,
            despesa,
            user: {
              nomecompleto: despesa.users_permissions_user?.nomecompleto || '',
              email: despesa.users_permissions_user?.email || ''
            }
          })),
          ...pontosPendentes.map((ponto: PontoMensal) => ({
            id: `ponto-${ponto.id}`,
            message: `Novo ponto: ${ponto.mes}/${ponto.ano} (${ponto.total_horas}h)`,
            type: 'ponto' as const,
            timestamp: new Date(ponto.createdAt),
            read: false,
            ponto,
            user: {
              nomecompleto: ponto.funcionario.nomecompleto,
              email: ponto.funcionario.email
            }
          }))
        ];
      } else {
        // FUNCIONÁRIO: Aprovações recentes
        const ontemData = new Date();
        ontemData.setDate(ontemData.getDate() - 1);

        const minhasDespesas = despesas.filter((d: Despesa) => 
          d.users_permissions_user?.id === currentUser.id &&
          new Date(d.updatedAt) > ontemData &&
          (d.status === 'aprovada' || d.status === 'rejeitada')
        );

        const meusPontos = pontos.filter((p: PontoMensal) => 
          p.funcionario.id === currentUser.id &&
          new Date(p.updatedAt) > ontemData &&
          p.status === 'aprovado'
        );

        novasNotificacoes = [
          ...minhasDespesas.map((despesa: Despesa) => ({
            id: `despesa-${despesa.id}`,
            message: `Despesa ${despesa.status}: ${despesa.descricao}`,
            type: despesa.status === 'aprovada' ? 'success' as const : 'error' as const,
            timestamp: new Date(despesa.updatedAt),
            read: false,
            despesa
          })),
          ...meusPontos.map((ponto: PontoMensal) => ({
            id: `ponto-${ponto.id}`,
            message: `Ponto aprovado: ${ponto.mes}/${ponto.ano}`,
            type: 'ponto' as const,
            timestamp: new Date(ponto.updatedAt),
            read: false,
            ponto
          }))
        ];
      }

      novasNotificacoes.sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime());
      setNotifications(novasNotificacoes);

    } catch (error) {
      console.error('❌ Erro ao buscar notificações:', error);
    } finally {
      setLoading(false);
    }
  };

  const getTypeIcon = (type: Notification['type']) => {
    switch (type) {
      case 'warning':
        return <AlertCircle className="w-4 h-4 text-yellow-500" />;
      case 'success':
        return <CheckCircle className="w-4 h-4 text-green-500" />;
      case 'error':
        return <Receipt className="w-4 h-4 text-red-500" />;
      case 'ponto':
        return <Clock className="w-4 h-4 text-blue-500" />;
      default:
        return <Info className="w-4 h-4 text-gray-500" />;
    }
  };

  const formatTimestamp = (timestamp: Date) => {
    const now = new Date();
    const diffMs = now.getTime() - timestamp.getTime();
    const diffMinutes = Math.round(diffMs / (1000 * 60));
    const diffHours = Math.round(diffMs / (1000 * 60 * 60));
    const diffDays = Math.round(diffMs / (1000 * 60 * 60 * 24));

    if (diffMinutes < 1) return 'Agora mesmo';
    if (diffMinutes < 60) return `${diffMinutes} min atrás`;
    if (diffHours < 24) return `${diffHours} hr${diffHours > 1 ? 's' : ''} atrás`;
    if (diffDays < 7) return `${diffDays} dia${diffDays > 1 ? 's' : ''} atrás`;
    return timestamp.toLocaleDateString('pt-BR');
  };

  const handleMarkAsRead = (id: string) => {
    setNotifications(prev => 
      prev.map(n => n.id === id ? { ...n, read: true } : n)
    );
  };

  if (!isOpen) return null;

  return (
    <div
      ref={dropdownRef}
      className="absolute right-0 mt-2 w-80 bg-white rounded-xl shadow-xl border border-gray-200/50 py-2 origin-top-right transform transition-all duration-200 ease-out z-50"
    >
      <div className="px-4 py-2 border-b border-gray-100 flex justify-between items-center">
        <h3 className="text-sm font-semibold text-gray-900">Notificações</h3>
        <span className="text-xs text-gray-500">
          {notifications.filter(n => !n.read).length} não lidas
        </span>
      </div>
      
      <div className="max-h-80 overflow-y-auto">
        {loading ? (
          <div className="p-4 text-center">
            <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-primary-600 mx-auto mb-2"></div>
            <p className="text-sm text-gray-600">Carregando...</p>
          </div>
        ) : notifications.length === 0 ? (
          <p className="text-center text-sm text-gray-500 py-4 px-4">
            Nenhuma notificação por enquanto.
          </p>
        ) : (
          <ul>
            {notifications.map((notification) => (
              <li
                key={notification.id}
                className={`flex items-start p-4 border-b border-gray-100 last:border-b-0 ${
                  !notification.read ? 'bg-blue-50 hover:bg-blue-100' : 'hover:bg-gray-50'
                } transition-colors duration-150 cursor-pointer`}
                onClick={() => handleMarkAsRead(notification.id)}
              >
                <div className="flex-shrink-0 mt-1 mr-3">
                  {getTypeIcon(notification.type)}
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-900">{notification.message}</p>
                  {notification.user && (
                    <p className="text-xs text-gray-600 mt-0.5">
                      De: {notification.user.nomecompleto} ({notification.user.email})
                    </p>
                  )}
                  <p className="text-xs text-gray-500 mt-1 flex items-center">
                    <Clock className="w-3 h-3 mr-1" />
                    {formatTimestamp(notification.timestamp)}
                  </p>
                  
                  {/* Link para detalhes */}
                  <div className="mt-2">
                    <Link href={notification.despesa ? "/dashboard/despesas" : "/dashboard/ponto"}>
                      <button
                        onClick={onClose}
                        className="text-xs text-primary-600 hover:text-primary-700 font-medium flex items-center space-x-1"
                      >
                        <Eye className="w-3 h-3" />
                        <span>Ver detalhes</span>
                      </button>
                    </Link>
                  </div>
                </div>
                {!notification.read && (
                  <div className="flex-shrink-0 w-2 h-2 bg-primary-500 rounded-full ml-2 mt-1.5 animate-pulse"></div>
                )}
              </li>
            ))}
          </ul>
        )}
      </div>
      
      {notifications.length > 0 && (
        <div className="px-4 py-2 border-t border-gray-100 space-y-1">
          <Link href="/dashboard/despesas">
            <button
              onClick={onClose}
              className="w-full text-center text-sm text-primary-600 hover:text-primary-700 font-medium py-1 rounded-md transition-colors duration-200"
            >
              Ver todas as despesas
            </button>
          </Link>
          <Link href="/dashboard/ponto">
            <button
              onClick={onClose}
              className="w-full text-center text-sm text-blue-600 hover:text-blue-700 font-medium py-1 rounded-md transition-colors duration-200"
            >
              Ver registros de ponto
            </button>
          </Link>
        </div>
      )}
    </div>
  );
}