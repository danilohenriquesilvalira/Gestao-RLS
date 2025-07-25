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
  Eye
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
  }
];

const tiposDocumento = [
  { value: 'contrato', label: 'Contrato' },
  { value: 'fatura', label: 'Fatura' },
  { value: 'recibo', label: 'Recibo' },
  { value: 'orcamento', label: 'Orçamento' },
  { value: 'relatorio', label: 'Relatório' },
  { value: 'certificado', label: 'Certificado' },
  { value: 'outros', label: 'Outros' }
];

export default function DocumentosPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTipo, setSelectedTipo] = useState('');
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [documentos] = useState(mockDocumentos);

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString('pt-PT');
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

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Documentos</h1>
          <p className="text-gray-600">Gerencie seus documentos e arquivos</p>
        </div>
        
        <Button onClick={() => setShowCreateModal(true)} variant="primary">
          <Plus className="w-4 h-4 mr-2" />
          Novo Documento
        </Button>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <div className="p-6 text-center">
            <p className="text-2xl font-bold text-gray-900">{filteredDocumentos.length}</p>
            <p className="text-sm text-gray-600">Total de Documentos</p>
          </div>
        </Card>
        
        {tiposDocumento.slice(0, 3).map(tipo => (
          <Card key={tipo.value}>
            <div className="p-6 text-center">
              <p className="text-2xl font-bold text-purple-600">
                {filteredDocumentos.filter(d => d.tipo === tipo.value).length}
              </p>
              <p className="text-sm text-gray-600">{tipo.label}</p>
            </div>
          </Card>
        ))}
      </div>

      {/* Filters */}
      <Card>
        <div className="p-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <Input
                placeholder="Buscar documentos..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                leftIcon={<Search />}
              />
            </div>
            
            <div className="flex gap-2">
              <select
                value={selectedTipo}
                onChange={(e) => setSelectedTipo(e.target.value)}
                className="input-field min-w-[150px]"
              >
                <option value="">Todos os tipos</option>
                {tiposDocumento.map(tipo => (
                  <option key={tipo.value} value={tipo.value}>
                    {tipo.label}
                  </option>
                ))}
              </select>
              
              <Button
                variant="secondary"
                onClick={() => {
                  setSearchTerm('');
                  setSelectedTipo('');
                }}
              >
                Limpar
              </Button>
            </div>
          </div>
        </div>
      </Card>

      {/* Documentos Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredDocumentos.map((documento) => (
          <Card key={documento.id} hover>
            <div className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <div className="p-2 bg-purple-100 rounded-lg">
                    <FileText className="w-6 h-6 text-purple-600" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="text-sm font-medium text-gray-900 truncate">
                      {documento.nome}
                    </h3>
                    <p className="text-xs text-gray-500">
                      {formatDate(documento.createdAt)}
                    </p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-1">
                  <Button variant="ghost" size="sm">
                    <Eye className="w-4 h-4" />
                  </Button>
                </div>
              </div>

              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="px-2 py-1 text-xs bg-purple-100 text-purple-700 rounded">
                    {tiposDocumento.find(t => t.value === documento.tipo)?.label}
                  </span>
                </div>

                {documento.arquivo && documento.arquivo.length > 0 && (
                  <div className="space-y-2">
                    <p className="text-xs font-medium text-gray-700">Arquivos:</p>
                    {documento.arquivo.map((arquivo, index) => (
                      <div key={index} className="flex items-center justify-between p-2 bg-gray-50 rounded">
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
                        <Button variant="ghost" size="sm">
                          <Download className="w-3 h-3" />
                        </Button>
                      </div>
                    ))}
                  </div>
                )}

                <div className="flex space-x-2 pt-2">
                  <Button variant="secondary" size="sm" className="flex-1">
                    <Edit className="w-3 h-3 mr-1" />
                    Editar
                  </Button>
                  <Button variant="ghost" size="sm">
                    <Trash2 className="w-3 h-3 text-red-500" />
                  </Button>
                </div>
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* Empty State */}
      {filteredDocumentos.length === 0 && (
        <Card>
          <div className="text-center py-12">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Upload className="w-8 h-8 text-gray-400" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              Nenhum documento encontrado
            </h3>
            <p className="text-gray-600 mb-4">
              {searchTerm || selectedTipo
                ? 'Tente ajustar os filtros de busca'
                : 'Comece enviando seu primeiro documento'
              }
            </p>
            <Button variant="primary" onClick={() => setShowCreateModal(true)}>
              <Upload className="w-4 h-4 mr-2" />
              Enviar Documento
            </Button>
          </div>
        </Card>
      )}

      {/* Create Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
            <h3 className="text-lg font-medium mb-4">Novo Documento</h3>
            <p className="text-gray-600 mb-4">
              Formulário de upload será implementado em seguida.
            </p>
            <div className="flex space-x-3">
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
        </div>
      )}
    </div>
  );
}