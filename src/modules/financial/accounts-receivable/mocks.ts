// Mocks para testes do AccountsReceivable
export const mockAccountsReceivable = [
  {
    id: '1',
    plan: '2.1.1.01',
    costCenter: 'Vendas',
    description: 'Venda para Cliente A',
    amount: 3500.00,
    bankAccount: '1234-5',
    dueDate: '2025-12-15',
  },
  {
    id: '2',
    plan: '2.1.2.01',
    costCenter: 'Vendas',
    description: 'Venda para Cliente B',
    amount: 1800.00,
    bankAccount: '6789-0',
    dueDate: '2025-12-20',
  },
  {
    id: '3',
    plan: '2.1.3.01',
    costCenter: 'Serviços',
    description: 'Serviço de consultoria',
    amount: 2500.00,
    bankAccount: '1111-2',
    dueDate: '2025-12-10',
  },
  {
    id: '4',
    plan: '2.1.4.01',
    costCenter: 'Serviços',
    description: 'Suporte técnico',
    amount: 950.00,
    bankAccount: '1234-5',
    dueDate: '2025-12-25',
  },
];

export const mockNewAccountReceivable = {
  plan: '2.1.5.01',
  costCenter: 'Vendas',
  description: 'Nova conta a receber',
  amount: 4200.00,
  bankAccount: '6789-0',
  dueDate: '2025-12-30',
};

export const mockEditAccountReceivable = {
  id: '1',
  plan: '2.1.1.01',
  costCenter: 'Vendas',
  description: 'Venda para Cliente A - Novembro',
  amount: 3750.00,
  bankAccount: '1234-5',
  dueDate: '2025-12-18',
};

export const mockDeleteAccountReceivableId = '4';
