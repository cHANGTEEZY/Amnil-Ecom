import React from "react";

import {
  Facebook,
  Instagram,
  Twitter,
  Youtube,
  Mail,
  Phone,
  MapPin,
  Clock,
} from "lucide-react";

const Footer = () => {
  return (
    <footer className="border-gray-300 border-t mt-20 pt-10">
      <div className="container max-w-[1400px] m-auto px-4 py-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div>
            <h4 className="font-bold text-lg mb-4">BRAND</h4>
            <p className="text-gray-600 mb-4">
              We offer the best selection of fashion items for men and women at
              competitive prices.
            </p>
            <div className="flex space-x-3">
              <a
                href="#"
                className="text-gray-600 hover:text-gray-900"
                aria-label="Facebook"
              >
                <Facebook size={20} />
              </a>
              <a
                href="#"
                className="text-gray-600 hover:text-gray-900"
                aria-label="Instagram"
              >
                <Instagram size={20} />
              </a>
              <a
                href="#"
                className="text-gray-600 hover:text-gray-900"
                aria-label="Twitter"
              >
                <Twitter size={20} />
              </a>
              <a
                href="#"
                className="text-gray-600 hover:text-gray-900"
                aria-label="Youtube"
              >
                <Youtube size={20} />
              </a>
            </div>
          </div>

          <div>
            <h4 className="font-bold text-lg mb-4">Shop</h4>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-gray-600 hover:text-gray-900">
                  Women's Clothing
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-600 hover:text-gray-900">
                  Men's Clothing
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-600 hover:text-gray-900">
                  Accessories
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-600 hover:text-gray-900">
                  New Arrivals
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-600 hover:text-gray-900">
                  Sale
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-lg mb-4">Customer Service</h4>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-gray-600 hover:text-gray-900">
                  Contact Us
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-600 hover:text-gray-900">
                  Shipping & Returns
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-600 hover:text-gray-900">
                  FAQ
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-600 hover:text-gray-900">
                  Size Guide
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-600 hover:text-gray-900">
                  Track Order
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-lg mb-4">Contact Us</h4>
            <ul className="space-y-3">
              <li className="flex items-start">
                <MapPin
                  size={18}
                  className="mr-2 mt-0.5 flex-shrink-0 text-gray-600"
                />
                <span className="text-gray-600">
                  123 Fashion Street, Style City, 10001
                </span>
              </li>
              <li className="flex items-center">
                <Phone size={18} className="mr-2 flex-shrink-0 text-gray-600" />
                <span className="text-gray-600">(123) 456-7890</span>
              </li>
              <li className="flex items-center">
                <Mail size={18} className="mr-2 flex-shrink-0 text-gray-600" />
                <span className="text-gray-600">support@brandshop.com</span>
              </li>
              <li className="flex items-center">
                <Clock size={18} className="mr-2 flex-shrink-0 text-gray-600" />
                <span className="text-gray-600">Mon-Fri: 9AM - 6PM</span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-4">
        <div className="flex flex-col md:flex-row justify-between items-center text-sm text-gray-600">
          <p>© {new Date().getFullYear()} cHANGTEEZY. All rights reserved.</p>
          <div className="flex space-x-4 mt-2 md:mt-0">
            <a href="#" className="hover:text-gray-900">
              Privacy Policy
            </a>
            <a href="#" className="hover:text-gray-900">
              Terms of Service
            </a>
            <a href="#" className="hover:text-gray-900">
              Accessibility
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
