// app/components/compartilhamento/PastaComponents.tsx - MELHORADO
'use client';

import { useState, useEffect } from 'react';
import { PastaCompartilhamento } from '@/lib/pastaApi';
import { 
    Folder, 
    FolderOpen, 
    ChevronRight, 
    ChevronDown, 
    Plus,
    MoreVertical,
    Edit,
    Trash2,
    Eye,
    EyeOff,
    Users,
    X,
    Save
} from 'lucide-react';

interface PastaTreeViewProps {
    pastas: PastaCompartilhamento[];
    pastaAtual?: PastaCompartilhamento | null;
    onSelectPasta: (pasta: PastaCompartilhamento | null) => void;
    onEditPasta?: (pasta: PastaCompartilhamento) => void;
    onDeletePasta?: (pasta: PastaCompartilhamento) => void;
    onCreateSubpasta?: (pastaPai: PastaCompartilhamento) => void; // NOVO
    isAdmin?: boolean;
}

export const PastaTreeView = ({ 
    pastas, 
    pastaAtual, 
    onSelectPasta, 
    onEditPasta, 
    onDeletePasta,
    onCreateSubpasta, // NOVO
    isAdmin = false 
}: PastaTreeViewProps) => {
    return (
        <div className="space-y-1">
            {/* Pasta Raiz */}
            <PastaItem
                pasta={null}
                level={0}
                isSelected={!pastaAtual}
                onSelect={() => onSelectPasta(null)}
                label="📁 Todos os Arquivos"
            />
            
            {/* Pastas */}
            {pastas.map(pasta => (
                <PastaItem
                    key={pasta.id}
                    pasta={pasta}
                    level={0}
                    isSelected={pastaAtual?.id === pasta.id}
                    onSelect={onSelectPasta}
                    onEdit={onEditPasta}
                    onDelete={onDeletePasta}
                    onCreateSubpasta={onCreateSubpasta} // NOVO
                    isAdmin={isAdmin}
                />
            ))}
        </div>
    );
};

interface PastaItemProps {
    pasta: PastaCompartilhamento | null;
    level: number;
    isSelected: boolean;
    onSelect: (pasta: PastaCompartilhamento | null) => void;
    onEdit?: (pasta: PastaCompartilhamento) => void;
    onDelete?: (pasta: PastaCompartilhamento) => void;
    onCreateSubpasta?: (pastaPai: PastaCompartilhamento) => void; // NOVO
    isAdmin?: boolean;
    label?: string;
}

