import React, { useState } from 'react';
import { useFetchOrderByUserQuery } from '../../services/apis/orderApi';
import { useSelector } from 'react-redux';
import { RootState } from '../../store/Store';
import { useNavigate } from 'react-router-dom';
interface OrderedProduct {
  id: string;
  paymentId: string;
  productId: string;
  productName: string;
  productImage: string[];
  bidAmount: number;
  orderDate: string;
  status: 'Pending' | 'Shipped' | 'Delivered';
  description: string;
  sellerName: string;
  paymentStatus: string;
}

interface IOrder {
  orderId: string;
  productId: string;
  productName: string;
  productImage: string[];
  bidAmount: number;
  orderDate: string;
  status: 'Pending' | 'Shipped' | 'Delivered';
  description: string;
  companyName: string;
  paymentStatus: string;
  paymentId: string;
}

const UserOrderedProducts: React.FC = () => {
  const navigate = useNavigate();
  const [selectedProduct, setSelectedProduct] = useState<OrderedProduct | null>(null);
  const userId = useSelector((state: RootState) => state.User._id);
  const { data: orders, isLoading } = useFetchOrderByUserQuery(userId);

  const handleViewDetails = (product: OrderedProduct) => {
    setSelectedProduct(product);
  };

  
  const handleCloseDetails = () => {
    setSelectedProduct(null);
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  // if (error) {
  //   return <div>Error loading orders.</div>;
  // }

  function isIOrder(data: any): data is IOrder {
    return data && typeof data.orderId === 'string';
  }
  console.log(orders);
  const orderedProducts: OrderedProduct[] = isIOrder(orders)
    ? [
        {
          id: orders.orderId,
          paymentId: orders.paymentId,
          productName: orders.productName,
          productImage: orders.productImage,
          bidAmount: orders.bidAmount || 0,
          orderDate: orders.orderDate,
          status: orders.status,
          description: orders.description,
          sellerName: orders.companyName,
          paymentStatus: orders.paymentStatus,
          productId: orders.productId,
        },
      ]
    : [];

  return (
    <div className="container mx-auto p-6 bg-amber-50">
      <h1 className="text-3xl font-serif text-amber-900 mb-6 text-center">Your Ordered Products</h1>
      <div className="overflow-x-auto">
        {orderedProducts.length === 0 ? (
          <div className="text-center text-xl text-gray-700">You don't have any orders.</div>
        ) : (
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-amber-200">
                <th className="p-3 text-left font-serif text-amber-900 border border-amber-200">
                  Product
                </th>
                <th className="p-3 text-left font-serif text-amber-900 border border-amber-200">
                  Image
                </th>
                <th className="p-3 text-left font-serif text-amber-900 border border-amber-200">
                  Bid Amount
                </th>
                <th className="p-3 text-left font-serif text-amber-900 border border-amber-200">
                  Order Date
                </th>
                <th className="p-3 text-left font-serif text-amber-900 border border-amber-200">
                  Status
                </th>
                <th className="p-3 text-left font-serif text-amber-900 border border-amber-200">
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {orderedProducts.map((order) => (
                <tr key={order.id} className="bg-amber-100 hover:bg-amber-200 transition-colors">
                  <td className="p-3 font-serif text-amber-900 border border-amber-200">
                    {order.productName}
                  </td>
                  <td className="p-3 font-serif text-amber-900 border border-amber-200">
                    <img
                      onClick={() => handleViewDetails(order)}
                      src={order.productImage[0]}
                      alt={order.productName}
                      className="w-20 h-20 object-cover"
                    />
                  </td>
                  <td className="p-3 font-serif text-amber-900 border border-amber-200">
                    ${order.bidAmount}
                  </td>
                  <td className="p-3 font-serif text-amber-900 border border-amber-200">
                    {new Date(order.orderDate).toLocaleDateString()}
                  </td>
                  <td className="p-3 font-serif text-amber-900 border border-amber-200">
                    <span
                      className={`px-2 py-1 rounded ${
                        order.status === 'Pending'
                          ? 'bg-amber-200 text-amber-800'
                          : order.status === 'Shipped'
                            ? 'bg-amber-300 text-amber-900'
                            : 'bg-amber-400 text-amber-900'
                      }`}
                    >
                      {order.paymentStatus}
                    </span>
                  </td>
                  <td className="p-3 font-serif text-amber-900 border border-amber-200">
                    <button
                      onClick={() => navigate(`/orders/${order.id}`)}
                      className="px-4 py-2 bg-amber-500 text-white rounded hover:bg-amber-600 transition-colors"
                    >
                      View Details
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {selectedProduct && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-amber-50 p-6 rounded-lg max-w-md w-full">
            <h2 className="text-2xl font-serif text-amber-900 mb-4">
              {selectedProduct.productName}
            </h2>
            <img
              src={selectedProduct.productImage[0]}
              alt={selectedProduct.productName}
              className="w-full h-48 object-cover mb-4 rounded"
            />
            <p className="text-amber-900 mb-2">
              <strong>Description:</strong> {selectedProduct.description}
            </p>
            <p className="text-amber-900 mb-2">
              <strong>Seller:</strong> {selectedProduct.sellerName}
            </p>
            <p className="text-amber-900 mb-2">
              <strong>Bid Amount:</strong> ${selectedProduct.bidAmount}
            </p>
            <p className="text-amber-900 mb-2">
              <strong>Order Date:</strong>{' '}
              {new Date(selectedProduct.orderDate).toLocaleDateString()}
            </p>
            <p className="text-amber-900 mb-2">
              <strong>Status:</strong> {selectedProduct.status}
            </p>
            <button
              onClick={handleCloseDetails}
              className="mt-4 px-4 py-2 bg-amber-500 text-white rounded hover:bg-amber-600 transition-colors"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserOrderedProducts;
