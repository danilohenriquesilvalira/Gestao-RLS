'use client';

import { useState, useEffect } from 'react';
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
  Loader2 
} from 'lucide-react';

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

  const handleLogout = () => {
    storage.remove('token');
    storage.remove('user');
    router.replace('/login');
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="flex items-center space-x-2 text-primary-600">
          <Loader2 className="w-6 h-6 animate-spin" />
          <span>Carregando...</span>
        </div>
      </div>
    );
  }

  if (!user) return null;

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Mobile sidebar backdrop */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 z-40 bg-gray-600 bg-opacity-75 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div className={`fixed inset-y-0 left-0 z-50 w-64 bg-white shadow-lg transform transition-transform duration-300 ease-in-out lg:translate-x-0 ${
        sidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
      }`}>
        
        {/* Header Sidebar */}
        <div className="flex items-center justify-between h-16 px-4 border-b border-gray-200">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-primary-600 rounded-lg flex items-center justify-center">
              <span className="text-sm font-bold text-white">RLS</span>
            </div>
            <span className="text-lg font-semibold text-gray-900">RLS Automação</span>
          </div>
          <button
            onClick={() => setSidebarOpen(false)}
            className="lg:hidden p-1 rounded-md text-gray-400 hover:text-gray-600"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-4 py-6">
          <ul className="space-y-2">
            {navigation.map((item) => {
              const isActive = pathname === item.href;
              
              return (
                <li key={item.name}>
                  <Link
                    href={item.href}
                    onClick={() => setSidebarOpen(false)}
                    className={`flex items-center px-3 py-3 text-sm font-medium rounded-lg transition-all duration-200 ${
                      isActive
                        ? "bg-primary-50 text-primary-700 border-r-4 border-primary-500"
                        : "text-gray-600 hover:text-gray-900 hover:bg-gray-50"
                    }`}
                  >
                    <item.icon className="w-5 h-5 mr-3" />
                    {item.name}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        {/* User info */}
        <div className="p-4 border-t border-gray-200">
          <div className="flex items-center space-x-3 mb-3">
            <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center">
              <UserIcon className="w-5 h-5 text-gray-600" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-gray-900 truncate">
                {user.nomecompleto || user.username}
              </p>
              <p className="text-xs text-gray-500 truncate">{user.email}</p>
            </div>
          </div>
          <button
            onClick={handleLogout}
            className="w-full flex items-center px-3 py-2 text-sm text-danger-600 hover:text-danger-700 hover:bg-danger-50 rounded-lg transition-colors"
          >
            <LogOut className="w-4 h-4 mr-2" />
            Sair
          </button>
        </div>
      </div>

      {/* Main content area */}
      <div className="flex-1 lg:ml-64">
        {/* Top bar - mobile only */}
        <div className="lg:hidden flex items-center justify-between h-16 px-4 bg-white border-b border-gray-200">
          <button
            onClick={() => setSidebarOpen(true)}
            className="p-2 rounded-md text-gray-400 hover:text-gray-600"
          >
            <Menu className="w-5 h-5" />
          </button>
          <span className="text-sm text-gray-500">
            {user.nomecompleto || user.username}
          </span>
        </div>

        {/* Page content */}
        <main className="h-full">
          {children}
        </main>
      </div>
    </div>
  );
}