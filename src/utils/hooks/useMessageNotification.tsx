// import { useState, useEffect } from 'react';
// import { RootState } from '../../store/Store';
// import { useSelector } from 'react-redux';
// import { toast } from 'react-hot-toast';
// import SocketConnection from '../../utils/socket';
// interface BaseNotification {
//   id: string;
//   timestamp: string;
//   isRead: boolean;
// }

// export interface MessageNotification extends BaseNotification {
//   type: 'message';
//   senderId: string;
//   senderName: string;
//   message: string;
// }

// interface OrderNotification extends BaseNotification {
//   type: 'order';
//   sellerId: string;
//   orderId: string;
//   productName: string;
//   buyerId: string;
//   price: number;
// }

// export const useMessageNotification = () => {
//   const [socket] = useState(SocketConnection.getInstance());
//   const [notifications, setNotifications] = useState<MessageNotification[]>([]);
//   const [unreadCount, setUnreadCount] = useState(0);
//   const sellerId = useSelector((state: RootState) => state.Seller.sellerId);
//   const currentUserId = useSelector((state: RootState) => state.User._id);
//   const userRole = useSelector((state: RootState) => state.User.role);
//   useEffect(() => {
//     if (!socket) {
//       console.error('❌ Socket is not initialized');
//       return;
//     }
//     console.log('Socket Initialization Details:', {
//       socket: !!socket,
//       currentUserId,
//       sellerId,
//       userRole,
//     });
//     socket.onAny((eventName, ...args) => {
//       console.log('🔍 Received Socket Event:', eventName, args);
//     });

//     const handleNewMessageNotification = (notification: any) => {
//       console.group('🔔 New Message Notification');
//       console.log('Raw Notification:', notification);
//       console.log('Current User Details:', {
//         currentUserId,
//         sellerId,
//         userRole,
//         receiverId: notification.receiverId,
//       });
    
//       // Enhanced notification reception check
//       const shouldReceiveNotification = 
//         (userRole === 'user' && notification.receiverId === currentUserId) ||
//         (userRole === 'seller' && notification.receiverId === sellerId) ||
//         notification.receiverId === currentUserId;
    
//       console.log('Notification Reception Check:', {
//         shouldReceiveNotification,
//         userRole,
//         receiverId: notification.receiverId,
//         currentUserId,
//         sellerId,
//       });
    
//       if (shouldReceiveNotification) {
//         const newNotification: MessageNotification = {
//           ...notification,
//           timestamp: notification.timestamp || new Date().toISOString(),
//           isRead: false,
//         };
    
//         setNotifications((prev) => {
//           const exists = prev.some(
//             (n) => n.senderId === newNotification.senderId && 
//                    n.message === newNotification.message
//           );
//           return exists ? prev : [...prev, newNotification];
//         });
    
//         setUnreadCount((prev) => prev + 1);
    
//         // Play notification sound
//         const audio = new Audio('/mp3/notification-sound.mp3');
//         audio.play().catch((e) => console.log('Audio play failed:', e));
    
//         // Show toast
// console.log('new=================================',newNotification)
//         toast.success(`New message from ${newNotification.senderName}`, {
//           position: 'top-right',
//         });
//       }
//     };

    


//     const handleNewOrder = (order: any) => {
//       if (order.sellerId === sellerId) {
//         console.log('this is new orderNotification came???');
//         const newNotification: OrderNotification = {
//           id: Date.now().toString(),
//           type: 'order',
//           sellerId: order.sellerId,
//           orderId: order.orderId,
//           productName: order.productName,
//           buyerId: order.buyerId,
//           price: order.price,
//           timestamp: new Date().toISOString(),
//           isRead: false,
//         };
//         setNotifications((prev) => [...prev, newNotification as any]);
//         setUnreadCount((prev) => prev + 1);

//         // Play notification sound
//         const audio = new Audio('/mp3/notification-sound.mp3');
//         audio.play().catch((e) => console.log('Audio play failed:', e));
//       }
//     };

//     // socket.on('receive_message', handleNewMessage);
//     console.log('Setting up socket event listeners');
   
//     socket.on("new_message_notification", handleNewMessageNotification);

//     if (socket.connected) {
//       socket.emit('user_connected', currentUserId);
//     } else {
//       socket.on('connect', () => {
//         socket.emit('user_connected', currentUserId);
//       });
//     }
//     socket.on('new_order_notification', handleNewOrder);

//     return () => {
//       // socket.off('receive_message', handleNewMessage);
//       socket.off('new_message_notification', handleNewMessageNotification);
//       socket.off('new_order_notification', handleNewOrder);
//     };
//   }, [socket, currentUserId, userRole, sellerId]);

//   const markAsRead = (notificationId: string) => {
//     setNotifications((prev) =>
//       prev.map((notification) =>
//         notification.id === notificationId ? { ...notification, isRead: true } : notification,
//       ),
//     );
//     setUnreadCount((prev) => Math.max(0, prev - 1));
//   };

