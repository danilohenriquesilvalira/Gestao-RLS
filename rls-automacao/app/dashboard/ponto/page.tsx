'use client';

import { useState, useEffect, useCallback } from 'react';
import { pontoAPI, PontoMensal } from '@/lib/pontoApi';
import PDFGenerator from '@/utils/pdfGenerator';
import { useAuth } from '@/hooks/useAuth';
import {
    Calendar,
    Clock,
    Users,
    TrendingUp,
    BarChart3,
    PieChart,
    Download,
    FileDown,
    Plus,
    Edit,
    Trash2,
    CheckCircle,
    DollarSign,
    History
} from 'lucide-react';
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    ResponsiveContainer,
    PieChart as RechartsPieChart,
    Pie,
    Cell
} from 'recharts';

import Loading from '@/components/ui/Loading';
import Alert from '@/components/ui/Alert';
import Button from '@/components/ui/Button';
import Modal from '@/components/ui/Modal';
import RegistrosDialog from '@/components/ui/RegistrosDialog';

export default function PontoDashboard() {
    const { user, isAdmin } = useAuth();
    const [pontos, setPontos] = useState<PontoMensal[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [selectedFuncionario, setSelectedFuncionario] = useState<string>('');
    const [selectedMes, setSelectedMes] = useState<number>(0);
    const [selectedAno, setSelectedAno] = useState<number>(0);
    const [showModal, setShowModal] = useState(false);
    const [showRegistrosDialog, setShowRegistrosDialog] = useState(false);
    const [editando, setEditando] = useState<PontoMensal | null>(null);
    const [submitting, setSubmitting] = useState(false);

    // Form state
    const [form, setForm] = useState({
        mes: new Date().getMonth() + 1,
        ano: new Date().getFullYear(),
        dias_trabalhados: 22,
        horas_extras: 0,
        observacoes: ''
    });

    // Carregar pontos
    const carregarPontos = useCallback(async () => {
        if (!user) {
            setLoading(false);
            return;
        }
        
        try {
            setLoading(true);
            setError('');
            
            const data = await pontoAPI.buscarPontos(isAdmin, user.id);
            setPontos(data);
            
        } catch (err: any) {
            setError(err.message || 'Erro ao carregar pontos');
        } finally {
            setLoading(false);
        }
    }, [user, isAdmin]);

    useEffect(() => {
        carregarPontos();
    }, [carregarPontos]);

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
            } else {
                await pontoAPI.criarPonto(form, user.id);
            }

            await carregarPontos();
            fecharModal();
            
        } catch (err: any) {
            setError(err.message || 'Erro ao salvar ponto');
        } finally {
            setSubmitting(false);
        }
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
        setShowRegistrosDialog(false); // Fechar dialog de registros
    };

    // Aprovar ponto
    const aprovar = async (id: number) => {
        if (!user) return;
        
        try {
            setError('');
            await pontoAPI.aprovarPonto(id, user.id);
            await carregarPontos();
        } catch (err: any) {
            setError(err.message || 'Erro ao aprovar');
        }
    };

    // Marcar como pago
    const marcarPago = async (id: number) => {
        try {
            setError('');
            await pontoAPI.marcarPago(id);
            await carregarPontos();
        } catch (err: any) {
            setError(err.message || 'Erro ao marcar como pago');
        }
    };

    // Deletar ponto
    const deletar = async (id: number) => {
        if (!confirm('Tem certeza que deseja deletar este registro? Esta ação é irreversível.')) return;
        
        try {
            setError('');
            await pontoAPI.deletarPonto(id);
            await carregarPontos();
        } catch (err: any) {
            setError(err.message || 'Erro ao deletar');
        }
    };

    // Dados filtrados
    const getDadosFiltrados = () => {
        let dadosFiltrados = pontos;
        
        // Filtrar por funcionário se admin selecionou um específico
        if (isAdmin && selectedFuncionario) {
            dadosFiltrados = dadosFiltrados.filter(p => p.funcionario.nomecompleto === selectedFuncionario);
        }
        
        // Se não é admin, só mostra dados do próprio usuário
        if (!isAdmin) {
            dadosFiltrados = dadosFiltrados.filter(p => p.funcionario.id === user?.id);
        }

        // Filtrar por mês/ano se especificado
        if (selectedMes && selectedAno) {
            dadosFiltrados = dadosFiltrados.filter(p => p.mes === selectedMes && p.ano === selectedAno);
        }

        return dadosFiltrados;
    };

    // Download PDF individual
    const downloadPDF = (ponto: PontoMensal) => {
        PDFGenerator.gerarPontoPDF(ponto);
    };

    // Download CSV dos registros filtrados
    const downloadCSV = () => {
        const dadosFiltrados = getDadosFiltrados();
        
        if (dadosFiltrados.length === 0) {
            setError('Nenhum dado para download no período selecionado');
            return;
        }

        const csvData = dadosFiltrados.map(ponto => ({
            'Funcionário': ponto.funcionario.nomecompleto,
            'Cargo': ponto.funcionario.cargo,
            'Mês': getMesNome(ponto.mes),
            'Ano': ponto.ano,
            'Dias Trabalhados': ponto.dias_trabalhados,
            'Horas Normais': ponto.horas_normais,
            'Horas Extras': ponto.horas_extras,
            'Total Horas': ponto.total_horas,
            'Status': ponto.status,
            'Observações': ponto.observacoes || '',
            'Aprovado Por': ponto.aprovado_por?.nomecompleto || '',
            'Data Aprovação': ponto.data_aprovacao ? new Date(ponto.data_aprovacao).toLocaleDateString('pt-PT') : ''
        }));

        const csvContent = [
            Object.keys(csvData[0]).join(','),
            ...csvData.map(row => Object.values(row).map(val => `"${val}"`).join(','))
        ].join('\n');

        const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `pontos_${getMesNome(selectedMes)}_${selectedAno}.csv`;
        a.click();
        window.URL.revokeObjectURL(url);
    };

    // Processar dados para gráficos
    const processarDadosGrafico = () => {
        const dadosFiltrados = getDadosFiltrados();

        // Agrupar por mês/ano e somar horas
        const dadosAgrupados = dadosFiltrados.reduce((acc, ponto) => {
            const chave = `${getMesNome(ponto.mes)} ${ponto.ano}`;
            
            if (!acc[chave]) {
                acc[chave] = {
                    mes: chave,
                    horasNormais: 0,
                    horasExtras: 0,
                    totalHoras: 0,
                    diasTrabalhados: 0
                };
            }
            
            acc[chave].horasNormais += ponto.horas_normais;
            acc[chave].horasExtras += ponto.horas_extras;
            acc[chave].totalHoras += ponto.total_horas;
            acc[chave].diasTrabalhados += ponto.dias_trabalhados;
            
            return acc;
        }, {} as Record<string, any>);

        return Object.values(dadosAgrupados);
    };

    // Dados para gráfico de status
    const processarDadosStatus = () => {
        const dadosFiltrados = getDadosFiltrados();

        const contadores = dadosFiltrados.reduce((acc, ponto) => {
            acc[ponto.status] = (acc[ponto.status] || 0) + 1;
            return acc;
        }, {} as Record<string, number>);

        return [
            { name: 'Pendentes', value: contadores.pendente || 0, color: '#F59E0B' },
            { name: 'Aprovados', value: contadores.aprovado || 0, color: '#10B981' },
            { name: 'Pagos', value: contadores.pago || 0, color: '#3B82F6' }
        ];
    };

    // Lista de funcionários únicos
    const funcionarios = [...new Set(pontos.map(p => p.funcionario.nomecompleto))];

    // Anos disponíveis
    const anosDisponiveis = [...new Set(pontos.map(p => p.ano))].sort((a, b) => b - a);

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

    // Calcular totais
    const calcularTotais = () => {
        const dadosFiltrados = getDadosFiltrados();

        return {
            totalRegistros: dadosFiltrados.length,
            totalHoras: dadosFiltrados.reduce((acc, p) => acc + p.total_horas, 0),
            totalHorasExtras: dadosFiltrados.reduce((acc, p) => acc + p.horas_extras, 0),
            pendentes: dadosFiltrados.filter(p => p.status === 'pendente').length
        };
    };

    const dadosGrafico = processarDadosGrafico();
    const dadosStatus = processarDadosStatus();
    const totais = calcularTotais();

    if (loading) return <Loading title="Carregando dashboard..." />;

    return (
        <div className="h-full lg:fixed lg:top-20 lg:left-0 lg:lg:left-64 lg:right-0 lg:bottom-0 bg-white overflow-hidden">
            <div className="h-full flex flex-col">
                
                {/* Header */}
                <div className="flex-shrink-0 p-3 sm:p-4 border-b border-gray-200">
                    <div className="flex flex-col lg:flex-row lg:items-center justify-between space-y-3 lg:space-y-0">
                        <div className="flex items-center space-x-2 sm:space-x-3">
                            <div className="p-2 bg-primary-100 rounded-lg">
                                <BarChart3 className="w-5 h-5 sm:w-6 h-6 text-primary-600" />
                            </div>
                            <div>
                                <h1 className="text-lg sm:text-xl font-bold text-gray-900">Dashboard de Ponto</h1>
                                <p className="text-xs sm:text-sm text-gray-600">
                                    {isAdmin ? 'Análise de todos os funcionários' : 'Suas horas trabalhadas'}
                                </p>
                            </div>
                        </div>
                        
                        <div className="flex flex-wrap items-center gap-2">
                            {/* Botão Novo Registro */}
                            <Button
                                onClick={() => setShowModal(true)}
                                size="sm"
                                className="bg-primary-500 hover:bg-primary-600"
                            >
                                <Plus className="w-4 h-4 mr-1" />
                                Novo
                            </Button>

                            {/* Filtros */}
                            <div className="flex items-center space-x-2">
                                <select
                                    value={selectedMes}
                                    onChange={(e) => setSelectedMes(Number(e.target.value))}
                                    className="px-2 py-1 text-sm border border-gray-300 rounded focus:ring-2 focus:ring-primary-200"
                                >
                                    <option value={0}>Todos os meses</option>
                                    {Array.from({length: 12}, (_, i) => (
                                        <option key={i+1} value={i+1}>
                                            {getMesNome(i+1)}
                                        </option>
                                    ))}
                                </select>

                                <select
                                    value={selectedAno}
                                    onChange={(e) => setSelectedAno(Number(e.target.value))}
                                    className="px-2 py-1 text-sm border border-gray-300 rounded focus:ring-2 focus:ring-primary-200"
                                >
                                    <option value={0}>Todos os anos</option>
                                    {anosDisponiveis.map(ano => (
                                        <option key={ano} value={ano}>{ano}</option>
                                    ))}
                                </select>

                                {isAdmin && (
                                    <select
                                        value={selectedFuncionario}
                                        onChange={(e) => setSelectedFuncionario(e.target.value)}
                                        className="px-2 py-1 text-sm border border-gray-300 rounded focus:ring-2 focus:ring-primary-200"
                                    >
                                        <option value="">Todos os funcionários</option>
                                        {funcionarios.map(nome => (
                                            <option key={nome} value={nome}>{nome}</option>
                                        ))}
                                    </select>
                                )}
                            </div>

                            {/* Downloads */}
                            <Button
                                onClick={downloadCSV}
                                variant="secondary"
                                size="sm"
                                disabled={getDadosFiltrados().length === 0}
                            >
                                <FileDown className="w-4 h-4 mr-1" />
                                CSV
                            </Button>
                        </div>
                    </div>
                </div>

                {/* Alert de Erro */}
                {error && (
                    <div className="flex-shrink-0 p-3 sm:p-4">
                        <Alert
                            type="error"
                            title="Erro"
                            description={error}
                            dismissible
                            onDismiss={() => setError('')}
                        />
                    </div>
                )}

                {/* Stats */}
                <div className="flex-shrink-0 p-3 sm:p-4 border-b border-gray-100">
                    <div className="grid grid-cols-4 gap-2">
                        <div className="bg-white p-2 rounded border text-center">
                            <div className="text-base font-bold text-gray-900">{totais.totalRegistros}</div>
                            <div className="text-xs text-gray-600">Registros</div>
                        </div>
                        <div className="bg-white p-2 rounded border text-center">
                            <div className="text-base font-bold text-blue-600">{totais.totalHoras}h</div>
                            <div className="text-xs text-gray-600">Total Horas</div>
                        </div>
                        <div className="bg-white p-2 rounded border text-center">
                            <div className="text-base font-bold text-orange-600">{totais.totalHorasExtras}h</div>
                            <div className="text-xs text-gray-600">H. Extras</div>
                        </div>
                        <div className="bg-white p-2 rounded border text-center">
                            <div className="text-base font-bold text-yellow-600">{totais.pendentes}</div>
                            <div className="text-xs text-gray-600">Pendentes</div>
                        </div>
                    </div>
                </div>

                {/* Conteúdo Principal - RESPONSIVO */}
                <div className="flex-1 min-h-0 p-3 sm:p-4">
                    <div className="h-full flex flex-col compactDesktop:flex-row gap-4 max-w-full">
                        
                        {/* Gráfico Principal - RESPONSIVO */}
                        <div className="flex-1 min-w-0 bg-white rounded-lg border p-4 flex flex-col">
                            <div className="flex items-center space-x-2 mb-4">
                                <BarChart3 className="w-5 h-5 text-primary-600" />
                                <h3 className="text-lg font-semibold text-gray-900">Horas Trabalhadas</h3>
                            </div>
                            
                            {/* Container responsivo para o gráfico */}
                            <div className="w-full flex-1 flex items-end justify-center">
                                <div className="w-full h-80 sm:h-96 md:h-[28rem] compactDesktop:h-[32rem] min-[2500px]:h-[60rem]">
                                <ResponsiveContainer width="100%" height="100%">
                                    <BarChart data={dadosGrafico} margin={{ top: 10, right: 30, left: 20, bottom: 80 }}>
                                        <CartesianGrid strokeDasharray="3 3" />
                                        <XAxis 
                                            dataKey="mes" 
                                            tick={{ fontSize: 11 }}
                                            angle={-45}
                                            textAnchor="end"
                                            height={60}
                                            interval={0}
                                        />
                                        <YAxis 
                                            tick={{ fontSize: 11 }}
                                            width={40}
                                        />
                                        <Tooltip 
                                            formatter={(value: number, name: string) => [
                                                `${value}h`, 
                                                name === 'horasNormais' ? 'Horas Normais' : 
                                                name === 'horasExtras' ? 'Horas Extras' : 'Total'
                                            ]}
                                        />
                                        <Legend 
                                            verticalAlign="bottom"
                                            height={36}
                                            iconType="rect"
                                            wrapperStyle={{ paddingTop: '20px' }}
                                        />
                                        <Bar 
                                            dataKey="horasNormais" 
                                            fill="#3B82F6" 
                                            name="Horas Normais"
                                            radius={[0, 0, 4, 4]}
                                        />
                                        <Bar 
                                            dataKey="horasExtras" 
                                            fill="#F59E0B" 
                                            name="Horas Extras"
                                            radius={[4, 4, 0, 0]}
                                        />
                                    </BarChart>
                                </ResponsiveContainer>
                            </div>
                            </div>
                        </div>

                        {/* Gráfico Status - RESPONSIVO */}
                        <div className="w-full compactDesktop:w-80 customXl:w-96 bg-white rounded-lg border p-4 flex flex-col compactDesktop:h-fit">
                            <div className="flex items-center justify-between mb-3">
                                <div className="flex items-center space-x-2">
                                    <PieChart className="w-5 h-5 text-primary-600" />
                                    <h3 className="text-lg font-semibold text-gray-900">Status</h3>
                                </div>
                                
                                {/* Botão Histórico */}
                                <Button
                                    onClick={() => setShowRegistrosDialog(true)}
                                    variant="ghost"
                                    size="sm"
                                    className="text-primary-600 hover:text-primary-700 hover:bg-primary-50"
                                >
                                    <History className="w-4 h-4 mr-1" />
                                    Histórico
                                </Button>
                            </div>
                            
                            {/* Container responsivo para gráfico de pizza */}
                            <div className="w-full h-40 compactDesktop:h-48">
                                <ResponsiveContainer width="100%" height="100%">
                                    <RechartsPieChart>
                                        <Tooltip 
                                            formatter={(value: number) => [`${value} registros`, 'Quantidade']}
                                        />
                                        <Pie
                                            data={dadosStatus}
                                            cx="50%"
                                            cy="50%"
                                            innerRadius="25%"
                                            outerRadius="75%"
                                            paddingAngle={3}
                                            dataKey="value"
                                        >
                                            {dadosStatus.map((entry, index) => (
                                                <Cell key={`cell-${index}`} fill={entry.color} />
                                            ))}
                                        </Pie>
                                    </RechartsPieChart>
                                </ResponsiveContainer>
                            </div>

                            {/* Legenda do Status */}
                            <div className="mt-3 space-y-1">
                                {dadosStatus.map((item) => (
                                    <div key={item.name} className="flex items-center justify-between text-sm">
                                        <div className="flex items-center space-x-2">
                                            <div 
                                                className="w-3 h-3 rounded-full flex-shrink-0" 
                                                style={{ backgroundColor: item.color }}
                                            />
                                            <span className="text-gray-700">{item.name}</span>
                                        </div>
                                        <span className="font-medium">{item.value}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Modal Criar/Editar Ponto */}
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

            {/* Dialog de Registros */}
            <RegistrosDialog
                isOpen={showRegistrosDialog}
                onClose={() => setShowRegistrosDialog(false)}
                registros={getDadosFiltrados()}
                isAdmin={isAdmin}
                onAprovar={aprovar}
                onMarcarPago={marcarPago}
                onEditar={editar}
                onDeletar={deletar}
                onDownloadPDF={downloadPDF}
                getMesNome={getMesNome}
                getStatusColor={getStatusColor}
                getStatusIcon={getStatusIcon}
            />
        </div>
    );
}