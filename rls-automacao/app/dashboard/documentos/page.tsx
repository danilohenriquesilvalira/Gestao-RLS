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
    FolderOpen
} from 'lucide-react';

// Componentes UI reutilizáveis
import Loading from '@/components/ui/Loading';
import EmptyState from '@/components/ui/EmptyState';
import StatsCard from '@/components/ui/StatsCard';
import PageHeader from '@/components/ui/PageHeader';
import SearchFilterBar from '@/components/ui/SearchFilterBar';
import Modal from '@/components/ui/Modal';
import PageFooter from '@/components/ui/PageFooter';
import Button from '@/components/ui/Button';

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
    }
];

const tiposDocumento = [
    { value: 'contrato', label: 'Contratos', icon: '📄', count: 1 },
    { value: 'fatura', label: 'Faturas', icon: '🧾', count: 1 },
    { value: 'recibo', label: 'Recibos', icon: '🧾', count: 0 },
    { value: 'orcamento', label: 'Orçamentos', icon: '💰', count: 1 },
    { value: 'relatorio', label: 'Relatórios', icon: '📊', count: 1 },
    { value: 'certificado', label: 'Certificados', icon: '🏆', count: 1 },
    { value: 'outros', label: 'Outros', icon: '📁', count: 0 }
];

export default function DocumentosPage() {
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedTipo, setSelectedTipo] = useState('');
    const [showCreateModal, setShowCreateModal] = useState(false);
    const [loading, setLoading] = useState(false);
    const [documentos] = useState(mockDocumentos);

    const formatFileSize = (bytes: number) => {
        if (bytes === 0) return '0 Bytes';
        const k = 1024;
        const sizes = ['Bytes', 'KB', 'MB', 'GB'];
        const i = Math.floor(Math.log(bytes) / Math.log(k));
        return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
    };

    const formatDate = (date: string) => {
        return new Date(date).toLocaleDateString('pt-PT', {
            day: '2-digit',
            month: 'short',
            year: 'numeric'
        });
    };

    const getFileIcon = (filename: string) => {
        const ext = filename.split('.').pop()?.toLowerCase();
        switch (ext) {
            case 'pdf': return '📄';
            case 'doc':
            case 'docx': return '📝';
            case 'xls':
            case 'xlsx': return '📊';
            default: return '📄';
        }
    };

    const filteredDocumentos = documentos.filter(documento => {
        const matchesSearch = documento.nome.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesTipo = !selectedTipo || documento.tipo === selectedTipo;
        return matchesSearch && matchesTipo;
    });

    const getTotalStats = () => {
        const totalSize = documentos.reduce((acc, doc) => {
            return acc + (doc.arquivo?.[0]?.size || 0);
        }, 0);
        
        return {
            total: documentos.length,
            totalSize: formatFileSize(totalSize),
            filteredCount: filteredDocumentos.length
        };
    };

    const stats = getTotalStats();

    // Filter options para o SearchFilterBar
    const filterOptions = [
        { value: '', label: 'Todos os tipos' },
        ...tiposDocumento.map(tipo => ({
            value: tipo.value,
            label: tipo.label
        }))
    ];

    if (loading) {
        return <Loading title="A carregar documentos..." />;
    }

    return (
        <main className="h-full bg-white rounded-xl shadow-md p-6">
            <div className="max-w-full mx-auto space-y-8">
                
                {/* Header */}
                <PageHeader
                    title="Gestão de Documentos"
                    subtitle="Organize e gerencie todos os seus documentos importantes"
                    icon={FileText}
                    stats={`Total: ${stats.total} documentos • Tamanho: ${stats.totalSize}`}
                    buttonText="Novo Documento"
                    buttonIcon={Plus}
                    onButtonClick={() => setShowCreateModal(true)}
                />

                {/* Estatísticas Cards */}
                <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-5">
                    <StatsCard
                        title="Total de Documentos"
                        value={stats.filteredCount}
                        icon={FileText}
                        iconBg="bg-primary-500"
                        bg="bg-primary-50"
                    />

                    {tiposDocumento.slice(0, 3).map((tipo) => (
                        <StatsCard
                            key={tipo.value}
                            title={tipo.label}
                            value={tipo.count}
                            icon={FileText}
                            iconBg="bg-indigo-500"
                            bg="bg-indigo-50"
                            onClick={() => setSelectedTipo(selectedTipo === tipo.value ? '' : tipo.value)}
                        />
                    ))}
                </section>

                {/* Filtros */}
                <SearchFilterBar
                    searchTerm={searchTerm}
                    onSearchChange={setSearchTerm}
                    searchPlaceholder="Buscar documentos..."
                    filterValue={selectedTipo}
                    onFilterChange={setSelectedTipo}
                    filterOptions={filterOptions}
                    filterLabel="Tipo:"
                    onClear={() => { setSearchTerm(''); setSelectedTipo(''); }}
                />

                {/* Grid de Documentos */}
                <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5">
                    {filteredDocumentos.length === 0 ? (
                        <EmptyState
                            icon={FolderOpen}
                            title="Nenhum documento encontrado"
                            description={
                                searchTerm || selectedTipo
                                    ? 'Tente ajustar os filtros de busca para encontrar seus documentos'
                                    : 'Comece enviando seu primeiro documento para organizar seus arquivos'
                            }
                            buttonText={!searchTerm && !selectedTipo ? "Enviar Primeiro Documento" : undefined}
                            onButtonClick={!searchTerm && !selectedTipo ? () => setShowCreateModal(true) : undefined}
                            showButton={!searchTerm && !selectedTipo}
                        />
                    ) : (
                        filteredDocumentos.map((documento) => (
                            <div key={documento.id} className="bg-white rounded-lg shadow-sm p-6 border border-gray-100 transform transition-all duration-200 hover:scale-[1.02] hover:shadow-md cursor-pointer">
                                
                                {/* Header do Card */}
                                <div className="flex items-start justify-between mb-4">
                                    <div className="flex items-center space-x-3 flex-1 min-w-0">
                                        <div className="p-2.5 bg-primary-50 rounded-lg border border-primary-100">
                                            <FileText className="w-6 h-6 text-primary-600" />
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <h3 className="text-sm font-semibold text-gray-900 truncate leading-tight">
                                                {documento.nome}
                                            </h3>
                                            <p className="text-xs text-gray-500 mt-1">
                                                {formatDate(documento.createdAt)}
                                            </p>
                                        </div>
                                    </div>
                                    
                                    <button className="p-1.5 text-gray-400 hover:text-primary-600 transition-colors rounded-md hover:bg-gray-50">
                                        <Eye className="w-4 h-4" />
                                    </button>
                                </div>

                                {/* Conteúdo do Card */}
                                <div className="space-y-4">
                                    
                                    {/* Tipo do Documento */}
                                    <div className="flex items-center justify-between">
                                        <span className="inline-flex items-center px-2.5 py-1 text-xs font-medium bg-primary-100 text-primary-700 rounded-full">
                                            <span className="mr-1">
                                                {tiposDocumento.find(t => t.value === documento.tipo)?.icon}
                                            </span>
                                            {tiposDocumento.find(t => t.value === documento.tipo)?.label}
                                        </span>
                                    </div>

                                    {/* Arquivo */}
                                    {documento.arquivo && documento.arquivo.length > 0 && (
                                        <div className="space-y-2">
                                            <p className="text-xs font-medium text-gray-700">Arquivo:</p>
                                            {documento.arquivo.map((arquivo, index) => (
                                                <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg border border-gray-100">
                                                    <div className="flex items-center space-x-2 flex-1 min-w-0">
                                                        <span className="text-lg">{getFileIcon(arquivo.name)}</span>
                                                        <div className="flex-1 min-w-0">
                                                            <p className="text-xs font-medium text-gray-900 truncate">
                                                                {arquivo.name}
                                                            </p>
                                                            <p className="text-xs text-gray-500">
                                                                {formatFileSize(arquivo.size)}
                                                            </p>
                                                        </div>
                                                    </div>
                                                    <button className="p-1.5 text-gray-400 hover:text-primary-600 transition-colors rounded-md hover:bg-white">
                                                        <Download className="w-3.5 h-3.5" />
                                                    </button>
                                                </div>
                                            ))}
                                        </div>
                                    )}

                                    {/* Ações */}
                                    <div className="flex space-x-2 pt-2 border-t border-gray-100">
                                        <button className="flex-1 bg-gray-50 text-gray-700 py-2.5 rounded-lg hover:bg-gray-100 font-medium text-sm transition-colors flex items-center justify-center space-x-1">
                                            <Edit className="w-3.5 h-3.5" />
                                            <span>Editar</span>
                                        </button>
                                        <button className="p-2.5 text-red-500 hover:text-red-700 hover:bg-red-50 rounded-lg transition-colors">
                                            <Trash2 className="w-3.5 h-3.5" />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))
                    )}
                </section>

                {/* Modal de Criação */}
                <Modal
                    isOpen={showCreateModal}
                    onClose={() => setShowCreateModal(false)}
                    title="Novo Documento"
                    size="lg"
                >
                    <div className="text-center py-8">
                        <Upload className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                        <h3 className="text-lg font-medium text-gray-900 mb-2">
                            Formulário de Upload
                        </h3>
                        <p className="text-gray-600 mb-6">
                            O formulário completo de upload será implementado em seguida.
                        </p>
                        <div className="flex space-x-3 justify-center">
                            <Button 
                                variant="secondary"
                                onClick={() => setShowCreateModal(false)}
                            >
                                Cancelar
                            </Button>
                            <Button variant="primary">
                                Criar
                            </Button>
                        </div>
                    </div>
                </Modal>

                {/* Footer */}
                <PageFooter systemName="Sistema de Documentos Online" />
            </div>
        </main>
    );
}