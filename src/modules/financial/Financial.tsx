import React from 'react';
import AccountsPayable from './accounts-payable/AccountsPayable';

export default function Financial() {
  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Financeiro</h1>
      <div className="bg-white rounded-lg shadow-sm border p-6">
        <AccountsPayable />
      </div>
    </div>
  )
}