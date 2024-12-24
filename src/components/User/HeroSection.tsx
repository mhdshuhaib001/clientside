// import React, { useState, useEffect } from 'react';

// const slides = [
//   {
//     title: 'Welcome to AuctionGems',
//     description: 'Discover unique antique treasures and participate in exciting live auctions.',
//     image1: '/assets/Hearo2.jpg',
//     image2: '/assets/Hearo1.jpg',
//   },
//   {
//     title: 'Bid on Rare Collectibles',
//     description: 'Explore our collection of one-of-a-kind vintage items and make them yours.',
//     image1: '/assets/Hearo2.jpg',
//     image2: '/assets/Hearo1.jpg',
//   },

// ];

// const HeroSection: React.FC = () => {
//   const [currentSlide, setCurrentSlide] = useState(0);

//   useEffect(() => {
//     const interval = setInterval(() => {
//       setCurrentSlide((prevSlide) => (prevSlide + 1) % slides.length);
//     }, 5000);

//     return () => clearInterval(interval);
//   }, []);

//   return (
//     <section
//       className="relative bg-gradient-to-l from-[#c9a227] via-[#e5cc6f] to-[#f7efc1] overflow-hidden h-[85vh]"
//       style={{
//         borderBottomLeftRadius: '40px',
//         borderBottomRightRadius: '40px',
//       }}
//     >
//       {/* Background Image */}
//       <div
//         className="absolute inset-0 bg-cover bg-center transition-opacity duration-1000"
//         // style={{ backgroundImage: `url(${slides[currentSlide].image1})` }}
//       ></div>

//       {/* Content Container */}
//       <div className="relative container mx-auto px-6 py-20 flex flex-col md:flex-row items-center text-left z-10 h-full">
//         {/* Left Side: Text Area */}
//         <div className="md:w-1/2">
//           <h1 className="text-4xl md:text-5xl font-bold text-[#2c2416] mb-4">
//             {slides[currentSlide].title}
//           </h1>
//           <p className="text-lg md:text-xl text-[#4a3c2e] mb-6">
//             {slides[currentSlide].description}
//           </p>

//           {/* Buttons */}
//           <div className="flex space-x-4 mb-8">
//             <a
//               href="#start-bidding"
//               className="bg-[#b8860b] text-white py-3 px-6 rounded-md hover:bg-[#9b7209]"
//             >
//               Start Bidding
//             </a>

//             <a
//               href="#view-all-auctions"
//               className="border border-[#4a3c2e] text-[#4a3c2e] hover:bg-[#4a3c2e] py-3 px-6 rounded-md hover:text-white hover:backdrop-blur-sm hover:backdrop:bg-opacity-20"
//             >
//               View All Auctions
//             </a>
//           </div>
//         </div>

//         {/* Right Side: Image Carousel */}
//         <div className="md:w-1/2 flex flex-col md:flex-row gap-4 md:gap-8 mt-8 md:mt-0">
//           <div
//             className="w-[260.75px] h-[410.69px] bg-white shadow-lg"
//             style={{
//               borderTopLeftRadius: '30px',
//               borderBottomLeftRadius: '10px',
//               borderBottomRightRadius: '30px',
//               borderTopRightRadius: '10px',
//             }}
//           >
//             <img
//               src={slides[currentSlide].image1}
//               alt={`Auction Ad ${currentSlide + 1}`}
//               className="w-full h-full object-cover"
//               style={{
//                 borderTopLeftRadius: '30px',
//                 borderBottomLeftRadius: '10px',
//                 borderBottomRightRadius: '30px',
//                 borderTopRightRadius: '10px',
//               }}
//             />
//           </div>
//           <div
//             className="w-[266px] h-[295px] bg-white shadow-lg"
//             style={{
//               borderTopLeftRadius: '30px',
//               borderBottomLeftRadius: '10px',
//               borderBottomRightRadius: '30px',
//               borderTopRightRadius: '10px',
//             }}
//           >
//             <img
//               src={slides[currentSlide].image2}
//               alt={`Auction Ad ${currentSlide + 1}`}
//               className="w-full h-full object-cover"
//               style={{
//                 borderTopLeftRadius: '30px',
//                 borderBottomLeftRadius: '10px',
//                 borderBottomRightRadius: '30px',
//                 borderTopRightRadius: '10px',
//               }}
//             />
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// };

// // export default HeroSection;
// import React from 'react';
// import { motion } from 'framer-motion';

// export default function HeroSection() {
//   // Animation variants
//   const containerVariants = {
//     hidden: { opacity: 0 },
//     visible: {
//       opacity: 1,
//       transition: {
//         staggerChildren: 0.3,
//         delayChildren: 0.2
//       }
//     }
//   };

//   const itemVariants = {
//     hidden: { opacity: 0, y: 20 },
//     visible: {
//       opacity: 1,
//       y: 0,
//       transition: {
//         duration: 0.6,
//         ease: "easeOut"
//       }
//     }
//   };

