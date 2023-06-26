import React from 'react';
import Contactus from './Contactus';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-4 px-8 text-center">
      <Contactus />
      <p>&copy; {new Date().getFullYear()} Schield Centre. All rights reserved.</p>
      <nav className="mt-4">
        <ul className="flex justify-center space-x-4">
          <li><a href="#" className="hover:text-gray-400">Privacy Policy</a></li>
          <li><a href="#" className="hover:text-gray-400">Terms of Service</a></li>
          <li><a href="#" className="hover:text-gray-400">FAQ</a></li>
        </ul>
      </nav>
    </footer>
  );
};

export default Footer;
