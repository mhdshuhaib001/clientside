import { useEffect, useState, useCallback } from 'react';
import { io, Socket } from 'socket.io-client';
import { Message } from '../../interface/chatTypes/chat';

const SOCKET_SERVER_URL = import.meta.env.VITE_SOCKET_URL;


export const useSocket = () => {
  const [socket, setSocket] = useState<Socket | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [typingUsers, setTypingUsers] = useState<{ [key: string]: boolean }>({});
  const [onlineUsers, setOnlineUsers] = useState<string[]>([]);
  const [notifications, setNotifications] = useState<any[]>([]);
  const [unreadNotificationsCount, setUnreadNotificationsCount] = useState(0);

  useEffect(() => {
    const newSocket = io(SOCKET_SERVER_URL, {
      path: "/api/socket.io",
      withCredentials: true,
      transports: ['websocket', 'polling']
    });
    newSocket.on('connect', () => {
      console.log('Socket connected....');
      
    });


    
    newSocket.on('user_online', (userId: string) => {
      setOnlineUsers((prev) => [...new Set([...prev, userId])]);
    });

    newSocket.on('user_offline', (userId: string) => {
      setOnlineUsers((prev) => prev.filter((id) => id !== userId));
    });



    
    // New message notification listener
    // newSocket.on('new_message_notification', (notification) => {
    //   console.log('Frontend received notification:', notification);
    //   setUnreadNotificationsCount((prev) => prev + 1);
    //   setNotifications((prev) => [...prev, { ...notification, isRead: false }]);
    //   console.log('haloooo',unreadNotificationsCount,notifications)

    // });



    newSocket.on('receive_message', (newMessage: Message) => {
      console.log('Received message in frontend:', newMessage);
      setMessages((prevMessages) => [...prevMessages, newMessage]);
    });

    newSocket.on('typing', ({ room }) => {
      setTypingUsers((prev) => {
        return { ...prev, [room]: true };
      });
    });

    newSocket.on('stop_typing', ({ room }) => {
      setTypingUsers((prev) => {
        return { ...prev, [room]: false };
      });
    });

    setSocket(newSocket);

    return () => {
      newSocket.disconnect();
    };
  }, []);

  const setUserOnline = useCallback(
    (userId: string) => {
      socket?.emit('user_connected', userId);
    },
    [socket],
  );

  const sendMessage = useCallback(
    (message: Message) => {
      socket?.emit('send_message', message);
    },
    [socket],
  );

  const joinRoom = useCallback(
    (userId: string, receiverId: string) => {
      socket?.emit('join chat', userId, receiverId);
    },
    [socket],
  );

  const handleTyping = useCallback(
    (userId: string, room: string, isTyping: boolean) => {
      if (isTyping) {
        socket?.emit('typing', { userId, room });
      } else {
        socket?.emit('stop_typing', { userId, room });
      }
    },
    [socket],
  );

  const markNotificationAsRead = (notificationId: string) => {
    setNotifications((prev) =>
      prev.map((notification) =>
        notification.id === notificationId ? { ...notification, isRead: true } : notification,
      ),
    );
  };
  const resetUnreadCount = () => {
    setUnreadNotificationsCount(0);
  };

  return {
    socket,
    messages,
    sendMessage,
    joinRoom,
    typingUsers,
    handleTyping,
    setUserOnline,
    onlineUsers,
    notifications,
    markNotificationAsRead,
    unreadNotificationsCount,
    resetUnreadCount
  };
};
