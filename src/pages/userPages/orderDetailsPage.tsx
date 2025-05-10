import React, { useState } from 'react';

import { useParams } from 'react-router-dom';
import { useFetchOrderByIdQuery } from '../../services/apis/orderApi';
import SellerProfileCard from '../../components/Seller/SellerProfileCard';
// interface OrderItem {
//   id: string;
//   productName: string;
//   description: string;
//   imageUrl: string;
//   bidAmount: number;
//   orderDate: string;
//   status: 'Pending' | 'Shipped' | 'Delivered';
//   seller: {
//     name: string;
//     rating: number;
//     avatar: string;
//   };
//   shippingAddress: {
//     street: string;
//     city: string;
//     state: string;
//     zipCode: string;
//     country: string;
//   };
//   estimatedDelivery: string;
//   trackingNumber: string;
// }

const EnhancedOrderItemDetails: React.FC = () => {
  const [isImageEnlarged, setIsImageEnlarged] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const { id } = useParams();
  console.log(id);
  const { data: orderData } = useFetchOrderByIdQuery(id ?? '');
  console.log(orderData, 'this is the order Dataaaaa......');
  const orderItem = orderData
    ? {
        id: orderData.orderId,
        productName: orderData.productName,
        description: orderData.description,
        productImage: orderData.productImage,
        bidAmount: orderData.bidAmount,
        orderDate: new Date(orderData.orderDate).toLocaleDateString(),
        status: orderData.orderStatus,
        paymentStatus: orderData.paymentStatus ?? 'Pending',
        seller: {
          id: orderData.sellerId,
          name: orderData.companyName || 'Unknown Seller',
          avatar: orderData.profileName,
        },
        shippingAddress: {
          fullName: orderData.shippingAddress.fullName,
          phoneNumber: orderData.shippingAddress.phoneNumber,
          streetAddress: orderData.shippingAddress.streetAddress,
          city: orderData.shippingAddress.city,
          state: orderData.shippingAddress.state,
          postalCode: orderData.shippingAddress.postalCode,
          country: orderData.shippingAddress.country,
        },
        estimatedDelivery: '2024-10-15',
        trackingNumber: '1Z999AA1234567890',
      }
    : {
        // Default values or loading state
        id: 'Loading...',
        productName: 'Loading...',
        description: 'Loading...',
        productImage: [],
        bidAmount: 0,
        orderDate: 'Loading...',
        status: 'Pending',
        paymentStatus: 'Pending',
        seller: {
          name: 'Loading...',
          rating: 0,
          avatar: '/placeholder.svg?height=50&width=50',
        },
        shippingAddress: {
          fullName: 'Loading...',
          phoneNumber: 'Loading...',
          streetAddress: 'Loading...',
          city: 'Loading...',
          state: 'Loading...',
          postalCode: 'Loading...',
          country: 'Loading...',
        },
      };

  // const renderStarRating = (rating: number) => {
  //   const fullStars = Math.floor(rating);
  //   const hasHalfStar = rating % 1 !== 0;
  //   const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);

  //   return (
  //     <div className="flex">
  //       {[...Array(fullStars)].map((_, i) => (
  //         <svg
  //           key={`full-${i}`}
  //           className="w-5 h-5 text-yellow-500"
  //           fill="currentColor"
  //           viewBox="0 0 20 20"
  //         >
  //           <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
  //         </svg>
  //       ))}
  //       {hasHalfStar && (
  //         <svg className="w-5 h-5 text-yellow-500" fill="currentColor" viewBox="0 0 20 20">
  //           <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
  //         </svg>
  //       )}
  //       {[...Array(emptyStars)].map((_, i) => (
  //         <svg
  //           key={`empty-${i}`}
  //           className="w-5 h-5 text-gray-300"
  //           fill="currentColor"
  //           viewBox="0 0 20 20"
  //         >
  //           <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
  //         </svg>
  //       ))}
  //     </div>
  //   );
  // };
  const handleDownloadInvoice = () => {
    const invoiceUrl = `/invoices/${orderItem.id}.pdf`;
    window.open(invoiceUrl, '_blank');
  };
  console.log('Order Status:', orderItem.status);
  return (
    <div>
      <div className="min-h-screen bg-gradient-to-b from-amber-50 to-amber-100 py-12 px-4 sm:px-6 lg:px-8">
        <div className=" bg-white shadow-2xl rounded-lg overflow-hidden">
          <div className="px-4 py-5 gap-2 sm:px-6 flex justify-center items-center  bg-amber-200 border-b border-amber-300">
            <h1 className="text-3xl font-bold text-amber-900">Order Details</h1>
            <p className="mt-2 max-w-2xl text-sm text-amber-700">
              Order ID: {orderItem.id.toString().slice(-5)}
            </p>
          </div>
          <div className="md:flex">
            <div className="md:w-1/2 p-7 ">
              <img
                src={orderItem.productImage[0]}
                alt={orderItem.productName}
                className="w-1/3 rounded-lg shadow-md cursor-pointer transition-transform duration-300 ease-in-out transform hover:scale-105"
                onClick={() => setIsImageEnlarged(true)}
              />
            </div>

            <div className="md:w-1/2 p-6">
              <h2 className="text-2xl font-semibold text-amber-900 mb-4">
                {orderItem.productName}
              </h2>
              <p className="text-gray-700">
                {isExpanded
                  ? orderItem.description
                  : `${orderItem.description.substring(0, 100)}...`}
                <button
                  onClick={() => setIsExpanded(!isExpanded)}
                  className="text-amber-700 hover:underline ml-2"
                >
                  {isExpanded ? 'Show Less' : 'Load More'}
                </button>
              </p>{' '}
              <div className="flex items-center justify-between mb-4">
                <span className="text-lg font-bold text-amber-900">Bid Amount:</span>
                <span className="text-2xl font-bold text-green-600">
                  ${orderItem.bidAmount.toFixed(2)}
                </span>
              </div>
              <div className="flex items-center justify-between mb-4">
                <span className="text-lg font-bold text-amber-900">Order Date:</span>
                <span className="text-amber-800">{orderItem.orderDate}</span>
              </div>
              <div className="flex items-center justify-between mb-4">
                <span className="text-lg font-bold text-amber-900">Status:</span>
                <span
                  className={`px-3 py-1 rounded-full text-sm font-medium ${
                    orderItem.status === 'Delivered'
                      ? 'bg-green-200 text-green-800'
                      : orderItem.status === 'Shipped'
                        ? 'bg-blue-200 text-blue-800'
                        : orderItem.status === 'Canceled'
                          ? 'bg-red-200 text-red-800'
                          : 'bg-yellow-200 text-yellow-800'
                  }`}
                >
                  {orderItem.status === 'Delivered'
                    ? 'Delivered'
                    : orderItem.status === 'Shipped'
                      ? 'Shipped'
                      : orderItem.status === 'Canceled'
                        ? 'Canceled'
                        : 'Pending'}
                </span>
              </div>
              <div className="flex items-center justify-between mb-4">
                <span className="text-lg font-bold text-amber-900">Payment Status:</span>
                <span
                  className={`px-3 py-1 rounded-full text-sm font-medium ${
                    orderItem.paymentStatus === 'Paid'
                      ? 'bg-green-200 text-green-800'
                      : orderItem.paymentStatus === 'Failed'
                        ? 'bg-red-200 text-red-800'
                        : 'bg-yellow-200 text-yellow-800'
                  }`}
                >
                  {orderItem.paymentStatus}
                </span>
              </div>
              {orderItem.status === 'Delivered' && (
                <button
                  onClick={handleDownloadInvoice}
                  className="mt-4 px-4 py-2 bg-amber-800 text-white rounded-full hover:bg-amber-900 focus:outline-none focus:ring-2 focus:ring-amber-500"
                >
                  Download Invoice
                </button>
              )}
            </div>
          </div>
          <div className="border-t border-amber-200 px-6 py-4">
            <h3 className="text-xl font-semibold text-amber-900 mb-3">Seller Information</h3>
            <div className="flex items-center">
              <div className="w-full">
                <SellerProfileCard
                  id={orderItem.seller.id}
                  sellerName={orderItem.seller.name}
                  profileImage={orderItem.seller.avatar}
                />
              </div>
            </div>
          </div>
          <div className="border-t border-amber-200 px-6 py-4">
            <h3 className="text-xl font-semibold text-amber-900 mb-3">Shipping Details</h3>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="font-medium text-amber-900">Recipient:</p>
                <p className="text-amber-800">{orderItem.shippingAddress.fullName}</p>
                <p className="font-medium text-amber-900 mt-2">Phone Number:</p>
                <p className="text-amber-800">{orderItem.shippingAddress.phoneNumber}</p>
                <p className="font-medium text-amber-900 mt-2">Address:</p>
                <p className="text-amber-800">{orderItem.shippingAddress.streetAddress}</p>
                <p className="text-amber-800">
                  {orderItem.shippingAddress.city}, {orderItem.shippingAddress.state}{' '}
                  {orderItem.shippingAddress.postalCode}
                </p>
                <p className="text-amber-800">{orderItem.shippingAddress.country}</p>
              </div>
            </div>
          </div>
        </div>
        {isImageEnlarged && (
          <div
            className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50"
            onClick={() => setIsImageEnlarged(false)}
          >
            <div className="max-w-4xl max-h-full p-4">
              <img
                src={orderItem.productImage[0]}
                alt={orderItem.productName}
                className="max-w-full max-h-full object-contain"
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default EnhancedOrderItemDetails;
