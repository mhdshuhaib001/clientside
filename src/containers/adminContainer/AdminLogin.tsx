import React, { useState } from 'react';
import { useAdminLoginMutation } from '../../services/apis/adminApi';
import { useNavigate } from 'react-router-dom';

interface AdminLoginFormProps {
  onLogin: (data: { email: string; password: string }) => void;
}

const adminLogin: React.FC<AdminLoginFormProps> = ({ onLogin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [adminLogin, { isLoading, isError, isSuccess }] =
    useAdminLoginMutation();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const adminData = await adminLogin({ email, password }).unwrap();
      
      localStorage.setItem('adminToken', adminData.adminToken);
      
      console.log('Login successful:', adminData.adminToken);
      
      onLogin({ email, password });
      navigate('/admin/admin-dashboard');
    } catch (error) {
      console.error('Login failed:', error);
    }
  };
  

  return (
    <form onSubmit={handleSubmit}>
      <div className="mb-4">
        <label
          className="block text-gray-700 text-sm font-bold mb-2"
          htmlFor="email"
        >
          Email
        </label>
        <input
          type="email"
          id="email"
          name="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          placeholder="Your email"
        />
      </div>

      <div className="mb-4">
        <label
          className="block text-gray-700 text-sm font-bold mb-2"
          htmlFor="password"
        >
          Password
        </label>
        <input
          type="password"
          id="password"
          name="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          placeholder="Your password"
        />
      </div>

      <div className="mb-4 text-right">
        <a
          href="/forgot-password"
          className="text-black-500 hover:text-blue-700 text-sm"
        >
          Forgot Password?
        </a>
      </div>

      <div className="mb-4">
        <button
          type="submit"
          className="w-full bg-black hover:bg-gray-600 text-white font-bold py-2 px-4 rounded flex items-center justify-center"
          disabled={isLoading}
        >
          Sign In
        </button>
      </div>

      {isError && (
        <div className="text-red-500">
          Login failed. Please check your credentials.
        </div>
      )}
      {isSuccess && <div className="text-green-500">Login successful!</div>}
    </form>
  );
};

export default adminLogin;
