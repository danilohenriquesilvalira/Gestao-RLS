import axios, { AxiosInstance } from 'axios';
import { LoginCredentials, LoginResponse, User } from '@/types';

class ApiClient {
  private client: AxiosInstance;
  private baseURL: string;

  constructor() {
    this.baseURL = process.env.NEXT_PUBLIC_STRAPI_API_URL || 'http://localhost:1337';
    
    this.client = axios.create({
      baseURL: `${this.baseURL}/api`,
      timeout: 10000,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }

  // ===== LOGIN =====
  async login(credentials: LoginCredentials): Promise<LoginResponse> {
    try {
      const response = await this.client.post('/auth/local', credentials);
      return response.data;
    } catch (error: any) {
      if (error.response?.data?.error) {
        throw new Error(error.response.data.error.message || 'Erro ao fazer login');
      }
      throw new Error('Erro de conexão com o servidor');
    }
  }

  // ===== GET USER =====
  async getCurrentUser(token: string): Promise<User> {
    try {
      const response = await this.client.get('/users/me?populate=*', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    } catch (error: any) {
      if (error.response?.status === 401) {
        throw new Error('Token inválido');
      }
      throw new Error('Erro ao buscar dados do usuário');
    }
  }
}

export const api = new ApiClient();
export default api;