//   const badgeVariants = {
//     initial: { scale: 0.9, opacity: 0 },
//     animate: {
//       scale: 1,
//       opacity: 1,
//       transition: {
//         type: "spring",
//         stiffness: 100,
//         damping: 15
//       }
//     },
//     hover: {
//       scale: 1.05,
//       transition: {
//         type: "spring",
//         stiffness: 400,
//         damping: 10
//       }
//     }
//   };

//   const buttonVariants = {
//     hover: {
//       scale: 1.05,
//       transition: {
//         type: "spring",
//         stiffness: 400,
//         damping: 10
//       }
//     },
//     tap: {
//       scale: 0.95
//     }
//   };

//   return (
//     <motion.div
//       className="relative"
//       initial="hidden"
//       animate="visible"
//       variants={containerVariants}
//     >
//       {/* Main Hero Section */}
//       <div className="relative overflow-hidden bg-gradient-to-br from-amber-50 via-amber-100 to-amber-200 rounded-b-lg">
//         <div className="relative isolate px-6 pt-14 lg:px-8">
//           {/* Animated background element */}
//           <motion.div
//             className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80"
//             animate={{
//               y: [0, -20, 0],
//               opacity: [0.3, 0.5, 0.3]
//             }}
//             transition={{
//               duration: 8,
//               repeat: Infinity,
//               ease: "easeInOut"
//             }}
//             aria-hidden="true"
//           >
//             <div
//               className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-amber-200 to-amber-400 opacity-30 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]"
//               style={{
//                 clipPath:
//                   'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
//               }}
//             />
//           </motion.div>

//           {/* Main Content */}
//           <div className="mx-auto max-w-7xl py-24 sm:py-32">
//             {/* Live badge */}
//             <div className="mb-8 flex justify-center">
//               <motion.div
//                 className="relative flex items-center gap-x-4 rounded-full bg-amber-50/60 px-4 py-1.5 text-sm leading-6 text-gray-600 ring-1 ring-amber-900/10 backdrop-blur-sm"
//                 variants={badgeVariants}
//                 initial="initial"
//                 animate="animate"
//                 whileHover="hover"
//               >
//                 <span className="flex items-center gap-1.5">
//                   <span className="relative flex h-2 w-2">
//                     <motion.span
//                       className="absolute inline-flex h-full w-full rounded-full bg-amber-400"
//                       animate={{
//                         scale: [1, 1.5, 1],
//                         opacity: [0.7, 0.3, 0.7]
//                       }}
//                       transition={{
//                         duration: 1.5,
//                         repeat: Infinity,
//                         ease: "easeInOut"
//                       }}
//                     />
//                     <span className="relative inline-flex h-2 w-2 rounded-full bg-amber-500" />
//                   </span>
//                   <span className="font-semibold text-amber-700">Live Auctions</span>
//                 </span>
//                 <span className="h-4 w-px bg-amber-900/10" aria-hidden="true" />
//                 <motion.a
//                   href="#featured"
//                   className="flex items-center gap-x-1 font-medium text-amber-700"
//                   whileHover={{ x: 3 }}
//                 >
//                   View featured items
//                   <motion.span
//                     aria-hidden="true"
//                     whileHover={{ x: 3 }}
//                     transition={{ type: "spring", stiffness: 400 }}
//                   >
//                     →
//                   </motion.span>
//                 </motion.a>
//               </motion.div>
//             </div>

//             {/* Hero content */}
//             <motion.div className="text-center" variants={containerVariants}>
//               <motion.h1
//                 className="text-balance bg-gradient-to-r from-amber-900 via-amber-700 to-amber-800 bg-clip-text text-4xl font-bold tracking-tight text-transparent sm:text-6xl lg:text-7xl"
//                 variants={itemVariants}
//               >
//                 Discover Unique Treasures at AuctionGems
//               </motion.h1>
//               <motion.p
//                 className="mt-6 text-pretty text-lg leading-8 text-gray-600 sm:text-xl"
//                 variants={itemVariants}
//               >
//                 Join our exclusive online auctions featuring rare collectibles, antiques, and
//                 one-of-a-kind items. Bid, win, and add extraordinary pieces to your collection.
//               </motion.p>
//               <motion.div
//                 className="mt-10 flex items-center justify-center gap-x-6"
//                 variants={itemVariants}
//               >
//                 <motion.a
//                   href="#start-bidding"
//                   className="rounded-md bg-amber-700 px-5 py-3 text-sm font-semibold text-white shadow-sm"
//                   variants={buttonVariants}
//                   whileHover="hover"
//                   whileTap="tap"
//                 >
//                   Start Bidding
//                 </motion.a>
//                 <motion.a
//                   href="#how-it-works"
//                   className="group text-sm font-semibold leading-6 text-gray-900"
//                   variants={buttonVariants}
//                   whileHover="hover"
//                   whileTap="tap"
//                 >
//                   Learn how it works{' '}
//                   <motion.span
//                     className="inline-block"
//                     whileHover={{ x: 5 }}
//                     transition={{ type: "spring", stiffness: 400 }}
//                   >
//                     →
//                   </motion.span>
//                 </motion.a>
//               </motion.div>
//             </motion.div>
//           </div>
//         </div>
//       </div>
//     </motion.div>
//   );
// }



