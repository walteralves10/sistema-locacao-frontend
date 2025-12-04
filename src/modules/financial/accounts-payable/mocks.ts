// Mocks para testes do AccountsPayable
export const mockAccountsPayable = [
  {
    id: '1',
    plan: '1.1.1.01',
    costCenter: 'Administrativo',
    description: 'Fatura de energia elétrica',
    amount: 250.00,
    bankAccount: '1234-5',
  },
  {
    id: '2',
    plan: '1.1.2.01',
    costCenter: 'Administrativo',
    description: 'Aluguel do escritório',
    amount: 5000.00,
    bankAccount: '6789-0',
  },
  {
    id: '3',
    plan: '1.1.3.01',
    costCenter: 'TI',
    description: 'Fatura de internet',
    amount: 150.00,
    bankAccount: '1111-2',
  },
  {
    id: '4',
    plan: '1.1.4.01',
    costCenter: 'TI',
    description: 'Licenças de software',
    amount: 800.00,
    bankAccount: '1234-5',
  },
];

export const mockNewAccountPayable = {
  plan: '1.1.5.01',
  costCenter: 'Financeiro',
  description: 'Nova conta a pagar',
  amount: 1200.00,
  bankAccount: '6789-0',
};

export const mockEditAccountPayable = {
  id: '1',
  plan: '1.1.1.01',
  costCenter: 'Administrativo',
  description: 'Fatura de energia elétrica - Junho',
  amount: 275.50,
  bankAccount: '1234-5',
};

export const mockDeleteAccountPayableId = '4';
