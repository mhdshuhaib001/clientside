import React, { useState,useEffect } from 'react';
import CategoryModal from '../../components/Admin/CategoryModal';
import {
  useAddCategoryMutation,
  useFetchCategoryQuery,
  useUpdateCategoryMutation,
  useDeleteCategoryMutation,
} from '../../services/apis/adminApi';
import toast from 'react-hot-toast';
import { Category, UploadCategory } from '../../interface/adminTypes/adminApiTypes';

const AdminCategoryTable: React.FC = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPages = 5;

  const { data, refetch } = useFetchCategoryQuery({ page: currentPage, limit: itemsPages });

  const categories = data?.categories || [];
  const totalPages = data?.totalPages || 1;
  useEffect(() => {
    refetch(); 
  }, [currentPage, refetch]);
  const paginate = (pageNumber: number) => {
    if (pageNumber >= 1 && pageNumber <= totalPages) {
      setCurrentPage(pageNumber);
    }
  };

  const [addCategory] = useAddCategoryMutation();
  const [updateCategory] = useUpdateCategoryMutation();
  const [deleteCategory] = useDeleteCategoryMutation();
  const [loading, setLoading] = useState<boolean>(false);

  const [currentCategory, setCurrentCategory] = useState<Category | null>(null);
  const [isEditMode, setIsEditMode] = useState(false);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const handleModalClose = () => setIsModalOpen(false);

  const handleCategorySubmit = async (data: UploadCategory) => {
    const isDuplicate = categories.some(
      (category) =>
        category.name.toLowerCase() === data.name.toLowerCase() &&
        (!isEditMode || (isEditMode && currentCategory?.name !== data.name)),
    );

    if (isDuplicate) {
      toast.error('Category name already exists. Please choose a different name.');
      return;
    }
    setLoading(true);
    const formData = new FormData();

    formData.append('name', data.name);
    if (data.image) {
      formData.append('image', data.image);
    }
    if (data.icon) {
      formData.append('icon', data.icon);
    }

    try {
      const response =
        isEditMode && currentCategory
          ? await updateCategory({ id: currentCategory._id, formData }).unwrap()
          : await addCategory(formData).unwrap();

      if (response) {
        toast.success(
          !isEditMode ? 'Category added successfully!' : 'Category edited successfully',
        );
        handleModalClose();
        refetch();
      }
    } catch (error) {
      console.error('Error adding category:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteCategoryClick = async (categoryId: string) => {
    console.log(categoryId, 'categoryId');
    const response = await deleteCategory(categoryId).unwrap();
    console.log(response, 'response');

    toast.success('Category deleted successfully');
    refetch();
  };
  const handleAddCategoryClick = () => {
    setIsEditMode(false);
    setCurrentCategory(null);
    setIsModalOpen(true);
  };

  const handleEditCategoryClick = (category: Category) => {
    setIsEditMode(true);
    setCurrentCategory(category);
    setIsModalOpen(true);
  };

  return (
    <div className="container mx-auto py-10 px-4">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold">Admin Category</h2>
        <button
          onClick={handleAddCategoryClick}
          className="bg-gray-700 hover:bg-gray-800 text-white font-bold py-2 px-3 rounded"
        >
          Add Category
        </button>
      </div>
      <div className="overflow-x-auto bg-white shadow-md rounded-lg">
        <table className="min-w-full table-auto">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wide">
                No
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wide">
                Name
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wide">
                Image
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wide">
                Icon
              </th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wide">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {categories.length > 0 ? (
              categories.map((category, index) => (
                <tr key={category.id}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {index + 1 + (currentPage - 1) * itemsPages}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">{category.name}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <img
                      src={category.imageUrl}
                      alt={category.name}
                      width={60}
                      height={60}
                      className="rounded-md"
                    />
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <img src={category.iconUrl} className="w-9 h-9" />
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <button
                      onClick={() => handleEditCategoryClick(category)}
                      className="text-indigo-600 hover:text-indigo-900 mr-2"
                    >
                      Edit
                    </button>
                    <button 
                      onClick={() => handleDeleteCategoryClick(category._id)} 
                      className="text-red-600 hover:text-red-900"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={5} className="px-6 py-10 text-center">
                  <div className="flex flex-col items-center justify-center">
                    <svg 
                      xmlns="http://www.w3.org/2000/svg" 
                      className="h-12 w-12 text-gray-400 mb-2" 
                      fill="none" 
                      viewBox="0 0 24 24" 
                      stroke="currentColor"
                    >
                      <path 
                        strokeLinecap="round" 
                        strokeLinejoin="round" 
                        strokeWidth={1.5} 
                        d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" 
                      />
                    </svg>
                    <p className="text-lg font-medium text-gray-600">No categories found</p>
                    <p className="text-sm text-gray-500 mt-1">Click "Add Category" to create a new category</p>
                  </div>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <div className="mt-4 flex justify-end">
        {totalPages > 1 && (
          <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px" aria-label="Pagination">
            <button
              onClick={() => paginate(currentPage - 1)}
              disabled={currentPage === 1}
              className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50"
            >
              Previous
            </button>
            {Array.from({ length: totalPages }).map((_, index) => (
              <button
                key={index}
                onClick={() => paginate(index + 1)}
                className={`relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium ${
                  currentPage === index + 1
                    ? 'text-indigo-600 bg-indigo-50'
                    : 'text-gray-700 hover:bg-gray-50'
                }`}
              >
                {index + 1}
              </button>
            ))}
            <button
              onClick={() => paginate(currentPage + 1)}
              disabled={currentPage === totalPages}
              className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50"
            >
              Next
            </button>
          </nav>
        )}
      </div>

      <CategoryModal
        isOpen={isModalOpen}
        onClose={handleModalClose}
        onSave={handleCategorySubmit}
        category={currentCategory}
        isEditMode={isEditMode}
        loading={loading}
      />
    </div>
  );
};

export default AdminCategoryTable;