// lib/api.ts - 

const API_URL = 'http://localhost:1337'; //

// Utilitários de segurança
const safeString = (value: any): string => {
    if (value === null || value === undefined) return '';
    return String(value);
};

const safeNumber = (value: any): number => {
    if (value === null || value === undefined) return 0;
    if (typeof value === 'number') return isNaN(value) ? 0 : value;
    if (typeof value === 'string') {
        const cleanValue = value.trim().replace(',', '.');
        const parsed = parseFloat(cleanValue);
        return isNaN(parsed) ? 0 : parsed;
    }
    return 0;
};

// Interfaces de Dados
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
}

export interface FileData {
    id: number;
    name: string;
    url: string;
    mime: string;
    size: number;
}

export interface Despesa {
    id: number;
    descricao: string;
    valor: number;
    data_despesa: string;
    categoria: 'transporte' | 'alimentacao' | 'hospedagem' | 'combustivel' | 'outros';
    status: 'pendente' | 'aprovada' | 'rejeitada';
    observacoes?: string;
    comprovativo?: FileData; // Usando FileData para comprovativo
    users_permissions_user?: User;
    publishedAt?: string;
    createdAt: string;
    updatedAt: string;
}

export interface Documento {
    id: number;
    nome: string;
    tipo: 'contrato' | 'recibo_vencimento' | 'certificado' | 'outros';
    arquivo: FileData; // Usando FileData para arquivo
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
    meta?: {
        pagination?: {
            page: number;
            pageSize: number;
            pageCount: number;
            total: number;
        };
    };
}

// Nova interface para o retorno detalhado do endpoint /api/upload/files/:id
export interface StrapiFile {
    id: number;
    name: string;
    alternativeText: string | null;
    caption: string | null;
    width: number | null;
    height: number | null;
    formats: any | null; // Pode ser um objeto com URLs de thumb, small, etc.
    hash: string;
    ext: string;
    mime: string;
    size: number;
    url: string; // O caminho relativo para o arquivo
    previewUrl: string | null;
    provider: string;
    provider_metadata: any | null;
    createdAt: string;
    updatedAt: string;
}


class ApiService {
    private getHeaders(contentType: 'application/json' | 'multipart/form-data' | null = 'application/json') {
        const token = this.getToken();
        const headers: Record<string, string> = {};

        if (contentType === 'application/json') {
            headers['Content-Type'] = 'application/json';
        }
        // Para 'multipart/form-data', o navegador define o Content-Type automaticamente
        // e não devemos defini-lo manualmente aqui, pois ele precisa do boundary.

        if (token) {
            headers.Authorization = `Bearer ${token}`;
        }

        return headers;
    }

    private getToken(): string | null {
        try {
            return localStorage.getItem('token');
        } catch {
            return null;
        }
    }

    private hasToken(): boolean {
        return !!this.getToken();
    }

    // 🔥 PARSING SEGURO DE VALORES DECIMAIS
    private parseDecimalValue(value: any): number {
        return safeNumber(value);
    }

