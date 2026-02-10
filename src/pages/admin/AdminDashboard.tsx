import React, { useState } from 'react';
import { Users, Store, Package, DollarSign, TrendingUp, AlertCircle, Eye, Edit, Trash2 } from 'lucide-react';

const AdminDashboard: React.FC = () => {
  const [selectedTab, setSelectedTab] = useState('overview');
  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState<'view' | 'edit' | 'delete' | null>(null);
  const [selectedItem, setSelectedItem] = useState<any>(null);

  // Mock data
  const stats = {
    totalUsers: 1247,
    totalVendors: 89,
    totalOrders: 3456,
    totalRevenue: 125430.50,
    monthlyGrowth: 12.5
  };

  const recentOrders = [
    { id: 'ORDER-001', customer: 'John Doe', vendor: 'Pizza Palace', amount: 36.97, status: 'completed' },
    { id: 'ORDER-002', customer: 'Jane Smith', vendor: 'Burger Barn', amount: 24.50, status: 'preparing' },
    { id: 'ORDER-003', customer: 'Mike Johnson', vendor: 'Sushi Station', amount: 52.99, status: 'ready' }
  ];

  const vendors = [
    { id: 1, name: 'Pizza Palace', owner: 'Mario Rossi', status: 'active', orders: 156, revenue: 12450.00 },
    { id: 2, name: 'Burger Barn', owner: 'John Smith', status: 'active', orders: 89, revenue: 8930.00 },
    { id: 3, name: 'Sushi Station', owner: 'Yuki Tanaka', status: 'pending', orders: 0, revenue: 0 }
  ];

  const users = [
    { id: 1, name: 'Alice Johnson', email: 'alice@example.com', orders: 23, joined: '2024-01-15', status: 'active' },
    { id: 2, name: 'Bob Wilson', email: 'bob@example.com', orders: 12, joined: '2024-01-20', status: 'active' },
    { id: 3, name: 'Carol Davis', email: 'carol@example.com', orders: 8, joined: '2024-01-25', status: 'inactive' }
  ];

  const handleAction = (action: 'view' | 'edit' | 'delete', item: any, type: 'vendor' | 'user') => {
    setSelectedItem({ ...item, type });
    setModalType(action);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setModalType(null);
    setSelectedItem(null);
  };

  const handleConfirmDelete = () => {
    if (selectedItem) {
      console.log(`Deleting ${selectedItem.type}:`, selectedItem);
      // In a real app, this would make an API call to delete the item
      alert(`${selectedItem.type === 'vendor' ? 'Vendor' : 'User'} "${selectedItem.name}" has been deleted.`);
      handleCloseModal();
    }
  };

  const handleSaveEdit = () => {
    if (selectedItem) {
      console.log(`Saving ${selectedItem.type}:`, selectedItem);
      // In a real app, this would make an API call to update the item
      alert(`${selectedItem.type === 'vendor' ? 'Vendor' : 'User'} "${selectedItem.name}" has been updated.`);
      handleCloseModal();
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'inactive': return 'bg-red-100 text-red-800';
      case 'completed': return 'bg-gray-100 text-gray-800';
      case 'preparing': return 'bg-blue-100 text-blue-800';
      case 'ready': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-6 sm:py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-6 sm:mb-8">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">Admin Dashboard</h1>
          <p className="text-sm sm:text-base text-gray-600">Manage your food pickup platform</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 sm:gap-6 mb-6 sm:mb-8">
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-3 sm:p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs sm:text-sm font-medium text-gray-600">Total Users</p>
                <p className="text-lg sm:text-2xl font-bold text-blue-600">{stats.totalUsers.toLocaleString()}</p>
              </div>
              <div className="w-8 h-8 sm:w-12 sm:h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <Users className="h-4 w-4 sm:h-6 sm:w-6 text-blue-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-3 sm:p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs sm:text-sm font-medium text-gray-600">Total Vendors</p>
                <p className="text-lg sm:text-2xl font-bold text-purple-600">{stats.totalVendors}</p>
              </div>
              <div className="w-8 h-8 sm:w-12 sm:h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                <Store className="h-4 w-4 sm:h-6 sm:w-6 text-purple-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-3 sm:p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs sm:text-sm font-medium text-gray-600">Total Orders</p>
                <p className="text-lg sm:text-2xl font-bold text-orange-600">{stats.totalOrders.toLocaleString()}</p>
              </div>
              <div className="w-8 h-8 sm:w-12 sm:h-12 bg-orange-100 rounded-lg flex items-center justify-center">
                <Package className="h-4 w-4 sm:h-6 sm:w-6 text-orange-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-3 sm:p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs sm:text-sm font-medium text-gray-600">Total Revenue</p>
                <p className="text-lg sm:text-2xl font-bold text-green-600">${stats.totalRevenue.toLocaleString()}</p>
              </div>
              <div className="w-8 h-8 sm:w-12 sm:h-12 bg-green-100 rounded-lg flex items-center justify-center">
                <DollarSign className="h-4 w-4 sm:h-6 sm:w-6 text-green-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-3 sm:p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs sm:text-sm font-medium text-gray-600">Growth</p>
                <p className="text-lg sm:text-2xl font-bold text-indigo-600">+{stats.monthlyGrowth}%</p>
              </div>
              <div className="w-8 h-8 sm:w-12 sm:h-12 bg-indigo-100 rounded-lg flex items-center justify-center">
                <TrendingUp className="h-4 w-4 sm:h-6 sm:w-6 text-indigo-600" />
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200">
          {/* Tabs */}
          <div className="border-b border-gray-200 px-4 sm:px-6 py-3 sm:py-4">
            <div className="flex space-x-4 sm:space-x-8 overflow-x-auto">
              {[
                { key: 'overview', label: 'Overview' },
                { key: 'vendors', label: 'Vendors' },
                { key: 'users', label: 'Users' },
                { key: 'orders', label: 'Orders' }
              ].map((tab) => (
                <button
                  key={tab.key}
                  onClick={() => setSelectedTab(tab.key)}
                  className={`py-2 px-1 border-b-2 font-medium text-sm sm:text-base whitespace-nowrap touch-manipulation ${
                    selectedTab === tab.key
                      ? 'border-orange-500 text-orange-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>

          {/* Overview Tab */}
          {selectedTab === 'overview' && (
            <div className="p-4 sm:p-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8">
                {/* Recent Orders */}
                <div>
                  <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-3 sm:mb-4">Recent Orders</h3>
                  <div className="space-y-2 sm:space-y-3">
                    {recentOrders.map((order) => (
                      <div key={order.id} className="flex items-center justify-between p-3 sm:p-4 border border-gray-200 rounded-lg">
                        <div>
                          <p className="text-sm sm:text-base font-medium text-gray-900">{order.id}</p>
                          <p className="text-xs sm:text-sm text-gray-600">{order.customer} • {order.vendor}</p>
                        </div>
                        <div className="text-right">
                          <p className="text-sm sm:text-base font-medium text-gray-900">${order.amount}</p>
                          <span className={`inline-flex px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(order.status)}`}>
                            {order.status}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* System Alerts */}
                <div>
                  <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-3 sm:mb-4">System Alerts</h3>
                  <div className="space-y-2 sm:space-y-3">
                    <div className="flex items-start space-x-2 sm:space-x-3 p-3 sm:p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                      <AlertCircle className="h-5 w-5 text-yellow-600 mt-0.5" />
                      <div>
                        <p className="text-sm sm:text-base font-medium text-yellow-800">Pending Vendor Approval</p>
                        <p className="text-xs sm:text-sm text-yellow-700">3 vendors waiting for approval</p>
                      </div>
                    </div>
                    <div className="flex items-start space-x-2 sm:space-x-3 p-3 sm:p-4 bg-blue-50 border border-blue-200 rounded-lg">
                      <AlertCircle className="h-5 w-5 text-blue-600 mt-0.5" />
                      <div>
                        <p className="text-sm sm:text-base font-medium text-blue-800">System Update Available</p>
                        <p className="text-xs sm:text-sm text-blue-700">New features and security updates</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Vendors Tab */}
          {selectedTab === 'vendors' && (
            <div className="p-4 sm:p-6">
              <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-4 sm:mb-6 gap-3 sm:gap-0">
                <h2 className="text-lg sm:text-xl font-semibold text-gray-900">Vendor Management</h2>
                <button 
                  onClick={() => alert('Add Vendor functionality would open a form to register new vendors')}
                  className="bg-orange-500 text-white px-4 py-2 sm:py-3 rounded-lg hover:bg-orange-600 transition-colors text-sm sm:text-base font-medium touch-manipulation"
                >
                  Add Vendor
                </button>
              </div>

              <div className="overflow-x-auto -mx-4 sm:mx-0">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-3 sm:px-6 py-2 sm:py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Restaurant
                      </th>
                      <th className="px-3 sm:px-6 py-2 sm:py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Owner
                      </th>
                      <th className="px-3 sm:px-6 py-2 sm:py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Status
                      </th>
                      <th className="px-3 sm:px-6 py-2 sm:py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Orders
                      </th>
                      <th className="px-3 sm:px-6 py-2 sm:py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Revenue
                      </th>
                      <th className="px-3 sm:px-6 py-2 sm:py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {vendors.map((vendor) => (
                      <tr key={vendor.id}>
                        <td className="px-3 sm:px-6 py-3 sm:py-4 whitespace-nowrap">
                          <div className="text-sm sm:text-base font-medium text-gray-900">{vendor.name}</div>
                        </td>
                        <td className="px-3 sm:px-6 py-3 sm:py-4 whitespace-nowrap">
                          <div className="text-sm sm:text-base text-gray-900">{vendor.owner}</div>
                        </td>
                        <td className="px-3 sm:px-6 py-3 sm:py-4 whitespace-nowrap">
                          <span className={`inline-flex px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(vendor.status)}`}>
                            {vendor.status}
                          </span>
                        </td>
                        <td className="px-3 sm:px-6 py-3 sm:py-4 whitespace-nowrap text-sm sm:text-base text-gray-900">
                          {vendor.orders}
                        </td>
                        <td className="px-3 sm:px-6 py-3 sm:py-4 whitespace-nowrap text-sm sm:text-base text-gray-900">
                          ${vendor.revenue.toLocaleString()}
                        </td>
                        <td className="px-3 sm:px-6 py-3 sm:py-4 whitespace-nowrap text-sm font-medium">
                          <div className="flex space-x-2">
                            <button 
                              onClick={() => handleAction('view', vendor, 'vendor')}
                              className="text-blue-600 hover:text-blue-900 transition-colors p-1 touch-manipulation"
                              title="View Details"
                            >
                              <Eye className="h-4 w-4" />
                            </button>
                            <button 
                              onClick={() => handleAction('edit', vendor, 'vendor')}
                              className="text-orange-600 hover:text-orange-900 transition-colors p-1 touch-manipulation"
                              title="Edit Vendor"
                            >
                              <Edit className="h-4 w-4" />
                            </button>
                            <button 
                              onClick={() => handleAction('delete', vendor, 'vendor')}
                              className="text-red-600 hover:text-red-900 transition-colors p-1 touch-manipulation"
                              title="Delete Vendor"
                            >
                              <Trash2 className="h-4 w-4" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* Users Tab */}
          {selectedTab === 'users' && (
            <div className="p-4 sm:p-6">
              <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-4 sm:mb-6 gap-3 sm:gap-0">
                <h2 className="text-lg sm:text-xl font-semibold text-gray-900">User Management</h2>
                <button 
                  onClick={() => {
                    // Generate CSV data
                    const csvData = users.map(user => 
                      `${user.name},${user.email},${user.orders},${user.joined},${user.status}`
                    ).join('\n');
                    const header = 'Name,Email,Orders,Joined,Status\n';
                    const csv = header + csvData;
                    
                    // Create and download file
                    const blob = new Blob([csv], { type: 'text/csv' });
                    const url = window.URL.createObjectURL(blob);
                    const a = document.createElement('a');
                    a.href = url;
                    a.download = 'users-export.csv';
                    a.click();
                    window.URL.revokeObjectURL(url);
                  }}
                  className="bg-orange-500 text-white px-4 py-2 sm:py-3 rounded-lg hover:bg-orange-600 transition-colors text-sm sm:text-base font-medium touch-manipulation"
                >
                  Export Users
                </button>
              </div>

              <div className="overflow-x-auto -mx-4 sm:mx-0">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-3 sm:px-6 py-2 sm:py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Name
                      </th>
                      <th className="px-3 sm:px-6 py-2 sm:py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Email
                      </th>
                      <th className="px-3 sm:px-6 py-2 sm:py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Orders
                      </th>
                      <th className="px-3 sm:px-6 py-2 sm:py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Joined
                      </th>
                      <th className="px-3 sm:px-6 py-2 sm:py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Status
                      </th>
                      <th className="px-3 sm:px-6 py-2 sm:py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {users.map((user) => (
                      <tr key={user.id}>
                        <td className="px-3 sm:px-6 py-3 sm:py-4 whitespace-nowrap">
                          <div className="text-sm sm:text-base font-medium text-gray-900">{user.name}</div>
                        </td>
                        <td className="px-3 sm:px-6 py-3 sm:py-4 whitespace-nowrap">
                          <div className="text-sm sm:text-base text-gray-900">{user.email}</div>
                        </td>
                        <td className="px-3 sm:px-6 py-3 sm:py-4 whitespace-nowrap text-sm sm:text-base text-gray-900">
                          {user.orders}
                        </td>
                        <td className="px-3 sm:px-6 py-3 sm:py-4 whitespace-nowrap text-sm sm:text-base text-gray-900">
                          {user.joined}
                        </td>
                        <td className="px-3 sm:px-6 py-3 sm:py-4 whitespace-nowrap">
                          <span className={`inline-flex px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(user.status)}`}>
                            {user.status}
                          </span>
                        </td>
                        <td className="px-3 sm:px-6 py-3 sm:py-4 whitespace-nowrap text-sm font-medium">
                          <div className="flex space-x-2">
                            <button 
                              onClick={() => handleAction('view', user, 'user')}
                              className="text-blue-600 hover:text-blue-900 transition-colors p-1 touch-manipulation"
                              title="View Details"
                            >
                              <Eye className="h-4 w-4" />
                            </button>
                            <button 
                              onClick={() => handleAction('edit', user, 'user')}
                              className="text-orange-600 hover:text-orange-900 transition-colors p-1 touch-manipulation"
                              title="Edit User"
                            >
                              <Edit className="h-4 w-4" />
                            </button>
                            <button 
                              onClick={() => handleAction('delete', user, 'user')}
                              className="text-red-600 hover:text-red-900 transition-colors p-1 touch-manipulation"
                              title="Delete User"
                            >
                              <Trash2 className="h-4 w-4" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* Orders Tab */}
          {selectedTab === 'orders' && (
            <div className="p-4 sm:p-6">
              <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-4 sm:mb-6 gap-3 sm:gap-0">
                <h2 className="text-lg sm:text-xl font-semibold text-gray-900">Order Management</h2>
                <button 
                  onClick={() => {
                    // Generate CSV data for orders
                    const csvData = recentOrders.map(order => 
                      `${order.id},${order.customer},${order.vendor},${order.amount},${order.status}`
                    ).join('\n');
                    const header = 'Order ID,Customer,Vendor,Amount,Status\n';
                    const csv = header + csvData;
                    
                    // Create and download file
                    const blob = new Blob([csv], { type: 'text/csv' });
                    const url = window.URL.createObjectURL(blob);
                    const a = document.createElement('a');
                    a.href = url;
                    a.download = 'orders-export.csv';
                    a.click();
                    window.URL.revokeObjectURL(url);
                  }}
                  className="bg-orange-500 text-white px-4 py-2 sm:py-3 rounded-lg hover:bg-orange-600 transition-colors text-sm sm:text-base font-medium touch-manipulation"
                >
                  Export Orders
                </button>
              </div>

              <div className="space-y-3 sm:space-y-4">
                {recentOrders.map((order) => (
                  <div key={order.id} className="border border-gray-200 rounded-lg p-4 sm:p-6">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-0">
                      <div>
                        <h3 className="text-sm sm:text-base font-semibold text-gray-900">{order.id}</h3>
                        <p className="text-xs sm:text-sm text-gray-600">{order.customer} • {order.vendor}</p>
                      </div>
                      <div className="text-left sm:text-right">
                        <p className="text-sm sm:text-base font-semibold text-gray-900">${order.amount}</p>
                        <span className={`inline-flex px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(order.status)}`}>
                          {order.status}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Modal */}
        {showModal && selectedItem && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-lg shadow-xl max-w-md w-full">
              <div className="p-4 sm:p-6">
                {/* View Modal */}
                {modalType === 'view' && (
                  <>
                    <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-4">
                      {selectedItem.type === 'vendor' ? 'Vendor' : 'User'} Details
                    </h3>
                    <div className="space-y-2 sm:space-y-3">
                      <div>
                        <span className="text-sm font-medium text-gray-700">Name: </span>
                        <span className="text-sm text-gray-900">{selectedItem.name}</span>
                      </div>
                      {selectedItem.type === 'vendor' ? (
                        <>
                          <div>
                            <span className="text-sm font-medium text-gray-700">Owner: </span>
                            <span className="text-sm text-gray-900">{selectedItem.owner}</span>
                          </div>
                          <div>
                            <span className="text-sm font-medium text-gray-700">Orders: </span>
                            <span className="text-sm text-gray-900">{selectedItem.orders}</span>
                          </div>
                          <div>
                            <span className="text-sm font-medium text-gray-700">Revenue: </span>
                            <span className="text-sm text-gray-900">${selectedItem.revenue.toLocaleString()}</span>
                          </div>
                        </>
                      ) : (
                        <>
                          <div>
                            <span className="text-sm font-medium text-gray-700">Email: </span>
                            <span className="text-sm text-gray-900">{selectedItem.email}</span>
                          </div>
                          <div>
                            <span className="text-sm font-medium text-gray-700">Orders: </span>
                            <span className="text-sm text-gray-900">{selectedItem.orders}</span>
                          </div>
                          <div>
                            <span className="text-sm font-medium text-gray-700">Joined: </span>
                            <span className="text-sm text-gray-900">{selectedItem.joined}</span>
                          </div>
                        </>
                      )}
                      <div>
                        <span className="text-sm font-medium text-gray-700">Status: </span>
                        <span className={`inline-flex px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(selectedItem.status)}`}>
                          {selectedItem.status}
                        </span>
                      </div>
                    </div>
                  </>
                )}

                {/* Edit Modal */}
                {modalType === 'edit' && (
                  <>
                    <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-4">
                      Edit {selectedItem.type === 'vendor' ? 'Vendor' : 'User'}
                    </h3>
                    <div className="space-y-3 sm:space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                        <input
                          type="text"
                          value={selectedItem.name}
                          onChange={(e) => setSelectedItem({...selectedItem, name: e.target.value})}
                          className="w-full px-3 py-2 sm:py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 text-base"
                        />
                      </div>
                      {selectedItem.type === 'vendor' ? (
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Owner</label>
                          <input
                            type="text"
                            value={selectedItem.owner}
                            onChange={(e) => setSelectedItem({...selectedItem, owner: e.target.value})}
                            className="w-full px-3 py-2 sm:py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 text-base"
                          />
                        </div>
                      ) : (
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                          <input
                            type="email"
                            value={selectedItem.email}
                            onChange={(e) => setSelectedItem({...selectedItem, email: e.target.value})}
                            className="w-full px-3 py-2 sm:py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 text-base"
                          />
                        </div>
                      )}
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                        <select
                          value={selectedItem.status}
                          onChange={(e) => setSelectedItem({...selectedItem, status: e.target.value})}
                          className="w-full px-3 py-2 sm:py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 text-base"
                        >
                          <option value="active">Active</option>
                          <option value="inactive">Inactive</option>
                          <option value="pending">Pending</option>
                        </select>
                      </div>
                    </div>
                  </>
                )}

                {/* Delete Modal */}
                {modalType === 'delete' && (
                  <>
                    <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-4">
                      Delete {selectedItem.type === 'vendor' ? 'Vendor' : 'User'}
                    </h3>
                    <p className="text-sm sm:text-base text-gray-600 mb-4 sm:mb-6">
                      Are you sure you want to delete "{selectedItem.name}"? This action cannot be undone.
                    </p>
                  </>
                )}

                {/* Modal Actions */}
                <div className="flex flex-col sm:flex-row justify-end space-y-2 sm:space-y-0 sm:space-x-3 mt-4 sm:mt-6">
                  <button
                    onClick={handleCloseModal}
                    className="w-full sm:w-auto px-4 py-2 sm:py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors text-sm sm:text-base font-medium touch-manipulation"
                  >
                    {modalType === 'view' ? 'Close' : 'Cancel'}
                  </button>
                  {modalType === 'edit' && (
                    <button
                      onClick={handleSaveEdit}
                      className="w-full sm:w-auto px-4 py-2 sm:py-3 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors text-sm sm:text-base font-medium touch-manipulation"
                    >
                      Save Changes
                    </button>
                  )}
                  {modalType === 'delete' && (
                    <button
                      onClick={handleConfirmDelete}
                      className="w-full sm:w-auto px-4 py-2 sm:py-3 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors text-sm sm:text-base font-medium touch-manipulation"
                    >
                      Delete
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;