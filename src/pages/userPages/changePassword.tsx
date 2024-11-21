import React, { useState, FormEvent } from 'react';
import { useChangePasswordMutation } from '../../services/apis/userApi';
import { useSelector } from 'react-redux';
import { RootState } from '../../store/Store';



const ChangePassword: React.FC = () => {
  const userId = useSelector((state: RootState) => state.User._id);

  const [currentPassword, setCurrentPassword] = useState<string>('');
  const [newPassword, setNewPassword] = useState<string>('');
  const [confirmPassword, setConfirmPassword] = useState<string>('');
  const [error, setError] = useState<string>('');
  const [success, setSuccess] = useState<boolean>(false);
  const [ChangePassword] = useChangePasswordMutation();
  const handleSubmit = async (e: FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();
    setError('');
    setSuccess(false);

    if (!currentPassword || !newPassword || !confirmPassword) {
      setError('All fields are required');
      return;
    }

    if (newPassword !== confirmPassword) {
      setError('New passwords do not match');
      return;
    }

    if (newPassword.length < 8) {
      setError('New password must be at least 8 characters long');
      return;
    }

    try {
      const result = await ChangePassword({
        userId,
        newPassword,
        currentPassword,
        confirmPassword,
      });

      console.log(result,'changepassword result')
      if (result.data) {
        if (result.data.success=== true) {
          setSuccess(true);
          alert('Password changed successfully!');
          setCurrentPassword('');
          setNewPassword('');
          setConfirmPassword('');
        } else {
          setError(result.data.message || 'An error occurred. Please try again.');
        }
      }
    } catch (err) {
      setError('Failed to change password. Please try again.');
    }
  };

  return (
    <div className="min-h-screen bg-amber-50 flex flex-col justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="mt-6 text-center text-3xl font-extrabold text-amber-900">
          Change Your Password
        </h2>
        <p className="mt-2 text-center text-sm text-amber-700">
          Ensure the security of your vintage treasures
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-amber-100 py-8 px-4 shadow-lg sm:rounded-lg sm:px-10 border-4 border-amber-900">
          <div className="mb-6 text-center">
            <svg
              className="mx-auto h-12 w-12 text-amber-900"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z"
              />
            </svg>
          </div>
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div>
              <label
                htmlFor="current-password"
                className="block text-sm font-medium text-amber-900"
              >
                Current Password
              </label>
              <div className="mt-1">
                <input
                  id="current-password"
                  name="current-password"
                  type="password"
                  className="appearance-none block w-full px-3 py-2 border border-amber-300 rounded-md shadow-sm placeholder-amber-400 focus:outline-none focus:ring-amber-500 focus:border-amber-500 bg-amber-50 text-amber-900 sm:text-sm"
                  value={currentPassword}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    setCurrentPassword(e.target.value)
                  }
                />
              </div>
            </div>

            <div>
              <label htmlFor="new-password" className="block text-sm font-medium text-amber-900">
                New Password
              </label>
              <div className="mt-1">
                <input
                  id="new-password"
                  name="new-password"
                  type="password"
                  className="appearance-none block w-full px-3 py-2 border border-amber-300 rounded-md shadow-sm placeholder-amber-400 focus:outline-none focus:ring-amber-500 focus:border-amber-500 bg-amber-50 text-amber-900 sm:text-sm"
                  value={newPassword}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    setNewPassword(e.target.value)
                  }
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="confirm-password"
                className="block text-sm font-medium text-amber-900"
              >
                Confirm New Password
              </label>
              <div className="mt-1">
                <input
                  id="confirm-password"
                  name="confirm-password"
                  type="password"
                  className="appearance-none block w-full px-3 py-2 border border-amber-300 rounded-md shadow-sm placeholder-amber-400 focus:outline-none focus:ring-amber-500 focus:border-amber-500 bg-amber-50 text-amber-900 sm:text-sm"
                  value={confirmPassword}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    setConfirmPassword(e.target.value)
                  }
                />
              </div>
            </div>

            {error && (
              <div className="text-red-600 text-sm bg-red-100 border border-red-400 rounded-md p-2">
                {error}
              </div>
            )}

            {success && (
              <div className="text-green-600 text-sm bg-green-100 border border-green-400 rounded-md p-2">
                Password changed successfully!
              </div>
            )}

            <div>
              <button
                type="submit"
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-amber-600 hover:bg-amber-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-amber-500 transition duration-150 ease-in-out"
              >
                Change Password
              </button>
            </div>
          </form>
        </div>
      </div>
      <div className="mt-8 text-center">
        <p className="text-xs text-amber-700">Vintage Auction House Est. 1920</p>
      </div>
    </div>
  );
};

export default ChangePassword;
