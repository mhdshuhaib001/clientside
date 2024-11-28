import React from 'react';
import { Linkedin, Facebook, Twitter, Instagram, Mail, ArrowRight, Phone, Clock } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer>
      <div
        className="bg-[#58361d] text-white py-10"
        style={{ borderTopLeftRadius: '40px', borderTopRightRadius: '40px' }}
      >
        <div className="container mx-auto px-4 md:px-8 lg:px-12">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Quick Links Section */}
            <div>
              <h3 className="text-lg font-bold mb-4 text-orange-300">Quick Links</h3>
              <ul className="space-y-2">
                {[
                  'How to Bid',
                  'Seller Guidelines',
                  'Auction Calendar',
                  'Results & Reports',
                  'FAQ',
                ].map((item) => (
                  <li key={item} className="hover:text-orange-200 cursor-pointer transition-colors duration-200">
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            {/* Auction Info */}
            <div>
              <h3 className="text-lg font-bold mb-4 text-orange-300">Auction Services</h3>
              <ul className="space-y-2">
                {[
                  'Appraisal Services',
                  'Authentication',
                  'Shipping & Storage',
                  'Payment Options',
                  'Support Center',
                ].map((item) => (
                  <li key={item} className="hover:text-orange-200 cursor-pointer transition-colors duration-200">
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            {/* Company Info */}
            <div>
              <h2 className="text-lg font-bold mb-4 text-orange-300">Contact Us</h2>
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <Phone size={16} className="text-orange-300" />
                  <span>+1 (800) 555-0123</span>
                </div>
                <div className="flex items-center gap-2">
                  <Mail size={16} className="text-orange-300" />
                  <span>contact@heritage.com</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock size={16} className="text-orange-300" />
                  <span>Mon-Fri: 9AM - 6PM EST</span>
                </div>
                <div className="flex space-x-4 mt-4">
                  <Linkedin size={20} className="hover:text-orange-300 cursor-pointer transition-colors duration-200" />
                  <Facebook size={20} className="hover:text-orange-300 cursor-pointer transition-colors duration-200" />
                  <Twitter size={20} className="hover:text-orange-300 cursor-pointer transition-colors duration-200" />
                  <Instagram size={20} className="hover:text-orange-300 cursor-pointer transition-colors duration-200" />
                </div>
              </div>
            </div>

            {/* Newsletter */}
            <div>
              <h3 className="text-lg font-bold mb-4 text-orange-300">Newsletter</h3>
              <p className="text-sm mb-4">Subscribe for auction updates and exclusive offers</p>
              <div className="flex mb-4">
                <input
                  type="email"
                  placeholder="Your Email"
                  className="flex-grow bg-white/10 border-none rounded-l-md p-2 text-sm focus:outline-none focus:ring-1 focus:ring-orange-300"
                />
                <button className="bg-orange-400 hover:bg-orange-500 text-white px-4 rounded-r-md transition-colors duration-200">
                  <ArrowRight size={18} />
                </button>
              </div>
              <div className="flex gap-2">
                {['visa', 'mastercard', 'amex'].map((card) => (
                  <div key={card} className="bg-white/10 rounded-md p-2 w-14 h-8 flex items-center justify-center">
                    <img
                      src={`/payment-icons/${card}.svg`}
                      alt={card}
                      className="max-h-4"
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Bottom Section */}
          <div className="mt-8 pt-4 border-t border-white/20 flex flex-col md:flex-row justify-between items-center text-sm">
            <p>© {new Date().getFullYear()} Heritage Auctions. All rights reserved.</p>
            <div className="flex gap-4 mt-4 md:mt-0">
              <span className="hover:text-orange-200 cursor-pointer">Terms</span>
              <span className="hover:text-orange-200 cursor-pointer">Privacy</span>
              <span className="hover:text-orange-200 cursor-pointer">Cookies</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;