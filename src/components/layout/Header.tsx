import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { User, ShoppingCart, Menu, X, LogOut, Settings, History, Shield, Utensils } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useCart } from '../../context/CartContext';
import { createPortal } from 'react-dom';

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [isSignupModalOpen, setIsSignupModalOpen] = useState(false);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const { user, logout } = useAuth();
  const { totalItems } = useCart();
  const navigate = useNavigate();

  // Close mobile menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      if (!target.closest('.user-menu-container') && !target.closest('.mobile-menu-container') && !target.closest('.signup-modal-content') && !target.closest('.login-modal-content')) {
        setIsMenuOpen(false);
        setIsUserMenuOpen(false);
        setIsSignupModalOpen(false);
        setIsLoginModalOpen(false);
      }
    };
    
    if (isMenuOpen || isUserMenuOpen) {
      document.addEventListener('click', handleClickOutside);
      return () => document.removeEventListener('click', handleClickOutside);
    }
  }, [isMenuOpen, isUserMenuOpen]);

  const handleLogout = () => {
    logout();
    navigate('/');
    setIsUserMenuOpen(false);
  };

  const getUserDashboardLink = () => {
    if (!user) return '/';
    switch (user.role) {
      case 'vendor': return '/vendor';
      case 'admin': return '/admin';
      default: return '/dashboard';
    }
  };

  const handleUserMenuToggle = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsUserMenuOpen(!isUserMenuOpen);
  };

  const handleMobileMenuToggle = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="flex justify-between items-center h-14 sm:h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <div className="w-7 h-7 sm:w-8 sm:h-8 bg-gradient-to-r from-orange-500 to-red-500 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-xs sm:text-sm">FP</span>
            </div>
            <span className="text-lg sm:text-xl font-bold text-gray-900">FoodPickup</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-6 xl:space-x-8">
            <Link to="/restaurants" className="text-gray-700 hover:text-orange-500 transition-colors text-sm lg:text-base">
              Browse Restaurants
            </Link>
            {user?.role === 'customer' && (
              <Link to="/dashboard" className="text-gray-700 hover:text-orange-500 transition-colors text-sm lg:text-base">
                My Orders
              </Link>
            )}
          </nav>

          {/* Right side */}
          <div className="flex items-center space-x-4">
            {/* Cart (only for customers) */}
            {user?.role === 'customer' && (
              <Link 
                to="/checkout" 
                className="relative p-2 text-gray-700 hover:text-orange-500 transition-colors touch-manipulation"
              >
                <ShoppingCart className="h-5 w-5 sm:h-6 sm:w-6" />
                {totalItems > 0 && (
                  <span className="absolute -top-1 -right-1 bg-orange-500 text-white text-xs rounded-full h-4 w-4 sm:h-5 sm:w-5 flex items-center justify-center min-w-[16px] sm:min-w-[20px]">
                    {totalItems}
                  </span>
                )}
              </Link>
            )}

            {/* User Menu */}
            {user ? (
              <div className="relative user-menu-container">
                <button
                  onClick={handleUserMenuToggle}
                  className="flex items-center space-x-1 sm:space-x-2 p-1 sm:p-2 rounded-lg hover:bg-gray-100 transition-colors touch-manipulation"
                >
                  <div className="w-7 h-7 sm:w-8 sm:h-8 bg-orange-500 rounded-full flex items-center justify-center">
                    <span className="text-white text-xs sm:text-sm font-medium">
                      {user.name.charAt(0).toUpperCase()}
                    </span>
                  </div>
                  <span className="hidden md:block text-gray-700 font-medium text-sm lg:text-base max-w-[120px] truncate">
                    {user.name}
                  </span>
                </button>

                {isUserMenuOpen && (
                  <div className="absolute right-0 mt-2 w-48 sm:w-56 bg-white rounded-lg shadow-lg border border-gray-200 py-1 z-50">
                    <div className="px-4 py-2 border-b border-gray-100">
                      <p className="text-sm font-medium text-gray-900 truncate">{user.name}</p>
                      <p className="text-xs text-gray-500 capitalize">{user.role}</p>
                    </div>
                    <Link
                      to={getUserDashboardLink()}
                      className="flex items-center space-x-2 px-4 py-3 text-sm text-gray-700 hover:bg-gray-100 touch-manipulation"
                      onClick={() => setIsUserMenuOpen(false)}
                    >
                      <Settings className="h-4 w-4" />
                      <span>Dashboard</span>
                    </Link>
                    {user.role === 'customer' && (
                      <Link
                        to="/dashboard"
                        className="flex items-center space-x-2 px-4 py-3 text-sm text-gray-700 hover:bg-gray-100 touch-manipulation"
                        onClick={() => setIsUserMenuOpen(false)}
                      >
                        <History className="h-4 w-4" />
                        <span>Order History</span>
                      </Link>
                    )}
                    <button
                      onClick={handleLogout}
                      className="flex items-center space-x-2 w-full px-4 py-3 text-sm text-red-600 hover:bg-red-50 touch-manipulation"
                    >
                      <LogOut className="h-4 w-4" />
                      <span>Logout</span>
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <div className="hidden sm:flex items-center space-x-3">
                <div className="relative">
                  <button
                    className="text-gray-700 hover:text-orange-500 transition-colors font-medium text-sm lg:text-base flex items-center space-x-1"
                    onClick={() => setIsLoginModalOpen(true)}
                  >
                    <span>Login</span>
                  </button>
                  {isLoginModalOpen && createPortal(
                    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                      <div className="login-modal-content bg-white rounded-lg shadow-xl w-full max-w-md mx-4 transform transition-all">
                        <div className="p-6">
                          <div className="flex justify-between items-center mb-4">
                            <h3 className="text-lg font-semibold text-gray-900">Choose Login Type</h3>
                            <button
                              onClick={() => setIsLoginModalOpen(false)}
                              className="text-gray-400 hover:text-gray-500 transition-colors"
                            >
                              <X className="h-5 w-5" />
                            </button>
                          </div>
                          <div className="space-y-3">
                            <Link
                              to="/login/customer"
                              onClick={() => setIsLoginModalOpen(false)}
                              className="flex items-center space-x-3 w-full px-4 py-3 text-left text-gray-700 hover:bg-gray-50 rounded-lg transition-colors"
                            >
                              <User className="h-5 w-5 text-orange-500" />
                              <div>
                                <p className="font-medium">Customer Login</p>
                                <p className="text-sm text-gray-500">Access your order history and profile</p>
                              </div>
                            </Link>
                            <Link
                              to="/login/vendor"
                              onClick={() => setIsLoginModalOpen(false)}
                              className="flex items-center space-x-3 w-full px-4 py-3 text-left text-gray-700 hover:bg-gray-50 rounded-lg transition-colors"
                            >
                              <Utensils className="h-5 w-5 text-orange-500" />
                              <div>
                                <p className="font-medium">Vendor Login</p>
                                <p className="text-sm text-gray-500">Manage your restaurant and orders</p>
                              </div>
                            </Link>
                            <Link
                              to="/login/admin"
                              onClick={() => setIsLoginModalOpen(false)}
                              className="flex items-center space-x-3 w-full px-4 py-3 text-left text-gray-700 hover:bg-gray-50 rounded-lg transition-colors"
                            >
                              <Shield className="h-5 w-5 text-orange-500" />
                              <div>
                                <p className="font-medium">Admin Login</p>
                                <p className="text-sm text-gray-500">Access platform administration</p>
                              </div>
                            </Link>
                          </div>
                        </div>
                      </div>
                    </div>,
                    document.body
                  )}
                </div>
                <div className="relative">
                  <button
                    onClick={() => setIsSignupModalOpen(true)}
                    className="bg-orange-500 text-white px-3 py-2 lg:px-4 rounded-lg hover:bg-orange-600 transition-colors text-sm lg:text-base flex items-center space-x-1"
                  >
                    <span>Sign Up</span>
                  </button>
                  {isSignupModalOpen && createPortal(
                    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                      <div className="signup-modal-content bg-white rounded-lg shadow-xl w-full max-w-md mx-4 transform transition-all">
                        <div className="p-6">
                          <div className="flex justify-between items-center mb-4">
                            <h3 className="text-lg font-semibold text-gray-900">Choose Account Type</h3>
                            <button
                              onClick={() => setIsSignupModalOpen(false)}
                              className="text-gray-400 hover:text-gray-500 transition-colors"
                            >
                              <X className="h-5 w-5" />
                            </button>
                          </div>
                          <div className="space-y-3">
                            <Link
                              to="/signup/customer"
                              onClick={() => setIsSignupModalOpen(false)}
                              className="flex items-center space-x-3 w-full px-4 py-3 text-left text-gray-700 hover:bg-gray-50 rounded-lg transition-colors"
                            >
                              <User className="h-5 w-5 text-orange-500" />
                              <div>
                                <p className="font-medium">Customer Sign Up</p>
                                <p className="text-sm text-gray-500">Order food from local restaurants</p>
                              </div>
                            </Link>
                            <Link
                              to="/signup/vendor"
                              onClick={() => setIsSignupModalOpen(false)}
                              className="flex items-center space-x-3 w-full px-4 py-3 text-left text-gray-700 hover:bg-gray-50 rounded-lg transition-colors"
                            >
                              <Utensils className="h-5 w-5 text-orange-500" />
                              <div>
                                <p className="font-medium">Vendor Sign Up</p>
                                <p className="text-sm text-gray-500">List your restaurant and start selling</p>
                              </div>
                            </Link>
                            <Link
                              to="/signup/admin"
                              onClick={() => setIsSignupModalOpen(false)}
                              className="flex items-center space-x-3 w-full px-4 py-3 text-left text-gray-700 hover:bg-gray-50 rounded-lg transition-colors"
                            >
                              <Shield className="h-5 w-5 text-orange-500" />
                              <div>
                                <p className="font-medium">Admin Sign Up</p>
                                <p className="text-sm text-gray-500">Manage the platform</p>
                              </div>
                            </Link>
                          </div>
                        </div>
                      </div>
                    </div>,
                    document.body
                  )}
                </div>
              </div>
            )}

            {/* Mobile menu button */}
            <div className="mobile-menu-container">
              <button
                onClick={handleMobileMenuToggle}
                className="lg:hidden p-2 text-gray-700 hover:text-orange-500 transition-colors touch-manipulation"
              >
                {isMenuOpen ? <X className="h-5 w-5 sm:h-6 sm:w-6" /> : <Menu className="h-5 w-5 sm:h-6 sm:w-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="lg:hidden absolute top-full left-0 right-0 bg-white border-t border-gray-200 shadow-lg z-40 mobile-menu-container">
            <nav className="flex flex-col py-4 px-4">
              <Link
                to="/restaurants"
                className="text-gray-700 hover:text-orange-500 transition-colors py-3 text-base font-medium touch-manipulation"
                onClick={() => setIsMenuOpen(false)}
              >
                Browse Restaurants
              </Link>
              {user?.role === 'customer' && (
                <Link
                  to="/dashboard"
                  className="text-gray-700 hover:text-orange-500 transition-colors py-3 text-base font-medium touch-manipulation"
                  onClick={() => setIsMenuOpen(false)}
                >
                  My Orders
                </Link>
              )}
              {!user && (
                <div className="flex flex-col space-y-3 pt-4 border-t border-gray-200 mt-4">
                  <div className="space-y-2">
                    <p className="text-sm font-medium text-gray-500">Login as:</p>
                    <Link
                      to="/login/customer"
                      className="flex items-center space-x-2 text-gray-700 hover:text-orange-500 transition-colors py-2 text-base font-medium touch-manipulation"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      <User className="h-5 w-5" />
                      <span>Customer Login</span>
                    </Link>
                    <Link
                      to="/login/vendor"
                      className="flex items-center space-x-2 text-gray-700 hover:text-orange-500 transition-colors py-2 text-base font-medium touch-manipulation"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      <Utensils className="h-5 w-5" />
                      <span>Vendor Login</span>
                    </Link>
                    <Link
                      to="/login/admin"
                      className="flex items-center space-x-2 text-gray-700 hover:text-orange-500 transition-colors py-2 text-base font-medium touch-manipulation"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      <Shield className="h-5 w-5" />
                      <span>Admin Login</span>
                    </Link>
                  </div>
                  <div className="space-y-2">
                    <p className="text-sm font-medium text-gray-500">Sign up as:</p>
                    <Link
                      to="/signup/customer"
                      className="flex items-center space-x-2 bg-orange-500 text-white px-4 py-3 rounded-lg hover:bg-orange-600 transition-colors text-base font-medium touch-manipulation"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      <User className="h-5 w-5" />
                      <span>Customer Sign Up</span>
                    </Link>
                    <Link
                      to="/signup/vendor"
                      className="flex items-center space-x-2 bg-orange-500 text-white px-4 py-3 rounded-lg hover:bg-orange-600 transition-colors text-base font-medium touch-manipulation"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      <Utensils className="h-5 w-5" />
                      <span>Vendor Sign Up</span>
                    </Link>
                    <Link
                      to="/signup/admin"
                      className="flex items-center space-x-2 bg-orange-500 text-white px-4 py-3 rounded-lg hover:bg-orange-600 transition-colors text-base font-medium touch-manipulation"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      <Shield className="h-5 w-5" />
                      <span>Admin Sign Up</span>
                    </Link>
                  </div>
                </div>
              )}
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;