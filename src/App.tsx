
import React, { Suspense, lazy, useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Loader from './components/commen/Loader';
import toast, { Toaster } from 'react-hot-toast';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import { generateToken, onMessageListener } from './services/notifications/firebase';
import NotificationToast from './components/commen/Notification/NotificationTost';
import ErrorBoundary from './components/commen/ErrorBoundry';

const UserRoutes = lazy(() => import('./Routes/UserRouts'));
const AdminRoutes = lazy(() => import('./Routes/AdminRouts'));
import ProtectedRoute from './Routes/ProtectRout/ProtectedRoute';
import Error from './components/commen/ErrorPage';

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLIC_KEY);

interface FCMNotificationPayload {
  notification?: {
    title?: string;
    body?: string;
    icon?: string;
  };
  data?: {
    [key: string]: string;
  };
}

const App: React.FC = () => {

  useEffect(() => {
    const fetchFirebaseToken = async () => {
      try {
        const cachedToken = localStorage.getItem('firebaseToken');
        if (!cachedToken) {
          const token = await generateToken(); 
          localStorage.setItem('firebaseToken', token || ''); 
        } else {
          console.log('Using cached Firebase token');
        }
      } catch (error) {
        console.error('Error fetching Firebase token:', error);
      }
    };

    fetchFirebaseToken();

  }, []);

  // Notification listener
  useEffect(() => {
    onMessageListener()
      .then((payload) => {
        const notificationPayload = payload as FCMNotificationPayload;
        toast.custom((_t) => (
          <NotificationToast
            title={notificationPayload?.notification?.title || 'No Title'}
            body={notificationPayload?.notification?.body || 'No Body'}
            imageUrl={notificationPayload?.data?.auctionImage || '/default-image.jpg'}
            auctionTitle={notificationPayload?.data?.auctionTitle || 'No Auction Title'}
            redirectUrl={notificationPayload?.data?.productUrl || ''}
          />
        ));
      })
      .catch((err) => {
        console.error('Error in onMessageListener:', err);
      });
  }, []);

  return (
    <Router>
      <Elements stripe={stripePromise}>
        <ErrorBoundary>
          <Suspense fallback={<Loader /> }>
            <Routes>
              <Route
                path="/*"
                element={
                  <ProtectedRoute>
                    <UserRoutes />
                  </ProtectedRoute>
                }
              />
              <Route path="/admin/*" element={<AdminRoutes />} />
              <Route path="*" element={<Error />} />
            </Routes>
          </Suspense>
        </ErrorBoundary>
      </Elements>
      <Toaster />
    </Router>
  );
};

export default App;
