'use client';

import { useState, useEffect } from 'react';
import { api } from '@/lib/api';
import { useAuth } from '@/hooks/useAuth';
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
    Settings,
    TrendingUp,
    Activity,
    CheckCircle,
    Calendar,
    Target,
    Zap,
    BarChart3
} from 'lucide-react';

interface DashboardStats {
    totalDespesas: number;
    totalDocumentos: number;
    valorTotalDespesas: number;
    despesasPendentes: number;
}

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

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-[60vh]">
                <div className="flex flex-col items-center space-y-4 text-gray-700 p-8 bg-white/70 backdrop-blur-sm rounded-2xl shadow-xl border border-gray-200/50">
                    <div className="relative">
                        <Loader2 className="w-12 h-12 animate-spin text-primary-500" />
                        <div className="absolute inset-0 w-12 h-12 border-4 border-primary-200 rounded-full animate-pulse"></div>
                    </div>
                    <div className="text-center">
                        <p className="text-xl font-bold text-gray-800">Carregando Dashboard</p>
                        <p className="text-sm text-gray-600 mt-1">Preparando seus dados...</p>
                    </div>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="flex items-center justify-center min-h-[60vh]">
                <div className="text-center p-8 bg-white/70 backdrop-blur-sm rounded-2xl shadow-xl border border-red-200/50 max-w-md">
                    <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                        <AlertCircle className="w-8 h-8 text-red-500" />
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2">Ops! Algo deu errado</h3>
                    <p className="text-gray-600 mb-6 leading-relaxed">{error}</p>
                    <button
                        onClick={fetchStats}
                        className="bg-red-500 hover:bg-red-600 text-white px-6 py-3 rounded-xl font-medium transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105"
                    >
                        Tentar Novamente
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="space-y-8">
            {/* Hero Section */}
            <section className="relative overflow-hidden bg-gradient-to-br from-white to-primary-50/30 rounded-2xl border border-gray-200/50 shadow-sm">
                <div className="absolute inset-0 bg-grid-gray-100/25 bg-grid-16"></div>
                <div className="relative p-8">
                    <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
                        <div className="mb-6 lg:mb-0">
                            <div className="flex items-center space-x-3 mb-3">
                                <div className="w-12 h-12 bg-gradient-to-br from-primary-500 to-primary-600 rounded-xl flex items-center justify-center shadow-lg">
                                    <Activity className="w-6 h-6 text-white" />
                                </div>
                                <div>
                                    <h1 className="text-3xl font-bold text-gray-900">
                                        Bem-vindo, <span className="text-primary-600">{user?.nomecompleto?.split(' ')[0]}</span>! 👋
                                    </h1>
                                    <p className="text-gray-600 mt-1">Aqui está um resumo das suas atividades hoje</p>
                                </div>
                            </div>
                            <div className="flex items-center space-x-4 text-sm">
                                <span className="inline-flex items-center px-3 py-1.5 bg-primary-100 text-primary-700 rounded-full font-medium">
                                    <span className="w-2 h-2 bg-primary-500 rounded-full mr-2 animate-pulse"></span>
                                    {isAdmin ? 'Administrador' : 'Funcionário'}
                                </span>
                                <span className="text-gray-500">
                                    {new Date().toLocaleDateString('pt-PT', { 
                                        weekday: 'long', 
                                        year: 'numeric', 
                                        month: 'long', 
                                        day: 'numeric' 
                                    })}
                                </span>
                            </div>
                        </div>

                        <div className="flex flex-col sm:flex-row gap-3">
                            <Link href="/dashboard/despesas/nova">
                                <button className="group bg-gradient-to-r from-primary-500 to-primary-600 text-white px-6 py-3 rounded-xl font-medium shadow-lg hover:shadow-xl transition-all duration-200 transform hover:scale-105 flex items-center space-x-2">
                                    <Plus className="w-5 h-5 group-hover:rotate-90 transition-transform duration-200" />
                                    <span>Nova Despesa</span>
                                </button>
                            </Link>
                            <Link href="/dashboard/documentos">
                                <button className="group bg-white text-gray-700 border border-gray-200 px-6 py-3 rounded-xl font-medium hover:bg-gray-50 transition-all duration-200 flex items-center space-x-2">
                                    <FileText className="w-5 h-5 text-primary-600 group-hover:scale-110 transition-transform duration-200" />
                                    <span>Documentos</span>
                                </button>
                            </Link>
                        </div>
                    </div>
                </div>
            </section>

            {/* Stats Grid */}
            <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {[
                    { 
                        title: 'Total de Despesas', 
                        value: stats.totalDespesas, 
                        icon: Receipt, 
                        gradient: 'from-blue-500 to-blue-600',
                        bg: 'bg-blue-50',
                        iconBg: 'bg-blue-500',
                        change: '+12%',
                        changePositive: true
                    },
                    { 
                        title: 'Valor Total', 
                        value: stats.valorTotalDespesas, 
                        icon: DollarSign, 
                        gradient: 'from-green-500 to-green-600',
                        bg: 'bg-green-50',
                        iconBg: 'bg-green-500',
                        isCurrency: true,
                        change: '+8%',
                        changePositive: true
                    },
                    { 
                        title: 'Pendentes', 
                        value: stats.despesasPendentes, 
                        icon: Clock, 
                        gradient: 'from-yellow-500 to-orange-500',
                        bg: 'bg-yellow-50',
                        iconBg: 'bg-yellow-500',
                        change: '-5%',
                        changePositive: false
                    },
                    { 
                        title: 'Documentos', 
                        value: stats.totalDocumentos, 
                        icon: FileText, 
                        gradient: 'from-purple-500 to-purple-600',
                        bg: 'bg-purple-50',
                        iconBg: 'bg-purple-500',
                        change: '+15%',
                        changePositive: true
                    },
                ].map((item, index) => (
                    <div
                        key={index}
                        className="group relative bg-white/70 backdrop-blur-sm rounded-2xl border border-gray-200/50 p-6 hover:shadow-xl transition-all duration-300 transform hover:scale-105 cursor-pointer overflow-hidden"
                    >
                        {/* Background decoration */}
                        <div className={`absolute top-0 right-0 w-24 h-24 ${item.bg} rounded-full -mr-12 -mt-12 opacity-20 group-hover:opacity-30 transition-opacity duration-300`}></div>
                        
                        <div className="flex items-start justify-between mb-4">
                            <div className={`w-12 h-12 ${item.iconBg} rounded-xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-200`}>
                                <item.icon className="w-6 h-6 text-white" />
                            </div>
                            <div className={`text-xs font-medium px-2 py-1 rounded-full flex items-center space-x-1 ${
                                item.changePositive ? 'text-green-600 bg-green-100' : 'text-red-600 bg-red-100'
                            }`}>
                                <TrendingUp className={`w-3 h-3 ${item.changePositive ? '' : 'rotate-180'}`} />
                                <span>{item.change}</span>
                            </div>
                        </div>
                        
                        <div>
                            <p className="text-sm font-medium text-gray-600 mb-1">{item.title}</p>
                            <p className="text-3xl font-bold text-gray-900 mb-2">
                                {item.isCurrency ? formatCurrency(item.value) : item.value}
                            </p>
                            <p className="text-xs text-gray-500">vs. mês anterior</p>
                        </div>
                    </div>
                ))}
            </section>

            {/* Alert Section */}
            {isAdmin && stats.despesasPendentes > 0 && (
                <section className="relative overflow-hidden bg-gradient-to-r from-amber-50 to-orange-50 border border-amber-200/50 rounded-2xl p-6 shadow-sm">
                    <div className="absolute inset-0 bg-grid-amber-100/25 bg-grid-16"></div>
                    <div className="relative flex items-start space-x-4">
                        <div className="w-12 h-12 bg-amber-500 rounded-xl flex items-center justify-center shadow-lg">
                            <Bell className="w-6 h-6 text-white animate-bounce" />
                        </div>
                        <div className="flex-1">
                            <h3 className="text-lg font-semibold text-amber-900 mb-1">
                                {stats.despesasPendentes} {stats.despesasPendentes === 1 ? 'despesa pendente' : 'despesas pendentes'}
                            </h3>
                            <p className="text-amber-700 mb-4">
                                Existem despesas aguardando sua aprovação. Revise-as para manter o fluxo de trabalho em dia.
                            </p>
                            <Link href="/dashboard/despesas?status=pendente">
                                <button className="group inline-flex items-center space-x-2 bg-amber-500 hover:bg-amber-600 text-white px-4 py-2 rounded-xl font-medium transition-all duration-200 shadow-md hover:shadow-lg">
                                    <span>Revisar Despesas</span>
                                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-200" />
                                </button>
                            </Link>
                        </div>
                    </div>
                </section>
            )}

            {/* Main Content Grid */}
            <section className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Quick Actions */}
                <div className="bg-white/70 backdrop-blur-sm rounded-2xl border border-gray-200/50 p-6 shadow-sm">
                    <div className="flex items-center space-x-3 mb-6">
                        <div className="w-10 h-10 bg-gradient-to-br from-primary-500 to-primary-600 rounded-xl flex items-center justify-center">
                            <Zap className="w-5 h-5 text-white" />
                        </div>
                        <h3 className="text-lg font-semibold text-gray-900">Ações Rápidas</h3>
                    </div>
                    
                    <div className="space-y-3">
                        {[
                            {
                                title: 'Gerir Despesas',
                                description: 'Visualize e acompanhe todas as suas despesas',
                                href: '/dashboard/despesas',
                                icon: Receipt,
                                color: 'text-blue-600',
                                bg: 'bg-blue-50'
                            },
                            {
                                title: 'Gerir Documentos',
                                description: 'Organize todos os seus documentos importantes',
                                href: '/dashboard/documentos',
                                icon: FileText,
                                color: 'text-purple-600',
                                bg: 'bg-purple-50'
                            },
                            {
                                title: 'Configurações',
                                description: 'Ajuste suas preferências e dados da conta',
                                href: '/dashboard/settings',
                                icon: Settings,
                                color: 'text-gray-600',
                                bg: 'bg-gray-50'
                            }
                        ].map((action, index) => (
                            <Link key={index} href={action.href}>
                                <div className="group flex items-center p-4 rounded-xl border border-gray-200/50 hover:border-primary-200 hover:bg-primary-50/30 transition-all duration-200 cursor-pointer">
                                    <div className={`w-10 h-10 ${action.bg} rounded-xl flex items-center justify-center mr-4 group-hover:scale-110 transition-transform duration-200`}>
                                        <action.icon className={`w-5 h-5 ${action.color}`} />
                                    </div>
                                    <div className="flex-1">
                                        <h4 className="font-medium text-gray-900 group-hover:text-primary-600 transition-colors duration-200">
                                            {action.title}
                                        </h4>
                                        <p className="text-sm text-gray-600">{action.description}</p>
                                    </div>
                                    <ArrowUpRight className="w-5 h-5 text-gray-400 group-hover:text-primary-600 group-hover:translate-x-1 group-hover:-translate-y-1 transition-all duration-200" />
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>

                {/* Account Overview */}
                <div className="bg-white/70 backdrop-blur-sm rounded-2xl border border-gray-200/50 p-6 shadow-sm">
                    <div className="flex items-center space-x-3 mb-6">
                        <div className="w-10 h-10 bg-gradient-to-br from-primary-500 to-primary-600 rounded-xl flex items-center justify-center">
                            <UserCircle className="w-5 h-5 text-white" />
                        </div>
                        <h3 className="text-lg font-semibold text-gray-900">Visão Geral da Conta</h3>
                    </div>
                    
                    <div className="space-y-4">
                        <div className="flex items-center justify-between p-4 bg-primary-50/50 rounded-xl border border-primary-100/50">
                            <div>
                                <p className="font-medium text-gray-900">Função Atual</p>
                                <p className="text-sm text-gray-600 mt-0.5">Seu papel na organização</p>
                            </div>
                            <span className="px-3 py-1.5 bg-primary-500 text-white rounded-lg text-sm font-medium">
                                {user?.cargo || (isAdmin ? 'Administrador' : 'Funcionário')}
                            </span>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div className="text-center p-4 bg-gray-50/50 rounded-xl border border-gray-100/50">
                                <CheckCircle className="w-8 h-8 text-green-500 mx-auto mb-2" />
                                <p className="text-sm font-medium text-gray-900">Conta Ativa</p>
                                <p className="text-xs text-gray-600">Status verificado</p>
                            </div>
                            <div className="text-center p-4 bg-gray-50/50 rounded-xl border border-gray-100/50">
                                <Calendar className="w-8 h-8 text-blue-500 mx-auto mb-2" />
                                <p className="text-sm font-medium text-gray-900">Este Mês</p>
                                <p className="text-xs text-gray-600">{stats.totalDespesas} despesas</p>
                            </div>
                        </div>

                        <div className="p-4 bg-gradient-to-r from-gray-50 to-primary-50/30 rounded-xl border border-gray-200/50">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-sm font-medium text-gray-900">Atividade Recente</p>
                                    <p className="text-xs text-gray-600 mt-0.5">Suas ações mais recentes</p>
                                </div>
                                <BarChart3 className="w-5 h-5 text-primary-600" />
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* System Status */}
            <section className="bg-white/70 backdrop-blur-sm rounded-2xl border border-gray-200/50 p-6 shadow-sm">
                <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                        <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                        <span className="text-sm font-medium text-gray-700">Sistema Operacional</span>
                        <span className="text-xs text-gray-500">
                            Última atualização: {new Date().toLocaleDateString('pt-PT')}
                        </span>
                    </div>
                    <div className="flex items-center space-x-2 text-xs text-gray-500">
                        <span>v2.1.0</span>
                        <span>•</span>
                        <span>Todos os serviços online</span>
                    </div>
                </div>
            </section>
        </div>
    );
}