// import { useState, useEffect } from 'react';
// import { Socket } from 'socket.io-client';
// import { RootState } from '../../store/Store'
// import { useSelector } from 'react-redux'; 
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

// export const useMessageNotification = (socket: Socket | null, currentUserId: string) => {
//   const [notifications, setNotifications] = useState<MessageNotification[]>([]);
//   const [unreadCount, setUnreadCount] = useState(0);
//   const sellerId = useSelector((state: RootState) => state.Seller.sellerId); 

//   useEffect(() => {
//     if (!socket) return;
//     const handleNewMessage = (message: any) => {
//       if (message.receiverId === currentUserId) {
//         const newNotification: MessageNotification = {
//           id: Date.now().toString(),
//           senderId: message.senderId,
//           senderName: message.senderName || 'Unknown User',
//           message: message.message,
//           timestamp: new Date().toISOString(),
//           isRead: false,
//           type: 'message'
//         };
//         setNotifications((prev) => [...prev, newNotification]);
//         setUnreadCount((prev) => prev + 1);
//       }
//     };


//     const handleNewNotification = (notification: MessageNotification) => {
//       console.log(notification,'this is the notification ................................')
//       setNotifications(prev => [...prev, notification]);
//       setUnreadCount(prev => prev + 1);
      
//       // Play notification sound
//       const audio = new Audio('/mp3/notification-sound.mp3');
//       audio.play().catch(e => console.log('Audio play failed:', e));
//     };



//     const handleNewOrder = (order: any) => {
//       if (order.sellerId === sellerId) {
//         console.log('this is new orderNotification came???')
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

//     socket.on('receive_message', handleNewMessage);
//     socket.on('new_message_notification', handleNewNotification);
//     socket.on('new_order_notification', handleNewOrder);

//     return () => {
//       socket.off('receive_message', handleNewMessage);
//       socket.off('new_message_notification', handleNewNotification);
//       socket.off('new_order_notification', handleNewOrder);

//     };
//   }, [socket, currentUserId]);

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
import { Socket } from 'socket.io-client';
import { RootState } from '../../store/Store'
import { useSelector } from 'react-redux'; 
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

export const useMessageNotification = (socket: Socket | null, currentUserId: string) => {
  const [notifications, setNotifications] = useState<MessageNotification[]>([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const sellerId = useSelector((state: RootState) => state.Seller.sellerId); 
  const userRole = useSelector((state: RootState) => state.User.role);
  useEffect(() => {
    if (!socket) return;
    const handleNewMessage = (message: any) => {
      // Check if the current user should receive this notification
      const shouldReceiveNotification = 
        (userRole === 'user' && message.receiverId === currentUserId) ||
        (userRole === 'seller' && message.receiverId === sellerId);
        console.log('🎯 Should Receive Notification:', {
          shouldReceiveNotification,
          condition1: userRole === 'user' && message.receiverId === currentUserId,
          condition2: userRole === 'seller' && message.receiverId === sellerId
        });
      if (shouldReceiveNotification) {
        const newNotification: MessageNotification = {
          id: Date.now().toString(),
          senderId: message.senderId,
          senderName: message.senderName || 'Unknown User',
          message: message.message,
          timestamp: new Date().toISOString(),
          isRead: false,
          type: 'message' 
        };

        setNotifications(prev => [...prev, newNotification]);
        setUnreadCount(prev => prev + 1);

        // Play notification sound
        const audio = new Audio('/mp3/notification-sound.mp3');
        audio.play().catch(e => console.log('Audio play failed:', e));
      }
    };


    // const handleNewNotification = (notification: MessageNotification) => {
    //   console.log(notification,'this is the notification ................................')
    //   setNotifications(prev => [...prev, notification]);
    //   setUnreadCount(prev => prev + 1);
      
    //   // Play notification sound
    //   const audio = new Audio('/mp3/notification-sound.mp3');
    //   audio.play().catch(e => console.log('Audio play failed:', e));
    // };



    const handleNewOrder = (order: any) => {
      if (order.sellerId === sellerId) {
        console.log('this is new orderNotification came???')
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

    socket.on('receive_message', handleNewMessage);
    socket.on('new_message_notification', handleNewMessage);
    socket.on('new_order_notification', handleNewOrder);

    return () => {
      socket.off('receive_message', handleNewMessage);
      socket.off('new_message_notification', handleNewMessage);
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
  };
  return {
    notifications,
    unreadCount,
    markAsRead,
    markAllAsRead,
    clearNotifications,
  };
};
