import React, { useState } from 'react';
import { PlusCircle } from 'lucide-react';

export default function AuctionItemForm() {
  const [images, setImages] = useState<string[]>([
    '/placeholder.svg?height=100&width=100',
    '/placeholder.svg?height=100&width=100',
    '/placeholder.svg?height=100&width=100',
    '/placeholder.svg?height=100&width=100'
  ]);

  const [formData, setFormData] = useState({
    title: '',
    category: '',
    description: '',
    condition: '',
    format: '',
    duration: '',
    startingBid: '',
    buyNowPrice: '',
    reservePrice: '',
    shippingOption: '',
    shippingCost: '',
    noReturns: false
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;

    setFormData(prevData => ({
      ...prevData,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value
    }));
  };

  const handleAddImage = () => {
    // Add a new placeholder image to the images array
    setImages(prevImages => [...prevImages, '/placeholder.svg?height=100&width=100']);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
  };

  return (
    <div className="max-w-4xl mx-auto p-4 space-y-6">
      <div className="bg-white shadow rounded-lg">
        <div className="px-4 py-5 sm:px-6">
          <h3 className="text-lg font-medium leading-6 text-gray-900">Item Details</h3>
        </div>
        <div className="px-4 py-5 sm:p-6">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="title" className="block text-sm font-medium text-gray-700">Item Title</label>
                <input
                  type="text"
                  id="title"
                  name="title"
                  value={formData.title}
                  onChange={handleInputChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                  placeholder="Item Title"
                />
              </div>
              <div>
                <label htmlFor="category" className="block text-sm font-medium text-gray-700">Category</label>
                <select
                  id="category"
                  name="category"
                  value={formData.category}
                  onChange={handleInputChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                >
                  <option value="">Select a category</option>
                  <option value="antiques">Antiques</option>
                  <option value="art">Art</option>
                  <option value="jewelry">Jewelry</option>
                </select>
              </div>
            </div>
            <div>
              <label htmlFor="description" className="block text-sm font-medium text-gray-700">Description</label>
              <textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                rows={4}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                placeholder="Discover everything about your product features"
              ></textarea>
            </div>
            <div>
              <label htmlFor="condition" className="block text-sm font-medium text-gray-700">Condition</label>
              <textarea
                id="condition"
                name="condition"
                value={formData.condition}
                onChange={handleInputChange}
                rows={4}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                placeholder="Describe the current condition of your product (Optional)"
              ></textarea>
            </div>
          </form>
        </div>
      </div>

      {/* Add Product Images Section */}
      <div className="bg-white shadow rounded-lg">
        <div className="px-4 py-5 sm:px-6">
          <h3 className="text-lg font-medium leading-6 text-gray-900">Add Product Images</h3>
        </div>
        <div className="px-4 py-5 sm:p-6">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-4">
            {images.map((image, index) => (
              <div key={index} className="relative aspect-square">
                <img src={image} alt={`Product ${index + 1}`} className="w-full h-full object-cover rounded-lg" />
              </div>
            ))}
          </div>
          <button
            type="button"
            onClick={handleAddImage}
            className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            <PlusCircle className="w-5 h-5 mr-2" />
            Add Image
          </button>
        </div>
      </div>

      <div className="bg-white shadow rounded-lg">
        <div className="px-4 py-5 sm:px-6">
          <h3 className="text-lg font-medium leading-6 text-gray-900">Auction Details</h3>
        </div>
        <div className="px-4 py-5 sm:p-6">
          <form className="space-y-4">
            <div>
              <label htmlFor="format" className="block text-sm font-medium text-gray-700">Format</label>
              <select
                id="format"
                name="format"
                value={formData.format}
                onChange={handleInputChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              >
                <option value="">Select format</option>
                <option value="auction">Auction</option>
                <option value="fixed-price">Fixed Price</option>
              </select>
            </div>
            <div className="flex items-center space-x-2">
              <div className="flex-grow">
                <label htmlFor="duration" className="block text-sm font-medium text-gray-700">Auction Duration</label>
                <select
                  id="duration"
                  name="duration"
                  value={formData.duration}
                  onChange={handleInputChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                >
                  <option value="">Select duration</option>
                  <option value="3-days">3 Days</option>
                  <option value="5-days">5 Days</option>
                  <option value="7-days">7 Days</option>
                </select>
              </div>
              <button
                type="button"
                className="mt-6 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Add duration
              </button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="starting-bid" className="block text-sm font-medium text-gray-700">Starting Bid</label>
                <input
                  type="number"
                  id="starting-bid"
                  name="startingBid"
                  value={formData.startingBid}
                  onChange={handleInputChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                  placeholder="$"
                />
              </div>
              <div>
                <label htmlFor="buy-now" className="block text-sm font-medium text-gray-700">Buy Now Price</label>
                <input
                  type="number"
                  id="buy-now"
                  name="buyNowPrice"
                  value={formData.buyNowPrice}
                  onChange={handleInputChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                  placeholder="$ 950.00"
                />
              </div>
            </div>
            <div>
              <label htmlFor="shipping-option" className="block text-sm font-medium text-gray-700">Shipping Option</label>
              <select
                id="shipping-option"
                name="shippingOption"
                value={formData.shippingOption}
                onChange={handleInputChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              >
                <option value="">Select shipping option</option>
                <option value="free-shipping">Free Shipping</option>
                <option value="paid-shipping">Paid Shipping</option>
              </select>
            </div>
            <div>
              <label htmlFor="shipping-cost" className="block text-sm font-medium text-gray-700">Shipping Cost</label>
              <input
                type="number"
                id="shipping-cost"
                name="shippingCost"
                value={formData.shippingCost}
                onChange={handleInputChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                placeholder="$"
              />
            </div>
            <div className="flex items-center">
              <input
                type="checkbox"
                id="no-returns"
                name="noReturns"
                checked={formData.noReturns}
                onChange={handleInputChange}
                className="h-4 w-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
              />
              <label htmlFor="no-returns" className="ml-2 block text-sm text-gray-900">No Returns</label>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
