import React from 'react';
import AdminSideBare from '../../components/Admin/AdminSideBare';
import { Outlet } from 'react-router-dom';

const AdminLayout: React.FC = () => {
  return (
    <div className="flex h-screen bg-gray-800 ">
      <AdminSideBare />
      <div
        className="flex-grow bg-white overflow-y-auto p-4 m-3w rounded-md"
        style={{ borderTopLeftRadius: '1.5rem', borderBottomLeftRadius: '1.5rem' }}
      >
        {' '}
        <Outlet />
      </div>
    </div>
  );
};

export default AdminLayout;
