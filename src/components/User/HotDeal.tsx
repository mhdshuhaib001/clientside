// import React, { useState, useEffect } from 'react';
// import { ProductType } from '../../interface/productTypes/productType';
// import { useNavigate } from 'react-router-dom';

// const HotDeals: React.FC<{ products: ProductType[]; isLoading: boolean }> = ({
//   products,
//   isLoading,
// }) => {
//   const [timeLeft, setTimeLeft] = useState<{ [key: string]: number }>({});
//   const navigate = useNavigate();

//   const hotProducts = products
//     .filter((product) => product.auctionStatus === 'live' && product.auctionFormat === 'auction')
//     .slice(0, 2);

//   const truncateText = (text: string, maxLength: number) => {
//     if (text.length > maxLength) {
//       return text.substring(0, maxLength) + '...';
//     }
//     return text;
//   };

//   useEffect(() => {
//     const timer = setInterval(() => {
//       const now = new Date().getTime();
      
//       const newTimeLeft = hotProducts.reduce((acc, product) => {
//         const end = new Date(product.auctionEndDateTime).getTime();
//         if (product._id) {
//           acc[product._id] = Math.max(0, end - now);
//         }
//         return acc;
//       }, {} as { [key: string]: number });

//       setTimeLeft(newTimeLeft);
//     }, 1000);

//     return () => clearInterval(timer);
//   }, [hotProducts]);

//   const formatTime = (ms: number) => {
//     if (ms <= 0) return { days: 0, hours: 0, minutes: 0, seconds: 0 };
    
//     const seconds = Math.floor((ms / 1000) % 60);
//     const minutes = Math.floor((ms / (1000 * 60)) % 60);
//     const hours = Math.floor((ms / (1000 * 60 * 60)) % 24);
//     const days = Math.floor(ms / (1000 * 60 * 60 * 24));
    
//     return { days, hours, minutes, seconds };
//   };

//   if (isLoading || hotProducts.length === 0) {
//     return (
//       <div className="container mx-auto p-4">
//         <div className="text-center text-gray-500">
//           {isLoading ? 'Loading hot deals...' : ' '}
//         </div>
//       </div>
//     );
//   }
//   return (
//     <div className="container mx-auto p-4 bg-[#FAF3E0]">
//       <div className="flex justify-between items-center mb-4">
//         <h1 className="text-2xl font-bold text-[#8B7355]">Current Auctions</h1>
//         <button className="text-[#A67B5B] hover:text-[#8B7355] hover:underline">
//           View All Auction
//         </button>
//       </div>
//       <div className="grid md:grid-cols-2 gap-4">
//         {hotProducts.map((item) => {
//           const time = formatTime(timeLeft[item._id||''] || 0);
          
//           return (
//             <div
//               key={item._id}
//               className="rounded-lg overflow-hidden bg-gradient-to-r from-[#E8DCC4] to-[#DEB887] shadow-lg border border-[#D2B48C]"
//             >
//               <div className="p-4">
//                 <div className="relative mb-2">
//                   {item.auctionStatus === 'live' && (
//                     <span className="absolute top-0 right-0 bg-[#B87333] text-[#FAF3E0] text-xs font-bold px-2 py-1 rounded">
//                       HOT NOW
//                     </span>
//                   )}
//                   <h2 className="text-2xl font-bold text-[#654321] h-10 overflow-hidden">
//                     {truncateText(item.itemTitle, 30)}
//                   </h2>
//                   <p className="text-lg text-[#8B7355] h-16 overflow-hidden">
//                     {truncateText(item.description, 100)}
//                   </p>
//                 </div>
//                 <div className="flex justify-between items-center mb-4">
//                   <div>
//                     <p className="text-sm text-[#8B7355]">Current Bid at:</p>
//                     <p className="text-3xl font-bold text-[#654321]">
//                       ${item.currentBid || item.reservePrice}
//                     </p>
//                   </div>
//                   {item.images && item.images.length > 0 && (
//                     <div className="relative">
//                       <img
//                         src={item.images[0]}
//                         alt={item.itemTitle}
//                         className="w-52 h-52 object-cover rounded-md shadow-md border-4 border-[#D2B48C]"
//                       />
//                       <div className="absolute inset-0 border-2 border-[#8B7355] rounded-md opacity-20"></div>
//                     </div>
//                   )}
//                 </div>
//                 <div>
//                   <p className="text-sm text-[#8B7355] mb-2">Time Remaining:</p>
//                   <div className="flex gap-4 mb-4">
//                     {[
//                       { value: time.days, label: 'Days' },
//                       { value: time.hours, label: 'Hours' },
//                       { value: time.minutes, label: 'Minutes' },
//                       { value: time.seconds, label: 'Seconds' },
//                     ].map((timeUnit, index) => (
//                       <div
//                         key={index}
//                         className="text-center bg-[#FAF3E0] p-2 rounded-lg shadow-md border border-[#D2B48C]"
//                       >
//                         <p className="text-xl font-bold text-[#8B7355]">
//                           {String(timeUnit.value).padStart(2, '0')}
//                         </p>
//                         <p className="text-xs text-[#A67B5B]">{timeUnit.label}</p>
//                       </div>
//                     ))}
//                   </div>
//                   <button
//                     onClick={() => navigate(`/product-details/${item._id}`)}
//                     className="w-full bg-[#B87333] hover:bg-[#A67B5B] text-[#FAF3E0] font-bold py-2 px-4 rounded transition duration-300 border border-[#8B7355]"
//                   >
//                     Bid Now
//                   </button>
//                 </div>
//               </div>
//             </div>
//           );
//         })}
//       </div>
//     </div>
//   );

// };

// export default HotDeals;


