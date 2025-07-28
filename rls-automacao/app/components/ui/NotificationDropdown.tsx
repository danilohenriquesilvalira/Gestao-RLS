// rls-automacao/app/components/ui/NotificationDropdown.tsx
import React, { useRef, useEffect } from 'react';
import { ChevronRight, Clock, Info, CheckCircle } from 'lucide-react'; // Ícones para tipos de notificação

interface Notification {
  id: string;
  message: string;
  type: 'info' | 'success' | 'warning' | 'error'; // Exemplo de tipos
  timestamp: Date;
  read: boolean;
  user?: { // Adiciona informações do usuário, se aplicável
    nomecompleto: string;
    email: string;
  };
}

interface NotificationDropdownProps {
  notifications: Notification[];
  isOpen: boolean;
  onClose: () => void;
  onMarkAsRead: (id: string) => void;
  // Adicione outras props conforme necessário, por exemplo, para buscar mais notificações
}

export default function NotificationDropdown({
  notifications,
  isOpen,
  onClose,
  onMarkAsRead,
}: NotificationDropdownProps) {
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Fecha o dropdown ao clicar fora
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        onClose();
      }
    }
    // Adiciona um pequeno atraso para evitar que o clique no botão de sino feche imediatamente
    const timeoutId = setTimeout(() => {
        if (isOpen) { // Apenas adiciona o listener se estiver aberto
            document.addEventListener('mousedown', handleClickOutside);
        }
    }, 100); // Pequeno atraso

    return () => {
      clearTimeout(timeoutId);
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen, onClose]);

  if (!isOpen) {
    return null;
  }

  // Define um ícone e cor com base no tipo de notificação
  const getTypeIcon = (type: Notification['type']) => {
    switch (type) {
      case 'info':
        return <Info className="w-4 h-4 text-blue-500" />;
      case 'success':
        return <CheckCircle className="w-4 h-4 text-green-500" />;
      // case 'warning':
      //   return <AlertTriangle className="w-4 h-4 text-yellow-500" />;
      // case 'error':
      //   return <XCircle className="w-4 h-4 text-red-500" />;
      default:
        return <Info className="w-4 h-4 text-gray-500" />;
    }
  };

  const getTypeName = (type: Notification['type']) => {
    switch (type) {
      case 'info':
        return 'Informação';
      case 'success':
        return 'Sucesso';
      // case 'warning':
      //   return 'Aviso';
      // case 'error':
      //   return 'Erro';
      default:
        return 'Notificação';
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
    return timestamp.toLocaleDateString('pt-BR'); // Ex: 25/07/2025
  };


  return (
    <div
      ref={dropdownRef}
      className="absolute right-0 mt-2 w-80 bg-white rounded-xl shadow-xl border border-gray-200/50 py-2 origin-top-right transform transition-all duration-200 ease-out z-50"
      // Você pode adicionar classes para animação de entrada/saída, se quiser
      // Por exemplo: ${isOpen ? 'scale-100 opacity-100' : 'scale-95 opacity-0'}
    >
      <div className="px-4 py-2 border-b border-gray-100 flex justify-between items-center">
        <h3 className="text-sm font-semibold text-gray-900">Notificações</h3>
        <span className="text-xs text-gray-500">{notifications.filter(n => !n.read).length} não lidas</span>
      </div>
      <div className="max-h-80 overflow-y-auto">
        {notifications.length === 0 ? (
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
                onClick={() => onMarkAsRead(notification.id)}
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
                </div>
                {!notification.read && (
                  <div className="flex-shrink-0 w-2 h-2 bg-primary-500 rounded-full ml-2 mt-1.5 animate-pulse"></div>
                )}
                {/* Você pode adicionar um botão para "Marcar como lida" aqui se preferir */}
              </li>
            ))}
          </ul>
        )}
      </div>
      {notifications.length > 0 && (
        <div className="px-4 py-2 border-t border-gray-100">
          <button
            onClick={() => console.log("Ver todas as notificações")} // Implementar navegação para uma página de notificações completas
            className="w-full text-center text-sm text-primary-600 hover:text-primary-700 font-medium py-1 rounded-md transition-colors duration-200 flex items-center justify-center"
          >
            Ver todas as notificações
            <ChevronRight className="w-4 h-4 ml-1" />
          </button>
        </div>
      )}
    </div>
  );
}