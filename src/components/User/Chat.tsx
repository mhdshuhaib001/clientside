// import React, { useCallback, useEffect, useState } from 'react';
// import { Avatar, Input } from '@nextui-org/react';
// import { MoreVertical, Send, Video, Search } from 'lucide-react';
// import { useSocket } from '../../utils/hooks/useSocket';
// import { useFetchAllUsersQuery } from '../../services/apis/adminApi';
// import { useFetchAllSellerQuery } from '../../services/apis/sellerApi';
// import { useSelector } from 'react-redux';
// import { RootState } from '../../store/Store';
// import { Message, Contact } from '../../interface/chatTypes/chat';
// import { useGetMessagesQuery } from '../../services/apis/chatApi';
// import VideoChat from '../../components/User/VideoChat';

// const getInitials = (name: string) => {
//   if (!name) return '';
//   const nameParts = name.split(' ');
//   return nameParts.length > 1 ? nameParts[0][0] + nameParts[1][0] : name[0];
// };

// const Chat: React.FC = () => {
//   const sellerId = useSelector((state: RootState) => state.Seller.sellerId);
//   const userId = useSelector((state: RootState) => state.User._id);
//   const userRole = useSelector((state: RootState) => state.User.role);
//   const { data: sellerContacts } = useFetchAllSellerQuery();
//   const { data: userContacts } = useFetchAllUsersQuery();
//   const [selectedChat, setSelectedChat] = useState<Contact | null>(null);
//   const [newMessage, setNewMessage] = useState('');
//   const [showVideoCall, setShowVideoCall] = useState<boolean>(false);
//   const [searchQuery, setSearchQuery] = useState('');

//   const [combinedMessages, setCombinedMessages] = useState<Message[]>([]);

//   const {
//     messages: socketMessages,
//     sendMessage,
//     joinRoom,
//     typingUsers,
//     handleTyping,
//     setUserOnline,
//     onlineUsers,
//     notifications, 
//     markNotificationAsRead 
//   } = useSocket();

//   const [typingTimeout, setTypingTimeout] = useState<NodeJS.Timeout | null>(null);
//   const currentUserId = sellerId ? sellerId : userId;

//   useEffect(() => {
//     if (currentUserId) {
//       setUserOnline(currentUserId);
//     }
//   }, [currentUserId, setUserOnline]);

//   const contacts: Contact[] =
//     userRole === 'user'
//       ? sellerContacts?.map((contact: any) => ({
//           id: contact._id,
//           name: contact.companyName,
//           avatar: contact.profile || '',
//           lastMessage: 'No messages yet',
//           online: onlineUsers.includes(contact._id),
//         })) || []
//       : userContacts
//           ?.filter((contact: any) => contact.role === 'user')
//           .map((contact: any) => ({
//             id: contact._id,
//             name: contact.name,
//             avatar: contact.profileImage || '',
//             lastMessage: 'No messages yet',
//             online: onlineUsers.includes(contact._id),
//           })) || [];

//   // Filter contacts based on search query
//   const filteredContacts = contacts.filter((contact) =>
//     contact.name.toLowerCase().includes(searchQuery.toLowerCase()),
//   );

//   const { data: messagesData } = useGetMessagesQuery({
//     senderId: currentUserId,
//     receiverId: selectedChat?.id || '',
//   });

//   useEffect(() => {
//     if (selectedChat && currentUserId) {
//       joinRoom(currentUserId, selectedChat.id);
//     }
//   }, [selectedChat, currentUserId, joinRoom]);

//   useEffect(() => {
//     setCombinedMessages([...(messagesData || []), ...socketMessages]);
//   }, [messagesData, socketMessages]);

//   const handleVideoCall = () => {
//     if (selectedChat) {
//       setShowVideoCall(true);
//     }
//   };
//   const getRoomId = (user1: string, user2: string) => {
//     return [user1, user2].sort().join('-');
//   };

//   useEffect(() => {
//     if (selectedChat && currentUserId) {
//       const roomId = getRoomId(currentUserId, selectedChat.id);
//       joinRoom(currentUserId, roomId);
//     }
//   }, [selectedChat, currentUserId, joinRoom]);

//   useEffect(() => {
//     return () => {
//       if (typingTimeout) {
//         clearTimeout(typingTimeout);
//       }
//     };
//   }, [typingTimeout]);

