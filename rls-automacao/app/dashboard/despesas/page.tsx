'use client';

import { useState } from 'react';
import Card, { CardHeader, CardTitle } from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';
import { 
  Plus, 
  Search, 
  Receipt,
  Edit,
  Trash2,
  Eye
} from 'lucide-react';

// Mock data - depois conectamos API
const mockDespesas = [
  {
    id: 1,
    descricao: 'Combustível da viatura',
    valor: 45.50,
    data_despesa: '2024-01-15',
    categoria: 'combustivel',
    status: 'aprovada'
  },
  {
    id: 2,
    descricao: 'Almoço de trabalho',
    valor: 18.30,
    data_despesa: '2024-01-14',
    categoria: 'alimentacao',
    status: 'pendente'
  },
  {
    id: 3,
    descricao: 'Material de escritório',
    valor: 85.20,
    data_despesa: '2024-01-13',
    categoria: 'material',
    status: 'aprovada'
  }
];

const categorias = [
  { value: 'alimentacao', label: 'Alimentação' },
  { value: 'transporte', label: 'Transporte' },
  { value: 'material', label: 'Material' },
  { value: 'combustivel', label: 'Combustível' },
  { value: 'manutencao', label: 'Manutenção' },
  { value: 'outros', label: 'Outros' }
];

const statusOptions = [
  { value: 'pendente', label: 'Pendente', color: 'bg-yellow-100 text-yellow-700' },
  { value: 'aprovada', label: 'Aprovada', color: 'bg-green-100 text-green-700' },
  { value: 'rejeitada', label: 'Rejeitada', color: 'bg-red-100 text-red-700' },
  { value: 'paga', label: 'Paga', color: 'bg-blue-100 text-blue-700' }
];

export default function DespesasPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [despesas] = useState(mockDespesas);

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-PT', {
      style: 'currency',
      currency: 'EUR',
    }).format(value);
  };

  const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString('pt-PT');
  };

  const filteredDespesas = despesas.filter(despesa => {
    const matchesSearch = despesa.descricao.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = !selectedCategory || despesa.categoria === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const totalValue = filteredDespesas.reduce((sum, despesa) => sum + despesa.valor, 0);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Despesas</h1>
          <p className="text-gray-600">Gerencie suas despesas e comprovantes</p>
        </div>
        
        <Button onClick={() => setShowCreateModal(true)} variant="primary">
          <Plus className="w-4 h-4 mr-2" />
          Nova Despesa
        </Button>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <div className="p-6 text-center">
            <p className="text-2xl font-bold text-gray-900">{filteredDespesas.length}</p>
            <p className="text-sm text-gray-600">Total de Despesas</p>
          </div>
        </Card>
        
        <Card>
          <div className="p-6 text-center">
            <p className="text-2xl font-bold text-green-600">{formatCurrency(totalValue)}</p>
            <p className="text-sm text-gray-600">Valor Total</p>
          </div>
        </Card>
        
        <Card>
          <div className="p-6 text-center">
            <p className="text-2xl font-bold text-yellow-600">
              {filteredDespesas.filter(d => d.status === 'pendente').length}
            </p>
            <p className="text-sm text-gray-600">Pendentes</p>
          </div>
        </Card>
      </div>

      {/* Filters */}
      <Card>
        <div className="p-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <Input
                placeholder="Buscar despesas..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                leftIcon={<Search />}
              />
            </div>
            
            <div className="flex gap-2">
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="input-field min-w-[150px]"
              >
                <option value="">Todas as categorias</option>
                {categorias.map(cat => (
                  <option key={cat.value} value={cat.value}>
                    {cat.label}
                  </option>
                ))}
              </select>
              
              <Button
                variant="secondary"
                onClick={() => {
                  setSearchTerm('');
                  setSelectedCategory('');
                }}
              >
                Limpar
              </Button>
            </div>
          </div>
        </div>
      </Card>

      {/* Despesas List */}
      <Card>
        <CardHeader>
          <CardTitle>Lista de Despesas</CardTitle>
        </CardHeader>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left py-3 px-4 font-medium text-gray-700">Descrição</th>
                <th className="text-left py-3 px-4 font-medium text-gray-700">Valor</th>
                <th className="text-left py-3 px-4 font-medium text-gray-700">Data</th>
                <th className="text-left py-3 px-4 font-medium text-gray-700">Categoria</th>
                <th className="text-left py-3 px-4 font-medium text-gray-700">Status</th>
                <th className="text-left py-3 px-4 font-medium text-gray-700">Ações</th>
              </tr>
            </thead>
            <tbody>
              {filteredDespesas.map((despesa) => (
                <tr key={despesa.id} className="border-b border-gray-100 hover:bg-gray-50">
                  <td className="py-3 px-4">
                    <p className="font-medium text-gray-900">{despesa.descricao}</p>
                  </td>
                  <td className="py-3 px-4 font-semibold text-gray-900">
                    {formatCurrency(despesa.valor)}
                  </td>
                  <td className="py-3 px-4 text-gray-600">
                    {formatDate(despesa.data_despesa)}
                  </td>
                  <td className="py-3 px-4">
                    <span className="px-2 py-1 text-xs bg-green-100 text-green-700 rounded">
                      {categorias.find(c => c.value === despesa.categoria)?.label}
                    </span>
                  </td>
                  <td className="py-3 px-4">
                    <span className={`px-2 py-1 text-xs rounded ${
                      statusOptions.find(s => s.value === despesa.status)?.color
                    }`}>
                      {statusOptions.find(s => s.value === despesa.status)?.label}
                    </span>
                  </td>
                  <td className="py-3 px-4">
                    <div className="flex items-center space-x-2">
                      <Button variant="ghost" size="sm">
                        <Eye className="w-4 h-4" />
                      </Button>
                      <Button variant="ghost" size="sm">
                        <Edit className="w-4 h-4" />
                      </Button>
                      <Button variant="ghost" size="sm">
                        <Trash2 className="w-4 h-4 text-red-500" />
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      {/* Create Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
            <h3 className="text-lg font-medium mb-4">Nova Despesa</h3>
            <p className="text-gray-600 mb-4">
              Formulário de criação será implementado em seguida.
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