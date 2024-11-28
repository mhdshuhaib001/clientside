import React, { useState, useEffect } from 'react';
import {
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
} from 'recharts';
import { Gavel, Users, ShoppingBag, DollarSign } from 'lucide-react';
import { useGetDashboardDataQuery } from '../../services/apis/adminApi';

const totalAuctions = 20;
const liveAuctions = 4;
const totalSellers = 2;
const totalRevenue = 5678;

const categorySales = [
  { name: 'Painting', value: 400 },
  { name: 'Jewelry', value: 300 },
  { name: 'Furniture', value: 200 },
  { name: 'Antiques', value: 100 },
];

const revenueData = {
  daily: [
    { date: 'Mon', revenue: 2500 },
    { date: 'Tue', revenue: 3200 },
    { date: 'Wed', revenue: 2800 },
    { date: 'Thu', revenue: 3500 },
    { date: 'Fri', revenue: 4000 },
    { date: 'Sat', revenue: 3800 },
    { date: 'Sun', revenue: 3000 },
  ],
  weekly: [
    { date: 'Week 1', revenue: 22000 },
    { date: 'Week 2', revenue: 25000 },
    { date: 'Week 3', revenue: 28000 },
    { date: 'Week 4', revenue: 30000 },
  ],
  monthly: [
    { date: 'Jan', revenue: 65000 },
    { date: 'Feb', revenue: 59000 },
    { date: 'Mar', revenue: 80000 },
    { date: 'Apr', revenue: 81000 },
    { date: 'May', revenue: 56000 },
    { date: 'Jun', revenue: 55000 },
    { date: 'Jul', revenue: 40000 },
  ],
  yearly: [
    { date: '2019', revenue: 450000 },
    { date: '2020', revenue: 520000 },
    { date: '2021', revenue: 680000 },
    { date: '2022', revenue: 790000 },
    { date: '2023', revenue: 850000 },
  ],
};

const sellerReports = [
  { id: 1, name: 'Loom-Fashion', totalSales: 4, revenue: 12500, rating: 4.8 },
  { id: 2, name: 'Antigo', totalSales: 3, revenue: 9800, rating: 4.6 },
];

const recentEscrows = [
  {
    id: 'ESC001',
    orderId: 'ORD123',
    buyerId: 'BUY456',
    sellerId: 'SEL789',
    sellerName: 'Loom-Fashion',
    totalAmount: 1500,
    status: 'held',
  },
  {
    id: 'ESC002',
    orderId: 'ORD124',
    buyerId: 'BUY457',
    sellerId: 'SEL790',
    sellerName: 'Antigo',
    totalAmount: 2000,
    status: 'released',
  },
  {
    id: 'ESC003',
    orderId: 'ORD125',
    buyerId: 'BUY458',
    sellerId: 'SEL791',
    sellerName: 'Loom-Fashion',
    totalAmount: 1800,
    status: 'disputed',
  },
];

const COLORS = ['#FF6B6B', '#4ECDC4', '#45B7D1', '#FFA07A'];

