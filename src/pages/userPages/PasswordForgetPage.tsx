import React from 'react';
import ForgetPassword from '../../components/User/ForgetPassword';

const PasswordForgetPage: React.FC = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-amber-50 font-serif">
      <div className="max-w-md w-full p-4 bg-gray-50 shadow-md rounded-lg">
        <h2 className="text-center text-2xl font-bold mb-4">Forget Password</h2>
        <ForgetPassword />
      </div>
    </div>
  );
};

export default PasswordForgetPage;