    // 🔥 NORMALIZAR DADOS DA DESPESA - CORRIGIDO PARA ESTRUTURA DO STRAPI V4
    private normalizeDespesa(item: any): Despesa {
        const attributes = item?.attributes || {};
        const comprovativoData = attributes.comprovativo?.data?.attributes;
        const comprovativoId = attributes.comprovativo?.data?.id; // Capturar o ID do comprovativo
        const userData = attributes.users_permissions_user?.data?.attributes;
        const userRoleData = userData?.role?.data?.attributes;

        return {
            id: safeNumber(item?.id || 0),
            descricao: safeString(attributes.descricao || ''),
            valor: this.parseDecimalValue(attributes.valor || 0),
            data_despesa: safeString(attributes.data_despesa || ''),
            categoria: safeString(attributes.categoria || 'outros') as any,
            status: safeString(attributes.status || 'pendente') as any,
            observacoes: safeString(attributes.observacoes || ''),

            comprovativo: comprovativoData && comprovativoId ? {
                id: safeNumber(comprovativoId),
                name: safeString(comprovativoData.name || ''),
                url: safeString(comprovativoData.url || ''),
                mime: safeString(comprovativoData.mime || ''),
                size: safeNumber(comprovativoData.size || 0),
            } : undefined,

            users_permissions_user: userData ? {
                id: safeNumber(attributes.users_permissions_user.data.id),
                username: safeString(userData.username || ''),
                email: safeString(userData.email || ''),
                nomecompleto: safeString(userData.nomecompleto || ''),
                cargo: safeString(userData.cargo || ''),
                nif: safeString(userData.nif || ''),
                telefone: safeString(userData.telefone || ''),
                data_admissao: safeString(userData.data_admissao || ''),
                salario: safeNumber(userData.salario || 0),
                confirmed: userData.confirmed || false,
                blocked: userData.blocked || false,
                role: userRoleData ? {
                    id: safeNumber(userData.role.data.id),
                    name: safeString(userRoleData.name || ''),
                    type: safeString(userRoleData.type || ''),
                } : undefined,
                createdAt: safeString(userData.createdAt || ''),
                updatedAt: safeString(userData.updatedAt || ''),
            } : undefined,

            publishedAt: safeString(attributes.publishedAt || ''),
            createdAt: safeString(attributes.createdAt || ''),
            updatedAt: safeString(attributes.updatedAt || '')
        };
    }

    // 🔥 NORMALIZAR DADOS DO DOCUMENTO - CORRIGIDO PARA ESTRUTURA DO STRAPI V4
    private normalizeDocumento(item: any): Documento {
        const attributes = item?.attributes || {};
        const arquivoData = attributes.arquivo?.data?.attributes;
        const arquivoId = attributes.arquivo?.data?.id; // Capturar o ID do arquivo
        const userData = attributes.users_permissions_user?.data?.attributes;
        const userRoleData = userData?.role?.data?.attributes;

        return {
            id: safeNumber(item?.id || 0),
            nome: safeString(attributes.nome || ''),
            tipo: safeString(attributes.tipo || 'outros') as any,

            arquivo: arquivoData && arquivoId ? {
                id: safeNumber(arquivoId),
                name: safeString(arquivoData.name || ''),
                url: safeString(arquivoData.url || ''),
                mime: safeString(arquivoData.mime || ''),
                size: safeNumber(arquivoData.size || 0),
            } : { id: 0, name: '', url: '', mime: '', size: 0 }, // fallback se não houver arquivo

            users_permissions_user: userData ? {
                id: safeNumber(attributes.users_permissions_user.data.id),
                username: safeString(userData.username || ''),
                email: safeString(userData.email || ''),
                nomecompleto: safeString(userData.nomecompleto || ''),
                cargo: safeString(userData.cargo || ''),
                nif: safeString(userData.nif || ''),
                telefone: safeString(userData.telefone || ''),
                data_admissao: safeString(userData.data_admissao || ''),
                salario: safeNumber(userData.salario || 0),
                confirmed: userData.confirmed || false,
                blocked: userData.blocked || false,
                role: userRoleData ? {
                    id: safeNumber(userData.role.data.id),
                    name: safeString(userRoleData.name || ''),
                    type: safeString(userRoleData.type || ''),
                } : undefined,
                createdAt: safeString(userData.createdAt || ''),
                updatedAt: safeString(userData.updatedAt || ''),
            } : undefined,

            publishedAt: safeString(attributes.publishedAt || ''),
            createdAt: safeString(attributes.createdAt || ''),
            updatedAt: safeString(attributes.updatedAt || '')
        };
    }

    async login(credentials: { identifier: string; password: string }) {
        console.log('🔐 Iniciando login para:', safeString(credentials?.identifier));

        const response = await fetch(`${API_URL}/api/auth/local`, {
            method: 'POST',
            headers: this.getHeaders('application/json'), // Forçando JSON
            body: JSON.stringify({
                identifier: safeString(credentials?.identifier),
                password: safeString(credentials?.password)
            }),
        });

        if (!response.ok) {
            const error = await response.json().catch(() => ({}));
            const errorMessage = safeString(error?.error?.message || 'Login falhou');
            console.error('❌ Erro no login:', errorMessage);
            throw new Error(errorMessage);
        }

        const result = await response.json();
        const userName = safeString(result?.user?.nomecompleto || result?.user?.username || 'Usuário');
        console.log('✅ Login realizado:', userName);
        return result;
    }

