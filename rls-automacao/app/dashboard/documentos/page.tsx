'use client';

import { useState } from 'react';
import Card, { CardHeader, CardTitle } from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';
import { 
  Plus, 
  Search, 
  FileText,
  Upload,
  Download,
  Edit,
  Trash2,
  Eye,
  Filter,
  ArrowUpRight,
  Loader2,
  FolderOpen
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

  if (loading) {
    return (
      <div className="flex items-center justify-center h-full min-h-[400px]">
        <div className="flex flex-col items-center space-y-4 text-gray-700 p-8 bg-white rounded-xl shadow-lg max-w-sm w-full">
          <Loader2 className="w-16 h-16 animate-spin text-primary-500" />
          <p className="text-2xl font-bold text-gray-800 text-center">A carregar documentos...</p>
          <p className="text-base text-gray-600 text-center leading-normal">Aguarde um momento enquanto preparamos os seus arquivos.</p>
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
              <FileText className="w-8 h-8 text-primary-600" />
              <span>Gestão de <span className="text-primary-600">Documentos</span></span>
            </h1>
            <p className="mt-2 text-base text-gray-600">
              Organize e gerencie todos os seus documentos importantes
            </p>
            <p className="mt-1 text-sm text-gray-500">
              Total: <span className="font-semibold text-gray-700">{stats.total} documentos</span> • 
              Tamanho: <span className="font-semibold text-gray-700">{stats.totalSize}</span>
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center space-y-3 sm:space-y-0 sm:space-x-4 mt-4 md:mt-0">
            <button 
              onClick={() => setShowCreateModal(true)}
              className="w-full sm:w-auto bg-primary-500 text-white px-6 py-2.5 rounded-lg shadow-md hover:bg-primary-600 transition-all flex items-center justify-center text-base font-medium"
            >
              <Plus className="w-5 h-5 mr-1.5" />
              Novo Documento
            </button>
          </div>
        </section>

        {/* Estatísticas Cards */}
        <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-5">
          <div className="bg-white rounded-lg shadow-sm p-5 border border-primary-100 transform transition-transform duration-200 hover:scale-[1.01] hover:shadow-md cursor-pointer">
            <div className="flex items-center justify-between mb-3">
              <p className="text-sm font-medium text-gray-500">Total de Documentos</p>
              <div className="p-2 rounded-full text-primary-600 bg-primary-50">
                <FileText className="w-6 h-6" />
              </div>
            </div>
            <p className="text-3xl font-bold text-gray-900">{stats.filteredCount}</p>
          </div>

          {tiposDocumento.slice(0, 3).map((tipo) => (
            <div
              key={tipo.value}
              className="bg-white rounded-lg shadow-sm p-5 border border-gray-100 transform transition-transform duration-200 hover:scale-[1.01] hover:shadow-md cursor-pointer"
              onClick={() => setSelectedTipo(selectedTipo === tipo.value ? '' : tipo.value)}
            >
              <div className="flex items-center justify-between mb-3">
                <p className="text-sm font-medium text-gray-500">{tipo.label}</p>
                <div className="p-2 rounded-full text-indigo-600 bg-indigo-50">
                  <span className="text-xl">{tipo.icon}</span>
                </div>
              </div>
              <p className="text-3xl font-bold text-indigo-600">{tipo.count}</p>
            </div>
          ))}
        </section>

        {/* Filtros */}
        <section className="bg-white rounded-lg shadow-sm p-6 border border-gray-100">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
            
            {/* Busca */}
            <div className="relative flex-1 max-w-md">
              <Search className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
              <input
                type="text"
                placeholder="Buscar documentos..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent w-full text-sm"
              />
            </div>

            {/* Filtros */}
            <div className="flex flex-col sm:flex-row items-center space-y-3 sm:space-y-0 sm:space-x-4">
              <div className="flex items-center space-x-2">
                <Filter className="w-5 h-5 text-gray-600" />
                <span className="text-sm font-medium text-gray-600">Tipo:</span>
              </div>
              <select
                value={selectedTipo}
                onChange={(e) => setSelectedTipo(e.target.value)}
                className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-primary-500 focus:border-transparent text-sm min-w-[150px]"
              >
                <option value="">Todos os tipos</option>
                {tiposDocumento.map(tipo => (
                  <option key={tipo.value} value={tipo.value}>
                    {tipo.label}
                  </option>
                ))}
              </select>
              
              <button
                onClick={() => { setSearchTerm(''); setSelectedTipo(''); }}
                className="bg-gray-100 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-200 font-medium text-sm transition-colors"
              >
                Limpar
              </button>
            </div>
          </div>
        </section>

        {/* Grid de Documentos */}
        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5">
          {filteredDocumentos.map((documento) => (
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
          ))}
        </section>

        {/* Empty State */}
        {filteredDocumentos.length === 0 && (
          <section className="bg-white rounded-lg shadow-sm p-12 text-center border border-gray-100">
            <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <FolderOpen className="w-10 h-10 text-gray-400" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-3">
              Nenhum documento encontrado
            </h3>
            <p className="text-lg text-gray-600 mb-8 max-w-md mx-auto leading-relaxed">
              {searchTerm || selectedTipo
                ? 'Tente ajustar os filtros de busca para encontrar seus documentos'
                : 'Comece enviando seu primeiro documento para organizar seus arquivos'
              }
            </p>
            {!searchTerm && !selectedTipo && (
              <button
                onClick={() => setShowCreateModal(true)}
                className="bg-primary-600 text-white px-8 py-3 rounded-lg shadow hover:bg-primary-700 font-semibold flex items-center justify-center mx-auto space-x-2 transition-all"
              >
                <Upload className="w-5 h-5" />
                <span>Enviar Primeiro Documento</span>
              </button>
            )}
          </section>
        )}

        {/* Modal de Criação */}
        {showCreateModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-xl shadow-xl max-w-2xl w-full max-h-screen overflow-y-auto">
              <div className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-bold text-gray-900">Novo Documento</h2>
                  <button
                    onClick={() => setShowCreateModal(false)}
                    className="text-gray-400 hover:text-gray-600 p-1"
                  >
                    ✕
                  </button>
                </div>

                <div className="text-center py-8">
                  <Upload className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">
                    Formulário de Upload
                  </h3>
                  <p className="text-gray-600 mb-6">
                    O formulário completo de upload será implementado em seguida.
                  </p>
                  <div className="flex space-x-3 justify-center">
                    <button 
                      onClick={() => setShowCreateModal(false)}
                      className="bg-gray-100 text-gray-700 px-6 py-3 rounded-lg hover:bg-gray-200 font-medium transition-colors"
                    >
                      Cancelar
                    </button>
                    <button className="bg-primary-600 text-white px-6 py-3 rounded-lg hover:bg-primary-700 font-medium transition-colors">
                      Criar
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Footer */}
        <footer className="text-center pt-8 border-t border-gray-100 mt-12">
          <p className="text-xs text-gray-500 flex flex-col sm:flex-row items-center justify-center space-y-1.5 sm:space-y-0 sm:space-x-3">
            <span className="inline-flex items-center px-3 py-1.5 bg-green-50 rounded-full text-green-700 font-medium text-xs shadow-inner">
              <span className="w-2.5 h-2.5 bg-green-500 rounded-full mr-1.5 animate-pulse"></span>
              Sistema de Documentos Online
            </span>
            <span className="text-gray-300 hidden sm:block text-base">|</span>
            <span className="inline-flex items-center text-gray-400 text-xs">
              Última sincronização: {new Date().toLocaleDateString('pt-PT', { day: '2-digit', month: 'short', year: 'numeric' })}
            </span>
          </p>
        </footer>
      </div>
    </main>
  );
}