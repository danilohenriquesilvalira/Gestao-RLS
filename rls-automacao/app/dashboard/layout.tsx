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

// 
import RLSLogo from '@/components/RLSLogo'; // 

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
        <div className="min-h-screen bg-gray-100 flex">
            {/*  */}
            {sidebarOpen && (
                <div
                    className="fixed inset-0 z-40 bg-gray-900 bg-opacity-75 lg:hidden"
                    onClick={() => setSidebarOpen(false)}
                />
            )}

            {/* */}
            <div className={`fixed inset-y-0 left-0 z-50 w-64 bg-white shadow-lg transform transition-transform duration-300 ease-in-out lg:translate-x-0 ${ // Largura da sidebar reduzida para w-64
                sidebarOpen ? "translate-x-0" : "-translate-x-full"
            }`}>

                {/*  */}
                <div className="flex items-center justify-center h-16 px-4 border-b border-gray-200 bg-gray-50"> {/* Altura e padding reduzidos */}
                    <RLSLogo className="h-10 w-auto" /> {/* Logo menor */}
                    <button
                        onClick={() => setSidebarOpen(false)}
                        className="lg:hidden p-1.5 rounded-md text-gray-400 hover:text-gray-600 absolute right-3 top-1/2 -translate-y-1/2" // Padding e posição ajustados
                    >
                        <X className="w-5 h-5" /> {/* Icone menor */}
                    </button>
                </div>

                {/* Navigation principal da Sidebar */}
                <nav className="flex-1 px-3 py-6"> {/* Padding reduzido */}
                    <ul className="space-y-1.5"> {/* Espaçamento reduzido */}
                        {navigation.map((item) => {
                            const isActive = pathname === item.href;

                            return (
                                <li key={item.name}>
                                    <Link
                                        href={item.href}
                                        onClick={() => setSidebarOpen(false)}
                                        className={`flex items-center px-3 py-2.5 text-sm font-medium rounded-md transition-all duration-200 ${ // Padding, texto e rounded reduzidos
                                            isActive
                                                ? "bg-primary-100 text-primary-700 border-l-4 border-primary-600 font-semibold"
                                                : "text-gray-700 hover:text-gray-900 hover:bg-gray-100"
                                        }`}
                                    >
                                        <item.icon className="w-4 h-4 mr-2" /> {/* Icone menor */}
                                        {item.name}
                                    </Link>
                                </li>
                            );
                        })}
                    </ul>
                </nav>

                {/* Informações do Utilizador e Logout na Sidebar */}
                <div className="p-4 border-t border-gray-200 bg-gray-50"> {/* Padding e borda reduzidos */}
                    <div className="flex items-center space-x-3 mb-3"> {/* Espaçamento reduzido */}
                        <div className="w-10 h-10 bg-primary-100 rounded-full flex items-center justify-center border border-primary-200"> {/* Tamanho menor */}
                            <UserIcon className="w-5 h-5 text-primary-600" /> {/* Icone menor */}
                        </div>
                        <div className="flex-1 min-w-0">
                            <p className="text-sm font-semibold text-gray-900 truncate"> {/* Texto menor */}
                                {user.nomecompleto || user.username}
                            </p>
                            <p className="text-xs text-gray-600 truncate">{user.email}</p> {/* Texto menor */}
                        </div>
                    </div>
                    <button
                        onClick={handleLogout}
                        className="w-full flex items-center px-3 py-2 text-sm text-red-600 hover:text-red-700 hover:bg-red-50 rounded-md transition-colors font-medium" // Padding e rounded reduzidos
                    >
                        <LogOut className="w-4 h-4 mr-2" /> {/* Icone menor */}
                        Sair
                    </button>
                </div>
            </div>

            {/* Área de Conteúdo Principal - Onde o DashboardPage será renderizado */}
            <div className="flex-1 lg:ml-64 bg-gray-100 p-4 sm:p-6"> {/* Margem esquerda e padding reduzidos para corresponder à sidebar */}
                {/* Top bar para Mobile - Fixa no topo */}
                <div className="lg:hidden flex items-center justify-between h-14 px-4 bg-white border-b border-gray-200 shadow-sm fixed top-0 left-0 w-full z-30"> {/* Altura reduzida */}
                    <button
                        onClick={() => setSidebarOpen(true)}
                        className="p-1.5 rounded-md text-gray-500 hover:text-gray-700"
                    >
                        <Menu className="w-5 h-5" /> {/* Icone menor */}
                    </button>
                    <span className="text-sm font-medium text-gray-700"> {/* Texto menor */}
                        {user.nomecompleto || user.username}
                    </span>
                </div>

                {/* */}
                <main className="h-full pt-14 lg:pt-0 pb-6"> {/*  */}
                    {children}
                </main>
            </div>
        </div>
    );
}