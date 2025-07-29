'use client';

import { useState } from 'react';
import {
    Plus,
    FileText,
    Upload,
    Download,
    Edit,
    Trash2,
    Eye,
    FolderOpen,
    Search,
    ChevronLeft,
    ChevronRight,
    Filter,
    X,
    File,
    Receipt,
    BarChart3,
    Award,
    DollarSign
} from 'lucide-react';

// Mock data
const mockDocumentos = [
    {
        id: 1,
        nome: 'Contrato de Prestação de Serviços 2024',
        tipo: 'contrato',
        arquivo: [{ name: 'contrato_2024.pdf', size: 245678 }],
        createdAt: '2024-01-15'
    },
    {
        id: 2,
        nome: 'Fatura Energia Dezembro',
        tipo: 'fatura',
        arquivo: [{ name: 'fatura_energia_dez.pdf', size: 123456 }],
        createdAt: '2024-01-10'
    },
    {
        id: 3,
        nome: 'Relatório Mensal Janeiro',
        tipo: 'relatorio',
        arquivo: [{ name: 'relatorio_jan.pdf', size: 567890 }],
        createdAt: '2024-01-08'
    },
    {
        id: 4,
        nome: 'Certificado SSL 2024',
        tipo: 'certificado',
        arquivo: [{ name: 'ssl_cert.pdf', size: 89012 }],
        createdAt: '2024-01-05'
    },
    {
        id: 5,
        nome: 'Orçamento Marketing Q1',
        tipo: 'orcamento',
        arquivo: [{ name: 'orcamento_q1.xlsx', size: 156789 }],
        createdAt: '2024-01-03'
    },
    {
        id: 6,
        nome: 'Proposta Comercial Março',
        tipo: 'contrato',
        arquivo: [{ name: 'proposta_marco.pdf', size: 198765 }],
        createdAt: '2024-01-02'
    }
];

const tiposDocumento = [
    { value: 'contrato', label: 'Contratos', icon: File, count: 2 },
    { value: 'fatura', label: 'Faturas', icon: Receipt, count: 1 },
    { value: 'relatorio', label: 'Relatórios', icon: BarChart3, count: 1 },
    { value: 'certificado', label: 'Certificados', icon: Award, count: 1 },
    { value: 'orcamento', label: 'Orçamentos', icon: DollarSign, count: 1 }
];

