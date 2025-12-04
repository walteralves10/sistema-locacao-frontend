import React, { useState, useEffect } from 'react';
import PlanAccountTable from './PlanAccountTable';
import PlanAccountModal from './PlanAccountModal';
import { mockPlanAccounts } from './mocks';

interface PlanAccountItem {
  id: string;
  description: string;
  type: 'revenue' | 'expense';
}

const PlanAccount: React.FC = () => {
  const [accounts, setAccounts] = useState<PlanAccountItem[]>(mockPlanAccounts);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingAccount, setEditingAccount] = useState<PlanAccountItem | null>(null);

  // Carregar planos de conta (simulação com localStorage ou mocks)
  useEffect(() => {
    const savedAccounts = localStorage.getItem('accounts');
    if (savedAccounts) {
      try {
        const parsed = JSON.parse(savedAccounts);
        if (Array.isArray(parsed) && parsed.length > 0) {
          setAccounts(parsed);
        }
      } catch (e) {
        // Se houver erro ao parsear, usar mocks
        setAccounts(mockPlanAccounts);
      }
    }
  }, []);

  // Salvar no localStorage sempre que a lista mudar
  useEffect(() => {
    localStorage.setItem('accounts', JSON.stringify(accounts));
  }, [accounts]);

  const openCreateModal = () => {
    setEditingAccount(null);
    setIsModalOpen(true);
  };

  const openEditModal = (account: PlanAccountItem) => {
    setEditingAccount(account);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setEditingAccount(null);
  };

  const handleSaveAccount = (account: PlanAccountItem) => {
    if (editingAccount) {
      // Atualizar conta existente
      setAccounts(accounts.map(acc => acc.id === account.id ? account : acc));
    } else {
      // Adicionar nova conta
      setAccounts([...accounts, { ...account, id: Date.now().toString() }]);
    }
    closeModal();
  };

  const handleDeleteAccount = (id: string) => {
    setAccounts(accounts.filter(account => account.id !== id));
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900">Plano de Contas</h1>
        <button
          onClick={openCreateModal}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md transition-colors duration-200 flex items-center"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clipRule="evenodd" />
          </svg>
          Novo
        </button>
      </div>

      <div className="bg-white rounded-lg shadow-sm border p-6">
        <PlanAccountTable 
          accounts={accounts} 
          onEdit={openEditModal}
          onDelete={handleDeleteAccount}
        />
      </div>

      <PlanAccountModal
        isOpen={isModalOpen}
        onClose={closeModal}
        onSave={handleSaveAccount}
        account={editingAccount}
      />
    </div>
  );
};

export default PlanAccount;
