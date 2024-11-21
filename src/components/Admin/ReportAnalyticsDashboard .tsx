
import React, { useState } from 'react'
import { BarChart, Bar, PieChart, Pie, Cell, ResponsiveContainer, XAxis, YAxis, Tooltip, Legend } from "recharts"
import { Gavel, Users, ShoppingBag, DollarSign } from "lucide-react"

const totalAuctions = 20
const liveAuctions = 4
const totalSellers = 2
const totalRevenue = 5678

const categorySales = [
  { name: "Painting", value: 400 },
  { name: "Jewelry", value: 300 },
  { name: "Furniture", value: 200 },
  { name: "Jewellery", value: 100 },
]

const revenueData = {
  daily: [
    { date: "Mon", revenue: 2500 },
    { date: "Tue", revenue: 3200 },
    { date: "Wed", revenue: 2800 },
    { date: "Thu", revenue: 3500 },
    { date: "Fri", revenue: 4000 },
    { date: "Sat", revenue: 3800 },
    { date: "Sun", revenue: 3000 },
  ],
  weekly: [
    { date: "Week 1", revenue: 22000 },
    { date: "Week 2", revenue: 25000 },
    { date: "Week 3", revenue: 28000 },
    { date: "Week 4", revenue: 30000 },
  ],
  monthly: [
    { date: "Jan", revenue: 65000 },
    { date: "Feb", revenue: 59000 },
    { date: "Mar", revenue: 80000 },
    { date: "Apr", revenue: 81000 },
    { date: "May", revenue: 56000 },
    { date: "Jun", revenue: 55000 },
    { date: "Jul", revenue: 40000 },
  ],
  yearly: [
    { date: "2019", revenue: 450000 },
    { date: "2020", revenue: 520000 },
    { date: "2021", revenue: 680000 },
    { date: "2022", revenue: 790000 },
    { date: "2023", revenue: 850000 },
  ],
}

const sellerReports = [
  { id: 1, name: "Loom-Fashion", totalSales: 4, revenue: 12500, rating: 4.8 },
  { id: 2, name: "Antigo", totalSales: 3, revenue: 9800, rating: 4.6 },
  // { id: 3, name: "VintageHunt", totalSales: 0, revenue: 15600, rating: 4.9 },
]

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042']

