import { useState, useEffect } from 'react';
import SocketConnection from '../../utils/socket';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { userLogOut } from '../../store/slices/userSlice';
const BlockingModal = () => {
  const [isBlocked, setIsBlocked] = useState(false);
  const [blockMessage, setBlockMessage] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(userLogOut());
    localStorage.clear();

    navigate('/');
  };

  useEffect(() => {
    const socket = SocketConnection.getInstance();

    const handleSellerBlocked = (data: { sellerId: string; message: string }) => {
      setIsBlocked(true);
      setBlockMessage(data.message);

      handleLogout();
      window.location.href = '/registration';
    };

    socket.on('seller_blocked', handleSellerBlocked);

    return () => {
      socket.off('seller_blocked', handleSellerBlocked);
    };
  }, []);

  if (!isBlocked) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-[9999]">
      <div className="bg-white p-8 rounded-lg shadow-xl text-center max-w-md w-full">
        <div className="text-6xl mb-4 text-red-600">⚠️</div>
        <h2 className="text-2xl font-bold text-red-600 mb-4">Account Blocked</h2>
        <p className="mb-6 text-gray-700 text-lg">{blockMessage}</p>
      </div>
    </div>
  );
};

export default BlockingModal;
