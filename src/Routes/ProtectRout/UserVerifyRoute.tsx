import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getToken } from '../../utils/getHelper';

interface ProtectedRouteProps {
  element: React.ComponentType<any>;
}

const UserProtectedRoute: React.FC<ProtectedRouteProps> = ({ element: Component }) => {
  const navigate = useNavigate();
  const token = getToken();

  useEffect(() => {
    if (!token) {
      navigate('/signup');  
    }
  }, [token, navigate]);

  if (!token) {
    return <div>Redirecting to signup...</div>; // Optional fallback
  }

  return <Component />;
};

export default UserProtectedRoute;
