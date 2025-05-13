// import React, { useEffect, useState } from 'react';
// import { CreditCard, WalletMinimal, Truck } from 'lucide-react';
// import { useParams } from 'react-router-dom';
// import { useGetProductByIdQuery } from '../services/apis/productApi';
// import { useGetAddressQuery } from '../services/apis/userApi';
// import { useNavigate } from 'react-router-dom';
// import {
//   useCreateOrderMutation,
//   useCreateCheckoutSessionMutation,
// } from '../services/apis/orderApi';
// import Header from '../components/User/Header';
// import Footer from '../components/User/Footer';
// import { useSelector } from 'react-redux';
// import { RootState } from '../store/Store';
// import { useStripe, useElements } from '@stripe/react-stripe-js';
// import toast from 'react-hot-toast';

// const CheckoutPage: React.FC = () => {
//   const navigate = useNavigate();
//   const stripe = useStripe();
//   const elements = useElements();
//   const { id } = useParams<{ id: string }>();
//   // console.log(id,'this is the ad of the things ')
//   const userId = useSelector((state: RootState) => state.User._id);
//   // const { id, token } = useParams<{ id: string; token: string }>();
//   const [createCheckoutSession] = useCreateCheckoutSessionMutation();

//   // let decodedUserId :string|undefined
//   // if(token){
//   //   try {
//   //     const decoded = jwtDecode<{ _id: string }>(token);

//   //   } catch (error) {

//   //   }
//   // }

//   const { data: address } = useGetAddressQuery(userId);
//   const { data: product } = useGetProductByIdQuery(id);
//   console.log(product, 'this is the arress');
//   const productData = product?.productData || {
//     _id: '',
//     images: [''],
//     itemTitle: 'Loading...',
//     reservePrice: 0,
//     shippingCost: 0,
//     description: 'Loading...',
//     sellerId: '',
//   };

//   const [selectedAddress, setSelectedAddress] = useState<string>('');
//   const [createOrder, { isLoading: loading }] = useCreateOrderMutation();

//   const [paymentMethod, setPaymentMethod] = useState('credit-card');

//   // const [errorMessage, setErrorMessage] = useState<string | null>(null);

//   // const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
//   //   const { name, value } = e.target;
//   //   setPaymentMethod(value);
//   //   setFormData((prevData) => ({
//   //     ...prevData,
//   //     [name]: value,
//   //   }));
//   // };

//   // const handleAddressChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
//   //   const selectedAddressId = e.target.value;

//   //   if (address && address.length > 0) {
//   //     const selected = address.find((addr: any) => addr._id === selectedAddressId);

//   //     if (selected) {
//   //       setFormData({
//   //         firstName: selected.fullName.split(' ')[0],
//   //         lastName: selected.fullName.split(' ')[1],
//   //         email: '',
//   //         address: selected.streetAddress,
//   //         city: selected.city,
//   //         zipCode: selected.postalCode,
//   //         country: selected.country,
//   //       });
//   //     }
//   //   }
//   // };
//   useEffect(() => {
//     const orderCompleted = localStorage.getItem('orderCompleted');
//     if (orderCompleted === 'true') {
//       navigate('/success');
//     }
//     return () => {
//       localStorage.removeItem('orderCompleted');
//     };
//   }, [navigate]);
//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();

//     if (!selectedAddress) {
//       toast.error('Please select a delivery address.');
//       return;
//     }

//     if (!paymentMethod) {
//       toast.error('Please select a payment method.');
//       return;
//     }

//     if (!stripe || !elements) return;

//     if (paymentMethod === 'stripe') {
//       const orderData = {
//         buyerId: userId,
//         sellerId: productData.sellerId,
//         addressId: selectedAddress,
//         productId: productData._id,
//       };

//       try {
//         const orderResponse = await createOrder(orderData);
//         const orderId = orderResponse.data;

//         let price =
//           productData.auctionStatus === 'sold' && productData.currentBid
//             ? productData.currentBid
//             : productData.reservePrice;

//         const totalPrice = price + productData.shippingCost;

//         const product = {
//           image: productData.images[0],
//           name: productData.itemTitle,
//           price: totalPrice,
//           orderId: orderId,
//         };

//         const sessionResponse = await createCheckoutSession(product);
//         const sessionId = sessionResponse.data?.id;

//         const result = await stripe.redirectToCheckout({ sessionId });

//         if (result.error) {
//           console.error(result.error.message);
//         } else {
//           navigate(`/order-confirmation/${orderId}`);
//         }
//       } catch (error) {
//         console.error('Error:', error);
//       }
//     } else {
//       console.log('Other payment method selected:', paymentMethod);
//     }
//   };

