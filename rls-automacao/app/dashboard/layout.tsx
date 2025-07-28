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
    Loader2,
    Bell,
    Search,
    Settings,
    ChevronDown,
    Activity
} from 'lucide-react';
import RLSLogo from '@/components/RLSLogo';

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
            <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center">
                <div className="flex items-center space-x-3 text-primary-600 bg-white p-8 rounded-2xl shadow-xl">
                    <Loader2 className="w-8 h-8 animate-spin" />
                    <span className="text-lg font-medium">Carregando...</span>
                </div>
            </div>
        );
    }

    if (!user) return null;

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
            {/* Overlay para mobile */}
            {sidebarOpen && (
                <div
                    className="fixed inset-0 z-40 bg-black/20 backdrop-blur-sm lg:hidden"
                    onClick={() => setSidebarOpen(false)}
                />
            )}

            {/* Sidebar */}
            <div className={`fixed inset-y-0 left-0 z-50 w-72 bg-white/80 backdrop-blur-xl border-r border-gray-200/50 shadow-xl transform transition-all duration-300 ease-out lg:translate-x-0 ${
                sidebarOpen ? "translate-x-0" : "-translate-x-full"
            }`}>
                
                {/* Logo Header */}
                <div className="relative flex items-center justify-center h-20 px-6 border-b border-gray-200/50">
                    <div className="flex items-center justify-center w-full">
                        <RLSLogo className="h-14 w-auto" />
                    </div>
                    <button
                        onClick={() => setSidebarOpen(false)}
                        className="lg:hidden absolute right-4 p-2 rounded-xl text-gray-400 hover:text-gray-600 hover:bg-gray-100/50 transition-all duration-200"
                    >
                        <X className="w-5 h-5" />
                    </button>
                </div>

                {/* Navigation */}
                <nav className="flex-1 px-6 py-8">
                    <ul className="space-y-3">
                        {navigation.map((item) => {
                            const isActive = pathname === item.href;
                            return (
                                <li key={item.name}>
                                    <Link
                                        href={item.href}
                                        onClick={() => setSidebarOpen(false)}
                                        className={`group flex items-center px-5 py-4 text-sm font-medium rounded-xl transition-all duration-200 ${
                                            isActive
                                                ? "bg-gradient-to-r from-primary-500 to-primary-600 text-white shadow-lg shadow-primary-500/25"
                                                : "text-gray-700 hover:text-primary-600 hover:bg-primary-50/50"
                                        }`}
                                    >
                                        <item.icon className={`w-5 h-5 mr-4 transition-transform duration-200 ${
                                            isActive ? "scale-110" : "group-hover:scale-105"
                                        }`} />
                                        {item.name}
                                        {isActive && (
                                            <div className="ml-auto w-2 h-2 bg-white rounded-full animate-pulse" />
                                        )}
                                    </Link>
                                </li>
                            );
                        })}
                    </ul>
                </nav>

                {/* User Profile Section */}
                <div className="p-6 border-t border-gray-200/50 bg-gradient-to-r from-gray-50/50 to-white/50">
                    <div className="flex items-center space-x-3 p-4 rounded-xl bg-white/70 border border-gray-200/50 mb-4">
                        <div className="w-11 h-11 bg-gradient-to-br from-primary-500 to-primary-600 rounded-xl flex items-center justify-center shadow-md">
                            <UserIcon className="w-5 h-5 text-white" />
                        </div>
                        <div className="flex-1 min-w-0">
                            <p className="text-sm font-semibold text-gray-900 truncate">
                                {user.nomecompleto || user.username}
                            </p>
                            <p className="text-xs text-gray-500 truncate">{user.email}</p>
                        </div>
                    </div>
                    <button
                        onClick={handleLogout}
                        className="w-full flex items-center px-5 py-3 text-sm text-red-600 hover:text-red-700 hover:bg-red-50/50 rounded-xl transition-all duration-200 font-medium group"
                    >
                        <LogOut className="w-4 h-4 mr-3 group-hover:scale-105 transition-transform" />
                        Sair da Conta
                    </button>
                </div>
            </div>

            {/* Main Content */}
            <div className="lg:ml-72">
                {/* Top Header */}
                <header className="sticky top-0 z-30 bg-white/80 backdrop-blur-xl border-b border-gray-200/50 shadow-sm">
                    <div className="flex items-center justify-between h-16 px-6">
                        {/* Mobile menu button */}
                        <button
                            onClick={() => setSidebarOpen(true)}
                            className="lg:hidden p-2 rounded-xl text-gray-500 hover:text-gray-700 hover:bg-gray-100/50 transition-all duration-200"
                        >
                            <Menu className="w-5 h-5" />
                        </button>

                        {/* Page title - Desktop only */}
                        <div className="hidden lg:block">
                            <h1 className="text-lg font-semibold text-gray-900">
                                {navigation.find(nav => nav.href === pathname)?.name || 'Dashboard'}
                            </h1>
                        </div>

                        {/* Right side actions */}
                        <div className="flex items-center space-x-3">
                            {/* Search button */}
                            <button className="p-2 rounded-xl text-gray-500 hover:text-gray-700 hover:bg-gray-100/50 transition-all duration-200">
                                <Search className="w-5 h-5" />
                            </button>

                            {/* Notifications */}
                            <button className="relative p-2 rounded-xl text-gray-500 hover:text-gray-700 hover:bg-gray-100/50 transition-all duration-200">
                                <Bell className="w-5 h-5" />
                                <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full animate-pulse"></span>
                            </button>

                            {/* User menu - Desktop */}
                            <div className="hidden lg:block relative">
                                <button
                                    onClick={() => setUserMenuOpen(!userMenuOpen)}
                                    className="flex items-center space-x-2 p-2 rounded-xl hover:bg-gray-100/50 transition-all duration-200"
                                >
                                    <div className="w-8 h-8 bg-gradient-to-br from-primary-500 to-primary-600 rounded-lg flex items-center justify-center">
                                        <UserIcon className="w-4 h-4 text-white" />
                                    </div>
                                    <ChevronDown className="w-4 h-4 text-gray-500" />
                                </button>

                                {/* User dropdown */}
                                {userMenuOpen && (
                                    <div className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-xl border border-gray-200/50 py-2">
                                        <div className="px-4 py-2 border-b border-gray-100">
                                            <p className="text-sm font-medium text-gray-900">{user.nomecompleto}</p>
                                            <p className="text-xs text-gray-500">{user.email}</p>
                                        </div>
                                        <button className="w-full flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-50">
                                            <Settings className="w-4 h-4 mr-3" />
                                            Configurações
                                        </button>
                                        <button 
                                            onClick={handleLogout}
                                            className="w-full flex items-center px-4 py-2 text-sm text-red-600 hover:bg-red-50"
                                        >
                                            <LogOut className="w-4 h-4 mr-3" />
                                            Sair
                                        </button>
                                    </div>
                                )}
                            </div>

                            {/* Mobile user info */}
                            <div className="lg:hidden flex items-center space-x-2">
                                <div className="w-8 h-8 bg-gradient-to-br from-primary-500 to-primary-600 rounded-lg flex items-center justify-center">
                                    <UserIcon className="w-4 h-4 text-white" />
                                </div>
                                <span className="text-sm font-medium text-gray-700 max-w-24 truncate">
                                    {user.nomecompleto?.split(' ')[0]}
                                </span>
                            </div>
                        </div>
                    </div>
                </header>

                {/* Page Content */}
                <main className="p-6">
                    <div className="max-w-7xl mx-auto">
                        {children}
                    </div>
                </main>
            </div>
        </div>
    );
}