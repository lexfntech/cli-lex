import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from './context/AuthContext';
import Header from './components/layout/Header';
import ProtectedRoute from './components/auth/ProtectedRoute';

// Pages
import Homepage from './pages/Homepage';
import CustomerLoginPage from './pages/auth/CustomerLoginPage';
import VendorLoginPage from './pages/auth/VendorLoginPage';
import AdminLoginPage from './pages/auth/AdminLoginPage';
import CustomerSignupPage from './pages/auth/CustomerSignupPage';
import VendorSignupPage from './pages/auth/VendorSignupPage';
import AdminSignupPage from './pages/auth/AdminSignupPage';
import UserDashboard from './pages/dashboard/UserDashboard';
import AdminDashboard from './pages/admin/AdminDashboard';
import OrderConfirmationPage from './pages/orders/OrderConfirmationPage';
import CheckoutPage from './pages/checkout/CheckoutPage';

function App() {
  const { loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-orange-500"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main className="min-h-screen">
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/login/customer" element={<CustomerLoginPage />} />
          <Route path="/login/vendor" element={<VendorLoginPage />} />
          <Route path="/login/admin" element={<AdminLoginPage />} />
          <Route path="/login" element={<Navigate to="/login/customer" replace />} />
          <Route path="/signup/customer" element={<CustomerSignupPage />} />
          <Route path="/signup/vendor" element={<VendorSignupPage />} />
          <Route path="/signup/admin" element={<AdminSignupPage />} />
          <Route path="/signup" element={<Navigate to="/signup/customer" replace />} />
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute allowedRoles={['customer', 'vendor', 'admin']}>
                <UserDashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin"
            element={
              <ProtectedRoute allowedRoles={['admin']}>
                <AdminDashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/checkout"
            element={
              <ProtectedRoute allowedRoles={['customer']}>
                <CheckoutPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/order-confirmation/:orderId"
            element={
              <ProtectedRoute allowedRoles={['customer']}>
                <OrderConfirmationPage />
              </ProtectedRoute>
            }
          />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;