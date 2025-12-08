import React, { useState, useMemo } from 'react';
import mockTransactions from './mocks';

type Transaction = typeof mockTransactions[number];

const FILTER_TYPES = {
  ALL: 'all',
  DATE: 'date',
  MONTH: 'month',
} as const;

export default function CashPlan() {
  const [filterType, setFilterType] = useState<string>(FILTER_TYPES.ALL);
  const [filterValue, setFilterValue] = useState<string>('');

  // Filtra transações baseado no tipo e valor do filtro
  const filteredTransactions = useMemo(() => {
    if (filterType === FILTER_TYPES.ALL) {
      return mockTransactions;
    }

    if (filterType === FILTER_TYPES.DATE && filterValue) {
      return mockTransactions.filter(t => t.date.startsWith(filterValue));
    }

    if (filterType === FILTER_TYPES.MONTH && filterValue) {
      return mockTransactions.filter(t => t.date.startsWith(filterValue));
    }

    return mockTransactions;
  }, [filterType, filterValue]);

  // Calcula totais (entrada, saída e resultado) com base nas transações filtradas
  const totals = useMemo(() => {
    const entrada = filteredTransactions.reduce((sum, t) => sum + (t.credit || 0), 0);
    const saida = filteredTransactions.reduce((sum, t) => sum + (t.debit || 0), 0);
    const resultado = entrada - saida;
    return { entrada, saida, resultado };
  }, [filteredTransactions]);

  const handleFilterChange = (type: string) => {
    setFilterType(type);
    setFilterValue('');
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-6">Plano de Caixa</h2>

      {/* Cards de Totais */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <div className="bg-white rounded-lg shadow-sm border p-4">
          <div className="text-sm text-gray-600 font-medium mb-1">Entradas</div>
          <div className="text-2xl font-bold text-green-600">
            R$ {totals.entrada.toFixed(2)}
          </div>
        </div>
        <div className="bg-white rounded-lg shadow-sm border p-4">
          <div className="text-sm text-gray-600 font-medium mb-1">Saídas</div>
          <div className="text-2xl font-bold text-red-600">
            R$ {totals.saida.toFixed(2)}
          </div>
        </div>
        <div className="bg-white rounded-lg shadow-sm border p-4">
          <div className="text-sm text-gray-600 font-medium mb-1">Resultado</div>
          <div
            className={`text-2xl font-bold ${
              totals.resultado >= 0 ? 'text-green-600' : 'text-red-600'
            }`}
          >
            R$ {totals.resultado.toFixed(2)}
          </div>
        </div>
      </div>

      {/* Filtros */}
      <div className="bg-white rounded-lg shadow-sm border p-4 mb-6">
        <div className="flex flex-col gap-4">
          <div>
            <label className="text-sm font-medium text-gray-700 mb-2 block">
              Filtrar por:
            </label>
            <div className="flex flex-wrap gap-3">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  name="filterType"
                  value={FILTER_TYPES.ALL}
                  checked={filterType === FILTER_TYPES.ALL}
                  onChange={(e) => handleFilterChange(e.target.value)}
                  className="w-4 h-4"
                />
                <span className="text-sm text-gray-700">Todos os lançamentos</span>
              </label>
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  name="filterType"
                  value={FILTER_TYPES.DATE}
                  checked={filterType === FILTER_TYPES.DATE}
                  onChange={(e) => handleFilterChange(e.target.value)}
                  className="w-4 h-4"
                />
                <span className="text-sm text-gray-700">Data específica</span>
              </label>
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  name="filterType"
                  value={FILTER_TYPES.MONTH}
                  checked={filterType === FILTER_TYPES.MONTH}
                  onChange={(e) => handleFilterChange(e.target.value)}
                  className="w-4 h-4"
                />
                <span className="text-sm text-gray-700">Por mês</span>
              </label>
            </div>
          </div>

          {filterType === FILTER_TYPES.DATE && (
            <div>
              <label className="text-sm font-medium text-gray-700 mb-2 block">
                Data:
              </label>
              <input
                type="date"
                value={filterValue}
                onChange={(e) => setFilterValue(e.target.value)}
                className="border rounded px-3 py-2 text-sm w-full md:w-48"
              />
            </div>
          )}

          {filterType === FILTER_TYPES.MONTH && (
            <div>
              <label className="text-sm font-medium text-gray-700 mb-2 block">
                Mês:
              </label>
              <input
                type="month"
                value={filterValue}
                onChange={(e) => setFilterValue(e.target.value)}
                className="border rounded px-3 py-2 text-sm w-full md:w-48"
              />
            </div>
          )}
        </div>
      </div>

      {/* Tabela de Lançamentos */}
      <div className="bg-white rounded-lg shadow-sm border overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-50 border-b">
                <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">
                  Data
                </th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">
                  Hora
                </th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">
                  Usuário
                </th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">
                  Descrição
                </th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">
                  Categoria
                </th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">
                  Pagamento
                </th>
                <th className="px-4 py-3 text-right text-sm font-semibold text-gray-700">
                  Entrada
                </th>
                <th className="px-4 py-3 text-right text-sm font-semibold text-gray-700">
                  Saída
                </th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">
                  Situação
                </th>
              </tr>
            </thead>
            <tbody>
              {filteredTransactions.length > 0 ? (
                filteredTransactions.map((transaction) => {
                  const [date, time] = transaction.date.split('T');
                  return (
                    <tr
                      key={transaction.id}
                      className="border-b hover:bg-gray-50 transition"
                    >
                      <td className="px-4 py-3 text-sm text-gray-700">{date}</td>
                      <td className="px-4 py-3 text-sm text-gray-700">{time}</td>
                      <td className="px-4 py-3 text-sm text-gray-700">
                        {transaction.user}
                      </td>
                      <td className="px-4 py-3 text-sm text-gray-700">
                        {transaction.description}
                      </td>
                      <td className="px-4 py-3 text-sm text-gray-700">
                        {transaction.costCenter}
                      </td>
                      <td className="px-4 py-3 text-sm text-gray-700">
                        {transaction.payment}
                      </td>
                      <td className="px-4 py-3 text-sm text-right text-green-600 font-medium">
                        {transaction.credit > 0
                          ? `R$ ${transaction.credit.toFixed(2)}`
                          : '-'}
                      </td>
                      <td className="px-4 py-3 text-sm text-right text-red-600 font-medium">
                        {transaction.debit > 0
                          ? `R$ ${transaction.debit.toFixed(2)}`
                          : '-'}
                      </td>
                      <td className="px-4 py-3 text-sm">
                        <span
                          className={`px-2 py-1 rounded-full text-xs font-semibold ${
                            transaction.status === 'Concluído'
                              ? 'bg-green-100 text-green-800'
                              : 'bg-yellow-100 text-yellow-800'
                          }`}
                        >
                          {transaction.status}
                        </span>
                      </td>
                    </tr>
                  );
                })
              ) : (
                <tr>
                  <td
                    colSpan={9}
                    className="px-4 py-8 text-center text-sm text-gray-500"
                  >
                    Nenhum lançamento encontrado
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}