    async getCurrentUser(): Promise<User> {
        console.log('👤 Buscando usuário atual...');

        if (!this.hasToken()) {
            throw new Error('Token não encontrado');
        }

        const response = await fetch(`${API_URL}/api/users/me?populate=role`, {
            headers: this.getHeaders(),
        });

        if (!response.ok) {
            console.error('❌ Erro ao buscar usuário:', response.status);
            throw new Error(`Erro ao buscar usuário: ${response.status}`);
        }

        // Adicionada normalização para o usuário atual também
        const userResult = await response.json();
        const user = {
            id: safeNumber(userResult.id),
            username: safeString(userResult.username),
            email: safeString(userResult.email),
            nomecompleto: safeString(userResult.nomecompleto),
            cargo: safeString(userResult.cargo),
            nif: safeString(userResult.nif),
            telefone: safeString(userResult.telefone),
            data_admissao: safeString(userResult.data_admissao),
            salario: safeNumber(userResult.salario),
            confirmed: userResult.confirmed,
            blocked: userResult.blocked,
            role: userResult.role ? {
                id: safeNumber(userResult.role.id),
                name: safeString(userResult.role.name),
                type: safeString(userResult.role.type),
            } : undefined,
            createdAt: safeString(userResult.createdAt),
            updatedAt: safeString(userResult.updatedAt),
        };

        const userName = safeString(user?.nomecompleto || user?.username || 'Usuário');
        const userCargo = safeString(user?.cargo || 'N/A');
        console.log('✅ Usuário encontrado:', userName, 'Cargo:', userCargo);

        return user;
    }

    async getDespesas(): Promise<ApiResponse<Despesa>> {
        console.log('💰 Buscando despesas...');

        if (!this.hasToken()) {
            throw new Error('Token não encontrado');
        }

        // 🔥 URL CORRIGIDA PARA POPULAR AS RELAÇÕES CORRETAMENTE NO STRAPI V4
        // populate[users_permissions_user][populate][role]=* : Popula o usuário e o papel do usuário
        // populate[users_permissions_user][fields]=username,nomecompleto,email,cargo : Campos específicos do usuário
        // populate[comprovativo]=* : Popula os detalhes do comprovativo (arquivo)
        const url = `${API_URL}/api/despesas?populate[users_permissions_user][populate][role]=*&populate[users_permissions_user][fields][0]=username&populate[users_permissions_user][fields][1]=nomecompleto&populate[users_permissions_user][fields][2]=email&populate[users_permissions_user][fields][3]=cargo&populate[comprovativo]=*&sort=createdAt:desc&publicationState=preview`;

        console.log('💰 URL da requisição (com populate aprimorado):', url);

        const response = await fetch(url, {
            headers: this.getHeaders(),
        });

        if (!response.ok) {
            console.error('❌ Erro na API despesas:', response.status, response.statusText);
            const error = await response.json().catch(() => ({}));
            const errorMessage = safeString(error?.error?.message || `Erro ${response.status}`);
            console.error('❌ Detalhes do erro:', errorMessage);
            throw new Error(`Erro ao buscar despesas: ${errorMessage}`);
        }

        const result = await response.json();
        // ESTE LOG AGORA DEVE MOSTRAR O USUÁRIO E O VALOR/DESCRIÇÃO CORRETAMENTE!
        console.log('💰 Dados brutos recebidos da API (COM POPULATE):', JSON.stringify(result, null, 2));

        // 🔥 NORMALIZAR E CONVERTER DADOS CORRETAMENTE (usará a nova normalizeDespesa)
        const normalizedData = (result?.data || []).map((despesa: any) => {
            const normalized = this.normalizeDespesa(despesa);
            // Log detalhado para verificar a normalização
            console.log(`💰 Despesa ID ${normalized.id}: Descrição: "${normalized.descricao}", Valor: ${normalized.valor}, Usuário: ${normalized.users_permissions_user?.nomecompleto || normalized.users_permissions_user?.username || 'N/A'}`);
            return normalized;
        });

        console.log('✅ Despesas processadas:', normalizedData.length);

        return {
            data: normalizedData,
            meta: result?.meta || {}
        };
    }

