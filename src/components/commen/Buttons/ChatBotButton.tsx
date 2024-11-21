// ChatButton.tsx
import React from 'react';

interface ChatButtonProps {
  onClick: () => void;
  position?: {
    bottom?: string;
    right?: string;
  };
}

const ChatButton: React.FC<ChatButtonProps> = ({ onClick, position }) => {
  return (
    <button
      onClick={onClick} 
      className="fixed bg-[#8b4513] text-[#f4e9d9] rounded-full p-4 shadow-lg hover:bg-[#6d3710] focus:outline-none focus:ring-2 focus:ring-[#8b4513] z-50"
      style={position}
    >
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
      </svg>
    </button>
  );
};

export default ChatButton;
