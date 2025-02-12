
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Pencil, Trash2 } from 'lucide-react';
import { useSelector } from 'react-redux';
import { RootState } from '../../store/Store';
import toast from 'react-hot-toast';
import { useFetchProductsQuery, useDeleteProductMutation } from '../../services/apis/sellerApi';
import ProductDetailsModal from '../commen/ProductDetailModal';

const ProductListTable: React.FC = () => {
  const sellerId = useSelector((state: RootState) => state.Seller.sellerId);
  const [currentPage, setCurrentPage] = useState(1);
  const pageLimit = 10;
  const { data: productData, refetch } = useFetchProductsQuery({
    sellerId,
    page: currentPage,
    limit: pageLimit,
  });
  
  useEffect(() => {
    refetch();
  }, [refetch]);
  
useEffect(() => {
  console.log('Current Page:', currentPage);
  console.log('Product Data:', productData);
}, [currentPage, productData]);
console.log(productData,'this is the productData')
  const [deleteProduct] = useDeleteProductMutation();
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<any>(null);

  const handleImageClick = (product: any) => {
    setSelectedProduct(product);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedProduct(null);
  };

  useEffect(() => {
    refetch();
  }, [refetch]);

  const handleDelete = async (productId: string) => {
    try {
      await deleteProduct(productId).unwrap();
      refetch();
      toast.success(`Product deleted successfully`);
    } catch (error) {
      toast.error('Failed to delete the product. Please try again.');
      console.error('Failed to delete the product:', error);
    }
  };

  return (
    <div className="container mx-auto p-6 bg-amber-50 min-h-screen">
      <div className="flex flex-col sm:flex-row justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-amber-900 mb-4 sm:mb-0">All Product List</h1>
        <button
          onClick={() => navigate('/profile/seller/addproduct')}
          className="bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-500 hover:to-amber-600 text-white font-bold py-2 px-4 rounded transition duration-300 w-full sm:w-auto"
        >
          Add Product
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {productData?.products?.length ? (
          productData.products.map((product) => (
            <div
              key={product._id}
              className="bg-white shadow-lg rounded-lg p-4 transition-transform transform hover:scale-105 hover:shadow-xl"
            >
              {product.auctionStatus === 'relisted' && (
                <div className="absolute top-2 right-2 bg-orange-500 text-white text-xs font-bold px-2 py-1 rounded">
                  Relisted
                </div>
              )}
              <div className="flex items-center mb-4">
                <img
                  src={product.images[0]}
                  alt={product.itemTitle}
                  className="w-16 h-16 object-cover rounded-full mr-4 cursor-pointer"
                  onClick={() => handleImageClick(product)}
                />
                <h2 className="text-lg font-semibold text-amber-900">{product.itemTitle}</h2>
              </div>
              <p className="text-sm text-gray-600">
                <strong>Bid Price:</strong> ${product.reservePrice}
              </p>
              <p className="text-sm text-gray-600">
                <strong>Category:</strong> {product.category.name}
              </p>
              <p className="text-sm text-gray-600">
                <strong>Auction Format:</strong>{' '}
                {product.auctionFormat === 'auction' ? 'Live Auction' : 'Fixed Price'}
              </p>
              <p className="text-sm text-gray-600">
                <strong>Auction Status:</strong> {product.auctionStatus}
              </p>
              <p className="text-sm text-gray-600">
                <strong>Auction Time:</strong>{' '}
                {product.auctionStartDateTime
                  ? `Start: ${new Date(product.auctionStartDateTime).toLocaleString()}`
                  : 'No Auction'}
              </p>
              <div className="flex justify-between mt-4">
                <button
                  onClick={() => navigate(`/profile/seller/addproduct/${product._id}`)}
                  className="text-blue-500 hover:text-blue-700 transition duration-300"
                  aria-label="Edit"
                  title="Edit Product"
                >
                  <Pencil size={24} />
                </button>
                <button
                  onClick={() => handleDelete(product._id ?? '')}
                  className="text-red-500 hover:text-red-700 transition duration-300"
                  aria-label="Delete"
                  title="Delete Product"
                >
                  <Trash2 size={24} />
                </button>
              </div>
            </div>
          ))
        ) : (
          <div className="text-center py-8 text-amber-900 col-span-3">
            <p>No products found. Please add some products.</p>
          </div>
        )}
      </div>

      {/* Modal Component */}
      {selectedProduct && (
        <ProductDetailsModal
          isOpen={isModalOpen}
          onClose={handleCloseModal}
          product={selectedProduct}
        />
      )}

      {productData && (
        <div className="flex justify-center items-center mt-4 space-x-4">
          <button
            onClick={() => setCurrentPage((prev) => Math.max(1, prev - 1))}
            disabled={currentPage === 1}
            className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50"
          >
            Previous
          </button>

          <span className="text-gray-700">
            Page {productData.currentPage} of {productData.totalPages}
          </span>

          <button
            onClick={() =>
              setCurrentPage((prev) => (prev < productData.totalPages ? prev + 1 : prev))
            }
            disabled={currentPage === productData.totalPages}
            className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50"
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
};

export default ProductListTable;
