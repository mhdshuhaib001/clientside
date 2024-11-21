// import React from 'react';
// import { Link } from 'react-router-dom';

// const SellerNavigation: React.FC = () => {
//   return (
//     <div className=" w-full bg-main-bg border-border-accent">
//       <div className="relative mb-6">
//         {/* Navigation Links */}
//         <div className="absolute inset-x-0 top-0 flex justify-between px-6">
//           <Link
//             to="/profile/seller/dashboard"
//             className="text-gray-800 text-sm font-medium py-2 px-4 hover:bg-gray-100"
//           >
//             Seller Dashboard
//           </Link>
//           <Link
//             to="/profile/seller/product-management"
//             className="text-gray-800 text-sm font-medium py-2 px-4 hover:bg-gray-100"
//           >
//             Product Management
//           </Link>
      
//           <Link
//             to="/profile/seller/about"
//             className="text-gray-800 text-sm font-medium py-2 px-4 hover:bg-gray-100"
//           >
//             About Area
//           </Link>
//           <Link
//             to="/profile/seller/order-management"
//             className="text-gray-800 text-sm font-medium py-2 px-4 hover:bg-gray-100"
//           >
//             Order Management
//           </Link>
//         </div>
//       </div>
//       {/* Horizontal Line */}
//       <div className="w-full border-t border-gray-300 mt-8"></div>

//       {/* Define Routes for different sections */}
//       <div className="flex-grow">
//         {/* Routes would be defined here */}
//       </div>
//     </div>
//   );
// };

// export default SellerNavigation;




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
        <h1 className="text-xl font-bold text-gray-800">Seller Portal</h1>
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
              boxShadow: location.pathname === link.to ? '0 0 15px rgba(255, 193, 7, 0.5)' : 'none', // Bloom effect
            }}
            aria-current={location.pathname === link.to ? 'page' : undefined} // Accessibility
          >
            {link.label}
          </Link>
        ))}
      </div>
    </nav>
  );
};

export default SellerNavigation;