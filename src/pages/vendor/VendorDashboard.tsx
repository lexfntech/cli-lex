import React, { useState } from 'react';
import { Clock, Package, DollarSign, Users, CheckCircle, XCircle, Eye, Printer } from 'lucide-react';
import { useOrders } from '../../context/OrderContext';

const VendorDashboard: React.FC = () => {
  const [selectedTab, setSelectedTab] = useState('orders');
  const [orderFilter, setOrderFilter] = useState('all');
  const { updateOrderStatus } = useOrders();

  // Mock data
  const stats = {
    todayOrders: 24,
    todayRevenue: 1248.50,
    pendingOrders: 3,
    completedOrders: 21
  };

  const [orders, setOrders] = useState([
    {
      id: 'ORDER-001',
      customer: 'John Doe',
      items: [
        { name: 'Margherita Pizza', quantity: 1, price: 18.99 },
        { name: 'Garlic Bread', quantity: 2, price: 8.99 }
      ],
      total: 36.97,
      status: 'pending',
      pickupTime: '2:30 PM',
      orderTime: '1:45 PM',
      specialNotes: 'Extra cheese on pizza'
    },
    {
      id: 'ORDER-002',
      customer: 'Jane Smith',
      items: [
        { name: 'Pepperoni Pizza', quantity: 1, price: 21.99 }
      ],
      total: 21.99,
      status: 'preparing',
      pickupTime: '3:00 PM',
      orderTime: '2:15 PM',
      specialNotes: ''
    },
    {
      id: 'ORDER-003',
      customer: 'Mike Johnson',
      items: [
        { name: 'Caesar Salad', quantity: 2, price: 12.99 },
        { name: 'Chicken Alfredo', quantity: 1, price: 24.99 }
      ],
      total: 50.97,
      status: 'ready',
      pickupTime: '2:00 PM',
      orderTime: '1:30 PM',
      specialNotes: 'No croutons in salad'
    }
  ]);

  const menuItems = [
    { id: 1, name: 'Margherita Pizza', price: 18.99, category: 'Pizza', available: true },
    { id: 2, name: 'Pepperoni Pizza', price: 21.99, category: 'Pizza', available: true },
    { id: 3, name: 'Garlic Bread', price: 8.99, category: 'Appetizers', available: false },
    { id: 4, name: 'Caesar Salad', price: 12.99, category: 'Salads', available: true }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'preparing': return 'bg-blue-100 text-blue-800';
      case 'ready': return 'bg-green-100 text-green-800';
      case 'completed': return 'bg-gray-100 text-gray-800';
      case 'picked_up': return 'bg-purple-100 text-purple-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const handleStatusUpdate = (orderId: string, newStatus: string) => {
    // Update in global order context
    updateOrderStatus(orderId, newStatus as any);
    
    setOrders(prevOrders => {
      const updatedOrders = prevOrders.map(order => 
        order.id === orderId ? { ...order, status: newStatus } : order
      );
      
      // Show success message with appropriate text
      const statusMessages = {
        'preparing': 'accepted and is now being prepared',
        'ready': 'marked as ready for pickup',
        'picked_up': 'marked as picked up and completed',
        'cancelled': 'cancelled'
      };
      
      const message = statusMessages[newStatus] || `updated to ${newStatus}`;
      alert(`Order ${orderId} has been ${message}`);
      
      // Auto-switch to appropriate filter when status changes
      if (newStatus === 'preparing' && orderFilter !== 'preparing') {
        setOrderFilter('preparing');
      } else if (newStatus === 'ready' && orderFilter !== 'ready') {
        setOrderFilter('ready');
      } else if (newStatus === 'picked_up') {
        // For picked up orders, we can either archive them or show in completed
        // For this demo, we'll filter to show all orders so user can see the change
        setOrderFilter('all');
      }
      
      return updatedOrders;
    });
  };

  const filteredOrders = orders.filter(order => {
    if (orderFilter === 'all') return true;
    return order.status === orderFilter;
  });

  return (
    <div className="min-h-screen bg-gray-50 py-6 sm:py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-6 sm:mb-8">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">Vendor Dashboard</h1>
          <p className="text-sm sm:text-base text-gray-600">Manage your restaurant orders and menu</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6 mb-6 sm:mb-8">
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-3 sm:p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs sm:text-sm font-medium text-gray-600">Today's Orders</p>
                <p className="text-lg sm:text-2xl font-bold text-blue-600">{stats.todayOrders}</p>
              </div>
              <div className="w-8 h-8 sm:w-12 sm:h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <Package className="h-4 w-4 sm:h-6 sm:w-6 text-blue-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-3 sm:p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs sm:text-sm font-medium text-gray-600">Today's Revenue</p>
                <p className="text-lg sm:text-2xl font-bold text-green-600">${stats.todayRevenue}</p>
              </div>
              <div className="w-8 h-8 sm:w-12 sm:h-12 bg-green-100 rounded-lg flex items-center justify-center">
                <DollarSign className="h-4 w-4 sm:h-6 sm:w-6 text-green-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-3 sm:p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs sm:text-sm font-medium text-gray-600">Pending Orders</p>
                <p className="text-lg sm:text-2xl font-bold text-orange-600">{stats.pendingOrders}</p>
              </div>
              <div className="w-8 h-8 sm:w-12 sm:h-12 bg-orange-100 rounded-lg flex items-center justify-center">
                <Clock className="h-4 w-4 sm:h-6 sm:w-6 text-orange-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-3 sm:p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs sm:text-sm font-medium text-gray-600">Completed Today</p>
                <p className="text-lg sm:text-2xl font-bold text-gray-600">{stats.completedOrders}</p>
              </div>
              <div className="w-8 h-8 sm:w-12 sm:h-12 bg-gray-100 rounded-lg flex items-center justify-center">
                <CheckCircle className="h-4 w-4 sm:h-6 sm:w-6 text-gray-600" />
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200">
          {/* Tabs */}
          <div className="border-b border-gray-200 px-4 sm:px-6 py-3 sm:py-4">
            <div className="flex space-x-4 sm:space-x-8 overflow-x-auto">
              <button
                onClick={() => setSelectedTab('orders')}
                className={`py-2 px-1 border-b-2 font-medium text-sm sm:text-base whitespace-nowrap touch-manipulation ${
                  selectedTab === 'orders'
                    ? 'border-orange-500 text-orange-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700'
                }`}
              >
                Orders Management
              </button>
              <button
                onClick={() => setSelectedTab('menu')}
                className={`py-2 px-1 border-b-2 font-medium text-sm sm:text-base whitespace-nowrap touch-manipulation ${
                  selectedTab === 'menu'
                    ? 'border-orange-500 text-orange-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700'
                }`}
              >
                Menu Management
              </button>
            </div>
          </div>

          {/* Orders Tab */}
          {selectedTab === 'orders' && (
            <div className="p-4 sm:p-6">
              {/* Order Filters */}
              <div className="mb-4 sm:mb-6">
                <div className="flex flex-wrap gap-2 sm:gap-4">
                  {['all', 'pending', 'preparing', 'ready', 'picked_up'].map((filter) => (
                    <button
                      key={filter}
                      onClick={() => setOrderFilter(filter)}
                      className={`px-3 sm:px-4 py-2 rounded-lg font-medium capitalize transition-colors text-sm sm:text-base touch-manipulation ${
                        orderFilter === filter
                          ? 'bg-orange-100 text-orange-700'
                          : 'text-gray-600 hover:text-gray-900'
                      }`}
                    >
                      {filter === 'picked_up' ? 'Picked Up' : filter} Orders
                    </button>
                  ))}
                </div>
              </div>

              {/* Orders List */}
              <div className="space-y-3 sm:space-y-4">
                {filteredOrders.map((order) => (
                  <div key={order.id} className="border border-gray-200 rounded-lg p-4 sm:p-6">
                    <div className="flex flex-col sm:flex-row sm:items-start justify-between mb-3 sm:mb-4 gap-3 sm:gap-0">
                      <div>
                        <h3 className="text-base sm:text-lg font-semibold text-gray-900">Order #{order.id}</h3>
                        <p className="text-sm sm:text-base text-gray-600">Customer: {order.customer}</p>
                        <p className="text-xs sm:text-sm text-gray-500">
                          Ordered: {order.orderTime} | Pickup: {order.pickupTime}
                        </p>
                      </div>
                      <div className="text-left sm:text-right">
                        <span className={`inline-flex px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(order.status)}`}>
                          {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                        </span>
                        <p className="text-base sm:text-lg font-semibold text-gray-900 mt-2">${order.total}</p>
                      </div>
                    </div>

                    {/* Order Items */}
                    <div className="mb-3 sm:mb-4">
                      <h4 className="text-sm sm:text-base font-medium text-gray-900 mb-2">Items:</h4>
                      <div className="space-y-1">
                        {order.items.map((item, index) => (
                          <div key={index} className="flex justify-between text-xs sm:text-sm">
                            <span>{item.quantity}x {item.name}</span>
                            <span>${item.price}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Special Notes */}
                    {order.specialNotes && (
                      <div className="mb-3 sm:mb-4">
                        <h4 className="text-sm sm:text-base font-medium text-gray-900 mb-1">Special Notes:</h4>
                        <p className="text-xs sm:text-sm text-gray-600 bg-yellow-50 p-2 sm:p-3 rounded">{order.specialNotes}</p>
                      </div>
                    )}

                    {/* Action Buttons */}
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-0">
                      <div className="flex flex-wrap gap-2">
                        <button className="flex items-center space-x-1 text-gray-600 hover:text-gray-800 text-xs sm:text-sm touch-manipulation">
                          <Eye className="h-4 w-4" />
                          <span>View Details</span>
                        </button>
                        <button 
                          onClick={() => window.print()}
                          className="flex items-center space-x-1 text-gray-600 hover:text-gray-800 text-xs sm:text-sm touch-manipulation"
                        >
                          <Printer className="h-4 w-4" />
                          <span>Print</span>
                        </button>
                      </div>

                      <div className="flex flex-wrap gap-2">
                        {order.status === 'pending' && (
                          <>
                            <button
                              onClick={() => handleStatusUpdate(order.id, 'preparing')}
                              className="bg-blue-500 text-white px-3 sm:px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors text-xs sm:text-sm font-medium touch-manipulation"
                            >
                              Accept & Prepare
                            </button>
                            <button
                              onClick={() => {
                                if (window.confirm(`Are you sure you want to reject order ${order.id}?`)) {
                                  handleStatusUpdate(order.id, 'cancelled');
                                }
                              }}
                              className="bg-red-500 text-white px-3 sm:px-4 py-2 rounded-lg hover:bg-red-600 transition-colors text-xs sm:text-sm font-medium touch-manipulation"
                            >
                              Reject
                            </button>
                          </>
                        )}
                        {order.status === 'preparing' && (
                          <button
                            onClick={() => handleStatusUpdate(order.id, 'ready')}
                            className="bg-green-500 text-white px-3 sm:px-4 py-2 rounded-lg hover:bg-green-600 transition-colors text-xs sm:text-sm font-medium touch-manipulation"
                          >
                            Mark as Ready
                          </button>
                        )}
                        {order.status === 'ready' && (
                          <button
                            onClick={() => {
                              const enteredOtp = prompt(`Enter the customer's pickup code to confirm pickup for order ${order.id}:`);
                              if (enteredOtp === order.otpCode) {
                                handleStatusUpdate(order.id, 'picked_up');
                                alert(`Order ${order.id} pickup confirmed successfully!`);
                              } else if (enteredOtp !== null) {
                                alert('Invalid pickup code. Please verify the code with the customer.');
                              }
                            }}
                            className="bg-purple-500 text-white px-3 sm:px-4 py-2 rounded-lg hover:bg-purple-600 transition-colors text-xs sm:text-sm font-medium touch-manipulation"
                          >
                            Verify & Complete Pickup
                          </button>
                        )}
                        {order.status === 'cancelled' && (
                          <span className="text-red-600 text-xs sm:text-sm font-medium px-3 sm:px-4 py-2">
                            Order Cancelled
                          </span>
                        )}
                        {order.status === 'picked_up' && (
                          <span className="text-purple-600 text-xs sm:text-sm font-medium px-3 sm:px-4 py-2">
                            Order Completed
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Menu Tab */}
          {selectedTab === 'menu' && (
            <div className="p-4 sm:p-6">
              <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-4 sm:mb-6 gap-3 sm:gap-0">
                <h2 className="text-lg sm:text-xl font-semibold text-gray-900">Menu Items</h2>
                <button 
                  onClick={() => alert('Add New Item functionality would open a form to create new menu items')}
                  className="bg-orange-500 text-white px-4 py-2 sm:py-3 rounded-lg hover:bg-orange-600 transition-colors text-sm sm:text-base font-medium touch-manipulation"
                >
                  Add New Item
                </button>
              </div>

              <div className="space-y-3 sm:space-y-4">
                {menuItems.map((item) => (
                  <div key={item.id} className="border border-gray-200 rounded-lg p-3 sm:p-4">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-0">
                      <div>
                        <h3 className="text-sm sm:text-base font-semibold text-gray-900">{item.name}</h3>
                        <p className="text-xs sm:text-sm text-gray-600">{item.category}</p>
                        <p className="text-base sm:text-lg font-medium text-orange-600">${item.price}</p>
                      </div>
                      <div className="flex flex-col sm:flex-row sm:items-center space-y-2 sm:space-y-0 sm:space-x-4">
                        <div className="flex items-center space-x-2 sm:space-x-3">
                          <span className="text-xs sm:text-sm text-gray-600">Available:</span>
                          <button
                            onClick={() => {
                              // Toggle availability
                              const newStatus = !item.available;
                              alert(`${item.name} is now ${newStatus ? 'available' : 'unavailable'}`);
                            }}
                            className={`w-10 h-5 sm:w-12 sm:h-6 rounded-full transition-colors touch-manipulation ${
                              item.available ? 'bg-green-500' : 'bg-gray-300'
                            }`}
                          >
                            <div className={`w-4 h-4 sm:w-5 sm:h-5 bg-white rounded-full transition-transform ${
                              item.available ? 'translate-x-5 sm:translate-x-6' : 'translate-x-0.5 sm:translate-x-1'
                            }`} />
                          </button>
                        </div>
                        <button 
                          onClick={() => alert(`Edit ${item.name} functionality would open an edit form`)}
                          className="text-orange-500 hover:text-orange-600 text-xs sm:text-sm font-medium touch-manipulation"
                        >
                          Edit
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default VendorDashboard;