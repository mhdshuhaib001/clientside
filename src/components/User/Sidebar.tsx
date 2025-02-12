import React from 'react';
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { userLogOut } from '../../store/slices/userSlice';
import { User, ShoppingBag, Key, Package, LogOut } from 'lucide-react';

const menuItems = [
  { to: '/profile/dashboard', label: 'Profile', icon: User },
  { to: '/profile/seller', label: 'Sell', icon: ShoppingBag },
  { to: '/profile/address', label: 'Address', icon: Key },
  { to: '/profile/orders', label: 'My Orders', icon: Package },
  { to: '/profile/change-password', label: 'Change Password', icon: Package },
];
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
          {menuItems.map(({ to, label, icon: Icon }) => (
            <Link
              key={to}
              to={to}
              className="text-white hover:bg-gray-700 hover:text-gray-200 p-2 rounded transition duration-200 flex items-center"
            >
              <Icon size={20} className="mr-2" />
              {label}
            </Link>
          ))}

          <a
            onClick={handleLogout}
            className="text-white bg-gray-600 hover:bg-gray-500 hover:text-gray-100 p-2 rounded transition duration-200 flex items-center cursor-pointer"
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