export default function AnimatedAdminDashboard() {
  const [revenueFilter, setRevenueFilter] = useState('weekly');
  const { data: dashboardData, error } = useGetDashboardDataQuery(revenueFilter);
  const [animatedStats, setAnimatedStats] = useState({
    totalAuctions: 0,
    liveAuctions: 0,
    totalSellers: 0,
    totalRevenue: 0,
  });

  const categorySales = dashboardData?.categorySales.map((category: { name: any; value: any; }) => ({
    name: category.name,
    value: category.value,
  })) || [];

  // const revenueData = {
  //   daily: dashboardData.revenueData.filter((data: { date: string }) => data.date === 'daily'),
  //   weekly: dashboardData.revenueData.filter((data: { date: string }) => data.date === 'weekly'),
  //   monthly: dashboardData.revenueData.filter((data: { date: string }) => data.date === 'monthly'),
  //   yearly: dashboardData.revenueData.filter((data: { date: string }) => data.date === 'yearly'),
  // };

  useEffect(() => {
    if (dashboardData) {
      setAnimatedStats({
        totalAuctions: dashboardData.stats.totalAuctions,
        liveAuctions: dashboardData.stats.liveAuctions,
        totalSellers: dashboardData.stats.totalSellers,
        totalRevenue: dashboardData.stats.totalRevenue,
      });
    }
  }, [dashboardData]);

  if (error) {
    return <div>Error loading data</div>;
  }

  if (!dashboardData) {
    return <div>Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 to-gray-200 p-4 sm:p-6 lg:p-8">
      <h1 className="text-3xl sm:text-4xl font-bold mb-6 text-gray-600 animate-fade-in">
        Auction-Gems Admin Dashboard
      </h1>

      <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <div className="bg-white rounded-lg shadow-md p-4 transform hover:scale-105 transition-transform duration-300">
          <div className="flex items-center justify-between mb-2">
            <h2 className="text-xs sm:text-sm font-medium text-gray-500">Total Auctions</h2>
            <Gavel className="h-5 w-5 text-blue-500" />
          </div>
          <p className="text-xl sm:text-2xl font-bold text-gray-700">
            {animatedStats.totalAuctions}
          </p>
        </div>
        <div className="bg-white rounded-lg shadow-md p-4 transform hover:scale-105 transition-transform duration-300">
          <div className="flex items-center justify-between mb-2">
            <h2 className="text-xs sm:text-sm font-medium text-gray-500">Live Auctions</h2>
            <ShoppingBag className="h-5 w-5 text-green-500" />
          </div>
          <p className="text-xl sm:text-2xl font-bold text-gray-700">
            {animatedStats.liveAuctions}
          </p>
        </div>
        <div className="bg-white rounded-lg shadow-md p-4 transform hover:scale-105 transition-transform duration-300">
          <div className="flex items-center justify-between mb-2">
            <h2 className="text-xs sm:text-sm font-medium text-gray-500">Total Sellers</h2>
            <Users className="h-5 w-5 text-purple-500" />
          </div>
          <p className="text-xl sm:text-2xl font-bold text-gray-700">
            {animatedStats.totalSellers}
          </p>
        </div>
        <div className="bg-white rounded-lg shadow-md p-4 transform hover:scale-105 transition-transform duration-300">
          <div className="flex items-center justify-between mb-2">
            <h2 className="text-xs sm:text-sm font-medium text-gray-500">Total Revenue</h2>
            <DollarSign className="h-5 w-5 text-yellow-500" />
          </div>
          <p className="text-xl sm:text-2xl font-bold text-gray-700">
            ${animatedStats.totalRevenue.toLocaleString()}
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        <div className="bg-white rounded-lg shadow-md p-4 animate-slide-in-left">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4">
            <h2 className="text-lg font-semibold text-gray-700 mb-2 sm:mb-0">Revenue</h2>
            <div className="flex flex-wrap gap-2">
              {['daily', 'weekly', 'monthly', 'yearly'].map((filter) => (
                <button
                  key={filter}
                  onClick={() => setRevenueFilter(filter)}
                  className={`px-3 py-1 text-xs font-medium rounded-full transition-colors duration-300 ${
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
              <Bar dataKey="revenue" fill="#8884d8" animationDuration={1000} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-white rounded-lg shadow-md p-4 animate-slide-in-right">
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
                animationDuration={1000}
              >
                {categorySales.map((_entry: any, index: number) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-md p-4 mb-6 animate-fade-in">
        <h2 className="text-lg font-semibold mb-4 text-gray-700">Top Seller Reports</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Seller Name
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Total Sales
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Revenue
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Rating
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {dashboardData.sellerReports.map(
                (
                  seller: {
                    id: React.Key | null | undefined;
                    name:
                      | string
                      | number
                      | boolean
                      | React.ReactElement<any, string | React.JSXElementConstructor<any>>
                      | Iterable<React.ReactNode>
                      | React.ReactPortal
                      | null
                      | undefined;
                    totalSales:
                      | string
                      | number
                      | boolean
                      | React.ReactElement<any, string | React.JSXElementConstructor<any>>
                      | Iterable<React.ReactNode>
                      | React.ReactPortal
                      | null
                      | undefined;
                    revenue: {
                      toLocaleString: () =>
                        | string
                        | number
                        | boolean
                        | React.ReactElement<any, string | React.JSXElementConstructor<any>>
                        | Iterable<React.ReactNode>
                        | React.ReactPortal
                        | null
                        | undefined;
                    };
                    rating: number;
                  },
                  index: number,
                ) => (
                  <tr
                    key={seller.id}
                    className="animate-fade-in"
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    <td className="px-4 py-3 whitespace-nowrap text-sm font-medium text-gray-900">
                      {seller.name}
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">
                      {seller.totalSales}
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">
                      ${seller.revenue.toLocaleString()}
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">
                      {seller.rating.toFixed(1)}
                    </td>
                  </tr>
                ),
              )}
            </tbody>
          </table>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-md p-4 mb-6 animate-fade-in">
        <h2 className="text-lg font-semibold mb-4 text-gray-700">Recent Escrows</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Seller Name
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Order ID
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Amount
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {dashboardData?.recentEscrows.map(
                (
                  escrow: {
                    id: React.Key | null | undefined;
                    sellerName:
                      | string
                      | number
                      | boolean
                      | React.ReactElement<any, string | React.JSXElementConstructor<any>>
                      | Iterable<React.ReactNode>
                      | React.ReactPortal
                      | null
                      | undefined;
                    orderId:
                      | string
                      | number
                      | boolean
                      | React.ReactElement<any, string | React.JSXElementConstructor<any>>
                      | Iterable<React.ReactNode>
                      | React.ReactPortal
                      | null
                      | undefined;
                    totalAmount: {
                      toLocaleString: () =>
                        | string
                        | number
                        | boolean
                        | React.ReactElement<any, string | React.JSXElementConstructor<any>>
                        | Iterable<React.ReactNode>
                        | React.ReactPortal
                        | null
                        | undefined;
                    };
                    status:
                      | string
                      | number
                      | boolean
                      | React.ReactElement<any, string | React.JSXElementConstructor<any>>
                      | Iterable<React.ReactNode>
                      | null
                      | undefined;
                  },
                  index: number,
                ) => (
                  <tr
                    key={escrow.id}
                    className="animate-fade-in"
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    <td className="px-4 py-3 whitespace-nowrap text-sm font-medium text-gray-900">
                      {escrow.sellerName}
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">
                      {escrow.orderId}
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">
                      ${escrow.totalAmount.toLocaleString()}
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">
                      <span
                        className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                          escrow.status === 'held'
                            ? 'bg-yellow-100 text-yellow-800'
                            : escrow.status === 'released'
                              ? 'bg-green-100 text-green-800'
                              : 'bg-red-100 text-red-800'
                        }`}
                      >
                        {escrow.status}
                      </span>
                    </td>
                  </tr>
                ),
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
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
