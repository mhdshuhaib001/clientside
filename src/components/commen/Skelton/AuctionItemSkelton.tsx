import React from 'react';
import {Card, Skeleton} from "@nextui-org/react";

const AuctionItemSkeleton = () => {
  return (
    <Card className="w-full max-w-sm bg-white">
      {/* Image skeleton with aspect ratio */}
      <div className="relative pt-[75%]">
        <Skeleton className="absolute inset-0 rounded-t-lg">
          <div className="h-full w-full bg-default-200" />
        </Skeleton>
        
        {/* Status badge skeleton */}
        <div className="absolute top-2 left-2">
          <Skeleton className="h-6 w-20 rounded-full" />
        </div>
        
        {/* Timer skeleton */}
        <div className="absolute bottom-0 left-0 right-0 bg-white bg-opacity-80 p-2">
          <div className="flex justify-center gap-4">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="flex flex-col items-center">
                <Skeleton className="h-5 w-8 mb-1 rounded" />
                <Skeleton className="h-3 w-12 rounded" />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Content section */}
      <div className="p-4 space-y-4">
        {/* Title skeleton */}
        <div className="space-y-2">
          <Skeleton className="h-5 w-3/4 rounded" />
          <Skeleton className="h-4 w-1/2 rounded" />
        </div>

        {/* Price section skeleton */}
        <div className="space-y-2">
          <Skeleton className="h-4 w-1/3 rounded" />
          <Skeleton className="h-6 w-2/3 rounded" />
        </div>

        {/* Button skeleton */}
        <Skeleton className="h-10 w-full rounded-full" />
      </div>
    </Card>
  );
};

export default AuctionItemSkeleton;