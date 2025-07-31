<<<<<<< HEAD
// app/components/compartilhamento/PastaComponents.tsx - MELHORADO
=======
// app/components/compartilhamento/PastaComponents.tsx - CORRIGIDO
>>>>>>> 4cf0e25e8448e95e3242d17810777c3ded133477
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
<<<<<<< HEAD
    EyeOff,
    Users,
    X,
    Save
=======
    Users
>>>>>>> 4cf0e25e8448e95e3242d17810777c3ded133477
} from 'lucide-react';

interface PastaTreeViewProps {
    pastas: PastaCompartilhamento[];
    pastaAtual?: PastaCompartilhamento | null;
    onSelectPasta: (pasta: PastaCompartilhamento | null) => void;
    onEditPasta?: (pasta: PastaCompartilhamento) => void;
    onDeletePasta?: (pasta: PastaCompartilhamento) => void;
<<<<<<< HEAD
    onCreateSubpasta?: (pastaPai: PastaCompartilhamento) => void; // NOVO
=======
    onCreateSubpasta?: (pastaPai: PastaCompartilhamento) => void;
>>>>>>> 4cf0e25e8448e95e3242d17810777c3ded133477
    isAdmin?: boolean;
}

export const PastaTreeView = ({ 
    pastas, 
    pastaAtual, 
    onSelectPasta, 
    onEditPasta, 
    onDeletePasta,
<<<<<<< HEAD
    onCreateSubpasta, // NOVO
=======
    onCreateSubpasta,
>>>>>>> 4cf0e25e8448e95e3242d17810777c3ded133477
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
<<<<<<< HEAD
                    onCreateSubpasta={onCreateSubpasta} // NOVO
=======
                    onCreateSubpasta={onCreateSubpasta}
>>>>>>> 4cf0e25e8448e95e3242d17810777c3ded133477
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
<<<<<<< HEAD
    onCreateSubpasta?: (pastaPai: PastaCompartilhamento) => void; // NOVO
=======
    onCreateSubpasta?: (pastaPai: PastaCompartilhamento) => void;
>>>>>>> 4cf0e25e8448e95e3242d17810777c3ded133477
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
<<<<<<< HEAD
    onCreateSubpasta, // NOVO
=======
    onCreateSubpasta,
>>>>>>> 4cf0e25e8448e95e3242d17810777c3ded133477
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

<<<<<<< HEAD
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
=======
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
>>>>>>> 4cf0e25e8448e95e3242d17810777c3ded133477
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
<<<<<<< HEAD
                            onCreateSubpasta={onCreateSubpasta} // NOVO
=======
                            onCreateSubpasta={onCreateSubpasta}
>>>>>>> 4cf0e25e8448e95e3242d17810777c3ded133477
                            isAdmin={isAdmin}
                        />
                    ))}
                </div>
            )}
        </div>
    );
};

<<<<<<< HEAD
// Modal para criar/editar pasta - MELHORADO
=======
// Modal para criar/editar pasta - CORRIGIDO
>>>>>>> 4cf0e25e8448e95e3242d17810777c3ded133477
interface PastaModalProps {
    pasta?: PastaCompartilhamento;
    pastaPai?: PastaCompartilhamento; // Nova prop para pasta pai pré-selecionada
    parentePastas: PastaCompartilhamento[];
    pastaPai?: PastaCompartilhamento | null; // NOVO - pasta específica para ser pai
    isOpen: boolean;
    onClose: () => void;
    onSave: (data: any) => Promise<void>;
}

export const PastaModal = ({ 
    pasta, 
<<<<<<< HEAD
    parentePastas, 
    pastaPai, // NOVO
=======
    pastaPai, 
    parentePastas, 
>>>>>>> 4cf0e25e8448e95e3242d17810777c3ded133477
    isOpen, 
    onClose, 
    onSave 
}: PastaModalProps) => {
    const [formData, setFormData] = useState({
<<<<<<< HEAD
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

=======
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

>>>>>>> 4cf0e25e8448e95e3242d17810777c3ded133477
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

<<<<<<< HEAD
    // Filtrar pastas pais (não incluir a pasta sendo editada)
    const pastasPaisDisponiveis = parentePastas.filter(p => p.id !== pasta?.id);
=======
    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-6 w-full max-w-md">
                <h3 className="text-lg font-bold mb-4">
                    {pasta ? 'Editar Pasta' : pastaPai ? `Nova Subpasta em "${pastaPai.nome}"` : 'Nova Pasta'}
                </h3>
>>>>>>> 4cf0e25e8448e95e3242d17810777c3ded133477

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
                            disabled={loading}
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium mb-1">Descrição</label>
                        <textarea
                            value={formData.descricao}
                            onChange={(e) => setFormData({...formData, descricao: e.target.value})}
<<<<<<< HEAD
                            className="w-full p-2 border rounded-lg h-20 focus:ring-2 focus:ring-primary-500"
                            placeholder="Descrição da pasta"
=======
                            className="w-full p-2 border rounded-lg h-20 resize-none"
                            disabled={loading}
>>>>>>> 4cf0e25e8448e95e3242d17810777c3ded133477
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
                                    disabled={loading}
                                />
                            ))}
                        </div>
                    </div>

                    {/* PASTA PAI - CORRIGIDO PARA SUBPASTA */}
                    <div>
                        <label className="block text-sm font-medium mb-1">Pasta Pai</label>
<<<<<<< HEAD
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
=======
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
>>>>>>> 4cf0e25e8448e95e3242d17810777c3ded133477
                    </div>

                    <div className="flex items-center">
                        <input
                            type="checkbox"
                            id="publico"
                            checked={formData.publico}
                            onChange={(e) => setFormData({...formData, publico: e.target.checked})}
<<<<<<< HEAD
                            className="mr-2 rounded border-gray-300 text-primary-600 focus:ring-primary-500"
=======
                            className="mr-2"
                            disabled={loading}
>>>>>>> 4cf0e25e8448e95e3242d17810777c3ded133477
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
                            disabled={loading}
                        >
                            Cancelar
                        </button>
                        <button
                            type="submit"
<<<<<<< HEAD
                            disabled={!formData.nome.trim()}
                            className="flex-1 px-4 py-2 bg-primary-500 text-white rounded-lg hover:bg-primary-600 disabled:opacity-50 flex items-center justify-center"
                        >
                            <Save className="w-4 h-4 mr-2" />
                            {pasta ? 'Atualizar' : 'Criar'}
=======
                            className="flex-1 px-4 py-2 bg-primary-500 text-white rounded-lg hover:bg-primary-600 disabled:opacity-50"
                            disabled={loading}
                        >
                            {loading ? 'Salvando...' : pasta ? 'Atualizar' : 'Criar'}
>>>>>>> 4cf0e25e8448e95e3242d17810777c3ded133477
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};