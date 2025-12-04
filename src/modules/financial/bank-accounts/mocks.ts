// Mocks para testes do BankAccounts
export const mockBankAccounts = [
  {
    id: '1',
    description: 'Conta Corrente Principal',
    agency: '0001',
    balance: 15000.00,
    pix: true,
    boleto: true,
    card: true,
  },
  {
    id: '2',
    description: 'Conta Poupança',
    agency: '0002',
    balance: 8500.50,
    pix: true,
    boleto: false,
    card: false,
  },
  {
    id: '3',
    description: 'Conta de Investimentos',
    agency: '0003',
    balance: 25000.00,
    pix: false,
    boleto: true,
    card: true,
  },
  {
    id: '4',
    description: 'Conta Operacional',
    agency: '0004',
    balance: 5200.75,
    pix: true,
    boleto: true,
    card: false,
  },
];

export const mockNewBankAccount = {
  description: 'Nova Conta Bancária',
  agency: '0005',
  balance: 0,
  pix: true,
  boleto: false,
  card: true,
};

export const mockEditBankAccount = {
  id: '1',
  description: 'Conta Corrente Principal - Atualizada',
  agency: '0001',
  balance: 16500.00,
  pix: true,
  boleto: true,
  card: true,
};

export const mockDeleteBankAccountId = '4';
