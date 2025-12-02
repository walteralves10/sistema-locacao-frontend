import React, { useState, useEffect } from 'react';
import AccountsReceivableTable from './AccountsReceivableTable';
import AccountsReceivableModal from './AccountsReceivableModal';

interface Account {
  id: string;
  plan: string;
  costCenter: string;
  description: string;
  amount: number;
  bankAccount: string;
  dueDate: string;
}

const AccountsReceivable: React.FC = () => {
  const [accounts, setAccounts] = useState<Account[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingAccount, setEditingAccount] = useState<Account | null>(null);

  // Carregar contas a receber (simulação)
  useEffect(() => {
    // Simulando dados de contas a receber
    const mockAccounts: Account[] = [
      {
        id: '1',
        plan: '1.1.1.01',
        costCenter: 'Administrativo',
        description: 'Fatura de serviço prestado',
        amount: 1200.00,
        dueDate: '2025-11-20',
        bankAccount: '1234-5',
      },
      {
        id: '2',
        plan: '1.1.2.01',
        costCenter: 'Administrativo',
        description: 'Pagamento de consultoria',
        amount: 3500.00,
        dueDate: '2025-11-15',
        bankAccount: '6789-0'
      },
      {
        id: '3',
        plan: '1.1.3.01',
        costCenter: 'TI',
        description: 'Desenvolvimento de sistema',
        amount: 8500.00,
        dueDate: '2025-11-25',
        bankAccount: '1111-2'
      }
    ];
    setAccounts(mockAccounts);
  }, []);

  const openCreateModal = () => {
    setEditingAccount(null);
    setIsModalOpen(true);
  };

  const openEditModal = (account: Account) => {
    setEditingAccount(account);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setEditingAccount(null);
  };

  const handleSaveAccount = (account: Account) => {
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
        <h1 className="text-2xl font-bold text-gray-900">Contas a Receber</h1>
        <button
          onClick={openCreateModal}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md transition-colors duration-200 flex items-center"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clipRule="evenodd" />
          </svg>
          Nova Conta
        </button>
      </div>

      <div className="bg-white rounded-lg shadow-sm border p-6">
        <AccountsReceivableTable 
          accounts={accounts} 
          onEdit={openEditModal}
          onDelete={handleDeleteAccount}
        />
      </div>

      <AccountsReceivableModal
        isOpen={isModalOpen}
        onClose={closeModal}
        onSave={handleSaveAccount}
        account={editingAccount}
      />
    </div>
  );
};

export default AccountsReceivable;