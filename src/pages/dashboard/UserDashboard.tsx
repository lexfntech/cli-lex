import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Clock, MapPin, Star, Package, ChevronRight, Filter, Search, X, Save } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

const UserDashboard: React.FC = () => {
  const { user, signup } = useAuth();
  const [activeTab, setActiveTab] = useState('active');
  const [searchQuery, setSearchQuery] = useState('');
  const [showEditModal, setShowEditModal] = useState(false);
  const [editFormData, setEditFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    phone: user?.phone || '',
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  // Mock order data
  const orders = [
    {
      id: 'ORDER-001',
      restaurant: {
        name: 'Pizza Palace',
        image: 'https://images.pexels.com/photos/905847/pexels-photo-905847.jpeg?auto=compress&cs=tinysrgb&w=300'
      },
      items: ['Margherita Pizza', 'Garlic Bread'],
      total: 36.97,
      status: 'preparing',
      pickupTime: '2:30 PM',
      pickupDate: 'Today',
      orderDate: '2024-01-15',
      rating: null
    },
    {
      id: 'ORDER-002',
      restaurant: {
        name: 'Burger Barn',
        image: 'https://images.pexels.com/photos/1639562/pexels-photo-1639562.jpeg?auto=compress&cs=tinysrgb&w=300'
      },
      items: ['Classic Burger', 'Fries', 'Coke'],
      total: 24.50,
      status: 'completed',
      pickupTime: '1:00 PM',
      pickupDate: 'Yesterday',
      orderDate: '2024-01-14',
      rating: 5
    },
    {
      id: 'ORDER-003',
      restaurant: {
        name: 'Sushi Station',
        image: 'https://images.pexels.com/photos/357573/pexels-photo-357573.jpeg?auto=compress&cs=tinysrgb&w=300'
      },
      items: ['California Roll', 'Salmon Nigiri'],
      total: 32.99,
      status: 'completed',
      pickupTime: '7:30 PM',
      pickupDate: 'Jan 10',
      orderDate: '2024-01-10',
      rating: 4
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'confirmed': return 'bg-blue-100 text-blue-800';
      case 'preparing': return 'bg-orange-100 text-orange-800';
      case 'ready': return 'bg-green-100 text-green-800';
      case 'completed': return 'bg-gray-100 text-gray-800';
      case 'cancelled': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'confirmed': return 'Confirmed';
      case 'preparing': return 'Preparing';
      case 'ready': return 'Ready';
      case 'completed': return 'Completed';
      case 'cancelled': return 'Cancelled';
      default: return status;
    }
  };

  const filteredOrders = orders.filter(order => {
    const matchesTab = activeTab === 'active' 
      ? ['confirmed', 'preparing', 'ready'].includes(order.status)
      : order.status === 'completed';
    
    const matchesSearch = searchQuery === '' || 
      order.restaurant.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.id.toLowerCase().includes(searchQuery.toLowerCase());
    
    return matchesTab && matchesSearch;
  });

  const activeOrders = orders.filter(order => ['confirmed', 'preparing', 'ready'].includes(order.status));
  const completedOrders = orders.filter(order => order.status === 'completed');

  const handleEditProfile = () => {
    setEditFormData({
      name: user?.name || '',
      email: user?.email || '',
      phone: user?.phone || '',
    });
    setShowEditModal(true);
    setError('');
    setSuccess('');
  };

  const handleCloseModal = () => {
    setShowEditModal(false);
    setError('');
    setSuccess('');
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEditFormData({
      ...editFormData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSaveProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');
    setSuccess('');

    try {
      // Validate form data
      if (!editFormData.name.trim()) {
        setError('Name is required');
        setIsLoading(false);
        return;
      }
      if (!editFormData.email.trim()) {
        setError('Email is required');
        setIsLoading(false);
        return;
      }

      // Simulate API call - in real app, this would update user profile
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Update user data (in real app, this would come from API response)
      const updatedUserData = {
        ...user!,
        name: editFormData.name,
        email: editFormData.email,
        phone: editFormData.phone,
      };
      
      // Update localStorage (in real app, this would be handled by the auth context)
      localStorage.setItem('user', JSON.stringify(updatedUserData));
      
      setSuccess('Profile updated successfully!');
      setTimeout(() => {
        handleCloseModal();
        // Refresh the page to show updated data
        window.location.reload();
      }, 1500);
      
    } catch (err) {
      setError('Failed to update profile. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-6 sm:py-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-6 sm:mb-8">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">My Dashboard</h1>
          <p className="text-sm sm:text-base text-gray-600">Welcome back, {user?.name}!</p>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 mb-6 sm:mb-8">
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 sm:p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs sm:text-sm font-medium text-gray-600">Active Orders</p>
                <p className="text-xl sm:text-2xl font-bold text-orange-600">{activeOrders.length}</p>
              </div>
              <div className="w-10 h-10 sm:w-12 sm:h-12 bg-orange-100 rounded-lg flex items-center justify-center">
                <Clock className="h-5 w-5 sm:h-6 sm:w-6 text-orange-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 sm:p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs sm:text-sm font-medium text-gray-600">Total Orders</p>
                <p className="text-xl sm:text-2xl font-bold text-blue-600">{orders.length}</p>
              </div>
              <div className="w-10 h-10 sm:w-12 sm:h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <Package className="h-5 w-5 sm:h-6 sm:w-6 text-blue-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 sm:p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs sm:text-sm font-medium text-gray-600">Favorite Restaurant</p>
                <p className="text-sm sm:text-lg font-semibold text-gray-900">Pizza Palace</p>
              </div>
              <div className="w-10 h-10 sm:w-12 sm:h-12 bg-green-100 rounded-lg flex items-center justify-center">
                <Star className="h-5 w-5 sm:h-6 sm:w-6 text-green-600" />
              </div>
            </div>
          </div>
        </div>

        {/* Orders Section */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200">
          {/* Tabs and Search */}
          <div className="border-b border-gray-200 p-4 sm:p-6">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
              <div className="flex flex-wrap gap-1 sm:gap-2">
                <button
                  onClick={() => setActiveTab('active')}
                  className={`px-3 sm:px-4 py-2 rounded-lg font-medium transition-colors text-sm sm:text-base touch-manipulation ${
                    activeTab === 'active'
                      ? 'bg-orange-100 text-orange-700'
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  Active Orders ({activeOrders.length})
                </button>
                <button
                  onClick={() => setActiveTab('history')}
                  className={`px-3 sm:px-4 py-2 rounded-lg font-medium transition-colors text-sm sm:text-base touch-manipulation ${
                    activeTab === 'history'
                      ? 'bg-orange-100 text-orange-700'
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  Order History ({completedOrders.length})
                </button>
              </div>

              <div className="relative w-full lg:w-auto">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                <input
                  type="text"
                  placeholder="Search orders..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full lg:w-64 pl-10 pr-4 py-2 sm:py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent text-sm sm:text-base"
                />
              </div>
            </div>
          </div>

          {/* Orders List */}
          <div className="p-4 sm:p-6">
            {filteredOrders.length === 0 ? (
              <div className="text-center py-8 sm:py-12">
                <Package className="h-10 w-10 sm:h-12 sm:w-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-base sm:text-lg font-medium text-gray-900 mb-2">
                  {activeTab === 'active' ? 'No active orders' : 'No order history'}
                </h3>
                <p className="text-sm sm:text-base text-gray-600 mb-4 sm:mb-6">
                  {activeTab === 'active' 
                    ? 'You don\'t have any active orders right now.'
                    : 'You haven\'t completed any orders yet.'
                  }
                </p>
                <Link
                  to="/restaurants"
                  className="bg-orange-500 text-white px-4 sm:px-6 py-2 sm:py-3 rounded-lg hover:bg-orange-600 transition-colors text-sm sm:text-base font-medium touch-manipulation"
                >
                  Browse Restaurants
                </Link>
              </div>
            ) : (
              <div className="space-y-3 sm:space-y-4">
                {filteredOrders.map((order) => (
                  <div key={order.id} className="border border-gray-200 rounded-lg p-4 sm:p-6 hover:shadow-md transition-shadow">
                    <div className="flex flex-col sm:flex-row sm:items-start justify-between mb-3 sm:mb-4 gap-3 sm:gap-0">
                      <div className="flex items-start space-x-3 sm:space-x-4">
                        <img
                          src={order.restaurant.image}
                          alt={order.restaurant.name}
                          className="w-12 h-12 sm:w-16 sm:h-16 object-cover rounded-lg flex-shrink-0"
                        />
                        <div>
                          <h3 className="text-base sm:text-lg font-semibold text-gray-900">{order.restaurant.name}</h3>
                          <p className="text-xs sm:text-sm text-gray-600">Order #{order.id}</p>
                          <p className="text-xs sm:text-sm text-gray-500">{order.orderDate}</p>
                        </div>
                      </div>
                      <div className="text-left sm:text-right">
                        <span className={`inline-flex px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(order.status)}`}>
                          {getStatusText(order.status)}
                        </span>
                        <p className="text-base sm:text-lg font-semibold text-gray-900 mt-2">${order.total}</p>
                      </div>
                    </div>

                    <div className="mb-3 sm:mb-4">
                      <p className="text-xs sm:text-sm text-gray-600 mb-1">Items:</p>
                      <p className="text-sm sm:text-base text-gray-900">{order.items.join(', ')}</p>
                    </div>

                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-0">
                      <div className="flex items-center space-x-2 sm:space-x-4 text-xs sm:text-sm text-gray-600">
                        <div className="flex items-center space-x-1">
                          <Clock className="h-4 w-4" />
                          <span>Pickup: {order.pickupDate} at {order.pickupTime}</span>
                        </div>
                      </div>

                      <div className="flex flex-col sm:flex-row items-start sm:items-center space-y-2 sm:space-y-0 sm:space-x-3">
                        {order.status === 'completed' && !order.rating && (
                          <button 
                            onClick={() => {
                              const rating = prompt('Rate this order (1-5 stars):');
                              if (rating && parseInt(rating) >= 1 && parseInt(rating) <= 5) {
                                alert(`Thank you for rating this order ${rating} stars!`);
                                // In real app, this would update the order rating via API
                              }
                            }}
                            className="text-orange-500 hover:text-orange-600 text-xs sm:text-sm font-medium touch-manipulation"
                          >
                            Rate Order
                          </button>
                        )}
                        {order.status === 'completed' && order.rating && (
                          <div className="flex items-center space-x-1">
                            <Star className="h-4 w-4 text-yellow-400 fill-current" />
                            <span className="text-xs sm:text-sm text-gray-600">{order.rating}/5</span>
                          </div>
                        )}
                        <Link
                          to={`/order-confirmation/${order.id}`}
                          className="flex items-center space-x-1 text-orange-500 hover:text-orange-600 text-xs sm:text-sm font-medium touch-manipulation"
                        >
                          <span>View Details</span>
                          <ChevronRight className="h-4 w-4" />
                        </Link>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="mt-6 sm:mt-8 grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 sm:p-6">
            <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-3 sm:mb-4">Quick Reorder</h3>
            <p className="text-sm sm:text-base text-gray-600 mb-3 sm:mb-4">Reorder from your favorite restaurants</p>
            <Link
              to="/restaurants"
              className="bg-orange-500 text-white px-4 py-2 sm:py-3 rounded-lg hover:bg-orange-600 transition-colors inline-block text-sm sm:text-base font-medium touch-manipulation"
            >
              Browse Restaurants
            </Link>
          </div>

          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 sm:p-6">
            <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-3 sm:mb-4">Account Settings</h3>
            <p className="text-sm sm:text-base text-gray-600 mb-3 sm:mb-4">Update your profile and preferences</p>
            <button 
              onClick={handleEditProfile}
              className="border border-gray-300 text-gray-700 px-4 py-2 sm:py-3 rounded-lg hover:bg-gray-50 transition-colors text-sm sm:text-base font-medium touch-manipulation"
            >
              Edit Profile
            </button>
          </div>
        </div>

        {/* Edit Profile Modal */}
        {showEditModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg shadow-xl max-w-md w-full">
              <div className="p-4 sm:p-6">
                <div className="flex items-center justify-between mb-4 sm:mb-6">
                  <h3 className="text-base sm:text-lg font-semibold text-gray-900">Edit Profile</h3>
                  <button
                    onClick={handleCloseModal}
                    className="text-gray-400 hover:text-gray-600 transition-colors p-1 touch-manipulation"
                  >
                    <X className="h-5 w-5 sm:h-6 sm:w-6" />
                  </button>
                </div>

                <form onSubmit={handleSaveProfile} className="space-y-3 sm:space-y-4">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                      Full Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={editFormData.name}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 sm:py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent text-base"
                      placeholder="Enter your full name"
                      required
                    />
                  </div>

                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                      Email Address
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={editFormData.email}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 sm:py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent text-base"
                      placeholder="Enter your email"
                      required
                    />
                  </div>

                  <div>
                    <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={editFormData.phone}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 sm:py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent text-base"
                      placeholder="Enter your phone number"
                    />
                  </div>

                  {error && (
                    <div className="bg-red-50 border border-red-200 text-red-600 px-3 sm:px-4 py-2 sm:py-3 rounded-lg text-sm">
                      {error}
                    </div>
                  )}

                  {success && (
                    <div className="bg-green-50 border border-green-200 text-green-600 px-3 sm:px-4 py-2 sm:py-3 rounded-lg text-sm">
                      {success}
                    </div>
                  )}

                  <div className="flex flex-col sm:flex-row justify-end space-y-2 sm:space-y-0 sm:space-x-3 pt-3 sm:pt-4">
                    <button
                      type="button"
                      onClick={handleCloseModal}
                      className="w-full sm:w-auto px-4 py-2 sm:py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors text-sm sm:text-base font-medium touch-manipulation"
                      disabled={isLoading}
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      disabled={isLoading}
                      className="w-full sm:w-auto px-4 py-2 sm:py-3 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2 text-sm sm:text-base font-medium touch-manipulation"
                    >
                      <Save className="h-4 w-4" />
                      <span>{isLoading ? 'Saving...' : 'Save Changes'}</span>
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default UserDashboard;