import React from 'react';
import { Link } from 'react-router-dom';
import { Mail, Phone, MapPin } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          {/* Company Info */}
          <div className="col-span-1 sm:col-span-2 lg:col-span-2">
            <div className="flex items-center space-x-2 mb-3 sm:mb-4">
              <div className="w-7 h-7 sm:w-8 sm:h-8 bg-gradient-to-r from-orange-500 to-red-500 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-xs sm:text-sm">FP</span>
              </div>
              <span className="text-lg sm:text-xl font-bold">FoodPickup</span>
            </div>
            <p className="text-sm sm:text-base text-gray-300 mb-3 sm:mb-4 max-w-md leading-relaxed">
              Skip the wait with pre-order food pickup. Order ahead, save time, and enjoy your favorite meals without the hassle.
            </p>
            <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-4">
              <div className="flex items-center space-x-2 text-gray-300">
                <Mail className="h-4 w-4" />
                <span className="text-xs sm:text-sm">support@foodpickup.com</span>
              </div>
              <div className="flex items-center space-x-2 text-gray-300">
                <Phone className="h-4 w-4" />
                <span className="text-xs sm:text-sm">1-800-PICKUP</span>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-base sm:text-lg font-semibold mb-3 sm:mb-4">Quick Links</h3>
            <ul className="space-y-2 sm:space-y-3">
              <li>
                <Link to="/restaurants" className="text-sm sm:text-base text-gray-300 hover:text-orange-400 transition-colors touch-manipulation">
                  Browse Restaurants
                </Link>
              </li>
              <li>
                <Link to="/login" className="text-sm sm:text-base text-gray-300 hover:text-orange-400 transition-colors touch-manipulation">
                  Customer Login
                </Link>
              </li>
              <li>
                <Link to="/login" className="text-sm sm:text-base text-gray-300 hover:text-orange-400 transition-colors touch-manipulation">
                  Vendor Login
                </Link>
              </li>
              <li>
                <a 
                  href="#" 
                  onClick={(e) => {
                    e.preventDefault();
                    alert('Partner with Us: Contact partnerships@foodpickup.com to join our platform');
                  }}
                  className="text-sm sm:text-base text-gray-300 hover:text-orange-400 transition-colors touch-manipulation"
                >
                  Partner with Us
                </a>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="text-base sm:text-lg font-semibold mb-3 sm:mb-4">Support</h3>
            <ul className="space-y-2 sm:space-y-3">
              <li>
                <a 
                  href="#" 
                  onClick={(e) => {
                    e.preventDefault();
                    alert('Help Center: Visit help.foodpickup.com or call 1-800-PICKUP for assistance');
                  }}
                  className="text-sm sm:text-base text-gray-300 hover:text-orange-400 transition-colors touch-manipulation"
                >
                  Help Center
                </a>
              </li>
              <li>
                <a 
                  href="#" 
                  onClick={(e) => {
                    e.preventDefault();
                    alert('Contact Us: Email support@foodpickup.com or call 1-800-PICKUP');
                  }}
                  className="text-sm sm:text-base text-gray-300 hover:text-orange-400 transition-colors touch-manipulation"
                >
                  Contact Us
                </a>
              </li>
              <li>
                <a 
                  href="#" 
                  onClick={(e) => {
                    e.preventDefault();
                    alert('Privacy Policy: Our privacy policy protects your personal information and data.');
                  }}
                  className="text-sm sm:text-base text-gray-300 hover:text-orange-400 transition-colors touch-manipulation"
                >
                  Privacy Policy
                </a>
              </li>
              <li>
                <a 
                  href="#" 
                  onClick={(e) => {
                    e.preventDefault();
                    alert('Terms of Service: Please read our terms and conditions for using FoodPickup.');
                  }}
                  className="text-sm sm:text-base text-gray-300 hover:text-orange-400 transition-colors touch-manipulation"
                >
                  Terms of Service
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-6 sm:mt-8 pt-6 sm:pt-8 text-center">
          <p className="text-xs sm:text-sm text-gray-400">
            © 2024 FoodPickup. All rights reserved. Making food ordering seamless and efficient.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;