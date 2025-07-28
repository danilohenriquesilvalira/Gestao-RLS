// types/index.ts - Tipos corrigidos e completos

// 🔥 Nova interface para a estrutura de mídia (arquivos) do Strapi
export interface Media {
  id: number;
  name: string;
  alternativeText: string | null;
  caption: string | null;
  width: number | null;
  height: number | null;
  formats: {
    thumbnail?: { url: string; };
    small?: { url: string; };
    medium?: { url: string; };
    large?: { url: string; };
  };
  hash: string;
  ext: string;
  mime: string;
  size: number;
  url: string; // Esta é a URL relativa que api.getMediaUrl usará
  previewUrl: string | null;
  provider: string;
  provider_metadata: any | null;
  createdAt: string;
  updatedAt: string;
}

export interface User {
  id: number;
  username: string;
  email: string;
  nomecompleto: string;
  cargo: string;
  nif?: string;
  telefone?: string;
  data_admissao?: string;
  salario?: number;
  confirmed: boolean;
  blocked: boolean;
  role?: {
    id: number;
    name: string;
    type: string;
  };
  createdAt: string;
  updatedAt: string;
  avatar?: Media; // 🔥 Adicione esta linha: 'avatar' agora é do tipo 'Media' e é opcional
}

export interface Despesa {
  id: number;
  descricao: string; // Garantir que não é null/undefined
  valor: number;
  data_despesa: string;
  categoria: 'transporte' | 'alimentacao' | 'hospedagem' | 'combustivel' | 'outros';
  status: 'pendente' | 'aprovada' | 'rejeitada';
  observacoes?: string;
  comprovativo?: {
    id: number;
    name: string;
    url: string;
    mime: string;
    size: number;
  };
  users_permissions_user?: User;
  publishedAt?: string;
  createdAt: string;
  updatedAt: string;
}

export interface Documento {
  id: number;
  nome: string; // Garantir que não é null/undefined
  tipo: 'contrato' | 'recibo_vencimento' | 'certificado' | 'outros';
  arquivo: {
    id: number;
    name: string;
    url: string;
    mime: string;
    size: number;
  };
  users_permissions_user?: User;
  publishedAt?: string;
  createdAt: string;
  updatedAt: string;
}

export interface DashboardStats {
  totalDespesas: number;
  totalDocumentos: number;
  valorTotalDespesas: number;
  despesasPendentes: number;
}

export interface ApiResponse<T> {
  data: T[];
  meta: {
    pagination?: {
      page: number;
      pageSize: number;
      pageCount: number;
      total: number;
    };
  };
}

export interface LoginResponse {
  jwt: string;
  user: User;
}

export interface UploadResponse {
  id: number;
  name: string;
  alternativeText?: string;
  caption?: string;
  width?: number;
  height?: number;
  formats?: any;
  hash: string;
  ext: string;
  mime: string;
  size: number;
  url: string;
  previewUrl?: string;
  provider: string;
  provider_metadata?: any;
  createdAt: string;
  updatedAt: string;
}

// Tipos para formulários
export interface CreateDespesaData {
  descricao: string;
  valor: number;
  data_despesa: string;
  categoria: 'transporte' | 'alimentacao' | 'hospedagem' | 'combustivel' | 'outros';
  observacoes?: string;
  status?: 'pendente' | 'aprovada' | 'rejeitada';
  users_permissions_user?: number;
  comprovativo?: number;
}

export interface CreateDocumentoData {
  nome: string;
  tipo: 'contrato' | 'recibo_vencimento' | 'certificado' | 'outros';
  arquivo: number;
  users_permissions_user?: number;
}

// Tipos para notificações
export interface Notification {
  id: string;
  tipo: 'despesa_pendente' | 'despesa_aprovada' | 'despesa_rejeitada';
  titulo: string;
  descricao: string;
  data: string;
  despesa?: Despesa;
  lida: boolean;
}

// Tipos para filtros
export type StatusDespesa = 'todas' | 'pendente' | 'aprovada' | 'rejeitada';
export type StatusDocumento = 'todos' | 'contrato' | 'recibo_vencimento' | 'certificado' | 'outros';

// Utilitários de tipo
export type Optional<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>;
export type RequiredBy<T, K extends keyof T> = T & Required<Pick<T, K>>;