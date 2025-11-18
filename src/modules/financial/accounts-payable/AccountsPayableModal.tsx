import React, { useState, useEffect } from 'react';

interface Account {
  id?: string;
  plan?: string;
  costCenter?: string;
  description: string;
  amount: number;
  dueDate: string;
  status: 'pendente' | 'pago' | 'atrasado';
}

interface AccountsPayableModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (account: Account) => void;
  account?: Account | null;
}

const AccountsPayableModal: React.FC<AccountsPayableModalProps> = ({ isOpen, onClose, onSave, account }) => {
  const [formData, setFormData] = useState<Omit<Account, 'id'>>({
    plan: '',
    costCenter: '',
    description: '',
    amount: 0,
    dueDate: '',
    status: 'pendente'
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    if (account) {
      setFormData({
        description: account.description,
        amount: account.amount,
        dueDate: account.dueDate,
        status: account.status
      });
    } else {
      // Reset form when opening for new account
      setFormData({
        description: '',
        amount: 0,
        dueDate: '',
        status: 'pendente'
      });
    }
    setErrors({});
  }, [account, isOpen]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'amount' ? parseFloat(value) || 0 : value
    }));
  };

  const validate = () => {
    const newErrors: Record<string, string> = {};
    
    if (!formData.plan?.trim()) {
      newErrors.plan = 'Plano de conta é obrigatório';
    }
    
    if (!formData.costCenter?.trim()) {
      newErrors.costCenter = 'Centro de custos é obrigatório';
    }
    
    if (!formData.description.trim()) {
      newErrors.description = 'Descrição é obrigatória';
    }
    
    if (formData.amount <= 0) {
      newErrors.amount = 'Valor deve ser maior que zero';
    }
    
    if (!formData.dueDate) {
      newErrors.dueDate = 'Data de vencimento é obrigatória';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (validate()) {
      onSave({
        ...formData,
        id: account?.id
      });
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-md">
        <div className="px-6 py-4 border-b border-gray-200">
          <h3 className="text-lg font-medium text-gray-900">
            {account ? 'Editar Conta a Pagar' : 'Nova Conta a Pagar'}
          </h3>
        </div>
        
        <form onSubmit={handleSubmit} className="px-6 py-4 space-y-4">
          <div>
            <label htmlFor="plan" className="block text-sm font-medium text-gray-700 mb-1">
              Plano de Conta
            </label>
            <input
              type="text"
              id="plan"
              name="plan"
              value={formData.plan}
              onChange={handleChange}
              className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 ${
                errors.plan ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-blue-500'
              }`}
              placeholder="Plano de conta"
            />
            {errors.plan && <p className="mt-1 text-sm text-red-600">{errors.plan}</p>}
          </div>
          
          <div>
            <label htmlFor="costCenter" className="block text-sm font-medium text-gray-700 mb-1">
              Centro de Custos
            </label>
            <input
              type="text"
              id="costCenter"
              name="costCenter"
              value={formData.costCenter}
              onChange={handleChange}
              className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 ${
                errors.costCenter ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-blue-500'
              }`}
              placeholder="Centro de custos"
            />
            {errors.costCenter && <p className="mt-1 text-sm text-red-600">{errors.costCenter}</p>}
          </div>
          
          <div>
            <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
              Descrição
            </label>
            <input
              type="text"
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 ${
                errors.description ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-blue-500'
              }`}
              placeholder="Descrição da conta"
            />
            {errors.description && <p className="mt-1 text-sm text-red-600">{errors.description}</p>}
          </div>
          
          <div>
            <label htmlFor="amount" className="block text-sm font-medium text-gray-700 mb-1">
              Valor (R$)
            </label>
            <input
              type="number"
              id="amount"
              name="amount"
              value={formData.amount || ''}
              onChange={handleChange}
              min="0"
              step="0.01"
              className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 ${
                errors.amount ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-blue-500'
              }`}
              placeholder="0.00"
            />
            {errors.amount && <p className="mt-1 text-sm text-red-600">{errors.amount}</p>}
          </div>
          
          <div>
            <label htmlFor="dueDate" className="block text-sm font-medium text-gray-700 mb-1">
              Data de Vencimento
            </label>
            <input
              type="date"
              id="dueDate"
              name="dueDate"
              value={formData.dueDate}
              onChange={handleChange}
              className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 ${
                errors.dueDate ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-blue-500'
              }`}
            />
            {errors.dueDate && <p className="mt-1 text-sm text-red-600">{errors.dueDate}</p>}
          </div>
          
          <div>
            <label htmlFor="status" className="block text-sm font-medium text-gray-700 mb-1">
              Status
            </label>
            <select
              id="status"
              name="status"
              value={formData.status}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="pendente">Pendente</option>
              <option value="pago">Pago</option>
              <option value="atrasado">Atrasado</option>
            </select>
          </div>
          
          <div className="flex justify-end space-x-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="px-4 py-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              {account ? 'Atualizar' : 'Salvar'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AccountsPayableModal;