const PastaItem = ({ 
    pasta, 
    level, 
    isSelected, 
    onSelect, 
    onEdit, 
    onDelete,
    onCreateSubpasta, // NOVO
    isAdmin = false,
    label 
}: PastaItemProps) => {
    const [expanded, setExpanded] = useState(true);
    const [showActions, setShowActions] = useState(false);

    const hasSubpastas = pasta?.subpastas && pasta.subpastas.length > 0;
    const paddingLeft = level * 16;

    const handleToggle = (e: React.MouseEvent) => {
        e.stopPropagation();
        if (hasSubpastas) {
            setExpanded(!expanded);
        }
    };

    const handleSelect = () => {
        onSelect(pasta);
    };

    // Pasta raiz
    if (!pasta) {
        return (
            <div
                className={`flex items-center p-2 rounded-lg cursor-pointer transition-colors ${
                    isSelected ? 'bg-primary-100 text-primary-700' : 'hover:bg-gray-100'
                }`}
                onClick={handleSelect}
            >
                <span className="text-sm font-medium">{label}</span>
            </div>
        );
    }

    return (
        <div>
            <div
                className={`flex items-center p-2 rounded-lg cursor-pointer transition-colors group ${
                    isSelected ? 'bg-primary-100 text-primary-700' : 'hover:bg-gray-100'
                }`}
                style={{ paddingLeft: `${paddingLeft + 8}px` }}
                onClick={handleSelect}
                onMouseEnter={() => setShowActions(true)}
                onMouseLeave={() => setShowActions(false)}
            >
                {/* Expand/Collapse */}
                <button
                    onClick={handleToggle}
                    className="w-4 h-4 mr-1 flex items-center justify-center opacity-70 hover:opacity-100"
                >
                    {hasSubpastas ? (
                        expanded ? <ChevronDown className="w-3 h-3" /> : <ChevronRight className="w-3 h-3" />
                    ) : (
                        <div className="w-3 h-3" />
                    )}
                </button>

                {/* Ícone */}
                <div className="w-4 h-4 mr-2 flex items-center justify-center">
                    {expanded && hasSubpastas ? (
                        <FolderOpen 
                            className="w-4 h-4" 
                            style={{ color: pasta.cor }} 
                        />
                    ) : (
                        <Folder 
                            className="w-4 h-4" 
                            style={{ color: pasta.cor }} 
                        />
                    )}
                </div>

                {/* Nome */}
                <span className="text-sm font-medium flex-1 truncate">
                    {pasta.nome}
                </span>

                {/* Indicadores */}
                <div className="flex items-center space-x-1 ml-2">
                    {pasta.publico ? (
                        <Users className="w-3 h-3 text-green-500" />
                    ) : (
                        <Eye className="w-3 h-3 text-gray-400" />
                    )}
                </div>

                {/* Actions - MELHORADO */}
                {showActions && isAdmin && (
                    <div className="flex items-center space-x-1 ml-2 opacity-0 group-hover:opacity-100 transition-opacity">
                        {/* BOTÃO + PARA SUBPASTA */}
                        {onCreateSubpasta && (
                            <button
                                onClick={(e) => {
                                    e.stopPropagation();
                                    onCreateSubpasta(pasta);
                                }}
                                className="p-1 hover:bg-green-200 text-green-600 rounded"
                                title={`Criar subpasta em ${pasta.nome}`}
                            >
                                <Plus className="w-3 h-3" />
                            </button>
                        )}
                        
                        {onEdit && (
                            <button
                                onClick={(e) => {
                                    e.stopPropagation();
                                    onEdit(pasta);
                                }}
                                className="p-1 hover:bg-gray-200 rounded"
                            >
                                <Edit className="w-3 h-3" />
                            </button>
                        )}
                        {onDelete && (
                            <button
                                onClick={(e) => {
                                    e.stopPropagation();
                                    onDelete(pasta);
                                }}
                                className="p-1 hover:bg-red-200 text-red-600 rounded"
                            >
                                <Trash2 className="w-3 h-3" />
                            </button>
                        )}
                    </div>
                )}
            </div>

            {/* Subpastas */}
            {hasSubpastas && expanded && (
                <div>
                    {pasta.subpastas!.map(subpasta => (
                        <PastaItem
                            key={subpasta.id}
                            pasta={subpasta}
                            level={level + 1}
                            isSelected={false}
                            onSelect={onSelect}
                            onEdit={onEdit}
                            onDelete={onDelete}
                            onCreateSubpasta={onCreateSubpasta} // NOVO
                            isAdmin={isAdmin}
                        />
                    ))}
                </div>
            )}
        </div>
    );
};

// Modal para criar/editar pasta - MELHORADO
interface PastaModalProps {
    pasta?: PastaCompartilhamento;
    parentePastas: PastaCompartilhamento[];
    pastaPai?: PastaCompartilhamento | null; // NOVO - pasta específica para ser pai
    isOpen: boolean;
    onClose: () => void;
    onSave: (data: any) => void;
}

