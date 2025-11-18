import { Outlet } from 'react-router-dom'

export default function Layout() {
  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <h1 className="text-xl font-semibold text-gray-900">
              Sistema de Locação de Impressoras
            </h1>
            <nav className="flex space-x-4">
              <a href="/sistema-locacao-frontend/" className="text-gray-600 hover:text-gray-900">Dashboard</a>
              <a href="/sistema-locacao-frontend/printers" className="text-gray-600 hover:text-gray-900">Impressoras</a>
              <a href="/sistema-locacao-frontend/financial" className="text-gray-600 hover:text-gray-900">Financeiro</a>
            </nav>
          </div>
        </div>
      </header>
      
      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <Outlet />
      </main>
    </div>
  )
}