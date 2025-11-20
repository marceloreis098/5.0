
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
            let message = error.message || "Falha desconhecida ao salvar.";
            
            if (error instanceof TypeError && message === 'Failed to fetch') {
                message = "Erro de conexão com o servidor. Verifique se a API (backend) está rodando na porta 3001.";
            } else if (message.includes('Database error')) {
                // Tenta limpar a mensagem de erro do banco para ficar mais legível se possível
                message = `Erro no Banco de Dados: ${message.replace('Database error: ', '')}`;
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
                    {saveError && (
                        <div className="sm:col-span-3 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative break-words" role="alert">
                            <strong className="font-bold">Erro: </strong>
                            <span className="block sm:inline">{saveError}</span>
                        </div>
                    )}

                    <input type="text" name="equipamento" placeholder="Nome do Equipamento *" value={formData.equipamento || ''} onChange={handleChange} className="p-2 border dark:border-dark-border rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-dark-text-primary" required />
                    <input type="text" name="serial" placeholder="Número de Série *" value={formData.serial || ''} onChange={handleChange} className="p-2 border dark:border-dark-border rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-dark-text-primary" required />
                    <input type="text" name="patrimonio" placeholder="Patrimônio" value={formData.patrimonio || ''} onChange={handleChange} className="p-2 border dark:border-dark-border rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-dark-text-primary" />
                    
                    <input type="text" name="brand" placeholder="Marca" value={formData.brand || ''} onChange={handleChange} className="p-2 border dark:border-dark-border rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-dark-text-primary" />
                    <input type="text"