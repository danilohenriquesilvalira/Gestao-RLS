'use client';

import { useState, useEffect, useMemo } from 'react'; // Adicionado useMemo
import { api, Despesa } from '@/lib/api';
import { useAuth } from '@/hooks/useAuth';
import {
    Plus,
    Receipt,
    Euro,
    FileText,
    CheckCircle,
    XCircle,
    Clock,
    Eye,
    Loader2,
    AlertCircle,
    Download,
    Image,
    DollarSign,
    Users,
    ArrowUpRight,
    ChevronLeft, // Ícones para paginação
    ChevronRight
} from 'lucide-react';

// Componentes UI reutilizáveis
import Loading from '@/components/ui/Loading';
import EmptyState from '@/components/ui/EmptyState';
import StatsCard from '@/components/ui/StatsCard';
import PageHeader from '@/components/ui/PageHeader';
import SearchFilterBar from '@/components/ui/SearchFilterBar';
import Alert from '@/components/ui/Alert';
import Modal from '@/components/ui/Modal';
import PageFooter from '@/components/ui/PageFooter';
import Button from '@/components/ui/Button';

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

    // Estados para Paginação
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 6; // Definido para 6 cartões por página

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

            // Ordenar despesas pela data_despesa, da mais recente para a mais antiga
            todasDespesas.sort((a, b) => {
                const dateA = new Date(safeString(a.data_despesa)).getTime();
                const dateB = new Date(safeString(b.data_despesa)).getTime();
                return dateB - dateA; // Para ordem decrescente (mais recente primeiro)
            });


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
            await fetchDespesas(); // Recarrega as despesas para incluir a nova e reordenar

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

    // Filtro e Paginação
    const filteredAndSortedDespesas = useMemo(() => {
        return despesas.filter((despesa) => {
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
    }, [despesas, statusFilter, searchTerm]);

    // Lógica de Paginação
    const totalPages = Math.ceil(filteredAndSortedDespesas.length / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const paginatedDespesas = filteredAndSortedDespesas.slice(startIndex, endIndex);

    const handleNextPage = () => {
        if (currentPage < totalPages) {
            setCurrentPage(currentPage + 1);
        }
    };

    const handlePreviousPage = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
    };

    // Estatísticas (agora baseadas nas despesas filtradas ANTES da paginação)
    const getStats = () => {
        const total = filteredAndSortedDespesas.length;
        const valorTotal = filteredAndSortedDespesas.reduce((acc, despesa) => acc + safeNumber(despesa.valor), 0);
        const pendentes = filteredAndSortedDespesas.filter(d => d.status === 'pendente').length;
        const aprovadas = filteredAndSortedDespesas.filter(d => d.status === 'aprovada').length;

        return { total, valorTotal, pendentes, aprovadas };
    };

    const stats = getStats();

    // Filter options para o SearchFilterBar
    const filterOptions = [
        { value: 'todas', label: 'Todas' },
        { value: 'pendente', label: 'Pendentes' },
        { value: 'aprovada', label: 'Aprovadas' },
        { value: 'rejeitada', label: 'Rejeitadas' }
    ];

    if (loading && despesas.length === 0) {
        return <Loading title="A carregar despesas..." />;
    }

    return (
        <main className="h-full bg-white rounded-xl shadow-md p-6">
            <div className="max-w-full mx-auto space-y-8">

                {/* Header */}
                <PageHeader
                    title="Gestão de Despesas"
                    subtitle={isAdmin ? 'Supervisione todas as despesas da empresa' : 'Gerencie suas despesas pessoais'}
                    icon={Receipt}
                    stats={`Encontradas: ${stats.total} despesas • Total: ${formatCurrency(stats.valorTotal)}`}
                    buttonText="Nova Despesa"
                    buttonIcon={Plus}
                    onButtonClick={() => setShowCreateModal(true)}
                />

                {/* Estatísticas Cards */}
                <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-5">
                    <StatsCard
                        title="Total Despesas"
                        value={stats.total}
                        icon={Receipt}
                        iconBg="bg-primary-500"
                        bg="bg-primary-50"
                        change="+12%" // Este dado é estático, considere torná-lo dinâmico se tiver a fonte
                        changePositive={true}
                    />
                    <StatsCard
                        title="Valor Total"
                        value={stats.valorTotal}
                        icon={DollarSign}
                        isCurrency={true}
                        iconBg="bg-green-500"
                        bg="bg-green-50"
                        change="+8%" // Este dado é estático, considere torná-lo dinâmico se tiver a fonte
                        changePositive={true}
                    />
                    <StatsCard
                        title="Pendentes"
                        value={stats.pendentes}
                        icon={Clock}
                        iconBg="bg-yellow-500"
                        bg="bg-yellow-50"
                        change="-5%" // Este dado é estático, considere torná-lo dinâmico se tiver a fonte
                        changePositive={false}
                    />
                    <StatsCard
                        title="Aprovadas"
                        value={stats.aprovadas}
                        icon={CheckCircle}
                        iconBg="bg-green-500"
                        bg="bg-green-50"
                        change="+15%" // Este dado é estático, considere torná-lo dinâmico se tiver a fonte
                        changePositive={true}
                    />
                </section>

                {/* Alerta de Despesas Pendentes (Admin) */}
                {isAdmin && stats.pendentes > 0 && (
                    <Alert
                        type="warning"
                        title={`${stats.pendentes} ${stats.pendentes === 1 ? 'despesa pendente' : 'despesas pendentes'} aguardam sua aprovação.`}
                        description="Revise-as para manter o fluxo de trabalho em dia."
                        action={{
                            label: "Ver despesas pendentes",
                            onClick: () => setStatusFilter('pendente')
                        }}
                    />
                )}

                {/* Filtros */}
                <SearchFilterBar
                    searchTerm={searchTerm}
                    onSearchChange={setSearchTerm}
                    searchPlaceholder="Buscar despesas..."
                    filterValue={statusFilter}
                    onFilterChange={(value) => {
                        setStatusFilter(value as StatusDespesa);
                        setCurrentPage(1); // Resetar para a primeira página ao mudar o filtro
                    }}
                    filterOptions={filterOptions}
                    filterLabel="Status:"
                    onClear={() => {
                        setSearchTerm('');
                        setStatusFilter('todas');
                        setCurrentPage(1); // Resetar para a primeira página ao limpar
                    }}
                />

                {/* Error */}
                {error && (
                    <Alert
                        type="error"
                        title="Erro"
                        description={error}
                        dismissible={true}
                        onDismiss={() => setError('')}
                    />
                )}

                {/* Grid de Despesas */}
                <section className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4 md:gap-5">
                    {paginatedDespesas.length === 0 ? (
                        <EmptyState
                            icon={Receipt}
                            title="Nenhuma despesa encontrada"
                            description={
                                searchTerm || statusFilter !== 'todas'
                                    ? 'Tente ajustar os filtros de busca para encontrar suas despesas'
                                    : 'Comece criando sua primeira despesa'
                            }
                            buttonText={!searchTerm && statusFilter === 'todas' ? "Criar Primeira Despesa" : undefined}
                            onButtonClick={!searchTerm && statusFilter === 'todas' ? () => setShowCreateModal(true) : undefined}
                            showButton={!searchTerm && statusFilter === 'todas'}
                        />
                    ) : (
                        paginatedDespesas.map((despesa) => {
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

                {/* Controles de Paginação */}
                {totalPages > 1 && (
                    <div className="flex justify-center items-center space-x-4 mt-8">
                        <Button
                            onClick={handlePreviousPage}
                            disabled={currentPage === 1 || loading}
                            variant="secondary"
                            className="flex items-center"
                        >
                            <ChevronLeft className="w-4 h-4 mr-2" /> Anterior
                        </Button>
                        <span className="text-sm font-medium text-gray-700">
                            Página {currentPage} de {totalPages}
                        </span>
                        <Button
                            onClick={handleNextPage}
                            disabled={currentPage === totalPages || loading}
                            variant="secondary"
                            className="flex items-center"
                        >
                            Próxima <ChevronRight className="w-4 h-4 ml-2" />
                        </Button>
                    </div>
                )}


                {/* Footer */}
                <PageFooter systemName="Sistema de Despesas Online" />
            </div>

            {/* Modal Criar Despesa */}
            <Modal
                isOpen={showCreateModal}
                onClose={() => setShowCreateModal(false)}
                title="Nova Despesa"
                size="lg"
            >
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
                        <Button
                            type="button"
                            variant="secondary"
                            onClick={() => setShowCreateModal(false)}
                            className="flex-1"
                        >
                            Cancelar
                        </Button>
                        <Button
                            type="submit"
                            loading={loading}
                            className="flex-1"
                        >
                            Criar Despesa
                        </Button>
                    </div>
                </form>
            </Modal>

            {/* Modal Detalhes */}
            {selectedDespesa && (
                <Modal
                    isOpen={showDetailsModal}
                    onClose={() => setShowDetailsModal(false)}
                    title="Detalhes da Despesa"
                    size="lg"
                >
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
                                    <Button
                                        onClick={() => handleStatusChange(selectedDespesa.id, 'aprovada')}
                                        loading={loading}
                                        variant="primary"
                                        className="flex-1 bg-green-600 hover:bg-green-700"
                                    >
                                        <CheckCircle className="w-5 h-5 mr-2" />
                                        Aprovar
                                    </Button>
                                    <Button
                                        onClick={() => handleStatusChange(selectedDespesa.id, 'rejeitada', 'Rejeitada pelo administrador')}
                                        loading={loading}
                                        variant="danger"
                                        className="flex-1"
                                    >
                                        <XCircle className="w-5 h-5 mr-2" />
                                        Rejeitar
                                    </Button>
                                </div>
                            </div>
                        )}
                    </div>

                    <div className="flex justify-end pt-6 border-t border-gray-200 mt-6">
                        <Button
                            variant="secondary"
                            onClick={() => setShowDetailsModal(false)}
                        >
                            Fechar
                        </Button>
                    </div>
                </Modal>
            )}
        </main>
    );
}