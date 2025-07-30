// lib/compartilhamentoApi.ts - API CORRIGIDA

const getAPIUrl = () => {
  if (typeof window !== 'undefined') {
    const hostname = window.location.hostname;
    if (hostname.startsWith('100.')) {
      return `http://${hostname}:1337`;
    }
    if (hostname === 'localhost' || hostname === '127.0.0.1') {
      return 'http://localhost:1337';
    }
  }
  return process.env.NEXT_PUBLIC_STRAPI_URL || 'http://localhost:1337';
};

const API_URL = getAPIUrl();

export interface ArquivoCompartilhado {
    id: number;
    nome: string;
    tipo: string;
    tamanho: number;
    descricao?: string;
    categoria: 'projeto' | 'backup' | 'documento' | 'imagem' | 'outro';
    publico: boolean;
    downloads: number;
    arquivo: {
        id: number;
        url: string;
        name: string;
        size: number;
        mime: string;
    };
    usuario: {
        id: number;
        nomecompleto: string;
        email: string;
    };
    createdAt: string;
    updatedAt: string;
}

export interface UploadData {
    nome: string;
    descricao?: string;
    categoria: string;
    publico: boolean;
}

class CompartilhamentoAPI {
    private getToken(): string | null {
        try {
            return localStorage.getItem('token');
        } catch {
            return null;
        }
    }

    private getHeaders() {
        const token = this.getToken();
        return {
            'Content-Type': 'application/json',
            ...(token && { Authorization: `Bearer ${token}` })
        };
    }

    private normalizeArquivo(item: any): ArquivoCompartilhado {
        const attrs = item.attributes || {};
        const usuarioData = attrs.users_permissions_user?.data?.attributes;
        const arquivoData = attrs.arquivo?.data?.attributes;

        return {
            id: item.id,
            nome: attrs.nome || '',
            tipo: attrs.tipo || '',
            tamanho: attrs.tamanho || 0,
            descricao: attrs.descricao || '',
            categoria: attrs.categoria || 'outro',
            publico: attrs.publico !== false,
            downloads: attrs.downloads || 0,
            arquivo: arquivoData ? {
                id: attrs.arquivo?.data?.id || 0,
                url: arquivoData.url || '',
                name: arquivoData.name || '',
                size: arquivoData.size || 0,
                mime: arquivoData.mime || ''
            } : {
                id: 0, url: '', name: '', size: 0, mime: ''
            },
            usuario: usuarioData ? {
                id: attrs.users_permissions_user?.data?.id || 0,
                nomecompleto: usuarioData.nomecompleto || '',
                email: usuarioData.email || ''
            } : {
                id: 0, nomecompleto: '', email: ''
            },
            createdAt: attrs.createdAt || '',
            updatedAt: attrs.updatedAt || ''
        };
    }

    async buscarArquivos(): Promise<ArquivoCompartilhado[]> {
        const url = `${API_URL}/api/arquivo-compartilhados?populate[users_permissions_user]=*&populate[arquivo]=*&sort=createdAt:desc`;

        const response = await fetch(url, {
            headers: this.getHeaders()
        });

        if (!response.ok) {
            throw new Error('Erro ao buscar arquivos');
        }

        const result = await response.json();
        return (result.data || []).map((item: any) => this.normalizeArquivo(item));
    }

    async uploadArquivo(file: File, data: UploadData): Promise<ArquivoCompartilhado> {
        // 1. Upload arquivo
        const formData = new FormData();
        formData.append('files', file);

        const uploadResponse = await fetch(`${API_URL}/api/upload`, {
            method: 'POST',
            headers: {
                Authorization: `Bearer ${this.getToken()}`
            },
            body: formData
        });

        if (!uploadResponse.ok) {
            throw new Error('Erro no upload');
        }

        const uploadResult = await uploadResponse.json();
        const uploadedFile = uploadResult[0];

        // 2. Criar registro
        const userId = this.getCurrentUserId();
        const payload = {
            data: {
                nome: data.nome,
                tipo: file.type,
                tamanho: file.size,
                descricao: data.descricao || '',
                categoria: data.categoria,
                publico: data.publico,
                downloads: 0,
                arquivo: uploadedFile.id,
                users_permissions_user: userId
            }
        };

        const response = await fetch(`${API_URL}/api/arquivo-compartilhados`, {
            method: 'POST',
            headers: this.getHeaders(),
            body: JSON.stringify(payload)
        });

        if (!response.ok) {
            throw new Error('Erro ao salvar arquivo');
        }

        const result = await response.json();
        return this.normalizeArquivo(result.data);
    }

    async downloadArquivo(id: number): Promise<void> {
        // Buscar arquivo
        const arquivo = await this.buscarArquivoPorId(id);
        
        // Incrementar downloads
        await fetch(`${API_URL}/api/arquivo-compartilhados/${id}`, {
            method: 'PUT',
            headers: this.getHeaders(),
            body: JSON.stringify({
                data: { downloads: arquivo.downloads + 1 }
            })
        });

        // Download
        const url = arquivo.arquivo.url.startsWith('http') ? arquivo.arquivo.url : `${API_URL}${arquivo.arquivo.url}`;
        const link = document.createElement('a');
        link.href = url;
        link.download = arquivo.arquivo.name;
        link.click();
    }

    async buscarArquivoPorId(id: number): Promise<ArquivoCompartilhado> {
        const url = `${API_URL}/api/arquivo-compartilhados/${id}?populate[users_permissions_user]=*&populate[arquivo]=*`;
        
        const response = await fetch(url, {
            headers: this.getHeaders()
        });

        if (!response.ok) {
            throw new Error('Erro ao buscar arquivo');
        }

        const result = await response.json();
        return this.normalizeArquivo(result.data);
    }

    async deletarArquivo(id: number): Promise<void> {
        const response = await fetch(`${API_URL}/api/arquivo-compartilhados/${id}`, {
            method: 'DELETE',
            headers: this.getHeaders()
        });

        if (!response.ok) {
            throw new Error('Erro ao deletar arquivo');
        }
    }

    async alterarVisibilidade(id: number, publico: boolean): Promise<void> {
        const response = await fetch(`${API_URL}/api/arquivo-compartilhados/${id}`, {
            method: 'PUT',
            headers: this.getHeaders(),
            body: JSON.stringify({
                data: { publico }
            })
        });

        if (!response.ok) {
            throw new Error('Erro ao alterar visibilidade');
        }
    }

    private getCurrentUserId(): number {
        try {
            const userData = localStorage.getItem('user');
            if (userData) {
                const user = JSON.parse(userData);
                return user.id;
            }
        } catch {
            // ignore
        }
        return 0;
    }
}

export const compartilhamentoAPI = new CompartilhamentoAPI();