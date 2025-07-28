// lib/pontoApi.ts - API DEDICADA PARA PONTO

const API_URL = 'http://localhost:1337';

export interface PontoMensal {
    id: number;
    mes: number;
    ano: number;
    dias_trabalhados: number;
    horas_normais: number;
    horas_extras: number;
    total_horas: number;
    observacoes?: string;
    status: 'pendente' | 'aprovado' | 'pago';
    funcionario: {
        id: number;
        nomecompleto: string;
        cargo: string;
        email: string;
    };
    aprovado_por?: {
        id: number;
        nomecompleto: string;
    };
    data_aprovacao?: string;
    createdAt: string;
    updatedAt: string;
}

export interface CreatePonto {
    mes: number;
    ano: number;
    dias_trabalhados: number;
    horas_extras: number;
    observacoes?: string;
}

class PontoAPI {
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

    // Normalizar dados do Strapi - CORRIGIDO
    private normalizePonto(item: any): PontoMensal {
        const attrs = item.attributes || {};
        
        // Debug
        // console.log('🔍 Normalizando item:', item.id, attrs); // Removi para menos logs, ative se precisar

        const funcionarioData = attrs.users_permissions_user?.data;
        const aprovadorData = attrs.aprovado_por?.data;
        
        const ponto: PontoMensal = {
            id: item.id,
            mes: attrs.mes || 0,
            ano: attrs.ano || 0,
            dias_trabalhados: attrs.dias_trabalhados || 0,
            horas_normais: attrs.horas_normais || 0,
            horas_extras: attrs.horas_extras || 0,
            total_horas: attrs.total_horas || 0,
            observacoes: attrs.observacoes || '',
            status: attrs.status || 'pendente',
            funcionario: funcionarioData ? {
                id: funcionarioData.id,
                nomecompleto: funcionarioData.attributes?.nomecompleto || 'Nome Indisponível', // Adicionei fallback
                cargo: funcionarioData.attributes?.cargo || 'Cargo Indisponível', // Adicionei fallback
                email: funcionarioData.attributes?.email || 'Email Indisponível' // Adicionei fallback
            } : {
                id: 0,
                nomecompleto: 'Usuário não encontrado',
                cargo: '',
                email: ''
            },
            aprovado_por: aprovadorData ? {
                id: aprovadorData.id,
                nomecompleto: aprovadorData.attributes?.nomecompleto || ''
            } : undefined,
            data_aprovacao: attrs.data_aprovacao || '',
            createdAt: attrs.createdAt || '',
            updatedAt: attrs.updatedAt || ''
        };
        
        // console.log('✅ Ponto normalizado:', ponto); // Removi para menos logs, ative se precisar
        return ponto;
    }

    // BUSCAR PONTOS - AGORA COM FILTRO DE NOME DE USUÁRIO
    async buscarPontos(isAdmin: boolean = false, userId?: number, userNameFilter?: string): Promise<PontoMensal[]> {
        console.log('📅 Buscando pontos...');

        const params = new URLSearchParams();
        params.append('populate[users_permissions_user]', '*'); // Popular funcionário
        params.append('populate[aprovado_por]', '*'); // Popular aprovador
        params.append('sort', 'ano:desc,mes:desc'); // Ordenar por ano e mês

        // Filtro para usuário normal: buscar apenas seus próprios pontos
        if (!isAdmin && userId) {
            params.append('filters[users_permissions_user][id][$eq]', userId.toString());
        } 
        // Filtro para administrador: buscar por nome do funcionário (se fornecido)
        else if (isAdmin && userNameFilter) {
            // Usa $containsi para busca parcial e case-insensitive
            params.append('filters[users_permissions_user][nomecompleto][$containsi]', userNameFilter);
        }

        // Construir a URL final
        const url = `${API_URL}/api/registro-mensals?${params.toString()}`;

        console.log('🔗 URL final de busca:', url);
        
        const response = await fetch(url, {
            headers: this.getHeaders()
        });

        if (!response.ok) {
            const errorData = await response.json().catch(() => ({}));
            throw new Error(errorData?.error?.message || `Erro ${response.status} ao buscar pontos`);
        }

        const result = await response.json();
        console.log('📦 Dados com populate:', result);
        
        const pontos = (result.data || []).map(item => this.normalizePonto(item));
        
        console.log(`✅ ${pontos.length} pontos processados`);
        return pontos;
    }

    // CRIAR PONTO
    async criarPonto(data: CreatePonto, userId: number): Promise<PontoMensal> {
        console.log('➕ Criando ponto:', data);

        const horas_normais = data.dias_trabalhados * 8;
        const total_horas = horas_normais + data.horas_extras;

        const payload = {
            data: {
                mes: data.mes,
                ano: data.ano,
                dias_trabalhados: data.dias_trabalhados,
                horas_normais,
                horas_extras: data.horas_extras,
                total_horas,
                observacoes: data.observacoes || '',
                status: 'pendente',
                users_permissions_user: userId
            }
        };

        const response = await fetch(`${API_URL}/api/registro-mensals`, {
            method: 'POST',
            headers: this.getHeaders(),
            body: JSON.stringify(payload)
        });

        if (!response.ok) {
            const error = await response.json().catch(() => ({}));
            throw new Error(error?.error?.message || 'Erro ao criar ponto');
        }

        const result = await response.json();
        console.log('✅ Ponto criado:', result.data.id);
        
        return this.normalizePonto(result.data);
    }