//   return (
//     <>
//       <Header />
//       <div className="min-h-screen bg-[#f1f1df] font-serif p-4 sm:p-6 lg:p-8">
//         <div>
//           <h1 className="text-4xl font-bold text-center mb-8 text-gray-800">
//             VintageGems Checkout
//           </h1>
//           <form
//             onSubmit={handleSubmit}
//             className="bg-white rounded-lg shadow-md overflow-hidden border border-amber-200"
//           >
//             <div className="p-6 sm:p-8 border-b border-amber-200">
//               <div className="grid md:grid-cols-2 gap-8">
//                 <div className="space-y-6">
//                   <div>
//                     <h2 className="text-2xl font-semibold mb-4 text-gray-800">Payment Method</h2>
//                     <div className="space-y-2">
//                       {[
//                         // { id: 'credit-card', label: 'Credit Card', icon: CreditCard },
//                         // { id: 'wallet', label: 'Bank Transfer', icon: WalletMinimal },
//                         { id: 'stripe', label: 'stripe', icon: Truck },
//                       ].map((method) => (
//                         <label
//                           key={method.id}
//                           className="flex items-center space-x-2 p-2 border border-amber-200 rounded-md cursor-pointer bg-white hover:bg-amber-50 transition-colors duration-300"
//                         >
//                           <input
//                             type="radio"
//                             name="paymentMethod"
//                             value={method.id}
//                             checked={paymentMethod === method.id}
//                             onChange={() => setPaymentMethod(method.id)}
//                             className="form-radio text-amber-600 focus:ring-amber-500"
//                           />
//                           <method.icon className="w-5 h-5 text-amber-600" />
//                           <span className="text-gray-800">{method.label}</span>
//                         </label>
//                       ))}
//                     </div>
//                   </div>

//                   <div className="border-t-2 border-amber-200 pt-6">
//                     <h2 className="text-2xl font-semibold mb-4 text-gray-800">
//                       Billing Information
//                     </h2>
//                     <div className="space-y-4">
//                       {loading ? (
//                         <p>Loading...</p>
//                       ) : address && address.length >= 1 ? (
//                         <div className="space-y-2">
//                           <h3 className="text-lg font-semibold text-gray-800">Your Addresses:</h3>
//                           {address.map((addr: any) => (
//                             <div key={addr._id} className="border border-gray-300 rounded-md p-4">
//                               <label className="flex items-center space-x-2">
//                                 <input
//                                   type="radio"
//                                   name="selectedAddress"
//                                   value={addr._id}
//                                   onChange={() => setSelectedAddress(addr._id ?? '')}
//                                   className="form-radio text-amber-600 focus:ring-amber-500"
//                                 />
//                                 <div>
//                                   <p className="text-gray-700">
//                                     <strong>Full Name:</strong> {addr.fullName}
//                                   </p>
//                                   <p className="text-gray-700">
//                                     <strong>Phone Number:</strong> {addr.phoneNumber}
//                                   </p>
//                                   <p className="text-gray-700">
//                                     <strong>Street Address:</strong> {addr.streetAddress}
//                                   </p>
//                                   <p className="text-gray-700">
//                                     <strong>City:</strong> {addr.city}
//                                   </p>
//                                   <p className="text-gray-700">
//                                     <strong>State:</strong> {addr.state}
//                                   </p>
//                                   <p className="text-gray-700">
//                                     <strong>Postal Code:</strong> {addr.postalCode}
//                                   </p>
//                                   <p className="text-gray-700">
//                                     <strong>Country:</strong> {addr.country}
//                                   </p>
//                                 </div>
//                               </label>
//                             </div>
//                           ))}
//                         </div>
//                       ) : (
//                         <div>
//                           <button onClick={() => navigate('/profile/address')}>Add Address</button>
//                         </div>
//                       )}
//                     </div>
//                   </div>
//                 </div>
//                 <div className="space-y-6">
//                   <div>
//                     <h2 className="text-2xl font-semibold mb-4 text-gray-800">Vintage Item</h2>
//                     <div className="bg-amber-50 p-4  rounded-lg border border-amber-200">
//                       <div className="aspect-w-16 aspect-h-9 mb-4">
//                         <img
//                           src={product?.productData.images[0]}
//                           alt="Vintage Typewriter"
//                           className="object-cover rounded-md w-40 h-40"
//                         />
//                       </div>
//                       <h3 className="text-lg font-semibold text-gray-800">
//                         {product?.productData.itemTitle}
//                       </h3>
//                     </div>
//                   </div>
//                   <div>
//                     <h2 className="text-2xl font-semibold mb-4 text-gray-800">Order Summary</h2>
//                     <div className="bg-amber-50 p-4 rounded-lg border border-amber-200">
//                       <div className="space-y-2">
//                         <div className="flex justify-between text-gray-800">
//                           <span>{productData.itemTitle}</span>
//                           <span>$ {productData.reservePrice}</span>
//                         </div>

