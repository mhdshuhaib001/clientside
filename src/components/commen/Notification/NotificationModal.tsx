import React from 'react';

interface Notification {
  id: number;
  image: string; 
  productName: string;
  currentBid: number;
  status: string; 
}

interface NotificationModalProps {
  notifications: Notification[];
  onClose: () => void;
}

const NotificationModal: React.FC<NotificationModalProps> = ({ notifications, onClose }) => {
  return (
    <div className="fixed inset-0 m-5 flex items-start justify-end z-50 bg-black bg-opacity-50">
      <div className="bg-white rounded-l-md shadow-lg w-80 max-h-full overflow-y-auto">
        <div className="p-4 border-b flex justify-between items-center">
          <h2 className="text-lg font-semibold">Notifications</h2>
          <button onClick={onClose} className="text-gray-600 hover:text-gray-800">
            ✖
          </button>
        </div>
        <div className="p-4">
          {notifications.length > 0 ? (
            notifications.map((notification) => (
              <div key={notification.id} className="flex items-start mb-4 p-2 border-b border-gray-200 hover:bg-gray-100 transition duration-200">
                <img src={notification.image} alt={notification.productName} className="w-16 h-16 rounded-md mr-3" />
                <div className="flex-1">
                  <div className="font-semibold text-gray-800">{notification.productName}</div>
                  <div className="text-sm text-gray-600">Current Bid: ${notification.currentBid}</div>
                  <div className="text-xs text-gray-500">{notification.status}</div>
                </div>
              </div>
            ))
          ) : (
            <div className="px-4 py-2 text-gray-600">No new notifications</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default NotificationModal;