import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { CheckCircle, Clock, MapPin, Phone, Star, X } from 'lucide-react';
import { useOrders } from '../../context/OrderContext';

const OrderConfirmationPage: React.FC = () => {
  const { orderId } = useParams<{ orderId: string }>();
  const [orderStatus, setOrderStatus] = useState('confirmed');
  const [lastUpdated, setLastUpdated] = useState(new Date());
  const [otpCode, setOtpCode] = useState('');
  const [showOtpModal, setShowOtpModal] = useState(false);
  const { getOrderById, subscribeToOrderUpdates } = useOrders();

  // Generate OTP when order is ready
  useEffect(() => {
    if (orderStatus === 'ready') {
      const generatedOtp = Math.floor(100000 + Math.random() * 900000).toString();
      setOtpCode(generatedOtp);
    }
  }, [orderStatus]);

  // Mock order data - in real app, this would be fetched from API
  const orderData = {
    id: orderId,
    restaurant: {
      name: 'Pizza Palace',
      address: '123 Food Street, Downtown',
      phone: '+1 (555) 123-4567',
      image: 'https://images.pexels.com/photos/905847/pexels-photo-905847.jpeg?auto=compress&cs=tinysrgb&w=400'
    },
    items: [
      { name: 'Margherita Pizza', quantity: 1, price: 18.99 },
      { name: 'Garlic Bread', quantity: 2, price: 8.99 }
    ],
    pickupTime: '2:30 PM',
    pickupDate: 'Today',
    total: 36.97,
    status: orderStatus,
    estimatedReady: '2:25 PM',
    pickupOtp: otpCode
  };

  const statusSteps = [
    { key: 'confirmed', label: 'Order Confirmed', icon: CheckCircle, completed: true },
    { key: 'preparing', label: 'Preparing', icon: Clock, completed: orderStatus !== 'confirmed' },
    { key: 'ready', label: 'Ready for Pickup', icon: CheckCircle, completed: orderStatus === 'ready' }
  ];

  // Simulate status updates
  useEffect(() => {
    // Subscribe to real-time order updates
    if (orderId) {
      const unsubscribe = subscribeToOrderUpdates(orderId, (updatedOrder) => {
        setOrderStatus(updatedOrder.status);
        setLastUpdated(updatedOrder.lastUpdated);
      });

      // Check initial order status
      const currentOrder = getOrderById(orderId);
      if (currentOrder) {
        setOrderStatus(currentOrder.status);
        setLastUpdated(currentOrder.lastUpdated);
      }

      return unsubscribe;
    }

    // Simulate real-time status updates from restaurant
    const timer1 = setTimeout(() => {
      setOrderStatus('preparing');
      setLastUpdated(new Date());
    }, 3000);
    
    const timer2 = setTimeout(() => {
      setOrderStatus('ready');
      setLastUpdated(new Date());
    }, 8000);
    
    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
    };
  }, [orderId, subscribeToOrderUpdates, getOrderById]);

  // Simulate periodic status checks (in real app, this would be WebSocket or polling)
  useEffect(() => {
    const statusCheckInterval = setInterval(() => {
      // In a real app, this would check the server for status updates
      // For demo purposes, we'll just update the timestamp
      setLastUpdated(new Date());
    }, 30000); // Check every 30 seconds

    return () => clearInterval(statusCheckInterval);
  }, []);
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'confirmed': return 'text-blue-600 bg-blue-100';
      case 'preparing': return 'text-orange-600 bg-orange-100';
      case 'ready': return 'text-green-600 bg-green-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-6 sm:py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Success Header */}
        <div className="text-center mb-6 sm:mb-8">
          <div className="w-16 h-16 sm:w-20 sm:h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4">
            <CheckCircle className="h-10 w-10 sm:h-12 sm:w-12 text-green-600" />
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">Order Confirmed!</h1>
          <p className="text-sm sm:text-base text-gray-600">Your order has been placed successfully</p>
          <p className="text-xs sm:text-sm text-gray-500 mt-2">Order ID: #{orderData.id}</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8">
          {/* Order Status */}
          <div className="lg:col-span-2 space-y-4 sm:space-y-6">
            {/* Status Tracker */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 sm:p-6">
              <h2 className="text-lg sm:text-xl font-semibold text-gray-900 mb-4 sm:mb-6">Order Status</h2>
              
              <div className="space-y-3 sm:space-y-4">
                {statusSteps.map((step, index) => {
                  const Icon = step.icon;
                  const isActive = step.key === orderStatus;
                  const isCompleted = step.completed;
                  
                  return (
                    <div key={step.key} className="flex items-center space-x-3 sm:space-x-4">
                      <div className={`w-8 h-8 sm:w-10 sm:h-10 rounded-full flex items-center justify-center ${
                        isCompleted ? 'bg-green-100 text-green-600' : 
                        isActive ? 'bg-orange-100 text-orange-600' : 'bg-gray-100 text-gray-400'
                      }`}>
                        <Icon className="h-4 w-4 sm:h-5 sm:w-5" />
                      </div>
                      <div className="flex-1">
                        <p className={`text-sm sm:text-base font-medium ${
                          isCompleted ? 'text-green-600' : 
                          isActive ? 'text-orange-600' : 'text-gray-400'
                        }`}>
                          {step.label}
                        </p>
                        {isActive && (
                          <p className="text-xs sm:text-sm text-gray-500">In progress...</p>
                        )}
                      </div>
                      {index < statusSteps.length - 1 && (
                        <div className={`w-px h-6 sm:h-8 ${isCompleted ? 'bg-green-200' : 'bg-gray-200'}`} />
                      )}
                    </div>
                  );
                })}
              </div>

              <div className={`mt-4 sm:mt-6 p-3 sm:p-4 rounded-lg ${getStatusColor(orderStatus)}`}>
                <p className="text-sm sm:text-base font-medium">
                  {orderStatus === 'confirmed' && 'Your order is confirmed and will be prepared soon.'}
                  {orderStatus === 'preparing' && 'Your order is being prepared by the restaurant.'}
                  {orderStatus === 'ready' && 'Your order is ready for pickup!'}
                </p>
                <p className="text-xs sm:text-sm mt-1">
                  Estimated ready time: {orderData.estimatedReady}
                </p>
                <p className="text-xs text-gray-500 mt-2">
                  Last updated: {lastUpdated.toLocaleTimeString()}
                </p>
              </div>
            </div>

            {/* Restaurant Info */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 sm:p-6">
              <h2 className="text-lg sm:text-xl font-semibold text-gray-900 mb-3 sm:mb-4">Restaurant Details</h2>
              
              <div className="flex items-start space-x-3 sm:space-x-4">
                <img
                  src={orderData.restaurant.image}
                  alt={orderData.restaurant.name}
                  className="w-12 h-12 sm:w-16 sm:h-16 object-cover rounded-lg flex-shrink-0"
                />
                <div className="flex-1">
                  <h3 className="text-sm sm:text-base font-semibold text-gray-900">{orderData.restaurant.name}</h3>
                  <div className="flex items-start space-x-1 text-gray-600 mt-1">
                    <MapPin className="h-4 w-4" />
                    <span className="text-xs sm:text-sm leading-relaxed">{orderData.restaurant.address}</span>
                  </div>
                  <div className="flex items-center space-x-1 text-gray-600 mt-1">
                    <Phone className="h-4 w-4" />
                    <span className="text-xs sm:text-sm">{orderData.restaurant.phone}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Order Items */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 sm:p-6">
              <h2 className="text-lg sm:text-xl font-semibold text-gray-900 mb-3 sm:mb-4">Order Items</h2>
              
              <div className="space-y-2 sm:space-y-3">
                {orderData.items.map((item, index) => (
                  <div key={index} className="flex justify-between items-center py-2 sm:py-3 border-b border-gray-100 last:border-b-0">
                    <div>
                      <p className="text-sm sm:text-base font-medium text-gray-900">{item.name}</p>
                      <p className="text-xs sm:text-sm text-gray-600">Quantity: {item.quantity}</p>
                    </div>
                    <p className="text-sm sm:text-base font-medium text-gray-900">${item.price}</p>
                  </div>
                ))}
              </div>
              
              <div className="border-t border-gray-200 pt-3 sm:pt-4 mt-3 sm:mt-4">
                <div className="flex justify-between items-center">
                  <span className="text-base sm:text-lg font-semibold text-gray-900">Total</span>
                  <span className="text-base sm:text-lg font-semibold text-orange-600">${orderData.total}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Pickup Info & QR Code */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 sm:p-6 sticky top-8">
              <h2 className="text-lg sm:text-xl font-semibold text-gray-900 mb-3 sm:mb-4">Pickup Information</h2>
              
              <div className="space-y-3 sm:space-y-4 mb-4 sm:mb-6">
                <div>
                  <p className="text-xs sm:text-sm font-medium text-gray-700">Pickup Date</p>
                  <p className="text-sm sm:text-base text-gray-900">{orderData.pickupDate}</p>
                </div>
                <div>
                  <p className="text-xs sm:text-sm font-medium text-gray-700">Pickup Time</p>
                  <p className="text-sm sm:text-base text-gray-900">{orderData.pickupTime}</p>
                </div>
                <div>
                  <p className="text-xs sm:text-sm font-medium text-gray-700">Estimated Ready</p>
                  <p className="text-sm sm:text-base text-green-600 font-medium">{orderData.estimatedReady}</p>
                </div>
              </div>

              {/* QR Code */}
              {/* OTP Code */}
              {orderStatus === 'ready' && otpCode && (
                <div className="text-center mb-4 sm:mb-6">
                  <div className="bg-gradient-to-r from-green-50 to-blue-50 border-2 border-green-200 rounded-lg p-4 sm:p-6 mb-3">
                    <div className="text-center">
                      <div className="w-12 h-12 sm:w-16 sm:h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
                        <span className="text-green-600 font-bold text-lg sm:text-xl">#</span>
                      </div>
                      <p className="text-xs sm:text-sm font-medium text-gray-700 mb-2">Pickup OTP Code</p>
                      <div className="bg-white rounded-lg p-3 sm:p-4 border-2 border-dashed border-green-300 mb-3">
                        <p className="text-2xl sm:text-3xl font-bold text-green-600 tracking-wider">{otpCode}</p>
                      </div>
                      <p className="text-xs text-gray-600 leading-relaxed">
                        Share this 6-digit code with the restaurant staff for pickup verification
                      </p>
                    </div>
                  </div>
                  <button 
                    onClick={() => setShowOtpModal(true)}
                    className="text-orange-500 hover:text-orange-600 text-xs sm:text-sm font-medium flex items-center space-x-1 mx-auto touch-manipulation"
                  >
                    <span>View Pickup Instructions</span>
                  </button>
                </div>
              )}
              
              {orderStatus !== 'ready' && (
                <div className="text-center mb-4 sm:mb-6">
                  <div className="w-16 h-16 sm:w-20 sm:h-20 bg-gray-100 rounded-lg flex items-center justify-center mx-auto mb-3">
                    <Clock className="h-8 w-8 sm:h-10 sm:w-10 text-gray-400" />
                  </div>
                  <p className="text-xs sm:text-sm font-medium text-gray-700 mb-2">Pickup Code</p>
                  <p className="text-xs text-gray-500">
                    Your pickup code will be generated when your order is ready
                  </p>
                </div>
              )}

              {/* Action Buttons */}
              <div className="space-y-2 sm:space-y-3">
                <Link
                  to="/dashboard"
                  className="w-full bg-orange-500 text-white py-2 sm:py-3 px-4 rounded-lg font-medium hover:bg-orange-600 transition-colors text-center block text-sm sm:text-base touch-manipulation"
                >
                  View All Orders
                </Link>
                <Link
                  to="/restaurants"
                  className="w-full border border-gray-300 text-gray-700 py-2 sm:py-3 px-4 rounded-lg font-medium hover:bg-gray-50 transition-colors text-center block text-sm sm:text-base touch-manipulation"
                >
                  Order Again
                </Link>
              </div>

              {/* Help */}
              <div className="mt-4 sm:mt-6 pt-4 sm:pt-6 border-t border-gray-200">
                <p className="text-xs sm:text-sm text-gray-600 mb-2">Need help with your order?</p>
                <button 
                  onClick={() => alert('Contact Support: Call +1 (555) 123-HELP or email support@foodpickup.com')}
                  className="text-orange-500 hover:text-orange-600 text-xs sm:text-sm font-medium touch-manipulation"
                >
                  Contact Support
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Review Prompt */}
        {orderStatus === 'ready' && (
          <div className="mt-6 sm:mt-8 bg-white rounded-lg shadow-sm border border-gray-200 p-4 sm:p-6">
            <div className="text-center">
              <Star className="h-6 w-6 sm:h-8 sm:w-8 text-yellow-400 mx-auto mb-2 sm:mb-3" />
              <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-2">How was your experience?</h3>
              <p className="text-sm sm:text-base text-gray-600 mb-3 sm:mb-4">Help others discover great food by leaving a review</p>
              <button 
                onClick={() => {
                  const rating = prompt('Rate your experience (1-5 stars):');
                  if (rating && parseInt(rating) >= 1 && parseInt(rating) <= 5) {
                    const review = prompt('Leave a review (optional):');
                    alert(`Thank you for your ${rating}-star rating!${review ? ' Your review has been submitted.' : ''}`);
                  }
                }}
                className="bg-orange-500 text-white px-4 sm:px-6 py-2 sm:py-3 rounded-lg hover:bg-orange-600 transition-colors text-sm sm:text-base font-medium touch-manipulation"
              >
                Leave a Review
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default OrderConfirmationPage;