    async getDocumentos(): Promise<ApiResponse<Documento>> {
        console.log('📄 Buscando documentos...');

        if (!this.hasToken()) {
            throw new Error('Token não encontrado');
        }

        // Popula o usuário e seu papel, e o arquivo
        const url = `${API_URL}/api/documentos?populate[users_permissions_user][populate][role]=*&populate[users_permissions_user][fields][0]=username&populate[users_permissions_user][fields][1]=nomecompleto&populate[users_permissions_user][fields][2]=email&populate[users_permissions_user][fields][3]=cargo&populate[arquivo]=*&sort=createdAt:desc&publicationState=preview`;

        const response = await fetch(url, {
            headers: this.getHeaders(),
        });

        if (!response.ok) {
            console.error('❌ Erro na API documentos:', response.status);
            const error = await response.json().catch(() => ({}));
            const errorMessage = safeString(error?.error?.message || `Erro ${response.status}`);
            console.error('❌ Detalhes do erro:', errorMessage);
            throw new Error(`Erro ao buscar documentos: ${errorMessage}`);
        }

        const result = await response.json();

        // 🔥 NORMALIZAR DADOS DOS DOCUMENTOS (usará a nova normalizeDocumento)
        const normalizedData = (result?.data || []).map((documento: any) =>
            this.normalizeDocumento(documento)
        );

        console.log('✅ Documentos processados:', normalizedData.length);

        return {
            data: normalizedData,
            meta: result?.meta || {}
        };
    }

    async createDespesa(data: any) {
        console.log('➕ Criando despesa:', data);

        // Normalizar dados antes de enviar
        const normalizedData = {
            descricao: safeString(data?.descricao || ''),
            valor: this.parseDecimalValue(data?.valor || 0),
            data_despesa: safeString(data?.data_despesa || ''),
            categoria: safeString(data?.categoria || 'outros'),
            observacoes: safeString(data?.observacoes || ''),
            status: safeString(data?.status || 'pendente'),
            // Para relações, enviar apenas o ID
            users_permissions_user: safeNumber(data?.users_permissions_user || 0),
            ...(data?.comprovativo && { comprovativo: safeNumber(data.comprovativo) })
        };

        const response = await fetch(`${API_URL}/api/despesas`, {
            method: 'POST',
            headers: this.getHeaders(),
            body: JSON.stringify({ data: normalizedData }),
        });

        if (!response.ok) {
            const error = await response.json().catch(() => ({}));
            const errorMessage = safeString(error?.error?.message || 'Erro ao criar despesa');
            console.error('❌ Erro ao criar despesa:', errorMessage);
            throw new Error(errorMessage);
        }

        const result = await response.json();
        console.log('✅ Despesa criada com sucesso:', result?.data?.id);
        return result;
    }

    async updateDespesa(id: number, data: any) {
        console.log('✏️ Atualizando despesa:', id, data);

        // Normalizar dados antes de enviar
        // Certifique-se de que `data.status` e `data.observacoes` são passados corretamente aqui
        const normalizedData = {
            ...(data.descricao !== undefined && { descricao: safeString(data.descricao) }),
            ...(data.valor !== undefined && { valor: this.parseDecimalValue(data.valor) }),
            ...(data.data_despesa !== undefined && { data_despesa: safeString(data.data_despesa) }),
            ...(data.categoria !== undefined && { categoria: safeString(data.categoria) }),
            ...(data.observacoes !== undefined && { observacoes: safeString(data.observacoes) }),
            ...(data.status !== undefined && { status: safeString(data.status) }) // O status que você quer atualizar
            // Não inclua users_permissions_user ou comprovativo aqui a menos que você queira mudar a relação
        };

        const response = await fetch(`${API_URL}/api/despesas/${id}`, {
            method: 'PUT',
            headers: this.getHeaders(),
            body: JSON.stringify({ data: normalizedData }),
        });

        if (!response.ok) {
            const error = await response.json().catch(() => ({}));
            const errorMessage = safeString(error?.error?.message || 'Erro ao atualizar despesa');
            console.error('❌ Erro ao atualizar despesa:', errorMessage);
            throw new Error(errorMessage);
        }

        const result = await response.json();
        console.log('✅ Despesa atualizada com sucesso:', id);
        return result;
    }

