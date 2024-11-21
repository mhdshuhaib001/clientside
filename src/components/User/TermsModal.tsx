import React from 'react';

interface TermsModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAccept: () => void;
}

const TermsModal: React.FC<TermsModalProps> = ({
  isOpen,
  onClose,
  onAccept,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed top-0 right-0 left-0 z-50 flex items-center justify-center w-full h-full bg-gray-900 bg-opacity-50">
      <div className="relative p-4 w-full max-w-2xl bg-[#fcfaee] rounded-lg shadow">
        {/* Modal Header */}
        <div className="flex items-center justify-between p-4 border-b rounded-t">
          <h3 className="text-xl font-semibold text-gray-900">
            Terms and Conditions
          </h3>
          <button
            onClick={onClose}
            className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center"
          >
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
              <path
                fillRule="evenodd"
                d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                clipRule="evenodd"
              />
            </svg>
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-4 space-y-4">
          <p className="text-lg font-semibold text-gray-900 mb-2">
            Auction Fees:
          </p>
          <ul className="list-disc list-inside text-gray-700 mb-4">
            <li>
              A small percentage of the final sale price will be charged as an
              auction fee, deducted automatically after a successful sale.
            </li>
            <li>This fee is non-refundable.</li>
          </ul>
          <p className="text-lg font-semibold text-gray-900 mb-2">
            Payment Security:
          </p>
          <ul className="list-disc list-inside text-gray-700 mb-4">
            <li>
              Transactions are processed securely, with payments held in escrow
              until the buyer confirms receipt of the item.
            </li>
            <li>
              Your financial information is protected using industry-standard
              encryption.
            </li>
          </ul>
          <p className="text-lg font-semibold text-gray-900 mb-2">
            Seller Responsibilities:
          </p>
          <ul className="list-disc list-inside text-gray-700 mb-4">
            <li>
              You must list authentic products with accurate descriptions and
              comply with all applicable laws and platform guidelines.
            </li>
            <li>
              Any disputes will be handled through our platform’s resolution
              process to ensure fairness.
            </li>
          </ul>
        </div>

        {/* Modal Footer */}
        <div className="flex items-center p-4 border-t border-gray-200 rounded-b">
          <button
            onClick={onAccept}
            className="text-white bg-gray-900 hover:bg-gray-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
          >
            Accept and Continue
          </button>
          <button
            onClick={onClose}
            className="py-2.5 px-5 ms-3 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default TermsModal;
