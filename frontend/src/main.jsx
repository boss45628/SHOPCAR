import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import './index.css';
import App from './App.jsx';
import { GoogleOAuthProvider } from '@react-oauth/google';
import { CartProvider } from './contexts/CartContext.jsx';
import { Toaster } from 'react-hot-toast'; //跳出提示訊息

//Google 拿到的 Client ID
const clientId = import.meta.env.VITE_GOOGLE_CLIENT_ID;

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <GoogleOAuthProvider clientId={clientId}>
        <CartProvider>
          <App />
          <Toaster />
        </CartProvider>
      </GoogleOAuthProvider>
    </BrowserRouter>
  </StrictMode>
);
