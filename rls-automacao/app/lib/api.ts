// lib/api.ts
const API_URL = process.env.NEXT_PUBLIC_STRAPI_URL || 'http://localhost:1337';

export interface User {
  id: number;
  username: string;
  email: string;
  nomecompleto: string;
  cargo?: string;
  nif: string;
  telefone?: string;
  data_admissao?: string;
  salario?: number;
  foto_perfil?: any;
  role: {
    id: number;
    name: string;
    description: string;
    type: string;
  };
}

export interface Despesa {
  id: number;
  descricao: string;
  valor: number;
  data_despesa: string;
  categoria: 'transporte' | 'alimentacao' | 'hospedagem' | 'combustivel' | 'outros';
  status: 'pendente' | 'aprovada' | 'rejeitada';
  observacoes?: string;
  comprovativo?: any;
  users_permissions_user?: User;
  createdAt: string;
  updatedAt: string;
}

export interface Documento {
  id: number;
  nome: string;
  tipo: 'contrato' | 'recibo_vencimento' | 'certificado' | 'outros';
  arquivo: any;
  users_permissions_user?: User;
  createdAt: string;
  updatedAt: string;
}

class ApiService {
  // Headers simples
  private getHeaders() {
    const token = localStorage.getItem('token');
    return {
      'Content-Type': 'application/json',
      ...(token && { Authorization: `Bearer ${token}` })
    };
  }

  // Login
  async login(credentials: { identifier: string; password: string }) {
    const response = await fetch(`${API_URL}/api/auth/local`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(credentials),
    });
    
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error?.message || 'Login falhou');
    }
    return response.json();
  }

  // Usuário atual
  async getCurrentUser(): Promise<User> {
    const response = await fetch(`${API_URL}/api/users/me?populate=role`, {
      headers: this.getHeaders(),
    });
    
    if (!response.ok) throw new Error('Erro ao buscar usuário');
    return response.json();
  }

  // Buscar despesas - SEM FILTRO para pegar TODAS
  async getDespesas() {
    console.log('🔥 Buscando despesas da API...');
    
    const response = await fetch(`${API_URL}/api/despesas?populate=*&sort=createdAt:desc`, {
      headers: this.getHeaders(),
    });
    
    if (!response.ok) {
      console.error('❌ Erro na API:', response.status, response.statusText);
      throw new Error('Erro ao buscar despesas');
    }
    
    const result = await response.json();
    console.log('✅ Despesas encontradas:', result.data?.length || 0);
    console.log('📊 Dados:', result.data);
    
    return result;
  }

  // Buscar documentos - SEM FILTRO para pegar TODOS
  async getDocumentos() {
    console.log('🔥 Buscando documentos da API...');
    
    const response = await fetch(`${API_URL}/api/documentos?populate=*&sort=createdAt:desc`, {
      headers: this.getHeaders(),
    });
    
    if (!response.ok) {
      console.error('❌ Erro na API documentos:', response.status);
      throw new Error('Erro ao buscar documentos');
    }
    
    const result = await response.json();
    console.log('✅ Documentos encontrados:', result.data?.length || 0);
    
    return result;
  }

  // Criar despesa
  async createDespesa(data: any) {
    const response = await fetch(`${API_URL}/api/despesas`, {
      method: 'POST',
      headers: this.getHeaders(),
      body: JSON.stringify({ data }),
    });
    
    if (!response.ok) throw new Error('Erro ao criar despesa');
    return response.json();
  }

  // Atualizar despesa
  async updateDespesa(id: number, data: any) {
    const response = await fetch(`${API_URL}/api/despesas/${id}`, {
      method: 'PUT',
      headers: this.getHeaders(),
      body: JSON.stringify({ data }),
    });
    
    if (!response.ok) throw new Error('Erro ao atualizar despesa');
    return response.json();
  }

  // Aprovar/Rejeitar despesa
  async updateDespesaStatus(id: number, status: 'aprovada' | 'rejeitada', observacoes?: string) {
    return this.updateDespesa(id, { status, observacoes });
  }

  // Upload arquivo
  async uploadFile(file: File) {
    const formData = new FormData();
    formData.append('files', file);
    
    const token = localStorage.getItem('token');
    const response = await fetch(`${API_URL}/api/upload`, {
      method: 'POST',
      headers: { ...(token && { Authorization: `Bearer ${token}` }) },
      body: formData,
    });
    
    if (!response.ok) throw new Error('Erro no upload');
    const result = await response.json();
    return result[0];
  }

  // URL da mídia
  getMediaUrl(media: any): string {
    if (!media?.url) return '';
    return media.url.startsWith('http') ? media.url : `${API_URL}${media.url}`;
  }

  // Stats com filtragem manual no frontend
  async getDashboardStats(currentUser: User): Promise<{
    totalDespesas: number;
    totalDocumentos: number;
    valorTotalDespesas: number;
    despesasPendentes: number;
  }> {
    try {
      console.log('📊 Calculando stats para usuário:', currentUser.nomecompleto, 'Cargo:', currentUser.cargo);
      
      // Sempre buscar TODAS as despesas/documentos
      const [despesasResponse, documentosResponse] = await Promise.all([
        this.getDespesas(),
        this.getDocumentos()
      ]);
      
      let despesas = despesasResponse.data || [];
      let documentos = documentosResponse.data || [];
      
      // Se não for "Gestor", filtrar apenas próprios dados
      const isAdmin = currentUser.cargo === 'Gestor' || currentUser.role?.type === 'administrator';
      
      if (!isAdmin) {
        console.log('🔒 Filtrando dados do usuário:', currentUser.id);
        despesas = despesas.filter((d: Despesa) => 
          d.users_permissions_user?.id === currentUser.id
        );
        documentos = documentos.filter((d: Documento) => 
          d.users_permissions_user?.id === currentUser.id
        );
      } else {
        console.log('👑 Usuário admin - mostrando todos os dados');
      }

      const stats = {
        totalDespesas: despesas.length,
        totalDocumentos: documentos.length,
        valorTotalDespesas: despesas.reduce((sum: number, d: Despesa) => sum + (d.valor || 0), 0),
        despesasPendentes: despesas.filter((d: Despesa) => d.status === 'pendente').length,
      };

      console.log('📈 Stats calculadas:', stats);
      return stats;

    } catch (error) {
      console.error('❌ Erro ao calcular stats:', error);
      return {
        totalDespesas: 0,
        totalDocumentos: 0,
        valorTotalDespesas: 0,
        despesasPendentes: 0,
      };
    }
  }
}

export const api = new ApiService();