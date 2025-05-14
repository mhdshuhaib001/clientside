import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useIsBlockedQuery } from '../../services/apis/userApi';

interface ProtectedRouteProps {
  children: React.ReactNode;
}

function ProtectedRoute({ children }: ProtectedRouteProps) {
  const navigate = useNavigate();
  const { data: isBlocked, isFetching } = useIsBlockedQuery();

    if (!isFetching) {
      if (isBlocked) {
        localStorage.removeItem('accessToken');

        navigate('/registration'); 
      }
    }


  return <>{children}</>;
}

export default ProtectedRoute;
