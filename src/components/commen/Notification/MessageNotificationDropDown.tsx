import React, { useEffect } from 'react';
import { User, Bell, Check } from 'lucide-react';

interface BaseNotification {
  id: string;
  timestamp: string;
  isRead: boolean;
}

interface MessageNotification extends BaseNotification {
  type: 'message';
  senderId: string;
  senderName?: string;
  senderAvatar?: string;
  message: string;
}

interface OrderNotification extends BaseNotification {
  type: 'order';
  sellerId: string;
  orderId: string;
  productName: string;
  buyerId: string;
  price: number;
}

type NotificationType = MessageNotification | OrderNotification;

interface MessageNotificationDropdownProps {
  notifications: NotificationType[];
  lastNotification: MessageNotification | null;
  onMarkAsRead: (id: string) => void;
  onMarkAllAsRead: () => void;
  onClear: () => void;
  onClose: () => void;
  onNotificationClick?: (notification: NotificationType) => void;
}

const ProfileAvatar: React.FC<{ name?: string, avatar?: string, size?: number }> = ({ 
  name, 
  avatar, 
  size = 40 
}) => {
  const initials = name 
    ? name.split(' ').map(word => word[0]).slice(0, 2).join('').toUpperCase()
    : '';

  return (
    <div 
      className="flex items-center justify-center rounded-full bg-gray-200 text-gray-700 shrink-0"
      style={{ 
        width: `${size}px`, 
        height: `${size}px`,
        fontSize: `${size / 2}px`
      }}
    >
      {avatar ? (
        <img 
          src={avatar} 
          alt={name || 'User avatar'} 
          className="w-full h-full rounded-full object-cover" 
        />
      ) : (
        <span className="font-semibold">
          {initials || <User className="w-1/2 h-1/2 text-gray-500" />}
        </span>
      )}
    </div>
  );
};

const MessageNotificationDropdown: React.FC<MessageNotificationDropdownProps> = ({
  notifications,
  onMarkAsRead,
  onMarkAllAsRead,
  onClear,
  onClose,
  onNotificationClick,
  lastNotification,
}) => {
  useEffect(() => {
    const unreadCount = notifications.filter(n => !n.isRead).length;
    if (unreadCount > 0) {
      document.title = `(${unreadCount}) New Notifications - AuctionGems`;
    } else {
      document.title = 'AuctionGems';
    }
  }, [notifications]);

  const renderNotification = (notification: NotificationType) => {
    switch (notification.type) {
      case 'message':
        return (
          <div
            key={notification.id}
            className={`
              p-4 border-b border-gray-100 
              hover:bg-blue-50 cursor-pointer 
              flex items-start space-x-3 
              group relative
              ${!notification.isRead ? 'bg-blue-25' : ''}
            `}
            onClick={() => {
              onMarkAsRead(notification.id);
              onNotificationClick?.(notification);
            }}
          >
            {/* Read/Unread Indicator */}
            {!notification.isRead && (
              <div className="absolute left-1 top-1/2 -translate-y-1/2 
                w-2 h-2 bg-blue-500 rounded-full 
                animate-pulse group-hover:animate-none"
              />
            )}

            <ProfileAvatar 
              name={notification.senderName} 
              avatar={notification.senderAvatar} 
            />
            <div className="flex-1">
              <div className="flex justify-between items-start">
                <span className="font-medium text-gray-800">
                  {notification.senderName || 'Unknown Sender'}
                </span>
                <span className="text-xs text-gray-500">
                  {new Date(notification.timestamp).toLocaleTimeString([], {
                    hour: '2-digit',
                    minute: '2-digit'
                  })}
                </span>
              </div>
              <p className="text-sm text-gray-600 mt-1 line-clamp-2">
                {notification.message}
              </p>
            </div>
          </div>
        );

      case 'order':
        return (
          <div
            key={notification.id}
            className={`
              p-4 border-b border-gray-100 
              hover:bg-green-50 cursor-pointer 
              group relative
              ${!notification.isRead ? 'bg-green-25' : ''}
            `}
            onClick={() => {
              onMarkAsRead(notification.id);
              onNotificationClick?.(notification);
            }}
          >
            {/* Read/Unread Indicator */}
            {!notification.isRead && (
              <div className="absolute left-1 top-1/2 -translate-y-1/2 
                w-2 h-2 bg-green-500 rounded-full 
                animate-pulse group-hover:animate-none"
              />
            )}

            <div className="flex justify-between items-start">
              <span className="font-medium text-gray-800">
                New Order
              </span>
              <span className="text-xs text-gray-500">
                {new Date(notification.timestamp).toLocaleTimeString([], {
                  hour: '2-digit',
                  minute: '2-digit'
                })}
              </span>
            </div>
            <div className="text-sm text-gray-600 mt-1">
              <p className="font-medium">{notification.productName}</p>
              <p className="text-green-600">Amount: ${notification.price.toFixed(2)}</p>
            </div>
          </div>
        );
    }
  };

  return (
    <div className="absolute right-0 mt-2 w-96 bg-white rounded-lg shadow-xl z-50 border border-gray-200 overflow-hidden">
      {/* Header */}
      <div className="p-4 border-b border-gray-200 flex justify-between items-center bg-gray-50">
        <div className="flex items-center space-x-2">
          <Bell className="w-5 h-5 text-gray-600" />
          <h3 className="font-semibold text-gray-800">Notifications</h3>
        </div>
        <div className="flex space-x-2">
          <button
            onClick={onMarkAllAsRead}
            className="text-sm text-blue-600 hover:text-blue-800 transition-colors flex items-center"
          >
            <Check className="w-4 h-4 mr-1" />
            Mark all
          </button>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 transition-colors"
          >
            ✕
          </button>
        </div>
      </div>

      {/* Notifications Container with Custom Scrollbar */}
      <div 
        className="
          max-h-96 overflow-y-auto
          scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100
          hover:scrollbar-thumb-gray-400
          transition-all duration-300 ease-in-out
          scroll-smooth
        "
      >
        {notifications.length > 0 ? (
          notifications
            .sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime())
            .map(renderNotification)
        ) : (
          <div className="p-4 text-center text-gray-500 flex flex-col items-center justify-center space-y-2">
            <Bell className="w-12 h-12 text-gray-300" />
            <p>No new notifications</p>
          </div>
        )}
      </div>

      {/* Clear All Button */}
      {notifications.length > 0 && (
        <div className="p-2 border-t border-gray-200 bg-gray-50">
          <button
            onClick={onClear}
            className="w-full text-sm text-red-600 hover:text-red-800 p-2 text-center transition-colors flex items-center justify-center"
          >
            <Bell className="w-4 h-4 mr-2 text-red-600" />
            Clear all notifications
          </button>
        </div>
      )}

      {/* Last Notification */}
      {lastNotification && (
        <div className="p-3 bg-blue-50 border-t flex items-start space-x-3">
          <ProfileAvatar 
            name={lastNotification.senderName} 
            avatar={lastNotification.senderAvatar} 
            size={32}
          />
          <div>
            <p className="text-sm">
              <strong>{lastNotification.senderName || 'Unknown Sender'}</strong>: {lastNotification.message}
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default MessageNotificationDropdown;