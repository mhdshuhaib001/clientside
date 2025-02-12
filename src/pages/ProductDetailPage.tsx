import { useEffect, useState } from 'react';
import Header from '../components/User/Header';
import { useParams } from 'react-router-dom';
import { useGetProductByIdQuery } from '../services/apis/productApi';
import { useSubscribeNotificationMutation } from '../services/apis/adminApi';
import { generateToken } from '../services/notifications/firebase';
import { useSelector } from 'react-redux';
import { RootState } from '../store/Store';
import NotificationMethodSelector from '../components/User/NotificationMethodComponent';
import { Seller } from '../interface/sellerTypes/sellerApiTypes';
import { ProductType } from '../interface/productTypes/productType';
import toast from 'react-hot-toast';
import Footer from '../components/User/Footer';
import SellerProfileCard from '../components/Seller/SellerProfileCard';
import RelatedProducts from '../components/commen/RelatedProducts';
import { useNavigate } from 'react-router-dom';
import { Package } from 'lucide-react';
// import ImageGallerySkeleton from '../components/commen/Skelton/ImageSkelton'
import ProductPageSkeleton from '../components/commen/Skelton/ProductPageSkelton';
type ProductImage = {
  src: string;
  alt: string;
};

export default function ProductPage() {
  const userId = useSelector((state: RootState) => state.User._id);

  const [mainImage, setMainImage] = useState<ProductImage | null>(null);
  const [timeLeft, setTimeLeft] = useState<number>(0);
  const [showNotificationModal, setShowNotificationModal] = useState<boolean>(false);
  // const [selectedMethod, setSelectedMethod] = useState<string | null>(null);
  const [sellerData, setSellerData] = useState<Seller | null>(null);
  const [productData, setProductData] = useState<ProductType | null>(null);
  const [subscribeNotification] = useSubscribeNotificationMutation();
  const { id } = useParams<{ id: string }>();
  const { data, error: apiError, isLoading } = useGetProductByIdQuery(id);
  const navigate = useNavigate();
  const [showFullDetails, setShowFullDetails] = useState(false);
  const [imagesLoaded, setImagesLoaded] = useState(false);

  useEffect(() => {
    if (data) {
      setProductData(data.productData);
      setSellerData(data.sellerData);
    } else if (apiError) {
      console.log('Error fetching product data. Please try again.');
    }
  }, [data, apiError]);
  useEffect(() => {
    if (productData) {
      const auctionStartDate = new Date(productData.auctionStartDateTime || Date.now());
      const auctionEndDate = new Date(productData.auctionEndDateTime || Date.now());

      const updateTimeLeft = () => {
        const currentTime = Date.now();

        if (currentTime < auctionStartDate.getTime()) {
          setTimeLeft(auctionStartDate.getTime() - currentTime);
        } else if (currentTime < auctionEndDate.getTime()) {
          setTimeLeft(auctionEndDate.getTime() - currentTime);
        } else {
          setTimeLeft(0);
        }
      };

      updateTimeLeft();
      let intervalId: NodeJS.Timeout | undefined;
      if (Date.now() >= auctionStartDate.getTime()) {
        intervalId = setInterval(updateTimeLeft, 1000);
      }

      return () => {
        if (intervalId) clearInterval(intervalId);
      };
    }
  }, [productData]);

  useEffect(() => {
    if (productData?.images?.length) {
      const mainImageSrc = productData.images[0];
      const img = new Image();
      img.src = mainImageSrc;
      img.onload = () => {
        setMainImage({ src: mainImageSrc, alt: 'Main product image' });
        setImagesLoaded(true);
      };
      img.onerror = () => {
        setImagesLoaded(true);
      };
    } else {
      setImagesLoaded(true);
    }
  }, [productData]);

  // Calculate the time left
  const auctionStartDate = new Date(productData?.auctionStartDateTime || Date.now());
  const auctionEndDate = new Date(productData?.auctionEndDateTime || Date.now());
  const isAuctionStarted = Date.now() >= auctionStartDate.getTime();
  const auctionStatus = productData?.auctionStatus;

  const daysLeft = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
  const hoursLeft = Math.floor((timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutesLeft = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
  const secondsLeft = Math.floor((timeLeft % (1000 * 60)) / 1000);

  // const isAuctionEnded = Date.now() > auctionEndDate.getTime();

  const handleSelectMethod = (method: string, notificationData: any) => {
    // setSelectedMethod(method);
    setShowNotificationModal(false);
    handleNotifyMe(productData?._id || '', userId, method, notificationData);
  };

  const handleNotifyMe = async (
    auctionId: string,
    userId: string,
    method: string,
    notificationData: any,
  ) => {
    try {
      const { countryCode, phoneNumber, email } = notificationData;
      let fcmToken = null;
      if (method === 'Notification') {
        fcmToken = await generateToken();
        console.log(method, fcmToken);

        await subscribeNotification({ auctionId, userId, fcmToken });
        setShowNotificationModal(false);
      } else if (method === 'WhatsApp' && phoneNumber) {
        await subscribeNotification({ auctionId, userId, countryCode, phoneNumber });
      } else if (method === 'Email' && email) {
        await subscribeNotification({ auctionId, userId, email });
      }
      toast.success('auction Notification Send');
    } catch (error) {
      console.error('Error subscribing to notification:', error);
    }
  };

  function handleBuyNow(): void {
    if (productData) {
      navigate(`/checkout/${productData._id}`);
    }
  }

  // if (isLoading || !imagesLoaded) {
  //   return (
  //     <>
  //       <Header />
  //       <div className="container mx-auto px-4 py-8 bg-main-bg">
  //         <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
  //           <ImageGallerySkeleton />
  //             <div className="space-y-4 animate-pulse">
  //             <div className="h-10 bg-gray-300 rounded w-3/4"></div>
  //             <div className="h-20 bg-gray-300 rounded"></div>
  //             <div className="h-12 bg-gray-300 rounded w-1/2"></div>
  //           </div>
  //         </div>
  //       </div>
  //       <Footer />
  //     </>
  //   );
  // }

  if (isLoading || !imagesLoaded) {
    return <ProductPageSkeleton />;
  }

  return (
    <>
      <Header />
      <div className="container mx-auto px-4 py-8 bg-main-bg">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Image Gallery */}
          <div className="flex space-x-4">
            {/* Left side with preview images */}
            <div className="flex flex-col space-y-2 ">
              {productData?.images?.length ? (
                productData.images.map((image: any, index: number) => (
                  <button
                    key={index}
                    onClick={() => setMainImage({ src: image, alt: `Thumbnail ${index + 1}` })}
                    className={`relative overflow-hidden rounded-lg transition-transform duration-300 transform hover:scale-105 ${
                      mainImage?.src === image ? 'border-2 border-amber-500' : ''
                    }`}
                  >
                    <img
                      src={image}
                      alt={`Thumbnail ${index + 1}`}
                      className="rounded-lg object-cover w-full h-24"
                    />
                  </button>
                ))
              ) : (
                <div>No images available</div>
              )}
            </div>

            {mainImage && (
              <div
                className="relative flex-1 flex justify-center items-center"
                style={{ height: '500px' }}
              >
                <img
                  src={mainImage.src}
                  alt={mainImage.alt}
                  className="rounded-lg max-h-full max-w-full transition-transform duration-300 transform hover:scale-105"
                />
              </div>
            )}
          </div>

          {/* Product Details */}
          <div className="space-y-4">
            <h1 className="text-3xl font-bold">{productData?.itemTitle || 'Product Title'}</h1>
            <SellerProfileCard
              id={sellerData?.sellerId}
              sellerName={sellerData?.companyName}
              profileImage={sellerData?.profile}
            />
            <div className="flex items-baseline justify-between">
              <div className="text-3xl font-bold text-brown-800">
                ${productData?.reservePrice || 'Price'}
              </div>
              {productData?.currentBid ? (
                <div className="text-xl text-green-600 font-semibold">
                  Current Bid: ${productData.currentBid}
                </div>
              ) : (
                <div className="text-xl text-gray-500 italic">No current bids</div>
              )}
            </div>
            {productData?.auctionFormat !== 'buy-it-now' && (
              <>
                {!['sold', 'ended', 'unsold'].includes(auctionStatus || '') && (
                  <div className="bg-white p-4 rounded-lg">
                    {auctionStatus === 'upcoming' ? (
                      <div className="bg-amber-50 p-6 rounded-lg shadow-lg border border-amber-400">
                        <div className="space-y-3 text-center">
                          <div>
                            <span className="font-semibold">Auction Start Time:</span>{' '}
                            {auctionStartDate.toLocaleString()}
                          </div>
                          <div>
                            <span className="font-semibold">Auction End Time:</span>{' '}
                            {auctionEndDate.toLocaleString()}
                          </div>
                        </div>
                      </div>
                    ) : isAuctionStarted ? (
                      <div className="bg-yellow-50 p-6 rounded-lg shadow-lg border border-amber-400">
                        <h2 className="text-2xl font-serif text-center mb-4 text-brown-800">
                          Time Left
                        </h2>
                        <div className="flex justify-around">
                          <div className="text-center">
                            <div className="text-4xl font-bold text-brown-600">{daysLeft}</div>
                            <div className="text-sm text-gray-600">Days</div>
                          </div>
                          <div className="text-center">
                            <div className="text-4xl font-bold text-brown-600">{hoursLeft}</div>
                            <div className="text-sm text-gray-600">Hours</div>
                          </div>
                          <div className="text-center">
                            <div className="text-4xl font-bold text-brown-600">{minutesLeft}</div>
                            <div className="text-sm text-gray-600">Minutes</div>
                          </div>
                          <div className="text-center">
                            <div className="text-4xl font-bold text-brown-600">{secondsLeft}</div>
                            <div className="text-sm text-gray-600">Seconds</div>
                          </div>
                        </div>
                      </div>
                    ) : (
                      <div className="text-lg font-semibold text-center">
                        Auction starts on:{' '}
                        <span className="font-bold">{auctionStartDate.toLocaleString()}</span>
                      </div>
                    )}
                  </div>
                )}
                {auctionStatus === 'unsold' && (
                  <div className="flex items-center p-4 bg-gray-100 border border-gray-400 text-gray-700 rounded-lg">
                    <Package className="mr-2" size={24} />
                    <div>
                      <h3 className="font-bold">Auction Completed</h3>
                      <p>This item did not meet the reserve price and was not sold.</p>
                      {productData?.auctionEndDateTime && (
                        <p className="text-sm mt-1">
                          Auction ended on:{' '}
                          {new Date(productData.auctionEndDateTime).toLocaleString()}
                        </p>
                      )}
                    </div>
                  </div>
                )}{' '}
              </>
            )}
            <div className="space-y-2">
              {productData?.auctionFormat === 'buy-it-now' ? (
                <button
                  onClick={handleBuyNow}
                  className="w-full bg-amber-600 text-white py-2 rounded hover:bg-amber-700 transition duration-300"
                >
                  Buy Now
                </button>
              ) : ['sold', 'ended', 'unsold'].includes(auctionStatus || '') ? (
                <div className="flex items-center p-4 bg-red-100 border border-amber-400 text-red-700 rounded-lg">
                  <Package className="mr-2" size={24} />
                  <div>
                    <h3 className="font-bold">Auction Ended</h3>
                    <p>
                      {auctionStatus === 'sold'
                        ? 'The item has been sold.'
                        : auctionStatus === 'ended'
                          ? 'This auction has ended.'
                          : 'This item did not meet the reserve price and was not sold.'}
                    </p>
                    {productData?.auctionEndDateTime && (
                      <p className="text-sm mt-1">
                        Ended on: {new Date(productData.auctionEndDateTime).toLocaleString()}
                      </p>
                    )}
                  </div>
                </div>
              ) : !isAuctionStarted ? (
                <button
                  onClick={() => setShowNotificationModal(true)}
                  className="w-full bg-amber-600 border-amber-300 text-white py-2 rounded hover:bg-amber-700 transition duration-300"
                >
                  Notify Me When Auction Starts
                </button>
              ) : auctionStatus === 'live' ? (
                <button
                  onClick={() => navigate(`/auction-page/${productData?._id}`)}
                  className="w-full bg-amber-800 border-amber-300 text-white py-2 rounded hover:bg-amber-700 transition duration-300"
                >
                  Enter To Bid
                </button>
              ) : null}
              {showNotificationModal && (
                <NotificationMethodSelector
                  isOpen={showNotificationModal}
                  onClose={() => setShowNotificationModal(false)}
                  onSelectMethod={handleSelectMethod}
                />
              )}
            </div>

            <div className="space-y-4">
              <h2 className="text-lg font-semibold">Shipping :</h2>
              <p>{productData?.shippingType || 'Standard'}</p>
              <p>
                {productData?.returnPolicy || '10 days returns. Buyer pays for return shipping'}
              </p>

              <h2 className="text-lg font-semibold">Details:</h2>
              <p className="text-gray-600">
                {showFullDetails
                  ? `${productData?.description || 'No description available.'} 
                     Condition: ${productData?.condition || 'No condition information available.'}`
                  : `${productData?.description?.substring(0, 100) || 'No description available.'} 
                     Condition: ${productData?.condition?.substring(0, 100) || 'No condition information available.'}...`}
              </p>
              <button
                onClick={() => setShowFullDetails(!showFullDetails)}
                className="text-gray-500 hover:underline"
              >
                {showFullDetails ? 'Show Less' : 'Show More'}
              </button>
            </div>
            <div className="flex justify-between items-center border-t border-b py-2">
              <span className="font-semibold">Guaranteed Safe Checkout</span>
              <div className="flex space-x-2">
                <img src="/svg/icons/stripe.svg" alt="Visa" width={50} height={30} />
                <img src="/svg/icons/mastercard.svg" alt="Mastercard" width={50} height={30} />
                <img src="/svg/icons/paypal.svg" alt="PayPal" width={50} height={30} />
              </div>
            </div>
          </div>
          {/* public\Logos\visa-logo.png */}
        </div>

        {/* Tab Navigation */}
        {/* <div className="mt-8">
          <div className="border-b">
            <nav className="flex space-x-8 justify-center">
              {['Description', 'Condition'].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab.toLowerCase().split(' ')[0])}
                  className={`py-4 border-b-2 font-medium ${
                    activeTab === tab.toLowerCase().split(' ')[0]
                      ? 'border-blue-600 text-blue-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  {tab}
                </button>
              ))}
            </nav>
          </div>
          <div className="mt-8">
            {activeTab === 'description' && (
              <div>
                <h2 className="text-2xl font-bold mb-4">Product Description</h2>
                <p className="text-gray-600">
                  {productData?.description || 'No description available.'}
                </p>
              </div>
            )}
            {activeTab === 'condition' && (
              <div>
                <h2 className="text-2xl font-bold mb-4">Additional Information</h2>
                <p className="text-gray-600">{productData?.condition}</p>
              </div>
            )}
          </div>
        </div> */}
        {/* <RelatedProducts /> */}
      </div>
      <Footer />
    </>
  );
}
