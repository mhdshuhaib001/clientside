import React, { useEffect, useRef, useState, useCallback } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { io } from 'socket.io-client';
import toast from 'react-hot-toast';
import { RootState } from '../../../store/Store';
import { useGetProductByIdQuery } from '../../../services/apis/productApi';
import { useGetAuctionByIdQuery, usePlaceBidMutation } from '../../../services/apis/auctionApi';
import SellerProfileCard from '../../Seller/SellerProfileCard';
import AuctionSkeleton from '../../commen/Skelton/AuctionSkelton';
import { useAuctionTimer } from '../../../utils/hooks/useAuctionTimer';
import AuctionResultModal from '../../commen/AuctionResultModal';
import { ProductDetails } from './ProductDetails';
import { BiddingLeaderboard } from './BiddingLeaderboard';
import { BiddingControls } from './BiddingControls';
import { Bid } from '../../../interface/userTypes/BidTypes';

export default function RealTimeBidding() {
  const { id } = useParams<{ id: string }>();
  const userData = useSelector((state: RootState) => state.User);
  const userId = userData._id;

  // Queries and state
  const { data, error, isLoading } = useGetProductByIdQuery(id);
  const { data: auctionData } = useGetAuctionByIdQuery(id);
  const [placeBid] = usePlaceBidMutation();

  // State management
  const [auctionStatus, setAuctionStatus] = useState<string>('live');
  const [customBid, setCustomBid] = useState('');
  const [currentBid, setCurrentBid] = useState(0);
  const [bids, setBids] = useState<Bid[]>([]);
  const [quickBids, setQuickBids] = useState<number[]>([]);
  const [isPlacingBid, setIsPlacingBid] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isAuctionEnded, setIsAuctionEnded] = useState(false);
  const [winnerDetails, setWinnerDetails] = useState<{
    winnerId: string;
    winningBid: number;
    productTitle: string;
    checkoutLink: string;
  } | null>(null);

  const socketRef = useRef<any>(null);
  const { productData, sellerData: sellerProfile } = data || {};
  useEffect(() => {
    if (productData?.auctionEndDateTime) {
      const endTime = new Date(productData.auctionEndDateTime).getTime();
      const now = new Date().getTime();
      if (now >= endTime) {
        setIsAuctionEnded(true);
      }
    }
  }, [productData]);
  const handleAuctionEnd = async () => {
    try {
      console.log('auctionEndDate');
      // Call your mutation here
      // await placeBid({
      //   auctionId: id,
      //   // Add any other necessary parameters for the mutation
      // }).unwrap();
      console.log('Auction ended, mutation called successfully.');
    } catch (error) {
      console.error('Failed to call mutation on auction end:', error);
    }
  };
  const { timeLeft, isEnded } = useAuctionTimer({
    endDateTime: productData?.auctionEndDateTime || new Date(),
    onTimeEnd: handleAuctionEnd,
  });

  // Socket Connection Effect
  useEffect(() => {
    const socket = io(import.meta.env.VITE_SERVER_URL, {
      path: '/socket.io',
      withCredentials: true,
      transports: ['websocket', 'polling'],
    });
    socketRef.current = socket;

    socket.on('connect', () => {
      socket.emit('join_auction', id, userId);
    });

    socket.on('new_bid', (newBid: any) => {
      try {
        const updatedBid: Bid = {
          ...newBid,
          time: new Date(),
          avatar: newBid.avatar,
        };
        const updatedBids = [updatedBid, ...bids].sort((a, b) => b.amount - a.amount).slice(0, 5);

        setBids(updatedBids);
        setCurrentBid(updatedBids[0].amount);
      } catch (error) {
        console.log('socket error:', error);
      }
    });

    socket.on('auction_winner', (data) => {
      if (data.winnerId === userId) {
        toast.success('Congratulations! You won the auction!', {
          duration: 5000,
          position: 'top-center',
        });
      } else {
        toast.success(`The auction has ended. Winning bid: $${data.winningBid}`, {
          duration: 5000,
          position: 'top-center',
        });
      }

      setIsAuctionEnded(true);
      setWinnerDetails(data);
      setIsModalOpen(true);
    });

    return () => {
      socket.emit('leave_auction', id, userId);
      socket.disconnect();
    };
  }, [id, userId, bids]);

  // Generate Quick Bids
  const generateQuickBids = useCallback((currentBidValue: number) => {
    const increment = 10;
    return [
      currentBidValue + increment * 1,
      currentBidValue + increment * 2,
      currentBidValue + increment * 3,
      currentBidValue + increment * 4,
    ];
  }, []);

  useEffect(() => {
    if (currentBid > 0) {
      setQuickBids(generateQuickBids(currentBid));
    }
  }, [currentBid, generateQuickBids]);

  useEffect(() => {
    if (productData) {
      const initialBid =
        productData.currentBid > 0 ? productData.currentBid : productData.reservePrice;
      setCurrentBid(initialBid);
      setQuickBids(generateQuickBids(initialBid));
    }
  }, [productData, generateQuickBids]);
  useEffect(() => {
    if (auctionData?.auctionStatus) {
      setAuctionStatus(auctionData.auctionStatus);
    }
  }, [auctionData]);

  useEffect(() => {
    if (Array.isArray(auctionData)) {
      const fetchedBids = auctionData.map((bid: any) => ({
        id: bid.id,
        bidder: bid.bidder,
        amount: bid.amount,
        time: new Date(bid.time),
        avatar: bid.avatar || 'default_avatar_url',
      }));
      const sortedBids = fetchedBids.sort((a, b) => b.amount - a.amount).slice(0, 5);

      setBids(sortedBids);
      if (sortedBids.length > 0) {
        setCurrentBid(sortedBids[0].amount);
      } else {
        setCurrentBid(productData?.reservePrice || 0);
      }
    }
  }, [auctionData, productData]);

  // Bid Handlers
  const handleBid = async (amount: number) => {
    if (!socketRef.current) {
      console.error('Socket is not initialized.');
      return;
    }
    if (userData.role === 'seller') {
      toast.error('You cannot place a bid on your own auction.');
      return;
    }

    if (amount <= currentBid) {
      toast.error('Your bid must be greater than the current bid.');
      return;
    }
    const lastBidAmount = bids.length > 0 ? bids[0].amount : productData.reservePrice;
    const maxAllowedBid = lastBidAmount * 1.5;

    if (amount > maxAllowedBid) {
      toast.error(`Your bid cannot exceed $${maxAllowedBid.toFixed(2)} (50% above the last bid).`);
      return;
    }

    setIsPlacingBid(true);

    try {
      socketRef.current.emit('place_bid', {
        auctionId: id,
        bidder: userData.name,
        amount: amount,
        time: new Date(),
        avatar: userData.profileImage,
      });

      await placeBid({
        auctionId: id,
        bidderId: userId,
        currentBid: currentBid,
        bidAmount: amount,
        time: new Date(),
        sellerId: sellerProfile?.sellerId,
      }).unwrap();

      const updatedBid: Bid = {
        bidder: userData.name,
        amount,
        time: new Date(),
        avatar: userData.profileImage || 'default_avatar',
      };

      const updatedBids = [updatedBid, ...bids].sort((a, b) => b.amount - a.amount);
      setBids(updatedBids);
      setCurrentBid(updatedBids[0].amount);
    } catch (error) {
      console.error('Failed to place bid:', error);
    } finally {
      setIsPlacingBid(false);
    }
  };

  const handleCustomBid = async (e: React.FormEvent) => {
    e.preventDefault();
    const bid = parseFloat(customBid);
    setCustomBid('');

    if (isNaN(bid) || bid <= currentBid) {
      toast.error('Your bid must be a valid number greater than the current bid.');
      return;
    }

    await handleBid(bid);
  };

  if (isLoading) return <AuctionSkeleton />;
  if (error) return <div>Error loading product data.</div>;
  if (!productData) return <div>No product data found.</div>;

  return (
    <>

      <div className="container  mx-auto px-4 py-8 font-serif">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <ProductDetails
            productData={productData}
            currentBid={currentBid}
            timeLeft={timeLeft}
            auctionStatus={auctionStatus}
          />

          <div className="space-y-4">
            <SellerProfileCard
              sellerName={sellerProfile?.companyName}
              profileImage={sellerProfile?.profile}
              id={sellerProfile?.sellerId}
            />

            <BiddingLeaderboard bids={bids} />

            {auctionStatus !== 'sold' && (
              <BiddingControls
                quickBids={quickBids}
                customBid={customBid}
                handleBid={handleBid}
                handleCustomBid={handleCustomBid}
                setCustomBid={setCustomBid}
              />
            )}
          </div>
        </div>

        <AuctionResultModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          isWinner={winnerDetails?.winnerId === userId}
          productTitle={productData?.itemTitle}
          winningBid={winnerDetails?.winningBid || 0}
          checkoutLink={winnerDetails?.checkoutLink || ''}
        />
      </div>
    </>
  );
}
