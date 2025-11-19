import { useEffect, useState } from 'react'
import { Outlet, useNavigate, type To } from 'react-router-dom'
import { LogOut, User, Home, Printer, DollarSign, Wrench, Zap, Menu, X, ChevronDown } from 'lucide-react'

export default function Layout() {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [financialOpen, setFinancialOpen] = useState(false)
  const [registrationOpen, setRegistrationOpen] = useState(false)
  const navigate = useNavigate()

  const navigationLinks = [
    { href: '/', label: 'Dashboard', icon: Home },
    { href: '/sistema-locacao-frontend/printers', label: 'Impressoras', icon: Printer },
    { href: '/sistema-locacao-frontend/services', label: 'Serviços', icon: Wrench },
    { href: '/sistema-locacao-frontend/recharge', label: 'Recarga', icon: Zap },
  ]

  const financialLinks = [
    { href: '/financial/accounts-payable', label: 'Contas a Pagar' },
    { href: '/financial/accounts-receivable', label: 'Contas a Receber' },
    { href: '/financial/bank-accounts', label: 'Contas Bancárias' },
  ]

  const registrationLinks = [
    { href: '/registration/categories', label: 'Categorias' },
    { href: '/registration/clients', label: 'Clientes' },
    { href: '/registration/suppliers', label: 'Fornecedores' },
  ]

  useEffect(() => {
    // quando sidebar aberto em mobile, impedir scroll do body
    document.body.style.overflow = sidebarOpen ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [sidebarOpen])

  const handleLink = (href: To) => {
    navigate(href)
    setSidebarOpen(false)
  }

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Overlay para mobile */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-30 bg-black/40 md:hidden"
          onClick={() => setSidebarOpen(false)}
          aria-hidden
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed inset-y-0 left-0 z-40 w-64 bg-white shadow-lg transform transition-transform duration-200 md:static md:translate-x-0 md:flex md:flex-col
        ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}
        aria-label="Sidebar"
      >
        {/* Logo */}
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center justify-center w-12 h-12 rounded-lg">
            <Printer className="w-6 h-6 text-black" />
          </div>
          <h2 className="mt-3 text-lg font-bold text-gray-900">LOC Impressoras</h2>
        </div>

        {/* Navigation Links */}
        <nav className="flex-1 px-4 py-6 space-y-2">
          {navigationLinks.map((link) => {
            const Icon = link.icon
            return (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setSidebarOpen(false)}
                className="flex items-center gap-3 px-4 py-3 text-gray-900 rounded-lg hover:bg-gray-50 hover:text-gray-600 transition-colors"
              >
                <Icon className="w-5 h-5" />
                <span className="font-medium">{link.label}</span>
              </a>
            )
          })}

          {/* Financeiro Dropdown */}
          <div className="relative">
            <button
              onClick={() => setFinancialOpen(!financialOpen)}
              className="w-full flex items-center justify-between gap-3 px-4 py-3 text-gray-900 rounded-lg hover:bg-gray-50 hover:text-gray-600 transition-colors"
            >
              <div className="flex items-center gap-3 cursor-pointer">
                <DollarSign className="w-5 h-5" />
                <span className="font-medium">Financeiro</span>
              </div>
              <ChevronDown
                className={`w-4 h-4 transition-transform duration-200 ${
                  financialOpen ? 'rotate-180' : ''
                }`}
              />
            </button>

            {/* Dropdown Menu */}
            {financialOpen && (
              <div className="mt-1 ml-4 space-y-1 border-l-2 border-primary-200 pl-4">
                {financialLinks.map((link) => (
                  <button
                    key={link.href}
                    onClick={() => handleLink(link.href)}
                    className="w-full text-left px-3 py-2 text-sm text-gray-900 rounded-lg hover:bg-gray-50 hover:text-gray-600 transition-colors"
                  >
                    {link.label}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Cadastros Dropdown */}
          <div className="relative">
            <button
              onClick={() => setRegistrationOpen(!registrationOpen)}
              className="w-full flex items-center justify-between gap-3 px-4 py-3 text-gray-900 rounded-lg hover:bg-gray-50 hover:text-gray-600 transition-colors"
            >
              <div className="flex items-center gap-3 cursor-pointer">
                <DollarSign className="w-5 h-5" />
                <span className="font-medium">Cadastro</span>
              </div>
              <ChevronDown
                className={`w-4 h-4 transition-transform duration-200 ${
                  registrationOpen ? 'rotate-180' : ''
                }`}
              />
            </button>

            {/* Dropdown Menu */}
            {registrationOpen && (
              <div className="mt-1 ml-4 space-y-1 border-l-2 border-primary-200 pl-4">
                {registrationLinks.map((link) => (
                  <button
                    key={link.href}
                    onClick={() => handleLink(link.href)}
                    className="w-full text-left px-3 py-2 text-sm text-gray-900 rounded-lg hover:bg-gray-50 hover:text-gray-600 transition-colors"
                  >
                    {link.label}
                  </button>
                ))}
              </div>
            )}
          </div>
        </nav>

        {/* User Profile */}
        <div className="p-4 border-t border-gray-200">
          <button className="flex items-center gap-3 w-full px-4 py-3 text-gray-700 rounded-lg hover:bg-gray-100 transition-colors">
            <div className="w-10 h-10 bg-primary-100 rounded-full flex items-center justify-center">
              <User className="w-5 h-5 text-primary-600" />
            </div>
            <div className="flex-1 text-left">
              <p className="text-sm font-medium text-gray-900">Usuário</p>
              <p className="text-xs text-gray-500">user@example.com</p>
            </div>
          </button>
          <button className="flex items-center gap-2 w-full mt-2 px-4 py-2 text-red-600 rounded-lg hover:bg-red-50 transition-colors text-sm font-medium">
            <LogOut className="w-4 h-4" />
            Sair
          </button>
        </div> 
      </aside>

      {/* Botão menu mobile */}
      <button
        className="md:hidden p-2 rounded-md hover:bg-gray-100 flex flex-col md:pl-64"
        onClick={() => setSidebarOpen((s) => !s)}
        aria-label="Abrir menu"
      >
        {sidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
      </button>

      {/* Content Area */}
      <main className="flex-1 overflow-auto p-4 md:p-8">
        <Outlet />
      </main>
    </div>
  )
}