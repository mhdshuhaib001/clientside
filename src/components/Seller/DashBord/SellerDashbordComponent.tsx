
import React, { useState } from 'react'
import { BarChart, Bar, LineChart, Line, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts'
import { DollarSign, Package, ShoppingCart, LightbulbIcon } from 'lucide-react'
import { RootState } from '../../../store/Store';
import { useSelector } from 'react-redux';
import { useGetSellerDashboardQuery } from '../../../services/apis/sellerApi';

interface DashboardData {
  metrics: {
    totalEarnings: number;
    monthlySpend: number;
    totalSales: number;
    salesGrowth: number;
  };
  salesData: {
    daily: Array<{label: string, sales: number}>;
    weekly: Array<{label: string, sales: number}>;
    monthly: Array<{label: string, sales: number}>;
    yearly: Array<{label: string, sales: number}>;
  };
  categoryDistribution: Array<{name: string, value: number}>;
}

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8']

const MetricCard = ({ icon: Icon, title, value, subvalue }: { icon: React.ComponentType<any>, title: string, value: string, subvalue?: string }) => (
  <div className="bg-white rounded-lg shadow-md p-6 flex items-center">
    <div className="mr-4">
      <Icon className="w-10 h-10 text-blue-500" />
    </div>
    <div>
      <h3 className="text-lg font-semibold text-gray-700">{title}</h3>
      <p className="text-2xl font-bold text-gray-900">{value}</p>
      {subvalue && <p className="text-sm text-green-500 mt-1">{subvalue}</p>}
    </div>
  </div>
)

export default function SellerDashboardComponent() {
  const [salesFilter, setSalesFilter] = useState('sales')
  const [timeFrame, setTimeFrame] = useState('daily')
  const sellerId = useSelector((state: RootState) => state.Seller.sellerId);
  
  const { data: dashboardData, isLoading, error } = useGetSellerDashboardQuery({
    sellerId,
    timeframe: timeFrame,
  });
  console.log(dashboardData,'this si the seller')

  const data: DashboardData = dashboardData || {
    metrics: {
      totalEarnings: 2230.02,
      monthlySpend: 68.98,
      totalSales: 2230.02,
      salesGrowth: 100
    },
    salesData: {
      daily: [
        { label: "Sun", sales: 0 },
        { label: "Mon", sales: 0 },
        { label: "Tue", sales: 195.02 },
        { label: "Wed", sales: 2035 },
        { label: "Thu", sales: 0 },
        { label: "Fri", sales: 0 },
        { label: "Sat", sales: 0 }
      ],
      weekly: [],
      monthly: [],
      yearly: []
    },
    categoryDistribution: [
      { name: "Camera", value: 1 },
      { name: "Furniture", value: 1 }
    ]
  };

  const revenueData = data.salesData.daily.map(item => ({
    month: item.label,
    revenue: item.sales
  }));

  const getSalesData = () => {
    switch (timeFrame) {
      case 'daily':
        return data.salesData.daily
      case 'weekly':
        return data.salesData.weekly || data.salesData.daily
      case 'monthly':
        return data.salesData.monthly || data.salesData.daily
      case 'yearly':
        return data.salesData.yearly || data.salesData.daily
      default:
        return data.salesData.daily
    }
  }

  // Loading and error handling
  if (isLoading) return <div>Loading...</div>
  if (error) return <div>Error loading dashboard data</div>

  return (
    <div className="p-8 min-h-screen">
      <h1 className="text-3xl font-bold text-gray-800 mb-8">Seller Dashboard</h1>
      
      <div className="grid gap-6 mb-8 md:grid-cols-3">
        <MetricCard
          icon={DollarSign}
          title="Total Revenue"
          value={`$${data.metrics.totalEarnings.toFixed(2)}`}
          subvalue={`+${data.metrics.salesGrowth.toFixed(1)}% from last month`}
        />
        <MetricCard
          icon={Package}
          title="Monthly Spend"
          value={`$${data.metrics.monthlySpend.toFixed(2)}`}
          subvalue={`Total Sales: $${data.metrics.totalSales.toFixed(2)}`}
        />
        <MetricCard
          icon={ShoppingCart}
          title="Sales"
          value={data.metrics.totalSales.toFixed(0)}
          subvalue="+201 since last week"
        />
      </div>

      <div className="grid gap-6 mb-8 md:grid-cols-2">
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Revenue Overview</h2>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={revenueData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="revenue" stroke="#8884d8" activeDot={{ r: 8 }} />
            </LineChart>
          </ResponsiveContainer>
        </div>
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Sales by Category</h2>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={data.categoryDistribution}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
              >
                {data.categoryDistribution.map((_entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-md p-6 mb-8">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold text-gray-800">Recent Performance</h2>
          <div className="flex space-x-2">
            <select
              className="border rounded-md p-2"
              value={salesFilter}
              onChange={(e) => setSalesFilter(e.target.value)}
            >
              <option value="sales">Sales</option>
              <option value="orders">Orders</option>
            </select>
            <select
              className="border rounded-md p-2"
              value={timeFrame}
              onChange={(e) => setTimeFrame(e.target.value)}
            >
              <option value="daily">Daily</option>
              <option value="weekly">Weekly</option>
              <option value="monthly">Monthly</option>
              <option value="yearly">Yearly</option>
            </select>
          </div>
        </div>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={getSalesData()}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="label" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="sales" fill="#8884d8" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="flex items-center mb-4">
          <LightbulbIcon className="w-6 h-6 text-yellow-500 mr-2" />
          <h2 className="text-xl font-semibold text-gray-800">Seller Tip of the Day</h2>
        </div>
        <p className="text-gray-700 italic">
          "Engage with your customers through personalized follow-ups. A simple thank you message or a request for feedback can go a long way in building customer loyalty and encouraging repeat purchases."
        </p>
      </div>
    </div>
  )
}



// import React, { useState } from 'react';
// import { useGetSellerDashboardQuery } from '../../../services/apis/sellerApi';
// import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
// import { DollarSign, TrendingUp } from 'lucide-react';
// import { RootState } from '../../../store/Store';
// import { useSelector, UseSelector } from 'react-redux';
// const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8'];

// interface MetricCardProps {
//   icon: React.ComponentType<any>;
//   title: string;
//   value: string;
//   subvalue?: string;
// }

// const MetricCard: React.FC<MetricCardProps> = ({ icon: Icon, title, value, subvalue }) => (
//   <div className="bg-white rounded-lg shadow-md p-6 flex items-center">
//     <div className="p-2 rounded-full bg-blue-100">
//       <Icon className="w-6 h-6 text-blue-600" />
//     </div>
//     <div className="ml-4">
//       <p className="text-sm text-gray-500">{title}</p>
//       <p className="text-2xl font-bold">{value}</p>
//       {subvalue && <p className="text-sm text-green-500">{subvalue}</p>}
//     </div>
//   </div>
// );

// interface SellerDashboardProps {
//   sellerId: string;
// }

// export const SellerDashboard: React.FC<SellerDashboardProps> = () => {
//   const [timeFrame, setTimeFrame] = useState<string>('monthly');
//   const sellerId = useSelector((state: RootState) => state.Seller.sellerId);
  
//   const { data: dashboardData, isLoading, error } = useGetSellerDashboardQuery({
//     sellerId,
//     timeframe: timeFrame,
//   });
// console.log(dashboardData,'this is the dashbord datas')

//   if (isLoading) {
//     return <div className="p-6">Loading dashboard data...</div>;
//   }

//   if (error || !dashboardData) {
//     return <div className="p-6 text-red-500">Error: Failed to load dashboard</div>;
//   }

//   return (
//     <div className="p-6 space-y-6 bg-gray-100">
//       <div className="grid gap-6 md:grid-cols-3">
//         <MetricCard
//           icon={DollarSign}
//           title="Total Earnings"
//           value={`$${dashboardData.metrics.totalEarnings.toFixed(2)}`}
//         />
//         <MetricCard
//           icon={DollarSign}
//           title="Spend this month"
//           value={`$${dashboardData.metrics.monthlySpend.toFixed(2)}`}
//         />
//         <MetricCard
//           icon={TrendingUp}
//           title="Sales"
//           value={`$${dashboardData.metrics.totalSales.toFixed(2)}`}
//           subvalue={`${dashboardData.metrics.salesGrowth.toFixed(1)}% since last month`}
//         />
//       </div>
//       <div className="grid gap-6 md:grid-cols-2">
//         <div className="bg-white rounded-lg shadow-md p-6">
//           <div className="flex justify-between items-center mb-4">
//             <h2 className="text-lg font-semibold">Sales Overview</h2>
//             <select
//               className="border rounded-md p-2"
//               value={timeFrame}
//               onChange={(e) => setTimeFrame(e.target.value)}
//             >
//               <option value="daily">Daily</option>
//               <option value="weekly">Weekly</option>
//               <option value="monthly">Monthly</option>
//               <option value="yearly">Yearly</option>
//             </select>
//           </div>
//           <ResponsiveContainer width="100%" height={300}>
//             <BarChart data={dashboardData.salesData[timeFrame]}>
//               <CartesianGrid strokeDasharray="3 3" />
//               <XAxis dataKey="label" />
//               <YAxis />
//               <Tooltip />
//               <Legend />
//               <Bar dataKey="sales" fill="#4F46E5" />
//             </BarChart>
//           </ResponsiveContainer>
//         </div>

//         <div className="bg-white rounded-lg shadow-md p-6">
//           <h2 className="text-lg font-semibold mb-4">Category Distribution</h2>
//           <ResponsiveContainer width="100%" height={300}>
//             <PieChart>
//               <Pie
//                 data={dashboardData.categoryDistribution}
//                 dataKey="value"
//                 nameKey="name"
//                 cx="50%"
//                 cy="50%"
//                 outerRadius={100}
//                 fill="#8884d8"
//                 label
//               >
//                 {dashboardData.categoryDistribution.map((entry: any, index: number) => (
//                   <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
//                 ))}
//               </Pie>
//               <Tooltip />
//               <Legend />
//             </PieChart>
//           </ResponsiveContainer>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default SellerDashboard;