//   useEffect(() => {
//     if (selectedChat) {
//       handleStopTyping();
//     }
//   }, [selectedChat]);

//   const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     setNewMessage(e.target.value);

//     if (selectedChat && e.target.value) {
//       const roomId = getRoomId(currentUserId, selectedChat.id);

//       if (typingTimeout) {
//         clearTimeout(typingTimeout);
//       }

//       handleTyping(currentUserId, roomId, true);

//       const newTimeout = setTimeout(() => {
//         handleTyping(currentUserId, roomId, false);
//       }, 2000);

//       setTypingTimeout(newTimeout);
//     } else {
//       handleStopTyping();
//     }
//   };

//   const handleStopTyping = () => {
//     if (selectedChat) {
//       const roomId = getRoomId(currentUserId, selectedChat.id);
//       handleTyping(currentUserId, roomId, false);

//       if (typingTimeout) {
//         clearTimeout(typingTimeout);
//         setTypingTimeout(null);
//       }
//     }
//   };

//   const handleEndCall = () => {
//     setShowVideoCall(false);
//   };

//   const handleSendMessage = async (e: React.FormEvent<HTMLFormElement>) => {
//     e.preventDefault();
//     if (!newMessage || !selectedChat) return;

//     const message = {
//       senderId: currentUserId,
//       receiverId: selectedChat.id,
//       message: newMessage,
//       timestamp: new Date().toISOString(),
//       senderRole: userRole,
//     };

//     sendMessage(message);
//     setNewMessage('');
//     handleStopTyping();
//   };

//   const getRoomTypingStatus = useCallback(() => {
//     if (!selectedChat || !currentUserId) return false;
//     const roomId = getRoomId(currentUserId, selectedChat.id);
//     return typingUsers[roomId];
//   }, [selectedChat, currentUserId, typingUsers]);



//   const renderNotifications = () => (
//     <div className="notification-container">
//       {notifications
//         .filter(notification => !notification.isRead)
//         .map(notification => (
//           <div 
//             key={notification.id} 
//             className="notification unread"
//             onClick={() => markNotificationAsRead(notification.id)}
//           >
//             <p>{notification.senderName}: {notification.message}</p>
//             <span className="timestamp">
//               {new Date(notification.timestamp).toLocaleTimeString()}
//             </span>
//           </div>
//         ))
//       }
//     </div>
//   );

//   return (
//     <div className="flex h-screen bg-main-bg">
//       <div className="w-full sm:w-1/3 lg:w-1/4 bg-amber-100 border-r border-gray-200">
//         <div className="p-4 border-b border-amber-200">
//           <h2 className="text-xl font-semibold text-gray-800">Chats</h2>
//           {/* Search Input */}
//           <div className="mt-4 relative">
//             <Input
//               className="w-full bg-white"
//               placeholder="Search chats..."
//               value={searchQuery}
//               onChange={(e) => setSearchQuery(e.target.value)}
//               startContent={<Search className="text-gray-400" size={18} />}
//             />
//           </div>
//           {sellerContacts && (
//             <p className="text-sm text-gray-600 mt-2">
//               {sellerContacts.length} seller{sellerContacts.length !== 1 ? 's' : ''} available
//             </p>
//           )}
//         </div>
//         <div className="overflow-y-auto h-[calc(100vh-140px)]">
//           {filteredContacts.map((contact: Contact) => (
//             <div
//               key={contact.id}
//               className={`flex items-center p-4 relative rounded-sm hover:bg-amber-200 border border-amber-200 cursor-pointer ${
//                 selectedChat?.id === contact.id ? 'bg-amber-200' : ''
//               }`}
//               onClick={() => setSelectedChat(contact)}
//             >
//               <div className="relative">
//                 <Avatar
//                   size="lg"
//                   src={contact.avatar || undefined}
//                   alt={contact.name || 'No Name'}
//                   className="w-10 h-10 rounded-full"
//                   isBordered
//                 >
//                   {!contact.avatar && getInitials(contact.name)}
//                 </Avatar>
//                 <span
//                   className={`absolute bottom-0 right-0 w-3 h-3 rounded-full ${
//                     contact.online ? 'bg-green-500 animate-pulse' : 'bg-gray-300'
//                   } transition-all duration-500 ease-in-out`}
//                 ></span>
//               </div>
//               <div className="ml-4">
//                 <p className="font-semibold">{contact.name}</p>
//                 {/* {contact.timestamp && (
//                   <span className="text-xs text-gray-500">
//                     {new Date(contact.timestamp).toLocaleTimeString([], {
//                       hour: '2-digit',
//                       minute: '2-digit',
//                     })}
//                   </span>
//                 )} */}
//                 {/* <p className="text-sm text-gray-500 truncate">{contact.lastMessage}</p> */}
//               </div>
//             </div>
//           ))}
//           {filteredContacts.length === 0 && (
//             <div className="p-4 text-center text-gray-500">
//               No contacts found matching "{searchQuery}"
//             </div>
//           )}
//         </div>
//       </div>

