import React from 'react'
import { BarChart, Bar, PieChart, Pie, Cell, ResponsiveContainer, XAxis, YAxis, Tooltip, Legend } from "recharts"
import { Gavel, Users, ShoppingBag, DollarSign } from "lucide-react"

// Mock data - replace with actual data fetching in a real application
const totalAuctions = 1234
const liveAuctions = 56
const totalSellers = 789
const totalRevenue = 567890

const categorySales = [
  { name: "Furniture", value: 400 },
  { name: "Jewelry", value: 300 },
  { name: "Art", value: 200 },
  { name: "Collectibles", value: 100 },
]

const monthlyRevenue = [
  { month: "Jan", revenue: 65000 },
  { month: "Feb", revenue: 59000 },
  { month: "Mar", revenue: 80000 },
  { month: "Apr", revenue: 81000 },
  { month: "May", revenue: 56000 },
  { month: "Jun", revenue: 55000 },
  { month: "Jul", revenue: 40000 },
]

const sellerReports = [
  { id: 1, name: "VintageVault", totalSales: 45, revenue: 12500, rating: 4.8 },
  { id: 2, name: "RetroRealm", totalSales: 38, revenue: 9800, rating: 4.6 },
  { id: 3, name: "AntiqueTreasures", totalSales: 52, revenue: 15600, rating: 4.9 },
  { id: 4, name: "NostalgicFinds", totalSales: 30, revenue: 7500, rating: 4.5 },
]

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042']

export default function AdminDashboard() {
  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <h1 className="text-4xl font-bold mb-8 text-gray-800">Vintage Auction Admin Dashboard</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-sm font-medium text-gray-500">Total Auctions</h2>
            <Gavel className="h-6 w-6 text-blue-500" />
          </div>
          <p className="text-3xl font-bold text-gray-700">{totalAuctions}</p>
        </div>
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-sm font-medium text-gray-500">Live Auctions</h2>
            <ShoppingBag className="h-6 w-6 text-green-500" />
          </div>
          <p className="text-3xl font-bold text-gray-700">{liveAuctions}</p>
        </div>
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-sm font-medium text-gray-500">Total Sellers</h2>
            <Users className="h-6 w-6 text-purple-500" />
          </div>
          <p className="text-3xl font-bold text-gray-700">{totalSellers}</p>
        </div>
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-sm font-medium text-gray-500">Total Revenue</h2>
            <DollarSign className="h-6 w-6 text-yellow-500" />
          </div>
          <p className="text-3xl font-bold text-gray-700">${totalRevenue.toLocaleString()}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold mb-4 text-gray-700">Monthly Revenue</h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={monthlyRevenue}>
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="revenue" fill="#8884d8" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold mb-4 text-gray-700">Category Sales</h2>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={categorySales}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
              >
                {categorySales.map((_item, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-xl font-semibold mb-4 text-gray-700">Top Seller Reports</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Seller Name</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Total Sales</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Revenue</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Rating</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {sellerReports.map((seller) => (
                <tr key={seller.id}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{seller.name}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{seller.totalSales}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">${seller.revenue.toLocaleString()}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{seller.rating.toFixed(1)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}