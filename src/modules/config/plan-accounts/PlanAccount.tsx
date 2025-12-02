import React, { useState } from 'react';

const PlanAccount = () => {
  const [description, setDescription] = useState('');
  const [type, setType] = useState<'revenue' | 'expense'>('revenue');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Lógica de envio do formulário
    console.log({ description, type });
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Plano de Contas</h1>
      
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md">
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="description">
            Descrição
          </label>
          <input
            id="description"
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            placeholder="Digite a descrição"
            required
          />
        </div>

        <div className="mb-6">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="type">
            Tipo
          </label>
          <select
            id="type"
            value={type}
            onChange={(e) => setType(e.target.value as 'revenue' | 'expense')}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          >
            <option value="revenue">Receita</option>
            <option value="expense">Despesa</option>
          </select>
        </div>

        <div className="flex items-center justify-between">
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Salvar
          </button>
        </div>
      </form>
    </div>
  );
};

export default PlanAccount;