export interface PaymentRecord {
  id: string;
  accountId: string;
  type: 'full' | 'partial';
  paymentDate: string;
  amount: number;
  paymentMethod: 'pix' | 'boleto' | 'conta' | string;
  bankAccountId?: string;
}

const STORAGE_KEY = 'financial_payments';

export const getPayments = (): PaymentRecord[] => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    return JSON.parse(raw) as PaymentRecord[];
  } catch (e) {
    console.error('Erro ao ler payments do localStorage', e);
    return [];
  }
};

export const addPayment = (payment: PaymentRecord) => {
  const all = getPayments();
  all.push(payment);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(all));
};

export const clearPayments = () => {
  localStorage.removeItem(STORAGE_KEY);
};
