import React, { useState, useEffect } from 'react';

interface BankAccount {
  id?: string;
  description: string;
  agency: string;
  balance: number;
  pix?: boolean;
  boleto?: boolean;
  card?: boolean;
}

interface BankAccountsModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (account: BankAccount) => void;
  account?: BankAccount | null;
}

const BankAccountsModal: React.FC<BankAccountsModalProps> = ({ isOpen, onClose, onSave, account }) => {
  const [formData, setFormData] = useState<Omit<BankAccount, 'id'>>({
    description: '',
    agency: '',
    balance: 0,
    pix: false,
    boleto: false,
    card: false
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    if (account) {
      setFormData({
        description: account.description,
        agency: account.agency,
        balance: account.balance,
        pix: account.pix || false,
        boleto: account.boleto || false,
        card: account.card || false
      });
    } else {
      setFormData({
        description: '',
        agency: '',
        balance: 0,
        pix: false,
        boleto: false,
        card: false
      });
    }
    setErrors({});
  }, [account, isOpen]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target as HTMLInputElement;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : 
              name === 'balance' ? parseFloat(value) || 0 : value
    }));
  };

  const validate = () => {
    const newErrors: Record<string, string> = {};
    
    if (!formData.description.trim()) {
      newErrors.description = 'Descrição é obrigatória';
    }
    
    if (!formData.agency.trim()) {
      newErrors.agency = 'Agência é obrigatória';
    }
    
    if (formData.balance < 0) {
      newErrors.balance = 'Saldo não pode ser negativo';
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
      <div className="bg-white rounded-lg shadow-xl w-full max-w-md max-h-[90vh] overflow-auto">
        <div className="px-6 py-4 border-b border-gray-200">
          <h3 className="text-lg font-medium text-gray-900">
            {account ? 'Editar Conta Bancária' : 'Nova Conta Bancária'}
          </h3>
        </div>
        
        <form onSubmit={handleSubmit} className="px-6 py-4 space-y-4">
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
            <label htmlFor="agency" className="block text-sm font-medium text-gray-700 mb-1">
              Agência
            </label>
            <input
              type="text"
              id="agency"
              name="agency"
              value={formData.agency}
              onChange={handleChange}
              className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 ${
                errors.agency ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-blue-500'
              }`}
              placeholder="Número da agência"
            />
            {errors.agency && <p className="mt-1 text-sm text-red-600">{errors.agency}</p>}
          </div>
          
          <div>
            <label htmlFor="balance" className="block text-sm font-medium text-gray-700 mb-1">
              Saldo Total (R$)
            </label>
            <input
              type="number"
              id="balance"
              name="balance"
              value={formData.balance || ''}
              onChange={handleChange}
              min="0"
              step="0.01"
              className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 ${
                errors.balance ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-blue-500'
              }`}
              placeholder="0.00"
            />
            {errors.balance && <p className="mt-1 text-sm text-red-600">{errors.balance}</p>}
          </div>

          <fieldset className="border rounded-md p-3">
            <legend className="text-sm font-medium text-gray-700">Métodos de Pagamento</legend>
            <div className="mt-2 space-y-2">
              <label className="flex items-center gap-2">
                <input 
                  type="checkbox" 
                  name="pix"
                  checked={formData.pix || false}
                  onChange={handleChange}
                  className="h-4 w-4" 
                />
                <span className="text-sm text-gray-700">Pix</span>
              </label>

              <label className="flex items-center gap-2">
                <input 
                  type="checkbox" 
                  name="boleto"
                  checked={formData.boleto || false}
                  onChange={handleChange}
                  className="h-4 w-4" 
                />
                <span className="text-sm text-gray-700">Boleto</span>
              </label>

              <label className="flex items-center gap-2">
                <input 
                  type="checkbox" 
                  name="card"
                  checked={formData.card || false}
                  onChange={handleChange}
                  className="h-4 w-4" 
                />
                <span className="text-sm text-gray-700">Crédito/Débito</span>
              </label>
            </div>
          </fieldset>
          
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

export default BankAccountsModal;
