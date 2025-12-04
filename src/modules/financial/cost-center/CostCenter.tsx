import React, { useState, useEffect } from 'react';
import CostCenterTable from './CostCenterTable';
import CostCenterModal from './CostCenterModal';
import { Plus } from 'lucide-react';
import { mockCostCenters } from './mocks';

interface CostCenterItem {
  id: string;
  description: string;
  type: 'revenue' | 'expense';
}

const CostCenter: React.FC = () => {
  const [centers, setCenters] = useState<CostCenterItem[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingCenter, setEditingCenter] = useState<CostCenterItem | null>(null);

  // Carregar centros de custo (usando mocks)
  useEffect(() => {
    setCenters(mockCostCenters);
  }, []);

  const openCreateModal = () => {
    setEditingCenter(null);
    setIsModalOpen(true);
  };

  const openEditModal = (center: CostCenterItem) => {
    setEditingCenter(center);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setEditingCenter(null);
  };

  const handleSaveCenter = (center: CostCenterItem) => {
    if (editingCenter) {
      // Atualizar centro existente
      setCenters(centers.map(c => c.id === center.id ? center : c));
    } else {
      // Adicionar novo centro
      setCenters([...centers, { ...center, id: Date.now().toString() }]);
    }
    closeModal();
  };

  const handleDeleteCenter = (id: string) => {
    setCenters(centers.filter(center => center.id !== id));
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900">Centro de Custos</h1>
        <button
          onClick={openCreateModal}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md transition-colors duration-200 flex items-center"
        >
          <Plus className="w-4 h-4 mr-2" />
          Novo Centro
        </button>
      </div>

      <div className="bg-white rounded-lg shadow-sm border p-6">
        <CostCenterTable 
          centers={centers} 
          onEdit={openEditModal}
          onDelete={handleDeleteCenter}
        />
      </div>

      <CostCenterModal
        isOpen={isModalOpen}
        onClose={closeModal}
        onSave={handleSaveCenter}
        center={editingCenter}
      />
    </div>
  );
};

export default CostCenter;
