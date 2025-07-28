'use client';

import { useState, useEffect } from 'react';
import { api, Despesa } from '@/lib/api';
import { useAuth } from '@/hooks/useAuth';
import {
    Plus,
    Receipt,
    Calendar,
    Euro,
    FileText,
    CheckCircle,
    XCircle,
    Clock,
    Eye,
    Loader2,
    AlertCircle,
    Filter,
    Search,
    Download,
    Image,
    ExternalLink,
    TrendingUp,
    DollarSign,
    Users,
    ArrowUpRight
} from 'lucide-react';

type StatusDespesa = 'todas' | 'pendente' | 'aprovada' | 'rejeitada';

// Utilitários para verificação segura
const safeString = (value: any): string => {
    if (value === null || value === undefined) return '';
    return String(value);
};

const safeNumber = (value: any): number => {
    if (value === null || value === undefined) return 0;
    const num = typeof value === 'number' ? value : parseFloat(String(value));
    return isNaN(num) ? 0 : num;
};

export default function DespesasPage() {
    const { user, isAdmin } = useAuth();
    const [despesas, setDespesas] = useState<Despesa[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [showCreateModal, setShowCreateModal] = useState(false);
    const [showDetailsModal, setShowDetailsModal] = useState(false);
    const [selectedDespesa, setSelectedDespesa] = useState<Despesa | null>(null);
    const [statusFilter, setStatusFilter] = useState<StatusDespesa>('todas');
    const [searchTerm, setSearchTerm] = useState('');

    // Form state para nova despesa
    const [novaDespesa, setNovaDespesa] = useState({
        descricao: '',
        valor: '',
        data_despesa: '',
        categoria: 'outros' as const,
        observacoes: '',
        comprovativo: null as File | null
    });

    useEffect(() => {
        if (user) {
            fetchDespesas();
        }
    }, [user]);

    const fetchDespesas = async () => {
        try {
            setLoading(true);
            setError('');

            console.log('🔄 Carregando despesas...');
            const response = await api.getDespesas();
            let todasDespesas = response.data || [];

            // Se não for admin, filtrar apenas próprias despesas
            if (!isAdmin && user) {
                todasDespesas = todasDespesas.filter((d: Despesa) =>
                    d.users_permissions_user?.id === user.id
                );
            }

            setDespesas(todasDespesas);
            console.log('✅ Despesas carregadas:', todasDespesas.length);

        } catch (err: any) {
            const errorMessage = safeString(err?.message || 'Erro desconhecido');
            setError(errorMessage);
            console.error('❌ Erro ao carregar despesas:', err);
        } finally {
            setLoading(false);
        }
    };

    const handleCreateDespesa = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!user) {
            setError('Usuário não autenticado.');
            return;
        }

        try {
            setLoading(true);

            let comprovantivoId = null;

            // Upload do comprovativo se existir
            if (novaDespesa.comprovativo) {
                console.log('📤 Fazendo upload do comprovativo...');
                const uploadResult = await api.uploadFile(novaDespesa.comprovativo);
                if (uploadResult && uploadResult.id) {
                    comprovantivoId = uploadResult.id;
                } else {
                    throw new Error('Erro no upload do arquivo: ID não retornado.');
                }
            }

            // Criar despesa
            const despesaData = {
                descricao: safeString(novaDespesa.descricao),
                valor: safeNumber(novaDespesa.valor),
                data_despesa: safeString(novaDespesa.data_despesa),
                categoria: novaDespesa.categoria,
                observacoes: safeString(novaDespesa.observacoes),
                status: 'pendente' as const,
                users_permissions_user: user.id,
                ...(comprovantivoId && { comprovativo: comprovantivoId })
            };

            console.log('➕ Criando despesa:', despesaData);
            await api.createDespesa(despesaData);

            // Reset form
            setNovaDespesa({
                descricao: '',
                valor: '',
                data_despesa: '',
                categoria: 'outros',
                observacoes: '',
                comprovativo: null
            });

            setShowCreateModal(false);
            await fetchDespesas();

            console.log('✅ Despesa criada com sucesso!');

        } catch (err: any) {
            const errorMessage = safeString(err?.message || 'Erro ao criar despesa');
            setError(errorMessage);
            console.error('❌ Erro ao criar despesa:', err);
        } finally {
            setLoading(false);
        }
    };

    const handleStatusChange = async (despesaId: number, novoStatus: 'aprovada' | 'rejeitada', observacoes?: string) => {
        try {
            setLoading(true);

            console.log(`🔄 Alterando status da despesa ${despesaId} para ${novoStatus}`);
            await api.updateDespesaStatus(despesaId, novoStatus, observacoes);
            await fetchDespesas();
            setShowDetailsModal(false);

            console.log('✅ Status alterado com sucesso!');

        } catch (err: any) {
            const errorMessage = safeString(err?.message || 'Erro ao alterar status');
            setError(errorMessage);
            console.error('❌ Erro ao alterar status:', err);
        } finally {
            setLoading(false);
        }
    };

    const formatCurrency = (value: any): string => {
        const numValue = safeNumber(value);
        return new Intl.NumberFormat('pt-PT', {
            style: 'currency',
            currency: 'EUR',
            minimumFractionDigits: 2,
            maximumFractionDigits: 2
        }).format(numValue);
    };

    const formatDate = (dateString: any): string => {
        const dateStr = safeString(dateString);
        if (!dateStr) return 'Data inválida';

        try {
            const date = new Date(dateStr);
            if (isNaN(date.getTime())) return 'Data inválida';
            return date.toLocaleDateString('pt-PT', {
                day: '2-digit',
                month: 'short',
                year: 'numeric'
            });
        } catch {
            return 'Data inválida';
        }
    };

    const getStatusIcon = (status: any) => {
        const statusStr = safeString(status);
        switch (statusStr) {
            case 'aprovada': return <CheckCircle className="w-5 h-5 text-green-600" />;
            case 'rejeitada': return <XCircle className="w-5 h-5 text-red-600" />;
            default: return <Clock className="w-5 h-5 text-yellow-600" />;
        }
    };

    const getStatusColor = (status: any): string => {
        const statusStr = safeString(status);
        switch (statusStr) {
            case 'aprovada': return 'bg-green-100 text-green-800 border-green-200';
            case 'rejeitada': return 'bg-red-100 text-red-800 border-red-200';
            default: return 'bg-yellow-100 text-yellow-800 border-yellow-200';
        }
    };

    // Filtro seguro
    const despesasFiltradas = despesas.filter((despesa) => {
        const despesaStatus = safeString(despesa?.status || '');
        const matchStatus = statusFilter === 'todas' || despesaStatus === statusFilter;

        const descricaoSafe = safeString(despesa?.descricao || '').toLowerCase();
        const categoriaSafe = safeString(despesa?.categoria || '').toLowerCase();
        const searchTermSafe = safeString(searchTerm || '').toLowerCase();

        const matchSearch = !searchTermSafe ||
            descricaoSafe.includes(searchTermSafe) ||
            categoriaSafe.includes(searchTermSafe);

        return matchStatus && matchSearch;
    });

    // Estatísticas
    const getStats = () => {
        const total = despesasFiltradas.length;
        const valorTotal = despesasFiltradas.reduce((acc, despesa) => acc + safeNumber(despesa.valor), 0);
        const pendentes = despesasFiltradas.filter(d => d.status === 'pendente').length;
        const aprovadas = despesasFiltradas.filter(d => d.status === 'aprovada').length;
        
        return { total, valorTotal, pendentes, aprovadas };
    };

    const stats = getStats();

    if (loading && despesas.length === 0) {
        return (
            <div className="flex items-center justify-center h-full min-h-[400px]">
                <div className="flex flex-col items-center space-y-4 text-gray-700 p-8 bg-white rounded-xl shadow-lg max-w-sm w-full">
                    <Loader2 className="w-16 h-16 animate-spin text-primary-500" />
                    <p className="text-2xl font-bold text-gray-800 text-center">A carregar despesas...</p>
                    <p className="text-base text-gray-600 text-center leading-normal">Aguarde um momento enquanto preparamos os seus dados.</p>
                </div>
            </div>
        );
    }

    return (
        <main className="h-full bg-white rounded-xl shadow-md p-6">
            <div className="max-w-full mx-auto space-y-8">

                {/* Header */}
                <section className="flex flex-col md:flex-row md:items-end md:justify-between pb-6 border-b border-gray-100">
                    <div className="mb-4 md:mb-0">
                        <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900 leading-tight flex items-center space-x-3">
                            <Receipt className="w-8 h-8 text-primary-600" />
                            <span>Gestão de <span className="text-primary-600">Despesas</span></span>
                        </h1>
                        <p className="mt-2 text-base text-gray-600">
                            {isAdmin ? 'Supervisione todas as despesas da empresa' : 'Gerencie suas despesas pessoais'}
                        </p>
                        <p className="mt-1 text-sm text-gray-500">
                            Encontradas: <span className="font-semibold text-gray-700">{stats.total} despesas</span> • 
                            Total: <span className="font-semibold text-gray-700">{formatCurrency(stats.valorTotal)}</span>
                        </p>
                    </div>

                    <div className="flex flex-col sm:flex-row items-center space-y-3 sm:space-y-0 sm:space-x-4 mt-4 md:mt-0">
                        <button
                            onClick={() => setShowCreateModal(true)}
                            className="w-full sm:w-auto bg-primary-500 text-white px-6 py-2.5 rounded-lg shadow-md hover:bg-primary-600 transition-all flex items-center justify-center text-base font-medium"
                        >
                            <Plus className="w-5 h-5 mr-1.5" />
                            Nova Despesa
                        </button>
                    </div>
                </section>

                {/* Estatísticas Cards */}
                <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-5">
                    {[
                        { 
                            title: 'Total Despesas', 
                            value: stats.total, 
                            icon: Receipt, 
                            colorClass: 'text-primary-600 bg-primary-50', 
                            borderColor: 'border-primary-100' 
                        },
                        { 
                            title: 'Valor Total', 
                            value: stats.valorTotal, 
                            icon: DollarSign, 
                            colorClass: 'text-green-600 bg-green-50', 
                            isCurrency: true, 
                            borderColor: 'border-green-100' 
                        },
                        { 
                            title: 'Pendentes', 
                            value: stats.pendentes, 
                            icon: Clock, 
                            colorClass: 'text-yellow-600 bg-yellow-50', 
                            borderColor: 'border-yellow-100' 
                        },
                        { 
                            title: 'Aprovadas', 
                            value: stats.aprovadas, 
                            icon: CheckCircle, 
                            colorClass: 'text-green-600 bg-green-50', 
                            borderColor: 'border-green-100' 
                        },
                    ].map((item, index) => (
                        <div
                            key={index}
                            className={`bg-white rounded-lg shadow-sm p-5 border ${item.borderColor || 'border-gray-100'} transform transition-transform duration-200 hover:scale-[1.01] hover:shadow-md cursor-pointer`}
                        >
                            <div className="flex items-center justify-between mb-3">
                                <p className="text-sm font-medium text-gray-500">{item.title}</p>
                                <div className={`p-2 rounded-full ${item.colorClass}`}>
                                    <item.icon className="w-6 h-6" />
                                </div>
                            </div>
                            <p className={`text-3xl font-bold ${item.isCurrency ? 'text-green-600' : 'text-gray-900'}`}>
                                {item.isCurrency ? formatCurrency(item.value) : item.value}
                            </p>
                        </div>
                    ))}
                </section>

                {/* Alerta de Despesas Pendentes (Admin) */}
                {isAdmin && stats.pendentes > 0 && (
                    <section className="bg-yellow-50 border border-yellow-200 text-yellow-800 p-5 rounded-lg flex items-start space-x-4 shadow-sm animate-fade-in">
                        <AlertCircle className="w-6 h-6 text-yellow-500 flex-shrink-0 mt-0.5" />
                        <div>
                            <p className="font-semibold text-base sm:text-lg leading-snug">
                                <strong className="text-yellow-700">{stats.pendentes}</strong> {stats.pendentes === 1 ? 'despesa pendente' : 'despesas pendentes'} aguardam sua aprovação.
                            </p>
                            <button 
                                onClick={() => setStatusFilter('pendente')}
                                className="inline-flex items-center mt-2 text-yellow-700 hover:text-yellow-800 font-medium group transition-colors text-sm"
                            >
                                Ver despesas pendentes
                                <ArrowUpRight className="w-4 h-4 ml-1.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                            </button>
                        </div>
                    </section>
                )}

                {/* Filtros */}
                <section className="bg-white rounded-lg shadow-sm p-6 border border-gray-100">
                    <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">

                        {/* Busca */}
                        <div className="relative flex-1 max-w-md">
                            <Search className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
                            <input
                                type="text"
                                placeholder="Buscar despesas..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(safeString(e.target.value))}
                                className="pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent w-full text-sm"
                            />
                        </div>

                        {/* Filtros */}
                        <div className="flex flex-col sm:flex-row items-center space-y-3 sm:space-y-0 sm:space-x-4">
                            <div className="flex items-center space-x-2">
                                <Filter className="w-5 h-5 text-gray-600" />
                                <span className="text-sm font-medium text-gray-600">Status:</span>
                            </div>
                            <select
                                value={statusFilter}
                                onChange={(e) => setStatusFilter(e.target.value as StatusDespesa)}
                                className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-primary-500 focus:border-transparent text-sm min-w-[150px]"
                            >
                                <option value="todas">Todas</option>
                                <option value="pendente">Pendentes</option>
                                <option value="aprovada">Aprovadas</option>
                                <option value="rejeitada">Rejeitadas</option>
                            </select>
                            
                            <button
                                onClick={() => { setSearchTerm(''); setStatusFilter('todas'); }}
                                className="bg-gray-100 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-200 font-medium text-sm transition-colors"
                            >
                                Limpar
                            </button>
                        </div>
                    </div>
                </section>

                {/* Error */}
                {error && (
                    <section className="bg-red-50 border border-red-200 rounded-lg p-4">
                        <div className="flex items-center space-x-2">
                            <AlertCircle className="w-5 h-5 text-red-600" />
                            <span className="text-red-700">{error}</span>
                            <button
                                onClick={() => setError('')}
                                className="ml-auto text-red-600 hover:text-red-800 p-1"
                            >
                                ✕
                            </button>
                        </div>
                    </section>
                )}

                {/* Grid de Despesas */}
                <section className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4 md:gap-5">
                    {despesasFiltradas.length === 0 ? (
                        <div className="col-span-full bg-white rounded-lg shadow-sm p-12 text-center border border-gray-100">
                            <Receipt className="w-20 h-20 text-gray-300 mx-auto mb-6" />
                            <h3 className="text-2xl font-bold text-gray-900 mb-3">Nenhuma despesa encontrada</h3>
                            <p className="text-lg text-gray-600 mb-8 max-w-md mx-auto leading-relaxed">
                                {searchTerm || statusFilter !== 'todas'
                                    ? 'Tente ajustar os filtros de busca para encontrar suas despesas'
                                    : 'Comece criando sua primeira despesa'
                                }
                            </p>
                            {!searchTerm && statusFilter === 'todas' && (
                                <button
                                    onClick={() => setShowCreateModal(true)}
                                    className="bg-primary-600 text-white px-8 py-3 rounded-lg shadow hover:bg-primary-700 font-semibold flex items-center justify-center mx-auto space-x-2 transition-all"
                                >
                                    <Plus className="w-5 h-5" />
                                    <span>Criar Primeira Despesa</span>
                                </button>
                            )}
                        </div>
                    ) : (
                        despesasFiltradas.map((despesa) => {
                            const descricaoSegura = safeString(despesa?.descricao || 'Sem descrição');
                            const valorSeguro = safeNumber(despesa?.valor || 0);
                            const observacoesSeguras = safeString(despesa?.observacoes || '');
                            const statusSeguro = safeString(despesa?.status || 'pendente');
                            const categoriaSegura = safeString(despesa?.categoria || 'outros');

                            return (
                                <div 
                                    key={despesa.id} 
                                    className="bg-white rounded-lg shadow-sm p-6 border border-gray-100 transform transition-all duration-200 hover:scale-[1.02] hover:shadow-md cursor-pointer"
                                    onClick={() => {
                                        setSelectedDespesa(despesa);
                                        setShowDetailsModal(true);
                                    }}
                                >
                                    {/* Header do Card */}
                                    <div className="flex items-start justify-between mb-4">
                                        <div className="flex items-center space-x-3 flex-1 min-w-0">
                                            <div className="p-2.5 bg-primary-50 rounded-lg border border-primary-100">
                                                <Receipt className="w-6 h-6 text-primary-600" />
                                            </div>
                                            <div className="flex-1 min-w-0">
                                                <h3 className="text-sm font-semibold text-gray-900 truncate leading-tight">
                                                    {descricaoSegura}
                                                </h3>
                                                <p className="text-xs text-gray-500 mt-1">
                                                    {formatDate(despesa.data_despesa)}
                                                </p>
                                            </div>
                                        </div>
                                        
                                        <div className="text-right">
                                            <p className="text-lg font-bold text-gray-900">
                                                {formatCurrency(valorSeguro)}
                                            </p>
                                        </div>
                                    </div>

                                    {/* Conteúdo do Card */}
                                    <div className="space-y-4">
                                        
                                        {/* Categoria e Status */}
                                        <div className="flex items-center justify-between">
                                            <span className="inline-flex items-center px-2.5 py-1 text-xs font-medium bg-gray-100 text-gray-800 rounded-full capitalize">
                                                {categoriaSegura}
                                            </span>
                                            <span className={`inline-flex items-center px-2.5 py-1 text-xs font-medium rounded-full border ${getStatusColor(statusSeguro)}`}>
                                                {getStatusIcon(statusSeguro)}
                                                <span className="ml-1 capitalize">{statusSeguro}</span>
                                            </span>
                                        </div>

                                        {/* Observações */}
                                        {observacoesSeguras && (
                                            <div>
                                                <p className="text-xs text-gray-600 line-clamp-2">
                                                    {observacoesSeguras}
                                                </p>
                                            </div>
                                        )}

                                        {/* Funcionário (Admin) */}
                                        {isAdmin && despesa.users_permissions_user && (
                                            <div className="flex items-center space-x-2 pt-2 border-t border-gray-100">
                                                <Users className="w-4 h-4 text-gray-400" />
                                                <span className="text-xs text-gray-600">
                                                    {safeString(despesa.users_permissions_user?.nomecompleto || 'N/A')}
                                                </span>
                                            </div>
                                        )}

                                        {/* Comprovativo */}
                                        {despesa.comprovativo && (
                                            <div className="flex items-center space-x-2 pt-2 border-t border-gray-100">
                                                <FileText className="w-4 h-4 text-primary-500" />
                                                <span className="text-xs text-gray-600">Comprovativo anexado</span>
                                            </div>
                                        )}

                                        {/* Ação Ver Detalhes */}
                                        <div className="flex items-center justify-between pt-2 border-t border-gray-100">
                                            <span className="text-xs text-gray-500">Clique para ver detalhes</span>
                                            <ArrowUpRight className="w-4 h-4 text-gray-400" />
                                        </div>
                                    </div>
                                </div>
                            );
                        })
                    )}
                </section>

                {/* Footer */}
                <footer className="text-center pt-8 border-t border-gray-100 mt-12">
                    <p className="text-xs text-gray-500 flex flex-col sm:flex-row items-center justify-center space-y-1.5 sm:space-y-0 sm:space-x-3">
                        <span className="inline-flex items-center px-3 py-1.5 bg-green-50 rounded-full text-green-700 font-medium text-xs shadow-inner">
                            <span className="w-2.5 h-2.5 bg-green-500 rounded-full mr-1.5 animate-pulse"></span>
                            Sistema de Despesas Online
                        </span>
                        <span className="text-gray-300 hidden sm:block text-base">|</span>
                        <span className="inline-flex items-center text-gray-400 text-xs">
                            Última sincronização: {new Date().toLocaleDateString('pt-PT', { day: '2-digit', month: 'short', year: 'numeric' })}
                        </span>
                    </p>
                </footer>
            </div>

            {/* Modal Criar Despesa */}
            {showCreateModal && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
                    <div className="bg-white rounded-xl shadow-xl max-w-2xl w-full max-h-screen overflow-y-auto">
                        <div className="p-6">
                            <div className="flex items-center justify-between mb-6">
                                <h2 className="text-2xl font-bold text-gray-900">Nova Despesa</h2>
                                <button
                                    onClick={() => setShowCreateModal(false)}
                                    className="text-gray-400 hover:text-gray-600 p-1"
                                >
                                    ✕
                                </button>
                            </div>

                            <form onSubmit={handleCreateDespesa} className="space-y-6">

                                {/* Descrição */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Descrição *
                                    </label>
                                    <input
                                        type="text"
                                        required
                                        value={novaDespesa.descricao}
                                        onChange={(e) => setNovaDespesa({ ...novaDespesa, descricao: safeString(e.target.value) })}
                                        className="w-full border border-gray-300 rounded-lg px-3 py-2.5 focus:ring-2 focus:ring-primary-500 focus:border-transparent text-sm"
                                        placeholder="Ex: Combustível, Refeição, Hospedagem..."
                                    />
                                </div>

                                {/* Valor e Data */}
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Valor (€) *
                                        </label>
                                        <input
                                            type="number"
                                            step="0.01"
                                            min="0"
                                            required
                                            value={novaDespesa.valor}
                                            onChange={(e) => setNovaDespesa({ ...novaDespesa, valor: safeString(e.target.value) })}
                                            className="w-full border border-gray-300 rounded-lg px-3 py-2.5 focus:ring-2 focus:ring-primary-500 focus:border-transparent text-sm"
                                            placeholder="0.00"
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Data da Despesa *
                                        </label>
                                        <input
                                            type="date"
                                            required
                                            value={novaDespesa.data_despesa}
                                            onChange={(e) => setNovaDespesa({ ...novaDespesa, data_despesa: safeString(e.target.value) })}
                                            className="w-full border border-gray-300 rounded-lg px-3 py-2.5 focus:ring-2 focus:ring-primary-500 focus:border-transparent text-sm"
                                        />
                                    </div>
                                </div>

                                {/* Categoria */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Categoria *
                                    </label>
                                    <select
                                        value={novaDespesa.categoria}
                                        onChange={(e) => setNovaDespesa({ ...novaDespesa, categoria: e.target.value as any })}
                                        className="w-full border border-gray-300 rounded-lg px-3 py-2.5 focus:ring-2 focus:ring-primary-500 focus:border-transparent text-sm"
                                    >
                                        <option value="combustivel">Combustível</option>
                                        <option value="alimentacao">Alimentação</option>
                                        <option value="transporte">Transporte</option>
                                        <option value="hospedagem">Hospedagem</option>
                                        <option value="outros">Outros</option>
                                    </select>
                                </div>

                                {/* Observações */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Observações
                                    </label>
                                    <textarea
                                        value={novaDespesa.observacoes}
                                        onChange={(e) => setNovaDespesa({ ...novaDespesa, observacoes: safeString(e.target.value) })}
                                        rows={3}
                                        className="w-full border border-gray-300 rounded-lg px-3 py-2.5 focus:ring-2 focus:ring-primary-500 focus:border-transparent text-sm"
                                        placeholder="Detalhes adicionais sobre a despesa..."
                                    />
                                </div>

                                {/* Comprovativo */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Comprovativo (Recibo/Fatura)
                                    </label>
                                    <input
                                        type="file"
                                        accept="image/*,.pdf"
                                        onChange={(e) => setNovaDespesa({ ...novaDespesa, comprovativo: e.target.files?.[0] || null })}
                                        className="w-full border border-gray-300 rounded-lg px-3 py-2.5 focus:ring-2 focus:ring-primary-500 focus:border-transparent text-sm"
                                    />
                                    {novaDespesa.comprovativo && (
                                        <p className="text-sm text-gray-600 mt-2 p-2 bg-gray-50 rounded border">
                                            📎 {novaDespesa.comprovativo.name}
                                        </p>
                                    )}
                                </div>

                                {/* Botões */}
                                <div className="flex space-x-4 pt-6 border-t border-gray-100">
                                    <button
                                        type="button"
                                        onClick={() => setShowCreateModal(false)}
                                        className="flex-1 bg-gray-100 text-gray-700 py-3 rounded-lg hover:bg-gray-200 font-medium transition-colors text-sm"
                                    >
                                        Cancelar
                                    </button>
                                    <button
                                        type="submit"
                                        disabled={loading}
                                        className="flex-1 bg-primary-600 text-white py-3 rounded-lg hover:bg-primary-700 font-medium transition-colors disabled:opacity-50 flex items-center justify-center space-x-2 text-sm"
                                    >
                                        {loading ? (
                                            <>
                                                <Loader2 className="w-5 h-5 animate-spin" />
                                                <span>Criando...</span>
                                            </>
                                        ) : (
                                            <span>Criar Despesa</span>
                                        )}
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            )}

            {/* Modal Detalhes */}
            {showDetailsModal && selectedDespesa && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
                    <div className="bg-white rounded-xl shadow-xl max-w-2xl w-full max-h-screen overflow-y-auto">
                        <div className="p-6">
                            <div className="flex items-center justify-between mb-6">
                                <h2 className="text-2xl font-bold text-gray-900">Detalhes da Despesa</h2>
                                <button
                                    onClick={() => setShowDetailsModal(false)}
                                    className="text-gray-400 hover:text-gray-600 p-1"
                                >
                                    ✕
                                </button>
                            </div>

                            <div className="space-y-6">
                                {/* Informações principais */}
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="space-y-4">
                                        <div>
                                            <label className="text-sm font-medium text-gray-600">Descrição</label>
                                            <p className="text-lg text-gray-900 mt-1">{safeString(selectedDespesa.descricao)}</p>
                                        </div>
                                        <div>
                                            <label className="text-sm font-medium text-gray-600">Valor</label>
                                            <p className="text-2xl font-bold text-gray-900 mt-1">{formatCurrency(selectedDespesa.valor)}</p>
                                        </div>
                                    </div>
                                    
                                    <div className="space-y-4">
                                        <div>
                                            <label className="text-sm font-medium text-gray-600">Data</label>
                                            <p className="text-lg text-gray-900 mt-1">{formatDate(selectedDespesa.data_despesa)}</p>
                                        </div>
                                        <div>
                                            <label className="text-sm font-medium text-gray-600">Categoria</label>
                                            <p className="text-lg text-gray-900 capitalize mt-1">{safeString(selectedDespesa.categoria)}</p>
                                        </div>
                                    </div>
                                </div>

                                {/* Status */}
                                <div className="p-4 bg-gray-50 rounded-lg border border-gray-100">
                                    <label className="text-sm font-medium text-gray-600">Status Atual</label>
                                    <div className="flex items-center space-x-2 mt-2">
                                        {getStatusIcon(selectedDespesa.status)}
                                        <span className={`px-3 py-1 rounded-full text-sm font-medium border ${getStatusColor(selectedDespesa.status)}`}>
                                            {safeString(selectedDespesa.status).charAt(0).toUpperCase() + safeString(selectedDespesa.status).slice(1)}
                                        </span>
                                    </div>
                                </div>

                                {/* Observações */}
                                {selectedDespesa.observacoes && (
                                    <div>
                                        <label className="text-sm font-medium text-gray-600">Observações</label>
                                        <p className="text-gray-900 mt-2 p-3 bg-gray-50 rounded-lg border border-gray-100">{safeString(selectedDespesa.observacoes)}</p>
                                    </div>
                                )}

                                {/* Funcionário (Admin) */}
                                {isAdmin && selectedDespesa.users_permissions_user && (
                                    <div>
                                        <label className="text-sm font-medium text-gray-600">Funcionário</label>
                                        <p className="text-lg text-gray-900 mt-1">{safeString(selectedDespesa.users_permissions_user.nomecompleto)}</p>
                                    </div>
                                )}

                                {/* Comprovativo */}
                                {selectedDespesa.comprovativo && (
                                    <div className="pt-4 border-t border-gray-200">
                                        <label className="text-sm font-medium text-gray-600">Comprovativo</label>
                                        <div className="mt-3 flex items-center space-x-4">
                                            {selectedDespesa.comprovativo.mime.startsWith('image/') ? (
                                                <a
                                                    href={api.getMediaUrl(selectedDespesa.comprovativo)}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="block rounded-lg overflow-hidden border border-gray-200 hover:shadow-md transition-shadow"
                                                >
                                                    <img
                                                        src={api.getMediaUrl(selectedDespesa.comprovativo)}
                                                        alt={safeString(selectedDespesa.comprovativo.name)}
                                                        className="h-24 w-auto object-cover rounded-lg"
                                                    />
                                                </a>
                                            ) : (
                                                <div className="flex items-center space-x-2 text-gray-600">
                                                    <FileText className="w-10 h-10 text-primary-500" />
                                                    <span>{safeString(selectedDespesa.comprovativo.name)}</span>
                                                </div>
                                            )}

                                            <a
                                                href={api.getMediaUrl(selectedDespesa.comprovativo)}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-lg shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 transition-colors"
                                            >
                                                <Download className="w-4 h-4 mr-2" />
                                                Ver / Baixar
                                            </a>
                                        </div>
                                    </div>
                                )}

                                {/* Ações de Aprovação para Admin */}
                                {isAdmin && selectedDespesa.status === 'pendente' && (
                                    <div className="pt-6 border-t border-gray-200 space-y-4">
                                        <h3 className="text-lg font-semibold text-gray-900">Ações de Aprovação</h3>
                                        <div className="flex space-x-4">
                                            <button
                                                onClick={() => handleStatusChange(selectedDespesa.id, 'aprovada')}
                                                disabled={loading}
                                                className="flex-1 bg-green-600 text-white py-3 rounded-lg hover:bg-green-700 font-medium flex items-center justify-center space-x-2 disabled:opacity-50 transition-colors"
                                            >
                                                <CheckCircle className="w-5 h-5" />
                                                <span>Aprovar</span>
                                            </button>
                                            <button
                                                onClick={() => handleStatusChange(selectedDespesa.id, 'rejeitada', 'Rejeitada pelo administrador')}
                                                disabled={loading}
                                                className="flex-1 bg-red-600 text-white py-3 rounded-lg hover:bg-red-700 font-medium flex items-center justify-center space-x-2 disabled:opacity-50 transition-colors"
                                            >
                                                <XCircle className="w-5 h-5" />
                                                <span>Rejeitar</span>
                                            </button>
                                        </div>
                                    </div>
                                )}
                            </div>

                            <div className="flex justify-end pt-6 border-t border-gray-200 mt-6">
                                <button
                                    onClick={() => setShowDetailsModal(false)}
                                    className="bg-gray-100 text-gray-700 px-6 py-3 rounded-lg hover:bg-gray-200 font-medium transition-colors"
                                >
                                    Fechar
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </main>
    );
}