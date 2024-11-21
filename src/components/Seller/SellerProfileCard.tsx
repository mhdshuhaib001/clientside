import { MessageCircle, MoreVertical } from 'lucide-react';
import React, { useState } from 'react';
import { Image } from '@nextui-org/react';
import { ReportForm } from '../Admin/ReportModal';
// import { useNavigate } from 'react-router-dom';

interface SellerProfileCardProps {
  id: string | undefined;
  sellerName: string | undefined;
  profileImage: string | undefined;
}

const SellerProfileCard: React.FC<SellerProfileCardProps> = ({ sellerName, profileImage ,id}) => {

  // const navigate = useNavigate()
  const [isReportModalOpen, setIsReportModalOpen] = useState(false);
  const handleReportButtonClick = () => {
    setIsReportModalOpen(true);
  };
// const handleCardClick = ()=>{
//   if(id){
//     navigate(`/seller-profile/${id}`)
//   }
// }
  return (
    <div className="flex items-center justify-between bg-amber-100 p-4 rounded-lg cursor-pointer" >
      <div className="flex items-center space-x-2">
        <Image
          src={profileImage|| '/icons/profile.png'}
          alt={sellerName}
          width={40}
          height={40}
          className="rounded-full"
        />
        <div>
          <h2 className="font-semibold">{sellerName}</h2>
          {/* Optional: Uncomment to display additional info */}
          {/* <p className="text-sm text-gray-600">8.3K Items sold</p> */}
        </div>
      </div>
      <div className="flex items-center space-x-2">
        <MessageCircle className="w-6 h-6 text-gray-600" />
        <button onClick={handleReportButtonClick}>
          <MoreVertical className="w-6 h-6 text-gray-600" />
        </button>
      </div>

      {isReportModalOpen && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-amber-50 p-6 rounded-lg shadow-lg w-1/3">
            <ReportForm onClose={() => setIsReportModalOpen(false)} sellerId={id} />
          </div>
        </div>
      )}
    </div>
  );
};

export default SellerProfileCard;
