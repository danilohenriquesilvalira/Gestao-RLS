import React from 'react';

type StatusDespesa = 'todas' | 'pendente' | 'aprovada' | 'rejeitada';

interface DespesasFiltersProps {
    isMobile: boolean;
    isAdmin: boolean;
    statusFilter: StatusDespesa;
    selectedFuncionario: string;
    selectedMes: number;
    selectedAno: number;
    funcionarios: string[];
    anosDisponiveis: number[];
    onStatusChange: (status: StatusDespesa) => void;
    onFuncionarioChange: (funcionario: string) => void;
    onMesChange: (mes: number) => void;
    onAnoChange: (ano: number) => void;
}

export default function DespesasFilters({
    isMobile,
    isAdmin,
    statusFilter,
    selectedFuncionario,
    selectedMes,
    selectedAno,
    funcionarios,
    anosDisponiveis,
    onStatusChange,
    onFuncionarioChange,
    onMesChange,
    onAnoChange
}: DespesasFiltersProps) {
    const getMesNome = (mes: number) => {
        const meses = ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 
                      'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'];
        return meses[mes - 1] || 'N/A';
    };

    if (isMobile) {
        return (
            <div className="space-y-2">
                <div className="grid grid-cols-2 gap-2">
                    <select
                        value={selectedMes}
                        onChange={(e) => onMesChange(Number(e.target.value))}
                        className="px-3 py-2 text-sm border border-gray-300 rounded focus:ring-2 focus:ring-primary-200"
                    >
                        <option value={0}>Todos os meses</option>
                        {Array.from({length: 12}, (_, i) => (
                            <option key={i+1} value={i+1}>
                                {getMesNome(i+1)}
                            </option>
                        ))}
                    </select>

                    <select
                        value={selectedAno}
                        onChange={(e) => onAnoChange(Number(e.target.value))}
                        className="px-3 py-2 text-sm border border-gray-300 rounded focus:ring-2 focus:ring-primary-200"
                    >
                        <option value={0}>Todos os anos</option>
                        {anosDisponiveis.map(ano => (
                            <option key={ano} value={ano}>{ano}</option>
                        ))}
                    </select>
                </div>

                <select
                    value={statusFilter}
                    onChange={(e) => onStatusChange(e.target.value as StatusDespesa)}
                    className="w-full px-3 py-2 text-sm border border-gray-300 rounded focus:ring-2 focus:ring-primary-200"
                >
                    <option value="todas">Todas</option>
                    <option value="pendente">Pendentes</option>
                    <option value="aprovada">Aprovadas</option>
                    <option value="rejeitada">Rejeitadas</option>
                </select>

                {isAdmin && (
                    <select
                        value={selectedFuncionario}
                        onChange={(e) => onFuncionarioChange(e.target.value)}
                        className="w-full px-3 py-2 text-sm border border-gray-300 rounded focus:ring-2 focus:ring-primary-200"
                    >
                        <option value="">Todos os funcionários</option>
                        {funcionarios.map(nome => (
                            <option key={nome} value={nome}>{nome}</option>
                        ))}
                    </select>
                )}
            </div>
        );
    }

    return (
        <div className="flex items-center space-x-2">
            <select
                value={selectedMes}
                onChange={(e) => onMesChange(Number(e.target.value))}
                className="px-2 py-1 text-sm border border-gray-300 rounded focus:ring-2 focus:ring-primary-200"
            >
                <option value={0}>Todos os meses</option>
                {Array.from({length: 12}, (_, i) => (
                    <option key={i+1} value={i+1}>
                        {getMesNome(i+1)}
                    </option>
                ))}
            </select>

            <select
                value={selectedAno}
                onChange={(e) => onAnoChange(Number(e.target.value))}
                className="px-2 py-1 text-sm border border-gray-300 rounded focus:ring-2 focus:ring-primary-200"
            >
                <option value={0}>Todos os anos</option>
                {anosDisponiveis.map(ano => (
                    <option key={ano} value={ano}>{ano}</option>
                ))}
            </select>

            <select
                value={statusFilter}
                onChange={(e) => onStatusChange(e.target.value as StatusDespesa)}
                className="px-2 py-1 text-sm border border-gray-300 rounded focus:ring-2 focus:ring-primary-200"
            >
                <option value="todas">Todas</option>
                <option value="pendente">Pendentes</option>
                <option value="aprovada">Aprovadas</option>
                <option value="rejeitada">Rejeitadas</option>
            </select>

            {isAdmin && (
                <select
                    value={selectedFuncionario}
                    onChange={(e) => onFuncionarioChange(e.target.value)}
                    className="px-2 py-1 text-sm border border-gray-300 rounded focus:ring-2 focus:ring-primary-200"
                >
                    <option value="">Todos os funcionários</option>
                    {funcionarios.map(nome => (
                        <option key={nome} value={nome}>{nome}</option>
                    ))}
                </select>
            )}
        </div>
    );
}