import React from 'react';
import { Skeleton } from "@nextui-org/react";
import Footer from '../../User/Footer';
import Header from '../../User/Header';


const ProductPageSkeleton: React.FC = () => {
  return (
    <>
      <Header />
      <div className="container mx-auto px-4 py-8 bg-gray-50">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Image Gallery Skeleton */}
          <div className="flex space-x-4">
            {/* Thumbnail Images */}
            <div className="flex flex-col space-y-2">
              {[1, 2, 3, 4].map((_, index) => (
                <Skeleton 
                  key={index} 
                  className="w-24 h-24 rounded-lg" 
                  isLoaded={false}
                />
              ))}
            </div>

            {/* Main Image */}
            <Skeleton 
              className="flex-1 h-[500px] rounded-lg" 
              isLoaded={false}
            />
          </div>

          {/* Product Details Skeleton */}
          <div className="space-y-4">
            {/* Product Title */}
            <Skeleton 
              className="h-10 w-3/4" 
              isLoaded={false}
            />

            {/* Seller Profile */}
            <div className="flex items-center space-x-4">
              <Skeleton 
                className="w-16 h-16 rounded-full" 
                isLoaded={false}
              />
              <Skeleton 
                className="h-6 w-1/2" 
                isLoaded={false}
              />
            </div>

            {/* Price and Bid */}
            <div className="flex justify-between">
              <Skeleton 
                className="h-8 w-1/3" 
                isLoaded={false}
              />
              <Skeleton 
                className="h-8 w-1/3" 
                isLoaded={false}
              />
            </div>

            {/* Auction Timer */}
            <div className="bg-white p-4 rounded-lg">
              <div className="flex justify-around">
                {[1, 2, 3, 4].map((_, index) => (
                  <div key={index} className="text-center space-y-2">
                    <Skeleton 
                      className="h-12 w-16 mb-2" 
                      isLoaded={false}
                    />
                    <Skeleton 
                      className="h-4 w-12" 
                      isLoaded={false}
                    />
                  </div>
                ))}
              </div>
            </div>

            {/* Action Button */}
            <Skeleton 
              className="w-full h-12 rounded-lg" 
              isLoaded={false}
            />

            {/* Description */}
            <div className="space-y-2">
              <Skeleton 
                className="h-6 w-1/2" 
                isLoaded={false}
              />
              {[1, 2, 3].map((_, index) => (
                <Skeleton 
                  key={index} 
                  className="h-4 w-full" 
                  isLoaded={false}
                />
              ))}
            </div>

            {/* Checkout Logos */}
            <div className="flex justify-between items-center border-t border-b py-2">
              <Skeleton 
                className="h-6 w-1/3" 
                isLoaded={false}
              />
              <div className="flex space-x-2">
                {[1, 2, 3].map((_, index) => (
                  <Skeleton 
                    key={index} 
                    className="w-16 h-8 rounded" 
                    isLoaded={false}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default ProductPageSkeleton;