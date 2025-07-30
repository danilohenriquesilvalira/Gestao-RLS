// app/lib/compartilhamentoApi.ts - ATUALIZADO COM TAILSCALE
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
    pasta?: {
        id: number;
        nome: string;
        cor?: string;
        icone?: string;
    };
    tags?: string;
    versao?: string;
    arquivo_original?: {
        id: number;
        nome: string;
        versao?: string;
    };
    aprovado: boolean;
    aprovado_por?: {
        id: number;
        nomecompleto: string;
    };
    data_aprovacao?: string;
    favorito: boolean;
    visualizacoes: number;
    ultimo_acesso?: string;
    createdAt: string;
    updatedAt: string;
}

export interface UploadData {
    nome: string;
    descricao?: string;
    categoria: string;
    publico: boolean;
    pasta?: number;
    tags?: string;
    versao?: string;
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
            pasta: attrs.pasta?.data ? {
                id: attrs.pasta.data.id,
                nome: attrs.pasta.data.attributes.nome,
                cor: attrs.pasta.data.attributes.cor,
                icone: attrs.pasta.data.attributes.icone
            } : undefined,
            tags: attrs.tags || '',
            versao: attrs.versao || '1.0',
            arquivo_original: attrs.arquivo_original?.data ? {
                id: attrs.arquivo_original.data.id,
                nome: attrs.arquivo_original.data.attributes.nome,
                versao: attrs.arquivo_original.data.attributes.versao
            } : undefined,
            aprovado: attrs.aprovado || false,
            aprovado_por: attrs.aprovado_por?.data ? {
                id: attrs.aprovado_por.data.id,
                nomecompleto: attrs.aprovado_por.data.attributes.nomecompleto
            } : undefined,
            data_aprovacao: attrs.data_aprovacao || '',
            favorito: attrs.favorito || false,
            visualizacoes: attrs.visualizacoes || 0,
            ultimo_acesso: attrs.ultimo_acesso || '',
            createdAt: attrs.createdAt || '',
            updatedAt: attrs.updatedAt || ''
        };
    }

    async buscarArquivos(pastaId?: number): Promise<ArquivoCompartilhado[]> {
        let url = `${API_URL}/api/arquivo-compartilhados?populate[users_permissions_user]=*&populate[arquivo]=*&populate[pasta]=*&populate[arquivo_original]=*&populate[aprovado_por]=*&sort=createdAt:desc`;
        
        if (pastaId) {
            url += `&filters[pasta][id][$eq]=${pastaId}`;
        } else if (pastaId === null) {
            url += `&filters[pasta][$null]=true`;
        }

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
                users_permissions_user: userId,
                pasta: data.pasta || null,
                tags: data.tags || '',
                versao: data.versao || '1.0',
                aprovado: false,
                favorito: false,
                visualizacoes: 0
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

    async downloadArquivo(arquivo: ArquivoCompartilhado): Promise<void> {
        // Incrementar downloads
        await fetch(`${API_URL}/api/arquivo-compartilhados/${arquivo.id}`, {
            method: 'PUT',
            headers: this.getHeaders(),
            body: JSON.stringify({
                data: { 
                    downloads: arquivo.downloads + 1,
                    visualizacoes: arquivo.visualizacoes + 1,
                    ultimo_acesso: new Date().toISOString()
                }
            })
        });

        // Download
        const url = arquivo.arquivo.url.startsWith('http') ? arquivo.arquivo.url : `${API_URL}${arquivo.arquivo.url}`;
        const link = document.createElement('a');
        link.href = url;
        link.download = arquivo.arquivo.name;
        link.click();
    }

    async moverArquivo(arquivoId: number, pastaId: number | null): Promise<void> {
        const response = await fetch(`${API_URL}/api/arquivo-compartilhados/${arquivoId}`, {
            method: 'PUT',
            headers: this.getHeaders(),
            body: JSON.stringify({ 
                data: { pasta: pastaId } 
            })
        });

        if (!response.ok) throw new Error('Erro ao mover arquivo');
    }

    async toggleFavorito(arquivoId: number, favorito: boolean): Promise<void> {
        const response = await fetch(`${API_URL}/api/arquivo-compartilhados/${arquivoId}`, {
            method: 'PUT',
            headers: this.getHeaders(),
            body: JSON.stringify({ 
                data: { favorito } 
            })
        });

        if (!response.ok) throw new Error('Erro ao atualizar favorito');
    }

    async buscarArquivoPorId(id: number): Promise<ArquivoCompartilhado> {
        const url = `${API_URL}/api/arquivo-compartilhados/${id}?populate[users_permissions_user]=*&populate[arquivo]=*&populate[pasta]=*`;
        
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
}

export const compartilhamentoAPI = new CompartilhamentoAPI();