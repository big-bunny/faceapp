import React, { useState } from 'react';
import AboutPage from './About';
import Link from 'next/link';
import router from 'next/router';

const Header = ({ isAuthenticated }) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const handleLogout = () => {
    // Implement logout functionality
  };

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleLogoClick = () => {
    router.push('/Dashboard');
  };
  return (
    <header className="bg-gray-900 text-white py-4 px-8">
    <h1 className="text-2xl font-bold cursor-pointer" onClick={handleLogoClick}>
        Schield Centre
      </h1>
      <nav className="mt-4 flex justify-between items-center">
        <ul className="flex space-x-4">
          <li>
            <Link href="/home" className="hover:text-gray-400">
              Home
            </Link>
          </li>
          <li>
            <Link href="/about" legacyBehavior>
              About
            </Link>

          </li>
          <li className="relative">
            <a href="#" className="hover:text-gray-400" onClick={toggleDropdown}>
              Sponsor
            </a>
            {isDropdownOpen && (
              <div className="absolute left-0 mt-2 w-40 bg-red-300 shadow-md rounded-md py-2">
                <ul>
                  <li>
                    <Link href="/child">
                      Child
                    </Link>
                  </li>
                  <li>
                    <Link href="/program">
                      Program
                    </Link>
                  </li>
                </ul>
              </div>
            )}
          </li>
          <li>
            <Link href="/team" className="hover:text-gray-400">
              Team
            </Link>
          </li>
          <li>
            <Link href="/gallery" className="hover:text-gray-400">
              Gallery
            </Link>
          </li>
        </ul>

        {isAuthenticated ? (
          <button
            className="bg-gray-800 text-white px-4 py-2 rounded"
            onClick={handleLogout}
          >
            Logout
          </button>
        ) : (
          <Link href="#" className="bg-gray-800 text-white px-4 py-2 rounded">
            Login
          </Link>
        )}
      </nav>
    </header>
  );
};

export default Header;
