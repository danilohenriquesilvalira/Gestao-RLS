<<<<<<< HEAD
// app/lib/pastaApi.ts - CORRIGIDO
=======
// app/lib/pastaApi.ts - CORRIGIDO PARA STRAPI
>>>>>>> 4cf0e25e8448e95e3242d17810777c3ded133477
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
    pasta_pai?: number | null;
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
            console.error('Erro ao obter user ID');
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
            // CORRIGIDO: pasta_pai agora é relation para pasta, não user
            pasta_pai: attrs.pasta_pai?.data ? {
                id: attrs.pasta_pai.data.id,
                nome: attrs.pasta_pai.data.attributes?.nome || 'Pasta'
            } : undefined,
            usuario_proprietario: {
                id: attrs.usuario_proprietario?.data?.id || 0,
                nomecompleto: attrs.usuario_proprietario?.data?.attributes?.nomecompleto || attrs.usuario_proprietario?.data?.attributes?.username || 'Usuário'
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
<<<<<<< HEAD
        const response = await fetch(`${API_URL}/api/pasta-compartilhamentos?populate[pasta_pai]=*&populate[usuario_proprietario]=*&sort=ordem`, {
            headers: this.getHeaders()
        });
=======
        try {
            const response = await fetch(`${API_URL}/api/pasta-compartilhamentos?populate[pasta_pai]=*&populate[usuario_proprietario]=*&sort=ordem`, {
                headers: this.getHeaders()
            });
>>>>>>> 4cf0e25e8448e95e3242d17810777c3ded133477

            if (!response.ok) {
                const errorText = await response.text();
                console.error('Erro ao buscar pastas:', errorText);
                throw new Error(`Erro ao buscar pastas: ${response.status}`);
            }
            
            const result = await response.json();
            return (result.data || []).map((item: any) => this.normalizePasta(item));
        } catch (error) {
            console.error('Erro em buscarPastas:', error);
            return [];
        }
    }

    async criarPasta(data: CreatePastaData): Promise<PastaCompartilhamento> {
        const userId = this.getCurrentUserId();
        
        if (!userId) {
            throw new Error('Usuário não autenticado');
        }

        // PAYLOAD CORRETO PARA STRAPI
        const payload = {
            data: {
                nome: data.nome,
                descricao: data.descricao || '',
                cor: data.cor || '#3B82F6',
                icone: data.icone || 'Folder',
<<<<<<< HEAD
                pasta_pai: data.pasta_pai || null,
                publico: data.publico,
                usuario_proprietario: this.getCurrentUserId(),
                ordem: 0,
                ativo: true
            }
        };

        console.log('Payload criação pasta:', payload); // Debug

        const response = await fetch(`${API_URL}/api/pasta-compartilhamentos`, {
            method: 'POST',
=======
                publico: data.publico || false,
                usuario_proprietario: userId,
                ordem: data.ordem || 0,
                ativo: true,
                // IMPORTANTE: pasta_pai deve ser null se não for subpasta
                ...(data.pasta_pai && { pasta_pai: data.pasta_pai })
            }
        };

        console.log('🚀 Criando pasta:', JSON.stringify(payload, null, 2));

        try {
            const response = await fetch(`${API_URL}/api/pasta-compartilhamentos`, {
                method: 'POST',
                headers: this.getHeaders(),
                body: JSON.stringify(payload)
            });

            if (!response.ok) {
                const errorData = await response.text();
                console.error('❌ Erro na API:', errorData);
                throw new Error(`Erro ${response.status}: ${errorData}`);
            }
            
            const result = await response.json();
            console.log('✅ Pasta criada:', result);
            return this.normalizePasta(result.data);
            
        } catch (error) {
            console.error('Erro ao criar pasta:', error);
            throw error;
        }
    }

    async atualizarPasta(id: number, data: Partial<CreatePastaData>): Promise<PastaCompartilhamento> {
        const payload = { data };

        const response = await fetch(`${API_URL}/api/pasta-compartilhamentos/${id}`, {
            method: 'PUT',
>>>>>>> 4cf0e25e8448e95e3242d17810777c3ded133477
            headers: this.getHeaders(),
            body: JSON.stringify(payload)
        });

        if (!response.ok) {
<<<<<<< HEAD
            const error = await response.text();
            console.error('Erro ao criar pasta:', error);
            throw new Error('Erro ao criar pasta');
        }
        
        const result = await response.json();
        return this.normalizePasta(result.data);
    }

    async atualizarPasta(id: number, data: Partial<CreatePastaData>): Promise<PastaCompartilhamento> {
        const payload = {
            data: {
                ...data,
                pasta_pai: data.pasta_pai || null
            }
        };

        const response = await fetch(`${API_URL}/api/pasta-compartilhamentos/${id}`, {
            method: 'PUT',
            headers: this.getHeaders(),
            body: JSON.stringify(payload)
        });

        if (!response.ok) throw new Error('Erro ao atualizar pasta');
=======
            const errorText = await response.text();
            throw new Error(`Erro ao atualizar pasta: ${errorText}`);
        }
>>>>>>> 4cf0e25e8448e95e3242d17810777c3ded133477
        
        const result = await response.json();
        return this.normalizePasta(result.data);
    }

    async deletarPasta(id: number): Promise<void> {
        const response = await fetch(`${API_URL}/api/pasta-compartilhamentos/${id}`, {
            method: 'DELETE',
            headers: this.getHeaders()
        });

        if (!response.ok) {
            const errorText = await response.text();
            throw new Error(`Erro ao deletar pasta: ${errorText}`);
        }
    }

    async buscarHierarquia(): Promise<PastaCompartilhamento[]> {
        const pastas = await this.buscarPastas();
        return this.buildTree(pastas);
    }

    private buildTree(pastas: PastaCompartilhamento[]): PastaCompartilhamento[] {
        const pastaMap = new Map<number, PastaCompartilhamento>();
        const raizes: PastaCompartilhamento[] = [];

        // Criar mapa de pastas
        pastas.forEach(pasta => {
            pastaMap.set(pasta.id, { ...pasta, subpastas: [] });
        });

<<<<<<< HEAD
        // Construir hierarquia
=======
        // Construir árvore
>>>>>>> 4cf0e25e8448e95e3242d17810777c3ded133477
        pastas.forEach(pasta => {
            const pastaNode = pastaMap.get(pasta.id)!;
            
            if (pasta.pasta_pai?.id) {
                const pai = pastaMap.get(pasta.pasta_pai.id);
                if (pai) {
                    pai.subpastas!.push(pastaNode);
                } else {
<<<<<<< HEAD
                    // Se pai não existe, tratar como raiz
=======
                    // Se pasta pai não existe, colocar na raiz
>>>>>>> 4cf0e25e8448e95e3242d17810777c3ded133477
                    raizes.push(pastaNode);
                }
            } else {
                raizes.push(pastaNode);
            }
        });

        return raizes.sort((a, b) => a.ordem - b.ordem);
    }
}

export const pastaAPI = new PastaAPI();