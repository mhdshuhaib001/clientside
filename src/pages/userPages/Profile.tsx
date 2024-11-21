import React from 'react';
import Sidebar from '../../components/User/Sidebar';
import Header from '../../components/User/Header';
import { Outlet } from 'react-router-dom';

const Profile: React.FC = () => {
  return (
    <div className="flex flex-col h-screen ">
      <Header />
      <div className="flex flex-grow overflow-hidden bg-[#fcfaee]">
        
        <Sidebar />
        <div className="flex-grow  bg-bl overflow-y-auto">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default Profile;