    async updateDespesaStatus(id: number, status: 'aprovada' | 'rejeitada', observacoes?: string) {
        console.log(`✏️ Atualizando status da despesa ${id} para: ${status}`);
        // Esta função já chama updateDespesa com os dados corretos
        return this.updateDespesa(id, {
            status: safeString(status),
            ...(observacoes && { observacoes: safeString(observacoes) })
        });
    }

    async uploadFile(file: File) {
        console.log('📤 Fazendo upload do arquivo:', file?.name || 'sem nome');

        if (!file) {
            throw new Error('Nenhum arquivo fornecido');
        }

        const formData = new FormData();
        formData.append('files', file);

        // Não definimos Content-Type para FormData, o navegador fará isso com o boundary.
        const token = this.getToken();
        const headers: Record<string, string> = {};
        if (token) {
            headers.Authorization = `Bearer ${token}`;
        }

        const response = await fetch(`${API_URL}/api/upload`, {
            method: 'POST',
            headers, // Headers sem Content-Type para FormData
            body: formData,
        });

        if (!response.ok) {
            const error = await response.json().catch(() => ({}));
            const errorMessage = safeString(error?.error?.message || 'Erro no upload');
            console.error('❌ Erro no upload:', errorMessage);
            throw new Error(errorMessage);
        }

        const result = await response.json();
        const uploadedFile = result?.[0]; // O endpoint de upload retorna um array de arquivos
        const fileName = safeString(uploadedFile?.name || 'arquivo');
        console.log('✅ Upload realizado:', fileName);
        return uploadedFile; // Retorna o primeiro objeto de arquivo carregado
    }

    /**
     * Busca os detalhes de um arquivo específico da Media Library do Strapi.
     * Requer o ID do arquivo.
     */
    async getFileDetails(fileId: number): Promise<StrapiFile> {
        console.log(`🔍 Buscando detalhes do arquivo ID: ${fileId}...`);

        if (!this.hasToken()) {
            throw new Error('Token não encontrado para buscar detalhes do arquivo.');
        }
        if (fileId <= 0) {
            throw new Error('ID do arquivo inválido.');
        }

        const url = `${API_URL}/api/upload/files/${fileId}`; // Endpoint padrão para arquivos na Media Library

        const response = await fetch(url, {
            headers: this.getHeaders(), // Enviando headers JSON, mas não Content-Type para GET
        });

        if (!response.ok) {
            const error = await response.json().catch(() => ({}));
            const errorMessage = safeString(error?.message || `Erro ao buscar arquivo ${fileId}: ${response.status}`);
            console.error('❌ Erro ao buscar detalhes do arquivo:', errorMessage);
            throw new Error(errorMessage);
        }

        const result = await response.json();
        console.log(`✅ Detalhes do arquivo ID ${fileId} encontrados:`, result.name);

        // Retornar o resultado diretamente, pois o endpoint /api/upload/files/:id já retorna o objeto flat do arquivo
        return {
            id: safeNumber(result.id),
            name: safeString(result.name),
            alternativeText: safeString(result.alternativeText),
            caption: safeString(result.caption),
            width: safeNumber(result.width),
            height: safeNumber(result.height),
            formats: result.formats, // Manter como any ou tipar mais especificamente se necessário
            hash: safeString(result.hash),
            ext: safeString(result.ext),
            mime: safeString(result.mime),
            size: safeNumber(result.size),
            url: safeString(result.url),
            previewUrl: safeString(result.previewUrl),
            provider: safeString(result.provider),
            provider_metadata: result.provider_metadata,
            createdAt: safeString(result.createdAt),
            updatedAt: safeString(result.updatedAt),
        };
    }

