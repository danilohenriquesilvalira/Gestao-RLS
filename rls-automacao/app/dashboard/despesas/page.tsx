// app/dashboard/despesas/page.tsx - 

'use client';

import { useState, useEffect } from 'react';
import { api, Despesa } from '@/lib/api'; // 
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
    Download, // Ícone para download
    Image, // Ícone para imagem
    ExternalLink // Ícone para link externo
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
            return date.toLocaleDateString('pt-PT');
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
            case 'aprovada': return 'bg-green-100 text-green-800';
            case 'rejeitada': return 'bg-red-100 text-red-800';
            default: return 'bg-yellow-100 text-yellow-800';
        }
    };

    //  FILTRO COMPLETAMENTE SEGURO
    const despesasFiltradas = despesas.filter((despesa) => {
        // Verificação de status
        const despesaStatus = safeString(despesa?.status || '');
        const matchStatus = statusFilter === 'todas' || despesaStatus === statusFilter;

        // Verificação de busca - TOTALMENTE SEGURA
        const descricaoSafe = safeString(despesa?.descricao || '').toLowerCase();
        const categoriaSafe = safeString(despesa?.categoria || '').toLowerCase();
        const searchTermSafe = safeString(searchTerm || '').toLowerCase();

        const matchSearch = !searchTermSafe ||
            descricaoSafe.includes(searchTermSafe) ||
            categoriaSafe.includes(searchTermSafe);

        return matchStatus && matchSearch;
    });

    if (loading && despesas.length === 0) {
        return (
            <div className="flex items-center justify-center h-screen">
                <div className="flex items-center space-x-3 text-primary-600">
                    <Loader2 className="w-8 h-8 animate-spin" />
                    <span className="text-lg">Carregando despesas...</span>
                </div>
            </div>
        );
    }

    return (
        <div className="p-6 max-w-7xl mx-auto">

            {/* Header */}
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-8">
                <div>
                    <h1 className="text-3xl font-bold text-gray-900 flex items-center space-x-3">
                        <Receipt className="w-8 h-8 text-primary-600" />
                        <span>Gestão de Despesas</span>
                    </h1>
                    <p className="text-gray-600 mt-1">
                        {isAdmin ? 'Gerenciar todas as despesas' : 'Suas despesas pessoais'}
                    </p>
                    <p className="text-sm text-gray-500 mt-1">
                        Total encontrado: {despesasFiltradas.length} despesa{despesasFiltradas.length !== 1 ? 's' : ''}
                    </p>
                </div>

                <button
                    onClick={() => setShowCreateModal(true)}
                    className="bg-primary-600 text-white px-6 py-3 rounded-lg hover:bg-primary-700 font-medium flex items-center space-x-2 transition-colors mt-4 lg:mt-0"
                >
                    <Plus className="w-5 h-5" />
                    <span>Nova Despesa</span>
                </button>
            </div>

            {/* Filtros */}
            <div className="bg-white rounded-xl shadow-soft p-6 border border-gray-100 mb-6">
                <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">

                    {/* Busca */}
                    <div className="relative">
                        <Search className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
                        <input
                            type="text"
                            placeholder="Buscar despesas..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(safeString(e.target.value))}
                            className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent w-full lg:w-80"
                        />
                    </div>

                    {/* Filtro de Status */}
                    <div className="flex items-center space-x-4">
                        <div className="flex items-center space-x-2">
                            <Filter className="w-5 h-5 text-gray-600" />
                            <span className="text-sm font-medium text-gray-600">Status:</span>
                        </div>
                        <select
                            value={statusFilter}
                            onChange={(e) => setStatusFilter(e.target.value as StatusDespesa)}
                            className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                        >
                            <option value="todas">Todas</option>
                            <option value="pendente">Pendentes</option>
                            <option value="aprovada">Aprovadas</option>
                            <option value="rejeitada">Rejeitadas</option>
                        </select>
                    </div>
                </div>
            </div>

            {/* Error */}
            {error && (
                <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
                    <div className="flex items-center space-x-2">
                        <AlertCircle className="w-5 h-5 text-red-600" />
                        <span className="text-red-700">{error}</span>
                        <button
                            onClick={() => setError('')}
                            className="ml-auto text-red-600 hover:text-red-800"
                        >
                            ✕
                        </button>
                    </div>
                </div>
            )}

            {/* Lista de Despesas */}
            <div className="bg-white rounded-xl shadow-soft border border-gray-100">
                {despesasFiltradas.length === 0 ? (
                    <div className="text-center py-12">
                        <Receipt className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                        <h3 className="text-lg font-medium text-gray-900 mb-2">Nenhuma despesa encontrada</h3>
                        <p className="text-gray-600 mb-6">
                            {searchTerm || statusFilter !== 'todas'
                                ? 'Tente ajustar os filtros ou criar uma nova despesa'
                                : 'Comece criando sua primeira despesa'
                            }
                        </p>
                        {!searchTerm && statusFilter === 'todas' && (
                            <button
                                onClick={() => setShowCreateModal(true)}
                                className="bg-primary-600 text-white px-6 py-3 rounded-lg hover:bg-primary-700 font-medium"
                            >
                                Criar Primeira Despesa
                            </button>
                        )}
                    </div>
                ) : (
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead className="bg-gray-50">
                                <tr>
                                    <th className="text-left py-4 px-6 font-medium text-gray-600">Descrição</th>
                                    <th className="text-left py-4 px-6 font-medium text-gray-600">Valor</th>
                                    <th className="text-left py-4 px-6 font-medium text-gray-600">Data</th>
                                    <th className="text-left py-4 px-6 font-medium text-gray-600">Categoria</th>
                                    <th className="text-left py-4 px-6 font-medium text-gray-600">Status</th>
                                    {isAdmin && (
                                        <th className="text-left py-4 px-6 font-medium text-gray-600">Funcionário</th>
                                    )}
                                    <th className="text-left py-4 px-6 font-medium text-gray-600">Ações</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-100">
                                {despesasFiltradas.map((despesa) => {
                                    const descricaoSegura = safeString(despesa?.descricao || 'Sem descrição');
                                    const valorSeguro = safeNumber(despesa?.valor || 0);
                                    const observacoesSeguras = safeString(despesa?.observacoes || '');
                                    const statusSeguro = safeString(despesa?.status || 'pendente');
                                    const categoriaSegura = safeString(despesa?.categoria || 'outros');

                                    return (
                                        <tr key={despesa.id} className="hover:bg-gray-50">
                                            <td className="py-4 px-6">
                                                <div className="font-medium text-gray-900">{descricaoSegura}</div>
                                                {observacoesSeguras && (
                                                    <div className="text-sm text-gray-500 mt-1">{observacoesSeguras}</div>
                                                )}
                                            </td>
                                            <td className="py-4 px-6">
                                                <span className="text-lg font-semibold text-gray-900">
                                                    {formatCurrency(valorSeguro)}
                                                </span>
                                            </td>
                                            <td className="py-4 px-6 text-gray-600">
                                                {formatDate(despesa.data_despesa)}
                                            </td>
                                            <td className="py-4 px-6">
                                                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800 capitalize">
                                                    {categoriaSegura}
                                                </span>
                                            </td>
                                            <td className="py-4 px-6">
                                                <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(statusSeguro)}`}>
                                                    {getStatusIcon(statusSeguro)}
                                                    <span className="ml-1 capitalize">{statusSeguro}</span>
                                                </span>
                                            </td>
                                            {isAdmin && (
                                                <td className="py-4 px-6 text-gray-600">
                                                    {safeString(despesa.users_permissions_user?.nomecompleto || 'N/A')}
                                                </td>
                                            )}
                                            <td className="py-4 px-6">
                                                <button
                                                    onClick={() => {
                                                        setSelectedDespesa(despesa);
                                                        setShowDetailsModal(true);
                                                    }}
                                                    className="text-primary-600 hover:text-primary-700 font-medium flex items-center space-x-1"
                                                >
                                                    <Eye className="w-4 h-4" />
                                                    <span>Ver</span>
                                                </button>
                                            </td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                    </div>
                )}
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
                                    className="text-gray-400 hover:text-gray-600"
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
                                        className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                                        placeholder="Ex: Combustível, Refeição, etc."
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
                                            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-primary-500 focus:border-transparent"
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
                                            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                                        />
                                    </div>
                                </div>

                                {/* Categoria */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Categoria
                                    </label>
                                    <select
                                        value={novaDespesa.categoria}
                                        onChange={(e) => setNovaDespesa({ ...novaDespesa, categoria: e.target.value as any })}
                                        className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-primary-500 focus:border-transparent"
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
                                        className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                                        placeholder="Detalhes adicionais..."
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
                                        className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                                    />
                                    {novaDespesa.comprovativo && (
                                        <p className="text-sm text-gray-600 mt-1">
                                            Arquivo selecionado: {novaDespesa.comprovativo.name}
                                        </p>
                                    )}
                                </div>

                                {/* Botões */}
                                <div className="flex space-x-4 pt-6">
                                    <button
                                        type="button"
                                        onClick={() => setShowCreateModal(false)}
                                        className="flex-1 bg-gray-100 text-gray-700 py-3 rounded-lg hover:bg-gray-200 font-medium transition-colors"
                                    >
                                        Cancelar
                                    </button>
                                    <button
                                        type="submit"
                                        disabled={loading}
                                        className="flex-1 bg-primary-600 text-white py-3 rounded-lg hover:bg-primary-700 font-medium transition-colors disabled:opacity-50 flex items-center justify-center space-x-2"
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

            {/* Modal Detalhes/Aprovação */}
            {showDetailsModal && selectedDespesa && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
                    <div className="bg-white rounded-xl shadow-xl max-w-2xl w-full max-h-screen overflow-y-auto">
                        <div className="p-6">
                            <div className="flex items-center justify-between mb-6">
                                <h2 className="text-2xl font-bold text-gray-900">Detalhes da Despesa</h2>
                                <button
                                    onClick={() => setShowDetailsModal(false)}
                                    className="text-gray-400 hover:text-gray-600"
                                >
                                    ✕
                                </button>
                            </div>

                            <div className="space-y-4">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div>
                                        <label className="text-sm font-medium text-gray-600">Descrição</label>
                                        <p className="text-lg text-gray-900">{safeString(selectedDespesa.descricao)}</p>
                                    </div>
                                    <div>
                                        <label className="text-sm font-medium text-gray-600">Valor</label>
                                        <p className="text-lg font-semibold text-gray-900">{formatCurrency(selectedDespesa.valor)}</p>
                                    </div>
                                    <div>
                                        <label className="text-sm font-medium text-gray-600">Data</label>
                                        <p className="text-lg text-gray-900">{formatDate(selectedDespesa.data_despesa)}</p>
                                    </div>
                                    <div>
                                        <label className="text-sm font-medium text-gray-600">Categoria</label>
                                        <p className="text-lg text-gray-900 capitalize">{safeString(selectedDespesa.categoria)}</p>
                                    </div>
                                </div>

                                {selectedDespesa.observacoes && (
                                    <div>
                                        <label className="text-sm font-medium text-gray-600">Observações</label>
                                        <p className="text-gray-900">{safeString(selectedDespesa.observacoes)}</p>
                                    </div>
                                )}

                                {isAdmin && selectedDespesa.users_permissions_user && (
                                    <div>
                                        <label className="text-sm font-medium text-gray-600">Funcionário</label>
                                        <p className="text-lg text-gray-900">{safeString(selectedDespesa.users_permissions_user.nomecompleto)}</p>
                                    </div>
                                )}

                                <div>
                                    <label className="text-sm font-medium text-gray-600">Status Atual</label>
                                    <div className="flex items-center space-x-2 mt-1">
                                        {getStatusIcon(selectedDespesa.status)}
                                        <span className="text-lg capitalize">{safeString(selectedDespesa.status)}</span>
                                    </div>
                                </div>

                                {/* Comprovativo - Nova Seção */}
                                {selectedDespesa.comprovativo && (
                                    <div className="pt-4 border-t border-gray-200">
                                        <label className="text-sm font-medium text-gray-600">Comprovativo</label>
                                        <div className="mt-2 flex items-center space-x-4">
                                            {/* Exibição da imagem ou ícone PDF */}
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

                                            {/* Botão de Download/Visualização */}
                                            <a
                                                href={api.getMediaUrl(selectedDespesa.comprovativo)}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
                                            >
                                                <Download className="w-4 h-4 mr-2" />
                                                Ver / Baixar
                                            </a>
                                        </div>
                                    </div>
                                )}


                                {/* Ações de Aprovação para Admin */}
                                {isAdmin && selectedDespesa.status === 'pendente' && (
                                    <div className="pt-6 border-t border-gray-200">
                                        <h3 className="text-lg font-medium text-gray-900 mb-4">Ações de Aprovação</h3>
                                        <div className="flex space-x-4">
                                            <button
                                                onClick={() => handleStatusChange(selectedDespesa.id, 'aprovada')}
                                                disabled={loading}
                                                className="flex-1 bg-green-600 text-white py-3 rounded-lg hover:bg-green-700 font-medium flex items-center justify-center space-x-2 disabled:opacity-50"
                                            >
                                                <CheckCircle className="w-5 h-5" />
                                                <span>Aprovar</span>
                                            </button>
                                            <button
                                                onClick={() => handleStatusChange(selectedDespesa.id, 'rejeitada', 'Rejeitada pelo administrador')}
                                                disabled={loading}
                                                className="flex-1 bg-red-600 text-white py-3 rounded-lg hover:bg-red-700 font-medium flex items-center justify-center space-x-2 disabled:opacity-50"
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
                                    className="bg-gray-100 text-gray-700 px-6 py-3 rounded-lg hover:bg-gray-200 font-medium"
                                >
                                    Fechar
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}

        </div>
    );
}