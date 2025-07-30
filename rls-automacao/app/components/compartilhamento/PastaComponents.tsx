// app/components/compartilhamento/PastaComponents.tsx - CORRIGIDO
'use client';

import { useState, useEffect } from 'react';
import { PastaCompartilhamento } from '@/lib/pastaApi';
import { 
    Folder, 
    FolderOpen, 
    ChevronRight, 
    ChevronDown, 
    Plus,
    Edit,
    Trash2,
    Eye,
    Users
} from 'lucide-react';

interface PastaTreeViewProps {
    pastas: PastaCompartilhamento[];
    pastaAtual?: PastaCompartilhamento | null;
    onSelectPasta: (pasta: PastaCompartilhamento | null) => void;
    onEditPasta?: (pasta: PastaCompartilhamento) => void;
    onDeletePasta?: (pasta: PastaCompartilhamento) => void;
    onCreateSubpasta?: (pastaPai: PastaCompartilhamento) => void;
    isAdmin?: boolean;
}

export const PastaTreeView = ({ 
    pastas, 
    pastaAtual, 
    onSelectPasta, 
    onEditPasta, 
    onDeletePasta,
    onCreateSubpasta,
    isAdmin = false 
}: PastaTreeViewProps) => {
    return (
        <div className="space-y-1">
            {/* Pasta Raiz */}
            <PastaItem
                pasta={null}
                level={0}
                isSelected={!pastaAtual}
                pastaAtual={pastaAtual}
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
                    pastaAtual={pastaAtual}
                    onSelect={onSelectPasta}
                    onEdit={onEditPasta}
                    onDelete={onDeletePasta}
                    onCreateSubpasta={onCreateSubpasta}
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
    pastaAtual?: PastaCompartilhamento | null;
    onSelect: (pasta: PastaCompartilhamento | null) => void;
    onEdit?: (pasta: PastaCompartilhamento) => void;
    onDelete?: (pasta: PastaCompartilhamento) => void;
    onCreateSubpasta?: (pastaPai: PastaCompartilhamento) => void;
    isAdmin?: boolean;
    label?: string;
}

const PastaItem = ({ 
    pasta, 
    level, 
    isSelected, 
    pastaAtual,
    onSelect, 
    onEdit, 
    onDelete,
    onCreateSubpasta,
    isAdmin = false,
    label 
}: PastaItemProps) => {
    // EXPANSÃO BASEADA NA PASTA ATUAL - NÃO FECHA SOZINHA
    const isCurrentPath = pastaAtual?.id === pasta?.id || 
                         (pasta?.subpastas && pasta.subpastas.some(sub => sub.id === pastaAtual?.id));
    
    const [expanded, setExpanded] = useState(isCurrentPath);
    const [showActions, setShowActions] = useState(false);

    // ATUALIZA EXPANSÃO QUANDO MUDA PASTA ATUAL
    useEffect(() => {
        if (isCurrentPath) {
            setExpanded(true);
        }
    }, [isCurrentPath]);

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

    const handleCreateSubpasta = (e: React.MouseEvent) => {
        e.stopPropagation();
        if (pasta && onCreateSubpasta) {
            onCreateSubpasta(pasta);
        }
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

                {/* Actions - SEMPRE VISÍVEL COM + PARA SUBPASTA */}
                {isAdmin && (
                    <div className={`flex items-center space-x-1 ml-2 transition-opacity ${
                        showActions ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'
                    }`}>
                        {/* Botão + para criar subpasta */}
                        {onCreateSubpasta && (
                            <button
                                onClick={handleCreateSubpasta}
                                className="p-1 hover:bg-green-200 text-green-600 rounded"
                                title="Criar subpasta"
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
                                className="p-1 hover:bg-blue-200 text-blue-600 rounded"
                                title="Editar pasta"
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
                                title="Excluir pasta"
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
                            isSelected={pastaAtual?.id === subpasta.id}
                            pastaAtual={pastaAtual}
                            onSelect={onSelect}
                            onEdit={onEdit}
                            onDelete={onDelete}
                            onCreateSubpasta={onCreateSubpasta}
                            isAdmin={isAdmin}
                        />
                    ))}
                </div>
            )}
        </div>
    );
};

// Modal para criar/editar pasta - CORRIGIDO
interface PastaModalProps {
    pasta?: PastaCompartilhamento;
    pastaPai?: PastaCompartilhamento; // Nova prop para pasta pai pré-selecionada
    parentePastas: PastaCompartilhamento[];
    isOpen: boolean;
    onClose: () => void;
    onSave: (data: any) => Promise<void>;
}

