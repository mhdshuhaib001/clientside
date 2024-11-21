import React from 'react';
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { userLogOut } from '../../store/slices/userSlice';
import { User, ShoppingBag, Key, CreditCard, Package, LogOut } from 'lucide-react';

const Sidebar: React.FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(userLogOut());
    localStorage.clear();

    navigate('/');
  };

  return (
    <div className="min-h-screen flex items-center p-4 flex-col md:flex-row">
      <aside className="w-full md:w-64 bg-gray-800 shadow-lg rounded-md">
        <div className="p-4">
          <h2 className="text-xl text-white font-bold">My Profile</h2>
        </div>
        <nav className="flex flex-col p-4 space-y-4">
          <Link
            to="/profile/dashboard"
            className="text-white hover:bg-gray-700 hover:text-gray-200 p-2 rounded transition duration-200 flex items-center"
          >
            <User size={20} className="mr-2" />
            Profile
          </Link>
          <Link
            to="/profile/seller"
            className="text-white hover:bg-gray-700 hover:text-gray-200 p-2 rounded transition duration-200 flex items-center"
          >
            <ShoppingBag size={20} className="mr-2" />
            Sell
          </Link>
          <Link
            to="/profile/address"
            className="text-white hover:bg-gray-700 hover:text-gray-200 p-2 rounded transition duration-200 flex items-center"
          >
            <Key size={20} className="mr-2" />
            Address
          </Link>
          <Link
            to="/profile/orders"
            className="text-white hover:bg-gray-700 hover:text-gray-200 p-2 rounded transition duration-200 flex items-center"
          >
            <Package size={20} className="mr-2" />
            My Orders 
          </Link>
          <a
            href="#payments"
            className="text-white hover:bg-gray-700 hover:text-gray-200 p-2 rounded transition duration-200 flex items-center"
          >
            <CreditCard size={20} className="mr-2" />
            Payments
          </a>
          <a
            href="/profile/change-password"
            className="text-white hover:bg-gray-700 hover:text-gray-200 p-2 rounded transition duration-200 flex items-center"
          >
            <Package size={20} className="mr-2" />
            Change Password
          </a>
          <a
            onClick={handleLogout}
            className="text-white bg-gray-600 hover:bg-gray-500 hover:text-gray-100 p-2 rounded transition duration-200 flex items-center"
          >
            <LogOut size={20} className="mr-2" />
            LogOut
          </a>
        </nav>
      </aside>
    </div>
  );
};

export default Sidebar;