    // ATUALIZAR PONTO
    async atualizarPonto(id: number, data: Partial<CreatePonto>): Promise<PontoMensal> {
        console.log('✏️ Atualizando ponto:', id);

        const updateData: any = {};

        if (data.mes !== undefined) updateData.mes = data.mes;
        if (data.ano !== undefined) updateData.ano = data.ano;
        if (data.dias_trabalhados !== undefined) {
            updateData.dias_trabalhados = data.dias_trabalhados;
            updateData.horas_normais = data.dias_trabalhados * 8;
        }
        if (data.horas_extras !== undefined) {
            updateData.horas_extras = data.horas_extras;
        }
        if (data.observacoes !== undefined) {
            updateData.observacoes = data.observacoes;
        }

        // Recalcular total se necessário
        if (updateData.horas_normais !== undefined || updateData.horas_extras !== undefined || data.dias_trabalhados !== undefined) {
            const currentPonto = await this.buscarUmPonto(id); // Buscar o ponto atual para pegar horas_normais/extras se não estiverem no updateData
            const horas_normais_calc = updateData.horas_normais ?? (data.dias_trabalhados !== undefined ? data.dias_trabalhados * 8 : currentPonto.horas_normais);
            const horas_extras_calc = updateData.horas_extras ?? currentPonto.horas_extras;
            updateData.total_horas = horas_normais_calc + horas_extras_calc;
        }

        const response = await fetch(`${API_URL}/api/registro-mensals/${id}`, {
            method: 'PUT',
            headers: this.getHeaders(),
            body: JSON.stringify({ data: updateData })
        });

        if (!response.ok) {
            const error = await response.json().catch(() => ({}));
            throw new Error(error?.error?.message || 'Erro ao atualizar ponto');
        }

        const result = await response.json();
        console.log('✅ Ponto atualizado:', id);
        
        return this.normalizePonto(result.data);
    }

    // Novo método auxiliar para buscar um único ponto (necessário para atualizar total_horas)
    async buscarUmPonto(id: number): Promise<PontoMensal> {
        const url = `${API_URL}/api/registro-mensals/${id}?populate[users_permissions_user]=*&populate[aprovado_por]=*`;
        const response = await fetch(url, { headers: this.getHeaders() });

        if (!response.ok) {
            const errorData = await response.json().catch(() => ({}));
            throw new Error(errorData?.error?.message || `Erro ${response.status} ao buscar ponto ${id}`);
        }

        const result = await response.json();
        return this.normalizePonto(result.data);
    }

    // APROVAR PONTO
    async aprovarPonto(id: number, aprovadorId: number): Promise<PontoMensal> {
        console.log('✅ Aprovando ponto:', id);

        const response = await fetch(`${API_URL}/api/registro-mensals/${id}`, {
            method: 'PUT',
            headers: this.getHeaders(),
            body: JSON.stringify({
                data: {
                    status: 'aprovado',
                    data_aprovacao: new Date().toISOString(),
                    aprovado_por: aprovadorId
                }
            })
        });

        if (!response.ok) {
            const error = await response.json().catch(() => ({}));
            throw new Error(error?.error?.message || 'Erro ao aprovar ponto');
        }

        const result = await response.json();
        console.log('✅ Ponto aprovado:', id);
        
        return this.normalizePonto(result.data);
    }

    // MARCAR COMO PAGO
    async marcarPago(id: number): Promise<PontoMensal> {
        console.log('💰 Marcando como pago:', id);

        const response = await fetch(`${API_URL}/api/registro-mensals/${id}`, {
            method: 'PUT',
            headers: this.getHeaders(),
            body: JSON.stringify({
                data: { status: 'pago' }
            })
        });

        if (!response.ok) {
            const error = await response.json().catch(() => ({}));
            throw new Error(error?.error?.message || 'Erro ao marcar como pago');
        }

        const result = await response.json();
        console.log('✅ Marcado como pago:', id);
        
        return this.normalizePonto(result.data);
    }

    // DELETAR PONTO
    async deletarPonto(id: number): Promise<void> {
        console.log('🗑️ Deletando ponto:', id);

        const response = await fetch(`${API_URL}/api/registro-mensals/${id}`, {
            method: 'DELETE',
            headers: this.getHeaders()
        });

        if (!response.ok) {
            const error = await response.json().catch(() => ({}));
            throw new Error(error?.error?.message || 'Erro ao deletar ponto');
        }

        console.log('✅ Ponto deletado:', id);
    }

    // VERIFICAR SE JÁ EXISTE REGISTRO NO MÊS
    async verificarRegistroExistente(mes: number, ano: number, userId: number): Promise<boolean> {
        const params = new URLSearchParams({
            'filters[mes][$eq]': mes.toString(),
            'filters[ano][$eq]': ano.toString(),
            'filters[users_permissions_user][id][$eq]': userId.toString()
        });

        const response = await fetch(`${API_URL}/api/registro-mensals?${params.toString()}`, {
            headers: this.getHeaders()
        });

        if (!response.ok) {
             // Se houver um erro na resposta, ainda é bom logar, mas retornar false para não travar a criação.
            console.error("Erro ao verificar registro existente:", await response.json().catch(() => {}));
            return false;
        }

        const result = await response.json();
        return (result.data?.length || 0) > 0;
    }
}

export const pontoAPI = new PontoAPI();