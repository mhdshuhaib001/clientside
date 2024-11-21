import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getAdminToken } from '../../utils/getHelper';

interface AuthRouteProps {
  element: React.ComponentType;
}

const AdminAuthRoute: React.FC<AuthRouteProps> = ({ element: Component }) => {
  const navigate = useNavigate();
  const adminToken = getAdminToken();

  useEffect(() => {
    if (adminToken) {
      navigate('/admin/admin-dashboard'); 
    }
  }, [adminToken, navigate]);

  if (adminToken) {
    return null;
  }

  return <Component />;
};

export default AdminAuthRoute;