export default function DocumentosPage() {
    const [searchTerm, setSearchTerm] = useState('');
    const [showCreateModal, setShowCreateModal] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    
    // Cards por página responsivo
    const getCardsPerPage = () => {
        if (typeof window !== 'undefined') {
            const width = window.innerWidth;
            if (width < 640) return 6;        // Mobile: 6 cards
            if (width < 1024) return 8;       // Tablet: 8 cards  
            if (width < 1528) return 8;       // Desktop: 8 cards
            if (width < 2800) return 8;       // Compact: 8 cards
            return 12;                        // Large: 12 cards
        }
        return 8;
    };
    
    const CARDS_PER_PAGE = getCardsPerPage();

    const formatFileSize = (bytes) => {
        const k = 1024;
        const sizes = ['Bytes', 'KB', 'MB', 'GB'];
        const i = Math.floor(Math.log(bytes) / Math.log(k));
        return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
    };

    const formatDate = (date) => {
        return new Date(date).toLocaleDateString('pt-PT', {
            day: '2-digit',
            month: 'short',
            year: 'numeric'
        });
    };

    const getFileIcon = (filename) => {
        const ext = filename.split('.').pop()?.toLowerCase();
        switch (ext) {
            case 'pdf': return FileText;
            case 'doc':
            case 'docx': return FileText;
            case 'xls':
            case 'xlsx': return BarChart3;
            default: return FileText;
        }
    };

    const filteredDocumentos = mockDocumentos.filter(documento => {
        return documento.nome.toLowerCase().includes(searchTerm.toLowerCase());
    });

    // Paginação
    const totalPages = Math.ceil(filteredDocumentos.length / CARDS_PER_PAGE);
    const startIndex = (currentPage - 1) * CARDS_PER_PAGE;
    const endIndex = startIndex + CARDS_PER_PAGE;
    const currentDocumentos = filteredDocumentos.slice(startIndex, endIndex);

    const handleSearchChange = (value) => {
        setSearchTerm(value);
        setCurrentPage(1);
    };

    const stats = {
        total: mockDocumentos.length,
        totalSize: formatFileSize(mockDocumentos.reduce((acc, doc) => acc + (doc.arquivo?.[0]?.size || 0), 0)),
        filteredCount: filteredDocumentos.length
    };

    return (
        // MOBILE: Layout normal com scroll, DESKTOP: Fixed para aproveitar espaço
        <div className="h-full lg:fixed lg:top-20 lg:left-0 lg:lg:left-64 lg:right-0 lg:bottom-0 bg-white overflow-hidden">
            <div className="h-full flex flex-col">
                
                {/* Header Compacto */}
                <div className="flex-shrink-0 flex items-center justify-between p-3 sm:p-4 compactDesktop:p-3 customXl:p-6 border-b border-gray-200">
                    <div className="flex items-center space-x-2 sm:space-x-3">
                        <div className="p-2 bg-primary-100 rounded-lg">
                            <FileText className="w-5 h-5 sm:w-6 h-6 text-primary-600" />
                        </div>
                        <div>
                            <h1 className="text-lg sm:text-xl font-bold text-gray-900">Documentos</h1>
                            <p className="text-xs sm:text-sm text-gray-600">{stats.total} docs • {stats.totalSize}</p>
                        </div>
                    </div>
                    <button
                        onClick={() => setShowCreateModal(true)}
                        className="bg-primary-500 hover:bg-primary-600 text-white px-3 py-2 sm:px-4 py-2 rounded-lg font-medium text-sm transition-colors"
                    >
                        <Plus className="w-4 h-4 mr-1 sm:mr-2 inline" />
                        <span className="hidden sm:inline">Novo</span>
                    </button>
                </div>

                {/* Busca Simples */}
                <div className="flex-shrink-0 p-3 sm:p-4 compactDesktop:p-3 customXl:p-6 border-b border-gray-100">
                    <div className="flex items-center space-x-2">
                        <div className="flex-1 relative">
                            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                            <input
                                type="text"
                                placeholder="Buscar documentos..."
                                value={searchTerm}
                                onChange={(e) => handleSearchChange(e.target.value)}
                                className="w-full pl-10 pr-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-200 focus:border-primary-500"
                            />
                            {searchTerm && (
                                <button
                                    onClick={() => handleSearchChange('')}
                                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                                >
                                    <X className="w-4 h-4" />
                                </button>
                            )}
                        </div>
                        {searchTerm && (
                            <button
                                onClick={() => setSearchTerm('')}
                                className="px-3 py-2 text-sm text-gray-600 hover:text-gray-800 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                            >
                                Limpar
                            </button>
                        )}
                    </div>
                </div>

                {/* Grid Principal */}
                <div className="flex-1 min-h-0 p-3 sm:p-4 compactDesktop:p-3 customXl:p-6">
                    {filteredDocumentos.length === 0 ? (
                        <div className="h-full flex items-center justify-center">
                            <div className="text-center">
                                <FolderOpen className="w-12 h-12 sm:w-16 h-16 text-gray-300 mx-auto mb-4" />
                                <h3 className="text-lg sm:text-xl font-medium text-gray-900 mb-2">Nenhum documento</h3>
                                <p className="text-sm text-gray-600 mb-4">
                                    {searchTerm ? 'Ajuste a busca' : 'Envie seu primeiro documento'}
                                </p>
                                {!searchTerm && (
                                    <button
                                        onClick={() => setShowCreateModal(true)}
                                        className="bg-primary-500 hover:bg-primary-600 text-white px-4 py-2 rounded-lg font-medium transition-colors"
                                    >
                                        Criar Documento
                                    </button>
                                )}
                            </div>
                        </div>
                    ) : (
                        <div className="h-full flex flex-col">
                            {/* Grid Responsivo */}
                            <div className="flex-1 overflow-y-auto">
                                <div className="grid gap-3 sm:gap-4 compactDesktop:gap-3 customXl:gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 compactDesktop:grid-cols-4 customXl:grid-cols-6 pb-4">
                                    {currentDocumentos.map((documento) => {
                                        const IconComponent = tiposDocumento.find(t => t.value === documento.tipo)?.icon || FileText;
                                        const FileIconComponent = getFileIcon(documento.arquivo?.[0]?.name || '');
                                        
                                        return (
                                            <div key={documento.id} className="bg-white rounded-lg shadow-md border border-gray-200 hover:shadow-lg transition-shadow p-4 flex flex-col">
                                                
                                                {/* Header */}
                                                <div className="flex items-start justify-between mb-3">
                                                    <div className="flex items-center space-x-2 flex-1 min-w-0">
                                                        <div className="p-2 bg-primary-100 rounded-lg">
                                                            <FileText className="w-4 h-4 text-primary-600" />
                                                        </div>
                                                        <div className="flex-1 min-w-0">
                                                            <h3 className="text-sm font-semibold text-gray-900 leading-tight">{documento.nome}</h3>
                                                            <p className="text-xs text-gray-500 mt-1">{formatDate(documento.createdAt)}</p>
                                                        </div>
                                                    </div>
                                                    <button className="p-1 text-gray-400 hover:text-primary-600 transition-colors rounded hover:bg-gray-50">
                                                        <Eye className="w-4 h-4" />
                                                    </button>
                                                </div>

                                                {/* Tipo */}
                                                <div className="mb-3">
                                                    <span className="inline-flex items-center px-2 py-1 text-xs font-medium bg-primary-100 text-primary-700 rounded-full">
                                                        <IconComponent className="w-3 h-3 mr-1" />
                                                        {tiposDocumento.find(t => t.value === documento.tipo)?.label}
                                                    </span>
                                                </div>

                                                {/* Arquivo */}
                                                {documento.arquivo?.length > 0 && (
                                                    <div className="mb-3 flex-1">
                                                        {documento.arquivo.map((arquivo, index) => (
                                                            <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg border border-gray-100">
                                                                <div className="flex items-center space-x-2 flex-1 min-w-0">
                                                                    <FileIconComponent className="w-5 h-5 text-gray-600" />
                                                                    <div className="flex-1 min-w-0">
                                                                        <p className="text-xs font-medium text-gray-900 truncate">{arquivo.name}</p>
                                                                        <p className="text-xs text-gray-500">{formatFileSize(arquivo.size)}</p>
                                                                    </div>
                                                                </div>
                                                                <button className="p-1 text-gray-400 hover:text-primary-600 transition-colors rounded hover:bg-white">
                                                                    <Download className="w-4 h-4" />
                                                                </button>
                                                            </div>
                                                        ))}
                                                    </div>
                                                )}

                                                {/* Ações */}
                                                <div className="flex space-x-2 pt-3 border-t border-gray-100">
                                                    <button className="flex-1 bg-gray-50 text-gray-700 py-2 rounded font-medium hover:bg-gray-100 transition-colors flex items-center justify-center space-x-1">
                                                        <Edit className="w-3 h-3" />
                                                        <span className="text-xs">Editar</span>
                                                    </button>
                                                    <button className="p-2 text-red-500 hover:text-red-700 hover:bg-red-50 rounded transition-colors">
                                                        <Trash2 className="w-3 h-3" />
                                                    </button>
                                                </div>
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>

                            {/* Paginação */}
                            {totalPages > 1 && (
                                <div className="flex-shrink-0 flex items-center justify-center space-x-2 mt-4 pt-4 border-t border-gray-100">
                                    <button
                                        onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                                        disabled={currentPage === 1}
                                        className="flex items-center space-x-1 px-3 py-2 bg-gray-100 text-gray-700 rounded font-medium hover:bg-gray-200 transition-colors disabled:opacity-50 disabled:cursor-not-allowed text-sm"
                                    >
                                        <ChevronLeft className="w-4 h-4" />
                                        <span className="hidden sm:inline">Anterior</span>
                                    </button>

                                    <div className="flex space-x-1">
                                        {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                                            <button
                                                key={page}
                                                onClick={() => setCurrentPage(page)}
                                                className={`w-8 h-8 rounded font-medium transition-colors text-sm ${
                                                    page === currentPage
                                                        ? 'bg-primary-500 text-white'
                                                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                                                }`}
                                            >
                                                {page}
                                            </button>
                                        ))}
                                    </div>

                                    <button
                                        onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                                        disabled={currentPage === totalPages}
                                        className="flex items-center space-x-1 px-3 py-2 bg-gray-100 text-gray-700 rounded font-medium hover:bg-gray-200 transition-colors disabled:opacity-50 disabled:cursor-not-allowed text-sm"
                                    >
                                        <span className="hidden sm:inline">Próximo</span>
                                        <ChevronRight className="w-4 h-4" />
                                    </button>
                                </div>
                            )}
                        </div>
                    )}
                </div>
            </div>

            {/* Modal */}
            {showCreateModal && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
                    <div className="bg-white rounded-xl shadow-2xl max-w-lg w-full mx-4">
                        <div className="p-6 text-center">
                            <Upload className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                            <h3 className="text-xl font-medium text-gray-900 mb-2">Novo Documento</h3>
                            <p className="text-gray-600 mb-6">Formulário de upload será implementado</p>
                            <div className="flex space-x-3 justify-center">
                                <button 
                                    onClick={() => setShowCreateModal(false)}
                                    className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
                                >
                                    Cancelar
                                </button>
                                <button className="px-4 py-2 bg-primary-500 text-white rounded-lg hover:bg-primary-600 transition-colors">
                                    Criar
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}