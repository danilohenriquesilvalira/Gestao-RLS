'use client';

import { useState, useEffect, useMemo } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import Link from 'next/link';
import { storage } from '@/utils';
import { User } from '@/types';
import {
  Menu,
  X,
  Home,
  Receipt,
  FileText,
  User as UserIcon,
  LogOut,
  Loader2,
  Bell,
  Search,
  Settings,
  ChevronDown,
  Activity,
  Info,
  AlertTriangle,
  ChevronRight, // Adicionado para indicar itens clicáveis
} from 'lucide-react';
import RLSLogo from '@/components/RLSLogo';
import NotificationDropdown from '@/components/ui/NotificationDropdown'; // Certifique-se de que este componente existe e funciona como esperado.

interface Notification {
  id: string;
  message: string;
  type: 'info' | 'success' | 'warning' | 'error';
  timestamp: Date;
  read: boolean;
  user?: {
    nomecompleto: string;
    email: string;
  };
}

const navigation = [
  { name: 'Dashboard', href: '/dashboard', icon: Home },
  { name: 'Despesas', href: '/dashboard/despesas', icon: Receipt },
  { name: 'Documentos', href: '/dashboard/documentos', icon: FileText },
];

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [pendingExpensesCount, setPendingExpensesCount] = useState(0);

  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const token = storage.get('token');
    const userData = storage.get('user');

    if (!token || !userData) {
      router.replace('/login');
      return;
    }

    try {
      setUser(JSON.parse(userData));
    } catch {
      router.replace('/login');
    } finally {
      setLoading(false);
    }
  }, [router]);

  useEffect(() => {
    const updatePendingExpensesCount = () => {
      const pending = localStorage.getItem('pendingExpensesCount');
      const count = parseInt(pending || '0', 10);
      setPendingExpensesCount(count);
    };

    updatePendingExpensesCount();
    window.addEventListener('storage', updatePendingExpensesCount);

    return () => {
      window.removeEventListener('storage', updatePendingExpensesCount);
    };
  }, []);

  const realNotifications = useMemo(() => {
    const currentNotifications: Notification[] = [];

    if (pendingExpensesCount > 0) {
      currentNotifications.push({
        id: 'pending_expenses',
        message: `Você tem ${pendingExpensesCount} despesa${pendingExpensesCount > 1 ? 's' : ''} aguardando aprovação.`,
        type: 'warning',
        timestamp: new Date(),
        read: false,
      });
    }
    // Adicione outras notificações futuras aqui
    return currentNotifications.sort((a, b) => {
      if (a.read === b.read) {
        return b.timestamp.getTime() - a.timestamp.getTime();
      }
      return a.read ? 1 : -1;
    });
  }, [pendingExpensesCount]);

  const hasNotifications = realNotifications.filter(n => !n.read).length > 0;

  const handleMarkNotificationAsRead = (id: string) => {
    if (id === 'pending_expenses') {
      localStorage.removeItem('pendingExpensesCount');
      setPendingExpensesCount(0);
      setNotificationsOpen(false);
    }
    // Implementar lógica para marcar outras notificações como lidas (e.g., via API)
  };

  const handleBellClick = () => {
    setNotificationsOpen(!notificationsOpen);
  };

  const handleLogout = () => {
    storage.remove('token');
    storage.remove('user');
    localStorage.removeItem('pendingExpensesCount');
    router.replace('/login');
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-purple-50 flex items-center justify-center">
        <div className="flex items-center space-x-4 text-primary-600 bg-white p-10 rounded-3xl shadow-2xl animate-fade-in">
          <Loader2 className="w-10 h-10 animate-spin text-primary-500" />
          <span className="text-xl font-semibold text-gray-800">Carregando...</span>
        </div>
      </div>
    );
  }

  if (!user) return null;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 font-sans text-gray-900">
      {/* Overlay para mobile */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/30 backdrop-blur-sm lg:hidden animate-fade-in"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div className={`fixed inset-y-0 left-0 z-50 w-72 bg-white/90 backdrop-blur-xl border-r border-gray-100 shadow-2xl transform transition-all duration-300 ease-out lg:translate-x-0 ${
        sidebarOpen ? "translate-x-0" : "-translate-x-full"
      } flex flex-col`}>

        {/* Logo Header Melhorado */}
        {/* Removed the green background and adjusted logo size */}
        <div className="relative flex items-center justify-center h-28 px-6 border-b border-gray-100 shadow-sm">
          <RLSLogo className="h-16 w-auto transition-transform duration-300 hover:scale-105" /> {/* Adjusted h-20 to h-16 for smaller size */}
          <button
            onClick={() => setSidebarOpen(false)}
            className="lg:hidden absolute right-4 p-2 rounded-full text-gray-500 hover:text-gray-700 hover:bg-gray-100 transition-all duration-200"
            aria-label="Fechar menu"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Navigation Melhorada */}
        <nav className="flex-1 px-4 py-8 overflow-y-auto custom-scrollbar">
          <ul className="space-y-2">
            {navigation.map((item) => {
              const isActive = pathname === item.href;
              return (
                <li key={item.name}>
                  <Link
                    href={item.href}
                    onClick={() => setSidebarOpen(false)}
                    className={`group flex items-center px-5 py-3 text-base font-medium rounded-xl transition-all duration-200 ease-in-out
                      ${isActive
                        ? "bg-gradient-to-r from-primary-500 to-primary-600 text-white shadow-lg shadow-primary-500/30 transform translate-x-1 border border-primary-400"
                        : "text-gray-700 hover:text-primary-700 hover:bg-primary-50 hover:translate-x-1 border border-transparent"
                      }
                      focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-opacity-60`}
                  >
                    <item.icon className={`w-6 h-6 mr-4 transition-transform duration-200 ${
                      isActive ? "scale-110 text-white" : "text-gray-500 group-hover:text-primary-600 group-hover:scale-105"
                    }`} />
                    {item.name}
                    {isActive && (
                      <div className="ml-auto w-2.5 h-2.5 bg-white rounded-full animate-pulse shadow-md" />
                    )}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        {/* User Profile Section Melhorada */}
        <div className="p-6 border-t border-gray-100 bg-white/70 backdrop-blur-md">
          <div className="flex items-center space-x-4 p-4 rounded-xl bg-white border border-gray-200 shadow-lg mb-4 hover:shadow-xl transition-shadow duration-200 cursor-pointer">
            <div className="w-12 h-12 bg-gradient-to-br from-primary-500 to-primary-600 rounded-full flex items-center justify-center shadow-lg flex-shrink-0">
              <UserIcon className="w-6 h-6 text-white" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-base font-semibold text-gray-900 truncate">
                {user.nomecompleto || user.username}
              </p>
              <p className="text-sm text-gray-600 truncate">{user.email}</p>
            </div>
            <ChevronRight className="w-5 h-5 text-gray-400" />
          </div>
          <button
            onClick={handleLogout}
            className="w-full flex items-center px-5 py-3 text-base text-red-600 hover:text-red-700 hover:bg-red-50/70 rounded-xl transition-all duration-200 font-medium group focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-60"
          >
            <LogOut className="w-5 h-5 mr-3 group-hover:scale-105 transition-transform text-red-500" />
            Sair da Conta
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="lg:ml-72 flex flex-col min-h-screen">
        {/* Top Header */}
        <header className="sticky top-0 z-30 bg-white/90 backdrop-blur-xl border-b border-gray-100 shadow-md">
          <div className="flex items-center justify-between h-20 px-6">
            {/* Mobile menu button */}
            <button
              onClick={() => setSidebarOpen(true)}
              className="lg:hidden p-3 rounded-xl text-gray-600 hover:text-gray-800 hover:bg-gray-100 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-opacity-50"
              aria-label="Abrir menu"
            >
              <Menu className="w-6 h-6" />
            </button>

            {/* Page title - Desktop only */}
            <div className="hidden lg:block">
              <h1 className="text-2xl font-bold text-gray-900">
                {navigation.find(nav => nav.href === pathname)?.name || 'Dashboard'}
              </h1>
            </div>

            {/* Right side actions */}
            <div className="flex items-center space-x-4">
              {/* Search button */}
              <button className="p-3 rounded-xl text-gray-600 hover:text-gray-800 hover:bg-gray-100 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-opacity-50" aria-label="Pesquisar">
                <Search className="w-6 h-6" />
              </button>

              {/* Notifications - AGORA COM ANIMAÇÃO CONDICIONAL E DROPDOWN */}
              <div className="relative">
                <button
                  onClick={handleBellClick}
                  className="relative p-3 rounded-xl text-gray-600 hover:text-gray-800 hover:bg-gray-100 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-opacity-50"
                  aria-label="Notificações"
                >
                  <Bell className={`w-6 h-6 ${hasNotifications ? 'text-red-500 animate-pulse-bell' : ''}`} />
                  {hasNotifications && (
                    <span className="absolute top-2 right-2 w-2.5 h-2.5 bg-red-500 rounded-full animate-ping-slow"></span>
                  )}
                </button>
                <NotificationDropdown
                  notifications={realNotifications}
                  isOpen={notificationsOpen}
                  onClose={() => setNotificationsOpen(false)}
                  onMarkAsRead={handleMarkNotificationAsRead}
                />
              </div>

              {/* User menu - Desktop */}
              <div className="hidden lg:block relative">
                <button
                  onClick={() => setUserMenuOpen(!userMenuOpen)}
                  className="flex items-center space-x-3 p-2 rounded-xl hover:bg-gray-100 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-opacity-50"
                  aria-label="Abrir menu do usuário"
                >
                  <div className="w-10 h-10 bg-gradient-to-br from-primary-500 to-primary-600 rounded-xl flex items-center justify-center shadow-md flex-shrink-0">
                    <UserIcon className="w-5 h-5 text-white" />
                  </div>
                  <ChevronDown className={`w-5 h-5 text-gray-500 transition-transform duration-200 ${userMenuOpen ? 'rotate-180' : ''}`} />
                </button>

                {/* User dropdown */}
                {userMenuOpen && (
                  <div className="absolute right-0 mt-3 w-56 bg-white rounded-xl shadow-2xl border border-gray-100 py-3 z-10 animate-fade-in-down">
                    <div className="px-5 py-3 border-b border-gray-100 mb-2">
                      <p className="text-base font-semibold text-gray-900">{user.nomecompleto}</p>
                      <p className="text-sm text-gray-600">{user.email}</p>
                    </div>
                    <button className="w-full flex items-center px-5 py-2.5 text-base text-gray-700 hover:bg-gray-50 rounded-lg transition-colors duration-150" onClick={() => setUserMenuOpen(false)}>
                      <Settings className="w-5 h-5 mr-3 text-gray-500" />
                      Configurações
                    </button>
                    <button
                      onClick={handleLogout}
                      className="w-full flex items-center px-5 py-2.5 text-base text-red-600 hover:bg-red-50 rounded-lg transition-colors duration-150 mt-1"
                    >
                      <LogOut className="w-5 h-5 mr-3 text-red-500" />
                      Sair
                    </button>
                  </div>
                )}
              </div>

              {/* Mobile user info */}
              <div className="lg:hidden flex items-center space-x-2">
                <div className="w-9 h-9 bg-gradient-to-br from-primary-500 to-primary-600 rounded-lg flex items-center justify-center flex-shrink-0">
                  <UserIcon className="w-4 h-4 text-white" />
                </div>
                <span className="text-sm font-medium text-gray-700 max-w-28 truncate">
                  {user.nomecompleto?.split(' ')[0]}
                </span>
              </div>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="p-6 flex-1">
          <div className="max-w-7xl mx-auto">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}