export const PastaModal = ({ 
    pasta, 
    parentePastas, 
    pastaPai, // NOVO
    isOpen, 
    onClose, 
    onSave 
}: PastaModalProps) => {
    const [formData, setFormData] = useState({
        nome: '',
        descricao: '',
        cor: '#3B82F6',
        icone: 'Folder',
        pasta_pai: '',
        publico: false
    });

    // RESET FORM quando modal abre - MELHORADO
    useEffect(() => {
        if (isOpen) {
            if (pasta) {
                // Editando pasta existente
                setFormData({
                    nome: pasta.nome || '',
                    descricao: pasta.descricao || '',
                    cor: pasta.cor || '#3B82F6',
                    icone: pasta.icone || 'Folder',
                    pasta_pai: pasta.pasta_pai?.id?.toString() || '',
                    publico: pasta.publico || false
                });
            } else {
                // Nova pasta - usar pastaPai se especificado
                setFormData({
                    nome: '',
                    descricao: '',
                    cor: '#3B82F6',
                    icone: 'Folder',
                    pasta_pai: pastaPai?.id?.toString() || '', // USAR PASTA PAI ESPECÍFICA
                    publico: false
                });
            }
        }
    }, [isOpen, pasta, pastaPai]);

    const cores = [
        '#3B82F6', '#EF4444', '#10B981', '#F59E0B', 
        '#8B5CF6', '#EC4899', '#06B6D4', '#84CC16'
    ];

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const data = {
            ...formData,
            pasta_pai: formData.pasta_pai ? Number(formData.pasta_pai) : null
        };
        onSave(data);
        onClose();
    };

    if (!isOpen) return null;

    // Filtrar pastas pais (não incluir a pasta sendo editada)
    const pastasPaisDisponiveis = parentePastas.filter(p => p.id !== pasta?.id);

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-lg shadow-xl w-full max-w-md">
                {/* Header */}
                <div className="flex justify-between items-center p-4 border-b">
                    <h3 className="text-lg font-semibold">
                        {pasta ? 'Editar Pasta' : 'Nova Pasta'}
                    </h3>
                    <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
                        <X className="w-5 h-5" />
                    </button>
                </div>

                <form onSubmit={handleSubmit} className="p-4 space-y-4">
                    <div>
                        <label className="block text-sm font-medium mb-1">Nome *</label>
                        <input
                            type="text"
                            value={formData.nome}
                            onChange={(e) => setFormData({...formData, nome: e.target.value})}
                            className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-primary-500"
                            placeholder="Nome da pasta"
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium mb-1">Descrição</label>
                        <textarea
                            value={formData.descricao}
                            onChange={(e) => setFormData({...formData, descricao: e.target.value})}
                            className="w-full p-2 border rounded-lg h-20 focus:ring-2 focus:ring-primary-500"
                            placeholder="Descrição da pasta"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium mb-1">Cor</label>
                        <div className="flex space-x-2">
                            {cores.map(cor => (
                                <button
                                    key={cor}
                                    type="button"
                                    className={`w-8 h-8 rounded-full transition-all ${
                                        formData.cor === cor ? 'ring-2 ring-primary-400 scale-110' : 'hover:scale-105'
                                    }`}
                                    style={{ backgroundColor: cor }}
                                    onClick={() => setFormData({...formData, cor})}
                                />
                            ))}
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-medium mb-1">Pasta Pai</label>
                        <select
                            value={formData.pasta_pai}
                            onChange={(e) => setFormData({...formData, pasta_pai: e.target.value})}
                            className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-primary-500"
                        >
                            <option value="">Pasta Raiz</option>
                            {pastasPaisDisponiveis.map(p => (
                                <option key={p.id} value={p.id}>{p.nome}</option>
                            ))}
                        </select>
                    </div>

                    <div className="flex items-center">
                        <input
                            type="checkbox"
                            id="publico"
                            checked={formData.publico}
                            onChange={(e) => setFormData({...formData, publico: e.target.checked})}
                            className="mr-2 rounded border-gray-300 text-primary-600 focus:ring-primary-500"
                        />
                        <label htmlFor="publico" className="text-sm">Pasta pública</label>
                    </div>

                    {/* Preview da localização - NOVO */}
                    {!pasta && (
                        <div className="bg-blue-50 p-3 rounded-lg">
                            <p className="text-sm text-blue-700">
                                <strong>Será criada em:</strong> {
                                    pastaPai?.nome || 
                                    pastasPaisDisponiveis.find(p => p.id.toString() === formData.pasta_pai)?.nome || 
                                    'Pasta Raiz'
                                }
                            </p>
                        </div>
                    )}

                    <div className="flex space-x-3 pt-4">
                        <button
                            type="button"
                            onClick={onClose}
                            className="flex-1 px-4 py-2 text-gray-600 border rounded-lg hover:bg-gray-50"
                        >
                            Cancelar
                        </button>
                        <button
                            type="submit"
                            disabled={!formData.nome.trim()}
                            className="flex-1 px-4 py-2 bg-primary-500 text-white rounded-lg hover:bg-primary-600 disabled:opacity-50 flex items-center justify-center"
                        >
                            <Save className="w-4 h-4 mr-2" />
                            {pasta ? 'Atualizar' : 'Criar'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};