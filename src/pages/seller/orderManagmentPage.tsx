import React, { useEffect, useState } from 'react';
import { useFetchOrdersQuery, useUpdateOrderStatusMutation } from '../../services/apis/sellerApi';
import { RootState } from '../../store/Store';
import { useSelector } from 'react-redux';
import { CheckCircle, XCircle, Truck } from 'lucide-react';

interface ShippingAddress {
  fullName?: string;
  phoneNumber?: string;
  streetAddress?: string;
  city?: string;
  state?: string;
  postalCode?: string;
  country?: string;
}

interface Order {
  id: string;
  buyerId: string;
  productId: string;
  productName?: string;
  productImage?: string;
  sellerId: string;
  orderDate: string;
  orderStatus: 'pending' | 'completed' | 'canceled';
  paymentStatus: 'pending' | 'completed' | 'failed';
  shippingAddress?: ShippingAddress;
  bidAmount: number;
}



export default function OrderManagementTable() {
  const userId = useSelector((state: RootState) => state.Seller.sellerId);
  const { data: responseData, isLoading, isError, error } = useFetchOrdersQuery(userId);
  console.log(responseData, 'haiii this is the response data ');
  const [orders, setOrders] = useState<Order[]>([]);
  const [updateOrderStatus] = useUpdateOrderStatusMutation();
  useEffect(() => {
    if (responseData && responseData.status === 200 && Array.isArray(responseData.orders)) {
      const formattedOrders = responseData.orders.map((order: any) => ({
        id: order._id,
        buyerId: order.buyerId ? order.buyerId.name : 'N/A', 
        productId: order.productId ? order.productId.itemTitle : 'N/A', 
        productName: order.productId ? order.productId.itemTitle : 'N/A',
        productImage: order.productId && order.productId.images ? order.productId.images[0] : '', 
        sellerId: order.sellerId,
        orderDate: new Date(order.orderDate).toLocaleDateString(),
        orderStatus: order.orderStatus,
        paymentStatus: order.paymentStatus,
        bidAmount: order.bidAmount,
        shippingAddress: order.shippingAddress 
      }));
      setOrders(formattedOrders);
    } else {
      console.error('Unexpected response format:', responseData);
    }
  }, [responseData]);
  

  const [currentPage, setCurrentPage] = useState(1);
  const ordersPerPage = 3;

  const indexOfLastOrder = currentPage * ordersPerPage;
  const indexOfFirstOrder = indexOfLastOrder - ordersPerPage;
  const currentOrders = orders.slice(indexOfFirstOrder, indexOfLastOrder);

  if (isLoading) return <div>Loading...</div>;

  if (isError) {
    console.error('Error fetching orders:', error);
    return <div>Error loading orders.</div>;
  }

  async function handleStatusChange(
    id: string,
    newStatus: 'pending' | 'completed' | 'canceled',
  ): Promise<void> {
    setOrders(
      orders.map((order) => (order.id === id ? { ...order, orderStatus: newStatus } : order)),
    );

    try {
      await updateOrderStatus({ orderId: id, status: newStatus });
    } catch (err) {
      console.error('Error updating order status:', err);
    }
  }



  return (
    <div className="container mx-auto p-6 bg-amber-50">
      <h1 className="text-3xl font-serif text-amber-900 mb-6 text-center">Order Management</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3 gap-4"> 
        {orders.length === 0 ? (
          <div className=" items-center text-center text-xl text-gray-700 col-span-2">
            You don't have any orders.
          </div>
        ) : (
          currentOrders.map((order) => (
            <div key={order.id} className={`bg-white shadow-md rounded-lg p-3 transition-transform transform hover:scale-105 ${order.id ? 'border-2 border-amber-500' : ''}`}>
              <h2 className="text-lg font-bold text-amber-900">{order.productName}</h2>
              <img src={order.productImage} alt={order.productName} className="w-full h-24 object-cover rounded-md mb-2" /> {/* Reduced height */}
              <p><strong>Order ID:</strong> #{order.id.slice(0, 4)}****{order.id.slice(-4)}</p>
              <p><strong>Buyer:</strong> {order.buyerId}</p>
              <p><strong>Bid Amount:</strong> ${order.bidAmount}</p>
              <p><strong>Order Date:</strong> {order.orderDate}</p>
              <p>
                <strong>Status:</strong>
                <span className={`ml-2 px-2 py-1 rounded ${order.orderStatus === 'pending' ? 'bg-red-200 text-red-800' : order.orderStatus === 'completed' ? 'bg-green-200 text-green-800' : 'bg-yellow-200 text-yellow-800'}`}>
                  {order.orderStatus}
                </span>
              </p>
              <div className="flex justify-between mt-2">
                <select
                  value={order.orderStatus}
                  onChange={(e) =>
                    handleStatusChange(
                      order.id,
                      e.target.value as 'pending' | 'completed' | 'canceled',
                    )
                  }
                  className="bg-amber-50 border border-amber-200 rounded px-2 py-1 text-amber-900"
                >
                  <option value="pending">Pending</option>
                  <option value="shipped">Shipped</option>
                  <option value="delivered">Delivered</option>
                </select>
                <div className="flex space-x-2">
                  <button className="text-green-500 hover:text-green-700" title="Complete Order">
                    <CheckCircle size={20} />
                  </button>
                  <button className="text-red-500 hover:text-red-700" title="Cancel Order">
                    <XCircle size={20} /> 
                  </button>
                  <button className="text-blue-500 hover:text-blue-700" title="Ship Order">
                    <Truck size={20} /> 
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
      <div className="flex justify-center mt-4">
        <nav className="inline-flex rounded-md shadow">
          {Array.from({ length: Math.ceil(orders.length / ordersPerPage) }, (_, i) => (
            <button
              key={i}
              onClick={() => setCurrentPage(i + 1)}
              className={`px-4 py-2 text-sm font-medium ${
                currentPage === i + 1
                  ? 'bg-amber-500 text-white'
                  : 'bg-amber-100 text-amber-700 hover:bg-amber-200'
              } ${i === 0 ? 'rounded-l-md' : ''} ${
                i === Math.ceil(orders.length / ordersPerPage) - 1 ? 'rounded-r-md' : ''
              } focus:outline-none focus:ring-2 focus:ring-amber-500 focus:ring-opacity-50`}
            >
              {i + 1}
            </button>
          ))}
        </nav>
      </div>
    </div>
  );
}

