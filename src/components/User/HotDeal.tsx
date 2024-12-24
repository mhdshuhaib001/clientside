// interface AuctionItem {
//   id: string
//   title: string
//   description: string
//   currentBid: number
//   image: string
//   daysLeft: number
//   hoursLeft: number
//   minutesLeft: number
//   secondsLeft: number
//   isHot?: boolean
// }

// const auctionItems: AuctionItem[] = [
//   {
//     id: '1',
//     title: 'Velocity visions',
//     description: 'where performance meet.',
//     currentBid: 2898,
//     image: '/placeholder.svg?height=300&width=300',
//     daysLeft: 18,
//     hoursLeft: 4,
//     minutesLeft: 0,
//     secondsLeft: 39,
//     isHot: true
//   },
//   {
//     id: '2',
//     title: 'Where Efficiency',
//     description: 'and Velocity Vision Collide.',
//     currentBid: 2655,
//     image: '/assets/Hot1.png?height=300&width=300',
//     daysLeft: 40,
//     hoursLeft: 4,
//     minutesLeft: 0,
//     secondsLeft: 39
//   }
// ]

// export default function HotDeals() {
//   return (
//     <div className="container mx-auto p-4">
//       <div className="flex justify-between items-center mb-4">
//         <h1 className="text-2xl font-bold">Current Auctions</h1>
//         <button className="text-blue-600 hover:underline">View All Auction</button>
//       </div>
//       <div className="grid md:grid-cols-2 gap-4">
//         {auctionItems.map((item) => (
//           <div key={item.id} className={`rounded-lg overflow-hidden ${item.isHot ? "bg-[#8B4513]" : "bg-[#6c8044]"}`}>
//             <div className="p-4">
//               <div className="relative mb-2">
//                 {item.isHot && (
//                   <span className="absolute top-0 right-0 bg-orange-500 text-white text-xs font-bold px-2 py-1 rounded">
//                     HOT NOW
//                   </span>
//                 )}
//                 <h2 className="text-2xl font-bold text-white">{item.title}</h2>
//                 <p className="text-lg text-white">{item.description}</p>
//               </div>
//               <div className="flex justify-between items-center mb-4">
//                 <div>
//                   <p className="text-sm text-gray-200">Current Bid at:</p>
//                   <p className="text-3xl font-bold text-white">${item.currentBid.toLocaleString()}</p>
//                 </div>
//                 {/* <Image
//                   src={item.image}
//                   alt={item.title}
//                   width={150}
//                   height={150}
//                   className="rounded-md"
//                 /> */}
//               </div>
//               <div>
//                 <p className="text-sm text-gray-200 mb-2">Auction Will Be End:</p>
//                 <div className="flex gap-4 mb-4">
//                   <div className="text-center">
//                     <p className="text-xl font-bold text-white">{item.daysLeft}</p>
//                     <p className="text-xs text-gray-200">Days</p>
//                   </div>
//                   <div className="text-center">
//                     <p className="text-xl font-bold text-white">{item.hoursLeft}</p>
//                     <p className="text-xs text-gray-200">Hours</p>
//                   </div>
//                   <div className="text-center">
//                     <p className="text-xl font-bold text-white">{item.minutesLeft}</p>
//                     <p className="text-xs text-gray-200">Minutes</p>
//                   </div>
//                   <div className="text-center">
//                     <p className="text-xl font-bold text-white">{item.secondsLeft}</p>
//                     <p className="text-xs text-gray-200">Seconds</p>
//                   </div>
//                 </div>
//                 <button className="w-80 bg-orange-500 hover:bg-orange-600 text-white font-bold py-2 px-4 rounded">
//                   Bid Now
//                 </button>
//               </div>
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   )
// }

