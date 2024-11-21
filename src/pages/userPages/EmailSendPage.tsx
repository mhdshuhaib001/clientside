import React from 'react';
import Email from '../../components/User/Email';

const PasswordForgetPage: React.FC = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-amber-50">
      <div className="max-w-md w-full p-4 bg-white shadow-md rounded-lg">
        <Email />
      </div>
    </div>
  );
};

export default PasswordForgetPage;
