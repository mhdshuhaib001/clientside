import React from 'react';
import { Avatar, Input } from '@nextui-org/react';
import { Search } from 'lucide-react';
import { Contact } from '../../interface/chatTypes/chat';

interface ContactListProps {
  contacts: Contact[];
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  selectedChat: Contact | null;
  setSelectedChat: (contact: Contact) => void;
}

const getInitials = (name: string) => {
  if (!name) return '';
  const nameParts = name.split(' ');
  return nameParts.length > 1 ? nameParts[0][0] + nameParts[1][0] : name[0];
};

const ContactList: React.FC<ContactListProps> = ({
  contacts,
  searchQuery,
  setSearchQuery,
  selectedChat,
  setSelectedChat,
}) => {
  const filteredContacts = contacts.filter((contact) =>
    contact.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="flex flex-col h-full bg-amber-100 border-r border-gray-200">
      <div className="p-4 border-b border-amber-200">
        <h2 className="text-xl font-semibold text-gray-800">Chats</h2>
        <div className="mt-4 relative">
          <Input
            className="w-full bg-white"
            placeholder="Search chats..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            startContent={<Search className="text-gray-400" size={18} />}
          />
        </div>
        <p className="text-sm text-gray-600 mt-2">
          {contacts.length} contact{contacts.length !== 1 ? 's' : ''} available
        </p>
      </div>
      <div className="overflow-y-auto flex-grow">
        {filteredContacts.map((contact: Contact) => (
          <div
            key={contact.id}
            className={`flex items-center p-4 relative rounded-sm hover:bg-amber-200 border border-amber-200 cursor-pointer ${
              selectedChat?.id === contact.id ? 'bg-amber-200' : ''
            }`}
            onClick={() => setSelectedChat(contact)}
          >
            <div className="relative">
              <Avatar
                size="lg"
                src={contact.avatar || undefined}
                alt={contact.name || 'No Name'}
                className="w-10 h-10 rounded-full"
                isBordered
              >
                {!contact.avatar && getInitials(contact.name)}
              </Avatar>
              <span
                className={`absolute bottom-0 right-0 w-3 h-3 rounded-full ${
                  contact.online ? 'bg-green-500 animate-pulse' : 'bg-gray-300'
                } transition-all duration-500 ease-in-out`}
              ></span>
            </div>
            <div className="ml-4">
              <p className="font-semibold">{contact.name}</p>
            </div>
          </div>
        ))}
        {filteredContacts.length === 0 && (
          <div className="p-4 text-center text-gray-500">
            No contacts found matching "{searchQuery}"
          </div>
        )}
      </div>
    </div>
  );
};

export default ContactList;

