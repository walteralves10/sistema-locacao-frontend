import React from 'react'
import { Edit, Trash2 } from 'lucide-react'

interface PlanAccountItem {
  id: string;
  description: string;
  type: 'revenue' | 'expense';
}

interface PlanAccountTableProps {
  accounts: PlanAccountItem[];
  onEdit: (account: PlanAccountItem) => void;
  onDelete: (id: string) => void;
}

const PlanAccountTable: React.FC<PlanAccountTableProps> = ({ accounts, onEdit, onDelete }) => {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Descrição
            </th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Tipo
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
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-semibold ${
                      account.type === 'revenue'
                        ? 'bg-green-100 text-green-800'
                        : 'bg-red-100 text-red-800'
                    }`}
                  >
                    {account.type === 'revenue' ? 'Receita' : 'Despesa'}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <button
                    onClick={() => onEdit(account)}
                    aria-label="Editar plano de conta"
                    title="Editar"
                    className="text-indigo-600 hover:text-indigo-900 mr-3"
                  >
                    <Edit size={16} />
                  </button>
                  <button
                    onClick={() => onDelete(account.id)}
                    aria-label="Excluir plano de conta"
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
              <td colSpan={3} className="px-6 py-4 text-center text-sm text-gray-500">
                Nenhum plano de conta cadastrado
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default PlanAccountTable;
