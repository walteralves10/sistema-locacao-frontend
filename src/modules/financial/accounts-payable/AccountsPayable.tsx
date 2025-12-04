import React, { useState, useEffect } from 'react';
import AccountsPayableTable from './AccountsPayableTable';
import AccountsPayableModal from './AccountsPayableModal';
import PayModal from '../../../components/PayModal';
import { addPayment } from '../payments/storage';
import { Plus } from 'lucide-react';
import { mockAccountsPayable } from './mocks';

interface Account {
  id: string;
  plan: string;
  costCenter: string;
  description: string;
  amount: number; // remaining amount
  bankAccount: string;
  paid?: boolean;
}

const AccountsPayable: React.FC = () => {
  const [accounts, setAccounts] = useState<Account[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingAccount, setEditingAccount] = useState<Account | null>(null);
  const [isPayOpen, setIsPayOpen] = useState(false);
  const [payAccount, setPayAccount] = useState<Account | null>(null);

  // Carregar contas a pagar (usando mocks)
  useEffect(() => {
    setAccounts(mockAccountsPayable);
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

  const handleSaveAccount = (account: Omit<Account, 'id'> & { id?: string }) => {
    const accountWithId: Account = {
      ...account,
      id: account.id || Date.now().toString(),
    };
    
    if (editingAccount) {
      // Atualizar conta existente
      setAccounts(accounts.map(acc => acc.id === accountWithId.id ? accountWithId : acc));
    } else {
      // Adicionar nova conta
      setAccounts([...accounts, accountWithId]);
    }
    closeModal();
  };

  const handleDeleteAccount = (id: string) => {
    setAccounts(accounts.filter(account => account.id !== id));
  };

  const openPayModal = (account: Account) => {
    setPayAccount(account);
    setIsPayOpen(true);
  };

  const closePayModal = () => {
    setIsPayOpen(false);
    setPayAccount(null);
  };

  const handleConfirmPayment = (accountId: string, payment: { type: 'full' | 'partial'; paymentDate: string; amount: number; paymentMethod: string; bankAccountId?: string; }) => {
    const id = Date.now().toString();
    addPayment({
      id,
      accountId,
      type: payment.type,
      paymentDate: payment.paymentDate,
      amount: payment.amount,
      paymentMethod: payment.paymentMethod as any,
      bankAccountId: payment.bankAccountId,
    });

    setAccounts(prev => prev.map(acc => {
      if (acc.id !== accountId) return acc;
      if (payment.type === 'full') return { ...acc, amount: 0, paid: true };
      const newAmount = Number((acc.amount - payment.amount).toFixed(2));
      return { ...acc, amount: newAmount, paid: newAmount <= 0 };
    }));
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900">Contas a Pagar</h1>
        <button
          onClick={openCreateModal}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md transition-colors duration-200 flex items-center"
        >
          <Plus className="w-4 h-4 mr-2" />
          Nova Conta
        </button>
      </div>

      <div className="bg-white rounded-lg shadow-sm border p-6">
        <AccountsPayableTable 
          accounts={accounts} 
          onEdit={openEditModal}
          onDelete={handleDeleteAccount}
            onPay={openPayModal}
        />
      </div>

      <AccountsPayableModal
        isOpen={isModalOpen}
        onClose={closeModal}
        onSave={handleSaveAccount}
        account={editingAccount}
      />

      <PayModal
        title="Pagar Conta"
        isOpen={isPayOpen}
        onClose={closePayModal}
        accountId={payAccount?.id ?? null}
        accountAmount={payAccount?.amount}
        onPay={handleConfirmPayment}
      />
    </div>
  );
};

export default AccountsPayable;