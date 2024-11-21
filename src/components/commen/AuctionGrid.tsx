import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Filter} from 'lucide-react';
import { useProductsData } from '../../utils/hooks/useProductsData';
import AuctionItem from '../User/AuctionItemComponent';
import { ProductType } from '../../interface/productTypes/productType';
import AuctionItemSkeleton from './Skelton/AuctionItemSkelton';
import Pagination from './Pagination';
import useDebounce from '../../utils/hooks/useDebounce';
interface AuctionItem {
  _id: string;
  itemTitle: string;
  description: string;
  condition: string;
  images: string[];
  auctionFormat: string;
  auctionStartDateTime: string;
  auctionEndDateTime: string;
  reservePrice: number;
  shippingType: string;
  shippingCost: number;
  handlingTime: string;
  sold: boolean;
  category: string;
  finalBidAmount: number | null;
}

export default function Component() {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const [searchTerm, setSearchTerm] = useState('');
  const [priceRange, setPriceRange] = useState([0, 10000]);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [filteredItems, setFilteredItems] = useState<ProductType[]>([]);
  const [showFilters, setShowFilters] = useState(false);
  const [statusFilter, setStatusFilter] = useState<string[]>([]);
  const debouncedSearchTerm = useDebounce(searchTerm, 300);
  const { products, isLoading } = useProductsData(currentPage, itemsPerPage);

  const categories = Array.from(new Set(products.map((item) => item.categoryId.name)));
  const handlePageChange = (page: React.SetStateAction<number>) => {
    setCurrentPage(page);
  };

  function getAuctionStatus(item: ProductType): 'live' | 'upcoming' | 'end' | 'sold' {
    const now = new Date().getTime();
    const startTime = item.auctionStartDateTime
      ? new Date(item.auctionStartDateTime).getTime()
      : Infinity;
    const endTime =
      item.auctionEndDateTime && item.auctionEndDateTime !== 'null'
        ? new Date(item.auctionEndDateTime).getTime()
        : 0;

    if (item.sold) return 'sold';
    if (now < startTime) return 'upcoming';
    if (now >= startTime && now <= endTime) return 'live';
    return 'end';
  }

  useEffect(() => {
    if (products.length > 0) {
      const filtered = products.filter(
        (item) =>
          item.itemTitle.toLowerCase().includes(searchTerm.toLowerCase()) &&
          ((parseFloat(item.reservePrice) >= priceRange[0] &&
            parseFloat(item.reservePrice) <= priceRange[1]) ||
            (item.currentBid &&
              parseFloat(item.currentBid.toString()) >= priceRange[0] &&
              parseFloat(item.currentBid.toString()) <= priceRange[1])) &&
          (statusFilter.length === 0 || statusFilter.includes(getAuctionStatus(item))) &&
          (selectedCategories.length === 0 || selectedCategories.includes(item.categoryId.name)),
      );
      setFilteredItems(filtered);
    }
  }, [debouncedSearchTerm, searchTerm, priceRange, selectedCategories, statusFilter, products]);

  // const featuredItems = filteredItems.filter((item) => item.featured);
  const totalPages = Math.ceil(products.length / itemsPerPage);
  // const displayedProducts = products.slice(
  //   (currentPage - 1) * itemsPerPage,
  //   currentPage * itemsPerPage,
  // );

  return (
    <div className="container mx-auto px-4 py-8 bg-gradient-to-br from-amber-50 to-amber-100 font-serif">
      <motion.h1
        className="text-4xl font-bold text-amber-800 mb-8 text-center"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        Antique Treasures Auction
      </motion.h1>
      <div className="mb-6">
        <div className="relative max-w-md mx-auto">
          <Search className="absolute left-3 top-3 h-5 w-5 text-amber-800" />
          <motion.input
            type="text"
            placeholder="Search auctions..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border-2 border-[#C4A484] rounded-full focus:outline-none focus:ring-2 focus:ring-[#8C7A6B] bg-[#FFF8F0] text-[#4A3728] placeholder-[#8C7A6B]"
            whileFocus={{ scale: 1.05 }}
            transition={{ type: 'spring', stiffness: 300 }}
          />
        </div>
      </div>
      <div className="flex flex-col md:flex-row gap-8">
        <motion.aside
          className="md:w-1/4"
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="bg-amber-50 p-6 rounded-lg shadow-md border-2 border-amber-300 md:sticky md:top-4">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-semibold text-amber-800">Filters</h2>
              <button
                onClick={() => setShowFilters(!showFilters)}
                className="md:hidden flex items-center text-amber-500 hover:text-amber-800"
              >
                <Filter className="h-5 w-5 mr-1" />
                {showFilters ? 'Hide' : 'Show'}
              </button>
            </div>
            <AnimatePresence>
              {(showFilters || window.innerWidth >= 768) && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.3 }}
                  className="space-y-6"
                >
                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-amber-900">Price Range</label>
                    <motion.input
                      type="range"
                      min="0"
                      max="10000"
                      step="100"
                      value={priceRange[1]}
                      onChange={(e) => setPriceRange([0, parseInt(e.target.value)])}
                      className="w-full accent-[#8C7A6B]"
                      whileHover={{ scale: 1.05 }}
                      transition={{ type: 'spring', stiffness: 300 }}
                    />
                    <div className="flex justify-between text-sm text-[#6B5744]">
                      <span>${priceRange[0]}</span>
                      <span>${priceRange[1]}</span>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-[#4A3728]">Categories</label>
                    {categories.map((category) => (
                      <motion.div
                        key={category}
                        className="flex items-center space-x-2"
                        whileHover={{ scale: 1.05 }}
                        transition={{ type: 'spring', stiffness: 300 }}
                      >
                        <input
                          type="checkbox"
                          id={category}
                          checked={selectedCategories.includes(category)}
                          onChange={(e) => {
                            setSelectedCategories(
                              e.target.checked
                                ? [...selectedCategories, category]
                                : selectedCategories.filter((c) => c !== category),
                            );
                          }}
                          className="rounded text-[#8C7A6B] focus:ring-amber-400 border-amber-400"
                        />
                        <label htmlFor={category} className="text-sm text-amber-900">
                          {category}
                        </label>
                      </motion.div>
                    ))}
                  </div>
                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-amber-900">Status</label>
                    {['live', 'upcoming', 'sold'].map((status) => (
                      <motion.div
                        key={status}
                        className="flex items-center space-x-2"
                        whileHover={{ scale: 1.05 }}
                        transition={{ type: 'spring', stiffness: 300 }}
                      >
                        <input
                          type="checkbox"
                          id={status}
                          checked={statusFilter.includes(status)}
                          onChange={(e) => {
                            setStatusFilter(
                              e.target.checked
                                ? [...statusFilter, status]
                                : statusFilter.filter((s) => s !== status),
                            );
                          }}
                          className="rounded text-amber-900 focus:ring-amber-500 border-amber-400"
                        />
                        <label htmlFor={status} className="text-sm text-amber-900 capitalize">
                          {status === 'upcoming' ? 'Coming Soon' : status}
                        </label>
                      </motion.div>
                    ))}
                  </div>
                  <motion.button
                    onClick={() => {
                      setPriceRange([0, 10000]);
                      setSelectedCategories([]);
                      setStatusFilter([]);
                    }}
                    className="w-full bg-amber-600 text-[#FFF8F0] py-2 px-4 rounded-full hover:bg-amber-700 transition-colors"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    Reset Filters
                  </motion.button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.aside>
        <main className="md:w-3/4">
          <div className="flex justify-between items-center mb-6">
            <p className="text-sm text-[#6B5744]">
              Showing {filteredItems.length} of {products.length} Results
            </p>
          </div>
          {/* {featuredItems.length > 0 && (
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-[#4A3728] mb-4">Featured Items</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {featuredItems.map((item) => (
                  <AuctionItemCard key={item.id} item={item} />
                ))}
              </div>
            </div>
          )} */}
          <motion.div
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, staggerChildren: 0.1 }}
          >
            {isLoading
              ? [...Array(6)].map((_, index) => <AuctionItemSkeleton key={index} />)
              : filteredItems.map((item) => (
                  <AuctionItem
                    key={item._id}
                    product={{
                      id: item._id || '',
                      name: item.itemTitle,
                      imageUrl: item.images[0],
                      currentBid: item.currentBid ? item.currentBid : parseFloat(item.reservePrice),
                    }}
                    auctionEndTime={item.auctionEndDateTime}
                    auctionStartTime={item.auctionStartDateTime}
                    status={getAuctionStatus(item)}
                    auctionFormat={item.auctionFormat}
                  />
                ))}
          </motion.div>
          <div className="mt-8 ">
            {/* <nav className="inline-flex rounded-full shadow-sm" aria-label="Pagination">
              {Array.from({ length: totalPages }, (_, index) => index + 1).map((page) => (
                <motion.button
                  key={page}
                  className={`px-4 py-2 border-2 border-[#C4A484] bg-[#FFF8F0] text-sm font-medium text-[#4A3728] ${page === currentPage ? 'bg-amber-600 text-white' : ''}`}
                  onClick={() => handlePageChange(page)}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  {page}
                </motion.button>
              ))}
            </nav> */}

            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={handlePageChange}
            />
          </div>
        </main>
      </div>
    </div>
  );
}
