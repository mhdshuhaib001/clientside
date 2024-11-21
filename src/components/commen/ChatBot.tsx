// import React, { useState, useEffect } from 'react';
// import { Clock, SendHorizontal, X, MessageSquare, Watch } from 'lucide-react';
// import { useChatBotMutation } from '../../services/apis/chatApi';

// interface Message {
//   id: number;
//   text: string;
//   sender: 'user' | 'bot';
// }

// const ChatBot: React.FC<{ onClose: () => void }> = ({ onClose }) => {
//   const [messages, setMessages] = useState<Message[]>([]);
//   const [input, setInput] = useState('');
//   const [isLoading, setIsLoading] = useState(false);
//   const [isMinimized, setIsMinimized] = useState(false);

//   const [chatBot] = useChatBotMutation();

//   const handleSendMessage = async () => {
//     if (input.trim()) {
//       const newMessage: Message = {
//         id: Date.now(),
//         text: input.trim(),
//         sender: 'user',
//       };
//       setMessages((prevMessages) => [...prevMessages, newMessage]);
//       setInput('');
//       setIsLoading(true);

//       try {
//         const response = await chatBot({
//           message: newMessage.text,
//           itemDetails: { name: 'Vintage Watch', description: 'A classic 1940s watch' },
//         }).unwrap();

//         const botResponse: Message = {
//           id: Date.now() + 1,
//           text: response.message,
//           sender: 'bot',
//         };
//         setMessages((prevMessages) => [...prevMessages, botResponse]);
//       } catch (error) {
//         console.error('Failed to get response from chatbot:', error);
//         const botErrorResponse: Message = {
//           id: Date.now() + 1,
//           text: 'Apologies, i miss the message . Could you repeat that?',
//           sender: 'bot',
//         };
//         setMessages((prevMessages) => [...prevMessages, botErrorResponse]);
//       }

//       setIsLoading(false);
//     }
//   };

//   const handleKeyPress = (e: React.KeyboardEvent) => {
//     if (e.key === 'Enter' && !e.shiftKey) {
//       e.preventDefault();
//       handleSendMessage();
//     }
//   };

//   useEffect(() => {
//     if (messages.length === 0) {
//       setMessages([{
//         id: Date.now(),
//         text: "Good day, esteemed patron! I'm your vintage timepiece connoisseur. How may I be of service?",
//         sender: 'bot',
//       }]);
//     }
//   }, []);

//   if (isMinimized) {
//     return (
//       <button
//         onClick={() => setIsMinimized(false)}
//         className="fixed bottom-4 right-4 bg-[#8b4513] text-[#f4e9d9] p-4 rounded-full shadow-lg hover:bg-[#6d3710] transition-colors"
//       >
//         <Watch className="w-6 h-6" />
//       </button>
//     );
//   }

//   return (
//     <div className="fixed bottom-4 right-4 w-96 h-[32rem] bg-[#f4e9d9] font-serif shadow-xl rounded-lg flex flex-col">
//       {/* Header */}
//       <div className="bg-[#8b4513] text-[#f4e9d9] p-4 flex items-center justify-between rounded-t-lg">
//         <div className="flex items-center gap-3">
//           <div className="bg-[#f4e9d9] p-2 rounded-full">
//             <Watch className="w-6 h-6 text-[#8b4513]" />
//           </div>
//           <h2 className="text-xl font-bold">Vintage Watch Emporium</h2>
//         </div>
//         <div className="flex items-center gap-2">
//           <button 
//             onClick={() => setIsMinimized(true)}
//             className="hover:bg-[#6d3710] p-1 rounded-full transition-colors"
//           >
//             <MessageSquare className="w-5 h-5" />
//           </button>
//           <button 
//             onClick={onClose}
//             className="hover:bg-[#6d3710] p-1 rounded-full transition-colors"
//           >
//             <X className="w-5 h-5" />
//           </button>
//         </div>
//       </div>

//       {/* Messages */}
//       <div className="flex-1 overflow-y-auto p-4 space-y-4">
//         {messages.map((message) => (
//           <div
//             key={message.id}
//             className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
//           >
//             <div
//               className={`max-w-[80%] rounded-lg p-3 ${
//                 message.sender === 'user' 
//                   ? 'bg-[#8b4513] text-[#f4e9d9] rounded-tr-none' 
//                   : 'bg-[#d2b48c] text-[#4a3728] rounded-tl-none'
//               }`}
//             >
//               {message.text}
//             </div>
//           </div>
//         ))}
//         {isLoading && (
//           <div className="flex justify-start">
//             <div className="max-w-[80%] rounded-lg p-3 bg-[#d2b48c] text-[#4a3728] rounded-tl-none">
//               <div className="flex items-center gap-2">
//                 <Clock className="w-4 h-4 animate-spin" />
//                 <span>The clockmaker is winding his gears...</span>
//               </div>
//             </div>
//           </div>
//         )}
//       </div>

