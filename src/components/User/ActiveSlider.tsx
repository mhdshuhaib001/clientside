import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/free-mode';
import { FreeMode, Pagination, Autoplay } from 'swiper/modules';
import AuctionItem from './AuctionItemComponent';
import AuctionItemSkeleton from '../commen/Skelton/AuctionItemSkelton';
import { ProductType } from '../../interface/productTypes/productType';

interface ProductSliderProps {
  products: ProductType[];
  isLoading?: boolean;
}

const ProductSlider: React.FC<ProductSliderProps> = ({ products, isLoading }) => {
  const limitedProducts = Array.isArray(products) ? products.slice(0, 9) : [];

  return (
    <div className="relative">
      <Swiper
        breakpoints={{
          340: {
            slidesPerView: 1,
            spaceBetween: 15,
          },
          700: {
            slidesPerView: 2,
            spaceBetween: 15,
          },
          1024: {
            slidesPerView: 3,
            spaceBetween: 20,
          },
        }}
        pagination={{
          clickable: true,
          el: '.swiper-pagination-custom',
        }}
        modules={[FreeMode, Pagination, Autoplay]}
        className="max-w-[90%] lg:max-w-[80%] mx-auto"
      >
        {isLoading ? (
          [...Array(3)].map((_, index) => (
            <SwiperSlide key={`skeleton-${index}`}>
              <AuctionItemSkeleton />
            </SwiperSlide>
          ))
        ) : limitedProducts.length > 0 ? (
          limitedProducts.map((product) => (
            <SwiperSlide key={product._id}>
              <AuctionItem
                product={{
                  id: product._id ?? '',
                  imageUrl:
                    typeof product.images?.[0] === 'string'
                      ? product.images?.[0]
                      : '/placeholder-image.jpg',
                  name: product.itemTitle ?? 'No Name',
                  currentBid: Number(product.reservePrice) || 0,
                  auctionStatus: product.auctionStatus,
                }}
                auctionEndTime={product.auctionEndDateTime}
                auctionFormat={product.auctionFormat}
              />
            </SwiperSlide>
          ))
        ) : (
          <SwiperSlide>
            <p>No products available.</p>
          </SwiperSlide>
        )}
      </Swiper>

      {/* Custom Pagination Container */}
      <div className="swiper-pagination-custom flex justify-center space-x-2 mt-4">
        <span className="swiper-pagination-bullet w-3 h-3 bg-orange-500 rounded-full"></span>
        <span className="swiper-pagination-bullet w-3 h-3 bg-orange-500 rounded-full"></span>
        <span className="swiper-pagination-bullet w-3 h-3 bg-orange-500 rounded-full"></span>
      </div>
    </div>
  );
};

export default ProductSlider;
