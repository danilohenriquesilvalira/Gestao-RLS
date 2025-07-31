'use client';

import { useState, useEffect, useRef } from 'react';
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
  Clock,
  Share2,
  User as UserIcon,
  LogOut,
  Loader2,
  Search,
  Settings,
  ChevronDown,
} from 'lucide-react';
import RLSLogo from '@/components/RLSLogo';
import NotificationBell from '@/components/NotificationBell'; // IMPORT DO NOTIFICATION BELL

const navigation = [
  { name: 'Dashboard', href: '/dashboard', icon: Home },
  { name: 'Despesas', href: '/dashboard/despesas', icon: Receipt },
  { name: 'Documentos', href: '/dashboard/documentos', icon: FileText },
  { name: 'Ponto', href: '/dashboard/ponto', icon: Clock },
  { name: 'Compartilhamento', href: '/dashboard/compartilhamento', icon: Share2 },
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

  const userMenuRef = useRef<HTMLDivElement>(null);
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
    function handleClickOutside(event: MouseEvent) {
      if (userMenuRef.current && !userMenuRef.current.contains(event.target as Node)) {
        setUserMenuOpen(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleUserMenuClick = () => {
    setUserMenuOpen((prev) => !prev);
  };

  const handleLogout = () => {
    storage.remove('token');
    storage.remove('user');
    router.replace('/login');
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-purple-50 flex items-center justify-center">
        <div className="flex items-center space-x-4 text-primary-600 bg-white p-10 rounded-3xl shadow-2xl animate-fade-in">
          <Loader2 className="w-10 h-10 animate-spin text-primary-500" />
          <span className="text-xl font-semibold text-gray-800">
            Carregando...
          </span>
        </div>
      </div>
    );
  }

  if (!user) return null;

  const sidebarWidth = 'w-64';
  const mainContentMargin = 'lg:ml-64';

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 font-sans text-gray-900">
      {/* Overlay for mobile */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/30 backdrop-blur-sm lg:hidden animate-fade-in"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div
        className={`fixed inset-y-0 left-0 z-50 ${sidebarWidth} bg-white/90 backdrop-blur-xl border-r border-gray-100 shadow-2xl transform transition-all duration-300 ease-out 
        ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} 
        lg:translate-x-0 flex flex-col`}
      >
        {/* Logo Header */}
        <div className={`relative flex items-center justify-center h-20 border-b border-gray-100 shadow-sm`}>
          <RLSLogo className={`h-10 w-auto transition-transform duration-300 hover:scale-105`} />
          <button
            onClick={() => setSidebarOpen(false)}
            className="lg:hidden absolute right-4 p-2 rounded-full text-gray-500 hover:text-gray-700 hover:bg-gray-100 transition-all duration-200"
            aria-label="Fechar menu"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Navigation Section */}
        <nav className="flex-1 px-3 py-6 overflow-y-auto custom-scrollbar">
          <ul className="space-y-2">
            {navigation.map((item) => {
              const isActive = pathname === item.href;
              return (
                <li key={item.name}>
                  <Link
                    href={item.href}
                    onClick={() => setSidebarOpen(false)}
                    className={`group flex items-center relative py-2.5 rounded-lg transition-all duration-200 ease-in-out
                      px-4
                      ${
                        isActive
                          ? 'bg-gradient-to-r from-primary-500 to-primary-600 text-white shadow-lg shadow-primary-500/30'
                          : 'text-gray-700 hover:text-primary-700 hover:bg-primary-50'
                      }
                      focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-opacity-60`}
                  >
                    <item.icon
                      className={`w-6 h-6 transition-transform duration-200 mr-3 ${
                        isActive
                          ? 'scale-110 text-white'
                          : 'text-gray-500 group-hover:text-primary-600 group-hover:scale-105'
                      }`}
                    />
                    <span className="whitespace-nowrap">{item.name}</span>
                    {isActive && (
                      <div className="absolute right-4 top-1/2 -translate-y-1/2 w-1.5 h-1.5 bg-white rounded-full shadow-md" />
                    )}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        {/* Horizontal Divider for Sections */}
        <div className="mx-4 my-2 border-t border-gray-200" />

        {/* User Profile Section */}
        <div className={`p-4`}>
          <div
            className={`flex items-center p-3 rounded-lg bg-white border border-gray-200 shadow-md mb-3 hover:shadow-lg transition-shadow duration-200 cursor-pointer space-x-3`}
          >
            <div className="w-10 h-10 bg-gradient-to-br from-primary-500 to-primary-600 rounded-full flex items-center justify-center shadow-md flex-shrink-0">
              <UserIcon className="w-5 h-5 text-white" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold text-gray-900 truncate">
                {user.nomecompleto?.split(' ')[0]}
              </p>
              <p className="text-xs text-gray-600 truncate">{user.email}</p>
            </div>
          </div>
          <button
            onClick={handleLogout}
            className={`w-full flex items-center px-4 py-2.5 text-base text-red-600 hover:text-red-700 hover:bg-red-50/70 rounded-lg transition-all duration-200 font-medium group focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-60`}
          >
            <LogOut className={`w-5 h-5 mr-3 group-hover:scale-105 transition-transform text-red-500`} />
            <span className="whitespace-nowrap">Sair da Conta</span>
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className={`${mainContentMargin} flex flex-col min-h-screen transition-all duration-300 ease-out`}>
        {/* Top Header */}
        <header className="sticky top-0 z-30 bg-white shadow-md">
          <div className="flex items-center justify-between h-20 px-6">
            {/* Mobile menu button */}
            <button
              onClick={() => setSidebarOpen(true)}
              className="lg:hidden p-3 rounded-xl text-gray-600 hover:text-gray-800 hover:bg-gray-100 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-opacity-50"
              aria-label="Abrir menu"
            >
              <Menu className="w-6 h-6" />
            </button>

            {/* Right side actions */}
            <div className="flex items-center space-x-4 ml-auto">
              {/* Search button */}
              <button
                className="p-3 rounded-xl text-gray-600 hover:text-gray-800 hover:bg-gray-100 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-opacity-50"
                aria-label="Pesquisar"
              >
                <Search className="w-6 h-6" />
              </button>

              {/* NOTIFICATION BELL - COMPONENTE SEPARADO */}
              <NotificationBell user={user} />

              {/* User menu - Desktop */}
              <div className="hidden lg:block relative" ref={userMenuRef}>
                <button
                  onClick={handleUserMenuClick}
                  className="flex items-center space-x-3 p-2 rounded-xl hover:bg-gray-100 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-opacity-50"
                  aria-label="Abrir menu do usuário"
                >
                  <div className="w-10 h-10 bg-gradient-to-br from-primary-500 to-primary-600 rounded-xl flex items-center justify-center shadow-md flex-shrink-0">
                    <UserIcon className="w-5 h-5 text-white" />
                  </div>
                  <ChevronDown
                    className={`w-5 h-5 text-gray-500 transition-transform duration-200 ${
                      userMenuOpen ? 'rotate-180' : ''
                    }`}
                  />
                </button>

                {/* User dropdown */}
                {userMenuOpen && (
                  <div className="absolute right-0 mt-3 w-56 bg-white rounded-xl shadow-2xl border border-gray-100 py-3 z-10 animate-fade-in-down">
                    <div className="px-5 py-3 border-b border-gray-100 mb-2">
                      <p className="text-base font-semibold text-gray-900">
                        {user.nomecompleto}
                      </p>
                      <p className="text-sm text-gray-600">{user.email}</p>
                    </div>
                    <button
                      className="w-full flex items-center px-5 py-2.5 text-base text-gray-700 hover:bg-gray-50 rounded-lg transition-colors duration-150"
                      onClick={() => setUserMenuOpen(false)}
                    >
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
          <div className="max-w-7xl mx-auto">{children}</div>
        </main>
      </div>
    </div>
  );
}