//                         {productData.auctionStatus === 'sold' && (
//                           <div className="mt-2 bg-gray-100 p-4 rounded-md border border-amber-300">
//                             <h3 className="text-xl font-semibold text-gray-800">
//                               Final Bid Amount
//                             </h3>
//                             <div className="flex justify-between text-gray-800">
//                               <span>Final Bid:</span>
//                               <span>${productData.finalBidAmount}</span>
//                             </div>
//                           </div>
//                         )}

//                         <div className="border-t border-amber-300 my-2 pt-2"></div>

//                         <div className="flex justify-between text-gray-800">
//                           <span>Subtotal</span>
//                           <span>
//                             ${' '}
//                             {productData.auctionStatus === 'sold'
//                               ? productData.finalBidAmount
//                               : productData.reservePrice}
//                           </span>
//                         </div>

//                         {/* Show Shipping cost */}
//                         <div className="flex justify-between text-gray-800">
//                           <span>Shipping</span>
//                           <span>$ {productData.shippingCost}</span>
//                         </div>

//                         <div className="border-t border-amber-300 my-2 pt-2"></div>

//                         {/* Calculate the Total based on auction status */}
//                         <div className="flex justify-between font-semibold text-gray-900">
//                           <span>Total</span>
//                           <span>
//                             ${' '}
//                             {productData.auctionStatus === 'sold' && productData.currentBid
//                               ? Number(productData.currentBid) +
//                                 Number(productData.shippingCost || 0)
//                               : Number(productData.reservePrice) +
//                                 Number(productData.shippingCost || 0)}
//                           </span>
//                         </div>
//                       </div>
//                     </div>
//                   </div>

//                   <button
//                     type="submit"
//                     disabled={loading}
//                     className={`w-full ${loading ? 'bg-gray-400' : 'bg-[#975f26]'} text-white py-2 px-4 rounded-md hover:bg-[#7a4d1e] focus:outline-none focus:ring-2 focus:ring-amber-500 focus:ring-offset-2 transition-colors duration-300`}
//                   >
//                     {loading ? 'Processing...' : 'Complete Purchase'}
//                   </button>
//                   <p className="text-sm text-gray-600 text-center">
//                     By completing this purchase, you agree to our{' '}
//                     <a href="#" className="underline hover:text-amber-800">
//                       Terms of Service
//                     </a>{' '}
//                     and{' '}
//                     <a href="#" className="underline hover:text-amber-800">
//                       Privacy Policy
//                     </a>
//                     .
//                   </p>
//                 </div>
//               </div>
//             </div>
//           </form>
//         </div>
//       </div>
//       <Footer />
//     </>
//   );
// };

// export default CheckoutPage;

import React, { useEffect, useState } from 'react';
import { CreditCard, WalletMinimal, Truck } from 'lucide-react';
import { useParams } from 'react-router-dom';
import { useGetProductByIdQuery } from '../services/apis/productApi';
import { useGetAddressQuery } from '../services/apis/userApi';
import { useNavigate } from 'react-router-dom';
import {
  useCreateOrderMutation,
  useCreateCheckoutSessionMutation,
} from '../services/apis/orderApi';
import Header from '../components/User/Header';
import Footer from '../components/User/Footer';
import { useSelector } from 'react-redux';
import { RootState } from '../store/Store';
import { useStripe, useElements } from '@stripe/react-stripe-js';
import toast from 'react-hot-toast';

