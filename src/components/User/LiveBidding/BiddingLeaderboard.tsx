import React from 'react';
import { Image } from '@nextui-org/react';
import { Bid } from '../../../interface/userTypes/BidTypes';
interface BiddingLeaderboardProps {
  bids: Bid[];
}

export const BiddingLeaderboard: React.FC<BiddingLeaderboardProps> = ({ bids }) => (
  <div className="bg-orange-100 rounded-lg p-4">
    <h3 className="text-lg font-semibold mb-4">Bidding Leader</h3>
    {bids.length > 0 ? (
      <div className="space-y-4">
        {bids.map((bid) => (
          <div key={bid.id} className="flex items-center space-x-3">
            <Image
              src={bid.avatar}
              alt={bid.bidder}
              width={40}
              height={40}
              className="rounded-full"
            />
            <div className="flex-grow">
              <p className="font-semibold">{bid.bidder}</p>
              <p className="text-sm text-gray-600">
                {new Date(bid.time).toLocaleTimeString()} for{' '}
                {bid.amount ? bid.amount.toFixed(2) : '0.00'}$
              </p>
            </div>
          </div>
        ))}
      </div>
    ) : (
      <div className="flex justify-center items-center">
        <p className="text-gray-600 text-center">Be the first to start the bidding!</p>
      </div>
    )}
  </div>
);
