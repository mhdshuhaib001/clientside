import React from 'react';
import { Skeleton } from '@nextui-org/react';

const AuctionSkelton = () => {
  return (
    <div className="container mx-auto px-4 py-8 font-serif">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Left Column */}
        <div className="space-y-4">
          {/* Image Skeleton */}
          <div className="aspect-w-1 aspect-h-1">
            <Skeleton
              className="rounded-lg  m-5"
              style={{ width: '240px', height: '240px' }}
            >
              <div className="h-60 w-60 m-5"></div>
            </Skeleton>
          </div>

          {/* Title Skeleton */}
          <Skeleton className="rounded-lg">
            <div className="h-8 w-3/4"></div>
          </Skeleton>

          {/* Price Information Skeleton */}
          <div className="flex justify-between items-center">
            <div>
              <Skeleton className="rounded-lg mb-2">
                <div className="h-4 w-20"></div>
              </Skeleton>
              <Skeleton className="rounded-lg">
                <div className="h-6 w-24"></div>
              </Skeleton>
            </div>
            <div>
              <Skeleton className="rounded-lg mb-2">
                <div className="h-4 w-20"></div>
              </Skeleton>
              <Skeleton className="rounded-lg">
                <div className="h-6 w-24"></div>
              </Skeleton>
            </div>
          </div>

          {/* Timer Skeleton */}
          <div className="bg-gray-100 p-4 rounded-lg">
            <div className="grid grid-cols-4 gap-4 text-center">
              {[...Array(4)].map((_, index) => (
                <div key={index}>
                  <Skeleton className="rounded-lg mb-2">
                    <div className="h-10 w-full"></div>
                  </Skeleton>
                  <Skeleton className="rounded-lg">
                    <div className="h-4 w-full"></div>
                  </Skeleton>
                </div>
              ))}
            </div>
            <Skeleton className="rounded-lg mt-2">
              <div className="h-4 w-full"></div>
            </Skeleton>
          </div>
        </div>

        {/* Right Column */}
        <div className="space-y-4">
          {/* Seller Profile Card Skeleton */}
          <div className="bg-white rounded-lg p-4 shadow">
            <div className="flex items-center space-x-4">
              <Skeleton className="rounded-full">
                <div className="h-12 w-12"></div>
              </Skeleton>
              <div className="flex-1">
                <Skeleton className="rounded-lg mb-2">
                  <div className="h-4 w-32"></div>
                </Skeleton>
                <Skeleton className="rounded-lg">
                  <div className="h-4 w-24"></div>
                </Skeleton>
              </div>
            </div>
          </div>

          {/* Bidding Leader Section Skeleton */}
          <div className="bg-orange-100 rounded-lg p-4">
            <Skeleton className="rounded-lg mb-4">
              <div className="h-6 w-32"></div>
            </Skeleton>

            {[...Array(3)].map((_, index) => (
              <div key={index} className="flex items-center space-x-3 mb-4">
                <Skeleton className="rounded-full">
                  <div className="h-10 w-10"></div>
                </Skeleton>
                <div className="flex-grow">
                  <Skeleton className="rounded-lg mb-2">
                    <div className="h-4 w-24"></div>
                  </Skeleton>
                  <Skeleton className="rounded-lg">
                    <div className="h-4 w-32"></div>
                  </Skeleton>
                </div>
              </div>
            ))}
          </div>

          {/* Quick Bids Skeleton */}
          <div className="grid grid-cols-4 gap-2">
            {[...Array(4)].map((_, index) => (
              <Skeleton key={index} className="rounded-lg">
                <div className="h-10 w-full"></div>
              </Skeleton>
            ))}
          </div>

          {/* Custom Bid Form Skeleton */}
          <div className="flex space-x-2">
            <Skeleton className="flex-grow rounded-lg">
              <div className="h-10 w-full"></div>
            </Skeleton>
            <Skeleton className="rounded-lg">
              <div className="h-10 w-10"></div>
            </Skeleton>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuctionSkelton;
