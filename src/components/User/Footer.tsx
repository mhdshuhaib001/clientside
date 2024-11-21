import React from 'react';
import { Linkedin, Facebook, Twitter, Instagram } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer>
      <div
        className="bg-[#58361d] text-white py-8"
        style={{ borderTopLeftRadius: '40px', borderTopRightRadius: '40px' }}
      >
        <div className="container mx-auto px-4 md:px-8 lg:px-12">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Category Section */}
            <div>
              <h3 className="mb-4 font-bold">Category</h3>
              <ul className="space-y-2">
                {[
                  'Porcelain',
                  'Old Clocks',
                  'Jewelry',
                  'Manuscripts',
                  'Ceramics',
                  'Sculptures',
                  'Weapons',
                ].map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>

            {/* Company Section */}
            <div>
              <h3 className="font-bold mb-4">Company</h3>
              <ul className="space-y-2">
                {[
                  'How to bid with us',
                  'How to sell with us',
                  'About us',
                  'F.A.Q',
                  'Our Brand',
                ].map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>

            {/* Logo and Social Media */}
            <div className="text-center">
              <h2 className="text-2xl font-bold mb-2">Auction Gems</h2>
              <p className="text-sm mb-4">Old High-End Blog Shop Blogger</p>
              <h3 className="font-bold mb-2">Stay Connected With Us!</h3>
              <p className="text-sm mb-4">Follow us on social media for updates</p>
              <div className="flex justify-center space-x-4">
                <Linkedin size={20} className='cursor-pointer' />
                <Facebook size={20} className='cursor-pointer'/>
                <Twitter size={20} className='cursor-pointer' />
                <Instagram size={20} className='cursor-pointer'/>
              </div>
            </div>

            {/* Newsletter and Payment */}
            <div>
              <h3 className="font-bold mb-4">Join Our Newsletter & Get More Information</h3>
              <div className="flex mb-4">
                <input
                  type="email"
                  placeholder="Email Address"
                  className="flex-grow bg-transparent border-b border-gray-200 p-2"
                />
                <button className="ml-2 bg-slate-50 text-black px-2 py-1 rounded">
                  →
                </button>
              </div>
              <h4 className="font-bold mb-2">Secured Payment Gateways</h4>
              <div className="flex space-x-2">
                {['visa', 'mastercard', 'amex', 'maestro'].map((card) => (
                  <img
                    key={card}
                    src={`/Logos/${card}-logo.png`}
                    alt={card}
                    className="h-8"
                  />
                ))}
              </div>
            </div>
          </div>

          {/* Bottom Section */}
          <div className="mt-8 pt-4 border-t border-gray-600 flex flex-col md:flex-row justify-between text-sm">
            <p>© Copyright 2024 Antigo</p>
            <div className="flex space-x-4 mt-4 md:mt-0">
              <span>Support Center</span>
              <span>Terms & Conditions</span>
              <span>Privacy Policy</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
