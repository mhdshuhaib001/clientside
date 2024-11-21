
import { useState } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'

interface Transaction {
  id: string
  method: string
  amount: number
  status: 'successful' | 'pending'
  date: string
}

export default function Component() {
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 3

  const transactions: Transaction[] = [
    { id: '1258488455', method: 'card', amount: 1800, status: 'successful', date: 'June 25, 2024' },
    { id: '1258488482', method: 'paypal', amount: 1900, status: 'successful', date: 'June 13, 2024' },
    { id: '1258488536', method: 'bank', amount: 2000, status: 'pending', date: 'June 2, 2024' },
    { id: '1258488537', method: 'card', amount: 2100, status: 'successful', date: 'May 28, 2024' },
    { id: '1258488538', method: 'bank', amount: 1700, status: 'pending', date: 'May 25, 2024' },
  ]

  const totalPages = Math.ceil(transactions.length / itemsPerPage)
  const startIndex = (currentPage - 1) * itemsPerPage
  const currentTransactions = transactions.slice(startIndex, startIndex + itemsPerPage)

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-8">
      <div className="mx-auto max-w-4xl space-y-6">
        <div className="grid gap-6 md:grid-cols-2">
          {/* Card Display */}
          <div className="relative h-48 rounded-xl bg-gradient-to-br from-emerald-400 to-white p-6 text-white shadow-lg">
            <div className="absolute right-6 top-6">
              <div className="flex gap-1">
                <div className="h-6 w-6 rounded-full bg-yellow-500 opacity-80"></div>
                <div className="h-6 w-6 rounded-full bg-yellow-600 opacity-80"></div>
              </div>
            </div>
            <div className="mt-8 space-y-4">
              <p className="text-2xl font-bold tracking-wider">873****329</p>
              <div className="flex justify-between">
                <div>
                  <p className="text-sm opacity-80">Card Holder Name</p>
                  <p className="font-medium">Shuhaib</p>
                </div>
                <div>
                  <p className="text-sm opacity-80">Expired Date</p>
                  <p className="font-medium">10/28</p>
                </div>
              </div>
            </div>
          </div>

          {/* Balance Display */}
          <div className="rounded-xl bg-yellow-100 p-6">
            <p className="text-sm font-medium text-gray-600">Wallet Balance</p>
            <p className="mt-4 text-center text-3xl font-bold text-gray-900">US $ 1200</p>
          </div>
        </div>

        {/* Transaction History */}
        <div className="mt-8 rounded-xl bg-white p-4 shadow-md">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-gray-900 text-left text-sm text-white">
                  <th className="whitespace-nowrap rounded-l-lg px-4 py-3">Transaction ID</th>
                  <th className="whitespace-nowrap px-4 py-3">Method</th>
                  <th className="whitespace-nowrap px-4 py-3">Amount</th>
                  <th className="whitespace-nowrap px-4 py-3">Status</th>
                  <th className="whitespace-nowrap rounded-r-lg px-4 py-3">Transaction Date</th>
                </tr>
              </thead>
              <tbody className="divide-y">
                {currentTransactions.map((transaction) => (
                  <tr key={transaction.id} className="text-sm">
                    <td className="px-4 py-3">{transaction.id}</td>
                    <td className="px-4 py-3 capitalize">{transaction.method}</td>
                    <td className="px-4 py-3">${transaction.amount}</td>
                    <td className="px-4 py-3">
                      <span
                        className={`inline-block rounded-full px-2 py-1 text-xs font-medium ${
                          transaction.status === 'successful'
                            ? 'bg-green-100 text-green-700'
                            : 'bg-red-100 text-red-700'
                        }`}
                      >
                        {transaction.status}
                      </span>
                    </td>
                    <td className="px-4 py-3">{transaction.date}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          <div className="mt-4 flex items-center justify-between border-t pt-4">
            <button
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              className="flex items-center gap-1 rounded px-3 py-1 text-sm font-medium text-gray-600 hover:bg-gray-100 disabled:opacity-50"
            >
              <ChevronLeft className="h-4 w-4" />
              Previous
            </button>
            <span className="text-sm text-gray-600">
              Page {currentPage} of {totalPages}
            </span>
            <button
              onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
              disabled={currentPage === totalPages}
              className="flex items-center gap-1 rounded px-3 py-1 text-sm font-medium text-gray-600 hover:bg-gray-100 disabled:opacity-50"
            >
              Next
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}