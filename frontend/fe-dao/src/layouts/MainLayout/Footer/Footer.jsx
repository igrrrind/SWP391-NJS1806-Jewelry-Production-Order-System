import React from 'react';
import Logo from '../../../assets/logo-cropped.webp'; // Adjust the path as needed

const Footer = () => {
  return (
    <footer className="bg-gray-50 py-10 px-4 md:px-10">
      <div className="flex flex-col md:flex-row md:justify-between">
        <div className="mb-10 md:mb-0">
          <h3 className="text-lg font-semibold mb-2">Stay in touch.</h3>
          <p className="text-gray-600 mb-4">
            Get updates on new collections, exclusive offers, and more in your inbox.
          </p>
          <div className="flex space-x-4">
            <a href="https://facebook.com" className="text-gray-600 hover:text-gray-800">
              <i className="fab fa-facebook-f"></i>
            </a>
            <a href="https://twitter.com" className="text-gray-600 hover:text-gray-800">
              <i className="fab fa-twitter"></i>
            </a>
            <a href="https://instagram.com" className="text-gray-600 hover:text-gray-800">
              <i className="fab fa-instagram"></i>
            </a>
          </div>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-10">
          <div>
            <h4 className="font-semibold mb-2">Shop</h4>
            <ul>
              <li className="mb-1">
                <a href="#necklaces" className="text-gray-600 hover:text-gray-800">Necklaces</a>
              </li>
              <li className="mb-1">
                <a href="#bracelets" className="text-gray-600 hover:text-gray-800">Bracelets</a>
              </li>
              <li className="mb-1">
                <a href="#rings" className="text-gray-600 hover:text-gray-800">Rings</a>
              </li>
              <li className="mb-1">
                <a href="#earrings" className="text-gray-600 hover:text-gray-800">Earrings</a>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-2">Customer Service</h4>
            <ul>
              <li className="mb-1">
                <a href="#returns" className="text-gray-600 hover:text-gray-800">Returns</a>
              </li>
              <li className="mb-1">
                <a href="#faq" className="text-gray-600 hover:text-gray-800">FAQs</a>
              </li>
              <li className="mb-1">
                <a href="#shipping" className="text-gray-600 hover:text-gray-800">Shipping</a>
              </li>
              <li className="mb-1">
                <a href="#contact" className="text-gray-600 hover:text-gray-800">Contact Us</a>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-2">About Us</h4>
            <ul>
              <li className="mb-1">
                <a href="#our-story" className="text-gray-600 hover:text-gray-800">Our Story</a>
              </li>
              <li className="mb-1">
                <a href="#careers" className="text-gray-600 hover:text-gray-800">Careers</a>
              </li>
              <li className="mb-1">
                <a href="#press" className="text-gray-600 hover:text-gray-800">Press</a>
              </li>
              <li className="mb-1">
                <a href="#sustainability" className="text-gray-600 hover:text-gray-800">Sustainability</a>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-2">News & Resources</h4>
            <p className="text-gray-600 mb-2">
              Stay updated with our latest collections and resources.
            </p>
            <a href="#blog" className="text-gray-600 hover:text-gray-800">Read Our Blog</a>
          </div>
        </div>
      </div>
      <div className="flex flex-col md:flex-row items-center justify-between mt-10 border-t border-gray-200 pt-4">
        <img src={Logo} alt="Company Logo" className="h-12 mb-4 md:mb-0" />
        <p className="text-gray-600 text-sm">
          &copy; 2024 Jewelry Co. | <a href="#terms" className="hover:text-gray-800">Terms & Conditions</a> | <a href="#privacy" className="hover:text-gray-800">Privacy Policy</a> | <a href="#patent" className="hover:text-gray-800">Patent Info</a>
        </p>
      </div>
    </footer>
  );
};

export default Footer;
