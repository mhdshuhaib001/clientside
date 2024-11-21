import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Star, MapPin, Phone, Mail, Flag } from 'lucide-react';
import { useParams } from 'react-router-dom';
import { useFetchSellerProfileQuery, useAddReviewMutation } from '../../services/apis/sellerApi';
import { Review } from '../../interface/reviewTypes/review';
import { Seller } from '../../interface/sellerTypes/sellerApiTypes';
import toast from 'react-hot-toast';
import { useSelector } from 'react-redux';
import { RootState } from '../../store/Store';
import SellerProfileSkeleton from '../commen/Skelton/SellerProfileSkelton';
interface Product {
  _id: string;
  itemTitle: string;
  description: string;
  images: string[];
  reservePrice: number;
  auctionEndDateTime?: string;
  currentBid?: number;
  auctionFormat: string;
  categoryId: {
    _id: string;
    name: string;
  };
}

interface APIResponse {
  status: number;
  message: string;
  data: {
    sellerProfile: Seller;
    sellerProducts: Product[];
    sellerReviews: Review[];
  };
}

export default function SellerProfile() {
  const userId = useSelector((state: RootState) => state.User._id);

  const { sellerId } = useParams();
  const [activeTab, setActiveTab] = useState('shop');
  const [newReview, setNewReview] = useState({ rating: 0, comment: '' });
  const [_isReportModalOpen, setIsReportModalOpen] = useState(false);
  const [timeLeft, setTimeLeft] = useState<{
    [key: string]: { days: number; hours: number; minutes: number; seconds: number };
  }>({});
  const [sellerData, setSellerData] = useState<APIResponse['data'] | null>(null);

  const { data: fetchedData, isLoading, error } = useFetchSellerProfileQuery(sellerId ?? '');
  const [addReview] = useAddReviewMutation();
  useEffect(() => {
    if (fetchedData?.data) {
      setSellerData(fetchedData.data);
    }
  }, [fetchedData]);
  useEffect(() => {
    if (!sellerData?.sellerProducts) return;

    const timer = setInterval(() => {
      const now = new Date();
      const newTimeLeft = sellerData.sellerProducts.reduce(
        (acc, product) => {
          if (product.auctionEndDateTime) {
            const endTime = new Date(product.auctionEndDateTime);
            const difference = endTime.getTime() - now.getTime();
            const days = Math.floor(difference / (1000 * 60 * 60 * 24));
            const hours = Math.floor((difference / (1000 * 60 * 60)) % 24);
            const minutes = Math.floor((difference / 1000 / 60) % 60);
            const seconds = Math.floor((difference / 1000) % 60);
            acc[product._id] = { days, hours, minutes, seconds };
          }
          return acc;
        },
        {} as { [key: string]: { days: number; hours: number; minutes: number; seconds: number } },
      );

      setTimeLeft(newTimeLeft);
    }, 1000);

    return () => clearInterval(timer);
  }, [sellerData?.sellerProducts]);
  const handleSubmitReview = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const reviewData = {
        rating: newReview.rating,
        comment: newReview.comment,
        sellerId: sellerId,
        userId: userId,
      };

      await addReview(reviewData);

      toast.success('Review Added');
      setNewReview({ rating: 0, comment: '' });

      console.log(newReview, 'this is the new review');
    } catch (error) {
      console.error('Failed to submit the review: ', error);
    }
  };
  if (isLoading) return <div><SellerProfileSkeleton/></div>;
  if (error) return <div>Error loading seller profile</div>;
  if (!sellerData) return null;

  const { sellerProfile, sellerProducts, sellerReviews } = sellerData;

  return (
    <div className="bg-main-bg min-h-screen">
      <header className="bg-bg-primary shadow-md">
        <div className="max-w-7xl mx-auto px-4 py-6 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="flex items-center mb-4 md:mb-0">
              <img
                src={sellerProfile.profile}
                alt={sellerProfile.companyName}
                className="w-20 h-20 rounded-full object-cover mr-4"
              />
              <div>
                <h1 className="text-3xl font-bold text-gray-900">{sellerProfile.companyName}</h1>
                <p className="text-sm text-gray-600">{sellerProducts.length} items listed</p>
              </div>
            </div>
            <div className="flex flex-col items-end">
              <div className="text-gray-700 mb-2">
                <p className="flex items-center">
                  <Phone className="w-4 h-4 mr-2" /> {sellerProfile.phone}
                </p>
                <p className="flex items-center">
                  <Mail className="w-4 h-4 mr-2" /> {sellerProfile.email}
                </p>
              </div>
              <button
                onClick={() => setIsReportModalOpen(true)}
                className="text-red-600 hover:text-red-800 flex items-center"
              >
                <Flag className="w-4 h-4 mr-1" /> Report Seller
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        {/* Navigation */}
        <nav className="mb-8">
          <ul className="flex justify-center space-x-4 border-b border-gray-200">
            {['Shop', 'About', 'Reviews'].map((tab) => (
              <li key={tab}>
                <button
                  onClick={() => setActiveTab(tab.toLowerCase())}
                  className={`px-4 py-2 text-lg font-medium ${
                    activeTab === tab.toLowerCase()
                      ? 'border-b-2 border-border-accent text-amber-600'
                      : 'text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  {tab}
                </button>
              </li>
            ))}
          </ul>
        </nav>

        {/* Content Sections */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            {activeTab === 'shop' && (
              <section>
                <h2 className="text-2xl font-semibold mb-6 text-center">Current Auctions</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {sellerProducts.map((product) => (
                    <motion.div
                      key={product._id}
                      whileHover={{ scale: 1.03 }}
                      className="bg-white rounded-lg shadow-lg overflow-hidden"
                    >
                      <div className="relative">
                        <img
                          src={product.images[0]}
                          alt={product.itemTitle}
                          className="w-full h-64 object-cover"
                        />
                        <div className="absolute top-2 left-2 bg-red-600 text-white px-2 py-1 rounded-full text-sm font-semibold">
                          {product.auctionFormat === 'auction' ? 'Live Auction' : 'Buy Now'}
                        </div>
                      </div>
                      <div className="p-4">
                        {product.auctionEndDateTime && timeLeft[product._id] && (
                          <div className="flex justify-between items-center mb-2">
                            <div className="text-sm font-semibold text-red-600">
                              {timeLeft[product._id].days}d {timeLeft[product._id].hours}h{' '}
                              {timeLeft[product._id].minutes}m {timeLeft[product._id].seconds}s
                            </div>
                          </div>
                        )}
                        <h3 className="font-semibold text-lg mb-2">{product.itemTitle}</h3>
                        <p className="text-sm text-gray-600 mb-2">{product.categoryId.name}</p>
                        <div className="flex justify-between items-center">
                          <div>
                            <p className="text-sm text-gray-600">
                              {product.auctionFormat === 'auction' ? 'Current Bid' : 'Price'}:
                            </p>
                            <p className="text-xl font-bold">
                              ${(product.currentBid || product.reservePrice).toLocaleString()}
                            </p>
                          </div>
                          <button
                            // onClick={() => handleBidNow(product._id)}
                            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
                          >
                            {product.auctionFormat === 'auction' ? 'Bid Now' : 'Buy Now'}
                          </button>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </section>
            )}

            {activeTab === 'about' && (
              <section className="max-w-2xl mx-auto">
                <div className="bg-amber-50 border-border-accent rounded-lg shadow-lg p-6">
                  <h2 className="text-2xl font-semibold mb-4">About {sellerProfile.companyName}</h2>
                  <p className="text-gray-700 mb-4">{sellerProfile.about}</p>
                  <div className="mt-4 pt-4 border-t border-gray-200">
                    <h3 className="text-xl font-semibold mb-2">Contact Information</h3>
                    <address className="text-gray-700 not-italic">
                      <p className="flex items-center mb-1">
                        <MapPin className="mr-2 text-blue-500" /> {sellerProfile.address}
                      </p>
                      <p className="flex items-center mb-1">
                        <Phone className="mr-2 text-blue-500" /> {sellerProfile.phone}
                      </p>
                      <p className="flex items-center">
                        <Mail className="mr-2 text-blue-500" /> {sellerProfile.email}
                      </p>
                    </address>
                  </div>
                </div>
              </section>
            )}

            {activeTab === 'reviews' && (
              <section className="max-w-3xl mx-auto">
                <h2 className="text-2xl font-semibold mb-6 text-center">Customer Reviews</h2>
                <div className="space-y-6 mb-8">
                  {sellerReviews.length > 0 ? (
                    sellerReviews.map((review) => (
                      <motion.div
                        key={review._id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3 }}
                        className="bg-white rounded-lg shadow-lg p-6 flex items-start space-x-4"
                      >
                        <img
                          src={review.user?.profileImage}
                          alt={review.user?.name || 'User Avatar'} 
                          className="w-16 h-16 rounded-full object-cover"
                        />
                        <div className="flex-1">
                          <div className="flex items-center justify-between mb-2">
                            <h3 className="font-semibold text-lg">
                              {review.user?.name || 'Anonymous'}
                            </h3>{' '}
                            {/* Handle null case */}
                            <StarRating rating={review.rating} />
                          </div>
                          <p className="text-gray-700">{review.comment}</p>
                        </div>
                      </motion.div>
                    ))
                  ) : (
                    <p className="text-center text-gray-600">No reviews yet</p>
                  )}
                </div>

                <form onSubmit={handleSubmitReview} className="bg-white rounded-lg shadow-lg p-6">
                  <h3 className="text-xl font-semibold mb-4">Leave a Review</h3>
                  <div className="mb-4">
                    <label
                      htmlFor="rating"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      Your Rating
                    </label>
                    <StarRating
                      rating={newReview.rating}
                      setRating={(rating) => setNewReview((prev) => ({ ...prev, rating }))}
                    />
                  </div>
                  <div className="mb-4">
                    <label
                      htmlFor="comment"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      Your Review
                    </label>
                    <textarea
                      id="comment"
                      rows={4}
                      value={newReview.comment}
                      onChange={(e) =>
                        setNewReview((prev) => ({ ...prev, comment: e.target.value }))
                      }
                      className="w-full px-3 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-amb-500"
                      placeholder="Share your thoughts on your vintage purchase..."
                    ></textarea>
                  </div>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    type="submit"
                    className="w-full px-4 py-2 bg-amber-600 text-white rounded-md hover:bg-amber-700 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:ring-opacity-50 transition-colors"
                  >
                    Submit Review
                  </motion.button>
                </form>
              </section>
            )}
          </motion.div>
        </AnimatePresence>
      </main>

      {/* Report Seller Modal remains the same */}
      {/* ... */}
    </div>
  );
}

// StarRating component remains the same
const StarRating = ({
  rating,
  setRating,
}: {
  rating: number;
  setRating?: (rating: number) => void;
}) => {
  return (
    <div className="flex">
      {[1, 2, 3, 4, 5].map((star) => (
        <Star
          key={star}
          className={`w-6 h-6 ${setRating ? 'cursor-pointer' : ''} ${
            star <= rating ? 'text-yellow-500 fill-yellow-500' : 'text-gray-300'
          }`}
          onClick={() => setRating && setRating(star)}
        />
      ))}
    </div>
  );
};
