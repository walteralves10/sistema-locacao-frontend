export interface ReversalRecord {
  id: string;
  accountId: string;
  reason: string;
  reversedAt: string;
  paymentMethod: string;
  reversedAmount: number;
  paymentType: 'full' | 'partial';
}

const STORAGE_KEY = 'financial_reversals';

export const getReversals = (): ReversalRecord[] => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    return JSON.parse(raw) as ReversalRecord[];
  } catch {
    return [];
  }
};

export const addReversal = (reversal: ReversalRecord) => {
  const all = getReversals();
  all.push(reversal);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(all));
};

export const getReversalsByAccountId = (accountId: string): ReversalRecord[] => {
  return getReversals().filter(r => r.accountId === accountId);
};