import React, { useState, useEffect } from 'react';
import { ProductType } from '../../interface/productTypes/productType';
import { useNavigate } from 'react-router-dom';
const HotDeals: React.FC<{ products: ProductType[]; isLoading: boolean }> = ({
  products,
  isLoading,
}) => {
  const [_currentIndex, setCurrentIndex] = useState(0);
  const [_timeLeft, setTimeLeft] = useState(15);

  const navigate = useNavigate();

  // Filter live auction products
  const hotProducts = products
    .filter((product) => product.auctionStatus === 'live' && product.auctionFormat === 'auction')
    .slice(0, 2);
  // const truncateDescription = (description: string, maxLength: number) => {
  //   if (description.length > maxLength) {
  //     return description.substring(0, maxLength) + '...';
  //   }
  //   return description;
  // };
  const truncateText = (text: string, maxLength: number) => {
    if (text.length > maxLength) {
      return text.substring(0, maxLength) + '...';
    }
    return text;
  };

  useEffect(() => {
    if (hotProducts.length <= 1) return;

    const timer = setInterval(() => {
      setTimeLeft((prevTime) => {
        if (prevTime <= 1) {
          setCurrentIndex((prevIndex) => (prevIndex + 1) % hotProducts.length);
          return 15;
        }
        return prevTime - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [hotProducts.length]);

  if (isLoading || hotProducts.length === 0) {
    return (
      <div className="container mx-auto p-4">
        <div className="text-center text-gray-500">
          {isLoading ? 'Loading hot deals...' : ' '}
        </div>
      </div>
    );
  }

  // const currentItem = hotProducts[currentIndex];

  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Current Auctions</h1>
        <button className="text-blue-600 hover:underline">View All Auction</button>
      </div>
      <div className="grid md:grid-cols-2 gap-4">
        {hotProducts.map((item) => (
          <div
            key={item._id}
            className={`rounded-lg overflow-hidden ${item.auctionStatus === 'live' ? 'bg-[#8B4513]' : 'bg-[#4A90E2]'}`} // Different colors
          >
            <div className="p-4">
              <div className="relative mb-2">
                {item.auctionStatus === 'live' && (
                  <span className="absolute top-0 right-0 bg-orange-500 text-white text-xs font-bold px-2 py-1 rounded">
                    HOT NOW
                  </span>
                )}
                <h2 className="text-2xl font-bold text-white h-10 overflow-hidden">
                  {truncateText(item.itemTitle, 30)}
                </h2>
                <p className="text-lg text-white h-16 overflow-hidden">
                  {truncateText(item.description, 100)}
                </p>
              </div>
              <div className="flex justify-between items-center mb-4">
                <div>
                  <p className="text-sm text-gray-200">Current Bid at:</p>
                  <p className="text-3xl font-bold text-white">
                    ${item.currentBid || item.reservePrice}
                  </p>
                </div>
                {item.images && item.images.length > 0 && (
                  <img
                    src={item.images[0]}
                    alt={item.itemTitle}
                    className="w-52 h-52 object-cover rounded-md"
                  />
                )}
              </div>
              <div>
                <p className="text-sm text-gray-200 mb-2">Auction Will Be End:</p>
                <div className="flex gap-4 mb-4">
                  <div className="text-center">
                    <p className="text-xl font-bold text-white">
                      {calculateDaysLeft(item.auctionEndDateTime)}
                    </p>
                    <p className="text-xs text-gray-200">Days</p>
                  </div>
                  <div className="text-center">
                    <p className="text-xl font-bold text-white">
                      {calculateHoursLeft(item.auctionEndDateTime)}
                    </p>
                    <p className="text-xs text-gray-200">Hours</p>
                  </div>
                  <div className="text-center">
                    <p className="text-xl font-bold text-white">
                      {calculateMinutesLeft(item.auctionEndDateTime)}
                    </p>
                    <p className="text-xs text-gray-200">Minutes</p>
                  </div>
                  <div className="text-center">
                    <p className="text-xl font-bold text-white">
                      {calculateSecondsLeft(item.auctionEndDateTime)}
                    </p>
                    <p className="text-xs text-gray-200">Seconds</p>
                  </div>
                </div>
                <button
                  onClick={() => {
                    console.log(`Navigating to product with id: ${item._id}`); // Log the ID
                    navigate(`/product-details/${item._id}`);
                  }}
                  className="w-full bg-orange-500 hover:bg-orange-600 text-white font-bold py-2 px-4 rounded"
                >
                  Bid Now
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

// Utility functions to calculate time left
const calculateDaysLeft = (endDate: any) => {
  const end = new Date(endDate);
  const now = new Date();
  const difference = end.getTime() - now.getTime();
  return Math.floor(difference / (1000 * 60 * 60 * 24));
};

const calculateHoursLeft = (endDate: any) => {
  const end = new Date(endDate);
  const now = new Date();
  const difference = end.getTime() - now.getTime();
  return Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
};

const calculateMinutesLeft = (endDate: any) => {
  const end = new Date(endDate);
  const now = new Date();
  const difference = end.getTime() - now.getTime();
  return Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
};

const calculateSecondsLeft = (endDate: any) => {
  const end = new Date(endDate);
  const now = new Date();
  const difference = end.getTime() - now.getTime();
  return Math.floor((difference % (1000 * 60)) / 1000);
};

export default HotDeals;
