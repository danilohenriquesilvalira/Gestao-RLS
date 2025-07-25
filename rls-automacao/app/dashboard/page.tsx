'use client';

import { useState, useEffect } from 'react';
import { api } from '@/lib/api'; //
import { useAuth } from '@/hooks/useAuth'; // 
import Link from 'next/link';
import {
    Receipt,
    FileText,
    Plus,
    AlertCircle,
    Loader2,
    Bell,
    DollarSign,
    Clock,
    ArrowRight,
    ArrowUpRight,
    UserCircle,
    Settings
} from 'lucide-react';

interface DashboardStats {
    totalDespesas: number;
    totalDocumentos: number;
    valorTotalDespesas: number;
    despesasPendentes: number;
}

// 
const NotificationBell = () => {
    const [hasNotifications, setHasNotifications] = useState(true); // Example state
    // 

    if (!hasNotifications) return null; // 

    return (
        <Link href="/dashboard/notifications" passHref>
            <button className="relative p-2 rounded-full bg-primary-100 text-primary-600 hover:bg-primary-200 transition-colors focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2">
                <Bell className="w-5 h-5" /> {/*  */}
                <span className="absolute top-0 right-0 block h-2 w-2 rounded-full ring-1 ring-white bg-red-500 animate-bounce-slow"></span> {/* Smaller red dot */}
                <span className="sr-only">Novas notificações</span>
            </button>
        </Link>
    );
};


