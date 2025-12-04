import { PenBox, Trash2 } from 'lucide-react';
import React from 'react'

interface Account {
  id: string;
  plan: string;
  costCenter: string;
  description: string;
  amount: number;
  bankAccount: string;
}

interface AccountsPayableTableProps {
  accounts: Account[];
  onEdit: (account: Account) => void;
  onDelete: (id: string) => void;
  onPay: (account: Account) => void;
}

const AccountsPayableTable: React.FC<AccountsPayableTableProps> = ({ accounts, onEdit, onDelete, onPay }) => {

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Plano de Conta
            </th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Centro de Custos
            </th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Descrição
            </th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Valor
            </th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Conta Bancária
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
                  <div className="text-sm font-medium text-gray-900">{account.plan}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">{account.costCenter}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm font-medium text-gray-900">{account.description}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {account.amount === 0 ? (
                    <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-semibold bg-green-100 text-green-800">Pago</span>
                  ) : (
                    <div className="text-sm text-gray-900">R$ {account.amount.toFixed(2)}</div>
                  )}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">{account.bankAccount}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <button
                    onClick={() => onEdit(account)}
                    aria-label="Editar conta a pagar"
                    title="Editar"
                    className="text-indigo-600 hover:text-indigo-900 mr-3"
                  >
                    <PenBox className="inline-block w-4 h-4" />
                  </button>
                  <button
                    onClick={() => onPay(account)}
                    className="text-green-600 hover:text-green-900 mr-3"
                  >
                    Pagar conta
                  </button>
                  <button
                    onClick={() => onDelete(account.id)}
                    aria-label="Excluir conta a pagar"
                    title="Excluir"
                    className="text-red-600 hover:text-red-900"
                  >
                    <Trash2 className="inline-block w-4 h-4" />
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={7} className="px-6 py-4 text-center text-sm text-gray-500">
                Nenhuma conta a pagar cadastrada
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default AccountsPayableTable;