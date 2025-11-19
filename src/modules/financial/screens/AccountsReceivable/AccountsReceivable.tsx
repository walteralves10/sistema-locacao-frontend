import { useState } from "react";

export default function AccountsReceivable() {
    const [revenuePlan, setRevenuePlan] = useState("");
    const [revenueCenter, setRevenueCenter] = useState("");
    const [description, setDescription] = useState("");
    const [amount, setAmount] = useState("");
    const [bankAccount, setBankAccount] = useState("");
    const [dueDate, setDueDate] = useState("");

    return (
        <div className="max-w-3xl mx-auto bg-white dark:bg-gray-800 shadow-sm rounded-lg p-6">
            <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-100 mb-4">Contas a receber</h2>

            <form onSubmit={(e) => e.preventDefault()} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-end">
                    <div className="col-span-2">
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Plano de receita</label>
                        <div className="mt-1 flex">
                            <select
                                value={revenuePlan}
                                onChange={e => setRevenuePlan(e.target.value)}
                                className="flex-1 border rounded-md px-3 py-2 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                            >
                                <option value="">-- select --</option>
                                <option value="rev-01">Receita 01</option>
                            </select>
                            <button type="button" className="ml-2 px-3 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-500">Gerenciar</button>
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Centro de receita</label>
                        <div className="mt-1 flex">
                            <select
                                value={revenueCenter}
                                onChange={e => setRevenueCenter(e.target.value)}
                                className="flex-1 border rounded-md px-3 py-2 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                            >
                                <option value="">-- select --</option>
                                <option value="rc-01">RC 01</option>
                            </select>
                            <button type="button" className="ml-2 px-3 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-500">Gerenciar</button>
                        </div>
                    </div>
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Descrição</label>
                    <input
                        value={description}
                        onChange={e => setDescription(e.target.value)}
                        className="mt-1 block w-full border rounded-md px-3 py-2 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                    />
                </div>

                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Valor</label>
                        <input
                            type="number"
                            value={amount}
                            onChange={e => setAmount(e.target.value)}
                            className="mt-1 block w-full border rounded-md px-3 py-2 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Conta bancaria</label>
                        <select
                            value={bankAccount}
                            onChange={e => setBankAccount(e.target.value)}
                            className="mt-1 block w-full border rounded-md px-3 py-2 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                        >
                            <option value="">-- select --</option>
                            <option value="bank-01">Bank 01 - 1234</option>
                        </select>
                    </div>
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Data de vencimento</label>
                    <input
                        type="date"
                        value={dueDate}
                        onChange={e => setDueDate(e.target.value)}
                        className="mt-1 block w-full border rounded-md px-3 py-2 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                    />
                </div>

                <div className="flex gap-2 mt-4">
                    <button type="submit" className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-500">Salvar</button>
                    <button type="button" className="px-4 py-2 bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-100 rounded-md">Cancelar</button>
                </div>
            </form>
        </div>
    );
}