export default function DashboardPage() {
    const { user, isAdmin } = useAuth();
    const [stats, setStats] = useState<DashboardStats>({
        totalDespesas: 0,
        totalDocumentos: 0,
        valorTotalDespesas: 0,
        despesasPendentes: 0
    });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        if (user) {
            fetchStats();
        }
    }, [user, isAdmin]);

    const fetchStats = async () => {
        if (!user) return;

        try {
            setLoading(true);
            setError('');
            const data = await api.getDashboardStats(user);
            setStats(data);
        } catch (err: any) {
            console.error('Erro ao buscar stats:', err);
            setError('Não foi possível carregar os dados. Por favor, verifique a sua conexão e tente novamente.');
        } finally {
            setLoading(false);
        }
    };

    const formatCurrency = (value: number) => {
        return new Intl.NumberFormat('pt-PT', {
            style: 'currency',
            currency: 'EUR',
            minimumFractionDigits: 2,
            maximumFractionDigits: 2
        }).format(value);
    };

    // ---  ---
    if (loading) {
        return (
            <div className="flex items-center justify-center h-full min-h-[400px]"> {/*  */}
                <div className="flex flex-col items-center space-y-4 text-gray-700 p-8 bg-white rounded-xl shadow-lg max-w-sm w-full"> {/* Menor padding, shadow mais discreto */}
                    <Loader2 className="w-16 h-16 animate-spin text-primary-500" /> {/*  */}
                    <p className="text-2xl font-bold text-gray-800 text-center">A carregar dados...</p> {/*  */}
                    <p className="text-base text-gray-600 text-center leading-normal">Aguarde um momento enquanto preparamos o seu painel.</p> {/* Texto mais conciso */}
                </div>
            </div>
        );
    }

    // --- Componente de Erro (compacto) ---
    if (error) {
        return (
            <div className="flex items-center justify-center h-full min-h-[400px]">
                <div className="text-center p-10 bg-white rounded-xl shadow-lg max-w-md mx-auto border border-danger-100"> {/* */}
                    <AlertCircle className="w-20 h-20 text-danger-500 mx-auto mb-6" /> {/*  */}
                    <h3 className="text-3xl font-extrabold text-gray-900 mb-3">Erro ao carregar dados!</h3> {/* Texto menor */}
                    <p className="text-lg text-gray-700 mb-8 leading-relaxed">{error}</p> {/* Texto menor */}
                    <button
                        onClick={fetchStats}
                        className="bg-danger-600 text-white px-8 py-3 rounded-lg shadow hover:bg-danger-700 font-semibold flex items-center justify-center mx-auto space-x-2 transition-all text-base" // Botão menor
                    >
                        <Loader2 className="w-5 h-5 mr-2 animate-spin-slow" />
                        <span>Tentar Novamente</span>
                    </button>
                </div>
            </div>
        );
    }

    return (
        <main className="h-full bg-white rounded-xl shadow-md p-6"> {/* Padding geral reduzido */}
            <div className="max-w-full mx-auto space-y-8"> {/* Removido max-w-screen-xl, espaço vertical reduzido */}
                {/* Secção do Cabeçalho: Boas-vindas, Botões de Ação e Notificações */}
                <section className="flex flex-col md:flex-row md:items-end md:justify-between pb-6 border-b border-gray-100"> {/* Padding e borda reduzidos */}
                    <div className="mb-4 md:mb-0"> {/* Margem reduzida */}
                        <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900 leading-tight"> {/* Font size reduzido */}
                            Olá, <span className="text-primary-600">{user?.nomecompleto}!</span>
                        </h1>
                        <p className="mt-2 text-base text-gray-600"> {/* Font size reduzido */}
                            Bem-vindo(a) ao seu painel de controlo.
                        </p>
                        <p className="mt-1 text-sm text-gray-500">
                            Perfil: <span className="font-semibold text-gray-700">{isAdmin ? 'Administrador (Gestor)' : 'Funcionário'}</span>
                        </p>
                    </div>

                    <div className="flex flex-col sm:flex-row items-center space-y-3 sm:space-y-0 sm:space-x-4 mt-4 md:mt-0"> {/* Espaçamento reduzido */}
                        {/* Notification Bell was here */}
                        <Link href="/dashboard/despesas/nova" passHref>
                            <button className="w-full sm:w-auto bg-primary-500 text-white px-6 py-2.5 rounded-lg shadow-md hover:bg-primary-600 transition-all flex items-center justify-center text-base font-medium"> {/* Botão menor */}
                                <Plus className="w-5 h-5 mr-1.5" /> {/* Icone menor */}
                                Nova Despesa
                            </button>
                        </Link>
                        <Link href="/dashboard/documentos" passHref>
                            <button className="w-full sm:w-auto bg-white text-gray-700 border border-gray-300 px-6 py-2.5 rounded-lg shadow-md hover:bg-gray-50 transition-all flex items-center justify-center text-base font-medium"> {/* Botão menor */}
                                <FileText className="w-5 h-5 mr-1.5 text-primary-600" /> {/* Icone menor */}
                                Ver Documentos
                            </button>
                        </Link>
                    </div>
                </section>

                {/* Grid de Cartões de Estatísticas - Mais compacto */}
                <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-5"> {/* Gap reduzido */}
                    {[
                        { title: 'Total Despesas', value: stats.totalDespesas, icon: Receipt, colorClass: 'text-primary-600 bg-primary-50', borderColor: 'border-primary-100' },
                        { title: 'Valor Total', value: stats.valorTotalDespesas, icon: DollarSign, colorClass: 'text-green-600 bg-green-50', isCurrency: true, borderColor: 'border-green-100' },
                        { title: 'Despesas Pendentes', value: stats.despesasPendentes, icon: Clock, colorClass: 'text-yellow-600 bg-yellow-50', borderColor: 'border-yellow-100' },
                        { title: 'Total Documentos', value: stats.totalDocumentos, icon: FileText, colorClass: 'text-indigo-600 bg-indigo-50', borderColor: 'border-indigo-100' },
                    ].map((item, index) => (
                        <div
                            key={index}
                            className={`bg-white rounded-lg shadow-sm p-5 border ${item.borderColor || 'border-gray-100'} transform transition-transform duration-200 hover:scale-[1.01] hover:shadow-md cursor-pointer`} // Padding e shadow reduzidos
                        >
                            <div className="flex items-center justify-between mb-3"> {/* Margem reduzida */}
                                <p className="text-sm font-medium text-gray-500">{item.title}</p> {/* Texto menor */}
                                <div className={`p-2 rounded-full ${item.colorClass}`}> {/* Padding reduzido */}
                                    <item.icon className="w-6 h-6" /> {/* Icone menor */}
                                </div>
                            </div>
                            <p className={`text-3xl font-bold ${item.isCurrency ? 'text-green-600' : 'text-gray-900'}`}> {/* Texto menor */}
                                {item.isCurrency ? formatCurrency(item.value) : item.value}
                            </p>
                        </div>
                    ))}
                </section>

                {/* Alerta de Despesas Pendentes (Apenas para Admin) - Mais compacto */}
                {isAdmin && stats.despesasPendentes > 0 && (
                    <section className="bg-yellow-50 border border-yellow-200 text-yellow-800 p-5 rounded-lg flex items-start space-x-4 shadow-sm animate-fade-in"> {/* Padding e shadow reduzidos */}
                        <Bell className="w-6 h-6 text-yellow-500 flex-shrink-0 mt-0.5" /> {/* Icone menor */}
                        <div>
                            <p className="font-semibold text-base sm:text-lg leading-snug"> {/* Texto menor, lineHeight mais apertado */}
                                <strong className="text-yellow-700">{stats.despesasPendentes}</strong> {stats.despesasPendentes === 1 ? 'despesa pendente' : 'despesas pendentes'} aguardam sua aprovação.
                            </p>
                            <Link href="/dashboard/despesas?status=pendente" className="inline-flex items-center mt-2 text-yellow-700 hover:text-yellow-800 font-medium group transition-colors text-sm"> {/* Texto e margem reduzidos */}
                                Ver despesas pendentes
                                <ArrowRight className="w-4 h-4 ml-1.5 group-hover:translate-x-0.5 transition-transform" /> {/* Icone menor */}
                            </Link>
                        </div>
                    </section>
                )}

                {/* Secções de Ações Rápidas e Informações do Sistema - Mais compactas */}
                <section className="grid grid-cols-1 lg:grid-cols-2 gap-5 md:gap-6"> {/* Gap reduzido */}
                    {/* Painel de Ações Rápidas */}
                    <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-100"> {/* Padding e shadow reduzidos */}
                        <h3 className="text-xl font-semibold text-gray-800 mb-5 pb-4 border-b border-gray-100">Ações Rápidas</h3> {/* Texto e borda reduzidos */}
                        <div className="space-y-4"> {/* Espaçamento reduzido */}
                            <Link href="/dashboard/despesas" className="block">
                                <div className="flex items-center p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors group border border-gray-100 transform hover:translate-y-[-1px] hover:shadow-xs"> {/* Padding e shadow reduzidos */}
                                    <Receipt className="w-8 h-8 text-primary-600 mr-4 flex-shrink-0 group-hover:scale-105 transition-transform" /> {/* Icone e margem reduzidos */}
                                    <div>
                                        <h4 className="font-medium text-lg text-gray-900">Gerir Despesas</h4> {/* Texto menor */}
                                        <p className="text-sm text-gray-600 mt-0.5">Visualize, edite e acompanhe todas as suas despesas.</p> {/* Texto menor */}
                                    </div>
                                    <ArrowUpRight className="ml-auto w-5 h-5 text-gray-400 group-hover:text-primary-600 transition-colors" /> {/* Icone menor */}
                                </div>
                            </Link>

                            <Link href="/dashboard/documentos" className="block">
                                <div className="flex items-center p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors group border border-gray-100 transform hover:translate-y-[-1px] hover:shadow-xs">
                                    <FileText className="w-8 h-8 text-indigo-600 mr-4 flex-shrink-0 group-hover:scale-105 transition-transform" />
                                    <div>
                                        <h4 className="font-medium text-lg text-gray-900">Gerir Documentos</h4>
                                        <p className="text-sm text-gray-600 mt-0.5">Faça upload e organize todos os seus documentos importantes.</p>
                                    </div>
                                    <ArrowUpRight className="ml-auto w-5 h-5 text-gray-400 group-hover:text-indigo-600 transition-colors" />
                                </div>
                            </Link>
                        </div>
                    </div>

                    {/* Painel de Informações do Sistema/Utilizador */}
                    <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-100"> {/* Padding e shadow reduzidos */}
                        <h3 className="text-xl font-semibold text-gray-800 mb-5 pb-4 border-b border-gray-100">Detalhes do Perfil e Sistema</h3> {/* Texto e borda reduzidos */}
                        <div className="space-y-4"> {/* Espaçamento reduzido */}
                            <div className="flex items-center p-4 bg-primary-50 rounded-lg border border-primary-100"> {/* Padding e borda reduzidos */}
                                <UserCircle className="w-8 h-8 text-primary-600 mr-4 flex-shrink-0" /> {/* Icone e margem reduzidos */}
                                <div>
                                    <p className="text-lg font-medium text-gray-900"> {/* Texto menor */}
                                        Função: <span className="font-semibold text-primary-700">{user?.cargo || 'Não definido'}</span>
                                    </p>
                                    <p className="text-sm text-gray-600 mt-0.5">O seu papel atual na organização.</p> {/* Texto menor */}
                                </div>
                            </div>

                            <Link href="/dashboard/settings" className="block">
                                <div className="flex items-center p-4 bg-gray-50 rounded-lg border border-gray-100 hover:bg-gray-100 transition-colors group transform hover:translate-y-[-1px] hover:shadow-xs">
                                    <Settings className="w-8 h-8 text-gray-500 mr-4 flex-shrink-0" />
                                    <div>
                                        <h4 className="text-lg font-medium text-gray-900">
                                            Configurações da Conta
                                        </h4>
                                        <p className="text-sm text-gray-600 mt-0.5">Ajuste as suas preferências e dados da conta.</p>
                                    </div>
                                    <ArrowUpRight className="ml-auto w-5 h-5 text-gray-400 group-hover:text-gray-700 transition-colors" />
                                </div>
                            </Link>
                        </div>
                    </div>
                </section>

                {/* Footer com Status do Sistema - Mais compacto */}
                <footer className="text-center pt-8 border-t border-gray-100 mt-12"> {/* Padding e margem reduzidos */}
                    <p className="text-xs text-gray-500 flex flex-col sm:flex-row items-center justify-center space-y-1.5 sm:space-y-0 sm:space-x-3"> {/* Texto e espaçamento reduzidos */}
                        <span className="inline-flex items-center px-3 py-1.5 bg-green-50 rounded-full text-green-700 font-medium text-xs shadow-inner"> {/* Padding e texto reduzidos */}
                            <span className="w-2.5 h-2.5 bg-green-500 rounded-full mr-1.5 animate-pulse"></span> {/* Tamanho do círculo reduzido */}
                            Sistema Online e Operacional
                        </span>
                        <span className="text-gray-300 hidden sm:block text-base">|</span>
                        <span className="inline-flex items-center text-gray-400 text-xs"> {/* Texto menor */}
                            Última atualização: {new Date().toLocaleDateString('pt-PT', { day: '2-digit', month: 'short', year: 'numeric' })} {/* Formato da data mais curto */}
                        </span>
                    </p>
                </footer>
            </div>
        </main>
    );
}