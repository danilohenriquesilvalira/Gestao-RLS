// app/components/compartilhamento/PastaComponents.tsx
'use client';

import { useState } from 'react';
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
    Users
} from 'lucide-react';

interface PastaTreeViewProps {
    pastas: PastaCompartilhamento[];
    pastaAtual?: PastaCompartilhamento | null;
    onSelectPasta: (pasta: PastaCompartilhamento | null) => void;
    onEditPasta?: (pasta: PastaCompartilhamento) => void;
    onDeletePasta?: (pasta: PastaCompartilhamento) => void;
    isAdmin?: boolean;
}

export const PastaTreeView = ({ 
    pastas, 
    pastaAtual, 
    onSelectPasta, 
    onEditPasta, 
    onDeletePasta,
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

                {/* Actions */}
                {showActions && isAdmin && (
                    <div className="flex items-center space-x-1 ml-2 opacity-0 group-hover:opacity-100 transition-opacity">
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
                            isAdmin={isAdmin}
                        />
                    ))}
                </div>
            )}
        </div>
    );
};

// Modal para criar/editar pasta
interface PastaModalProps {
    pasta?: PastaCompartilhamento;
    parentePastas: PastaCompartilhamento[];
    isOpen: boolean;
    onClose: () => void;
    onSave: (data: any) => void;
}

export const PastaModal = ({ pasta, parentePastas, isOpen, onClose, onSave }: PastaModalProps) => {
    const [formData, setFormData] = useState({
        nome: pasta?.nome || '',
        descricao: pasta?.descricao || '',
        cor: pasta?.cor || '#3B82F6',
        icone: pasta?.icone || 'Folder',
        pasta_pai: pasta?.pasta_pai?.id || '',
        publico: pasta?.publico || false
    });

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

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-6 w-full max-w-md">
                <h3 className="text-lg font-bold mb-4">
                    {pasta ? 'Editar Pasta' : 'Nova Pasta'}
                </h3>

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium mb-1">Nome</label>
                        <input
                            type="text"
                            value={formData.nome}
                            onChange={(e) => setFormData({...formData, nome: e.target.value})}
                            className="w-full p-2 border rounded-lg"
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium mb-1">Descrição</label>
                        <textarea
                            value={formData.descricao}
                            onChange={(e) => setFormData({...formData, descricao: e.target.value})}
                            className="w-full p-2 border rounded-lg h-20"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium mb-1">Cor</label>
                        <div className="flex space-x-2">
                            {cores.map(cor => (
                                <button
                                    key={cor}
                                    type="button"
                                    className={`w-8 h-8 rounded-full ${formData.cor === cor ? 'ring-2 ring-gray-400' : ''}`}
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
                            className="w-full p-2 border rounded-lg"
                        >
                            <option value="">Pasta Raiz</option>
                            {parentePastas.map(p => (
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
                            className="mr-2"
                        />
                        <label htmlFor="publico" className="text-sm">Pasta pública</label>
                    </div>

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
                            className="flex-1 px-4 py-2 bg-primary-500 text-white rounded-lg hover:bg-primary-600"
                        >
                            {pasta ? 'Atualizar' : 'Criar'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};