//       <div className="hidden sm:flex flex-col w-2/3 lg:w-3/4">
//         {showVideoCall && selectedChat ? (
//           <VideoChat roomID={selectedChat.id} userID={currentUserId} onEndCall={handleEndCall} />
//         ) : selectedChat ? (
//           <>
//             <div className="flex items-center justify-between p-4 border-b border-amber-200 bg-main-bg">
//               <div className="flex items-center">
//                 <Avatar
//                   size="lg"
//                   src={selectedChat.avatar}
//                   alt={selectedChat.name}
//                   className="w-10 h-10 rounded-full"
//                   isBordered
//                 />
//                 <div className="ml-4">
//                   <h3 className="text-gray-500">{selectedChat.name}</h3>
//                 </div>
//               </div>
//               <div className="flex items-center space-x-2">
//                 <button
//                   className="text-gray-600 hover:text-gray-800 p-2 rounded-full hover:bg-gray-100"
//                   onClick={handleVideoCall}
//                 >
//                   <Video size={20} />
//                 </button>
//                 <button className="text-gray-600 hover:text-gray-800 p-2 rounded-full hover:bg-gray-100">
//                   <MoreVertical size={20} />
//                 </button>
//               </div>
//             </div>

//             <div className="flex-grow overflow-y-auto p-4 bg-main-bg">
//               {combinedMessages.map((message: Message) => (
//                 <div
//                   key={message.id}
//                   className={`flex mb-4 ${
//                     message.senderId === currentUserId ? 'justify-end' : 'justify-start'
//                   }`}
//                 >
//                   <div
//                     className={`max-w-xs lg:max-w-md xl:max-w-lg px-4 py-2 rounded-lg ${
//                       message.senderId === currentUserId
//                         ? 'bg-amber-300 text-amber-900'
//                         : 'bg-amber text-gray-800'
//                     }`}
//                   >
//                     <p>{message.message}</p>
//                     <p
//                       className={`text-xs mt-1 ${
//                         message.senderId === currentUserId ? 'text-amber-700' : 'text-gray-500'
//                       }`}
//                     >
//                       {message.timestamp || message.createdAt
//                         ? new Date(message.timestamp || message.createdAt).toLocaleTimeString([], {
//                             hour: '2-digit',
//                             minute: '2-digit',
//                           })
//                         : ''}
//                     </p>
//                   </div>
//                 </div>
//               ))}
//             </div>
//             {selectedChat && getRoomTypingStatus() && (
//               <div className="flex items-center space-x-2 px-4 py-2 bg-amber-50">
//                 <div className="flex space-x-1">
//                   <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce"></div>
//                   <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce delay-100"></div>
//                   <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce delay-200"></div>
//                 </div>
//                 <span className="text-sm text-gray-500">{selectedChat.name} is typing...</span>
//               </div>
//             )}

//             <form onSubmit={handleSendMessage} className="p-4 bg-main-bg border-t border-amber-200">
//               <div className="flex items-center">
//                 <Input
//                   className="flex-grow px-2 py-2 bg-amber-100 rounded-full focus:outline-none focus:ring-2 focus:ring-amber-500"
//                   type="text"
//                   onChange={handleInputChange}
//                   onBlur={handleStopTyping}
//                   value={newMessage}
//                   placeholder="Type a message..."
//                 />
//                 <button className="ml-4 px-4 py-2 bg-amber-800 text-white rounded-full hover:bg-amber-900 focus:outline-none focus:ring-2 focus:ring-amber-500">
//                   <Send size={20} />
//                 </button>
//               </div>
//             </form>
//           </>
//         ) : (
//           <div className="flex items-center justify-center h-full">
//             <p className="text-gray-500">Select a chat to start messaging</p>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default Chat;


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

