import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Search, Filter, Star, Clock, MapPin } from 'lucide-react';

const RestaurantListPage: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFilters, setSelectedFilters] = useState({
    cuisine: '',
    rating: '',
    time: '',
    dietary: '',
  });

  const restaurants = [
    {
      id: '1',
      name: 'Pizza Palace',
      cuisine: 'Italian',
      rating: 4.8,
      image: 'https://images.pexels.com/photos/905847/pexels-photo-905847.jpeg?auto=compress&cs=tinysrgb&w=500',
      nextSlot: '45 min',
      distance: '0.8 km',
      isVeg: false,
      tags: ['Pizza', 'Pasta', 'Italian']
    },
    {
      id: '2',
      name: 'Burger Barn',
      cuisine: 'American',
      rating: 4.6,
      image: 'https://images.pexels.com/photos/1639562/pexels-photo-1639562.jpeg?auto=compress&cs=tinysrgb&w=500',
      nextSlot: '30 min',
      distance: '1.2 km',
      isVeg: false,
      tags: ['Burgers', 'Fries', 'American']
    },
    {
      id: '3',
      name: 'Sushi Station',
      cuisine: 'Japanese',
      rating: 4.9,
      image: 'https://images.pexels.com/photos/357573/pexels-photo-357573.jpeg?auto=compress&cs=tinysrgb&w=500',
      nextSlot: '1 hour',
      distance: '2.1 km',
      isVeg: false,
      tags: ['Sushi', 'Japanese', 'Fresh']
    },
    {
      id: '4',
      name: 'Green Garden',
      cuisine: 'Vegetarian',
      rating: 4.7,
      image: 'https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=500',
      nextSlot: '20 min',
      distance: '0.5 km',
      isVeg: true,
      tags: ['Salads', 'Healthy', 'Vegan']
    },
    {
      id: '5',
      name: 'Taco Fiesta',
      cuisine: 'Mexican',
      rating: 4.5,
      image: 'https://images.pexels.com/photos/461198/pexels-photo-461198.jpeg?auto=compress&cs=tinysrgb&w=500',
      nextSlot: '35 min',
      distance: '1.5 km',
      isVeg: false,
      tags: ['Tacos', 'Mexican', 'Spicy']
    },
    {
      id: '6',
      name: 'Curry Corner',
      cuisine: 'Indian',
      rating: 4.4,
      image: 'https://images.pexels.com/photos/2474661/pexels-photo-2474661.jpeg?auto=compress&cs=tinysrgb&w=500',
      nextSlot: '50 min',
      distance: '1.8 km',
      isVeg: true,
      tags: ['Curry', 'Indian', 'Spicy']
    }
  ];

  const cuisines = ['All', 'Italian', 'American', 'Japanese', 'Vegetarian', 'Mexican', 'Indian'];
  const ratings = ['All', '4.5+', '4.0+', '3.5+'];
  const times = ['All', 'Under 30 min', '30-60 min', 'Over 1 hour'];
  const dietary = ['All', 'Vegetarian', 'Vegan', 'Non-Veg'];

  const filteredRestaurants = restaurants.filter(restaurant => {
    const matchesSearch = restaurant.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         restaurant.cuisine.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         restaurant.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));

    const matchesCuisine = !selectedFilters.cuisine || selectedFilters.cuisine === 'All' || 
                          restaurant.cuisine === selectedFilters.cuisine;

    const matchesRating = !selectedFilters.rating || selectedFilters.rating === 'All' || 
                         restaurant.rating >= parseFloat(selectedFilters.rating);

    const matchesDietary = !selectedFilters.dietary || selectedFilters.dietary === 'All' ||
                          (selectedFilters.dietary === 'Vegetarian' && restaurant.isVeg) ||
                          (selectedFilters.dietary === 'Non-Veg' && !restaurant.isVeg);

    return matchesSearch && matchesCuisine && matchesRating && matchesDietary;
  });

  return (
    <div className="min-h-screen bg-gray-50 py-6 sm:py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-6 sm:mb-8">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">Browse Restaurants</h1>
          <p className="text-sm sm:text-base text-gray-600">Discover amazing food and place your pre-order</p>
        </div>

        {/* Search and Filters */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 sm:p-6 mb-6 sm:mb-8">
          {/* Search Bar */}
          <div className="relative mb-4 sm:mb-6">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
            <input
              type="text"
              placeholder="Search restaurants, cuisines, or dishes..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-3 sm:py-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent text-base"
            />
          </div>

          {/* Filters */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1 sm:mb-2">Cuisine</label>
              <select
                value={selectedFilters.cuisine}
                onChange={(e) => setSelectedFilters({...selectedFilters, cuisine: e.target.value})}
                className="w-full p-2 sm:p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 text-sm sm:text-base"
              >
                {cuisines.map(cuisine => (
                  <option key={cuisine} value={cuisine}>{cuisine}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1 sm:mb-2">Rating</label>
              <select
                value={selectedFilters.rating}
                onChange={(e) => setSelectedFilters({...selectedFilters, rating: e.target.value})}
                className="w-full p-2 sm:p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 text-sm sm:text-base"
              >
                {ratings.map(rating => (
                  <option key={rating} value={rating}>{rating}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1 sm:mb-2">Time</label>
              <select
                value={selectedFilters.time}
                onChange={(e) => setSelectedFilters({...selectedFilters, time: e.target.value})}
                className="w-full p-2 sm:p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 text-sm sm:text-base"
              >
                {times.map(time => (
                  <option key={time} value={time}>{time}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1 sm:mb-2">Dietary</label>
              <select
                value={selectedFilters.dietary}
                onChange={(e) => setSelectedFilters({...selectedFilters, dietary: e.target.value})}
                className="w-full p-2 sm:p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 text-sm sm:text-base"
              >
                {dietary.map(diet => (
                  <option key={diet} value={diet}>{diet}</option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Results Count */}
        <div className="mb-4 sm:mb-6">
          <p className="text-sm sm:text-base text-gray-600">
            Showing {filteredRestaurants.length} restaurant{filteredRestaurants.length !== 1 ? 's' : ''}
          </p>
        </div>

        {/* Restaurant Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {filteredRestaurants.map((restaurant) => (
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
                {restaurant.isVeg && (
                  <div className="absolute top-3 left-3 sm:top-4 sm:left-4 bg-green-500 text-white px-2 py-1 rounded-full text-xs font-medium">
                    VEG
                  </div>
                )}
              </div>
              
              <div className="p-4 sm:p-6">
                <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-2">{restaurant.name}</h3>
                <p className="text-sm sm:text-base text-gray-600 mb-3">{restaurant.cuisine} Cuisine</p>
                
                <div className="flex flex-wrap gap-1 mb-3 sm:mb-4">
                  {restaurant.tags.map((tag, index) => (
                    <span
                      key={index}
                      className="bg-gray-100 text-gray-700 px-2 py-1 rounded-full text-xs sm:text-sm"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                
                <div className="flex items-center justify-between text-xs sm:text-sm text-gray-500 mb-3 sm:mb-4">
                  <div className="flex items-center space-x-1">
                    <MapPin className="h-4 w-4" />
                    <span>{restaurant.distance}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Clock className="h-4 w-4" />
                    <span>Next: {restaurant.nextSlot}</span>
                  </div>
                </div>
                
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

        {filteredRestaurants.length === 0 && (
          <div className="text-center py-8 sm:py-12">
            <div className="w-14 h-14 sm:w-16 sm:h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Search className="h-6 w-6 sm:h-8 sm:w-8 text-gray-400" />
            </div>
            <h3 className="text-base sm:text-lg font-medium text-gray-900 mb-2">No restaurants found</h3>
            <p className="text-sm sm:text-base text-gray-600">Try adjusting your search criteria or filters</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default RestaurantListPage;