const CheckoutPage: React.FC = () => {
  const navigate = useNavigate();
  const stripe = useStripe();
  const elements = useElements();
  const { id } = useParams<{ id: string }>();
  const userId = useSelector((state: RootState) => state.User._id);
  const [createCheckoutSession] = useCreateCheckoutSessionMutation();

  const { data: address } = useGetAddressQuery(userId);
  const { data: product } = useGetProductByIdQuery(id);
  
  const productData = product?.productData || {
    _id: '',
    images: [''],
    itemTitle: 'Loading...',
    reservePrice: 0,
    shippingCost: 0,
    description: 'Loading...',
    sellerId: '',
    finalBidAmount: 0,
    currentBid: 0,
    auctionStatus: '',
  };

  const [selectedAddress, setSelectedAddress] = useState<string>('');
  const [createOrder, { isLoading: loading }] = useCreateOrderMutation();
  const [paymentMethod, setPaymentMethod] = useState('stripe');

  useEffect(() => {
    const orderCompleted = localStorage.getItem('orderCompleted');
    if (orderCompleted === 'true') {
      navigate('/success');
    }
    return () => {
      localStorage.removeItem('orderCompleted');
    };
  }, [navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!selectedAddress) {
      toast.error('Please select a delivery address.');
      return;
    }

    if (!paymentMethod) {
      toast.error('Please select a payment method.');
      return;
    }
console.warn('Button is working ❤️❤️❤️❤️❤️❤️❤️❤️❤️')

    if (!stripe || !elements) return;
console.log('Stripe payment is not working or check one more time ')
    if (paymentMethod === 'stripe') {
      try {
        const orderData = {
          buyerId: userId,
          sellerId: productData.sellerId,
          addressId: selectedAddress,
          productId: productData._id,
        };

        // Create order first
        const orderResponse = await createOrder(orderData).unwrap();
        console.log('Order created successfully:', orderResponse);
        
        // Calculate the price based on auction status
        let price = productData.auctionStatus === 'sold' && productData.currentBid
          ? Number(productData.currentBid)
          : Number(productData.reservePrice);
        
        // Add shipping cost
        const totalPrice = price + Number(productData.shippingCost || 0);
        
        // Format price to ensure it's a proper number (cents for Stripe)
        const formattedPrice = Math.round(totalPrice);

        // Prepare product data for checkout session
        const checkoutData = {
          image: productData.images[0],
          name: productData.itemTitle,
          price: formattedPrice,
          orderId: orderResponse, // Using the orderId returned from createOrder
        };

        console.log('Creating checkout session with data:', checkoutData);

        // Create checkout session
        const sessionResponse = await createCheckoutSession(checkoutData).unwrap();
        console.log('Checkout session created:', sessionResponse);
        
        if (sessionResponse && sessionResponse.id) {
          // Redirect to Stripe checkout
          const result = await stripe.redirectToCheckout({ 
            sessionId: sessionResponse.id 
          });

          if (result.error) {
            console.error('Stripe redirect error:', result.error.message);
            toast.error('Payment processing failed. Please try again.');
          }
        } else {
          toast.error('Failed to create checkout session.');
        }
      } catch (error) {
        console.error('Error during checkout process:', error);
        toast.error('An error occurred during checkout. Please try again.');
      }
    } else {
      toast.error('Please select a valid payment method.');
    }
  };

  // Calculate total price
  const getItemPrice = () => {
    return productData.auctionStatus === 'sold' && productData.currentBid
      ? Number(productData.currentBid)
      : Number(productData.reservePrice);
  };

  const getTotalPrice = () => {
    return getItemPrice() + Number(productData.shippingCost || 0);
  };

  return (
    <>
      <Header />
      <div className="min-h-screen bg-[#f1f1df] font-serif p-4 sm:p-6 lg:p-8">
        <div>
          <h1 className="text-4xl font-bold text-center mb-8 text-gray-800">
            VintageGems Checkout
          </h1>
          <form
            onSubmit={handleSubmit}
            className="bg-white rounded-lg shadow-md overflow-hidden border border-amber-200"
          >
            <div className="p-6 sm:p-8 border-b border-amber-200">
              <div className="grid md:grid-cols-2 gap-8">
                <div className="space-y-6">
                  <div>
                    <h2 className="text-2xl font-semibold mb-4 text-gray-800">Payment Method</h2>
                    <div className="space-y-2">
                      {[
                        { id: 'stripe', label: 'Pay with Stripe', icon: CreditCard },
                      ].map((method) => (
                        <label
                          key={method.id}
                          className="flex items-center space-x-2 p-2 border border-amber-200 rounded-md cursor-pointer bg-white hover:bg-amber-50 transition-colors duration-300"
                        >
                          <input
                            type="radio"
                            name="paymentMethod"
                            value={method.id}
                            checked={paymentMethod === method.id}
                            onChange={() => setPaymentMethod(method.id)}
                            className="form-radio text-amber-600 focus:ring-amber-500"
                          />
                          <method.icon className="w-5 h-5 text-amber-600" />
                          <span className="text-gray-800">{method.label}</span>
                        </label>
                      ))}
                    </div>
                  </div>

                  <div className="border-t-2 border-amber-200 pt-6">
                    <h2 className="text-2xl font-semibold mb-4 text-gray-800">
                      Billing Information
                    </h2>
                    <div className="space-y-4">
                      {loading ? (
                        <p>Loading...</p>
                      ) : address && address.length >= 1 ? (
                        <div className="space-y-2">
                          <h3 className="text-lg font-semibold text-gray-800">Your Addresses:</h3>
                          {address.map((addr: any) => (
                            <div key={addr._id} className="border border-gray-300 rounded-md p-4">
                              <label className="flex items-center space-x-2">
                                <input
                                  type="radio"
                                  name="selectedAddress"
                                  value={addr._id}
                                  onChange={() => setSelectedAddress(addr._id ?? '')}
                                  className="form-radio text-amber-600 focus:ring-amber-500"
                                />
                                <div>
                                  <p className="text-gray-700">
                                    <strong>Full Name:</strong> {addr.fullName}
                                  </p>
                                  <p className="text-gray-700">
                                    <strong>Phone Number:</strong> {addr.phoneNumber}
                                  </p>
                                  <p className="text-gray-700">
                                    <strong>Street Address:</strong> {addr.streetAddress}
                                  </p>
                                  <p className="text-gray-700">
                                    <strong>City:</strong> {addr.city}
                                  </p>
                                  <p className="text-gray-700">
                                    <strong>State:</strong> {addr.state}
                                  </p>
                                  <p className="text-gray-700">
                                    <strong>Postal Code:</strong> {addr.postalCode}
                                  </p>
                                  <p className="text-gray-700">
                                    <strong>Country:</strong> {addr.country}
                                  </p>
                                </div>
                              </label>
                            </div>
                          ))}
                        </div>
                      ) : (
                        <div>
                          <button 
                            type="button" 
                            onClick={() => navigate('/profile/address')}
                            className="bg-amber-600 text-white px-4 py-2 rounded hover:bg-amber-700"
                          >
                            Add Address
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
                <div className="space-y-6">
                  <div>
                    <h2 className="text-2xl font-semibold mb-4 text-gray-800">Vintage Item</h2>
                    <div className="bg-amber-50 p-4 rounded-lg border border-amber-200">
                      <div className="aspect-w-16 aspect-h-9 mb-4">
                        {productData.images[0] && (
                          <img
                            src={productData.images[0]}
                            alt={productData.itemTitle}
                            className="object-cover rounded-md w-40 h-40"
                          />
                        )}
                      </div>
                      <h3 className="text-lg font-semibold text-gray-800">
                        {productData.itemTitle}
                      </h3>
                    </div>
                  </div>
                  <div>
                    <h2 className="text-2xl font-semibold mb-4 text-gray-800">Order Summary</h2>
                    <div className="bg-amber-50 p-4 rounded-lg border border-amber-200">
                      <div className="space-y-2">
                        <div className="flex justify-between text-gray-800">
                          <span>{productData.itemTitle}</span>
                          <span>${getItemPrice().toFixed(2)}</span>
                        </div>

                        {productData.auctionStatus === 'sold' && productData.finalBidAmount && (
                          <div className="mt-2 bg-gray-100 p-4 rounded-md border border-amber-300">
                            <h3 className="text-xl font-semibold text-gray-800">
                              Final Bid Amount
                            </h3>
                            <div className="flex justify-between text-gray-800">
                              <span>Final Bid:</span>
                              <span>${productData.finalBidAmount.toFixed(2)}</span>
                            </div>
                          </div>
                        )}

                        <div className="border-t border-amber-300 my-2 pt-2"></div>

                        <div className="flex justify-between text-gray-800">
                          <span>Subtotal</span>
                          <span>${getItemPrice().toFixed(2)}</span>
                        </div>

                        <div className="flex justify-between text-gray-800">
                          <span>Shipping</span>
                          <span>${Number(productData.shippingCost || 0).toFixed(2)}</span>
                        </div>

                        <div className="border-t border-amber-300 my-2 pt-2"></div>

                        <div className="flex justify-between font-semibold text-gray-900">
                          <span>Total</span>
                          <span>${getTotalPrice().toFixed(2)}</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <button
                    type="submit"
                    disabled={loading}
                    className={`w-full ${loading ? 'bg-gray-400' : 'bg-[#975f26]'} text-white py-2 px-4 rounded-md hover:bg-[#7a4d1e] focus:outline-none focus:ring-2 focus:ring-amber-500 focus:ring-offset-2 transition-colors duration-300`}
                  >
                    {loading ? 'Processing...' : 'Complete Purchase'}
                  </button>
                  <p className="text-sm text-gray-600 text-center">
                    By completing this purchase, you agree to our{' '}
                    <a href="#" className="underline hover:text-amber-800">
                      Terms of Service
                    </a>{' '}
                    and{' '}
                    <a href="#" className="underline hover:text-amber-800">
                      Privacy Policy
                    </a>
                    .
                  </p>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default CheckoutPage;