//   const markAllAsRead = () => {
//     setNotifications((prev) => prev.map((notification) => ({ ...notification, isRead: true })));
//     setUnreadCount(0);
//   };

//   const clearNotifications = () => {
//     setNotifications([]);
//     setUnreadCount(0);
//   };
//   return {
//     notifications,
//     unreadCount,
//     markAsRead,
//     markAllAsRead,
//     clearNotifications,
//   };
// };
import { useState, useEffect } from 'react';
import { RootState } from '../../store/Store';
import { useSelector } from 'react-redux';
import { toast } from 'react-hot-toast';
import SocketConnection from '../../utils/socket';

interface BaseNotification {
  id: string;
  timestamp: string;
  isRead: boolean;
}

export interface MessageNotification extends BaseNotification {
  type: 'message';
  senderId: string;
  senderName: string;
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

export const useMessageNotification = () => {
  const [socket] = useState(SocketConnection.getInstance());
  const [notifications, setNotifications] = useState<MessageNotification[]>(() => {
    // Initialize notifications from localStorage on first render
    const storedNotifications = localStorage.getItem('notifications');
    return storedNotifications ? JSON.parse(storedNotifications) : [];
  });
  const [unreadCount, setUnreadCount] = useState(() => {
    // Initialize unread count from localStorage
    const storedUnreadCount = localStorage.getItem('unreadCount');
    return storedUnreadCount ? parseInt(storedUnreadCount, 10) : 0;
  });

  const sellerId = useSelector((state: RootState) => state.Seller.sellerId);
  const currentUserId = useSelector((state: RootState) => state.User._id);
  const userRole = useSelector((state: RootState) => state.User.role);

  // Update localStorage whenever notifications or unreadCount change
  useEffect(() => {
    localStorage.setItem('notifications', JSON.stringify(notifications));
    localStorage.setItem('unreadCount', unreadCount.toString());
  }, [notifications, unreadCount]);

  useEffect(() => {
    if (!socket) {
      console.error('❌ Socket is not initialized');
      return;
    }

    const handleNewMessageNotification = (notification: any) => {
      const shouldReceiveNotification = 
        (userRole === 'user' && notification.receiverId === currentUserId) ||
        (userRole === 'seller' && notification.receiverId === sellerId) ||
        notification.receiverId === currentUserId;
    
      if (shouldReceiveNotification) {
        const newNotification: MessageNotification = {
          ...notification,
          timestamp: notification.timestamp || new Date().toISOString(),
          isRead: false,
        };
    
        setNotifications((prev) => {
          const exists = prev.some(
            (n) => n.senderId === newNotification.senderId && 
                   n.message === newNotification.message
          );
          return exists ? prev : [...prev, newNotification];
        });
    
        setUnreadCount((prev) => prev + 1);
    
        // Play notification sound
        const audio = new Audio('/mp3/notification-sound.mp3');
        audio.play().catch((e) => console.log('Audio play failed:', e));
    
        toast.success(`New message from ${newNotification.senderName}`, {
          position: 'top-right',
        });
      }
    };

    const handleNewOrder = (order: any) => {
      if (order.sellerId === sellerId) {
        const newNotification: OrderNotification = {
          id: Date.now().toString(),
          type: 'order',
          sellerId: order.sellerId,
          orderId: order.orderId,
          productName: order.productName,
          buyerId: order.buyerId,
          price: order.price,
          timestamp: new Date().toISOString(),
          isRead: false,
        };
        setNotifications((prev) => [...prev, newNotification as any]);
        setUnreadCount((prev) => prev + 1);

        // Play notification sound
        const audio = new Audio('/mp3/notification-sound.mp3');
        audio.play().catch((e) => console.log('Audio play failed:', e));
      }
    };

    socket.on("new_message_notification", handleNewMessageNotification);

    if (socket.connected) {
      socket.emit('user_connected', currentUserId);
    } else {
      socket.on('connect', () => {
        socket.emit('user_connected', currentUserId);
      });
    }
    socket.on('new_order_notification', handleNewOrder);

    return () => {
      socket.off('new_message_notification', handleNewMessageNotification);
      socket.off('new_order_notification', handleNewOrder);
    };
  }, [socket, currentUserId, userRole, sellerId]);

  const markAsRead = (notificationId: string) => {
    setNotifications((prev) =>
      prev.map((notification) =>
        notification.id === notificationId ? { ...notification, isRead: true } : notification,
      ),
    );
    setUnreadCount((prev) => Math.max(0, prev - 1));
  };

  const markAllAsRead = () => {
    setNotifications((prev) => prev.map((notification) => ({ ...notification, isRead: true })));
    setUnreadCount(0);
  };

  const clearNotifications = () => {
    setNotifications([]);
    setUnreadCount(0);
    // Clear localStorage when clearing notifications
    localStorage.removeItem('notifications');
    localStorage.removeItem('unreadCount');
  };

  return {
    notifications,
    unreadCount,
    markAsRead,
    markAllAsRead,
    clearNotifications,
  };
};