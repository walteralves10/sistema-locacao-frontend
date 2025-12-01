import { useState } from "react";

export default function BankAccounts() {
    const [description, setDescription] = useState("");
    const [pix, setPix] = useState(false);
    const [boleto, setBoleto] = useState(false);
    const [card, setCard] = useState(false);

    return (
        <div className="max-w-2xl mx-auto bg-white dark:bg-gray-800 shadow-sm rounded-lg p-6">
            <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-100 mb-4">Contas Bancarias</h2>

            <form onSubmit={(e) => e.preventDefault()} className="space-y-4">
                <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Descrição</label>
                    <input
                        value={description}
                        onChange={e => setDescription(e.target.value)}
                        className="mt-1 block w-full border rounded-md px-3 py-2 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                    />
                </div>

                <fieldset className="border rounded-md p-4">
                    <legend className="text-sm font-medium text-gray-700 dark:text-gray-300">Métodos de pagamento</legend>
                    <div className="mt-2 flex gap-4">
                        <label className="flex items-center gap-2">
                            <input type="checkbox" checked={pix} onChange={e => setPix(e.target.checked)} className="h-4 w-4" />
                            <span className="text-sm text-gray-700 dark:text-gray-300">Pix</span>
                        </label>

                        <label className="flex items-center gap-2">
                            <input type="checkbox" checked={boleto} onChange={e => setBoleto(e.target.checked)} className="h-4 w-4" />
                            <span className="text-sm text-gray-700 dark:text-gray-300">Boleto</span>
                        </label>

                        <label className="flex items-center gap-2">
                            <input type="checkbox" checked={card} onChange={e => setCard(e.target.checked)} className="h-4 w-4" />
                            <span className="text-sm text-gray-700 dark:text-gray-300">Crédito/Débito</span>
                        </label>
                    </div>
                </fieldset>

                {boleto && (
                    <div className="flex items-center gap-4">
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Configurar Boleto</label>
                        <button type="button" className="px-3 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-500">Configurar</button>
                    </div>
                )}

                <div className="flex justify-end mt-4">
                    <button type="submit" className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-500">Salvar</button>
                </div>
            </form>
        </div>
    );
}