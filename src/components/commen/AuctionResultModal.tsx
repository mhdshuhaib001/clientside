import React from 'react';

interface AuctionResultModalProps {
  isOpen: boolean;
  onClose: () => void;
  isWinner: boolean;
  productTitle: string;
  winningBid: number;
  checkoutLink: string;
}

const AuctionResultModal: React.FC<AuctionResultModalProps> = ({ 
  isOpen, 
  onClose, 
  isWinner, 
  productTitle,
  winningBid,
  checkoutLink 
}) => {
  if (!isOpen) return null; 

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-75 z-50">
      <div className="bg-white rounded-lg shadow-lg p-6 max-w-lg w-full">
        <div className="flex justify-between items-center">
          <h3 className={`text-2xl font-bold ${isWinner ? 'text-amber-600' : 'text-gray-600'}`}>
            {isWinner ? '🏆 Congratulations!' : '💪 Better Luck Next Time'}
          </h3>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600">&times;</button>
        </div>

        <div className="mt-4">
          {isWinner ? (
            <div className="space-y-4">
              <p className="text-lg">
                You've won the auction for <span className="font-semibold">"{productTitle}"</span>!
              </p>
              <p className="text-xl font-bold text-green-600">
                Winning Bid: ${winningBid}
              </p>
              <div className="bg-amber-50 p-4 rounded-lg">
                <p className="font-medium mb-2">Next Steps:</p>
                <ul className="list-disc list-inside space-y-2">
                  <li>Complete your payment within 24 hours</li>
                  <li>The seller will be notified once payment is confirmed</li>
                  <li>You'll receive shipping details via email</li>
                </ul>
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              <p className="text-lg">
                The auction for <span className="font-semibold">"{productTitle}"</span> has ended.
              </p>
              <p>
                Final Selling Price: ${winningBid.toFixed(2)}
              </p>
              <div className="bg-gray-50 p-4 rounded-lg">
                <p className="font-medium mb-2">Don't worry!</p>
                <p>
                  There are many more amazing items waiting for you. Keep participating in our auctions - your perfect item is just around the corner! 
                </p>
                <p className="mt-2">
                  Pro tip: Set up alerts for similar items to never miss an opportunity!
                </p>
              </div>
            </div>
          )}
        </div>

        <div className="flex justify-end space-x-3 mt-6">
          {isWinner ? (
            <>
              <button
                onClick={onClose}
                className="px-4 py-2 rounded bg-gray-200 hover:bg-gray-300"
              >
                Later
              </button>
              <a
                href={checkoutLink}
                className="px-4 py-2 rounded bg-yellow-500 hover:bg-yellow-600 text-white"
              >
                Proceed to Payment
              </a>
            </>
          ) : (
            <>
              <button
                onClick={onClose}
                className="px-4 py-2 rounded bg-gray-200 hover:bg-gray-300"
              >
                Close
              </button>
              <button
                onClick={() => window.location.href = '/auctions-items'}
                className="px-4 py-2 rounded bg-yellow-500 hover:bg-yellow-600 text-white"
              >
                Browse More Auctions
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default AuctionResultModal;
