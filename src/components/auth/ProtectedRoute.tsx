import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

interface ProtectedRouteProps {
  children: React.ReactNode;
  allowedRoles?: string[];
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children, allowedRoles }) => {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-orange-500"></div>
      </div>
    );
  }

  if (!user) {
    // Redirect to role-specific login page if roles are specified
    if (allowedRoles && allowedRoles.length === 1) {
      return <Navigate to={`/login/${allowedRoles[0]}`} />;
    }
    // Default to customer login if no specific role is required
    return <Navigate to="/login/customer" />;
  }

  if (allowedRoles && !allowedRoles.includes(user.role)) {
    // Redirect users to their role-specific dashboard
    switch (user.role) {
      case 'vendor':
        return <Navigate to="/vendor" />;
      case 'admin':
        return <Navigate to="/admin" />;
      default:
        return <Navigate to="/" />;
    }
  }

  return <>{children}</>;
};

export default ProtectedRoute;