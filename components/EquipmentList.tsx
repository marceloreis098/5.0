
import React, { useState, useEffect, useMemo } from 'react';
import { Equipment, User, UserRole, EquipmentHistory } from '../types';
import { getEquipment, addEquipment, updateEquipment, deleteEquipment, getEquipmentHistory } from '../services/apiService';
import Icon from './common/Icon';
import TermoResponsabilidade from './TermoResponsabilidade';

interface EquipmentFormModalProps {
    equipment: Equipment | null;
    onClose: () => void;
    onSave: () => void;
    currentUser: User;
}

const EquipmentFormModal: React.FC<EquipmentFormModalProps> = ({ equipment, onClose, onSave, currentUser }) => {
    const [formData, setFormData] = useState<Partial<Equipment>>({
        equipamento: '',
        garantia: '',
        patrimonio: '',
        serial: '',
        usuarioAtual: '',
        local: '',
        setor: '',
        dataEntregaUsuario: '',
        status: 'Estoque',
        tipo: '',
        notaCompra: '',
        notaPlKm: '',
        brand: '',
        model: '',
        observacoes: '',
        emailColaborador: '',
        condicaoTermo: 'N/A'
    });
    const [isSaving, setIsSaving] = useState(false);
    const [saveError, setSaveError] = useState('');

    useEffect(() => {
        if (equipment) {
            setFormData({
                ...equipment,
                dataEntregaUsuario: equipment.dataEntregaUsuario ? equipment.dataEntregaUsuario.split('T')[0] : '',
                dataDevolucao: equipment.dataDevolucao ? equipment.dataDevolucao.split('T')[0] : ''
            });
        }
    }, [equipment]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSaving(true);
        setSaveError('');

        // Basic validation for required fields
        if (!formData.equipamento || !formData.serial) {
            setSaveError('Equipamento e Serial são campos obrigatórios.');
            setIsSaving(false);
            return;
        }

        try {
            if (equipment) {
                await updateEquipment({ ...formData, id: equipment.id } as Equipment, currentUser.username);
            } else {
                await addEquipment(formData as any, currentUser);
                if (currentUser.role !== UserRole.Admin) {
                    alert("Equipamento adicionado com sucesso! Sua solicitação foi enviada para aprovação do administrador.");
                }
            }
            onSave();
            onClose();
        } catch (error: any) {
            console.error("Failed to save equipment", error);
            let message = error.message || "Falha ao salvar equipamento. Tente novamente.";
            if (error instanceof TypeError && message === 'Failed to fetch') {
                message = "Erro de conexão com o servidor. Verifique se a API está online.";
            }
            setSaveError(message);
        } finally {
            setIsSaving(false);
        }
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-start sm:items-center z-50 p-4 overflow-y-auto">
            <form onSubmit={handleSubmit} className="bg-white dark:bg-dark-card rounded-lg shadow-xl w-full max-w-4xl flex flex-col max-h-[90vh]">
                <div className="p-6 border-b dark:border-dark-border flex-shrink-0">
                    <h3 className="text-xl font-bold text-brand-dark dark:text-dark-text-primary">{equipment ? 'Editar Equipamento' : 'Novo Equipamento'}</h3>
                </div>
                <div className="p-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 overflow-y-auto">
                    {saveError && <div className="sm:col-span-3 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">{saveError}</div>}

                    <input type="text" name="equipamento" placeholder="Nome do Equipamento *" value={formData.equipamento || ''} onChange={handleChange} className="p-2 border dark:border-dark-border rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-dark-text-primary" required />
                    <input type="text" name="serial" placeholder="Número de Série *" value={formData.serial || ''} onChange={handleChange} className="p-2 border dark:border-dark-border rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-dark-text-primary" required />
                    <input type="text" name="patrimonio" placeholder="Patrimônio" value={formData.patrimonio || ''} onChange={handleChange} className="p-2 border dark:border-dark-border rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-dark-text-primary" />
                    
                    <input type="text" name="brand" placeholder="Marca" value={formData.brand || ''} onChange={handleChange} className="p-2 border dark:border-dark-border rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-dark-text-primary" />
                    <input type="text" name="model" placeholder="Modelo" value={formData.model || ''} onChange={handleChange} className="p-2 border dark:border-dark-border rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-dark-text-primary" />
                    <input type="text" name="tipo" placeholder="Tipo (Ex: Notebook, Monitor)" value={formData.tipo || ''} onChange={handleChange} className="p-2 border dark:border-dark-border rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-dark-text-primary" />

                    <div className="sm:col-span-3 border-t dark:border-dark-border my-2"></div>

                    <input type="text" name="usuarioAtual" placeholder="Usuário Atual" value={formData.usuarioAtual || ''} onChange={handleChange} className="p-2 border dark:border-dark-border rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-dark-text-primary" />
                    <input type="text" name="setor" placeholder="Setor" value={formData.setor || ''} onChange={handleChange} className="p-2 border dark:border-dark-border rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-dark-text-primary" />
                    <input type="text" name="local" placeholder="Local" value={formData.local || ''} onChange={handleChange} className="p-2 border dark:border-dark-border rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-dark-text-primary" />
                     <input type="email" name="emailColaborador" placeholder="E-mail do Colaborador" value={formData.emailColaborador || ''} onChange={handleChange} className="p-2 border dark:border-dark-border rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-dark-text-primary" />

                    <div className="flex flex-col">
                         <label className="text-xs text-gray-500 dark:text-gray-400 mb-1">Status</label>
                        <select name="status" value={formData.status || ''} onChange={handleChange} className="p-2 border dark:border-dark-border rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-dark-text-primary">
                            <option value="Estoque">Estoque</option>
                            <option value="Em Uso">Em Uso</option>
                            <option value="Manutenção">Manutenção</option>
                            <option value="Descartado">Descartado</option>
                        </select>
                    </div>
                     <div className="flex flex-col">
                         <label className="text-xs text-gray-500 dark:text-gray-400 mb-1">Condição do Termo</label>
                        <select name="condicaoTermo" value={formData.condicaoTermo || 'N/A'} onChange={handleChange} className="p-2 border dark:border-dark-border rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-dark-text-primary">
                            <option value="N/A">N/A</option>
                            <option value="Pendente">Pendente</option>
                            <option value="Assinado - Entrega">Assinado - Entrega</option>
                            <option value="Assinado - Devolução">Assinado - Devolução</option>
                        </select>
                    </div>

                    <div className="flex flex-col">
                         <label className="text-xs text-gray-500 dark:text-gray-400 mb-1">Data Entrega</label>
                        <input type="date" name="dataEntregaUsuario" value={formData.dataEntregaUsuario || ''} onChange={handleChange} className="p-2 border dark:border-dark-border rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-dark-text-primary" />
                    </div>

                     <div className="sm:col-span-3 border-t dark:border-dark-border my-2"></div>

                    <input type="text" name="notaCompra" placeholder="Nota Fiscal" value={formData.notaCompra || ''} onChange={handleChange} className="p-2 border dark:border-dark-border rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-dark-text-primary" />
                    <input type="text" name="garantia" placeholder="Garantia" value={formData.garantia || ''} onChange={handleChange} className="p-2 border dark:border-dark-border rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-dark-text-primary" />
                    <textarea name="observacoes" placeholder="Observações" value={formData.observacoes || ''} onChange={handleChange} className="sm:col-span-3 p-2 border dark:border-dark-border rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-dark-text-primary" rows={3} />
                </div>
                <div className="p-4 bg-gray-50 dark:bg-dark-card/50 border-t dark:border-dark-border flex justify-end gap-3 flex-shrink-0">
                    <button type="button" onClick={onClose} className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600">Cancelar</button>
                    <button type="submit" disabled={isSaving} className="bg-brand-primary text-white px-4 py-2 rounded hover:bg-blue-700 disabled:bg-gray-400">
                        {isSaving ? 'Salvando...' : 'Salvar'}
                    </button>
                </div>
            </form>
        </div>
    );
};

