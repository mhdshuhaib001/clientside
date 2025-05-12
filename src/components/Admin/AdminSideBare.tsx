import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const AdminSideBare: React.FC = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    navigate('/admin');
  };

  return (
    <aside className="w-64 bg-gray-800 text-white min-h-screen flex flex-col items-center p-4">
      {/* Profile Section */}
      <div className="w-full flex flex-col items-start mb-4 p-4 ml-4">
        {/* <img
          src="https://via.placeholder.com/80"
          alt="Profile"
          className="w-20 h-20 bg-gray-600 mb-4 rounded-sm"
        /> */}
        <h2 className="text-lg font-semibold">Auction Gems</h2>
        <p className="text-sm text-gray-400">auctiongems@gmail.com</p>
      </div>

      {/* Navigation Links */}
      <ul className="space-y-4 w-full text-start p-4 ml-4">
        <li className="hover:bg-gray-700 p-2 rounded cursor-pointer">
          <Link to="/admin/admin-dashboard">Dashboard</Link>
        </li>
        <li className="hover:bg-gray-700 p-2 rounded cursor-pointer">
          <Link to="/admin/admin-dashboard/user-management">Users Managment</Link>
        </li>
        <li className="hover:bg-gray-700 p-2 rounded cursor-pointer">
          <Link to="/admin/admin-dashboard/category-management"> Category Managment</Link>
        </li>
        <li className="hover:bg-gray-700 p-2 rounded cursor-pointer">
          <Link to={'/admin/admin-dashboard/report-management'}>ReportManagment</Link>
        </li>
        <li className="hover:bg-gray-700 p-2 rounded cursor-pointer"><Link to={'/admin/admin-dashboard/escrow-managment'}>Escrow</Link></li>
      </ul>

      {/* Logout Section */}
      <div className="mt-auto w-full text-center p-4">
        <button
          onClick={handleLogout}
          className="w-full bg-red-600 hover:bg-red-700 text-white font-semibold py-2 rounded"
        >
          Logout
        </button>
      </div>
    </aside>
  );
};

export default AdminSideBare;
