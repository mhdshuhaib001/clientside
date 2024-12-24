import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronLeft, ChevronRight } from 'lucide-react';

// Dummy data for related products (expanded to show pagination)
const relatedProductsData = [
  {
    _id: 'related1',
    itemTitle: 'Vintage Leather Briefcase',
    images: ['/images/briefcase1.jpg'],
    reservePrice: 250,
    auctionFormat: 'auction',
    currentBid: 180,
    condition: 'Like New',
  },
  {
    _id: 'related2',
    itemTitle: 'Antique Brass Telescope',
    images: ['/images/telescope1.jpg'],
    reservePrice: 350,
    auctionFormat: 'buy-it-now',
    condition: 'Excellent',
  },
  {
    _id: 'related3',
    itemTitle: 'Rare Collectible Watch',
    images: ['/images/watch1.jpg'],
    reservePrice: 500,
    auctionFormat: 'auction',
    currentBid: 420,
    condition: 'Vintage',
  },
  {
    _id: 'related4',
    itemTitle: 'Handcrafted Wooden Chess Set',
    images: ['/images/chess1.jpg'],
    reservePrice: 180,
    auctionFormat: 'auction',
    currentBid: 135,
    condition: 'Very Good',
  },
  {
    _id: 'related5',
    itemTitle: 'Classic Vinyl Record Player',
    images: ['/images/recordplayer1.jpg'],
    reservePrice: 300,
    auctionFormat: 'auction',
    currentBid: 250,
    condition: 'Good',
  },
  {
    _id: 'related6',
    itemTitle: 'Vintage Camera Collection',
    images: ['/images/camera1.jpg'],
    reservePrice: 450,
    auctionFormat: 'buy-it-now',
    condition: 'Collector\'s Item',
  },
  {
    _id: 'related7',
    itemTitle: 'Antique Map Collection',
    images: ['/images/maps1.jpg'],
    reservePrice: 200,
    auctionFormat: 'auction',
    currentBid: 160,
    condition: 'Historical Preservation',
  },
  {
    _id: 'related8',
    itemTitle: 'Rare First Edition Books',
    images: ['/images/books1.jpg'],
    reservePrice: 600,
    auctionFormat: 'auction',
    currentBid: 520,
    condition: 'Mint Condition',
  }
];

interface RelatedProductCardProps {
  product: typeof relatedProductsData[0];
}

const RelatedProductCard: React.FC<RelatedProductCardProps> = ({ product }) => {
  const navigate = useNavigate();

  return (
    <div 
      onClick={() => navigate(`/product/${product._id}`)}
      className="border rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 cursor-pointer"
    >
      <div className="h-48 overflow-hidden">
        <img 
          src={product.images[0]} 
          alt={product.itemTitle} 
          className="w-full h-full object-cover hover:scale-110 transition-transform duration-300"
        />
      </div>
      <div className="p-4">
        <h3 className="font-semibold text-lg mb-2 truncate">{product.itemTitle}</h3>
        <div className="flex justify-between items-center">
          <span className="text-brown-800 font-bold">${product.reservePrice}</span>
          {product.auctionFormat === 'auction' && product.currentBid && (
            <span className="text-green-600 text-sm">
              Current Bid: ${product.currentBid}
            </span>
          )}
        </div>
        <div className="text-sm text-gray-500 mt-2">
          Condition: {product.condition}
        </div>
        <div className="mt-4">
          <span className={`
            px-2 py-1 rounded text-xs font-semibold 
            ${product.auctionFormat === 'auction' ? 'bg-amber-100 text-amber-800' : 'bg-green-100 text-green-800'}
          `}>
            {product.auctionFormat === 'auction' ? 'Auction' : 'Buy Now'}
          </span>
        </div>
      </div>
    </div>
  );
};

export const RelatedProducts: React.FC = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 4;

  // Calculate pagination
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = relatedProductsData.slice(indexOfFirstProduct, indexOfLastProduct);

  // Calculate total pages
  const totalPages = Math.ceil(relatedProductsData.length / productsPerPage);

  // Change page
  const goToPreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const goToNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold">Related Products</h2>
        <div className="flex space-x-2">
          <button 
            onClick={goToPreviousPage} 
            disabled={currentPage === 1}
            className="p-2 bg-gray-200 rounded-full disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-300 transition duration-300"
          >
            <ChevronLeft />
          </button>
          <button 
            onClick={goToNextPage} 
            disabled={currentPage === totalPages}
            className="p-2 bg-gray-200 rounded-full disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-300 transition duration-300"
          >
            <ChevronRight />
          </button>
        </div>
      </div>
      
      {/* Products Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {currentProducts.map(product => (
          <RelatedProductCard key={product._id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default RelatedProducts;