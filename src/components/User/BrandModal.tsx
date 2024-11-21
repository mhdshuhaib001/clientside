import React from 'react';

interface BrandModalProps {
  isOpen: boolean;
  onClose: () => void;
  brandName: string;
  setBrandName: (name: string) => void;
  onBrandCreate: () => void;
  errorMessage: string;
  successMessage: string;
}

const BrandModal: React.FC<BrandModalProps> = ({
  isOpen,
  onClose,
  brandName,
  setBrandName,
  onBrandCreate,
  errorMessage,
  successMessage,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50">
      <div className="bg-[#fcfaee] rounded-lg shadow-lg max-w-sm w-full p-6">
        {/* Modal Header */}
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-900">Create Brand</h3>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-900"
            aria-label="Close"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        {/* Modal Body */}
        <div className="space-y-4">
          <label htmlFor="brandName" className="block text-sm font-medium text-gray-700">
            Brand Name
          </label>
          <input
            id="brandName"
            type="text"
            value={brandName}
            onChange={(e) => setBrandName(e.target.value)}
            className="block w-full p-2 border border-gray-300 rounded-md"
            placeholder="Enter brand name"
          />

          {errorMessage && <p className="text-red-500 text-sm">{errorMessage}</p>}
          {successMessage && <p className="text-green-500 text-sm">{successMessage}</p>}

          <button
            onClick={onBrandCreate}
            className="w-full bg-gray-900 text-white px-4 py-2 rounded-md hover:bg-gray-500"
          >
            Add Brand
          </button>
        </div>
      </div>
    </div>
  );
};

export default BrandModal;
