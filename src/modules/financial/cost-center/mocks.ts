// Mocks para testes do CostCenter
export const mockCostCenters = [
  {
    id: '1',
    description: 'Administrativo',
    type: 'expense' as const,
  },
  {
    id: '2',
    description: 'TI',
    type: 'expense' as const,
  },
  {
    id: '3',
    description: 'Vendas',
    type: 'revenue' as const,
  },
  {
    id: '4',
    description: 'Financeiro',
    type: 'expense' as const,
  },
  {
    id: '5',
    description: 'Operações',
    type: 'expense' as const,
  },
];

export const mockNewCostCenter = {
  description: 'Novo Centro de Custos',
  type: 'expense' as const,
};

export const mockEditCostCenter = {
  id: '1',
  description: 'Administrativo - Atualizado',
  type: 'expense' as const,
};

export const mockDeleteCostCenterId = '5';
