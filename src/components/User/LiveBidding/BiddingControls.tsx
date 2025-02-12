import React from 'react';
import { ChevronRight } from 'lucide-react';

interface BiddingControlsProps {
  quickBids: number[];
  customBid: string;
  handleBid: (amount: number) => Promise<void>;
  handleCustomBid: (e: React.FormEvent) => Promise<void>;
  setCustomBid: (value: string) => void;
}

export const BiddingControls: React.FC<BiddingControlsProps> = ({
  quickBids,
  customBid,
  handleBid,
  handleCustomBid,
  setCustomBid,
}) => (
  <>
    <div className="grid grid-cols-4 gap-2">
      {quickBids.map((bid) => (
        <button
          key={bid}
          onClick={() => handleBid(bid)}
          className="bg-amber-100 text-amber-950 py-2 rounded-lg hover:bg-amber-200 transition duration-300"
        >
          $ {bid}
        </button>
      ))}
    </div>
    <form onSubmit={handleCustomBid} className="flex space-x-2">
      <input
        type="number"
        value={customBid}
        onChange={(e) => setCustomBid(e.target.value)}
        placeholder="Enter your bid"
        className="flex-grow px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-300"
      />
      <button
        type="submit"
        className="bg-amber-700 text-white px-4 py-2 rounded-lg hover:bg-amber-500 border-amber-200 transition duration-300"
      >
        <ChevronRight className="w-6 h-6" />
      </button>
    </form>
  </>
);