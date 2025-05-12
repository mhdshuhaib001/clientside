import React from 'react';
import { Avatar, Input } from '@nextui-org/react';
import { MoreVertical, Send, Video } from 'lucide-react';
import { Contact, Message } from '../../interface/chatTypes/chat';

interface ChatWindowProps {
  selectedChat: Contact | null;
  combinedMessages: Message[];
  currentUserId: string;
  newMessage: string;
  setNewMessage: (message: string) => void;
  handleSendMessage: (e: React.FormEvent<HTMLFormElement>) => void;
  // handleVideoCall: () => void;
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleStopTyping: () => void;
  getRoomTypingStatus: () => boolean;
}

const ChatWindow: React.FC<ChatWindowProps> = ({
  selectedChat,
  combinedMessages,
  currentUserId,
  newMessage,
  handleSendMessage,
  // handleVideoCall,
  handleInputChange,
  handleStopTyping,
  getRoomTypingStatus,
}) => {
  if (!selectedChat) {
    return (
      <div className="flex items-center justify-center h-full">
        <p className="text-gray-500">Select a chat to start messaging</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full">
      {/* Chat Header */}
      <div className="flex items-center justify-between p-4 border-b border-amber-200 bg-main-bg">
        <div className="flex items-center">
          <Avatar
            size="lg"
            src={selectedChat.avatar}
            alt={selectedChat.name}
            className="w-10 h-10 rounded-full"
            isBordered
          />
          <div className="ml-4">
            <h3 className="text-gray-500">{selectedChat.name}</h3>
          </div>
        </div>
        {/* <div className="flex items-center space-x-2">
          <button
            className="text-gray-600 hover:text-gray-800 p-2 rounded-full hover:bg-gray-100"
            onClick={handleVideoCall}
          >
            <Video size={20} />
          </button>
          <button className="text-gray-600 hover:text-gray-800 p-2 rounded-full hover:bg-gray-100">
            <MoreVertical size={20} />
          </button>
        </div> */}
      </div>

      {/* Chat Messages */}
      <div className="flex-grow overflow-y-auto p-4 bg-main-bg">
        {combinedMessages.map((message: Message) => (
          <div
            key={message.id}
            className={`flex mb-4 ${
              message.senderId === currentUserId ? 'justify-end' : 'justify-start'
            }`}
          >
            {/* Message Bubble */}
            <div
              className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg shadow-sm ${
                message.senderId === currentUserId
                  ? 'bg-amber-300 text-amber-900 rounded-br-none' // Sender bubble
                  : 'bg-amber-100 text-gray-800 rounded-bl-none' // Receiver bubble
              }`}
            >
              <p>{message.message}</p>
              <p
                className={`text-xs mt-1 ${
                  message.senderId === currentUserId ? 'text-amber-700' : 'text-gray-500'
                }`}
              >
                {message.timestamp || message.createdAt
                  ? new Date(message.timestamp || message.createdAt).toLocaleTimeString([], {
                      hour: '2-digit',
                      minute: '2-digit',
                    })
                  : ''}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Typing Indicator */}
      {getRoomTypingStatus() && (
        <div className="flex items-center space-x-2 px-4 py-2 bg-amber-50">
          <div className="flex space-x-1">
            <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce"></div>
            <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce delay-100"></div>
            <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce delay-200"></div>
          </div>
          <span className="text-sm text-gray-500">{selectedChat.name} is typing...</span>
        </div>
      )}

      {/* Message Input */}
      <form onSubmit={handleSendMessage} className="p-4 bg-main-bg border-t border-amber-200">
        <div className="flex items-center">
          <Input
            className="flex-grow px-2 py-2 bg-amber-100 rounded-full focus:outline-none focus:ring-2 focus:ring-amber-500"
            type="text"
            onChange={handleInputChange}
            onBlur={handleStopTyping}
            value={newMessage}
            placeholder="Type a message..."
          />
          <button className="ml-4 px-4 py-2 bg-amber-800 text-white rounded-full hover:bg-amber-900 focus:outline-none focus:ring-2 focus:ring-amber-500">
            <Send size={20} />
          </button>
        </div>
      </form>
    </div>
  );
};

export default ChatWindow;
