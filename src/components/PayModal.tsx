import React, { useEffect, useState } from 'react';
import { mockBankAccounts } from '../modules/financial/bank-accounts/mocks';

interface PayModalProps {
  isOpen: boolean;
  onClose: () => void;
  accountId: string | null;
  accountAmount?: number;
  title?: string;
  onPay: (accountId: string, payment: {
    type: 'full' | 'partial';
    paymentDate: string;
    amount: number;
    paymentMethod: 'pix' | 'boleto' | 'conta';
    bankAccountId?: string;
  }) => void;
}

const PayModal: React.FC<PayModalProps> = ({ isOpen, onClose, accountId, accountAmount = 0, onPay, title }) => {
  const [type, setType] = useState<'full' | 'partial'>('full');
  const [paymentDate, setPaymentDate] = useState<string>('');
  const [amount, setAmount] = useState<number>(0);
  const [paymentMethod, setPaymentMethod] = useState<'pix' | 'boleto' | 'conta'>('pix');
  const [bankAccountId, setBankAccountId] = useState<string>('');
  const [errors, setErrors] = useState<Record<string,string>>({});

  useEffect(() => {
    if (isOpen) {
      setType('full');
      setPaymentDate(new Date().toISOString().slice(0,10));
      setAmount(accountAmount || 0);
      setPaymentMethod('pix');
      setBankAccountId('');
      setErrors({});
    }
  }, [isOpen, accountAmount]);

  if (!isOpen || !accountId) return null;

  const validate = () => {
    const e: Record<string,string> = {};
    if (!paymentDate) e.paymentDate = 'Data de pagamento é obrigatória';
    if (type === 'partial') {
      if (!amount || amount <= 0) e.amount = 'Valor da parcela deve ser maior que zero';
      if (amount > accountAmount) e.amount = 'Valor da parcela não pode ser maior que o valor restante';
    }
    if (type === 'full') setAmount(accountAmount);
    if (!paymentMethod) e.paymentMethod = 'Selecione a forma de pagamento';
    if (paymentMethod === 'conta' && !bankAccountId) e.bankAccountId = 'Selecione a conta bancária';
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    onPay(accountId, {
      type,
      paymentDate,
      amount: Number((type === 'full' ? accountAmount : amount) || 0),
      paymentMethod,
      bankAccountId: paymentMethod === 'conta' ? bankAccountId : undefined,
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-md max-h-[90vh] overflow-auto">
        <div className="px-6 py-4 border-b border-gray-200">
          <h3 className="text-lg font-medium text-gray-900">{title}</h3>
        </div>

        <form onSubmit={handleSubmit} className="px-6 py-4 space-y-4">
          <div>
            <span className="block text-sm font-medium text-gray-700 mb-1">Tipo de pagamento</span>
            <div className="flex items-center gap-4">
              <label className="flex items-center gap-2">
                <input type="radio" name="payType" checked={type === 'full'} onChange={() => { setType('full'); setAmount(accountAmount); }} />
                <span className="text-sm">Total</span>
              </label>
              <label className="flex items-center gap-2">
                <input type="radio" name="payType" checked={type === 'partial'} onChange={() => { setType('partial'); setAmount(0); }} />
                <span className="text-sm">Parcial</span>
              </label>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Data do Pagamento</label>
            <input type="date" value={paymentDate} onChange={(e) => setPaymentDate(e.target.value)} className="w-full px-3 py-2 border rounded-md" />
            {errors.paymentDate && <p className="mt-1 text-sm text-red-600">{errors.paymentDate}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Valor da Parcela (R$)</label>
            <input type="number" step="0.01" min="0" value={amount || ''} onChange={(e) => setAmount(parseFloat(e.target.value)||0)} disabled={type === 'full'} className="w-full px-3 py-2 border rounded-md" />
            {errors.amount && <p className="mt-1 text-sm text-red-600">{errors.amount}</p>}
            <p className="mt-1 text-xs text-gray-500">Valor restante: R$ {accountAmount.toFixed(2)}</p>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Forma de Pagamento</label>
            <select value={paymentMethod} onChange={(e) => setPaymentMethod(e.target.value as any)} className="w-full px-3 py-2 border rounded-md">
              <option value="pix">Pix</option>
              <option value="boleto">Boleto</option>
              <option value="conta">Conta</option>
            </select>
            {errors.paymentMethod && <p className="mt-1 text-sm text-red-600">{errors.paymentMethod}</p>}
          </div>

          {paymentMethod === 'conta' && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Selecionar Conta Bancária</label>
              <select value={bankAccountId} onChange={(e) => setBankAccountId(e.target.value)} className="w-full px-3 py-2 border rounded-md">
                <option value="">Selecione a conta</option>
                {mockBankAccounts.map(acc => (
                  <option key={acc.id} value={acc.id}>{acc.description} - Agência {acc.agency}</option>
                ))}
              </select>
              {errors.bankAccountId && <p className="mt-1 text-sm text-red-600">{errors.bankAccountId}</p>}
            </div>
          )}

          <div className="flex justify-end space-x-3 pt-4">
            <button type="button" onClick={onClose} className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md">Cancelar</button>
            <button type="submit" className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md">Confirmar Pagamento</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PayModal;
