// src/routes/UserRoute.tsx
import React, { Suspense, lazy } from 'react';
import { Route, Routes } from 'react-router-dom';
import UserProtectedRoute from './ProtectRout/UserVerifyRoute';
import AuthRoute from './ProtectRout/AuthRoute';
import Loader from '../components/commen/Loader';
import ErrorPage from '../components/commen/ErrorPage';
// Lazy-loaded components
const Registration = lazy(() => import('../pages/userPages/Registration'));
const Home = lazy(() => import('../pages/userPages/LandingPage'));
const Profile = lazy(() => import('../pages/userPages/Profile'));
const SellerDashBord = lazy(() => import('../pages/seller/SellerDashBord'));
const ProductListingForm = lazy(() => import('../containers/sellerFeturs/ProductListingForm'));
// const EditProductForm = lazy(() => import('../containers/sellerFeturs/EditProductForm'));
const ForgetPasswordPage = lazy(() => import('../pages/userPages/PasswordForgetPage'));
const EmailSendPage = lazy(() => import('../pages/userPages/EmailSendPage'));
const ProductManagment = lazy(() => import('../pages/seller/ProductManagment'));
const AuctionItemForm = lazy(() => import('../components/Seller/auction-item-form'));
const UserDashBoard = lazy(() => import('../components/User/UserDshboard'));
const SellerAboutPage = lazy(() => import('../components/Seller/SellerAbout'));
const ProductPage = lazy(() => import('../pages/ProductDetailPage'));
const AddressPage = lazy(() => import('../pages/userPages/addressPage'));
const CheckoutPage = lazy(() => import('../pages/chekOutPage'));
const Success = lazy(() => import('../pages/commenPages/succsess'));
const OrderManagementTable = lazy(() => import('../pages/seller/orderManagmentPage'));
const OrdersPage = lazy(() => import('../pages/userPages/ordersPage'));
const OrderDetails = lazy(() => import('../pages/userPages/orderDetailsPage'));
const AuctionPage = lazy(() => import('../pages/userPages/auctionPage'));
const ChatPage = lazy(() => import('../pages/userPages/ChatPage'));
const AuctionItems = lazy(() => import('../pages/userPages/acutionItems'));
const SellerProfilePage = lazy(() => import('../pages/seller/sellerProfilePage'));
const SellerDashboardComponent = lazy(
  () => import('../components/Seller/DashBord/SellerDashbordComponent'),
);
import ChangePassword from '../pages/userPages/changePassword';
import AboutPage from '../components/commen/About';

const UserRoute: React.FC = () => {
  return (
    <Suspense fallback={<Loader />}>
      <Routes>
        <Route path="/registration" element={<AuthRoute element={Registration} />} />
        <Route path="/" element={<Home />} />
        <Route path="/forget-password/:token" element={<ForgetPasswordPage />} />
        <Route path="/forget-password-request" element={<EmailSendPage />} />
        <Route path="/product-details/:id" element={<ProductPage />} />
        <Route path="/checkout/:id" element={<CheckoutPage />} />
        <Route path="/success" element={<Success />} />
        <Route path="/orders/:id" element={<OrderDetails />} />
        <Route path="/auction-items" element={<AuctionItems />} />
        <Route
          path="/auction-page/:id"
          element={<UserProtectedRoute element={AuctionPage} />}
        />
        <Route path="/chat" element={<ChatPage />} />
        <Route path="/error" element={<ErrorPage />} />
        <Route path="*" element={<ErrorPage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/seller-profile/:sellerId" element={<SellerProfilePage />} />
        <Route path="/profile" element={<UserProtectedRoute element={Profile} />}>
          <Route path="dashboard" element={<UserDashBoard />} />
          <Route path="password" element={<AuctionItemForm />} />
          <Route path="address" element={<AddressPage />} />
          <Route path="orders" element={<OrdersPage />} />
          <Route path="change-password" element={<ChangePassword />} />
          <Route path="seller" element={<UserProtectedRoute element={SellerDashBord} />}>
            <Route
              path="dashboard"
              element={<UserProtectedRoute element={SellerDashboardComponent} />}
            />
            <Route
              path="product-management"
              element={<UserProtectedRoute element={ProductManagment} />}
            />
            <Route
              path="addproduct/:productId?"
              element={<UserProtectedRoute element={ProductListingForm} />}
            />
            {/* <Route
              path="editproduct/:productId"
              element={<UserProtectedRoute element={EditProductForm} />}
            /> */}
            <Route
              path="order-management"
              element={<UserProtectedRoute element={OrderManagementTable} />}
            />
            <Route path="about" element={<SellerAboutPage />} />
          </Route>
        </Route>
      </Routes>
    </Suspense>
  );
};

export default UserRoute;
