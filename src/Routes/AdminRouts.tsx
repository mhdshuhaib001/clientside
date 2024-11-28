import { Route, Routes } from 'react-router-dom';
import AdminLoginPage from '../pages/adminPage/AdminLoginPage';
import AdminDashboard from '../pages/adminPage/AdminLayout';
import AdminUserManagementTable from '../pages/adminPage/UserManagmentTable';
import AdminRouteProtector from './ProtectRout/AdminRoutProtector';
import AdminAuthProtector from './ProtectRout/AdminAuthProtector';
import React from 'react';
import CategoryManagementTable from '../pages/adminPage/CategoryManagment';
import ReportManagment from '../components/Admin/ReportManagment';
import AdminDashBord from '../pages/adminPage/adminDashBord';
import Escrew from '../components/Admin/Escrew'

const AdminRoute: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<AdminAuthProtector element={AdminLoginPage} />} />

      <Route path="/admin-dashboard" element={<AdminRouteProtector element={AdminDashboard} />}>
        <Route index element={<AdminDashBord />} />

        <Route path="user-management" element={<AdminUserManagementTable />} />
        <Route path="category-management" element={<CategoryManagementTable />} />
        <Route path="report-management" element={<ReportManagment />} />
        <Route path="escrow-managment" element={<Escrew />}/>
      </Route>
    </Routes>
  );
};

export default AdminRoute;