import React, { useState, useEffect } from 'react';
import { ProductType } from '../../interface/productTypes/productType';
import { useNavigate } from 'react-router-dom';

const HotDeals: React.FC<{ products: ProductType[]; isLoading: boolean }> = ({
  products,
  isLoading,
}) => {
  const [timeLeft, setTimeLeft] = useState<{ [key: string]: number }>({});
  const navigate = useNavigate();

  // Filter live auction and buy-it-now products
  const liveProducts = products.filter(
    (product) => product.auctionStatus === 'live' && product.auctionFormat === 'auction'
  );
  const buyItNowProducts = products.filter(
    (product) => product.auctionFormat === 'buy_it_now' && product.auctionFormat === 'buy_it_now'
  );

  // Select up to 2 hot products, with priority to live products
  let hotProducts = [] as any;
  if (liveProducts.length > 0) {
    hotProducts = liveProducts.slice(0, 1); // Show 1 live product if available
  }
  if (buyItNowProducts.length > 0 && hotProducts.length < 2) {
    hotProducts.push(buyItNowProducts[0]); // Add Buy It Now product if available
  }

  // If there are more than 1 live product, shuffle them
  if (liveProducts.length > 1) {
    hotProducts = liveProducts.sort(() => Math.random() - 0.5).slice(0, 2); // Shuffle live products
  }

  const truncateText = (text: string, maxLength: number) => {
    if (text.length > maxLength) {
      return text.substring(0, maxLength) + '...';
    }
    return text;
  };

  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date().getTime();
      
      const newTimeLeft = hotProducts.reduce((acc: { [x: string]: number; }, product: { auctionEndDateTime: string | number | Date; _id: string | number; }) => {
        const end = new Date(product.auctionEndDateTime).getTime();
        if (product._id) {
          acc[product._id] = Math.max(0, end - now);
        }
        return acc;
      }, {} as { [key: string]: number });

      setTimeLeft(newTimeLeft);
    }, 1000);

    return () => clearInterval(timer);
  }, [hotProducts]);

  const formatTime = (ms: number) => {
    if (ms <= 0) return { days: 0, hours: 0, minutes: 0, seconds: 0 };
    
    const seconds = Math.floor((ms / 1000) % 60);
    const minutes = Math.floor((ms / (1000 * 60)) % 60);
    const hours = Math.floor((ms / (1000 * 60 * 60)) % 24);
    const days = Math.floor(ms / (1000 * 60 * 60 * 24));
    
    return { days, hours, minutes, seconds };
  };

  if (isLoading || hotProducts.length === 0) {
    return (
      <div className="container mx-auto p-4">
        <div className="text-center text-gray-500">
          {isLoading ? 'Loading hot deals...' : 'No products available'}
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4 bg-[#FAF3E0]">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold text-[#8B7355]">Current Auctions</h1>
        <button className="text-[#A67B5B] hover:text-[#8B7355] hover:underline">
          View All Auction
        </button>
      </div>
      <div className="grid md:grid-cols-2 gap-4">
        {hotProducts.map((item) => {
          const time = formatTime(timeLeft[item._id || ''] || 0);
          
          return (
            <div
              key={item._id}
              className="rounded-lg overflow-hidden bg-gradient-to-r from-[#E8DCC4] to-[#DEB887] shadow-lg border border-[#D2B48C]"
            >
              <div className="p-4">
                <div className="relative mb-2">
                  {item.auctionStatus === 'live' && (
                    <span className="absolute top-0 right-0 bg-[#B87333] text-[#FAF3E0] text-xs font-bold px-2 py-1 rounded">
                      HOT NOW
                    </span>
                  )}
                  <h2 className="text-2xl font-bold text-[#654321] h-10 overflow-hidden">
                    {truncateText(item.itemTitle, 30)}
                  </h2>
                  <p className="text-lg text-[#8B7355] h-16 overflow-hidden">
                    {truncateText(item.description, 100)}
                  </p>
                </div>
                <div className="flex justify-between items-center mb-4">
                  <div>
                    <p className="text-sm text-[#8B7355]">Current Bid at:</p>
                    <p className="text-3xl font-bold text-[#654321]">
                      ${item.currentBid || item.reservePrice}
                    </p>
                  </div>
                  {item.images && item.images.length > 0 && (
                    <div className="relative">
                      <img
                        src={item.images[0]}
                        alt={item.itemTitle}
                        className="w-52 h-52 object-cover rounded-md shadow-md border-4 border-[#D2B48C]"
                      />
                      <div className="absolute inset-0 border-2 border-[#8B7355] rounded-md opacity-20"></div>
                    </div>
                  )}
                </div>
                <div>
                  <p className="text-sm text-[#8B7355] mb-2">Time Remaining:</p>
                  <div className="flex gap-4 mb-4">
                    {[{ value: time.days, label: 'Days' }, { value: time.hours, label: 'Hours' }, { value: time.minutes, label: 'Minutes' }, { value: time.seconds, label: 'Seconds' }].map((timeUnit, index) => (
                      <div key={index} className="text-center bg-[#FAF3E0] p-2 rounded-lg shadow-md border border-[#D2B48C]">
                        <p className="text-xl font-bold text-[#8B7355]">
                          {String(timeUnit.value).padStart(2, '0')}
                        </p>
                        <p className="text-xs text-[#A67B5B]">{timeUnit.label}</p>
                      </div>
                    ))}
                  </div>
                  <button
                    onClick={() => navigate(`/product-details/${item._id}`)}
                    className="w-full bg-[#B87333] hover:bg-[#A67B5B] text-[#FAF3E0] font-bold py-2 px-4 rounded transition duration-300 border border-[#8B7355]"
                  >
                    {item.auctionStatus === 'live' ? 'Bid Now' : 'Buy It Now'}
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default HotDeals;