    /**
     * Constrói a URL completa para um arquivo de mídia, a partir da URL relativa retornada pelo Strapi.
     */
    getMediaUrl(media: FileData | StrapiFile): string {
        const url = safeString(media?.url || '');
        if (!url) return '';
        // Se a URL já for absoluta (ex: de um provedor externo), retorna como está.
        // Caso contrário, concatena com a API_URL base.
        return url.startsWith('http://') || url.startsWith('https://') ? url : `${API_URL}${url}`;
    }

    //  STATS COM CÁLCULOS TOTALMENTE SEGUROS
    async getDashboardStats(currentUser: User): Promise<DashboardStats> {
        try {
            const userName = safeString(currentUser?.nomecompleto || 'Usuário');
            const userCargo = safeString(currentUser?.cargo || '');
            console.log('📊 Calculando stats para usuário:', userName, 'Cargo:', userCargo);

            // Buscar dados em paralelo com tratamento de erro individual
            const [despesasResponse, documentosResponse] = await Promise.all([
                this.getDespesas().catch(err => {
                    console.error('❌ Erro ao buscar despesas para stats:', err);
                    return { data: [], meta: {} };
                }),
                this.getDocumentos().catch(err => {
                    console.error('❌ Erro ao buscar documentos para stats:', err);
                    return { data: [], meta: {} };
                })
            ]);

            let despesas = despesasResponse?.data || [];
            let documentos = documentosResponse?.data || [];

            console.log('📈 Dados brutos - Despesas:', despesas.length, 'Documentos:', documentos.length);

            // Verificar se é admin baseado no cargo ou tipo de role
            const isAdmin = userCargo === 'Gestor' ||
                             currentUser?.role?.type === 'administrator' ||
                             currentUser?.role?.type === 'super-admin' ||
                             currentUser?.username === 'admin'; // Adicionado para admin padrão do Strapi

            if (!isAdmin && currentUser?.id) {
                console.log('🔒 Filtrando dados do usuário ID:', currentUser.id);

                // Filtrar apenas dados do usuário atual
                despesas = despesas.filter((d: Despesa) => {
                    const userId = safeNumber(d?.users_permissions_user?.id || 0);
                    return userId === currentUser.id;
                });

                documentos = documentos.filter((d: Documento) => {
                    const userId = safeNumber(d?.users_permissions_user?.id || 0);
                    return userId === currentUser.id;
                });

                console.log('🔒 Após filtro - Despesas:', despesas.length, 'Documentos:', documentos.length);
            } else {
                console.log('👑 Usuário admin - mostrando todos os dados');
            }

            // 🔥 CÁLCULO TOTALMENTE SEGURO DO VALOR TOTAL
            const valorTotalDespesas = despesas.reduce((sum: number, d: Despesa) => {
                const valor = this.parseDecimalValue(d?.valor || 0);
                console.log(`💰 Despesa ID ${d?.id}: "${safeString(d?.descricao)}" - Valor: ${valor} (tipo: ${typeof valor})`);
                return sum + valor;
            }, 0);

            // Contar pendentes de forma segura
            const despesasPendentes = despesas.filter((d: Despesa) =>
                safeString(d?.status || '') === 'pendente'
            ).length;

            const stats: DashboardStats = {
                totalDespesas: despesas.length,
                totalDocumentos: documentos.length,
                valorTotalDespesas,
                despesasPendentes,
            };

            console.log('📈 Stats finais calculadas:', stats);
            return stats;

        } catch (error) {
            console.error('❌ Erro crítico ao calcular stats:', error);
            return {
                totalDespesas: 0,
                totalDocumentos: 0,
                valorTotalDespesas: 0,
                despesasPendentes: 0,
            };
        }
    }

    async testConnection(): Promise<boolean> {
        try {
            const response = await fetch(`${API_URL}/api/users/me`, {
                headers: this.getHeaders(),
            });
            const isConnected = response.ok;
            console.log(isConnected ? '✅ Conexão OK' : '❌ Conexão falhou');
            return isConnected;
        } catch (error) {
            console.error('❌ Erro na conexão:', error);
            return false;
        }
    }
}

export const api = new ApiService();