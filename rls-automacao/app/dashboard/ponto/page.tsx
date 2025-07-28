'use client';

import { useState, useEffect, useCallback } from 'react'; // Adicionado useCallback
import { pontoAPI, PontoMensal, CreatePonto } from '@/lib/pontoApi';
import PDFGenerator from '@/utils/pdfGenerator';
import { useAuth } from '@/hooks/useAuth';
import {
    Calendar,
    Clock,
    Plus,
    CheckCircle,
    Download,
    Edit,
    Users,
    Trash2,
    DollarSign,
    Search // Adicionado o ícone de busca
} from 'lucide-react';

import Loading from '@/components/ui/Loading';
import Button from '@/components/ui/Button';
import Modal from '@/components/ui/Modal';
import PageHeader from '@/components/ui/PageHeader';
import Alert from '@/components/ui/Alert';

export default function PontoSimples() {
    const { user, isAdmin } = useAuth();
    const [pontos, setPontos] = useState<PontoMensal[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [showModal, setShowModal] = useState(false);
    const [editando, setEditando] = useState<PontoMensal | null>(null);
    const [submitting, setSubmitting] = useState(false);
    const [searchQuery, setSearchQuery] = useState(''); // Estado para o termo de busca

    // Form state
    const [form, setForm] = useState<CreatePonto>({
        mes: new Date().getMonth() + 1,
        ano: new Date().getFullYear(),
        dias_trabalhados: 22,
        horas_extras: 0,
        observacoes: ''
    });

    // Carregar pontos (agora com filtro de nome)
    // Usamos useCallback para memoizar a função e evitar recriações desnecessárias
    const carregarPontos = useCallback(async (filterQuery?: string) => {
        if (!user) {
            setLoading(false);
            return;
        }
        
        try {
            setLoading(true);
            setError('');
            
            console.log(`📅 Carregando pontos para ${user.nomecompleto} (Admin: ${isAdmin})`);
            // Passamos o filterQuery para a API se ele existir
            const data = await pontoAPI.buscarPontos(isAdmin, user.id, filterQuery);
            setPontos(data);
            
        } catch (err: any) {
            setError(err.message || 'Erro ao carregar pontos');
            console.error('❌ Erro:', err);
        } finally {
            setLoading(false);
        }
    }, [user, isAdmin]); // Dependências do useCallback

    // Efeito para carregar pontos na montagem e quando user/isAdmin/searchQuery mudam
    useEffect(() => {
        // Debounce para a busca: só carrega após um pequeno atraso, otimizando requisições
        const handler = setTimeout(() => {
            carregarPontos(searchQuery);
        }, 300); // Atraso de 300ms

        return () => {
            clearTimeout(handler); // Limpa o timeout se o componente for desmontado ou searchQuery mudar novamente
        };
    }, [user, isAdmin, searchQuery, carregarPontos]); // Adicionado searchQuery e carregarPontos como dependências

    // Criar/Atualizar ponto
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!user) return;

        try {
            setSubmitting(true);
            setError('');

            // Verificar se já existe registro (apenas para criação, não para edição)
            if (!editando) {
                const existe = await pontoAPI.verificarRegistroExistente(
                    form.mes, 
                    form.ano, 
                    user.id
                );
                
                if (existe) {
                    setError(`Já existe um registro para ${getMesNome(form.mes)}/${form.ano}`);
                    return;
                }
            }

            if (editando) {
                await pontoAPI.atualizarPonto(editando.id, form);
                console.log('✅ Ponto atualizado');
            } else {
                await pontoAPI.criarPonto(form, user.id);
                console.log('✅ Ponto criado');
            }

            await carregarPontos(searchQuery); // Recarrega com o filtro atual
            fecharModal();
            
        } catch (err: any) {
            setError(err.message || 'Erro ao salvar ponto');
        } finally {
            setSubmitting(false);
        }
    };

    // Aprovar ponto
    const aprovar = async (id: number) => {
        if (!user) return;
        
        try {
            setError('');
            await pontoAPI.aprovarPonto(id, user.id);
            await carregarPontos(searchQuery); // Recarrega com o filtro atual
            console.log('✅ Ponto aprovado');
        } catch (err: any) {
            setError(err.message || 'Erro ao aprovar');
        }
    };

    // Marcar como pago
    const marcarPago = async (id: number) => {
        try {
            setError('');
            await pontoAPI.marcarPago(id);
            await carregarPontos(searchQuery); // Recarrega com o filtro atual
            console.log('✅ Marcado como pago');
        } catch (err: any) {
            setError(err.message || 'Erro ao marcar como pago');
        }
    };

    // Deletar ponto
    const deletar = async (id: number) => {
        if (!confirm('Tem certeza que deseja deletar este registro? Esta ação é irreversível.')) return; // Mensagem mais clara
        
        try {
            setError('');
            await pontoAPI.deletarPonto(id);
            await carregarPontos(searchQuery); // Recarrega com o filtro atual
            console.log('✅ Ponto deletado');
        } catch (err: any) {
            setError(err.message || 'Erro ao deletar');
        }
    };

    // Abrir modal para editar
    const editar = (ponto: PontoMensal) => {
        setEditando(ponto);
        setForm({
            mes: ponto.mes,
            ano: ponto.ano,
            dias_trabalhados: ponto.dias_trabalhados,
            horas_extras: ponto.horas_extras,
            observacoes: ponto.observacoes || ''
        });
        setShowModal(true);
    };

    // Fechar modal
    const fecharModal = () => {
        setShowModal(false);
        setEditando(null);
        setForm({
            mes: new Date().getMonth() + 1,
            ano: new Date().getFullYear(),
            dias_trabalhados: 22,
            horas_extras: 0,
            observacoes: ''
        });
    };

    // Utils
    const getMesNome = (mes: number) => {
        const meses = ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 
                      'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'];
        return meses[mes - 1] || 'N/A';
    };

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'aprovado': return 'bg-green-100 text-green-800 border-green-200';
            case 'pago': return 'bg-blue-100 text-blue-800 border-blue-200';
            default: return 'bg-yellow-100 text-yellow-800 border-yellow-200';
        }
    };

    const getStatusIcon = (status: string) => {
        switch (status) {
            case 'aprovado': return <CheckCircle className="w-4 h-4" />;
            case 'pago': return <DollarSign className="w-4 h-4" />;
            default: return <Clock className="w-4 h-4" />;
        }
    };

    if (loading) return <Loading title="Carregando pontos..." />;

    return (
        <div className="p-6 space-y-6">
            
            {/* Header */}
            <PageHeader
                title="Controle de Ponto Mensal"
                subtitle={isAdmin ? 'Gerencie registros dos funcionários' : 'Seus registros mensais'}
                icon={Calendar}
                buttonText="Novo Registro"
                onButtonClick={() => setShowModal(true)}
            />

            {/* Alert de Erro */}
            {error && (
                <Alert
                    type="error"
                    title="Erro"
                    description={error}
                    dismissible
                    onDismiss={() => setError('')}
                />
            )}

            {/* Input de Busca (apenas para administradores) */}
            {isAdmin && (
                <div className="relative mb-6">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                        type="text"
                        placeholder="Buscar por nome do funcionário..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-primary-500 focus:border-primary-500 shadow-sm"
                    />
                </div>
            )}

            {/* Stats rápidas */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="bg-white p-4 rounded-lg border">
                    <div className="text-2xl font-bold text-gray-900">{pontos.length}</div>
                    <div className="text-sm text-gray-600">Total Registros</div>
                </div>
                <div className="bg-white p-4 rounded-lg border">
                    <div className="text-2xl font-bold text-yellow-600">
                        {pontos.filter(p => p.status === 'pendente').length}
                    </div>
                    <div className="text-sm text-gray-600">Pendentes</div>
                </div>
                <div className="bg-white p-4 rounded-lg border">
                    <div className="text-2xl font-bold text-green-600">
                        {pontos.filter(p => p.status === 'aprovado').length}
                    </div>
                    <div className="text-sm text-gray-600">Aprovados</div>
                </div>
                <div className="bg-white p-4 rounded-lg border">
                    <div className="text-2xl font-bold text-blue-600">
                        {pontos.filter(p => p.status === 'pago').length}
                    </div>
                    <div className="text-sm text-gray-600">Pagos</div>
                </div>
            </div>

            {/* Lista de Pontos */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                
                {pontos.length === 0 && !loading && (
                    <div className="md:col-span-3 text-center py-10 bg-white rounded-lg border text-gray-500">
                        Nenhum registro de ponto encontrado.
                        {isAdmin && searchQuery && ` para o termo "${searchQuery}".`}
                    </div>
                )}

                {pontos.map((ponto) => (
                    <div key={ponto.id} className="bg-white rounded-xl border p-6 shadow-sm hover:shadow-md transition-shadow">
                        
                        {/* Header */}
                        <div className="flex items-center justify-between mb-4">
                            <div className="flex items-center space-x-2">
                                <Calendar className="w-5 h-5 text-primary-600" />
                                <h3 className="text-lg font-semibold">
                                    {getMesNome(ponto.mes)} {ponto.ano}
                                </h3>
                            </div>
                            <div className={`px-2 py-1 rounded-full text-xs font-medium border flex items-center space-x-1 ${getStatusColor(ponto.status)}`}>
                                {getStatusIcon(ponto.status)}
                                <span>{ponto.status.toUpperCase()}</span>
                            </div>
                        </div>

                        {/* Funcionário (Admin) */}
                        {isAdmin && (
                            <div className="flex items-center space-x-2 mb-3 text-sm text-gray-600">
                                <Users className="w-4 h-4" />
                                <span>{ponto.funcionario.nomecompleto}</span>
                                <span className="text-xs bg-gray-100 px-2 py-1 rounded">
                                    {ponto.funcionario.cargo}
                                </span>
                            </div>
                        )}

                        {/* Stats */}
                        <div className="space-y-2 mb-4">
                            <div className="flex justify-between text-sm">
                                <span className="text-gray-600">Dias trabalhados:</span>
                                <span className="font-medium">{ponto.dias_trabalhados} dias</span>
                            </div>
                            <div className="flex justify-between text-sm">
                                <span className="text-gray-600">Horas normais:</span>
                                <span className="font-medium">{ponto.horas_normais}h</span>
                            </div>
                            <div className="flex justify-between text-sm">
                                <span className="text-gray-600">Horas extras:</span>
                                <span className="font-medium text-orange-600">{ponto.horas_extras}h</span>
                            </div>
                            <div className="flex justify-between text-sm">
                                <span className="text-gray-600">Horário padrão:</span>
                                <span className="font-medium">09:00 - 18:00</span>
                            </div>
                            <div className="flex justify-between text-base font-semibold pt-2 border-t">
                                <span>Total horas:</span>
                                <span className="text-primary-600">{ponto.total_horas}h</span>
                            </div>
                        </div>

                        {/* Observações */}
                        {ponto.observacoes && (
                            <div className="mb-4">
                                <p className="text-sm text-gray-600 bg-gray-50 p-2 rounded">
                                    {ponto.observacoes}
                                </p>
                            </div>
                        )}

                        {/* Aprovação */}
                        {ponto.aprovado_por && ponto.data_aprovacao && (
                            <div className="mb-4 text-xs text-gray-500">
                                Aprovado por {ponto.aprovado_por.nomecompleto} em{' '}
                                {new Date(ponto.data_aprovacao).toLocaleDateString('pt-PT')}
                            </div>
                        )}

                        {/* Ações */}
                        <div className="flex space-x-2">
                            {/* Aprovar */}
                            {isAdmin && ponto.status === 'pendente' && (
                                <Button
                                    onClick={() => aprovar(ponto.id)}
                                    size="sm"
                                    className="flex-1"
                                >
                                    <CheckCircle className="w-4 h-4 mr-1" />
                                    Aprovar
                                </Button>
                            )}

                            {/* Marcar Pago */}
                            {isAdmin && ponto.status === 'aprovado' && (
                                <Button
                                    onClick={() => marcarPago(ponto.id)}
                                    size="sm"
                                    className="flex-1 bg-blue-600 hover:bg-blue-700"
                                >
                                    <DollarSign className="w-4 h-4 mr-1" />
                                    Pagar
                                </Button>
                            )}

                            {/* PDF */}
                            <Button
                                variant="secondary"
                                size="sm"
                                onClick={() => PDFGenerator.gerarPontoPDF(ponto)}
                                className="flex-1"
                            >
                                <Download className="w-4 h-4 mr-1" />
                                PDF
                            </Button>

                            {/* Editar */}
                            {(isAdmin || ponto.status === 'pendente') && (
                                <Button
                                    variant="ghost"
                                    size="sm"
                                    onClick={() => editar(ponto)}
                                >
                                    <Edit className="w-4 h-4" />
                                </Button>
                            )}

                            {/* Deletar */}
                            {(isAdmin || ponto.status === 'pendente') && (
                                <Button
                                    variant="ghost"
                                    size="sm"
                                    onClick={() => deletar(ponto.id)}
                                    className="text-red-600 hover:text-red-700 hover:bg-red-50"
                                >
                                    <Trash2 className="w-4 h-4" />
                                </Button>
                            )}
                        </div>
                    </div>
                ))}

                {/* Card Adicionar (sempre visível) */}
                <div 
                    onClick={() => setShowModal(true)}
                    className="bg-gray-50 border-2 border-dashed border-gray-300 rounded-xl p-6 flex flex-col items-center justify-center cursor-pointer hover:border-primary-400 hover:bg-primary-50 transition-colors min-h-[280px]"
                >
                    <Plus className="w-8 h-8 text-gray-400 mb-2" />
                    <p className="text-gray-600 text-center">Novo Registro</p>
                </div>
            </div>

            {/* Modal */}
            <Modal
                isOpen={showModal}
                onClose={fecharModal}
                title={editando ? 'Editar Registro' : 'Novo Registro'}
                size="md"
            >
                <form onSubmit={handleSubmit} className="space-y-4">
                    
                    {/* Mês e Ano */}
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium mb-1">Mês *</label>
                            <select
                                value={form.mes}
                                onChange={(e) => setForm({...form, mes: Number(e.target.value)})}
                                className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-primary-500"
                                required
                            >
                                {Array.from({length: 12}, (_, i) => (
                                    <option key={i+1} value={i+1}>
                                        {getMesNome(i+1)}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div>
                            <label className="block text-sm font-medium mb-1">Ano *</label>
                            <input
                                type="number"
                                value={form.ano}
                                onChange={(e) => setForm({...form, ano: Number(e.target.value)})}
                                className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-primary-500"
                                min="2020"
                                max="2030"
                                required
                            />
                        </div>
                    </div>

                    {/* Dias e Horas */}
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium mb-1">Dias Trabalhados *</label>
                            <input
                                type="number"
                                value={form.dias_trabalhados}
                                onChange={(e) => setForm({...form, dias_trabalhados: Number(e.target.value)})}
                                className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-primary-500"
                                min="1"
                                max="31"
                                required
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium mb-1">Horas Extras</label>
                            <input
                                type="number"
                                value={form.horas_extras}
                                onChange={(e) => setForm({...form, horas_extras: Number(e.target.value)})}
                                className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-primary-500"
                                min="0"
                                step="0.5"
                            />
                        </div>
                    </div>

                    {/* Resumo */}
                    <div className="bg-gray-50 p-3 rounded-lg">
                        <h4 className="font-medium mb-2">Resumo:</h4>
                        <div className="text-sm space-y-1">
                            <div className="flex justify-between">
                                <span>Horas normais:</span>
                                <span>{form.dias_trabalhados * 8}h</span>
                            </div>
                            <div className="flex justify-between">
                                <span>Horas extras:</span>
                                <span>{form.horas_extras}h</span>
                            </div>
                            <div className="flex justify-between font-medium pt-1 border-t">
                                <span>Total:</span>
                                <span>{(form.dias_trabalhados * 8) + form.horas_extras}h</span>
                            </div>
                        </div>
                    </div>

                    {/* Observações */}
                    <div>
                        <label className="block text-sm font-medium mb-1">Observações</label>
                        <textarea
                            value={form.observacoes}
                            onChange={(e) => setForm({...form, observacoes: e.target.value})}
                            className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-primary-500"
                            rows={3}
                            placeholder="Ex: Horas extras nos dias 15 e 20"
                        />
                    </div>

                    {/* Botões */}
                    <div className="flex space-x-3 pt-4">
                        <Button
                            type="button"
                            variant="secondary"
                            onClick={fecharModal}
                            className="flex-1"
                            disabled={submitting}
                        >
                            Cancelar
                        </Button>
                        <Button 
                            type="submit" 
                            className="flex-1"
                            loading={submitting}
                        >
                            {editando ? 'Atualizar' : 'Criar'}
                        </Button>
                    </div>
                </form>
            </Modal>
        </div>
    );
}