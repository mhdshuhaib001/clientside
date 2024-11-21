
import React, { useState } from 'react'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts'
import { DollarSign, TrendingUp } from 'lucide-react'

const salesData = {
  daily: [

    { day: 'Wed', sales: 1100 },
    { day: 'Thu', sales: 1500 },

  ],
  weekly: [
    { week: 'Week 1', sales: 7500 },
    { week: 'Week 2', sales: 8200 },
   
  ],
};


const pieData = [
  { name: 'Painting', value: 1600 }, 
  { name: 'Furniture ', value: 120 }, 
  { name: 'Camera', value: 200 },  
  { name: 'Jewellery', value: 100 }, 
];


const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8']

const MetricCard = ({ icon: Icon, title, value, subvalue }: { icon: React.ComponentType<any>, title: string, value: string, subvalue?: string }) => (
  <div className="bg-amber-50 rounded-lg shadow-md p-6 flex items-center">
    <div className="p-2 rounded-full bg-blue-100">
      <Icon className="w-6 h-6 text-blue-600" />
    </div>
    <div className="ml-4">
      <p className="text-sm text-gray-500">{title}</p>
      <p className="text-2xl font-bold">{value}</p>
      {subvalue && <p className="text-sm text-green-500">{subvalue}</p>}
    </div>
  </div>
)

export default function SellerDashboardComponent() {
  const [timeFrame, setTimeFrame] = useState('weekly')

  const handleTimeFrameChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setTimeFrame(e.target.value)
  }

  return (
    <div className="p-6 space-y-6 bg-amber-50">
      <div className="grid gap-6 md:grid-cols-3">
        <MetricCard
          icon={DollarSign}
          title="Earnings"
          value="$3500.4"
        />
        <MetricCard
          icon={DollarSign}
          title="LiveAuction"
          value="5"
        />
        <MetricCard
          icon={TrendingUp}
          title="Sales"
          value="$574.34"
          subvalue="+23% since last month"
        />
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold">Sales Overview</h2>
            <select
              className="border rounded-md p-2"
              value={timeFrame}
              onChange={handleTimeFrameChange}
            >
              <option value="daily">Daily</option>
              <option value="weekly">Weekly</option>
              <option value="monthly">Monthly</option>
              <option value="yearly">Yearly</option>
            </select>
          </div>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={salesData[timeFrame as keyof typeof salesData]}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey={timeFrame === 'daily' ? 'day' : timeFrame === 'weekly' ? 'week' : timeFrame === 'monthly' ? 'month' : 'year'} />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="sales" fill="#8884d8" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-lg font-semibold mb-4">Sales Distribution</h2>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={pieData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
              >
                {pieData.map((_entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
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