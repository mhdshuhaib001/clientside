import React, { useCallback, useEffect, useState } from 'react';
import { useSocket } from '../../utils/hooks/useSocket';
import { useFetchAllUsersQuery } from '../../services/apis/adminApi';
import { useFetchAllSellerQuery } from '../../services/apis/sellerApi';
import { useSelector } from 'react-redux';
import { RootState } from '../../store/Store';
import { Message, Contact } from '../../interface/chatTypes/chat';
import { useGetMessagesQuery } from '../../services/apis/chatApi';
import VideoChat from '../../components/User/VideoChat';
import ContactList from './ContactList';
import ChatWindow from './ChatWindow';

const getInitials = (name: string) => {
  if (!name) return '';
  const nameParts = name.split(' ');
  return nameParts.length > 1 ? nameParts[0][0] + nameParts[1][0] : name[0];
};

const Chat: React.FC = () => {
  const sellerId = useSelector((state: RootState) => state.Seller.sellerId);
  const User = useSelector((state: RootState) => state.User);
  const userRole =User.role
  const userId= User._id


  const { data: sellerContacts } = useFetchAllSellerQuery();
  const { data: userContacts } = useFetchAllUsersQuery();
  const [selectedChat, setSelectedChat] = useState<Contact | null>(null);
  const [newMessage, setNewMessage] = useState('');
  const [showVideoCall, setShowVideoCall] = useState<boolean>(false);
  const [searchQuery, setSearchQuery] = useState('');

  const [combinedMessages, setCombinedMessages] = useState<Message[]>([]);
  const currentUserName = useSelector((state: RootState) => 
    userRole === 'seller' 
      ? state.Seller.companyName  
      : state.User.name          
  );
  const {
    messages: socketMessages,
    sendMessage,
    joinRoom,
    typingUsers,
    handleTyping,
    setUserOnline,
    onlineUsers,
    notifications, 
    markNotificationAsRead 
  } = useSocket();

  const [typingTimeout, setTypingTimeout] = useState<NodeJS.Timeout | null>(null);
  const currentUserId = sellerId ? sellerId : userId;

  useEffect(() => {
    if (currentUserId) {
      setUserOnline(currentUserId, userRole);
    }
  }, [currentUserId, userRole, setUserOnline]);

  const contacts: Contact[] = userRole === 'user' 
  ? (
    // If user is a user, show seller contacts
    sellerContacts?.map((contact: any) => ({
      id: contact._id,
      name: contact.companyName,
      avatar: contact.profile || '',
      lastMessage: 'No messages yet',
      online: onlineUsers.some(user => user.id === contact._id && user.role === 'seller'),
      role: 'seller'
    })) || []
  ) 
  : (
    // If user is not a user (likely an admin or seller), show user contacts
    userContacts
      ?.filter((contact: any) => contact.role === 'user')
      .map((contact: any) => ({
        id: contact._id,
        name: contact.name,
        avatar: contact.profileImage || '',
        lastMessage: 'No messages yet',
        online: onlineUsers.some(user => user.id === contact._id && user.role === 'user'),
        role: 'user'
      })) || []
  );
  // Filter contacts based on search query
  const filteredContacts = contacts.filter((contact) =>
    contact.name.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  const { data: messagesData } = useGetMessagesQuery({
    senderId: currentUserId,
    receiverId: selectedChat?.id || '',
  });

  useEffect(() => {
    if (selectedChat && currentUserId) {
      joinRoom(currentUserId, selectedChat.id);
    }
  }, [selectedChat, currentUserId, joinRoom]);

  useEffect(() => {
    setCombinedMessages([...(messagesData || []), ...socketMessages]);
  }, [messagesData, socketMessages]);

  const handleVideoCall = () => {
    if (selectedChat) {
      setShowVideoCall(true);
    }
  };
  const getRoomId = (user1: string, user2: string) => {
    return [user1, user2].sort().join('-');
  };

  useEffect(() => {
    if (selectedChat && currentUserId) {
      const roomId = getRoomId(currentUserId, selectedChat.id);
      joinRoom(currentUserId, roomId);
    }
  }, [selectedChat, currentUserId, joinRoom]);

  useEffect(() => {
    return () => {
      if (typingTimeout) {
        clearTimeout(typingTimeout);
      }
    };
  }, [typingTimeout]);

  useEffect(() => {
    if (selectedChat) {
      handleStopTyping();
    }
  }, [selectedChat]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewMessage(e.target.value);

    if (selectedChat && e.target.value) {
      const roomId = getRoomId(currentUserId, selectedChat.id);

      if (typingTimeout) {
        clearTimeout(typingTimeout);
      }

      handleTyping(currentUserId, roomId, true);

      const newTimeout = setTimeout(() => {
        handleTyping(currentUserId, roomId, false);
      }, 2000);

      setTypingTimeout(newTimeout);
    } else {
      handleStopTyping();
    }
  };

  const handleStopTyping = () => {
    if (selectedChat) {
      const roomId = getRoomId(currentUserId, selectedChat.id);
      handleTyping(currentUserId, roomId, false);

      if (typingTimeout) {
        clearTimeout(typingTimeout);
        setTypingTimeout(null);
      }
    }
  };

  const handleEndCall = () => {
    setShowVideoCall(false);
  };

  const handleSendMessage = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!newMessage || !selectedChat) return;

    const message = {
      senderId: currentUserId,
      receiverId: selectedChat.id,
      senderName: currentUserName,
      message: newMessage,
      timestamp: new Date().toISOString(),
      senderRole: userRole,
    };

    sendMessage(message);
    setNewMessage('');
    handleStopTyping();
  };

  const getRoomTypingStatus = useCallback(() => {
    if (!selectedChat || !currentUserId) return false;
    const roomId = getRoomId(currentUserId, selectedChat.id);
    return typingUsers[roomId];
  }, [selectedChat, currentUserId, typingUsers]);



  return (
    <div className="flex h-screen bg-main-bg">
      <div className="w-full md:w-1/3 lg:w-1/4">
        <ContactList
          contacts={filteredContacts}
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          selectedChat={selectedChat}
          setSelectedChat={setSelectedChat}
      />
      </div>

      <div className="hidden md:flex flex-col w-2/3 lg:w-3/4">
        {showVideoCall && selectedChat ? (
          <VideoChat roomID={selectedChat.id} userID={currentUserId} onEndCall={handleEndCall} />
        ) : (
          <ChatWindow
            selectedChat={selectedChat}
            combinedMessages={combinedMessages}
            currentUserId={currentUserId}
            newMessage={newMessage}
            setNewMessage={setNewMessage}
            handleSendMessage={handleSendMessage}
            handleVideoCall={handleVideoCall}
            handleInputChange={handleInputChange}
            handleStopTyping={handleStopTyping}
            getRoomTypingStatus={getRoomTypingStatus}
          />
        )}
      </div>

      {/* Mobile view for selected chat */}
      {selectedChat && (
        <div className="fixed inset-0 z-50 md:hidden">
          <div className="h-full bg-main-bg">
            <button
              className="absolute top-4 left-4 z-10 p-2 bg-amber-100 rounded-full"
              onClick={() => setSelectedChat(null)}
            >
              &larr;
            </button>
            <ChatWindow
              selectedChat={selectedChat}
              combinedMessages={combinedMessages}
              currentUserId={currentUserId}
              newMessage={newMessage}
              setNewMessage={setNewMessage}
              handleSendMessage={handleSendMessage}
              handleVideoCall={handleVideoCall}
              handleInputChange={handleInputChange}
              handleStopTyping={handleStopTyping}
              getRoomTypingStatus={getRoomTypingStatus}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default Chat;

