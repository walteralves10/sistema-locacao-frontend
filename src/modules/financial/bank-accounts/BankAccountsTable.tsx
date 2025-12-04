import React from 'react'
import { Edit, Trash2 } from 'lucide-react'

interface BankAccount {
  id: string;
  description: string;
  agency: string;
  balance: number;
}

interface BankAccountsTableProps {
  accounts: BankAccount[];
  onEdit: (account: BankAccount) => void;
  onDelete: (id: string) => void;
}

const BankAccountsTable: React.FC<BankAccountsTableProps> = ({ accounts, onEdit, onDelete }) => {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Descrição
            </th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Agência
            </th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Saldo Total
            </th>
            <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
              Ações
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {accounts.length > 0 ? (
            accounts.map((account) => (
              <tr key={account.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm font-medium text-gray-900">{account.description}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">{account.agency}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">R$ {account.balance.toFixed(2)}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <button
                    onClick={() => onEdit(account)}
                    aria-label="Editar conta bancária"
                    title="Editar"
                    className="text-indigo-600 hover:text-indigo-900 mr-3"
                  >
                    <Edit size={16} />
                  </button>
                  <button
                    onClick={() => onDelete(account.id)}
                    aria-label="Excluir conta bancária"
                    title="Excluir"
                    className="text-red-600 hover:text-red-900"
                  >
                    <Trash2 size={16} />
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={4} className="px-6 py-4 text-center text-sm text-gray-500">
                Nenhuma conta bancária cadastrada
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default BankAccountsTable;
