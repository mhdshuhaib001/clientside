import React, { useEffect, useState } from 'react';
import { useFetchAllUsersQuery, useUpdateUserStatusMutation } from '../../services/apis/adminApi';
import { User } from '../../interface/userTypes/apiTypes';
import toast from 'react-hot-toast';

export default function UserManagementTable() {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const itemsPerPage = 7;
  const { data: users = [] } = useFetchAllUsersQuery();
  const [updateUserBlock] = useUpdateUserStatusMutation();

  const [localUsers, setLocalUsers] = useState(users);
  useEffect(() => {
    if (users) {
      setLocalUsers(users);
    }
  }, [users]);

  const filteredUsers = localUsers.filter((user: User) =>
    Object.values(user).some((value) => {
      if (value !== undefined && value !== null) {
        const stringValue = String(value);
        return stringValue.toLowerCase().includes(searchTerm.toLowerCase());
      }
      return false;
    }),
  );

  const totalPages = Math.ceil(filteredUsers.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentUsers = filteredUsers.slice(startIndex, endIndex);

  const handleBlockUnblock = async (userId: string) => {
    try {
      const response = await updateUserBlock({ userId });
      console.log(response, 'userResponse');
      const newIsActive = response.data.isActive;
      setLocalUsers((prevUsers: any[]) =>
        prevUsers.map((user) => (user._id === userId ? { ...user, isActive: newIsActive } : user)),
      );
      toast.success(`User ${newIsActive ? 'unblocked' : 'blocked'} successfully!`);
    } catch (error) {
      console.error('Error updating user status:', error);
      toast.error('Error updating user status. Please try again.');
    }
  };

  const handleRoleAction = (userId: string, role: string) => {
    console.log(`Action for user role: ${role} with user ID: ${userId}`);
  };

  return (
    <div className="w-full max-w-6xl mx-auto p-4 space-y-4">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">User Management</h1>
        <div className="relative">
          <input
            type="text"
            placeholder="Search..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-8 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <svg
            className="absolute left-2 top-2.5 h-5 w-5 text-gray-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
        </div>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-gray-100">
              <th className="p-3 text-left">USERS</th>
              <th className="p-3 text-left">EMAIL</th>
              <th className="p-3 text-left">STATUS</th>
              <th className="p-3 text-left">ACTION</th>
              <th className="p-3 text-left">ROLE</th>
            </tr>
          </thead>
          <tbody>
            {currentUsers.map((user: User) => (
              <tr key={user._id} className="border-b hover:bg-gray-50">
                <td className="p-3">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-gray-300 rounded-full flex items-center justify-center text-gray-600 font-bold">
                      {user.name[0]}
                    </div>
                    <span>{user.name}</span>
                  </div>
                </td>
                <td className="p-3">{user.email}</td>
                <td className="p-3">
                  {user.isActive ? (
                    <span className="px-2 py-1 bg-red-100 text-red-800 rounded-full text-xs">
                      Blocked
                    </span>
                  ) : (
                    <span className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs">
                      Active
                    </span>
                  )}
                </td>
                <td className="p-3">
                  <select
                    value={user.isActive ? 'block' : 'unblock'}
                    onChange={() => handleBlockUnblock(user._id)}
                    className="border rounded px-2 py-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="block">Block</option>
                    <option value="unblock">Unblock</option>
                  </select>
                </td>
                <td className="p-3">
                  <button
                    className={`px-2 py-1 rounded-full text-xs ${user.role === 'seller' ? 'bg-blue-500 text-white' : 'bg-green-500 text-white'}`}
                    onClick={() => handleRoleAction(user._id, user.role)}
                  >
                    {user.role}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="flex items-center justify-between">
        <p className="text-sm text-gray-500">
          Showing {startIndex + 1} to {Math.min(endIndex, filteredUsers.length)} of{' '}
          {filteredUsers.length} entries
        </p>
        <div className="flex items-center space-x-2">
          <button
            className="px-3 py-1 border rounded hover:bg-gray-100 disabled:opacity-50"
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
          >
            Previous
          </button>
          <span className="text-sm">
            Page {currentPage} of {totalPages}
          </span>
          <button
            className="px-3 py-1 border rounded hover:bg-gray-100 disabled:opacity-50"
            onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
            disabled={currentPage === totalPages}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
}
