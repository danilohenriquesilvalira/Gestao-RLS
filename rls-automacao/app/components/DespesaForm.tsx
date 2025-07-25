// components/DespesaForm.tsx
import { useState } from 'react';
import { api } from '@/lib/api';

interface Props {
  onSuccess: () => void;
  onCancel: () => void;
}

type Categoria = 'transporte' | 'alimentacao' | 'hospedagem' | 'combustivel' | 'outros';

export default function DespesaForm({ onSuccess, onCancel }: Props) {
  const [data, setData] = useState({
    descricao: '',
    valor: '',
    categoria: 'outros' as Categoria,
    data_despesa: '',
    observacoes: ''
  });
  
  const [uploading, setUploading] = useState(false);
  const [fileId, setFileId] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 5 * 1024 * 1024) {
      setError('Arquivo muito grande (máx 5MB)');
      return;
    }

    try {
      setUploading(true);
      const uploaded = await api.uploadFile(file);
      setFileId(uploaded.id);
      setError('');
    } catch (err: any) {
      setError(err.message);
    } finally {
      setUploading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!data.descricao || !data.valor) {
      setError('Preencha descrição e valor');
      return;
    }

    try {
      setLoading(true);
      await api.createDespesa({
        descricao: data.descricao,
        valor: parseFloat(data.valor),
        categoria: data.categoria,
        data_despesa: data.data_despesa,
        observacoes: data.observacoes,
        comprovativo: fileId || undefined,
        status: 'pendente'
      });
      
      onSuccess();
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {error && (
        <div className="bg-red-50 text-red-700 p-4 rounded-lg border border-red-200">
          {error}
        </div>
      )}

      {/* Descrição */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Descrição *
        </label>
        <input
          type="text"
          value={data.descricao}
          onChange={(e) => setData(prev => ({ ...prev, descricao: e.target.value }))}
          className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-green-500 focus:border-transparent"
          placeholder="Ex: Combustível viagem"
        />
      </div>

      {/* Valor e Data */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Valor (€) *
          </label>
          <input
            type="number"
            step="0.01"
            value={data.valor}
            onChange={(e) => setData(prev => ({ ...prev, valor: e.target.value }))}
            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-green-500 focus:border-transparent"
            placeholder="0.00"
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Data da Despesa
          </label>
          <input
            type="date"
            value={data.data_despesa}
            onChange={(e) => setData(prev => ({ ...prev, data_despesa: e.target.value }))}
            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-green-500 focus:border-transparent"
          />
        </div>
      </div>

      {/* Categoria */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Categoria
        </label>
        <select
          value={data.categoria}
          onChange={(e) => setData(prev => ({ ...prev, categoria: e.target.value as Categoria }))}
          className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-green-500 focus:border-transparent"
        >
          <option value="transporte">Transporte</option>
          <option value="alimentacao">Alimentação</option>
          <option value="hospedagem">Hospedagem</option>
          <option value="combustivel">Combustível</option>
          <option value="outros">Outros</option>
        </select>
      </div>

      {/* Upload */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Comprovativo
        </label>
        <input
          type="file"
          onChange={handleFileUpload}
          accept="image/*,.pdf"
          className="w-full border border-gray-300 rounded-lg px-3 py-2 file:mr-4 file:py-1 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-medium file:bg-green-50 file:text-green-700 hover:file:bg-green-100"
          disabled={uploading}
        />
        {uploading && (
          <p className="text-sm text-blue-600 mt-2">Enviando arquivo...</p>
        )}
        {fileId && (
          <p className="text-sm text-green-600 mt-2">✓ Arquivo enviado com sucesso</p>
        )}
      </div>

      {/* Observações */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Observações
        </label>
        <textarea
          value={data.observacoes}
          onChange={(e) => setData(prev => ({ ...prev, observacoes: e.target.value }))}
          rows={3}
          className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-green-500 focus:border-transparent"
          placeholder="Informações adicionais..."
        />
      </div>

      {/* Botões */}
      <div className="flex flex-col sm:flex-row gap-3">
        <button 
          type="submit" 
          disabled={loading}
          className="flex-1 bg-green-600 text-white py-3 px-4 rounded-lg hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed font-medium"
        >
          {loading ? 'Criando...' : 'Criar Despesa'}
        </button>
        <button 
          type="button" 
          onClick={onCancel}
          className="flex-1 bg-gray-500 text-white py-3 px-4 rounded-lg hover:bg-gray-600 font-medium"
        >
          Cancelar
        </button>
      </div>
    </form>
  );
}