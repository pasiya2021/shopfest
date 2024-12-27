import React from 'react';
import { Mail, Phone, MapPin, Facebook, Twitter, Instagram } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="max-w-7xl mx-auto px-4 py-20">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
         
          <div className="space-y-4">
            <h3 className="text-xl font-bold text-white">Shopfest</h3>
            <p className="text-sm">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
            </p>
            <div className="flex space-x-4">
              <Facebook className="w-5 h-5 hover:text-orange-500 cursor-pointer" />
              <Twitter className="w-5 h-5 hover:text-orange-500 cursor-pointer" />
              <Instagram className="w-5 h-5 hover:text-orange-500 cursor-pointer" />
            </div>
          </div>

          
          <div>
            <h4 className="text-lg font-semibold text-white mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li><a href="/about" className="hover:text-orange-500">About Us</a></li>
              <li><a href="/contact" className="hover:text-orange-500">Contact</a></li>
              <li><a href="/shipping" className="hover:text-orange-500">Shipping Info</a></li>
              <li><a href="/returns" className="hover:text-orange-500">Returns</a></li>
            </ul>
          </div>

        
          <div>
            <h4 className="text-lg font-semibold text-white mb-4">Categories</h4>
            <ul className="space-y-2">
              <li><a href="/cricket" className="hover:text-orange-500">SmartPhones</a></li>
              <li><a href="/football" className="hover:text-orange-500">Laptops</a></li>
              <li><a href="/rugby" className="hover:text-orange-500">Headphones</a></li>
              <li><a href="/sales" className="hover:text-orange-500">Sales & Offers</a></li>
            </ul>
          </div>

          
          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-white">Contact Us</h4>
            <div className="flex items-center space-x-3">
              <Phone className="w-5 h-5" />
              <span>+1 234 567 890</span>
            </div>
            <div className="flex items-center space-x-3">
              <Mail className="w-5 h-5" />
              <span>support@Shopfest.com</span>
            </div>
            <div className="flex items-center space-x-3">
              <MapPin className="w-5 h-5" />
              <span>123 Shopfest Street, City</span>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-center">
          <p>&copy; 2024 Shopfest. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;