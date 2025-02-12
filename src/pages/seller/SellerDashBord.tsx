import React, { useEffect, useState } from 'react';
import { Outlet } from 'react-router-dom'; 
import BrandModal from '../../components/User/BrandModal';
import TermsModal from '../../components/User/TermsModal';
import { useCreateSellerMutation } from '../../services/apis/sellerApi';
import {
  SellerCreationRequest,
  SellerResponse,
} from '../../interface/sellerTypes/sellerApiTypes';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../store/Store'; 
import { setSeller } from '../../store/slices/userSlice'; 
import { setSellerId } from '../../store/slices/sellerSlice';
import { useNavigate } from 'react-router-dom';
import SellerNavigation from '../../components/Seller/SellerNavigation';

interface SellerProps {
  onSellerCreate?: (data: SellerResponse) => void;
}

const SellerDashBord: React.FC<SellerProps> = ({ onSellerCreate }) => {
  const userId = useSelector((state: RootState) => state.User._id);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [isTermsModalOpen, setIsTermsModalOpen] = useState(false);
  const [isBrandModalOpen, setIsBrandModalOpen] = useState(false);
  const [companyName, setCompanyName] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  
  const [createSeller] = useCreateSellerMutation();
  
  const [hasSellerToken, setHasSellerToken] = useState<boolean>(false);

  useEffect(() => {
    const sellerToken = localStorage.getItem('sellerToken');
    if (sellerToken) {
      setHasSellerToken(true);
    }
  }, []);

  const openTermsModal = () => setIsTermsModalOpen(true);
  const closeTermsModal = () => setIsTermsModalOpen(false);

  const openBrandModal = () => setIsBrandModalOpen(true);
  const closeBrandModal = () => {
    setCompanyName('');
    setErrorMessage('');
    setSuccessMessage('');
    setIsBrandModalOpen(false);
  };

  const handleAcceptTerms = () => {
    closeTermsModal();
    openBrandModal();
  };

  const brandCreate = async () => {
    try {
      if (!companyName.trim()) {
        setErrorMessage('Brand name cannot be empty.');
        setSuccessMessage('');
        return;
      }

      if (companyName.length < 3) {
        setErrorMessage('Brand name must be at least 3 characters long.');
        setSuccessMessage('');
        return;
      }

      if (companyName.length > 50) {
        setErrorMessage('Brand name cannot exceed 50 characters.');
        setSuccessMessage('');
        return;
      }

      const brandNameRegex = /^[a-zA-Z0-9 ]+$/;
      if (!brandNameRegex.test(companyName)) {
        setErrorMessage('Brand name can only contain alphanumeric characters and spaces.');
        setSuccessMessage('');
        return;
      }

      const sellerBrand: SellerCreationRequest = {
        companyName: companyName,
        userId: userId,
      };

      const response = await createSeller(sellerBrand).unwrap();
      console.log(response,'seller response')

      if (response) { 
        localStorage.setItem('sellerToken', response.sellerToken);
        setHasSellerToken(true); 
        dispatch(setSeller(true));
        dispatch(setSellerId(response.sellerId))
        navigate('/profile/seller/dashboard')
      }

      setSuccessMessage('Brand created successfully!');
      setErrorMessage('');
      closeBrandModal();

      if (onSellerCreate) {
        onSellerCreate(response);
      }
    } catch (error) {
      setErrorMessage((error as any)?.data?.message);
      setSuccessMessage('');
    }
  };

  return (
    <div className="flex flex-col h-full w-full p-6 shadow-md overflow-y-auto">
      <h1 className="text-2xl font-medium mb-3 sm:text-3xl">
        Seller Dashboard
      </h1>

      <div className="flex flex-col items-center">
        {hasSellerToken ? (
          <SellerNavigation />
          
        ) : (
          <div className="text-center">
            <h2 className="text-xl font-medium mb-4 text-center sm:text-2xl">
              Sell Your Antique Items
            </h2>
            <p className="text-gray-800 mb-6 text-center text-sm sm:text-base md:text-lg">
              It’s quick and easy to list your antiques. Start selling and see
              the value of your cherished items grow!
            </p>
            <button
              onClick={openTermsModal}
              className="bg-black text-white px-4 py-2 rounded-md hover:bg-gray-800 text-sm sm:text-base mb-4"
            >
              View Terms and Conditions
            </button>
          </div>
        )}
      </div>

      <Outlet />
      <TermsModal
        isOpen={isTermsModalOpen}
        onClose={closeTermsModal}
        onAccept={handleAcceptTerms}
      />

      <BrandModal
        isOpen={isBrandModalOpen}
        onClose={closeBrandModal}
        brandName={companyName}
        setBrandName={setCompanyName}
        onBrandCreate={brandCreate}
        errorMessage={errorMessage}
        successMessage={successMessage}
      />
    </div>
  );
};

export default SellerDashBord;
