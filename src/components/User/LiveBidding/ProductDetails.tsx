import React from 'react';
import { Image } from '@nextui-org/react';

interface ProductDetailsProps {
  productData: any;
  currentBid: number;
  timeLeft: any;
  auctionStatus: string;
}

export const ProductDetails: React.FC<ProductDetailsProps> = ({
  productData,
  currentBid,
  timeLeft,
  auctionStatus,
}) => (
  <div className="space-y-4">
    <div className="aspect-w-1 aspect-h-1">
      <Image
        isBlurred
        width={240}
        height={240}
        src={productData.images[0]}
        alt="Product Image"
        className="m-5"
      />
    </div>
    <h1 className="text-2xl font-bold">{productData.itemTitle}</h1>

    <div className="flex justify-between items-center">
      <div>
        <p className="text-gray-600">Start Price:</p>
        <p className="text-xl font-semibold">$ {productData.reservePrice}</p>
      </div>
      <div>
        <p className="text-gray-600">Current Price:</p>
        <p className="text-2xl font-bold text-green-600">
          $ {currentBid || productData.reservePrice}
        </p>
      </div>
    </div>

 {auctionStatus !== 'sold' && auctionStatus !== 'unsold' ? (
  <div className="bg-gray-100 p-4 rounded-lg">
    <div className="grid grid-cols-4 gap-4 text-center">
      {Object.entries(timeLeft).map(([key, value]) => (
        <div key={key}>
          <div className="text-3xl font-bold">{String(value)}</div>
          <div className="text-sm text-gray-600">
            {key.charAt(0).toUpperCase() + key.slice(1)}
          </div>
        </div>
      ))}
    </div>
    <p className="text-center mt-2 text-sm text-gray-600">
      Ending On:{' '}
      {new Date(productData.auctionEndDateTime).toLocaleDateString(undefined, {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      })}{' '}
      ,{' '}
      {new Date(productData.auctionEndDateTime).toLocaleTimeString(undefined, {
        hour: '2-digit',
        minute: '2-digit',
        hour12: true,
      })}
    </p>
  </div>
) : (
  <div className="text-red-600 font-bold text-center">
    {auctionStatus === 'sold'
      ? 'Auction Ended - Item Sold'
      : 'Auction Ended - Item Unsold'}
  </div>
)}

  </div>
);