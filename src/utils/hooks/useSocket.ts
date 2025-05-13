import { useEffect, useState, useCallback } from 'react';
import { io, Socket } from 'socket.io-client';
import { Message } from '../../interface/chatTypes/chat';

// const SOCKET_SERVER_URL = import.meta.env.VITE_SOCKET_URL;


export const useSocket = () => {
  const [socket, setSocket] = useState<Socket | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [typingUsers, setTypingUsers] = useState<{ [key: string]: boolean }>({});
  const [onlineUsers, setOnlineUsers] = useState<{
    id: string;
    role?: string;
  }[]>([]);
  const [notifications, setNotifications] = useState<any[]>([]);
  const [unreadNotificationsCount, setUnreadNotificationsCount] = useState(0);

  useEffect(() => {
    const newSocket = io(import.meta.env.VITE_SERVER_URL, {
      path: "/socket.io",
      withCredentials: true,
      // transports: ['websocket', 'polling']
    });
    
    newSocket.on('connect', () => {
      console.log('Socket connected....');
    });

    newSocket.on('user_online', (userData: { userId: string; role?: string }) => {
      console.log('User online event received:', userData);
      setOnlineUsers((prev) => {
        const filteredUsers = prev.filter(user => user.id !== userData.userId);
        const updatedUsers = [...filteredUsers, { 
          id: userData.userId, 
          role: userData.role 
        }];
        console.log('Updated online users:', updatedUsers);
        return updatedUsers;
      });
    });

    newSocket.on('user_offline', (userId: string) => {
      setOnlineUsers((prev) => prev.filter((user) => user.id !== userId));
    });

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

  // New message notification listener
    newSocket.on('new_message_notification', (notification) => {
      console.log('Frontend received notification:', notification);
      setUnreadNotificationsCount((prev) => prev + 1);
      setNotifications((prev) => [...prev, { ...notification, isRead: false }]);
      console.log('haloooo',unreadNotificationsCount,notifications)

    });

    setSocket(newSocket);

    return () => {
      newSocket.disconnect();
    };
  }, []);

  const setUserOnline = useCallback(
    (userId: string, userRole?: string) => {
      socket?.emit('user_connected', { 
        userId, 
        role: userRole 
      });
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
