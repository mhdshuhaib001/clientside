
import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

const SellerNavigation: React.FC = () => {
  const location = useLocation();
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setMobileMenuOpen((prev) => !prev);
  };

  const navLinks = [
    { to: '/profile/seller/dashboard', label: 'Seller Dashboard' },
    { to: '/profile/seller/product-management', label: 'Product Management' },
    { to: '/profile/seller/about', label: 'About Area' },
    { to: '/profile/seller/order-management', label: 'Order Management' },
  ];

  return (
    <nav className="w-full border-b border-amber-300">
      <div className="flex justify-between items-center px-6 py-4">
        <button
          className="md:hidden text-gray-800 focus:outline-none"
          onClick={toggleMobileMenu}
          aria-label={isMobileMenuOpen ? 'Close menu' : 'Open menu'}
        >
          {isMobileMenuOpen ? '✖' : '☰'}
        </button>
      </div>

      {/* Navigation Links */}
      <div className={`flex flex-col md:flex-row md:justify-between ${isMobileMenuOpen ? 'block' : 'hidden md:flex'}`}>
        {navLinks.map((link) => (
          <Link
            key={link.to}
            to={link.to}
            className={`text-gray-800 text-sm font-medium py-2 px-4 transition duration-300 rounded-md 
              ${location.pathname === link.to ? 'bg-amber-100 shadow-lg' : 'hover:bg-gray-50'}`}
            style={{
              boxShadow: location.pathname === link.to ? '0 0 15px rgba(255, 193, 7, 0.5)' : 'none',
            }}
            aria-current={location.pathname === link.to ? 'page' : undefined} 
          >
            {link.label}
          </Link>
        ))}
      </div>
    </nav>
  );
};

export default SellerNavigation;