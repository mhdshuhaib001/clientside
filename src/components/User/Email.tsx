import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useEmailSendMutation } from '../../services/apis/userApi';
import { toast } from 'react-hot-toast';
import { AuthResponse } from '../../interface/userTypes/apiTypes';

const Email: React.FC = () => {
  const [email, setEmail] = useState<string>('');
  const [error, setError] = useState<string>('');
  const [emailSend, { isLoading }] = useEmailSendMutation();
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(e.target.value)) {
      setError('Invalid email address');
    } else {
      setError('');
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!error && email) {
      try {
        const result: AuthResponse = await emailSend({ email }).unwrap();

        toast.success(result.message);

        setTimeout(() => {
          navigate('/registration');
        }, 3000);

        setEmail('');
        setError('');
      } catch (err: any) {
        const errorMessage = err?.data?.message || 'An error occurred. Please try again.';
        setError(errorMessage);
      }
    } else if (!email) {
      setError('Email is required');
    }
  };

  return (
    <div className="flex justify-center items-center ">
      <form onSubmit={handleSubmit} className="mb-8 w-full max-w-md">
      <p className="text-gray-600 text-center mb-4">          {' '}
          Please enter your registered email address. We'll send you an email with instructions to
          reset your password.
        </p>
        <div className="mb-4 w-full">
          <label htmlFor="email" className="block text-gray-700 font-semibold mb-2 text-center">
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={email}
            onChange={handleChange}
            placeholder="Enter your registered email"
            className={`w-full px-3 py-2 border rounded-md ${error ? 'border-red-500' : 'border-gray-300'}`}
            aria-describedby="email-error"
          />
          {error && (
            <p id="email-error" className="text-red-500 text-sm mt-1">
              {error}
            </p>
          )}
        </div>
        <div className="flex justify-center">
          <button
            type="submit"
            className={`bg-black text-white px-4 py-2 rounded-md hover:bg-gray-700 ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
            disabled={isLoading}
          >
            {isLoading ? 'Sending...' : 'Submit'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default Email;