//       {/* Input */}
//       <div className="bg-[#d2b48c] p-4 border-t border-[#8b4513] rounded-b-lg">
//         <div className="flex gap-2">
//           <textarea
//             value={input}
//             onChange={(e) => setInput(e.target.value)}
//             onKeyDown={handleKeyPress}
//             className="flex-1 bg-[#f4e9d9] border-2 border-[#8b4513] rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#8b4513] text-[#4a3728] resize-none h-12 min-h-[3rem] max-h-32"
//             placeholder="Compose your inquiry..."
//             disabled={isLoading}
//             rows={1}
//           />
//           <button
//             onClick={handleSendMessage}
//             className={`bg-[#8b4513] text-[#f4e9d9] rounded-lg px-4 hover:bg-[#6d3710] focus:outline-none focus:ring-2 focus:ring-[#8b4513] transition-colors ${
//               isLoading ? 'opacity-50 cursor-not-allowed' : ''
//             }`}
//             disabled={isLoading}
//           >
//             <SendHorizontal className="w-5 h-5" />
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default ChatBot;

import React, { useState, useEffect } from 'react';
import { Clock, SendHorizontal, X, Watch } from 'lucide-react';
import { useChatBotMutation } from '../../services/apis/chatApi';

interface Message {
  id: number;
  text: string;
  sender: 'user' | 'bot';
}

const ChatBot: React.FC<{ onClose: () => void }> = ({ onClose }) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);

  const [chatBot] = useChatBotMutation();

  const handleSendMessage = async () => {
    if (input.trim()) {
      const newMessage: Message = {
        id: Date.now(),
        text: input.trim(),
        sender: 'user',
      };
      setMessages((prevMessages) => [...prevMessages, newMessage]);
      setInput('');
      setIsLoading(true);

      try {
        const response = await chatBot({
          message: newMessage.text,
          itemDetails: { name: 'Vintage Watch', description: 'A classic 1940s watch' },
        }).unwrap();

        const botResponse: Message = {
          id: Date.now() + 1,
          text: response.message,
          sender: 'bot',
        };
        setMessages((prevMessages) => [...prevMessages, botResponse]);
      } catch (error) {
        console.error('Failed to get response from chatbot:', error);
        const botErrorResponse: Message = {
          id: Date.now() + 1,
          text: 'Sorry, I missed that. Could you repeat?',
          sender: 'bot',
        };
        setMessages((prevMessages) => [...prevMessages, botErrorResponse]);
      }

      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  useEffect(() => {
    if (messages.length === 0) {
      setMessages([{
        id: Date.now(),
        text: "Hello! I'm here to assist you. How can I help?",
        sender: 'bot',
      }]);
    }
  }, []);

  if (isMinimized) {
    return (
      <button
        onClick={() => setIsMinimized(false)}
        className="fixed bottom-4 right-4 bg-[#8b4513] text-[#f4e9d9] p-4 rounded-full shadow-lg hover:bg-[#6d3710] transition-colors"
      >
        <Watch className="w-6 h-6" />
      </button>
    );
  }

  return (
    <div className="fixed bottom-4 right-4 w-80 h-[32rem] bg-[#f4e9d9] font-serif shadow-xl rounded-lg flex flex-col">
      {/* Header */}
      <div className="bg-[#8b4513] text-[#f4e9d9] p-4 flex items-center justify-between rounded-t-lg">
        <h2 className="text-lg font-bold">ChatBot</h2>
        <div className="flex items-center gap-2">
   
          <button onClick={onClose} className="hover:bg-[#6d3710] p-1 rounded-full transition-colors" aria-label="Close chat">
            <X className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message) => (
          <div key={message.id} className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'} transition-opacity duration-300`}>
            <div className={`max-w-[80%] rounded-lg p-3 ${message.sender === 'user' ? 'bg-[#8b4513] text-[#f4e9d9]' : 'bg-[#d2b48c] text-[#4a3728]'} opacity-100 animate-fade-in`}>
              {message.text}
            </div>
          </div>
        ))}
        {isLoading && (
          <div className="flex justify-start">
            <div className="max-w-[80%] rounded-lg p-3 bg-[#d2b48c] text-[#4a3728]">
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 animate-spin" />
                <span>Thinking...</span>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Input */}
      <div className="bg-[#d2b48c] p-4 border-t border-[#8b4513] rounded-b-lg">
        <div className="flex gap-2">
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyPress}
            className="flex-1 bg-[#f4e9d9] border-2 border-[#8b4513] rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#8b4513] text-[#4a3728] resize-none h-12 transition-all duration-300"
            placeholder="Type your message..."
            disabled={isLoading}
            rows={1}
            aria-label="Message input"
          />
          <button
            onClick={handleSendMessage}
            className={`bg-[#8b4513] text-[#f4e9d9] rounded-lg px-4 hover:bg-[#6d3710] focus:outline-none transition-colors ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
            disabled={isLoading}
            aria-label="Send message"
          >
            <SendHorizontal className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
}

export default ChatBot;