const HistoryModal: React.FC<{ equipmentId: number; onClose: () => void }> = ({ equipmentId, onClose }) => {
    const [history, setHistory] = useState<EquipmentHistory[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchHistory = async () => {
            setLoading(true);
            try {
                const data = await getEquipmentHistory(equipmentId);
                setHistory(data);
            } catch (error) {
                console.error("Failed to fetch history", error);
            } finally {
                setLoading(false);
            }
        };
        fetchHistory();
    }, [equipmentId]);

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-[60] p-4">
            <div className="bg-white dark:bg-dark-card rounded-lg shadow-xl w-full max-w-2xl max-h-[80vh] flex flex-col">
                <div className="p-6 border-b dark:border-dark-border flex justify-between items-center">
                    <h3 className="text-xl font-bold text-brand-dark dark:text-dark-text-primary">Histórico de Alterações</h3>
                    <button onClick={onClose} className="text-gray-500 hover:text-gray-800 dark:text-gray-400 dark:hover:text-white"><Icon name="X" size={24} /></button>
                </div>
                <div className="p-6 overflow-y-auto">
                    {loading ? (
                        <div className="flex justify-center"><Icon name="LoaderCircle" className="animate-spin text-brand-primary" size={32} /></div>
                    ) : history.length === 0 ? (
                        <p className="text-center text-gray-500 dark:text-dark-text-secondary">Nenhum histórico encontrado.</p>
                    ) : (
                        <ul className="space-y-4">
                            {history.map(entry => (
                                <li key={entry.id} className="border-b dark:border-dark-border last:border-0 pb-2">
                                    <div className="flex justify-between text-sm text-gray-500 dark:text-dark-text-secondary">
                                        <span>{new Date(entry.timestamp).toLocaleString('pt-BR')}</span>
                                        <span className="font-semibold">{entry.changedBy}</span>
                                    </div>
                                    <p className="text-gray-800 dark:text-dark-text-primary mt-1">
                                        Alterou <strong>{entry.changeType}</strong>: 
                                        <span className="text-red-500 line-through mx-2">{entry.from_value || '(vazio)'}</span>
                                        <Icon name="ArrowRight" size={12} className="inline text-gray-400" />
                                        <span className="text-green-500 mx-2">{entry.to_value || '(vazio)'}</span>
                                    </p>
                                </li>
                            ))}
                        </ul>
                    )}
                </div>
            </div>
        </div>
    );
};

