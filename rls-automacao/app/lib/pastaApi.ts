// app/lib/pastaApi.ts
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

export interface PastaCompartilhamento {
    id: number;
    nome: string;
    descricao?: string;
    cor?: string;
    icone?: string;
    pasta_pai?: {
        id: number;
        nome: string;
    };
    usuario_proprietario: {
        id: number;
        nomecompleto: string;
    };
    publico: boolean;
    permissoes?: any;
    ordem: number;
    ativo: boolean;
    createdAt: string;
    updatedAt: string;
    subpastas?: PastaCompartilhamento[];
}

export interface CreatePastaData {
    nome: string;
    descricao?: string;
    cor?: string;
    icone?: string;
    pasta_pai?: number;
    publico: boolean;
}

class PastaAPI {
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

    private normalizePasta(item: any): PastaCompartilhamento {
        const attrs = item?.attributes || {};
        return {
            id: item?.id || 0,
            nome: attrs.nome || '',
            descricao: attrs.descricao || '',
            cor: attrs.cor || '#3B82F6',
            icone: attrs.icone || 'Folder',
            pasta_pai: attrs.pasta_pai?.data ? {
                id: attrs.pasta_pai.data.id,
                nome: attrs.pasta_pai.data.attributes.nome
            } : undefined,
            usuario_proprietario: {
                id: attrs.usuario_proprietario?.data?.id || 0,
                nomecompleto: attrs.usuario_proprietario?.data?.attributes?.nomecompleto || ''
            },
            publico: attrs.publico || false,
            permissoes: attrs.permissoes || {},
            ordem: attrs.ordem || 0,
            ativo: attrs.ativo !== false,
            createdAt: attrs.createdAt || '',
            updatedAt: attrs.updatedAt || '',
            subpastas: []
        };
    }

    async buscarPastas(): Promise<PastaCompartilhamento[]> {
        const response = await fetch(`${API_URL}/api/pasta-compartilhamentos?populate=*&sort=ordem`, {
            headers: this.getHeaders()
        });

        if (!response.ok) throw new Error('Erro ao buscar pastas');
        
        const result = await response.json();
        return result.data.map(this.normalizePasta);
    }

    async criarPasta(data: CreatePastaData): Promise<PastaCompartilhamento> {
        const payload = {
            data: {
                ...data,
                usuario_proprietario: this.getCurrentUserId(),
                ordem: 0,
                ativo: true
            }
        };

        const response = await fetch(`${API_URL}/api/pasta-compartilhamentos`, {
            method: 'POST',
            headers: this.getHeaders(),
            body: JSON.stringify(payload)
        });

        if (!response.ok) throw new Error('Erro ao criar pasta');
        
        const result = await response.json();
        return this.normalizePasta(result.data);
    }

    async atualizarPasta(id: number, data: Partial<CreatePastaData>): Promise<PastaCompartilhamento> {
        const response = await fetch(`${API_URL}/api/pasta-compartilhamentos/${id}`, {
            method: 'PUT',
            headers: this.getHeaders(),
            body: JSON.stringify({ data })
        });

        if (!response.ok) throw new Error('Erro ao atualizar pasta');
        
        const result = await response.json();
        return this.normalizePasta(result.data);
    }

    async deletarPasta(id: number): Promise<void> {
        const response = await fetch(`${API_URL}/api/pasta-compartilhamentos/${id}`, {
            method: 'DELETE',
            headers: this.getHeaders()
        });

        if (!response.ok) throw new Error('Erro ao deletar pasta');
    }

    async buscarHierarquia(): Promise<PastaCompartilhamento[]> {
        const pastas = await this.buscarPastas();
        return this.buildTree(pastas);
    }

    private buildTree(pastas: PastaCompartilhamento[]): PastaCompartilhamento[] {
        const pastaMap = new Map<number, PastaCompartilhamento>();
        const raizes: PastaCompartilhamento[] = [];

        pastas.forEach(pasta => {
            pastaMap.set(pasta.id, { ...pasta, subpastas: [] });
        });

        pastas.forEach(pasta => {
            const pastaNode = pastaMap.get(pasta.id)!;
            
            if (pasta.pasta_pai?.id) {
                const pai = pastaMap.get(pasta.pasta_pai.id);
                if (pai) {
                    pai.subpastas!.push(pastaNode);
                }
            } else {
                raizes.push(pastaNode);
            }
        });

        return raizes;
    }
}

export const pastaAPI = new PastaAPI();