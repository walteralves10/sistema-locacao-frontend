import { Route, Routes } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'

import Layout from '@components/layout/Layout'
import Dashboard from '@modules/dashboard/Dashboard'
import Printers from '@modules/printers/Printers'
import Financial from '@modules/financial/Financial'
import Services from '@modules/services/Services'
import Recharge from '@modules/recharge/Recharge'
import Login from '@modules/auth/Login'
import AccountsPayable from '@modules/financial/accounts-payable/AccountsPayable'
import AccountsReceivable from '@modules/financial/accounts-receivable/AccountsReceivable'
import BankAccounts from '@modules/financial/bank-accounts/BankAccounts'

function App() {

  return (
    <>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<Layout />}>
          <Route index element={<Dashboard />} />
          <Route path="printers" element={<Printers />} />
          <Route path="financial" element={<Financial />}>
            <Route index element={<AccountsPayable />} />
            <Route path="accounts-payable" element={<AccountsPayable />} />
            <Route path="accounts-receivable" element={<AccountsReceivable />} />
            <Route path="bank-accounts" element={<BankAccounts />} />
          </Route>
          <Route path="services" element={<Services />} />
          <Route path="recharge" element={<Recharge />} />
        </Route>
      </Routes>
      <Toaster position="top-right" />
    </>
  )
}

export default App