interface EquipmentListProps {
    currentUser: User;
    companyName: string;
}

const EquipmentList: React.FC<EquipmentListProps> = ({ currentUser, companyName }) => {
    const [equipment, setEquipment] = useState<Equipment[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isHistoryModalOpen, setIsHistoryModalOpen] = useState(false);
    const [isTermoModalOpen, setIsTermoModalOpen] = useState(false);
    const [termoType, setTermoType] = useState<'entrega' | 'devolucao'>('entrega');
    const [editingEquipment, setEditingEquipment] = useState<Equipment | null>(null);
    const [selectedHistoryId, setSelectedHistoryId] = useState<number | null>(null);
    const [selectedEquipmentForTermo, setSelectedEquipmentForTermo] = useState<Equipment | null>(null);

    const fetchData = async () => {
        setLoading(true);
        try {
            const data = await getEquipment(currentUser);
            setEquipment(data);
        } catch (error) {
            console.error("Failed to load equipment", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, [currentUser]);

    const handleOpenModal = (equip: Equipment | null = null) => {
        setEditingEquipment(equip);
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setEditingEquipment(null);
        setIsModalOpen(false);
    };

    const handleSave = () => {
        fetchData();
    };

    const handleDelete = async (id: number) => {
        if (currentUser.role !== UserRole.Admin) return;
        if (window.confirm("Tem certeza que deseja excluir este equipamento?")) {
            try {
                await deleteEquipment(id, currentUser.username);
                fetchData();
            } catch (error) {
                console.error("Failed to delete equipment", error);
            }
        }
    };

    const handleOpenHistory = (id: number) => {
        setSelectedHistoryId(id);
        setIsHistoryModalOpen(true);
    };

    const handleOpenTermo = (equip: Equipment, type: 'entrega' | 'devolucao') => {
        setSelectedEquipmentForTermo(equip);
        setTermoType(type);
        setIsTermoModalOpen(true);
    };

    const filteredEquipment = useMemo(() => {
        return equipment.filter(item => 
            item.equipamento.toLowerCase().includes(searchTerm.toLowerCase()) ||
            (item.serial && item.serial.toLowerCase().includes(searchTerm.toLowerCase())) ||
            (item.usuarioAtual && item.usuarioAtual.toLowerCase().includes(searchTerm.toLowerCase())) ||
            (item.patrimonio && item.patrimonio.toLowerCase().includes(searchTerm.toLowerCase()))
        );
    }, [equipment, searchTerm]);

    return (
        <div className="bg-white dark:bg-dark-card p-4 sm:p-6 rounded-lg shadow-md">
             <div className="flex flex-col sm:flex-row justify-between sm:items-center mb-4 gap-4">
                <h2 className="text-2xl font-bold text-brand-dark dark:text-dark-text-primary">Inventário de Equipamentos</h2>
                <button onClick={() => handleOpenModal()} className="bg-brand-primary text-white px-4 py-2 rounded-lg hover:bg-blue-700 flex items-center gap-2 self-start sm:self-center">
                    <Icon name="CirclePlus" size={18}/> Novo Equipamento
                </button>
            </div>

            <div className="mb-4">
                <input
                    type="text"
                    placeholder="Buscar por nome, serial, usuário ou patrimônio..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full p-2 border dark:border-dark-border rounded-md bg-white dark:bg-gray-800 text-gray-800 dark:text-dark-text-primary"
                />
            </div>

            {loading ? (
                <div className="flex justify-center items-center py-10">
                    <Icon name="LoaderCircle" className="animate-spin text-brand-primary" size={48} />
                </div>
            ) : (
                 <div className="overflow-x-auto">
                    <table className="w-full text-sm text-left text-gray-700 dark:text-dark-text-secondary">
                        <thead className="text-xs text-gray-800 dark:text-dark-text-primary uppercase bg-gray-100 dark:bg-gray-900/50">
                            <tr>
                                <th className="px-4 py-3">Equipamento</th>
                                <th className="px-4 py-3">Serial</th>
                                <th className="px-4 py-3">Patrimônio</th>
                                <th className="px-4 py-3">Usuário</th>
                                <th className="px-4 py-3">Status</th>
                                <th className="px-4 py-3 text-center">Ações</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredEquipment.map(item => (
                                <tr key={item.id} className={`border-b dark:border-dark-border hover:bg-gray-50 dark:hover:bg-gray-700 ${item.approval_status === 'pending_approval' ? 'bg-yellow-50 dark:bg-yellow-900/20' : ''}`}>
                                    <td className="px-4 py-3 font-medium text-gray-900 dark:text-dark-text-primary">{item.equipamento}</td>
                                    <td className="px-4 py-3">{item.serial}</td>
                                    <td className="px-4 py-3">{item.patrimonio}</td>
                                    <td className="px-4 py-3">{item.usuarioAtual}</td>
                                    <td className="px-4 py-3">
                                        <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
                                            item.status === 'Em Uso' ? 'bg-green-100 text-green-800' : 
                                            item.status === 'Manutenção' ? 'bg-yellow-100 text-yellow-800' : 'bg-gray-100 text-gray-800'
                                        }`}>
                                            {item.status || 'Indefinido'}
                                        </span>
                                        {item.approval_status === 'pending_approval' && (
                                            <span className="ml-2 px-2 py-1 rounded-full text-xs font-semibold bg-orange-100 text-orange-800" title="Aguardando aprovação">
                                                Pendente
                                            </span>
                                        )}
                                         {item.approval_status === 'rejected' && (
                                            <span className="ml-2 px-2 py-1 rounded-full text-xs font-semibold bg-red-100 text-red-800" title={`Rejeitado: ${item.rejection_reason}`}>
                                                Rejeitado
                                            </span>
                                        )}
                                    </td>
                                    <td className="px-4 py-3 flex justify-center gap-2">
                                        <button onClick={() => handleOpenModal(item)} className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300" title="Editar"><Icon name="Pencil" size={16}/></button>
                                        <button onClick={() => handleOpenHistory(item.id)} className="text-gray-600 hover:text-gray-800 dark:text-gray-400 dark:hover:text-gray-200" title="Histórico"><Icon name="History" size={16}/></button>
                                        <button onClick={() => handleOpenTermo(item, 'entrega')} className="text-teal-600 hover:text-teal-800 dark:text-teal-400 dark:hover:text-teal-300" title="Termo Entrega"><Icon name="FileSignature" size={16}/></button>
                                        <button onClick={() => handleOpenTermo(item, 'devolucao')} className="text-orange-600 hover:text-orange-800 dark:text-orange-400 dark:hover:text-orange-300" title="Termo Devolução"><Icon name="FileOutput" size={16}/></button>
                                        {currentUser.role === UserRole.Admin && (
                                            <button onClick={() => handleDelete(item.id)} className="text-red-600 hover:text-red-800 dark:text-red-400 dark:hover:text-red-300" title="Excluir"><Icon name="Trash2" size={16}/></button>
                                        )}
                                    </td>
                                </tr>
                            ))}
                            {filteredEquipment.length === 0 && (
                                <tr>
                                    <td colSpan={6} className="px-4 py-6 text-center text-gray-500 dark:text-dark-text-secondary">
                                        Nenhum equipamento encontrado.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            )}

            {isModalOpen && (
                <EquipmentFormModal 
                    equipment={editingEquipment} 
                    onClose={handleCloseModal} 
                    onSave={handleSave} 
                    currentUser={currentUser} 
                />
            )}

            {isHistoryModalOpen && selectedHistoryId && (
                <HistoryModal 
                    equipmentId={selectedHistoryId} 
                    onClose={() => setIsHistoryModalOpen(false)} 
                />
            )}

            {isTermoModalOpen && selectedEquipmentForTermo && (
                <TermoResponsabilidade
                    equipment={selectedEquipmentForTermo}
                    user={currentUser}
                    companyName={companyName}
                    onClose={() => setIsTermoModalOpen(false)}
                    termoType={termoType}
                />
            )}
        </div>
    );
};

export default EquipmentList;
