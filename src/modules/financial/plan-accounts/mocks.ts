// Mocks para testes do PlanAccount
export const mockPlanAccounts = [
  {
    id: '1',
    description: 'Receita de Vendas',
    type: 'revenue' as const,
  },
  {
    id: '2',
    description: 'Receita de Serviços',
    type: 'revenue' as const,
  },
  {
    id: '3',
    description: 'Salários',
    type: 'expense' as const,
  },
  {
    id: '4',
    description: 'Aluguel',
    type: 'expense' as const,
  },
  {
    id: '5',
    description: 'Energia Elétrica',
    type: 'expense' as const,
  },
];

export const mockNewPlanAccount = {
  description: 'Novo Plano de Conta',
  type: 'revenue' as const,
};

export const mockEditPlanAccount = {
  id: '1',
  description: 'Receita de Vendas - Atualizado',
  type: 'revenue' as const,
};

export const mockDeletePlanAccountId = '3';
