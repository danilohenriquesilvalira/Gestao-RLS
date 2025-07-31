// app/dashboard/compartilhamento/page.tsx - COMPLETO E FUNCIONAL
'use client';

import { useState, useEffect, useRef } from 'react';
import { compartilhamentoAPI, ArquivoCompartilhado, UploadData } from '@/lib/compartilhamentoApi';
import { pastaAPI, PastaCompartilhamento } from '@/lib/pastaApi';
import { useAuth } from '@/hooks/useAuth';
import { PastaTreeView, PastaModal } from '@/components/compartilhamento/PastaComponents';
import { HeaderComponent } from '@/components/compartilhamento/HeaderComponent';
import { FileGrid } from '@/components/compartilhamento/FileGrid';
import { UploadModal } from '@/components/compartilhamento/UploadModal';
import {
    Search, Loader2, AlertCircle, CheckCircle, X, FolderPlus,
    ChevronLeft, ChevronRight, Folder, Archive, FileText, Image, Code
} from 'lucide-react';

const categorias = [
    { value: 'projeto', label: 'Projetos', icon: Folder, color: 'blue' },
    { value: 'backup', label: 'Backups', icon: Archive, color: 'green' },
    { value: 'documento', label: 'Documentos', icon: FileText, color: 'purple' },
    { value: 'imagem', label: 'Imagens', icon: Image, color: 'pink' },
    { value: 'outro', label: 'Outros', icon: Code, color: 'gray' }
];

