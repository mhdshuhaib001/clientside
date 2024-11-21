import React from 'react';
import { Card, CardBody, Skeleton } from "@nextui-org/react";

const SellerProfileSkeleton = () => {
  return (
    <div className="w-full">
      {/* Header Card Skeleton */}
      <Card className="w-full shadow-sm">
        <CardBody className="p-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              {/* Profile Image Skeleton */}
              <Skeleton className="rounded-full w-20 h-20" />
              
              <div className="space-y-2">
                {/* Company Name Skeleton */}
                <Skeleton className="h-8 w-48 rounded-lg" />
                {/* Items Listed Skeleton */}
                <Skeleton className="h-4 w-32 rounded-lg" />
              </div>
            </div>
            
            <div className="flex flex-col items-end gap-2">
              {/* Contact Info Skeletons */}
              <div className="flex flex-col items-end gap-2">
                <Skeleton className="h-5 w-36 rounded-lg" />
                <Skeleton className="h-5 w-40 rounded-lg" />
              </div>
              {/* Report Button Skeleton */}
              <Skeleton className="h-9 w-32 rounded-lg" />
            </div>
          </div>
        </CardBody>
      </Card>

      {/* Tabs Skeleton */}
      <div className="mt-8 flex justify-center gap-4">
        {[...Array(3)].map((_, index) => (
          <Skeleton key={index} className="h-10 w-24 rounded-lg" />
        ))}
      </div>

      {/* Products Grid Skeleton */}
      <div className="mt-6 px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {[...Array(4)].map((_, index) => (
            <Card key={index} className="w-full">
              <CardBody className="p-0">
                {/* Product Image Skeleton */}
                <Skeleton className="w-full h-64 rounded-none" />
                
                <div className="p-4 space-y-3">
                  {/* Time Left Skeleton */}
                  <div className="flex justify-between items-center">
                    <Skeleton className="h-4 w-32 rounded-lg" />
                    <Skeleton className="h-6 w-24 rounded-full" />
                  </div>
                  
                  {/* Product Title Skeleton */}
                  <Skeleton className="h-6 w-3/4 rounded-lg" />
                  
                  {/* Category Skeleton */}
                  <Skeleton className="h-4 w-1/3 rounded-lg" />
                  
                  {/* Price and Button Area */}
                  <div className="flex justify-between items-center pt-2">
                    <div className="space-y-2">
                      <Skeleton className="h-4 w-24 rounded-lg" />
                      <Skeleton className="h-6 w-32 rounded-lg" />
                    </div>
                    <Skeleton className="h-10 w-28 rounded-lg" />
                  </div>
                </div>
              </CardBody>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SellerProfileSkeleton;