export default function AdminDashboard() {
  const [revenueFilter, setRevenueFilter] = useState('monthly')

  return (
    <div className="min-h-screen bg-gray-100 p-4 sm:p-6 lg:p-8">
      <h1 className="text-3xl sm:text-4xl font-bold mb-6 text-gray-800">Vintage Auction Admin Dashboard</h1>
      
      <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <div className="bg-white rounded-lg shadow-md p-4">
          <div className="flex items-center justify-between mb-2">
            <h2 className="text-xs sm:text-sm font-medium text-gray-500">Total Auctions</h2>
            <Gavel className="h-5 w-5 text-blue-500" />
          </div>
          <p className="text-xl sm:text-2xl font-bold text-gray-700">{totalAuctions}</p>
        </div>
        <div className="bg-white rounded-lg shadow-md p-4">
          <div className="flex items-center justify-between mb-2">
            <h2 className="text-xs sm:text-sm font-medium text-gray-500">Live Auctions</h2>
            <ShoppingBag className="h-5 w-5 text-green-500" />
          </div>
          <p className="text-xl sm:text-2xl font-bold text-gray-700">{liveAuctions}</p>
        </div>
        <div className="bg-white rounded-lg shadow-md p-4">
          <div className="flex items-center justify-between mb-2">
            <h2 className="text-xs sm:text-sm font-medium text-gray-500">Total Sellers</h2>
            <Users className="h-5 w-5 text-purple-500" />
          </div>
          <p className="text-xl sm:text-2xl font-bold text-gray-700">{totalSellers}</p>
        </div>
        <div className="bg-white rounded-lg shadow-md p-4">
          <div className="flex items-center justify-between mb-2">
            <h2 className="text-xs sm:text-sm font-medium text-gray-500">Total Revenue</h2>
            <DollarSign className="h-5 w-5 text-yellow-500" />
          </div>
          <p className="text-xl sm:text-2xl font-bold text-gray-700">${totalRevenue.toLocaleString()}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        <div className="bg-white rounded-lg shadow-md p-4">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4">
            <h2 className="text-lg font-semibold text-gray-700 mb-2 sm:mb-0">Revenue</h2>
            <div className="flex flex-wrap gap-2">
              {['daily', 'weekly', 'monthly', 'yearly'].map((filter) => (
                <button
                  key={filter}
                  onClick={() => setRevenueFilter(filter)}
                  className={`px-3 py-1 text-xs font-medium rounded-full ${
                    revenueFilter === filter
                      ? 'bg-blue-500 text-white'
                      : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                  }`}
                >
                  {filter.charAt(0).toUpperCase() + filter.slice(1)}
                </button>
              ))}
            </div>
          </div>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={revenueData[revenueFilter as keyof typeof revenueData]}>
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="revenue" fill="#8884d8" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-white rounded-lg shadow-md p-4">
          <h2 className="text-lg font-semibold mb-4 text-gray-700">Category Sales</h2>
          <ResponsiveContainer width="100%" height={200}>
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
                {categorySales.map((_entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-md p-4">
        <h2 className="text-lg font-semibold mb-4 text-gray-700">Top Seller Reports</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Seller Name</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Total Sales</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Revenue</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Rating</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {sellerReports.map((seller) => (
                <tr key={seller.id}>
                  <td className="px-4 py-3 whitespace-nowrap text-sm font-medium text-gray-900">{seller.name}</td>
                  <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">{seller.totalSales}</td>
                  <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">${seller.revenue.toLocaleString()}</td>
                  <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">{seller.rating.toFixed(1)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

















// import React, { useState } from 'react'
// import { BarChart, Bar, PieChart, Pie, Cell, ResponsiveContainer, XAxis, YAxis, Tooltip, Legend } from "recharts"
// import { Gavel, Users, ShoppingBag, DollarSign, Download, Filter } from "lucide-react"

// // Mock data - replace with actual data fetching in a real application
// const totalAuctions = 1234
// const liveAuctions = 56
// const totalSellers = 789
// const totalRevenue = 567890

// const categorySales = [
//   { name: "Furniture", value: 400 },
//   { name: "Jewelry", value: 300 },
//   { name: "Art", value: 200 },
//   { name: "Collectibles", value: 100 },
// ]

// const revenueData = {
//   daily: [
//     { date: "Mon", revenue: 2500, fees: 250 },
//     { date: "Tue", revenue: 3200, fees: 320 },
//     { date: "Wed", revenue: 2800, fees: 280 },
//     { date: "Thu", revenue: 3500, fees: 350 },
//     { date: "Fri", revenue: 4000, fees: 400 },
//     { date: "Sat", revenue: 3800, fees: 380 },
//     { date: "Sun", revenue: 3000, fees: 300 },
//   ],
//   weekly: [
//     { date: "Week 1", revenue: 22000, fees: 2200 },
//     { date: "Week 2", revenue: 25000, fees: 2500 },
//     { date: "Week 3", revenue: 28000, fees: 2800 },
//     { date: "Week 4", revenue: 30000, fees: 3000 },
//   ],
//   monthly: [
//     { date: "Jan", revenue: 65000, fees: 6500 },
//     { date: "Feb", revenue: 59000, fees: 5900 },
//     { date: "Mar", revenue: 80000, fees: 8000 },
//     { date: "Apr", revenue: 81000, fees: 8100 },
//     { date: "May", revenue: 56000, fees: 5600 },
//     { date: "Jun", revenue: 55000, fees: 5500 },
//     { date: "Jul", revenue: 40000, fees: 4000 },
//   ],
//   yearly: [
//     { date: "2019", revenue: 450000, fees: 45000 },
//     { date: "2020", revenue: 520000, fees: 52000 },
//     { date: "2021", revenue: 680000, fees: 68000 },
//     { date: "2022", revenue: 790000, fees: 79000 },
//     { date: "2023", revenue: 850000, fees: 85000 },
//   ],
// }

// const topSellers = [
//   { id: 1, name: "VintageVault", totalSales: 45, revenue: 12500, fees: 1250, rating: 4.8 },
//   { id: 2, name: "RetroRealm", totalSales: 38, revenue: 9800, fees: 980, rating: 4.6 },
//   { id: 3, name: "AntiqueTreasures", totalSales: 52, revenue: 15600, fees: 1560, rating: 4.9 },
//   { id: 4, name: "NostalgicFinds", totalSales: 30, revenue: 7500, fees: 750, rating: 4.5 },
// ]

// const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042']

// export default function AdminDashboard() {
//   const [revenueFilter, setRevenueFilter] = useState('monthly')
//   const [dateRange, setDateRange] = useState({ start: '', end: '' })

//   const handleDownloadReport = () => {
//     // Implement report generation and download logic here
//     console.log("Downloading report for:", revenueFilter, dateRange)
//     alert("Report download started. Check your downloads folder.")
//   }

//   return (
//     <div className="min-h-screen bg-gray-100 p-4 sm:p-6 lg:p-8">
//       <h1 className="text-3xl sm:text-4xl font-bold mb-6 text-gray-800">Vintage Auction Admin Dashboard</h1>
      
//       <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
//         <div className="bg-white rounded-lg shadow-md p-4">
//           <div className="flex items-center justify-between mb-2">
//             <h2 className="text-xs sm:text-sm font-medium text-gray-500">Total Auctions</h2>
//             <Gavel className="h-5 w-5 text-blue-500" />
//           </div>
//           <p className="text-xl sm:text-2xl font-bold text-gray-700">{totalAuctions}</p>
//         </div>
//         <div className="bg-white rounded-lg shadow-md p-4">
//           <div className="flex items-center justify-between mb-2">
//             <h2 className="text-xs sm:text-sm font-medium text-gray-500">Live Auctions</h2>
//             <ShoppingBag className="h-5 w-5 text-green-500" />
//           </div>
//           <p className="text-xl sm:text-2xl font-bold text-gray-700">{liveAuctions}</p>
//         </div>
//         <div className="bg-white rounded-lg shadow-md p-4">
//           <div className="flex items-center justify-between mb-2">
//             <h2 className="text-xs sm:text-sm font-medium text-gray-500">Total Sellers</h2>
//             <Users className="h-5 w-5 text-purple-500" />
//           </div>
//           <p className="text-xl sm:text-2xl font-bold text-gray-700">{totalSellers}</p>
//         </div>
//         <div className="bg-white rounded-lg shadow-md p-4">
//           <div className="flex items-center justify-between mb-2">
//             <h2 className="text-xs sm:text-sm font-medium text-gray-500">Total Revenue</h2>
//             <DollarSign className="h-5 w-5 text-yellow-500" />
//           </div>
//           <p className="text-xl sm:text-2xl font-bold text-gray-700">${totalRevenue.toLocaleString()}</p>
//         </div>
//       </div>

//       <div className="bg-white rounded-lg shadow-md p-4 mb-6">
//         <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4">
//           <h2 className="text-lg font-semibold text-gray-700 mb-2 sm:mb-0">Revenue Management</h2>
//           <div className="flex flex-wrap gap-2">
//             {['daily', 'weekly', 'monthly', 'yearly'].map((filter) => (
//               <button
//                 key={filter}
//                 onClick={() => setRevenueFilter(filter)}
//                 className={`px-3 py-1 text-xs font-medium rounded-full ${
//                   revenueFilter === filter
//                     ? 'bg-blue-500 text-white'
//                     : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
//                 }`}
//               >
//                 {filter.charAt(0).toUpperCase() + filter.slice(1)}
//               </button>
//             ))}
//           </div>
//         </div>
//         <div className="flex flex-col sm:flex-row gap-4 mb-4">
//           <div className="flex-1">
//             <label htmlFor="start-date" className="block text-sm font-medium text-gray-700 mb-1">Start Date</label>
//             <input
//               type="date"
//               id="start-date"
//               className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
//               value={dateRange.start}
//               onChange={(e) => setDateRange({ ...dateRange, start: e.target.value })}
//             />
//           </div>
//           <div className="flex-1">
//             <label htmlFor="end-date" className="block text-sm font-medium text-gray-700 mb-1">End Date</label>
//             <input
//               type="date"
//               id="end-date"
//               className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
//               value={dateRange.end}
//               onChange={(e) => setDateRange({ ...dateRange, end: e.target.value })}
//             />
//           </div>
//           <div className="flex-1 flex items-end">
//             <button
//               onClick={handleDownloadReport}
//               className="w-full px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 flex items-center justify-center"
//             >
//               <Download className="h-5 w-5 mr-2" />
//               Download Report
//             </button>
//           </div>
//         </div>
//         <ResponsiveContainer width="100%" height={300}>
//           <BarChart data={revenueData[revenueFilter]}>
//             <XAxis dataKey="date" />
//             <YAxis />
//             <Tooltip />
//             <Legend />
//             <Bar dataKey="revenue" fill="#8884d8" name="Revenue" />
//             <Bar dataKey="fees" fill="#82ca9d" name="Platform Fees" />
//           </BarChart>
//         </ResponsiveContainer>
//       </div>

//       <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
//         <div className="bg-white rounded-lg shadow-md p-4">
//           <h2 className="text-lg font-semibold mb-4 text-gray-700">Category Sales</h2>
//           <ResponsiveContainer width="100%" height={300}>
//             <PieChart>
//               <Pie
//                 data={categorySales}
//                 cx="50%"
//                 cy="50%"
//                 labelLine={false}
//                 label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
//                 outerRadius={80}
//                 fill="#8884d8"
//                 dataKey="value"
//               >
//                 {categorySales.map((entry, index) => (
//                   <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
//                 ))}
//               </Pie>
//               <Tooltip />
//               <Legend />
//             </PieChart>
//           </ResponsiveContainer>
//         </div>

//         <div className="bg-white rounded-lg shadow-md p-4">
//           <h2 className="text-lg font-semibold mb-4 text-gray-700">Top Sellers</h2>
//           <div className="overflow-x-auto">
//             <table className="min-w-full divide-y divide-gray-200">
//               <thead className="bg-gray-50">
//                 <tr>
//                   <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Seller Name</th>
//                   <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Total Sales</th>
//                   <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Revenue</th>
//                   <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Fees</th>
//                   <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Rating</th>
//                 </tr>
//               </thead>
//               <tbody className="bg-white divide-y divide-gray-200">
//                 {topSellers.map((seller) => (
//                   <tr key={seller.id}>
//                     <td className="px-4 py-3 whitespace-nowrap text-sm font-medium text-gray-900">{seller.name}</td>
//                     <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">{seller.totalSales}</td>
//                     <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">${seller.revenue.toLocaleString()}</td>
//                     <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">${seller.fees.toLocaleString()}</td>
//                     <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">{seller.rating.toFixed(1)}</td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           </div>
//         </div>
//       </div>
//     </div>
//   )
// }


