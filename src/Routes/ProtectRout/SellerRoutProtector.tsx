import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getToken, getSellerToken } from '../../utils/getHelper';

interface AuthRouteProps {
  element: React.ComponentType;
}

const SellerRoutProtector: React.FC<AuthRouteProps> = ({
  element: Component,
}) => {
  const navigate = useNavigate();
  const token = getToken();
  const sellerToken = getSellerToken();

  useEffect(() => {
    if (!sellerToken) {
      navigate('/');
    }
  }, [token, sellerToken, navigate]);

  if (!sellerToken) {
    return <Component />;
  }

  return null;
};

export default SellerRoutProtector;