export default function CompartilhamentoPage() {
    const { user, isAdmin } = useAuth();
    
    // Estados principais
    const [arquivos, setArquivos] = useState<ArquivoCompartilhado[]>([]);
    const [arquivosSemPasta, setArquivosSemPasta] = useState<ArquivoCompartilhado[]>([]);
    const [pastas, setPastas] = useState<PastaCompartilhamento[]>([]);
    const [pastaAtual, setPastaAtual] = useState<PastaCompartilhamento | null>(null);
    
    // Estados de UI
    const [loading, setLoading] = useState(true);
    const [uploading, setUploading] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [isMobile, setIsMobile] = useState(false);
    const [showSidebar, setShowSidebar] = useState(true);
    const [cardsPerPage, setCardsPerPage] = useState(8);
    
    // Estados de filtros
    const [searchTerm, setSearchTerm] = useState('');
    const [categoryFilter, setCategoryFilter] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    
    // Estados de modais - CORRIGIDO
    const [showPastaModal, setShowPastaModal] = useState(false);
    const [pastaEditando, setPastaEditando] = useState<PastaCompartilhamento | undefined>();
    const [pastaPaiParaSubpasta, setPastaPaiParaSubpasta] = useState<PastaCompartilhamento | null>(null);
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    
    // Estados de drag & drop
    const [draggedItem, setDraggedItem] = useState<ArquivoCompartilhado | null>(null);
    const [dropTarget, setDropTarget] = useState<number | null>(null);
    
    // Upload form
    const [uploadForm, setUploadForm] = useState<UploadData>({
        nome: '',
        descricao: '',
        categoria: 'projeto',
        publico: true,
        pasta: pastaAtual?.id
    });

    const fileInputRef = useRef<HTMLInputElement>(null);

    // Layout responsivo
    useEffect(() => {
        const updateLayout = () => {
            const width = window.innerWidth;
            const height = window.innerHeight;
            const mobile = width <= 768;
            
            setIsMobile(mobile);
            setShowSidebar(!mobile);
            
            if (mobile) {
                setCardsPerPage(5);
            } else if (width <= 1528 && height <= 834) {
                setCardsPerPage(6);
            } else if (width > 1900) {
                setCardsPerPage(15);
            } else {
                setCardsPerPage(12);
            }
        };

        updateLayout();
        window.addEventListener('resize', updateLayout);
        return () => window.removeEventListener('resize', updateLayout);
    }, []);

    // Carregar dados iniciais
    useEffect(() => {
        carregarDados();
    }, []);

    // Atualizar form com pasta atual
    useEffect(() => {
        setUploadForm(prev => ({ ...prev, pasta: pastaAtual?.id }));
    }, [pastaAtual]);

    // Recarregar arquivos quando mudar pasta
    useEffect(() => {
        if (!loading) {
            carregarConteudo();
        }
    }, [pastaAtual, loading]);

    // Funções de carregamento
    const carregarDados = async () => {
        try {
            setLoading(true);
            const pastasData = await pastaAPI.buscarHierarquia();
            setPastas(pastasData);
            await carregarConteudo();
        } catch (err: any) {
            setError('Erro ao carregar dados');
            console.error('Erro carregar dados:', err);
        } finally {
            setLoading(false);
        }
    };

    const carregarConteudo = async () => {
        try {
            if (pastaAtual) {
                const arquivosData = await compartilhamentoAPI.buscarArquivos(pastaAtual.id);
                setArquivos(arquivosData);
                setArquivosSemPasta([]);
            } else {
                const arquivosSemPastaData = await compartilhamentoAPI.buscarArquivos(null);
                setArquivosSemPasta(arquivosSemPastaData);
                setArquivos([]);
            }
        } catch (err: any) {
            setError('Erro ao carregar conteúdo');
            console.error('Erro carregar conteúdo:', err);
        }
    };

    // Handlers de upload
    const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setSelectedFile(file);
            setUploadForm(prev => ({ 
                ...prev, 
                nome: file.name.split('.')[0],
                pasta: pastaAtual?.id 
            }));
        }
    };

    const handleUpload = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!selectedFile) return;

        try {
            setUploading(true);
            await compartilhamentoAPI.uploadArquivo(selectedFile, uploadForm);
            setSuccess('Arquivo enviado com sucesso!');
            
            setSelectedFile(null);
            setUploadForm({
                nome: '',
                descricao: '',
                categoria: 'projeto',
                publico: true,
                pasta: pastaAtual?.id
            });
            fileInputRef.current!.value = '';
            
            await carregarConteudo();
            
        } catch (err: any) {
            setError('Erro no upload: ' + (err.message || 'Erro desconhecido'));
            console.error('Erro upload:', err);
        } finally {
            setUploading(false);
        }
    };

    // Handlers de arquivo
    const handleDownload = async (arquivo: ArquivoCompartilhado) => {
        try {
            await compartilhamentoAPI.downloadArquivo(arquivo);
        } catch (err: any) {
            setError('Erro no download');
        }
    };

    const handleDelete = async (id: number) => {
        if (!confirm('Excluir arquivo?')) return;
        try {
            await compartilhamentoAPI.deletarArquivo(id);
            setSuccess('Arquivo excluído!');
            await carregarConteudo();
        } catch (err: any) {
            setError('Erro ao excluir arquivo');
        }
    };

    const toggleVisibility = async (arquivo: ArquivoCompartilhado) => {
        try {
            await compartilhamentoAPI.alterarVisibilidade(arquivo.id, !arquivo.publico);
            await carregarConteudo();
        } catch (err: any) {
            setError('Erro ao alterar visibilidade');
        }
    };

    const toggleFavorito = async (arquivo: ArquivoCompartilhado) => {
        try {
            await compartilhamentoAPI.toggleFavorito(arquivo.id, !arquivo.favorito);
            await carregarConteudo();
        } catch (err: any) {
            setError('Erro ao favoritar');
        }
    };

    // Handlers de pasta - CORRIGIDOS
    const handleSelectPasta = (pasta: PastaCompartilhamento | null) => {
        setPastaAtual(pasta);
        setCurrentPage(1);
    };

    const handleCreatePasta = () => {
        setPastaEditando(undefined);
        setPastaPaiParaSubpasta(null);
        setShowPastaModal(true);
    };

    // NOVA FUNÇÃO - Criar subpasta
    const handleCreateSubpasta = (pastaPai: PastaCompartilhamento) => {
        setPastaEditando(undefined);
        setPastaPaiParaSubpasta(pastaPai);
        setShowPastaModal(true);
    };

    const handleEditPasta = (pasta: PastaCompartilhamento) => {
        setPastaEditando(pasta);
        setPastaPaiParaSubpasta(null);
        setShowPastaModal(true);
    };

    // FUNÇÃO CORRIGIDA - Usar o data.pasta_pai do form
    const handleSavePasta = async (data: any) => {
        try {
            if (pastaEditando) {
                await pastaAPI.atualizarPasta(pastaEditando.id, data);
                setSuccess('Pasta atualizada!');
            } else {
                await pastaAPI.criarPasta(data);
                setSuccess('Pasta criada!');
            }
            
            const pastasData = await pastaAPI.buscarHierarquia();
            setPastas(pastasData);
            
        } catch (err: any) {
            setError('Erro ao salvar pasta: ' + (err.message || 'Erro desconhecido'));
            console.error('Erro salvar pasta:', err);
        }
    };

    const handleDeletePasta = async (pasta: PastaCompartilhamento) => {
        if (!confirm(`Excluir pasta "${pasta.nome}"? Todos os arquivos serão movidos para a raiz.`)) return;
        try {
            await pastaAPI.deletarPasta(pasta.id);
            setSuccess('Pasta excluída!');
            
            if (pastaAtual?.id === pasta.id) {
                setPastaAtual(null);
            }
            
            await carregarDados();
            
        } catch (err: any) {
            setError('Erro ao excluir pasta');
        }
    };

    // Handlers de drag & drop
    const handleDragStart = (arquivo: ArquivoCompartilhado) => {
        setDraggedItem(arquivo);
    };

    const handleDragOver = (e: React.DragEvent) => {
        e.preventDefault();
    };

    const handleDragEnter = (pastaId: number) => {
        setDropTarget(pastaId);
    };

    const handleDragLeave = () => {
        setDropTarget(null);
    };

    const handleDrop = async (pastaDestino: PastaCompartilhamento | null) => {
        if (!draggedItem) return;
        
        try {
            await compartilhamentoAPI.moverArquivo(draggedItem.id, pastaDestino?.id || null);
            setSuccess(`Arquivo movido para ${pastaDestino?.nome || 'raiz'}!`);
            
            await carregarConteudo();
            
        } catch (err: any) {
            setError('Erro ao mover arquivo');
        } finally {
            setDraggedItem(null);
            setDropTarget(null);
        }
    };

    // Lógica de filtros e paginação
    const formatFileSize = (bytes: number): string => {
        if (!bytes) return '0 B';
        const k = 1024;
        const sizes = ['B', 'KB', 'MB', 'GB'];
        const i = Math.floor(Math.log(bytes) / Math.log(k));
        return `${parseFloat((bytes / Math.pow(k, i)).toFixed(1))} ${sizes[i]}`;
    };

    const isRaiz = !pastaAtual;
    const itensParaMostrar = isRaiz ? [...pastas, ...arquivosSemPasta] : arquivos;

    const itensFiltrados = itensParaMostrar.filter(item => {
        if (isRaiz) {
            if ('usuario' in item) {
                const arquivo = item as ArquivoCompartilhado;
                const matchSearch = arquivo.nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
                                   arquivo.descricao?.toLowerCase().includes(searchTerm.toLowerCase());
                const matchCategory = !categoryFilter || arquivo.categoria === categoryFilter;
                const hasPermission = isAdmin || arquivo.publico || arquivo.usuario.id === user?.id;
                return matchSearch && matchCategory && hasPermission;
            } else {
                const pasta = item as PastaCompartilhamento;
                return pasta.nome.toLowerCase().includes(searchTerm.toLowerCase());
            }
        } else {
            const arquivo = item as ArquivoCompartilhado;
            const matchSearch = arquivo.nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
                               arquivo.descricao?.toLowerCase().includes(searchTerm.toLowerCase());
            const matchCategory = !categoryFilter || arquivo.categoria === categoryFilter;
            const hasPermission = isAdmin || arquivo.publico || arquivo.usuario.id === user?.id;
            return matchSearch && matchCategory && hasPermission;
        }
    });

    const totalPages = Math.ceil(itensFiltrados.length / cardsPerPage);
    const startIndex = (currentPage - 1) * cardsPerPage;
    const paginatedItens = itensFiltrados.slice(startIndex, startIndex + cardsPerPage);

    const stats = {
        total: isRaiz ? pastas.length + arquivosSemPasta.length : arquivos.length,
        publicos: isRaiz ? 
            pastas.filter(p => p.publico).length + arquivosSemPasta.filter(a => a.publico).length : 
            arquivos.filter(a => a.publico).length,
        totalSize: isRaiz ? 
            arquivosSemPasta.reduce((acc, a) => acc + (a.tamanho || 0), 0) : 
            arquivos.reduce((acc, a) => acc + (a.tamanho || 0), 0),
        totalDownloads: isRaiz ? 
            arquivosSemPasta.reduce((acc, a) => acc + (a.downloads || 0), 0) : 
            arquivos.reduce((acc, a) => acc + (a.downloads || 0), 0)
    };

    if (loading && itensParaMostrar.length === 0) {
        return (
            <div className="flex items-center justify-center h-screen">
                <Loader2 className="w-8 h-8 animate-spin text-primary-600" />
                <span className="ml-2">Carregando...</span>
            </div>
        );
    }

    return (
        <div className={`h-full ${isMobile ? '' : 'lg:fixed lg:top-20 lg:left-0 lg:lg:left-64 lg:right-0 lg:bottom-0'} bg-white overflow-hidden`}>
            <div className="h-full flex">
                
                {/* Sidebar */}
                {showSidebar && (
                    <div className={`${isMobile ? 'fixed inset-y-0 left-0 z-50 w-80 bg-white shadow-lg' : 'w-80'} border-r border-gray-200 flex flex-col`}>
                        {/* Header Sidebar */}
                        <div className="p-4 border-b border-gray-200">
                            <div className="flex items-center justify-between">
                                <div className="flex items-center space-x-3">
                                    <div className="p-2 bg-primary-100 rounded-lg">
                                        <FolderPlus className="w-5 h-5 text-primary-600" />
                                    </div>
                                    <div>
                                        <h2 className="font-semibold text-gray-900">Pastas</h2>
                                        <p className="text-gray-600 text-sm">Organize seus arquivos</p>
                                    </div>
                                </div>
                                
                                <div className="flex space-x-2">
                                    {isAdmin && (
                                        <button
                                            onClick={handleCreatePasta}
                                            className="p-1.5 text-gray-600 hover:text-primary-600 hover:bg-primary-50 rounded"
                                            title="Criar pasta"
                                        >
                                            <FolderPlus className="w-4 h-4" />
                                        </button>
                                    )}
                                    {isMobile && (
                                        <button
                                            onClick={() => setShowSidebar(false)}
                                            className="p-1.5 text-gray-600 hover:bg-gray-100 rounded"
                                        >
                                            <X className="w-4 h-4" />
                                        </button>
                                    )}
                                </div>
                            </div>
                        </div>
                        
                        <div className="flex-1 overflow-y-auto p-4">
                            <PastaTreeView
                                pastas={pastas}
                                pastaAtual={pastaAtual}
                                onSelectPasta={handleSelectPasta}
                                onEditPasta={handleEditPasta}
                                onDeletePasta={handleDeletePasta}
                                onCreateSubpasta={handleCreateSubpasta}
                                isAdmin={isAdmin}
                            />
                        </div>

                        {/* Stats Sidebar */}
                        <div className="p-4 border-t border-gray-200 bg-gray-50">
                            <div className="grid grid-cols-2 gap-3">
                                <div className="bg-white p-3 rounded-lg text-center shadow-sm">
                                    <div className="text-xl font-bold text-primary-600">{pastas.length}</div>
                                    <div className="text-xs text-gray-600">Pastas</div>
                                </div>
                                <div className="bg-white p-3 rounded-lg text-center shadow-sm">
                                    <div className="text-xl font-bold text-primary-600">{stats.total}</div>
                                    <div className="text-xs text-gray-600">Arquivos</div>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {/* Conteúdo Principal */}
                <div className="flex-1 flex flex-col overflow-hidden">
                    
                    {/* Header */}
                    <HeaderComponent
                        isMobile={isMobile}
                        showSidebar={showSidebar}
                        setShowSidebar={setShowSidebar}
                        pastaAtual={pastaAtual}
                        isRaiz={isRaiz}
                        stats={stats}
                        formatFileSize={formatFileSize}
                        onUploadClick={() => fileInputRef.current?.click()}
                    />

                    {/* Filtros */}
                    <div className={`flex-shrink-0 ${isMobile ? 'p-3' : 'p-4'} border-b border-gray-100`}>
                        <div className={`${isMobile ? 'space-y-3' : 'flex items-center space-x-4'}`}>
                            <div className={`${isMobile ? 'w-full' : 'flex-1 max-w-md'} relative`}>
                                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                                <input
                                    type="text"
                                    placeholder={isRaiz ? "Buscar pastas e arquivos..." : "Buscar arquivos..."}
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                                />
                            </div>
                            
                            {!isRaiz && (
                                <select
                                    value={categoryFilter}
                                    onChange={(e) => setCategoryFilter(e.target.value)}
                                    className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
                                >
                                    <option value="">Todas Categorias</option>
                                    {categorias.map(cat => (
                                        <option key={cat.value} value={cat.value}>{cat.label}</option>
                                    ))}
                                </select>
                            )}
                        </div>
                    </div>

                    {/* Grid Principal */}
                    <div className="flex-1 overflow-y-auto p-4 pb-20">
                        <FileGrid
                            items={paginatedItens}
                            isRaiz={isRaiz}
                            isMobile={isMobile}
                            cardsPerPage={cardsPerPage}
                            user={user}
                            isAdmin={isAdmin}
                            dropTarget={dropTarget}
                            categorias={categorias}
                            formatFileSize={formatFileSize}
                            onDragStart={handleDragStart}
                            onDragOver={handleDragOver}
                            onDragEnter={handleDragEnter}
                            onDragLeave={handleDragLeave}
                            onDropPasta={handleDrop}
                            onSelectPasta={handleSelectPasta}
                            onToggleFavorito={toggleFavorito}
                            onDownload={handleDownload}
                            onToggleVisibility={toggleVisibility}
                            onDelete={handleDelete}
                        />
                    </div>
                </div>
            </div>

            {/* Paginação */}
            {itensFiltrados.length > 0 && totalPages > 1 && (
                <div className={`fixed bottom-0 ${isMobile ? 'left-0 right-0' : 'left-0 lg:left-64 right-0'} bg-white border-t border-gray-200 shadow-lg z-30`}>
                    <div className={`${isMobile ? 'p-3' : 'p-4'}`}>
                        {isMobile ? (
                            <div className="flex items-center justify-between">
                                <span className="text-xs text-gray-600">
                                    {startIndex + 1}-{Math.min(startIndex + cardsPerPage, itensFiltrados.length)} de {itensFiltrados.length}
                                </span>
                                
                                <div className="flex items-center space-x-1">
                                    <button
                                        onClick={() => setCurrentPage(Math.max(currentPage - 1, 1))}
                                        disabled={currentPage === 1}
                                        className="flex items-center px-3 py-2 text-sm border rounded-lg hover:bg-gray-50 disabled:opacity-50"
                                    >
                                        <ChevronLeft className="w-4 h-4" />
                                    </button>

                                    <span className="px-3 py-2 bg-primary-500 text-white rounded-lg text-sm font-bold min-w-16 text-center">
                                        {currentPage}/{totalPages}
                                    </span>

                                    <button
                                        onClick={() => setCurrentPage(Math.min(currentPage + 1, totalPages))}
                                        disabled={currentPage >= totalPages}
                                        className="flex items-center px-3 py-2 text-sm border rounded-lg hover:bg-gray-50 disabled:opacity-50"
                                    >
                                        <ChevronRight className="w-4 h-4" />
                                    </button>
                                </div>
                            </div>
                        ) : (
                            <div className="flex items-center justify-between text-sm">
                                <span className="text-gray-600">
                                    {startIndex + 1}-{Math.min(startIndex + cardsPerPage, itensFiltrados.length)} de {itensFiltrados.length}
                                </span>
                                
                                <div className="flex items-center space-x-2">
                                    <button
                                        onClick={() => setCurrentPage(1)}
                                        disabled={currentPage === 1}
                                        className="px-2 py-1 text-xs border rounded hover:bg-gray-50 disabled:opacity-50"
                                    >
                                        1ª
                                    </button>
                                    
                                    <button
                                        onClick={() => setCurrentPage(Math.max(currentPage - 1, 1))}
                                        disabled={currentPage === 1}
                                        className="flex items-center px-2 py-1 text-xs border rounded hover:bg-gray-50 disabled:opacity-50"
                                    >
                                        <ChevronLeft className="w-3 h-3" />
                                    </button>

                                    <span className="px-3 py-1 bg-primary-500 text-white rounded text-xs font-bold">
                                        {currentPage}/{totalPages}
                                    </span>

                                    <button
                                        onClick={() => setCurrentPage(Math.min(currentPage + 1, totalPages))}
                                        disabled={currentPage >= totalPages}
                                        className="flex items-center px-2 py-1 text-xs border rounded hover:bg-gray-50 disabled:opacity-50"
                                    >
                                        <ChevronRight className="w-3 h-3" />
                                    </button>
                                    
                                    <button
                                        onClick={() => setCurrentPage(totalPages)}
                                        disabled={currentPage >= totalPages}
                                        className="px-2 py-1 text-xs border rounded hover:bg-gray-50 disabled:opacity-50"
                                    >
                                        Últ
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            )}

            {/* Modais - CORRIGIDOS */}
            <PastaModal
                pasta={pastaEditando}
                parentePastas={pastas}
                pastaPai={pastaPaiParaSubpasta}
                isOpen={showPastaModal}
                onClose={() => {
                    setShowPastaModal(false);
                    setPastaPaiParaSubpasta(null);
                }}
                onSave={handleSavePasta}
            />

            <UploadModal
                isOpen={!!selectedFile}
                selectedFile={selectedFile}
                pastaAtual={pastaAtual}
                uploading={uploading}
                onClose={() => {
                    setSelectedFile(null);
                    fileInputRef.current!.value = '';
                }}
                onSubmit={handleUpload}
                uploadForm={uploadForm}
                setUploadForm={setUploadForm}
                formatFileSize={formatFileSize}
                categorias={categorias}
            />

            {/* Input oculto */}
            <input
                ref={fileInputRef}
                type="file"
                onChange={handleFileSelect}
                className="hidden"
            />

            {/* Alertas */}
            {error && (
                <div className="fixed top-4 right-4 bg-red-100 border border-red-300 text-red-700 px-4 py-3 rounded-lg shadow-lg z-50 max-w-md">
                    <div className="flex items-start">
                        <AlertCircle className="w-5 h-5 mr-2 flex-shrink-0 mt-0.5" />
                        <div className="flex-1">
                            <p className="text-sm">{error}</p>
                        </div>
                        <button onClick={() => setError('')} className="ml-2 flex-shrink-0">
                            <X className="w-4 h-4" />
                        </button>
                    </div>
                </div>
            )}

            {success && (
                <div className="fixed top-4 right-4 bg-green-100 border border-green-300 text-green-700 px-4 py-3 rounded-lg shadow-lg z-50 max-w-md">
                    <div className="flex items-center">
                        <CheckCircle className="w-5 h-5 mr-2" />
                        <p className="text-sm">{success}</p>
                        <button onClick={() => setSuccess('')} className="ml-2">
                            <X className="w-4 h-4" />
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}