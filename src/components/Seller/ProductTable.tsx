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
  const { data: productData, refetch } = useFetchProductsQuery(sellerId);
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
    <div className="container font-serif mx-auto px-4 py-8">
      <div className="flex flex-col sm:flex-row justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-amber-900 mb-4 sm:mb-0">All Product List</h1>
        <button
          onClick={() => navigate('/profile/seller/addproduct')}
          className="bg-amber-300 hover:bg-amber-400 text-white font-bold py-2 px-4 rounded transition duration-300 w-full sm:w-auto"
        >
          List Item
        </button>
      </div>

      <div className="overflow-x-auto bg-white  rounded-lg">
        {productData?.products?.length ? (
          <table className="min-w-full table-auto">
            <thead>
              <tr className="bg-amber-100 text-amber-900 uppercase text-xs sm:text-sm leading-normal">
                <th className="py-3 px-2 sm:px-6 text-left text-xs sm:text-sm">
                  Product Name 
                </th>
                <th className="py-3 px-2 sm:px-6 text-left text-sm sm:text-sm">Bid Price</th>
                <th className="py-3 px-2 sm:px-6 text-left text-sm sm:text-sm">Category</th>
                <th className="py-3 px-2 sm:px-6 text-left text-sm sm:text-sm">Auction Format</th>
                <th className="py-3 px-2 sm:px-6 text-left text-sm sm:text-sm">Auction Status</th>
                <th className="py-3 px-2 sm:px-6 text-left text-sm sm:text-sm">Auction Time</th>
                <th className="py-3 px-2 sm:px-6 text-left text-sm sm:text-sm">Action</th>
              </tr>
            </thead>

            <tbody className="text-amber-900 text-xs sm:text-sm font-light">
              {productData.products.map((product) => (
                <tr
                  key={product._id}
                  className="border-b border-amber-200 hover:bg-amber-50 transition duration-300"
                >
                  <td className="py-3 px-2 sm:px-6 text-left whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="mr-2">
                        <img
                          src={product.images[0]}
                          alt={product.itemTitle}
                          width={40}
                          height={40}
                          onClick={() => handleImageClick(product)}
                          className="rounded-full cursor-pointer"
                        />
                      </div>
                      <span className="font-medium uppercase text-sm">
                        {product.itemTitle.length > 20
                          ? `${product.itemTitle.slice(0, 20)}...`
                          : product.itemTitle}
                      </span>
                    </div>
                  </td>
                  <td className="py-3 px-2 sm:px-6 text-left">${product.reservePrice}</td>
                  <td className="py-3 px-2 sm:px-6 text-left uppercase">{product.category.name}</td>
                  <td className="py-3 px-2 sm:px-6 text-left">
                    <span
                      className={`${
                        product.auctionFormat === 'auction'
                          ? 'bg-blue-200 text-blue-600'
                          : 'bg-gray-200 text-gray-600'
                      } py-1 px-2 rounded-full text-xs`}
                    >
                      {product.auctionFormat === 'auction' ? 'Live Auction' : 'Fixed Price'}
                    </span>
                  </td>
                  <td className="py-3 px-2 sm:px-6 text-left">
                    {product.auctionStatus === 'end' && (
                      <span className="bg-gray-300 text-gray-600 py-1 px-2 rounded-full text-xs">
                        Auction Ended
                      </span>
                    )}
                    {product.auctionStatus === 'sold' && (
                      <span className="bg-green-200 text-green-600 py-1 px-2 rounded-full text-xs">
                        Sold
                      </span>
                    )}
                    {product.auctionStatus === 'live' && (
                      <span className="bg-blue-200 text-blue-600 py-1 px-2 rounded-full text-xs">
                        Auction Active
                      </span>
                    )}
                  </td>
                  <td className="py-3 px-2 sm:px-6 text-left">
                    {product.auctionFormat === 'auction' &&
                    product.auctionStartDateTime &&
                    product.auctionEndDateTime ? (
                      <div className="text-xs">
                        <span>
                          Start: {new Date(product.auctionStartDateTime).toLocaleString()}
                        </span>
                        <br />
                        <span>End: {new Date(product.auctionEndDateTime).toLocaleString()}</span>
                      </div>
                    ) : (
                      <span className="text-xs text-gray-500">No Auction</span>
                    )}
                  </td>
                  <td className="py-3 px-2 sm:px-6 text-left">
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => navigate(`/profile/seller/addproduct/${product._id}`)}
                        className="transform hover:text-amber-600 hover:scale-110 transition duration-300"
                        aria-label="Edit"
                      >
                        <Pencil size={16} />
                      </button>
                      <button
                        onClick={() => handleDelete(product._id ?? '')}
                        className="transform hover:text-amber-600 hover:scale-110 transition duration-300"
                        aria-label="Delete"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <div className="text-center py-8 text-amber-900">
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

      <div className="flex justify-end items-center mt-6 overflow-x-auto">
        <nav
          className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px"
          aria-label="Pagination"
        >
          <button className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-amber-200 bg-white text-sm font-medium text-amber-900 hover:bg-amber-50 transition duration-300">
            Previous
          </button>
          <button className="relative inline-flex items-center px-4 py-2 border border-amber-200 bg-amber-500 text-sm font-medium text-white hover:bg-amber-400 transition duration-300">
            1
          </button>

          <button className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-amber-200 bg-white text-sm font-medium text-amber-900 hover:bg-amber-50 transition duration-300">
            Next
          </button>
        </nav>
      </div>
    </div>
  );
};

export default ProductListTable;


// import React, { useEffect, useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { Pencil, Trash2 } from 'lucide-react';
// import { useSelector } from 'react-redux';
// import { RootState } from '../../store/Store';
// import toast from 'react-hot-toast';
// import { useFetchProductsQuery, useDeleteProductMutation } from '../../services/apis/sellerApi';
// import ProductDetailsModal from '../commen/ProductDetailModal';

// const ProductListTable: React.FC = () => {
//   const sellerId = useSelector((state: RootState) => state.Seller.sellerId);
//   const { data: productData, refetch } = useFetchProductsQuery(sellerId);
//   const [deleteProduct] = useDeleteProductMutation();
//   const navigate = useNavigate();
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [selectedProduct, setSelectedProduct] = useState<any>(null);

//   const handleImageClick = (product: any) => {
//     setSelectedProduct(product);
//     setIsModalOpen(true);
//   };

//   const handleCloseModal = () => {
//     setIsModalOpen(false);
//     setSelectedProduct(null);
//   };

//   useEffect(() => {
//     refetch();
//   }, [refetch]);

//   const handleDelete = async (productId: string) => {
//     try {
//       await deleteProduct(productId).unwrap();
//       refetch();
//       toast.success(`Product deleted successfully`);
//     } catch (error) {
//       toast.error('Failed to delete the product. Please try again.');
//       console.error('Failed to delete the product:', error);
//     }
//   };

//   return (
//     <div className="container mx-auto p-6 bg-gray-100 min-h-screen">
//       <div className="flex flex-col sm:flex-row justify-between items-center mb-6">
//         <h1 className="text-3xl font-bold text-amber-900 mb-4 sm:mb-0">All Product List</h1>
//         <button
//           onClick={() => navigate('/profile/seller/addproduct')}
//           className="bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-500 hover:to-amber-600 text-white font-bold py-2 px-4 rounded transition duration-300 w-full sm:w-auto"
//         >
//           Add Product
//         </button>
//       </div>

//       <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
//         {productData?.products?.length ? (
//           productData.products.map((product) => (
//             <div key={product._id} className="bg-white shadow-lg rounded-lg p-4 transition-transform transform hover:scale-105 hover:shadow-xl">
//               <div className="flex items-center mb-4">
//                 <img
//                   src={product.images[0]}
//                   alt={product.itemTitle}
//                   className="w-16 h-16 object-cover rounded-full mr-4 cursor-pointer"
//                   onClick={() => handleImageClick(product)}
//                 />
//                 <h2 className="text-lg font-semibold text-amber-900">{product.itemTitle}</h2>
//               </div>
//               <p className="text-sm text-gray-600"><strong>Bid Price:</strong> ${product.reservePrice}</p>
//               <p className="text-sm text-gray-600"><strong>Category:</strong> {product.category.name}</p>
//               <p className="text-sm text-gray-600"><strong>Auction Format:</strong> {product.auctionFormat === 'auction' ? 'Live Auction' : 'Fixed Price'}</p>
//               <p className="text-sm text-gray-600"><strong>Auction Status:</strong> {product.auctionStatus}</p>
//               <p className="text-sm text-gray-600"><strong>Auction Time:</strong> {product.auctionStartDateTime ? `Start: ${new Date(product.auctionStartDateTime).toLocaleString()}` : 'No Auction'}</p>
//               <div className="flex justify-between mt-4">
//                 <button
//                   onClick={() => navigate(`/profile/seller/addproduct/${product._id}`)}
//                   className="text-blue-500 hover:text-blue-700 transition duration-300"
//                   aria-label="Edit"
//                   title="Edit Product"
//                 >
//                   <Pencil size={24} />
//                 </button>
//                 <button
//                   onClick={() => handleDelete(product._id ?? '')}
//                   className="text-red-500 hover:text-red-700 transition duration-300"
//                   aria-label="Delete"
//                   title="Delete Product"
//                 >
//                   <Trash2 size={24} />
//                 </button>
//               </div>
//             </div>
//           ))
//         ) : (
//           <div className="text-center py-8 text-amber-900 col-span-3">
//             <p>No products found. Please add some products.</p>
//           </div>
//         )}
//       </div>

//       {/* Modal Component */}
//       {selectedProduct && (
//         <ProductDetailsModal
//           isOpen={isModalOpen}
//           onClose={handleCloseModal}
//           product={selectedProduct}
//         />
//       )}

//       <div className="flex justify-end items-center mt-6">
//         <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px" aria-label="Pagination">
//           <button className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-amber-200 bg-white text-sm font-medium text-amber-900 hover:bg-amber-50 transition duration-300">
//             Previous
//           </button>
//           <button className="relative inline-flex items-center px-4 py-2 border border-amber-200 bg-amber-500 text-sm font-medium text-white hover:bg-amber-400 transition duration-300">
//             1
//           </button>
//           <button className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-amber-200 bg-white text-sm font-medium text-amber-900 hover:bg-amber-50 transition duration-300">
//             Next
//           </button>
//         </nav>
//       </div>
//     </div>
//   );
// };

// export default ProductListTable;