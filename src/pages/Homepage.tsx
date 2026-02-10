import React from 'react';
import { Link } from 'react-router-dom';
import { Clock, Star, Shield, Smartphone } from 'lucide-react';

const Homepage: React.FC = () => {
  const featuredRestaurants = [
    {
      id: '1',
      name: 'Pizza Palace',
      cuisine: 'Italian',
      rating: 4.8,
      image: 'https://images.pexels.com/photos/905847/pexels-photo-905847.jpeg?auto=compress&cs=tinysrgb&w=400',
      nextSlot: '45 min',
    },
    {
      id: '2',
      name: 'Burger Barn',
      cuisine: 'American',
      rating: 4.6,
      image: 'https://images.pexels.com/photos/1639562/pexels-photo-1639562.jpeg?auto=compress&cs=tinysrgb&w=400',
      nextSlot: '30 min',
    },
    {
      id: '3',
      name: 'Sushi Station',
      cuisine: 'Japanese',
      rating: 4.9,
      image: 'https://images.pexels.com/photos/357573/pexels-photo-357573.jpeg?auto=compress&cs=tinysrgb&w=400',
      nextSlot: '1 hour',
    },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-orange-50 to-red-50 py-12 sm:py-16 lg:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-4 sm:mb-6 leading-tight">
              Pre-order your food,{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-red-500">
                skip the wait
              </span>
            </h1>
            <p className="text-base sm:text-lg lg:text-xl text-gray-600 mb-6 sm:mb-8 max-w-2xl mx-auto px-4 leading-relaxed">
              Order ahead from your favorite restaurants and pick up your meal exactly when it's ready. 
              No more waiting in lines or watching food get cold.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center max-w-md sm:max-w-none mx-auto px-4">
              <Link
                to="/restaurants"
                className="bg-gradient-to-r from-orange-500 to-red-500 text-white px-6 sm:px-8 py-3 sm:py-4 rounded-lg text-base sm:text-lg font-semibold hover:from-orange-600 hover:to-red-600 transition-all transform hover:scale-105 shadow-lg touch-manipulation"
              >
                Browse Restaurants
              </Link>
              <Link
                to="/signup"
                className="border-2 border-orange-500 text-orange-500 px-6 sm:px-8 py-3 sm:py-4 rounded-lg text-base sm:text-lg font-semibold hover:bg-orange-500 hover:text-white transition-all touch-manipulation"
              >
                Sign Up Free
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-12 sm:py-16 lg:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 sm:mb-16">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-3 sm:mb-4">Why Choose FoodPickup?</h2>
            <p className="text-base sm:text-lg lg:text-xl text-gray-600">Experience the future of food ordering</p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
            <div className="text-center group">
              <div className="w-14 h-14 sm:w-16 sm:h-16 bg-gradient-to-r from-orange-500 to-red-500 rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4 group-hover:scale-110 transition-transform">
                <Clock className="h-6 w-6 sm:h-8 sm:w-8 text-white" />
              </div>
              <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-2">Save Time</h3>
              <p className="text-sm sm:text-base text-gray-600 leading-relaxed">Pre-order and skip the wait. Your food will be ready exactly when you arrive.</p>
            </div>
            
            <div className="text-center group">
              <div className="w-14 h-14 sm:w-16 sm:h-16 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4 group-hover:scale-110 transition-transform">
                <Star className="h-6 w-6 sm:h-8 sm:w-8 text-white" />
              </div>
              <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-2">Quality Assured</h3>
              <p className="text-sm sm:text-base text-gray-600 leading-relaxed">Partner with top-rated restaurants that maintain the highest food quality standards.</p>
            </div>
            
            <div className="text-center group">
              <div className="w-14 h-14 sm:w-16 sm:h-16 bg-gradient-to-r from-green-500 to-teal-500 rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4 group-hover:scale-110 transition-transform">
                <Shield className="h-6 w-6 sm:h-8 sm:w-8 text-white" />
              </div>
              <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-2">Secure Payments</h3>
              <p className="text-sm sm:text-base text-gray-600 leading-relaxed">Safe and secure payment processing with multiple payment options available.</p>
            </div>
            
            <div className="text-center group">
              <div className="w-14 h-14 sm:w-16 sm:h-16 bg-gradient-to-r from-pink-500 to-rose-500 rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4 group-hover:scale-110 transition-transform">
                <Smartphone className="h-6 w-6 sm:h-8 sm:w-8 text-white" />
              </div>
              <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-2">Easy Pickup</h3>
              <p className="text-sm sm:text-base text-gray-600 leading-relaxed">QR code verification makes pickup fast and contactless for your convenience.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Restaurants */}
      <section className="py-12 sm:py-16 lg:py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 sm:mb-16">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-3 sm:mb-4">Featured Restaurants</h2>
            <p className="text-base sm:text-lg lg:text-xl text-gray-600">Popular choices in your area</p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {featuredRestaurants.map((restaurant) => (
              <Link
                key={restaurant.id}
                to={`/restaurant/${restaurant.id}`}
                className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-all transform hover:-translate-y-1 touch-manipulation"
              >
                <div className="relative h-40 sm:h-48">
                  <img
                    src={restaurant.image}
                    alt={restaurant.name}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-3 right-3 sm:top-4 sm:right-4 bg-white rounded-full px-2 py-1 sm:px-3 flex items-center space-x-1">
                    <Star className="h-4 w-4 text-yellow-400 fill-current" />
                    <span className="text-xs sm:text-sm font-medium">{restaurant.rating}</span>
                  </div>
                </div>
                <div className="p-4 sm:p-6">
                  <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-2">{restaurant.name}</h3>
                  <p className="text-sm sm:text-base text-gray-600 mb-3 sm:mb-4">{restaurant.cuisine} Cuisine</p>
                  <div className="flex items-center justify-between">
                    <span className="text-xs sm:text-sm text-gray-500">Next available:</span>
                    <span className="bg-green-100 text-green-800 px-2 py-1 sm:px-3 rounded-full text-xs sm:text-sm font-medium">
                      {restaurant.nextSlot}
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
          
          <div className="text-center mt-8 sm:mt-12">
            <Link
              to="/restaurants"
              className="bg-orange-500 text-white px-6 sm:px-8 py-3 rounded-lg text-base sm:text-lg font-semibold hover:bg-orange-600 transition-colors touch-manipulation"
            >
              View All Restaurants
            </Link>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-12 sm:py-16 lg:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 sm:mb-16">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-3 sm:mb-4">How It Works</h2>
            <p className="text-base sm:text-lg lg:text-xl text-gray-600">Simple steps to get your food</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 sm:gap-12">
            <div className="text-center">
              <div className="w-14 h-14 sm:w-16 sm:h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4 sm:mb-6">
                <span className="text-xl sm:text-2xl font-bold text-orange-500">1</span>
              </div>
              <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-3 sm:mb-4">Browse & Order</h3>
              <p className="text-sm sm:text-base text-gray-600 leading-relaxed">Choose your favorite restaurant, browse the menu, and place your order for a future pickup time.</p>
            </div>
            
            <div className="text-center">
              <div className="w-14 h-14 sm:w-16 sm:h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4 sm:mb-6">
                <span className="text-xl sm:text-2xl font-bold text-orange-500">2</span>
              </div>
              <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-3 sm:mb-4">Track Progress</h3>
              <p className="text-sm sm:text-base text-gray-600 leading-relaxed">Receive real-time updates on your order status from confirmed to ready for pickup.</p>
            </div>
            
            <div className="text-center">
              <div className="w-14 h-14 sm:w-16 sm:h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4 sm:mb-6">
                <span className="text-xl sm:text-2xl font-bold text-orange-500">3</span>
              </div>
              <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-3 sm:mb-4">Quick Pickup</h3>
              <p className="text-sm sm:text-base text-gray-600 leading-relaxed">Show your QR code at the restaurant and collect your freshly prepared meal. No waiting!</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Homepage;