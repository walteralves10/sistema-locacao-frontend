import React, { useState } from 'react';
import { ArrowLeftRight } from 'lucide-react';
import { getPayments } from '../modules/financial/payments/storage';
import type { PaymentRecord } from '../modules/financial/payments/storage';

interface StornoModalProps {
  isOpen: boolean;
  onClose: () => void;
  accountId: string | null;
  accountDescription: string;
  onConfirmStorno: (accountId: string, reason: string, payment: PaymentRecord) => void;
}

const paymentMethodLabels: Record<string, string> = {
  pix: 'Pix',
  boleto: 'Boleto',
  conta: 'Conta',
};

const StornoModal: React.FC<StornoModalProps> = ({ isOpen, onClose, accountId, accountDescription, onConfirmStorno }) => {
  const [reason, setReason] = useState('');
  const [errors, setErrors] = useState<Record<string, string>>({});

  if (!isOpen || !accountId) return null;

  const payments = getPayments().filter(p => p.accountId === accountId);

  const validate = () => {
    const e: Record<string, string> = {};
    if (!reason.trim()) e.reason = 'O motivo do estorno é obrigatório';
    if (payments.length === 0) e.payment = 'Nenhum pagamento encontrado para esta conta';
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    const lastPayment = payments[payments.length - 1];
    onConfirmStorno(accountId, reason.trim(), lastPayment);
    setReason('');
    setErrors({});
    onClose();
  };

  const handleClose = () => {
    setReason('');
    setErrors({});
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-md max-h-[90vh] overflow-auto">
        <div className="px-6 py-4 border-b border-gray-200 flex items-center gap-2">
          <ArrowLeftRight className="w-5 h-5 text-orange-600" />
          <h3 className="text-lg font-medium text-gray-900">Estornar Lançamento</h3>
        </div>

        <form onSubmit={handleSubmit} className="px-6 py-4 space-y-4">
          <div>
            <p className="text-sm text-gray-700">
              <span className="font-medium">Conta:</span> {accountDescription}
            </p>
          </div>

          {payments.length > 0 && (
            <div className="bg-gray-50 rounded-md p-3 space-y-1 text-sm">
              <p>
                <span className="font-medium">Forma de pagamento:</span>{' '}
                {paymentMethodLabels[payments[payments.length - 1].paymentMethod] || payments[payments.length - 1].paymentMethod}
              </p>
              <p>
                <span className="font-medium">Valor estornado:</span> R$ {payments[payments.length - 1].amount.toFixed(2)}
              </p>
              <p>
                <span className="font-medium">Tipo:</span>{' '}
                {payments[payments.length - 1].type === 'full' ? 'Total' : 'Parcial'}
              </p>
            </div>
          )}

          <div>
            <label htmlFor="reason" className="block text-sm font-medium text-gray-700 mb-1">
              Motivo do Estorno
            </label>
            <textarea
              id="reason"
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              rows={4}
              className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 resize-none ${
                errors.reason ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-blue-500'
              }`}
              placeholder="Descreva o motivo do estorno..."
            />
            {errors.reason && <p className="mt-1 text-sm text-red-600">{errors.reason}</p>}
            {errors.payment && <p className="mt-1 text-sm text-red-600">{errors.payment}</p>}
          </div>

          <div className="bg-yellow-50 border border-yellow-200 rounded-md p-3 text-sm text-yellow-800">
            <p className="font-medium">Atenção:</p>
            <p>
              Ao estornar, a conta voltará ao status "em aberto" e o valor será restaurado.
              {payments.length > 0 && (
                <> O estorno via <strong>{paymentMethodLabels[payments[payments.length - 1].paymentMethod] || payments[payments.length - 1].paymentMethod}</strong> requer o retorno do valor.</>
              )}
            </p>
          </div>

          <div className="flex justify-end space-x-3 pt-4">
            <button
              type="button"
              onClick={handleClose}
              className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="px-4 py-2 text-sm font-medium text-white bg-orange-600 rounded-md hover:bg-orange-700"
            >
              Confirmar Estorno
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default StornoModal;