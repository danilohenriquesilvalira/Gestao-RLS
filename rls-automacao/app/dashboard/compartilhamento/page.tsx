'use client';

import { useState, useEffect, useRef } from 'react';
import { compartilhamentoAPI, ArquivoCompartilhado, UploadData } from '@/lib/compartilhamentoApi';
import { useAuth } from '@/hooks/useAuth';
import {
    Upload,
    Download,
    Share2,
    Trash2,
    Search,
    Plus,
    X,
    Eye,
    EyeOff,
    Loader2,
    AlertCircle,
    CheckCircle,
    Folder,
    Archive,
    FileText,
    Image,
    Code,
    Users,
    Calendar,
    HardDrive,
    ArrowUpRight,
    ChevronLeft,
    ChevronRight
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
    const [arquivos, setArquivos] = useState<ArquivoCompartilhado[]>([]);
    const [loading, setLoading] = useState(true);
    const [uploading, setUploading] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [searchTerm, setSearchTerm] = useState('');
    const [categoryFilter, setCategoryFilter] = useState('');
    const [visibilityFilter, setVisibilityFilter] = useState('');
    const [showUploadModal, setShowUploadModal] = useState(false);
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [isMobile, setIsMobile] = useState(false);
    const [cardsPerPage, setCardsPerPage] = useState(8);

    const [uploadForm, setUploadForm] = useState<UploadData>({
        nome: '',
        descricao: '',
        categoria: 'projeto',
        publico: true
    });
    const fileInputRef = useRef<HTMLInputElement>(null);

    // Detecta mobile e ajusta layout
    useEffect(() => {
        const updateLayout = () => {
            const width = window.innerWidth;
            const mobile = width <= 768;
            
            setIsMobile(mobile);
            
            if (mobile) {
                setCardsPerPage(6); // Mobile: 6 cards por página
            } else if (width <= 1528) {
                setCardsPerPage(8); // Desktop pequeno: 8 cards
            } else {
                setCardsPerPage(12); // Desktop grande: 12 cards
            }
        };

        updateLayout();
        window.addEventListener('resize', updateLayout);
        return () => window.removeEventListener('resize', updateLayout);
    }, []);

    useEffect(() => {
        carregarArquivos();
    }, []);

    // Reset página quando filtros mudarem
    useEffect(() => {
        setCurrentPage(1);
    }, [searchTerm, categoryFilter, visibilityFilter, cardsPerPage]);

    const carregarArquivos = async () => {
        try {
            setLoading(true);
            const data = await compartilhamentoAPI.buscarArquivos();
            setArquivos(data);
        } catch (err: any) {
            setError(err.message || 'Erro ao carregar arquivos');
        } finally {
            setLoading(false);
        }
    };

    const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (!file) return;

        if (file.size > 100 * 1024 * 1024) {
            setError('Arquivo muito grande. Máximo 100MB');
            return;
        }

        setSelectedFile(file);
        setUploadForm((prev: UploadData) => ({
            ...prev,
            nome: file.name.split('.')[0]
        }));
        setShowUploadModal(true);
    };

    const handleUpload = async () => {
        if (!selectedFile) return;

        try {
            setUploading(true);
            await compartilhamentoAPI.uploadArquivo(selectedFile, uploadForm);
            setSuccess('Arquivo enviado com sucesso!');
            setShowUploadModal(false);
            setSelectedFile(null);
            setUploadForm({ nome: '', descricao: '', categoria: 'projeto', publico: true });
            await carregarArquivos();
        } catch (err: any) {
            setError(err.message || 'Erro ao enviar arquivo');
        } finally {
            setUploading(false);
        }
    };

    const handleDownload = async (arquivo: ArquivoCompartilhado) => {
        try {
            await compartilhamentoAPI.downloadArquivo(arquivo.id);
            await carregarArquivos();
        } catch (err: any) {
            setError('Erro ao baixar arquivo');
        }
    };

    const handleDelete = async (id: number) => {
        if (!confirm('Excluir arquivo permanentemente?')) return;

        try {
            await compartilhamentoAPI.deletarArquivo(id);
            setSuccess('Arquivo excluído!');
            await carregarArquivos();
        } catch (err: any) {
            setError('Erro ao excluir arquivo');
        }
    };

    const toggleVisibility = async (arquivo: ArquivoCompartilhado) => {
        try {
            await compartilhamentoAPI.alterarVisibilidade(arquivo.id, !arquivo.publico);
            await carregarArquivos();
        } catch (err: any) {
            setError('Erro ao alterar visibilidade');
        }
    };

    const formatFileSize = (bytes: number): string => {
        if (!bytes) return '0 B';
        const k = 1024;
        const sizes = ['B', 'KB', 'MB', 'GB'];
        const i = Math.floor(Math.log(bytes) / Math.log(k));
        return `${parseFloat((bytes / Math.pow(k, i)).toFixed(1))} ${sizes[i]}`;
    };

    const arquivosFiltrados = arquivos.filter(arquivo => {
        const matchSearch = arquivo.nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           arquivo.descricao?.toLowerCase().includes(searchTerm.toLowerCase());
        const matchCategory = !categoryFilter || arquivo.categoria === categoryFilter;
        const matchVisibility = !visibilityFilter || 
                               (visibilityFilter === 'publico' && arquivo.publico) ||
                               (visibilityFilter === 'privado' && !arquivo.publico);
        const hasPermission = isAdmin || arquivo.publico || arquivo.usuario.id === user?.id;
        
        return matchSearch && matchCategory && matchVisibility && hasPermission;
    });

    // Paginação
    const totalPages = Math.ceil(arquivosFiltrados.length / cardsPerPage);
    const startIndex = (currentPage - 1) * cardsPerPage;
    const paginatedArquivos = arquivosFiltrados.slice(startIndex, startIndex + cardsPerPage);

    const stats = {
        total: arquivos.length,
        publicos: arquivos.filter(a => a.publico).length,
        totalSize: arquivos.reduce((acc, a) => acc + (a.tamanho || 0), 0),
        totalDownloads: arquivos.reduce((acc, a) => acc + (a.downloads || 0), 0)
    };

    if (loading && arquivos.length === 0) {
        return (
            <div className="flex items-center justify-center h-screen">
                <Loader2 className="w-8 h-8 animate-spin text-primary-600" />
                <span className="ml-2">Carregando arquivos...</span>
            </div>
        );
    }

    return (
        <div className={`h-full ${isMobile ? '' : 'lg:fixed lg:top-20 lg:left-0 lg:lg:left-64 lg:right-0 lg:bottom-0'} bg-white overflow-hidden`}>
            <div className="h-full flex flex-col">
                
                {/* Header */}
                <div className={`flex-shrink-0 ${isMobile ? 'p-4' : 'p-3 sm:p-4 compactDesktop:p-3 customXl:p-6'} border-b border-gray-200`}>
                    <div className={`flex ${isMobile ? 'flex-col space-y-4' : 'flex-col lg:flex-row lg:items-center justify-between space-y-3 lg:space-y-0'}`}>
                        <div className="flex items-center space-x-2 sm:space-x-3">
                            <div className="p-2 bg-primary-100 rounded-lg">
                                <Share2 className={`${isMobile ? 'w-6 h-6' : 'w-5 h-5 sm:w-6 h-6'} text-primary-600`} />
                            </div>
                            <div>
                                <h1 className={`${isMobile ? 'text-xl' : 'text-lg sm:text-xl'} font-bold text-gray-900`}>Compartilhamento</h1>
                                <p className={`${isMobile ? 'text-sm' : 'text-xs sm:text-sm'} text-gray-600`}>
                                    {stats.total} arquivos • {formatFileSize(stats.totalSize)} • {stats.totalDownloads} downloads
                                </p>
                            </div>
                        </div>
                        
                        <button
                            onClick={() => fileInputRef.current?.click()}
                            className={`bg-primary-500 hover:bg-primary-600 text-white ${isMobile ? 'px-4 py-3' : 'px-3 py-2 sm:px-4 py-2'} rounded-lg font-medium ${isMobile ? 'text-base' : 'text-sm'} transition-colors flex items-center justify-center`}
                        >
                            <Plus className="w-4 h-4 mr-1 sm:mr-2" />
                            {isMobile ? 'Enviar Arquivo' : <><span className="hidden sm:inline">Enviar</span><span className="sm:hidden">Novo</span></>}
                        </button>
                    </div>
                </div>

                {/* Filtros */}
                <div className={`flex-shrink-0 ${isMobile ? 'p-4' : 'p-3 sm:p-4 compactDesktop:p-3 customXl:p-6'} border-b border-gray-100`}>
                    <div className={`${isMobile ? 'space-y-3' : 'flex items-center space-x-2'}`}>
                        {/* Search */}
                        <div className={`${isMobile ? 'w-full' : 'flex-1 max-w-md'} relative`}>
                            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                            <input
                                type="text"
                                placeholder="Buscar arquivos..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="w-full pl-10 pr-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-200 focus:border-primary-500"
                            />
                            {searchTerm && (
                                <button
                                    onClick={() => setSearchTerm('')}
                                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                                >
                                    <X className="w-4 h-4" />
                                </button>
                            )}
                        </div>

                        {/* Filtros */}
                        {isMobile ? (
                            <div className="grid grid-cols-2 gap-2">
                                <select
                                    value={categoryFilter}
                                    onChange={(e) => setCategoryFilter(e.target.value)}
                                    className="px-3 py-2 text-sm border border-gray-300 rounded focus:ring-2 focus:ring-primary-200"
                                >
                                    <option value="">Todas categorias</option>
                                    {categorias.map(cat => (
                                        <option key={cat.value} value={cat.value}>{cat.label}</option>
                                    ))}
                                </select>

                                <select
                                    value={visibilityFilter}
                                    onChange={(e) => setVisibilityFilter(e.target.value)}
                                    className="px-3 py-2 text-sm border border-gray-300 rounded focus:ring-2 focus:ring-primary-200"
                                >
                                    <option value="">Todos</option>
                                    <option value="publico">Públicos</option>
                                    <option value="privado">Privados</option>
                                </select>
                            </div>
                        ) : (
                            <div className="flex items-center space-x-2">
                                <select
                                    value={categoryFilter}
                                    onChange={(e) => setCategoryFilter(e.target.value)}
                                    className="px-2 py-1 text-sm border border-gray-300 rounded focus:ring-2 focus:ring-primary-200"
                                >
                                    <option value="">Todas categorias</option>
                                    {categorias.map(cat => (
                                        <option key={cat.value} value={cat.value}>{cat.label}</option>
                                    ))}
                                </select>

                                <select
                                    value={visibilityFilter}
                                    onChange={(e) => setVisibilityFilter(e.target.value)}
                                    className="px-2 py-1 text-sm border border-gray-300 rounded focus:ring-2 focus:ring-primary-200"
                                >
                                    <option value="">Todos</option>
                                    <option value="publico">Públicos</option>
                                    <option value="privado">Privados</option>
                                </select>
                            </div>
                        )}
                    </div>
                </div>

                {/* Stats */}
                <div className={`flex-shrink-0 ${isMobile ? 'p-4' : 'p-3 sm:p-4 compactDesktop:p-3 customXl:p-6'} border-b border-gray-100`}>
                    <div className="grid grid-cols-4 gap-2">
                        <div className="bg-white p-2 rounded border text-center">
                            <div className={`${isMobile ? 'text-lg' : 'text-base'} font-bold text-blue-600`}>{stats.total}</div>
                            <div className="text-xs text-gray-600">Total</div>
                        </div>
                        <div className="bg-white p-2 rounded border text-center">
                            <div className={`${isMobile ? 'text-lg' : 'text-base'} font-bold text-green-600`}>{stats.publicos}</div>
                            <div className="text-xs text-gray-600">Públicos</div>
                        </div>
                        <div className="bg-white p-2 rounded border text-center">
                            <div className={`${isMobile ? 'text-sm' : 'text-base'} font-bold text-purple-600`}>{isMobile ? formatFileSize(stats.totalSize).replace(' ', '') : formatFileSize(stats.totalSize)}</div>
                            <div className="text-xs text-gray-600">Tamanho</div>
                        </div>
                        <div className="bg-white p-2 rounded border text-center">
                            <div className={`${isMobile ? 'text-lg' : 'text-base'} font-bold text-orange-600`}>{stats.totalDownloads}</div>
                            <div className="text-xs text-gray-600">Downloads</div>
                        </div>
                    </div>
                </div>

                {/* Error/Success Alerts */}
                {(error || success) && (
                    <div className={`flex-shrink-0 ${isMobile ? 'p-4' : 'p-3 sm:p-4'}`}>
                        {error && (
                            <div className="mb-2 p-3 bg-red-50 border border-red-200 rounded-lg flex items-center text-sm">
                                <AlertCircle className="w-4 h-4 text-red-600 mr-2" />
                                <span className="text-red-700 flex-1">{error}</span>
                                <button onClick={() => setError('')} className="ml-2">
                                    <X className="w-4 h-4 text-red-600" />
                                </button>
                            </div>
                        )}
                        {success && (
                            <div className="p-3 bg-green-50 border border-green-200 rounded-lg flex items-center text-sm">
                                <CheckCircle className="w-4 h-4 text-green-600 mr-2" />
                                <span className="text-green-700 flex-1">{success}</span>
                                <button onClick={() => setSuccess('')} className="ml-2">
                                    <X className="w-4 h-4 text-green-600" />
                                </button>
                            </div>
                        )}
                    </div>
                )}

                {/* Content */}
                <div className={`flex-1 min-h-0 ${isMobile ? 'p-4 pb-20' : 'p-3 sm:p-4 pb-16'}`}>
                    {arquivosFiltrados.length === 0 ? (
                        <div className="h-full flex items-center justify-center">
                            <div className="text-center">
                                <Share2 className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                                <h3 className="text-xl font-medium text-gray-900 mb-2">Nenhum arquivo encontrado</h3>
                                <p className="text-gray-600 mb-4">
                                    {searchTerm || categoryFilter || visibilityFilter ? 
                                        'Ajuste os filtros para ver mais arquivos' : 
                                        'Comece enviando seu primeiro arquivo'
                                    }
                                </p>
                                {!searchTerm && !categoryFilter && !visibilityFilter && (
                                    <button
                                        onClick={() => fileInputRef.current?.click()}
                                        className="bg-primary-500 hover:bg-primary-600 text-white px-4 py-2 rounded-lg font-medium transition-colors"
                                    >
                                        Enviar Arquivo
                                    </button>
                                )}
                            </div>
                        </div>
                    ) : (
                        <div className="h-full flex flex-col">
                            {/* Grid responsivo */}
                            <div className="flex-1 overflow-y-auto pb-4">
                                {isMobile ? (
                                    /* Layout Mobile - Lista Vertical */
                                    <div className="space-y-3">
                                        {paginatedArquivos.map((arquivo) => {
                                            const categoryInfo = categorias.find(c => c.value === arquivo.categoria);
                                            const isOwner = arquivo.usuario.id === user?.id;

                                            return (
                                                <div key={arquivo.id} className="bg-white rounded-lg border border-gray-200 hover:shadow-md transition-shadow p-4">
                                                    {/* Header Mobile */}
                                                    <div className="flex items-start justify-between mb-3">
                                                        <div className="flex items-start space-x-3 flex-1">
                                                            <div className="p-2 bg-primary-100 rounded-lg">
                                                                {categoryInfo && <categoryInfo.icon className="w-5 h-5 text-primary-600" />}
                                                            </div>
                                                            <div className="flex-1 min-w-0">
                                                                <h3 className="text-base font-semibold text-gray-900 truncate">{arquivo.nome}</h3>
                                                                <p className="text-sm text-gray-500">{formatFileSize(arquivo.tamanho)}</p>
                                                                <p className="text-xs text-gray-400 capitalize">{arquivo.categoria}</p>
                                                            </div>
                                                        </div>
                                                        <div className="flex items-center space-x-1">
                                                            {arquivo.publico ? (
                                                                <Eye className="w-4 h-4 text-green-500" />
                                                            ) : (
                                                                <EyeOff className="w-4 h-4 text-orange-500" />
                                                            )}
                                                        </div>
                                                    </div>

                                                    {/* Description */}
                                                    {arquivo.descricao && (
                                                        <p className="text-sm text-gray-600 mb-3 line-clamp-2">{arquivo.descricao}</p>
                                                    )}

                                                    {/* Meta info */}
                                                    <div className="flex items-center justify-between text-xs text-gray-500 mb-3">
                                                        <span>Por: {arquivo.usuario.nomecompleto}</span>
                                                        <span>{new Date(arquivo.createdAt).toLocaleDateString('pt-PT')}</span>
                                                    </div>

                                                    {/* Actions */}
                                                    <div className="flex space-x-2">
                                                        <button
                                                            onClick={() => handleDownload(arquivo)}
                                                            className="flex-1 bg-blue-50 text-blue-700 py-2 px-3 rounded-lg hover:bg-blue-100 font-medium text-sm flex items-center justify-center"
                                                        >
                                                            <Download className="w-4 h-4 mr-1" />
                                                            Download
                                                        </button>
                                                        
                                                        {(isOwner || isAdmin) && (
                                                            <>
                                                                <button
                                                                    onClick={() => toggleVisibility(arquivo)}
                                                                    className="p-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg"
                                                                >
                                                                    {arquivo.publico ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                                                                </button>
                                                                <button
                                                                    onClick={() => handleDelete(arquivo.id)}
                                                                    className="p-2 text-red-600 hover:text-red-700 hover:bg-red-50 rounded-lg"
                                                                >
                                                                    <Trash2 className="w-4 h-4" />
                                                                </button>
                                                            </>
                                                        )}
                                                    </div>
                                                </div>
                                            );
                                        })}
                                    </div>
                                ) : (
                                    /* Layout Desktop - Grid */
                                    <div className={`grid gap-3 ${
                                        cardsPerPage === 8 ? 'grid-cols-4 grid-rows-2' : 'grid-cols-4 grid-rows-3'
                                    }`}>
                                        {paginatedArquivos.map((arquivo) => {
                                            const categoryInfo = categorias.find(c => c.value === arquivo.categoria);
                                            const isOwner = arquivo.usuario.id === user?.id;

                                            return (
                                                <div key={arquivo.id} className="bg-white rounded-lg border border-gray-200 hover:shadow-md transition-shadow p-4 flex flex-col">
                                                    {/* Header */}
                                                    <div className="flex items-center space-x-2 mb-3">
                                                        <div className="p-2 bg-primary-100 rounded-lg">
                                                            {categoryInfo && <categoryInfo.icon className="w-4 h-4 text-primary-600" />}
                                                        </div>
                                                        <div className="flex-1 min-w-0">
                                                            <h3 className="text-sm font-semibold text-gray-900 truncate">{arquivo.nome}</h3>
                                                            <p className="text-xs text-gray-500">{formatFileSize(arquivo.tamanho)}</p>
                                                        </div>
                                                        <div className="flex items-center">
                                                            {arquivo.publico ? (
                                                                <Eye className="w-4 h-4 text-green-500" />
                                                            ) : (
                                                                <EyeOff className="w-4 h-4 text-orange-500" />
                                                            )}
                                                        </div>
                                                    </div>

                                                    {/* Category */}
                                                    <div className="mb-3">
                                                        <span className="px-2 py-1 text-xs bg-gray-100 text-gray-800 rounded-full capitalize">
                                                            {arquivo.categoria}
                                                        </span>
                                                    </div>

                                                    {/* Description */}
                                                    {arquivo.descricao && (
                                                        <p className="text-xs text-gray-600 mb-3 line-clamp-2 flex-1">{arquivo.descricao}</p>
                                                    )}

                                                    {/* Meta */}
                                                    <div className="text-xs text-gray-500 mb-3 space-y-1">
                                                        <div className="flex items-center justify-between">
                                                            <span>{new Date(arquivo.createdAt).toLocaleDateString('pt-PT')}</span>
                                                            <span>{arquivo.downloads} downloads</span>
                                                        </div>
                                                        <div className="truncate">Por: {arquivo.usuario.nomecompleto}</div>
                                                    </div>

                                                    {/* Actions */}
                                                    <div className="flex space-x-1 mt-auto pt-2 border-t border-gray-100">
                                                        <button
                                                            onClick={() => handleDownload(arquivo)}
                                                            className="flex-1 bg-blue-50 text-blue-700 py-1 px-2 rounded text-xs hover:bg-blue-100 font-medium flex items-center justify-center"
                                                        >
                                                            <Download className="w-3 h-3 mr-1" />
                                                            Download
                                                        </button>
                                                        
                                                        {(isOwner || isAdmin) && (
                                                            <>
                                                                <button
                                                                    onClick={() => toggleVisibility(arquivo)}
                                                                    className="p-1 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded"
                                                                >
                                                                    {arquivo.publico ? <EyeOff className="w-3 h-3" /> : <Eye className="w-3 h-3" />}
                                                                </button>
                                                                <button
                                                                    onClick={() => handleDelete(arquivo.id)}
                                                                    className="p-1 text-red-600 hover:text-red-700 hover:bg-red-50 rounded"
                                                                >
                                                                    <Trash2 className="w-3 h-3" />
                                                                </button>
                                                            </>
                                                        )}
                                                    </div>
                                                </div>
                                            );
                                        })}
                                    </div>
                                )}
                            </div>
                        </div>
                    )}
                </div>

                {/* Paginação */}
                {arquivosFiltrados.length > 0 && totalPages > 1 && (
                    <div className={`fixed bottom-0 ${isMobile ? 'left-0 right-0' : 'left-0 lg:left-64 right-0'} bg-white border-t border-gray-200 shadow-lg z-30`}>
                        <div className={`${isMobile ? 'p-3' : 'p-3 sm:p-4'}`}>
                            {isMobile ? (
                                /* Paginação Mobile */
                                <div className="flex items-center justify-between">
                                    <span className="text-xs text-gray-600">
                                        {startIndex + 1}-{Math.min(startIndex + cardsPerPage, arquivosFiltrados.length)} de {arquivosFiltrados.length}
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
                                /* Paginação Desktop */
                                <div className="flex items-center justify-between text-xs sm:text-sm">
                                    <span className="text-gray-600">
                                        {startIndex + 1}-{Math.min(startIndex + cardsPerPage, arquivosFiltrados.length)} de {arquivosFiltrados.length}
                                    </span>
                                    
                                    <div className="flex items-center space-x-1 sm:space-x-2">
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
            </div>

            {/* Upload Modal */}
            {showUploadModal && (
                <div className="fixed inset-0 z-50 bg-black bg-opacity-50">
                    <div className={`flex items-center justify-center min-h-screen ${isMobile ? 'p-4' : 'p-2 lg:p-4 lg:pl-72'}`}>
                        <div className={`bg-white rounded-lg shadow-xl ${isMobile ? 'w-full max-w-sm' : 'w-full max-w-md lg:max-w-lg'} max-h-[90vh] overflow-hidden`}>
                            {/* Header */}
                            <div className="flex items-center justify-between p-4 border-b bg-gray-50">
                                <h2 className="text-lg font-semibold text-gray-900">Enviar Arquivo</h2>
                                <button
                                    onClick={() => setShowUploadModal(false)}
                                    className="p-1 hover:bg-gray-200 rounded transition-colors"
                                >
                                    <X className="w-5 h-5 text-gray-500" />
                                </button>
                            </div>

                            {/* Content */}
                            <div className="overflow-y-auto" style={{ maxHeight: 'calc(90vh - 120px)' }}>
                                <div className="p-4 space-y-4">
                                    {/* Selected File */}
                                    {selectedFile && (
                                        <div className="p-3 bg-blue-50 rounded-lg">
                                            <div className="flex items-center">
                                                <Archive className="w-5 h-5 text-blue-600 mr-2" />
                                                <div>
                                                    <div className="text-sm font-medium">{selectedFile.name}</div>
                                                    <div className="text-xs text-gray-600">{formatFileSize(selectedFile.size)}</div>
                                                </div>
                                            </div>
                                        </div>
                                    )}

                                    {/* Form */}
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Nome *</label>
                                        <input
                                            type="text"
                                            required
                                            value={uploadForm.nome}
                                            onChange={(e) => setUploadForm((prev: UploadData) => ({...prev, nome: e.target.value}))}
                                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                                            placeholder="Nome do arquivo..."
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Descrição</label>
                                        <textarea
                                            value={uploadForm.descricao}
                                            onChange={(e) => setUploadForm((prev: UploadData) => ({...prev, descricao: e.target.value}))}
                                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                                            rows={3}
                                            placeholder="Descreva o arquivo..."
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Categoria</label>
                                        <select
                                            value={uploadForm.categoria}
                                            onChange={(e) => setUploadForm((prev: UploadData) => ({...prev, categoria: e.target.value}))}
                                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                                        >
                                            {categorias.map(cat => (
                                                <option key={cat.value} value={cat.value}>{cat.label}</option>
                                            ))}
                                        </select>
                                    </div>

                                    <div className="flex items-center">
                                        <input
                                            type="checkbox"
                                            id="publico"
                                            checked={uploadForm.publico}
                                            onChange={(e) => setUploadForm((prev: UploadData) => ({...prev, publico: e.target.checked}))}
                                            className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                                        />
                                        <label htmlFor="publico" className="ml-2 text-sm text-gray-700">
                                            Disponível para toda a equipe
                                        </label>
                                    </div>
                                </div>
                            </div>

                            {/* Footer */}
                            <div className="flex justify-end space-x-3 p-4 border-t bg-gray-50">
                                <button
                                    onClick={() => setShowUploadModal(false)}
                                    className="px-4 py-2 text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                                >
                                    Cancelar
                                </button>
                                <button
                                    onClick={handleUpload}
                                    disabled={uploading || !uploadForm.nome}
                                    className="px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 flex items-center disabled:opacity-50 transition-colors"
                                >
                                    {uploading ? (
                                        <>
                                            <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                                            Enviando...
                                        </>
                                    ) : (
                                        <>
                                            <Upload className="w-4 h-4 mr-2" />
                                            Enviar
                                        </>
                                    )}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Hidden file input */}
            <input
                ref={fileInputRef}
                type="file"
                accept=".zip,.rar,.7z,.tar,.gz,.pdf,.doc,.docx,.xls,.xlsx,.jpg,.jpeg,.png,.gif,.mp4,.avi,.mov"
                onChange={handleFileSelect}
                className="hidden"
            />
        </div>
    );
}