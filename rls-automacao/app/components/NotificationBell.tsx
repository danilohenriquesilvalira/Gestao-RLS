// components/NotificationBell.tsx
'use client';

import { useState, useEffect } from 'react';
import { Bell, AlertCircle, Receipt, Eye } from 'lucide-react';
import { api, Despesa } from '@/lib/api';
import { useAuth } from '@/hooks/useAuth';
import Link from 'next/link';

interface Notification {
  id: string;
  tipo: 'despesa_pendente' | 'despesa_aprovada' | 'despesa_rejeitada';
  titulo: string;
  descricao: string;
  data: string;
  despesa?: Despesa;
  lida: boolean;
}

export default function NotificationBell() {
  const { user, isAdmin } = useAuth();
  const [notificacoes, setNotificacoes] = useState<Notification[]>([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (user) {
      fetchNotifications();
      
      // Atualizar notificações a cada 30 segundos
      const interval = setInterval(fetchNotifications, 30000);
      return () => clearInterval(interval);
    }
  }, [user, isAdmin]);

  const fetchNotifications = async () => {
    if (!user) return;

    try {
      setLoading(true);
      
      const response = await api.getDespesas();
      const despesas = response.data || [];
      
      let novasNotificacoes: Notification[] = [];

      if (isAdmin) {
        // Notificações para admin: despesas pendentes de todos os funcionários
        const despesasPendentes = despesas.filter((d: Despesa) => 
          d.status === 'pendente' && d.users_permissions_user?.id !== user.id
        );

        novasNotificacoes = despesasPendentes.map((despesa: Despesa) => ({
          id: `despesa-pendente-${despesa.id}`,
          tipo: 'despesa_pendente' as const,
          titulo: 'Nova despesa para aprovação',
          descricao: `${despesa.users_permissions_user?.nomecompleto} - ${despesa.descricao}`,
          data: despesa.createdAt,
          despesa,
          lida: false
        }));
      } else {
        // Notificações para funcionário: status das suas despesas
        const minhasDespesas = despesas.filter((d: Despesa) => 
          d.users_permissions_user?.id === user.id
        );

        // Despesas aprovadas/rejeitadas recentemente (últimas 24h)
        const ontemData = new Date();
        ontemData.setDate(ontemData.getDate() - 1);

        novasNotificacoes = minhasDespesas
          .filter((despesa: Despesa) => {
            const updatedAt = new Date(despesa.updatedAt);
            return updatedAt > ontemData && 
                   (despesa.status === 'aprovada' || despesa.status === 'rejeitada');
          })
          .map((despesa: Despesa) => ({
            id: `despesa-${despesa.status}-${despesa.id}`,
            tipo: despesa.status === 'aprovada' ? 'despesa_aprovada' as const : 'despesa_rejeitada' as const,
            titulo: despesa.status === 'aprovada' ? 'Despesa aprovada' : 'Despesa rejeitada',
            descricao: despesa.descricao,
            data: despesa.updatedAt,
            despesa,
            lida: false
          }));
      }

      setNotificacoes(novasNotificacoes);
      
    } catch (error) {
      console.error('❌ Erro ao buscar notificações:', error);
    } finally {
      setLoading(false);
    }
  };

  const getNotificationIcon = (tipo: string) => {
    switch (tipo) {
      case 'despesa_pendente':
        return <AlertCircle className="w-4 h-4 text-yellow-600" />;
      case 'despesa_aprovada':
        return <Receipt className="w-4 h-4 text-green-600" />;
      case 'despesa_rejeitada':
        return <Receipt className="w-4 h-4 text-red-600" />;
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
    <div className="relative">
      {/* Bell Icon */}
      <button
        onClick={() => setShowDropdown(!showDropdown)}
        className="relative p-2 text-gray-600 hover:text-gray-900 transition-colors"
      >
        <Bell className="w-6 h-6" />
        
        {/* Badge de notificações não lidas */}
        {naoLidas > 0 && (
          <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-medium">
            {naoLidas > 9 ? '9+' : naoLidas}
          </span>
        )}
      </button>

      {/* Dropdown */}
      {showDropdown && (
        <div className="absolute right-0 mt-2 w-96 bg-white rounded-xl shadow-xl border border-gray-200 z-50 max-h-96 overflow-y-auto">
          
          {/* Header */}
          <div className="p-4 border-b border-gray-100">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold text-gray-900">Notificações</h3>
              <button
                onClick={() => setShowDropdown(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                ✕
              </button>
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
                    className={`p-4 hover:bg-gray-50 transition-colors ${
                      !notificacao.lida ? 'bg-blue-50' : ''
                    }`}
                  >
                    <div className="flex items-start space-x-3">
                      <div className="flex-shrink-0 mt-1">
                        {getNotificationIcon(notificacao.tipo)}
                      </div>
                      
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between">
                          <p className="text-sm font-medium text-gray-900 truncate">
                            {notificacao.titulo}
                          </p>
                          <span className="text-xs text-gray-500 ml-2">
                            {formatRelativeTime(notificacao.data)}
                          </span>
                        </div>
                        
                        <p className="text-sm text-gray-600 mt-1 line-clamp-2">
                          {notificacao.descricao}
                        </p>
                        
                        {notificacao.despesa && (
                          <div className="mt-2">
                            <Link href="/dashboard/despesas">
                              <button
                                onClick={() => setShowDropdown(false)}
                                className="text-xs text-primary-600 hover:text-primary-700 font-medium flex items-center space-x-1"
                              >
                                <Eye className="w-3 h-3" />
                                <span>Ver detalhes</span>
                              </button>
                            </Link>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Footer */}
          {notificacoes.length > 0 && (
            <div className="p-4 border-t border-gray-100">
              <Link href="/dashboard/despesas">
                <button
                  onClick={() => setShowDropdown(false)}
                  className="w-full text-center text-sm text-primary-600 hover:text-primary-700 font-medium"
                >
                  Ver todas as despesas
                </button>
              </Link>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

// Adicionar ao layout do dashboard
// app/dashboard/layout.tsx - Adicionar o componente no header

// No header do layout, adicione:
/*
import NotificationBell from '@/components/NotificationBell';

// Dentro do header:
<div className="flex items-center space-x-4">
  <NotificationBell />
  <div className="flex items-center space-x-2">
    <UserIcon className="w-8 h-8 text-gray-600" />
    <span className="text-sm font-medium text-gray-700">{user?.nomecompleto}</span>
  </div>
  <button onClick={handleLogout} className="text-gray-600 hover:text-gray-900">
    <LogOut className="w-5 h-5" />
  </button>
</div>
*/