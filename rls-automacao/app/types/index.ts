// ===== TIPOS PARA LOGIN =====
export interface User {
  id: number;
  username: string;
  email: string;
  nomecompleto?: string;
  cargo?: string;
  nif?: string;
  telefone?: string;
  data_admissao?: string;
  salario?: number;
  createdAt: string;
  updatedAt: string;
}

export interface LoginCredentials {
  identifier: string; // email ou username
  password: string;
}

export interface LoginResponse {
  jwt: string;
  user: User;
}

export interface ApiError {
  error: {
    status: number;
    name: string;
    message: string;
    details?: any;
  };
}