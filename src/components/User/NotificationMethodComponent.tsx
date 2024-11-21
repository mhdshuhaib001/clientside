import React, { useState } from 'react';
import { Modal, ModalContent, ModalHeader, ModalBody } from '@nextui-org/react';
import toast from 'react-hot-toast';

const whatsappIcon = '/icons/whatsapp.png';
const gmailIcon = '/icons/gmail.png';
const notificationIcon = '/icons/notification.png';

const countryCodes = [
  { code: '91', label: 'India', flag: '🇮🇳' },
  { code: '1', label: 'USA', flag: '🇺🇸' },
  { code: '44', label: 'UK', flag: '🇬🇧' },
  { code: '61', label: 'Australia', flag: '🇦🇺' },
  { code: '86', label: 'China', flag: '🇨🇳' },
  { code: '81', label: 'Japan', flag: '🇯🇵' },
  { code: '49', label: 'Germany', flag: '🇩🇪' },
];

interface NotificationMethodSelectorProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectMethod: (
    method: string,
    data?: { phoneNumber?: string; countryCode?: string; email?: string },
  ) => void;
}

interface NotificationData {
  method: string | null;
  phoneNumber?: string;
  countryCode?: string;
  email?: string;
}

const NotificationMethodSelector: React.FC<NotificationMethodSelectorProps> = ({
  isOpen,
  onClose,
  onSelectMethod,
}) => {
  const notificationMethods = [
    { icon: whatsappIcon, label: 'WhatsApp' },
    { icon: gmailIcon, label: 'Email' },
    { icon: notificationIcon, label: 'Notification' },
  ];

  const [selectedMethod, setSelectedMethod] = useState<string | null>(null);
  const [countryCode, setCountryCode] = useState('91');
  const [whatsappNumber, setWhatsappNumber] = useState('');
  const [email, setEmail] = useState('');

  const handleSelect = (label: string) => {
    if (label === 'Notification') {
      const notificationData: NotificationData = { method: 'Notification' };
      onSelectMethod(notificationData.method??'', notificationData);
      onClose();
    } else {
      setSelectedMethod(label);
    }
  };
  

  const isValidWhatsAppNumber = (number: string) => {
    const whatsappRegex = /^[0-9]{10,15}$/;
    return whatsappRegex.test(number);
  };

  const isValidEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleSubmit = () => {
    if (selectedMethod === 'WhatsApp' && !isValidWhatsAppNumber(whatsappNumber)) {
      toast.error('Please enter a valid WhatsApp number.');
      return;
    }
    if (selectedMethod === 'Email' && !isValidEmail(email)) {
      toast.error('Please enter a valid email address.');
      return;
    }

    const notificationData: NotificationData = { method: selectedMethod };

    if (selectedMethod === 'WhatsApp' && whatsappNumber) {
      notificationData.phoneNumber = whatsappNumber;
      notificationData.countryCode = countryCode;
    } else if (selectedMethod === 'Email' && email) {
      notificationData.email = email;
    } else if (selectedMethod === 'Notification') {
      console.log('this is the normal notification area ');
      notificationData.method = 'Notification';
    }

    if (notificationData.method) {
      console.log(notificationData, 'this was the notificationDattaa');
      onSelectMethod(notificationData.method, notificationData);
    }
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} className="bg-white max-w-2xl mx-auto max-h-full">
      <ModalContent className="bg-gray-50 max-w-2xl w-full shadow-lg rounded-lg h-auto p-8">
        <ModalHeader className="flex flex-col gap-1 text-amber-900 border-b border-amber-200 text-lg font-bold">
          Choose Notification Method
        </ModalHeader>

        <ModalBody className="py-6">
          {!selectedMethod && (
            <div className="flex justify-around gap-4">
              {notificationMethods.map((method, index) => (
                <button
                  key={index}
                  className="flex flex-col items-center bg-transparent hover:bg-amber-100 text-amber-900 transition-transform transform hover:scale-110 p-4 rounded-lg h-32"
                  onClick={() => handleSelect(method.label)}
                >
                  <img src={method.icon} alt={method.label} className="w-12 h-12 mb-2" />
                  <span className="text-lg font-medium">{method.label}</span>
                </button>
              ))}
            </div>
          )}

          {selectedMethod === 'WhatsApp' && (
            <div className="mt-3 flex items-center gap-2">
              <select
                value={countryCode}
                onChange={(e) => setCountryCode(e.target.value)}
                className="w-32 border rounded px-2 py-2 bg-gray-50 text-gray-700 focus:outline-none focus:ring-1 focus:ring-amber-500"
              >
                {countryCodes.map((country) => (
                  <option key={country.code} value={country.code}>
                    +{country.code} ({country.label})
                  </option>
                ))}
              </select>
              <input
                type="tel"
                value={whatsappNumber}
                onChange={(e) => setWhatsappNumber(e.target.value)}
                placeholder="Enter your WhatsApp number"
                className="flex-grow border rounded px-3 py-2 focus:outline-none focus:ring-1 focus:ring-amber-500 placeholder:text-gray-400"
              />
              <button
                onClick={handleSubmit}
                className="px-4 py-2 bg-amber-600 text-white rounded hover:bg-amber-700"
              >
                Submit
              </button>
            </div>
          )}

          {selectedMethod === 'Email' && (
            <div className="mt-3 flex items-center gap-2">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email address"
                className="flex-grow border rounded px-3 py-2 focus:outline-none focus:ring-1 focus:ring-amber-500 placeholder:text-gray-400"
              />
              <button
                onClick={handleSubmit}
                className="px-4 py-2 bg-amber-600 text-white rounded hover:bg-amber-700"
              >
                Submit
              </button>
            </div>
          )}
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default NotificationMethodSelector;
