import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Star, Clock, MapPin, Plus, Minus, ShoppingCart } from 'lucide-react';
import { useCart } from '../../context/CartContext';
import { useAuth } from '../../context/AuthContext';

const RestaurantMenuPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { addItem } = useCart();
  const { user } = useAuth();
  const [selectedCategory, setSelectedCategory] = useState('Appetizers');
  const [quantities, setQuantities] = useState<{ [key: string]: number }>({});
  const [specialNotes, setSpecialNotes] = useState<{ [key: string]: string }>({});

  // Mock restaurant data
  const restaurant = {
    id: '1',
    name: 'Pizza Palace',
    cuisine: 'Italian',
    rating: 4.8,
    reviews: 324,
    image: 'https://images.pexels.com/photos/905847/pexels-photo-905847.jpeg?auto=compress&cs=tinysrgb&w=800',
    address: '123 Food Street, Downtown',
    phone: '+1 (555) 123-4567',
    nextSlot: '45 min',
    openTime: '11:00 AM',
    closeTime: '10:00 PM',
    description: 'Authentic Italian cuisine with fresh ingredients and traditional recipes.',
  };

  const menuCategories = [
    'Appetizers',
    'Main Course',
    'Pizza',
    'Pasta',
    'Desserts',
    'Beverages'
  ];

  const menuItems = {
    'Appetizers': [
      { id: 'app1', name: 'Garlic Bread', price: 8.99, description: 'Fresh baked bread with garlic and herbs', image: 'https://images.pexels.com/photos/4109043/pexels-photo-4109043.jpeg?auto=compress&cs=tinysrgb&w=300' },
      { id: 'app2', name: 'Bruschetta', price: 12.99, description: 'Toasted bread with tomatoes, basil, and mozzarella', image: 'https://images.pexels.com/photos/5966631/pexels-photo-5966631.jpeg?auto=compress&cs=tinysrgb&w=300' },
    ],
    'Main Course': [
      { id: 'main1', name: 'Chicken Parmigiana', price: 24.99, description: 'Breaded chicken breast with marinara sauce and mozzarella', image: 'https://images.pexels.com/photos/106343/pexels-photo-106343.jpeg?auto=compress&cs=tinysrgb&w=300' },
      { id: 'main2', name: 'Grilled Salmon', price: 28.99, description: 'Fresh Atlantic salmon with lemon herb seasoning', image: 'https://images.pexels.com/photos/725991/pexels-photo-725991.jpeg?auto=compress&cs=tinysrgb&w=300' },
    ],
    'Pizza': [
      { id: 'pizza1', name: 'Margherita Pizza', price: 18.99, description: 'Classic pizza with tomato sauce, mozzarella, and fresh basil', image: 'https://images.pexels.com/photos/315755/pexels-photo-315755.jpeg?auto=compress&cs=tinysrgb&w=300' },
      { id: 'pizza2', name: 'Pepperoni Pizza', price: 21.99, description: 'Traditional pepperoni pizza with mozzarella cheese', image: 'https://images.pexels.com/photos/708587/pexels-photo-708587.jpeg?auto=compress&cs=tinysrgb&w=300' },
    ],
    'Pasta': [
      { id: 'pasta1', name: 'Spaghetti Carbonara', price: 19.99, description: 'Creamy pasta with bacon, eggs, and parmesan cheese', image: 'https://images.pexels.com/photos/1279330/pexels-photo-1279330.jpeg?auto=compress&cs=tinysrgb&w=300' },
      { id: 'pasta2', name: 'Fettuccine Alfredo', price: 17.99, description: 'Rich and creamy alfredo sauce with fettuccine pasta', image: 'https://images.pexels.com/photos/1437267/pexels-photo-1437267.jpeg?auto=compress&cs=tinysrgb&w=300' },
    ],
    'Desserts': [
      { id: 'dessert1', name: 'Tiramisu', price: 8.99, description: 'Classic Italian dessert with coffee-soaked ladyfingers', image: 'https://images.pexels.com/photos/6542/food-dessert-cake-coffee.jpg?auto=compress&cs=tinysrgb&w=300' },
      { id: 'dessert2', name: 'Gelato', price: 6.99, description: 'Authentic Italian gelato in various flavors', image: 'https://images.pexels.com/photos/3631/summer-dessert-sweet-ice-cream.jpg?auto=compress&cs=tinysrgb&w=300' },
    ],
    'Beverages': [
      { id: 'bev1', name: 'Italian Soda', price: 4.99, description: 'Refreshing Italian soda in multiple flavors', image: 'https://images.pexels.com/photos/1337824/pexels-photo-1337824.jpeg?auto=compress&cs=tinysrgb&w=300' },
      { id: 'bev2', name: 'Espresso', price: 3.99, description: 'Rich and bold Italian espresso', image: 'https://images.pexels.com/photos/302899/pexels-photo-302899.jpeg?auto=compress&cs=tinysrgb&w=300' },
    ],
  };

  const updateQuantity = (itemId: string, change: number) => {
    setQuantities(prev => ({
      ...prev,
      [itemId]: Math.max(0, (prev[itemId] || 0) + change)
    }));
  };

  const handleAddToCart = (item: any) => {
    if (!user) {
      navigate('/login');
      return;
    }

    const quantity = quantities[item.id] || 1;
    const notes = specialNotes[item.id] || '';
    
    for (let i = 0; i < quantity; i++) {
      addItem({
        id: `${item.id}_${Date.now()}_${i}`,
        name: item.name,
        price: item.price,
        specialNotes: notes,
        restaurantId: restaurant.id,
        image: item.image,
      });
    }

    // Reset quantity and notes after adding to cart
    setQuantities(prev => ({ ...prev, [item.id]: 0 }));
    setSpecialNotes(prev => ({ ...prev, [item.id]: '' }));
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Restaurant Header */}
      <div className="relative h-64 sm:h-80">
        <img
          src={restaurant.image}
          alt={restaurant.name}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black bg-opacity-40"></div>
        <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-8 text-white">
          <div className="max-w-7xl mx-auto">
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-2">{restaurant.name}</h1>
            <p className="text-base sm:text-lg lg:text-xl mb-3 sm:mb-4 leading-relaxed">{restaurant.description}</p>
            <div className="flex flex-wrap items-center gap-3 sm:gap-6 text-xs sm:text-sm">
              <div className="flex items-center space-x-1">
                <Star className="h-5 w-5 text-yellow-400 fill-current" />
                <span className="font-medium">{restaurant.rating}</span>
                <span>({restaurant.reviews} reviews)</span>
              </div>
              <div className="flex items-center space-x-1">
                <MapPin className="h-5 w-5" />
                <span>{restaurant.address}</span>
              </div>
              <div className="flex items-center space-x-1">
                <Clock className="h-5 w-5" />
                <span>Next slot: {restaurant.nextSlot}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        <div className="flex flex-col lg:flex-row gap-6 sm:gap-8">
          {/* Menu Categories */}
          <div className="lg:w-1/4">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-3 sm:p-4 sticky top-8">
              <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-3 sm:mb-4">Menu Categories</h3>
              <nav className="space-y-1 sm:space-y-2">
                {menuCategories.map((category) => (
                  <button
                    key={category}
                    onClick={() => setSelectedCategory(category)}
                    className={`w-full text-left px-3 py-2 sm:py-3 rounded-lg transition-colors text-sm sm:text-base touch-manipulation ${
                      selectedCategory === category
                        ? 'bg-orange-100 text-orange-700 font-medium'
                        : 'text-gray-700 hover:bg-gray-100'
                    }`}
                  >
                    {category}
                  </button>
                ))}
              </nav>
            </div>
          </div>

          {/* Menu Items */}
          <div className="lg:w-3/4">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 sm:p-6">
              <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4 sm:mb-6">{selectedCategory}</h2>
              
              <div className="space-y-4 sm:space-y-6">
                {menuItems[selectedCategory]?.map((item) => (
                  <div key={item.id} className="border border-gray-200 rounded-lg p-4 sm:p-6 hover:shadow-md transition-shadow">
                    <div className="flex flex-col sm:flex-row gap-4">
                      <div className="sm:w-1/3 lg:w-1/4">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-full h-32 sm:h-24 lg:h-32 object-cover rounded-lg"
                        />
                      </div>
                      
                      <div className="sm:w-2/3 lg:w-3/4">
                        <div className="flex justify-between items-start mb-2">
                          <h3 className="text-lg sm:text-xl font-semibold text-gray-900 pr-2">{item.name}</h3>
                          <span className="text-lg sm:text-xl font-bold text-orange-600 whitespace-nowrap">${item.price}</span>
                        </div>
                        
                        <p className="text-sm sm:text-base text-gray-600 mb-3 sm:mb-4 leading-relaxed">{item.description}</p>
                        
                        {/* Special Notes */}
                        <div className="mb-3 sm:mb-4">
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Special Notes (Optional)
                          </label>
                          <input
                            type="text"
                            placeholder="Any special requests..."
                            value={specialNotes[item.id] || ''}
                            onChange={(e) => setSpecialNotes(prev => ({
                              ...prev,
                              [item.id]: e.target.value
                            }))}
                            className="w-full px-3 py-2 sm:py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 text-sm sm:text-base"
                          />
                        </div>
                        
                        {/* Quantity and Add to Cart */}
                        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 sm:gap-0">
                          <div className="flex items-center space-x-2 sm:space-x-3">
                            <span className="text-sm font-medium text-gray-700">Quantity:</span>
                            <div className="flex items-center space-x-2">
                              <button
                                onClick={() => updateQuantity(item.id, -1)}
                                className="w-8 h-8 sm:w-10 sm:h-10 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-100 touch-manipulation"
                              >
                                <Minus className="h-4 w-4" />
                              </button>
                              <span className="w-8 sm:w-10 text-center font-medium text-sm sm:text-base">
                                {quantities[item.id] || 1}
                              </span>
                              <button
                                onClick={() => updateQuantity(item.id, 1)}
                                className="w-8 h-8 sm:w-10 sm:h-10 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-100 touch-manipulation"
                              >
                                <Plus className="h-4 w-4" />
                              </button>
                            </div>
                          </div>
                          
                          <button
                            onClick={() => handleAddToCart(item)}
                            className="w-full sm:w-auto bg-orange-500 text-white px-4 sm:px-6 py-2 sm:py-3 rounded-lg hover:bg-orange-600 transition-colors flex items-center justify-center space-x-2 text-sm sm:text-base font-medium touch-manipulation"
                          >
                            <ShoppingCart className="h-4 w-4" />
                            <span>Add to Cart</span>
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RestaurantMenuPage;