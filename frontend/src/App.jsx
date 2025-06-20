// // src/App.jsx
// import React from 'react';
// import { BrowserRouter, Routes, Route } from 'react-router-dom';
// import Home from './pages/Home.jsx';
// import Products from './pages/Products.jsx';
// import Cart from './pages/Cart.jsx';
// import LikedProducts from './pages/LikedProducts.jsx';
// import CreateListing from './pages/CreateListing.jsx';
// import Login from './pages/Login.jsx';
// import Register from './pages/Register.jsx';
// import AdminLogin from './admin/AdminLogin.jsx';
// import AdminRegister from './admin/AdminRegister.jsx';
// import AdminDashboard from './admin/AdminDashboard.jsx';
// import AdminForgotPassword from './admin/AdminForgotPassword.jsx';
// import AdminListings from './admin/AdminListings.jsx';       // ✅ NEW
// import EditListing from './admin/EditListing.jsx';           // ✅ NEW
// import Navbar from './components/Navbar.jsx';
// import ProductDetail from './pages/ProductDetail.jsx';

// function App() {
//   return (
//     <>
//       <Navbar />
//       <Routes>
//         <Route path="/" element={<Home />} />
//         <Route path="/products" element={<Products />} />
//         <Route path="/cart" element={<Cart />} />
//         <Route path="/liked" element={<LikedProducts />} />
//         <Route path="/create-listing" element={<CreateListing />} />
//         <Route path="/login" element={<Login />} />
//         <Route path="/register" element={<Register />} />
//         <Route path="/admin" element={<AdminLogin />} />
//         <Route path="/admin-register" element={<AdminRegister />} />
//         <Route path="/admin/dashboard" element={<AdminDashboard />} />
//         <Route path="/admin/listings" element={<AdminListings />} />         {/* ✅ New */}
//         <Route path="/admin/edit/:id" element={<EditListing />} />           {/* ✅ New */}
//         <Route path="/admin-forgot-password" element={<AdminForgotPassword />} />
//         <Route path="/product/:id" element={<ProductDetail />} />
//       </Routes>
//     </>
//   );
// }

// export default App;


import React from "react";
import { Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar.jsx";
import ProtectedRoute from './components/ProtectedRoute.jsx';

// Public pages
import Home from "./pages/Home.jsx";
import Products from "./pages/Products.jsx";
import ProductDetail from "./pages/ProductDetail.jsx";


// Auth pages
import Login from "./pages/Login.jsx";
import Register from "./pages/Register.jsx";

// User-protected pages
import ListingForm from './pages/ListingForm';
import Cart from "./pages/Cart.jsx";
import Wishlist from "./pages/Wishlist.jsx";
import LikedProducts from "./pages/LikedProducts.jsx";
import Messages from "./pages/Messages.jsx";

// Admin pages
import AdminLogin from "./admin/AdminLogin.jsx";
import AdminRegister from "./admin/AdminRegister.jsx";
import AdminForgotPassword from "./admin/AdminForgotPassword.jsx";
import AdminDashboard from "./admin/AdminDashboard.jsx";
import AdminListings from "./admin/AdminListings.jsx";
import EditListing from "./admin/EditListing.jsx";

export default function App() {
  return (
    <>
      <Navbar />

      <Routes>
        {/* Public */}
        <Route path="/" element={<Home />} />
        <Route path="/products" element={<Products />} />
        <Route path="/products/:id" element={<ProductDetail />} />

        {/* Authentication */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* User-protected */}
        <Route
          path="/cart"
          element={
            <ProtectedRoute>
              <Cart />
            </ProtectedRoute>
          }
        />
        <Route
          path="/wishlist"
          element={
            <ProtectedRoute>
              <Wishlist />
            </ProtectedRoute>
          }
        />
        <Route
          path="/liked"
          element={
            <ProtectedRoute>
              <LikedProducts />
            </ProtectedRoute>
          }
        />
        <Route
          path="/messages"
          element={
            <ProtectedRoute>
              <Messages />
            </ProtectedRoute>
          }
        />

        {/* Admin public */}
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route path="/admin/register" element={<AdminRegister />} />
        <Route
          path="/admin/forgot-password"
          element={<AdminForgotPassword />}
        />
        <Route
          path="/products/new"
          element={
            <ProtectedRoute>
              <ListingForm />
            </ProtectedRoute>
          }
        />
        <Route
          path="/products/edit/:id"
          element={
            <ProtectedRoute>
              <ListingForm />
            </ProtectedRoute>
          }
        />
        {/* Admin-protected */}
        <Route
          path="/admin"
          element={
            <ProtectedRoute roles={["admin"]}>
              <AdminDashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/listings"
          element={
            <ProtectedRoute roles={["admin"]}>
              <AdminListings />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/listings/edit/:id"
          element={
            <ProtectedRoute roles={["admin"]}>
              <EditListing />
            </ProtectedRoute>
          }
        />
      </Routes>
    </>
  );
}

// import React from "react";

// export default function App() {
//   return (
//     <div style={{ padding: 20 }}>
//       <h1>Hello, CampusTrade!</h1>
//       <p>If you see this, React is working.</p>
//     </div>
//   );
// }