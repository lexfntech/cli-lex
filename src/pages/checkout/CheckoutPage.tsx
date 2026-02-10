import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Calendar, Clock, CreditCard, Trash2 } from 'lucide-react';
import { useCart } from '../../context/CartContext';
import { useAuth } from '../../context/AuthContext';

const CheckoutPage: React.FC = () => {
  const { items, removeItem, updateQuantity, clearCart, totalAmount } = useCart();
  const { user } = useAuth();
  const navigate = useNavigate();
  
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTime, setSelectedTime] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('card');
  const [packagingOption, setPackagingOption] = useState('takeaway');
  const [isLoading, setIsLoading] = useState(false);

  // Generate available time slots
  const generateTimeSlots = () => {
    const slots = [];
    const now = new Date();
    const currentHour = now.getHours();
    const currentMinute = now.getMinutes();
    
    for (let hour = Math.max(11, currentHour); hour <= 22; hour++) {
      for (let minute of [0, 30]) {
        if (hour === currentHour && minute <= currentMinute + 30) continue;
        const timeString = `${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}`;
        slots.push(timeString);
      }
    }
    return slots;
  };

  const handlePlaceOrder = async () => {
    if (!selectedDate || !selectedTime) {
      alert('Please select pickup date and time');
      return;
    }

    setIsLoading(true);
    
    // Simulate order processing
    setTimeout(() => {
      const orderId = `ORDER-${Date.now()}`;
      clearCart();
      navigate(`/order-confirmation/${orderId}`);
    }, 2000);
  };

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 py-8 sm:py-12">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-6 sm:mb-8">Your Cart is Empty</h1>
            <p className="text-sm sm:text-base text-gray-600 mb-6 sm:mb-8">Add some delicious items to your cart to continue</p>
            <button
              onClick={() => navigate('/restaurants')}
              className="bg-orange-500 text-white px-6 sm:px-8 py-3 rounded-lg hover:bg-orange-600 transition-colors text-base font-medium touch-manipulation"
            >
              Browse Restaurants
            </button>
          </div>
        </div>
      </div>
    );
  }

  const deliveryFee = 2.99;
  const tax = totalAmount * 0.08;
  const finalTotal = totalAmount + deliveryFee + tax;

  return (
    <div className="min-h-screen bg-gray-50 py-6 sm:py-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-6 sm:mb-8">Checkout</h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8">
          {/* Order Details */}
          <div className="lg:col-span-2 space-y-4 sm:space-y-6">
            {/* Cart Items */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 sm:p-6">
              <h2 className="text-lg sm:text-xl font-semibold text-gray-900 mb-4">Order Items</h2>
              
              <div className="space-y-3 sm:space-y-4">
                {items.map((item) => (
                  <div key={item.id} className="flex items-start sm:items-center space-x-3 sm:space-x-4 py-3 sm:py-4 border-b border-gray-200 last:border-b-0">
                    {item.image && (
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-12 h-12 sm:w-16 sm:h-16 object-cover rounded-lg flex-shrink-0"
                      />
                    )}
                    
                    <div className="flex-1">
                      <h3 className="text-sm sm:text-base font-medium text-gray-900">{item.name}</h3>
                      {item.specialNotes && (
                        <p className="text-xs sm:text-sm text-gray-600 mt-1">Note: {item.specialNotes}</p>
                      )}
                      <p className="text-sm sm:text-base text-orange-600 font-medium mt-1">${item.price}</p>
                    </div>
                    
                    <div className="flex items-center space-x-1 sm:space-x-2 flex-shrink-0">
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        className="w-7 h-7 sm:w-8 sm:h-8 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-100 touch-manipulation"
                      >
                        <span className="text-sm">-</span>
                      </button>
                      <span className="w-6 sm:w-8 text-center text-sm sm:text-base">{item.quantity}</span>
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        className="w-7 h-7 sm:w-8 sm:h-8 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-100 touch-manipulation"
                      >
                        <span className="text-sm">+</span>
                      </button>
                    </div>
                    
                    <button
                      onClick={() => removeItem(item.id)}
                      className="text-red-500 hover:text-red-700 p-1 touch-manipulation"
                    >
                      <Trash2 className="h-4 w-4 sm:h-5 sm:w-5" />
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* Pickup Time Selection */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 sm:p-6">
              <h2 className="text-lg sm:text-xl font-semibold text-gray-900 mb-4">Pickup Time</h2>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <Calendar className="inline h-4 w-4 mr-1" />
                    Select Date
                  </label>
                  <input
                    type="date"
                    value={selectedDate}
                    onChange={(e) => setSelectedDate(e.target.value)}
                    min={new Date().toISOString().split('T')[0]}
                    className="w-full p-3 sm:p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 text-base"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <Clock className="inline h-4 w-4 mr-1" />
                    Select Time
                  </label>
                  <select
                    value={selectedTime}
                    onChange={(e) => setSelectedTime(e.target.value)}
                    className="w-full p-3 sm:p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 text-base"
                  >
                    <option value="">Choose time</option>
                    {generateTimeSlots().map(time => (
                      <option key={time} value={time}>{time}</option>
                    ))}
                  </select>
                </div>
              </div>
            </div>

            {/* Packaging Options */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 sm:p-6">
              <h2 className="text-lg sm:text-xl font-semibold text-gray-900 mb-4">Packaging Options</h2>
              
              <div className="space-y-3 sm:space-y-4">
                <label className="flex items-start sm:items-center space-x-3 cursor-pointer touch-manipulation">
                  <input
                    type="radio"
                    name="packaging"
                    value="takeaway"
                    checked={packagingOption === 'takeaway'}
                    onChange={(e) => setPackagingOption(e.target.value)}
                    className="text-orange-500 focus:ring-orange-500"
                  />
                  <span className="text-sm sm:text-base text-gray-700">Standard Takeaway (Free)</span>
                </label>
                
                <label className="flex items-start sm:items-center space-x-3 cursor-pointer touch-manipulation">
                  <input
                    type="radio"
                    name="packaging"
                    value="eco"
                    checked={packagingOption === 'eco'}
                    onChange={(e) => setPackagingOption(e.target.value)}
                    className="text-orange-500 focus:ring-orange-500"
                  />
                  <span className="text-sm sm:text-base text-gray-700">Eco-Friendly Packaging (+$1.50)</span>
                </label>
              </div>
            </div>

            {/* Payment Method */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 sm:p-6">
              <h2 className="text-lg sm:text-xl font-semibold text-gray-900 mb-4">Payment Method</h2>
              
              <div className="space-y-3 sm:space-y-4">
                <label className="flex items-center space-x-3 cursor-pointer touch-manipulation">
                  <input
                    type="radio"
                    name="payment"
                    value="card"
                    checked={paymentMethod === 'card'}
                    onChange={(e) => setPaymentMethod(e.target.value)}
                    className="text-orange-500 focus:ring-orange-500"
                  />
                  <CreditCard className="h-5 w-5 text-gray-400" />
                  <span className="text-sm sm:text-base text-gray-700">Credit/Debit Card</span>
                </label>
                
                <label className="flex items-center space-x-3 cursor-pointer touch-manipulation">
                  <input
                    type="radio"
                    name="payment"
                    value="cash"
                    checked={paymentMethod === 'cash'}
                    onChange={(e) => setPaymentMethod(e.target.value)}
                    className="text-orange-500 focus:ring-orange-500"
                  />
                  <span className="text-sm sm:text-base text-gray-700">Cash on Pickup</span>
                </label>
              </div>
            </div>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 sm:p-6 sticky top-8">
              <h2 className="text-lg sm:text-xl font-semibold text-gray-900 mb-4">Order Summary</h2>
              
              <div className="space-y-2 sm:space-y-3">
                <div className="flex justify-between">
                  <span className="text-sm sm:text-base text-gray-600">Subtotal</span>
                  <span className="text-sm sm:text-base font-medium">${totalAmount.toFixed(2)}</span>
                </div>
                
                <div className="flex justify-between">
                  <span className="text-sm sm:text-base text-gray-600">Service Fee</span>
                  <span className="text-sm sm:text-base font-medium">${deliveryFee.toFixed(2)}</span>
                </div>
                
                {packagingOption === 'eco' && (
                  <div className="flex justify-between">
                    <span className="text-sm sm:text-base text-gray-600">Eco Packaging</span>
                    <span className="text-sm sm:text-base font-medium">$1.50</span>
                  </div>
                )}
                
                <div className="flex justify-between">
                  <span className="text-sm sm:text-base text-gray-600">Tax</span>
                  <span className="text-sm sm:text-base font-medium">${tax.toFixed(2)}</span>
                </div>
                
                <div className="border-t border-gray-200 pt-2 sm:pt-3">
                  <div className="flex justify-between text-base sm:text-lg font-semibold">
                    <span>Total</span>
                    <span className="text-orange-600">
                      ${(finalTotal + (packagingOption === 'eco' ? 1.50 : 0)).toFixed(2)}
                    </span>
                  </div>
                </div>
              </div>
              
              <button
                onClick={handlePlaceOrder}
                disabled={isLoading || !selectedDate || !selectedTime}
                className="w-full bg-orange-500 text-white py-3 sm:py-4 rounded-lg font-semibold hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors mt-4 sm:mt-6 text-base touch-manipulation"
              >
                {isLoading ? 'Processing...' : 'Place Order'}
              </button>
              
              <p className="text-xs text-gray-500 text-center mt-3 sm:mt-4 leading-relaxed">
                By placing this order, you agree to our Terms of Service and Privacy Policy
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;