import React from 'react';
import LoginForm from '../../containers/adminContainer/AdminLogin';

const AdminLoginPage: React.FC = () => {
  const handleLogin = (data: { email: string; password: string }) => {
    console.log('Login Data:', data);
  };

  return (
    <div className="flex flex-col md:flex-row h-screen">
      {/* Left Side */}
      <div className="w-full md:w-1/2 flex items-center justify-center relative p-4">
        <div
          className="rounded-lg shadow-2xl p-8 relative h-auto md:h-[42rem]"
          style={{
            backgroundColor: '#5d5d5d',
            width: '100%',
            maxWidth: '577px',
          }}
        >
          <div className="absolute bottom-0 right-0 w-60 h-80 bg-gray-100 rounded-lg flex items-center justify-center shadow-lg">
            <img
              src="/assets/signup.jpg"
              alt="Decorative"
              className="w-full h-full object-cover rounded-lg"
            />
          </div>

          <div className="absolute top-0 left-0 p-8">
            <h1 className="text-4xl mb-3 font-lalezar text-white">
              Admin Portal
            </h1>
            <div className="relative mt-40 text-start md:text-center">
              <p className="text-4xl font-bold text-white whitespace-pre-line">
                Admin Login{'\n'}
                Access Your{'\n'}
                Dashboard Now!
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Right Side */}
      <div className="w-full md:w-1/2 bg-white flex items-center justify-center p-4">
        <div className="w-full max-w-sm p-6 bg-white rounded-lg shadow-lg">
          <h2 className="text-2xl font-bold mb-4 text-center">Admin Sign In</h2>
          <LoginForm onLogin={handleLogin} />

          <div className="text-center mt-4">
            <p className="text-gray-600"></p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminLoginPage;
