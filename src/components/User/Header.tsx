// import React, { useEffect, useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { User } from 'lucide-react';
// const Header: React.FC = () => {
//   const [isMenuOpen, setIsMenuOpen] = useState(false);
//   const [token, setToken] = useState<string | null>(null);
//   const navigate = useNavigate();

//   useEffect(() => {
//     const storedToken = localStorage.getItem('accessToken');
//     setToken(storedToken);
//   }, []);

//   return (
//     <header className="bg-main-bg border border-b border-border-primary shadow-md py-2">
//       <div className="container mx-auto flex justify-between items-center px-6">
//         {/* Logo */}
//         <div
//           onClick={() => navigate('/')}
//           className="text-xl font-bold text-gray-800 cursor-pointer"
//         >
//           AuctionGems
//         </div>

//         {/* Navigation */}
//         <nav className="hidden md:flex space-x-4 items-center">
//           <a
//             onClick={() => navigate('/auction-items')}
//             className="text-gray-600 hover:text-gray-900 cursor-pointer"
//           >
//             Auction
//           </a>
//           <a href="#live-auction" className="text-gray-600 hover:text-gray-900">
//             Live Auction
//           </a>
//           <a href="#wishlist" className="text-gray-600 hover:text-gray-900">
//             Wishlist
//           </a>

//           {/* Chat Icon */}
//           <a
//             onClick={() => navigate('/chat')}
//             className="text-gray-600 hover:text-gray-900 flex items-center space-x-2"
//           >

//             <img src="/svg/icons/chat.svg" alt="Visa" width={40} height={20} className='cursor-pointer' />
//           </a>

//           {/* Profile Button */}
//           {token ? (
//             <button
//               className="flex items-center bg-[#975f26] text-[#f7efc1]  hover:text-[#e5cc6f] py-1 px-4 rounded-md hover:bg-[#663f21] focus:outline-none focus:ring-2 focus:ring-gray-600 focus:ring-opacity-50 transition duration-300 ml-4"
//               onClick={() => {
//                 navigate('/profile/dashboard');
//               }}
//             >
//               <User size={20} className="mr-2" />
//               Profile
//             </button>
//           ) : (
//             <button
//               onClick={() => {
//                 navigate('/registration');
//               }}
//               className="bg-[#975f26] text-white py-1 px-4 rounded-md hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-600 focus:ring-opacity-50 transition duration-300 ml-4"
//             >
//               Register
//             </button>
//           )}
//         </nav>

//         {/* Mobile Menu */}
//         <div className="md:hidden">
//           <button
//             onClick={() => setIsMenuOpen(!isMenuOpen)}
//             className="text-gray-800 focus:outline-none"
//           >
//             {/* Hamburger Icon */}
//             <svg
//               className="w-6 h-6"
//               fill="none"
//               stroke="currentColor"
//               viewBox="0 0 24 24"
//               xmlns="http://www.w3.org/2000/svg"
//             >
//               <path
//                 strokeLinecap="round"
//                 strokeLinejoin="round"
//                 strokeWidth={2}
//                 d="M4 6h16M4 12h16M4 18h16"
//               />
//             </svg>
//           </button>
//         </div>
//       </div>

//       {/* Mobile Menu Items */}
//       <div className={`md:hidden ${isMenuOpen ? 'block' : 'hidden'} px-6 mt-4`}>
//         <a href="#auction" className="block py-2 text-gray-600 hover:text-gray-900">
//           Auction
//         </a>
//         <a href="#live-auction" className="block py-2 text-gray-600 hover:text-gray-900">
//           Live Auction
//         </a>
//         <a href="#wishlist" className="block py-2 text-gray-600 hover:text-gray-900">
//           Wishlist
//         </a>

//         <button className="block w-full bg-btn-primary -600 text-white py-2 px-4 rounded-md hover:bg-blue-700 mt-2">
//           Profile
//         </button>
//       </div>
//     </header>
//   );
// };

// export default Header;

import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { User, MessageCircle, Bell } from 'lucide-react';
import { useSocket } from '../../utils/hooks/useSocket';
import { useSelector } from 'react-redux';
import { RootState } from '../../store/Store';
import { useMessageNotification } from '../../utils/hooks/useMessageNotification';
import MessageNotificationDropdown from '../commen/Notification/MessageNotificationDropDown';
import NotificationModal from '../commen/Notification/NotificationModal';

