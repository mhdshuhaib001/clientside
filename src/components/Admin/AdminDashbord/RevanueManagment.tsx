
import React, { useState, useEffect } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

interface Transaction {
  id: number;
  date: string;
  amount: number;
  product: string;
  seller: string;
}

const RevenueManagement: React.FC = () => {
  const [totalRevenue, setTotalRevenue] = useState<number>(0);
  const [averageSale, setAverageSale] = useState<number>(0);
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [, setMonthlyRevenue] = useState<{ name: string; revenue: number }[]>([]);
  const [, setWeeklyRevenue] = useState<{ name: string; revenue: number }[]>([]);
  const [, setYearlyRevenue] = useState<{ name: string; revenue: number }[]>([]);
  const [currentChartView, setCurrentChartView] = useState<'weekly' | 'monthly' | 'yearly'>('monthly');

  useEffect(() => {
    // Simulating API call to fetch data
    const fetchData = () => {
      // This is mock data. In a real application, you'd fetch this from your backend.
      const mockTransactions: Transaction[] = [
        { id: 1, date: '2023-05-01', amount: 150, product: 'Vintage Clock', seller: 'John Doe' },
        { id: 2, date: '2023-05-02', amount: 200, product: 'Antique Vase', seller: 'Jane Smith' },
        { id: 3, date: '2023-05-03', amount: 100, product: 'Retro Radio', seller: 'Bob Johnson' },
        { id: 4, date: '2023-05-04', amount: 300, product: 'Vintage Camera', seller: 'Alice Brown' },
        { id: 5, date: '2023-05-05', amount: 250, product: 'Old Typewriter', seller: 'Charlie Wilson' },
      ];

      const mockMonthlyRevenue = [
        { name: 'January', revenue: 1000 },
        { name: 'February', revenue: 1200 },
        { name: 'March', revenue: 900 },
        { name: 'April', revenue: 1500 },
        { name: 'May', revenue: 1800 },
        { name: 'June', revenue: 2000 },
      ];

      const mockWeeklyRevenue = [
        { name: 'Week 1', revenue: 200 },
        { name: 'Week 2', revenue: 250 },
        { name: 'Week 3', revenue: 180 },
        { name: 'Week 4', revenue: 300 },
        { name: 'Week 5', revenue: 400 },
        { name: 'Week 6', revenue: 320 },
        { name: 'Week 7', revenue: 250 },
      ];

      const mockYearlyRevenue = [
        { name: '2018', revenue: 12000 },
        { name: '2019', revenue: 14000 },
        { name: '2020', revenue: 10000 },
        { name: '2021', revenue: 18000 },
        { name: '2022', revenue: 22000 },
        { name: '2023', revenue: 24000 },
      ];

      setTransactions(mockTransactions);
      setMonthlyRevenue(mockMonthlyRevenue);
      setWeeklyRevenue(mockWeeklyRevenue);
      setYearlyRevenue(mockYearlyRevenue);
      const total = mockTransactions.reduce((sum, transaction) => sum + transaction.amount, 0);
      setTotalRevenue(total);
      setAverageSale(total / mockTransactions.length);
    };

    fetchData();
  }, []);

  const handleChartViewChange = (view: 'weekly' | 'monthly' | 'yearly') => {
    setCurrentChartView(view);
  };

  return (
    <div className="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-extrabold text-gray-900 mb-10 text-center">Revenue Management</h1>
        
        <div className="bg-white overflow-hidden shadow-xl sm:rounded-lg">
          <div className="p-6 sm:p-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <div className="bg-blue-50 overflow-hidden shadow rounded-lg">
                <div className="px-4 py-5 sm:p-6">
                  <dt className="text-sm font-medium text-blue-500 truncate">Total Revenue</dt>
                  <dd className="mt-1 text-3xl font-semibold text-blue-800">${totalRevenue.toFixed(2)}</dd>
                </div>
              </div>
              <div className="bg-green-50 overflow-hidden shadow rounded-lg">
                <div className="px-4 py-5 sm:p-6">
                  <dt className="text-sm font-medium text-green-500 truncate">Total Transactions</dt>
                  <dd className="mt-1 text-3xl font-semibold text-green-800">{transactions.length}</dd>
                </div>
              </div>
              <div className="bg-purple-50 overflow-hidden shadow rounded-lg">
                <div className="px-4 py-5 sm:p-6">
                  <dt className="text-sm font-medium text-purple-500 truncate">Average Sale</dt>
                  <dd className="mt-1 text-3xl font-semibold text-purple-800">${averageSale.toFixed(2)}</dd>
                </div>
              </div>
            </div>

            <div className="mb-8">
              <h2 className="text-xl font-semibold text-gray-800 mb-4">Revenue Over Time</h2>
              <div className="bg-white p-4 rounded-lg shadow">
                <div className="flex justify-end mb-4">
                  <div className="flex space-x-4">
                    <button
                      className={`px-4 py-2 rounded-md ${currentChartView === 'weekly' ? 'bg-blue-500 text-white' : 'hover:bg-gray-200'}`}
                      onClick={() => handleChartViewChange('weekly')}
                    >
                      Weekly
                    </button>
                    <button
                      className={`px-4 py-2 rounded-md ${currentChartView === 'monthly' ? 'bg-blue-500 text-white' : 'hover:bg-gray-200'}`}
                      onClick={() => handleChartViewChange('monthly')}
                    >
                      Monthly
                    </button>
                    <button
                      className={`px-4 py-2 rounded-md ${currentChartView === 'yearly' ? 'bg-blue-500 text-white' : 'hover:bg-gray-200'}`}
                      onClick={() => handleChartViewChange('yearly')}
                    >
                      Yearly
                    </button>
                  </div>
                </div>
                <ResponsiveContainer width="100%" height={400}>
                  <LineChart>
                    <XAxis dataKey="name" />
                    <YAxis />
                    <CartesianGrid strokeDasharray="3 3" />
                    <Tooltip />
                    <Legend />
                    <Line type="monotone" dataKey="revenue" stroke="#8884d8" />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>

            <div className="mb-8">
              <h2 className="text-xl font-semibold text-gray-800 mb-4">Recent Transactions</h2>
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Product</th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Seller</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {transactions.map((transaction) => (
                      <tr key={transaction.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{transaction.date}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">${transaction.amount.toFixed(2)}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{transaction.product}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{transaction.seller}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            <div className="flex justify-end">
              <button
                onClick={() => console.log('Downloading report...')}
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Download Revenue Report
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RevenueManagement;


