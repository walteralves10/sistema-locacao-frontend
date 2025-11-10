

export default function Dashboard() {
  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <h3 className="text-lg font-medium">Impressoras Ativas</h3>
          <p className="text-2xl font-bold text-primary-600">12</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <h3 className="text-lg font-medium">Contratos Ativos</h3>
          <p className="text-2xl font-bold text-primary-600">8</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <h3 className="text-lg font-medium">Faturamento Mensal</h3>
          <p className="text-2xl font-bold text-primary-600">R$ 5.240,00</p>
        </div>
      </div>
    </div>
  )
}