const Header: React.FC = () => {
  // State management
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [token, setToken] = useState<string | null>(null);
  const [notifications, setNotifications] = useState<any[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isMessageDropdownOpen, setIsMessageDropdownOpen] = useState(false);

  // Hooks
  const navigate = useNavigate();
  const { socket } = useSocket();
  const currentUserId = useSelector((state: RootState) => state.User._id);
  

  const {
    notifications: messageNotifications,
    unreadCount,
    markAsRead,
    markAllAsRead,
    clearNotifications,
  } = useMessageNotification(socket, currentUserId);

  useEffect(() => {
    setNotifications(notifications);
  }, [messageNotifications]);

  const handleNotificationClick = (notification: { type: string; senderId: string; orderId?: string }) => {
  switch (notification.type) {
    case 'message':
      navigate('/chat', { state: { contactId: notification.senderId } });
      break;
    case 'order':
      navigate(`/seller/orders/${notification.orderId}`);
      break;
  }
  setIsMessageDropdownOpen(false);
};

  // const handleRegularNotificationClick = () => {
  //   setIsModalOpen(true);
  //   setIsDropdownOpen(false);
  // };

  useEffect(() => {
    const storedToken = localStorage.getItem('accessToken');
    setToken(storedToken);
  }, []);

  return (
    <header className="bg-main-bg border-b border-border-primary shadow-md py-2">
      <div className="container mx-auto flex justify-between items-center px-6">
        {/* Logo */}
        <div
          onClick={() => navigate('/')}
          className="text-xl font-bold text-gray-800 cursor-pointer"
        >
          AuctionGems
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex space-x-4 items-center">
          <button
            onClick={() => navigate('/auction-items')}
            className="text-gray-600 hover:text-gray-900"
          >
            Auction
          </button>

          <button className="text-gray-600 hover:text-gray-900">Live Auction</button>

          <button className="text-gray-600 hover:text-gray-900">About us</button>

          {/* Regular Notifications */}
          <div className="relative">
            {/* <button
              className="text-gray-600 hover:text-gray-900 flex items-center"
              onClick={handleRegularNotificationClick}
              onMouseEnter={() => setIsDropdownOpen(true)}
              onMouseLeave={() => setIsDropdownOpen(false)}
            >
              <Bell size={24} />
              {notifications.length > 0 && (
                <span className="absolute -top-1 -right-1 bg-green-500 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                  {notifications.length}
                </span>
              )}
            </button> */}

            {/* Regular Notifications Dropdown */}
            {/* {isDropdownOpen && (
              <div className="absolute right-0 mt-2 w-80 bg-white border border-gray-300 rounded-md shadow-lg z-10">
                {notifications.length > 0 ? (
                  notifications.map((notification) => (
                    <div
                      key={notification.id}
                      className="flex items-center px-4 py-2 text-gray-800 hover:bg-gray-100 cursor-pointer"
                      onClick={handleRegularNotificationClick}
                    >
                      <img
                        src={notification.image}
                        alt={notification.productName}
                        className="w-12 h-12 rounded-md mr-2"
                      />
                      <div className="flex-1">
                        <div className="font-semibold">{notification.productName}</div>
                        <div className="text-sm">Current Bid: ${notification.currentBid}</div>
                        <div className="text-xs text-gray-500">{notification.status}</div>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="px-4 py-2 text-gray-600">No new notifications</div>
                )}
              </div>
            )} */}
          </div>

          {/* Message Notifications */}
          <div className="relative">
            <button
              className="text-gray-600 hover:text-gray-900 flex items-center"
              onClick={() => setIsMessageDropdownOpen(!isMessageDropdownOpen)}
              onMouseEnter={() => setIsMessageDropdownOpen(true)}
              onMouseLeave={() => setIsDropdownOpen(false)}
            >
              <Bell size={24} />
              {unreadCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-amber-500 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                  {unreadCount}
                </span>
              )}
            </button>

            {/* Message Notifications Dropdown */}
            {isMessageDropdownOpen && (
              <MessageNotificationDropdown
                notifications={messageNotifications}
                onMarkAsRead={markAsRead}
                onMarkAllAsRead={markAllAsRead}
                onClear={clearNotifications}
                onClose={() => setIsMessageDropdownOpen(false)}
                onNotificationClick={(notification) => handleNotificationClick(notification as { type: string; senderId: string; orderId?: string; })}
              />
            )}
          </div>

          {/* Chat Button */}
          <button onClick={() => navigate('/chat')} className="text-gray-600 hover:text-gray-900">
            <img
              src="/svg/icons/chat.svg"
              alt="Chat"
              width={40}
              height={20}
              className="cursor-pointer"
            />
          </button>

          {/* Profile/Register Button */}
          {token ? (
            <button
              className="flex items-center bg-[#975f26] text-[#f7efc1] hover:text-[#e5cc6f] py-1 px-4 rounded-md hover:bg-[#663f21] focus:outline-none focus:ring-2 focus:ring-gray-600 focus:ring-opacity-50 transition duration-300 ml-4"
              onClick={() => navigate('/profile/dashboard')}
            >
              <User size={20} className="mr-2" />
              Profile
            </button>
          ) : (
            <button
              onClick={() => navigate('/registration')}
              className="bg-[#975f26] text-white py-1 px-4 rounded-md hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-600 focus:ring-opacity-50 transition duration-300 ml-4"
            >
              Register
            </button>
          )}
        </nav>

        {/* Mobile Menu Button */}
        <div className="md:hidden">
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="text-gray-800 focus:outline-none"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div className={`md:hidden ${isMenuOpen ? 'block' : 'hidden'} px-6 mt-4`}>
        <button
          onClick={() => navigate('/auction-items')}
          className="block w-full text-left py-2 text-gray-600 hover:text-gray-900"
        >
          Auction
        </button>
        <button className="block w-full text-left py-2 text-gray-600 hover:text-gray-900">
          Live Auction
        </button>
        <button className="block w-full text-left py-2 text-gray-600 hover:text-gray-900">
          About Us
        </button>
        {token ? (
          <button
            onClick={() => navigate('/profile/dashboard')}
            className="block w-full bg-[#975f26] text-white py-2 px-4 rounded-md hover:bg-[#663f21] mt-2"
          >
            Profile
          </button>
        ) : (
          <button
            onClick={() => navigate('/registration')}
            className="block w-full bg-[#975f26] text-white py-2 px-4 rounded-md hover:bg-[#663f21] mt-2"
          >
            Register
          </button>
        )}
      </div>

      {/* Notification Modal */}
      {isModalOpen && (
        <NotificationModal notifications={notifications} onClose={() => setIsModalOpen(false)} />
      )}
    </header>
  );
};

export default Header;
