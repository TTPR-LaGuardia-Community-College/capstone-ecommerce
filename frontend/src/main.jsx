<<<<<<< HEAD
 import React from 'react';
=======
import React from 'react';
>>>>>>> 91490b1a7a46b94bc266ad91512ee02371cf6cb8
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import { AuthProvider } from './context/AuthContext.jsx';
import { CartProvider } from './context/CartContext.jsx';
import { WishlistProvider } from './context/WishlistContext.jsx';
import { BrowserRouter } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <CartProvider>
          <WishlistProvider>
            {/* WishlistProvider is not used in the current App, but included for future use */}
          <App />
          <ToastContainer
            position="top-right"
            autoClose={3000}
            hideProgressBar
            pauseOnHover
          />
          </WishlistProvider>
        </CartProvider>
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>
);
