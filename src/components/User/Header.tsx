import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { User, MessageCircle, Bell, Menu, X } from 'lucide-react';
import { useSelector } from 'react-redux';
import { RootState } from '../../store/Store';
import {
  MessageNotification,
  useMessageNotification,
} from '../../utils/hooks/useMessageNotification';
import MessageNotificationDropdown from '../commen/Notification/MessageNotificationDropDown';
import NotificationModal from '../commen/Notification/NotificationModal';
import socket from '../../utils/socket';

const Header: React.FC = () => {
  // State management
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [token, setToken] = useState<string | null>(null);
  const [notifications, setNotifications] = useState<any[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isMessageDropdownOpen, setIsMessageDropdownOpen] = useState(false);
  const [lastNotification, setLastNotification] = useState<MessageNotification | null>(null);
  const [isMobileChatOpen, setIsMobileChatOpen] = useState(false);

  // Hooks
  const navigate = useNavigate();
  const currentUserId = useSelector((state: RootState) => state.User._id);

  const {
    notifications: messageNotifications,
    unreadCount,
    markAsRead,
    markAllAsRead,
    clearNotifications,
  } = useMessageNotification();

  useEffect(() => {
    if (messageNotifications.length > 0) {
      setLastNotification(messageNotifications[messageNotifications.length - 1]);
    }
  }, [messageNotifications]);

  useEffect(() => {
    console.log('Message Notifications Updated:', messageNotifications);
    console.log('Unread Count:', unreadCount);
  }, [messageNotifications, unreadCount]);

  useEffect(() => {
    setNotifications(notifications);
  }, [messageNotifications]);

  const handleNotificationClick = (notification: {
    type: string;
    senderId: string;
    orderId?: string;
  }) => {
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

  const handleMobileChat = () => {
    if (window.innerWidth < 768) {
      setIsMobileChatOpen(!isMobileChatOpen);
    } else {
      navigate('/chat');
    }
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
            className="text-gray-600 hover:text-gray-900 transition-colors"
          >
            Auction
          </button>

          <button
            onClick={() => navigate('/about')}
            className="text-gray-600 hover:text-gray-900 transition-colors"
          >
            About us
          </button>

          {token && (
            <div className="flex items-center space-x-4">
              <div className="relative">
                <button
                  className="text-gray-600 hover:text-gray-900 flex items-center transition-colors"
                  onClick={() => setIsMessageDropdownOpen(!isMessageDropdownOpen)}
                >
                  <Bell size={24} />
                  {unreadCount > 0 && (
                    <span className="absolute -top-1 -right-1 bg-amber-500 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                      {unreadCount}
                    </span>
                  )}
                </button>
                {isMessageDropdownOpen && (
                  <MessageNotificationDropdown
                    notifications={messageNotifications}
                    lastNotification={lastNotification}
                    onMarkAsRead={markAsRead}
                    onMarkAllAsRead={markAllAsRead}
                    onClear={clearNotifications}
                    onClose={() => setIsMessageDropdownOpen(false)}
                    // onNotificationClick={handleNotificationClick}
                  />
                )}
              </div>

              <button
                onClick={handleMobileChat}
                className="text-gray-600 hover:text-gray-900 transition-colors"
              >
                <MessageCircle size={24} />
              </button>
            </div>
          )}

          {token ? (
            <button
              className="flex items-center bg-[#975f26] text-[#f7efc1] hover:text-[#e5cc6f] py-2 px-4 rounded-md hover:bg-[#663f21] transition-colors"
              onClick={() => navigate('/profile/dashboard')}
            >
              <User size={20} className="mr-2" />
              Profile
            </button>
          ) : (
            <button
              onClick={() => navigate('/registration')}
              className="bg-[#975f26] text-white py-2 px-4 rounded-md hover:bg-[#663f21] transition-colors"
            >
              Register
            </button>
          )}
        </nav>

        {/* Mobile Menu Button */}
        <div className="md:hidden flex items-center space-x-4">
          {token && (
            <>
              <button
                className="text-gray-600 hover:text-gray-900 relative transition-colors"
                onClick={handleMobileChat}
              >
                <MessageCircle size={24} />
                {unreadCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-amber-500 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                    {unreadCount}
                  </span>
                )}
              </button>
              <button
                className="text-gray-600 hover:text-gray-900 relative transition-colors"
                onClick={() => setIsMessageDropdownOpen(!isMessageDropdownOpen)}
              >
                <Bell size={24} />
                {notifications.length > 0 && (
                  <span className="absolute -top-1 -right-1 bg-amber-500 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                    {notifications.length}
                  </span>
                )}
              </button>
            </>
          )}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="text-gray-800 focus:outline-none transition-colors"
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`md:hidden ${
          isMenuOpen ? 'block' : 'hidden'
        } px-6 py-4 bg-white border-t border-gray-200 shadow-lg`}
      >
        <button
          onClick={() => {
            navigate('/auction-items');
            setIsMenuOpen(false);
          }}
          className="block w-full text-left py-3 text-gray-600 hover:text-gray-900 transition-colors"
        >
          Auction
        </button>
        <button
          onClick={() => {
            navigate('/about');
            setIsMenuOpen(false);
          }}
          className="block w-full text-left py-3 text-gray-600 hover:text-gray-900 transition-colors"
        >
          About Us
        </button>
        {token ? (
          <button
            onClick={() => {
              navigate('/profile/dashboard');
              setIsMenuOpen(false);
            }}
            className="block w-full bg-[#975f26] text-white py-3 px-4 rounded-md hover:bg-[#663f21] mt-4 transition-colors"
          >
            Profile
          </button>
        ) : (
          <button
            onClick={() => {
              navigate('/registration');
              setIsMenuOpen(false);
            }}
            className="block w-full bg-[#975f26] text-white py-3 px-4 rounded-md hover:bg-[#663f21] mt-4 transition-colors"
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