import React from 'react';
import { motion } from 'framer-motion';

export default function HeroSection() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3,
        delayChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  };

  return (
    <motion.div
      className="relative"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      {/* Main Hero Section */}
      <div className="relative overflow-hidden bg-gradient-to-br from-amber-50 via-amber-100 to-amber-200">
        <div className="relative isolate px-6 pt-14 lg:px-8">
          {/* Background decoration */}
          <motion.div
            className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80"
            animate={{
              y: [0, -20, 0],
              opacity: [0.3, 0.5, 0.3]
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: "easeInOut"
            }}
            aria-hidden="true"
          >
            <div
              className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-amber-200 to-amber-400 opacity-30 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]"
              style={{
                clipPath:
                  'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
              }}
            />
          </motion.div>

          {/* Main Content */}
          <div className="mx-auto max-w-7xl py-24 sm:py-32">
            {/* Live badge */}
            <div className="mb-8 flex justify-center">
              <motion.div
                className="relative flex items-center gap-x-4 rounded-full bg-amber-50/60 px-4 py-1.5 text-sm leading-6 text-gray-600 ring-1 ring-amber-900/10 backdrop-blur-sm hover:ring-amber-900/20"
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 400, damping: 10 }}
              >
                <span className="flex items-center gap-1.5">
                  <span className="relative flex h-2 w-2">
                    <motion.span
                      className="absolute inline-flex h-full w-full rounded-full bg-amber-400"
                      animate={{
                        scale: [1, 1.5, 1],
                        opacity: [0.7, 0.3, 0.7]
                      }}
                      transition={{
                        duration: 1.5,
                        repeat: Infinity,
                        ease: "easeInOut"
                      }}
                    />
                    <span className="relative inline-flex h-2 w-2 rounded-full bg-amber-500" />
                  </span>
                  <span className="font-semibold text-amber-700">Live Auctions</span>
                </span>
                <span className="h-4 w-px bg-amber-900/10" aria-hidden="true" />
                <a
                  href="#featured"
                  className="flex items-center gap-x-1 font-medium text-amber-700 hover:text-amber-800"
                >
                  View featured items
                  <span aria-hidden="true">&rarr;</span>
                </a>
              </motion.div>
            </div>

            {/* Hero content */}
            <div className="text-center">
              <motion.h1
                variants={itemVariants}
                className="text-balance bg-gradient-to-r from-amber-900 via-amber-700 to-amber-800 bg-clip-text text-4xl font-bold tracking-tight text-transparent sm:text-6xl lg:text-7xl"
              >
                Discover Unique Treasures at AuctionGems
              </motion.h1>
              <motion.p
                variants={itemVariants}
                className="mt-6 text-pretty text-lg leading-8 text-gray-600 sm:text-xl"
              >
                Join our exclusive online auctions featuring rare collectibles, antiques, and
                one-of-a-kind items. Bid, win, and add extraordinary pieces to your collection.
              </motion.p>
              <motion.div
                variants={itemVariants}
                className="mt-10 flex items-center justify-center gap-x-6"
              >
                <motion.a
                  href="/auction-items"
                  className="rounded-md bg-gray-700 px-5 py-3 text-sm font-semibold text-white shadow-sm hover:bg-gray-600"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Start Bidding
                </motion.a>
                <motion.a
                  href="#how-it-works"
                  className="text-sm font-semibold leading-6 text-gray-900"
                  whileHover={{ scale: 1.05 }}
                >
                  Learn how it works{' '}
                  <motion.span
                    className="inline-block"
                    whileHover={{ x: 5 }}
                  >
                    →
                  </motion.span>
                </motion.a>
              </motion.div>
            </div>
          </div>
        </div>

        {/* Wave Shape Divider */}
        <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-none">
          <svg
            className="relative block w-full h-[50px] md:h-[100px]"
            data-name="Layer 1"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 1200 120"
            preserveAspectRatio="none"
          >
            <motion.path
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 1.5, ease: "easeInOut" }}
              d="M985.66,92.83C906.67,72,823.78,31,743.84,14.19c-82.26-17.34-168.06-16.33-250.45.39-57.84,11.73-114,31.07-172,41.86A600.21,600.21,0,0,1,0,27.35V120H1200V95.8C1132.19,118.92,1055.71,111.31,985.66,92.83Z"
              className="fill-white"
            />
          </svg>
        </div>
      </div>
    </motion.div>
  );
}