import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getAdminToken } from '../../utils/getHelper';

interface AuthRouteProps {
  element: React.ComponentType;
}

const AdminRoutProtector: React.FC<AuthRouteProps> = ({ element: Component }) => {
  const navigate = useNavigate();
  const adminToken = getAdminToken();

  useEffect(() => {
    if (!adminToken) {
      navigate('/admin');
    }
  }, [adminToken, navigate]);

  return adminToken ? <Component /> : null;
};

export default AdminRoutProtector;
