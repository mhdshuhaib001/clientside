import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import  store, { persistor } from './store/Store';
import './index.css';
import { GoogleOAuthProvider } from '@react-oauth/google';
import React from 'react';
import {NextUIProvider} from '@nextui-org/react'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <NextUIProvider>
    <Provider store={store}>
      <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}>
        <PersistGate loading={null} persistor={persistor}>
          <App />
        </PersistGate>
      </GoogleOAuthProvider>
    </Provider>
    </NextUIProvider>
  </StrictMode>,
);