export const PastaModal = ({ 
    pasta, 
    pastaPai, 
    parentePastas, 
    isOpen, 
    onClose, 
    onSave 
}: PastaModalProps) => {
    const [formData, setFormData] = useState({
        nome: pasta?.nome || '',
        descricao: pasta?.descricao || '',
        cor: pasta?.cor || '#3B82F6',
        icone: pasta?.icone || 'Folder',
        pasta_pai: pasta?.pasta_pai?.id || pastaPai?.id || '',
        publico: pasta?.publico || false
    });

    // Resetar form quando modal abre
    useEffect(() => {
        if (isOpen) {
            setFormData({
                nome: pasta?.nome || '',
                descricao: pasta?.descricao || '',
                cor: pasta?.cor || '#3B82F6',
                icone: pasta?.icone || 'Folder',
                pasta_pai: pasta?.pasta_pai?.id || pastaPai?.id || '',
                publico: pasta?.publico || false
            });
        }
    }, [isOpen, pasta, pastaPai]);

    const [loading, setLoading] = useState(false);

    const cores = [
        '#3B82F6', '#EF4444', '#10B981', '#F59E0B', 
        '#8B5CF6', '#EC4899', '#06B6D4', '#84CC16'
    ];

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        
        try {
            const data = {
                ...formData,
                pasta_pai: pastaPai ? pastaPai.id : (formData.pasta_pai ? Number(formData.pasta_pai) : null)
            };
            await onSave(data);
            
            // Reset form
            setFormData({
                nome: '',
                descricao: '',
                cor: '#3B82F6',
                icone: 'Folder',
                pasta_pai: '',
                publico: false
            });
            
            onClose();
        } catch (error) {
            console.error('Erro ao salvar pasta:', error);
        } finally {
            setLoading(false);
        }
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-6 w-full max-w-md">
                <h3 className="text-lg font-bold mb-4">
                    {pasta ? 'Editar Pasta' : pastaPai ? `Nova Subpasta em "${pastaPai.nome}"` : 'Nova Pasta'}
                </h3>

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium mb-1">Nome *</label>
                        <input
                            type="text"
                            value={formData.nome}
                            onChange={(e) => setFormData({...formData, nome: e.target.value})}
                            className="w-full p-2 border rounded-lg"
                            required
                            disabled={loading}
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium mb-1">Descrição</label>
                        <textarea
                            value={formData.descricao}
                            onChange={(e) => setFormData({...formData, descricao: e.target.value})}
                            className="w-full p-2 border rounded-lg h-20 resize-none"
                            disabled={loading}
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
                                    disabled={loading}
                                />
                            ))}
                        </div>
                    </div>

                    {/* PASTA PAI - CORRIGIDO PARA SUBPASTA */}
                    <div>
                        <label className="block text-sm font-medium mb-1">Pasta Pai</label>
                        {pastaPai ? (
                            // SE É SUBPASTA - CAMPO FIXO
                            <div className="w-full p-2 border rounded-lg bg-gray-100">
                                <span className="text-gray-700">{pastaPai.nome}</span>
                                <input type="hidden" value={pastaPai.id} />
                            </div>
                        ) : (
                            // SE É PASTA NORMAL - SELECT
                            <select
                                value={formData.pasta_pai}
                                onChange={(e) => setFormData({...formData, pasta_pai: e.target.value})}
                                className="w-full p-2 border rounded-lg"
                                disabled={loading}
                            >
                                <option value="">Pasta Raiz</option>
                                {parentePastas.map(p => (
                                    <option key={p.id} value={p.id}>{p.nome}</option>
                                ))}
                            </select>
                        )}
                        {pastaPai && (
                            <p className="text-xs text-green-600 mt-1 font-medium">
                                ✓ Subpasta será criada em "{pastaPai.nome}"
                            </p>
                        )}
                    </div>

                    <div className="flex items-center">
                        <input
                            type="checkbox"
                            id="publico"
                            checked={formData.publico}
                            onChange={(e) => setFormData({...formData, publico: e.target.checked})}
                            className="mr-2"
                            disabled={loading}
                        />
                        <label htmlFor="publico" className="text-sm">Pasta pública</label>
                    </div>

                    <div className="flex space-x-3 pt-4">
                        <button
                            type="button"
                            onClick={onClose}
                            className="flex-1 px-4 py-2 text-gray-600 border rounded-lg hover:bg-gray-50"
                            disabled={loading}
                        >
                            Cancelar
                        </button>
                        <button
                            type="submit"
                            className="flex-1 px-4 py-2 bg-primary-500 text-white rounded-lg hover:bg-primary-600 disabled:opacity-50"
                            disabled={loading}
                        >
                            {loading ? 'Salvando...' : pasta ? 'Atualizar' : 'Criar'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};