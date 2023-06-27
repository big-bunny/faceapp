import React, { useState } from 'react';
import { signIn, signOut, useSession } from 'next-auth/react';
import Link from 'next/link';
import Donate from '@/components/Donate';

const Header: React.FC = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false); // State to track whether the dropdown is open or closed
  const [isMenuOpen, setIsMenuOpen] = useState(false); // State to track whether the mobile menu is open or closed

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen); // Function to toggle the dropdown state
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen); // Function to toggle the mobile menu state
  };

  const { data: session, status } = useSession(); // Get the session data and status using the useSession hook
  const loading = status === 'loading'; // Check if the session status is loading

  // Define the menu links
  const menuLinks = [
    { href: '/home', label: 'Home' },
    { href: '/about', label: 'About' },
    { href: '/team', label: 'Team' },
    { href: '/', label: '' },
    { href: '/', label: '' },
    { href: '/', label: '' },
  ];

  return (
    <div>
    <header className="bg-gray-600 rounded-3xl">
      <nav className="container mx-auto">
        <div className="flex items-center justify-between p-4">
          <Link href="/" legacyBehavior>
            <a className="text-white text-3xl font-bold">Schield Centre</a>
          </Link>
          {/* Hamburger menu */}
          <div className="md:hidden">
            <button
              type="button"
              className="text-white hover:text-green-300 focus:outline-none"
              onClick={toggleMenu}
            >
              <svg
                className="h-6 w-6"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </button>
          </div>
        </div>
        {/* Mobile menu */}
        {isMenuOpen && (
          <ul className="md:hidden bg-gray-900 text-white px-4 py-2">
            {menuLinks.map((link) => (
              <li key={link.href}>
                <a href={link.href} className="block text-xl font-bold py-2">
                  {link.label}
                </a>
              </li>
            ))}
            <li>
              <a href="#" onClick={toggleDropdown} className="block py-2">
                Sponsor
              </a>
              {isDropdownOpen && (
                <ul className="ml-4 bg-white text-gray-900 rounded-md shadow-lg py-2">
                  <li>
                    <a href="/child" className="block py-2 hover:text-blue-500">
                      Child
                    </a>
                  </li>
                  <li>
                    <a href="/program" className="block py-2 hover:text-blue-500">
                      Program
                    </a>
                  </li>
                </ul>
              )}
            </li>
            <li>
              {!session && (
                <>
                  <span className="mr-2">You are not signed in</span>
                  <a
                    href={`/api/auth/signin`}
                    onClick={(e) => {
                      e.preventDefault();
                      signIn();
                    }}
                    className="text-white hover:text-green-300"
                  >
                    Sign in
                  </a>
                </>
              )}
              {session?.user && (
                <>
                  <div
                    className="w-8 h-8 rounded-full bg-cover bg-center mr-2"
                    style={{ backgroundImage: `url(${session.user.image})` }}
                  />
                  <div>
                    <small className="block">Signed in as</small>
                    <strong className="block text-white">
                      {session.user.email || session.user.name}
                    </strong>
                  </div>
                  <a
                    href={`/api/auth/signout`}
                    onClick={(e) => {
                      e.preventDefault();
                      signOut();
                    }}
                    className="text-white hover:text-green-300 ml-4"
                  >
                    Sign out
                  </a>
                </>
              )}
            </li>
            <li className="mt-4">
            
            </li>
          </ul>
        )}
        {/* Desktop menu */}
        <ul className="hidden md:flex items-center justify-between p-4">
          {menuLinks.map((link) => (
            <li key={link.href}>
              <a href={link.href} className="text-black font-bold text-xl">
                {link.label}
              </a>
            </li>
          ))}
          <li className="relative">
            <a href="#" onClick={toggleDropdown} className="text-black hover:text-green-300">
              Sponsor
            </a>
            {isDropdownOpen && (
              <ul className="absolute top-10 right-0 bg-white text-gray-900 rounded-md shadow-lg p-2">
                <li>
                  <a href="/child" className="block py-2 hover:text-blue-500">
                    Child
                  </a>
                </li>
                <li>
                  <a href="/program" className="block py-2 hover:text-blue-500">
                    Program
                  </a>
                </li>
              </ul>
            )}
          </li>
          <li>
            <div className="flex items-center">
              {!session && (
                <>
                  <span className="mr-2">You are not signed in</span>
                  <a
                    href={`/api/auth/signin`}
                    onClick={(e) => {
                      e.preventDefault();
                      signIn();
                    }}
                    className="text-black hover:text-green-300"
                  >
                    Sign in
                  </a>
                </>
              )}
              {session?.user && (
                <>
                  <div
                    className="w-8 h-8 rounded-full bg-cover bg-center mr-2"
                    style={{ backgroundImage: `url(${session.user.image})` }}
                  />
                  <div>
                    <small className="block">Signed in as</small>
                    <strong className="block text-black">
                      {session.user.email || session.user.name}
                    </strong>
                  </div>
                  <a
                    href={`/api/auth/signout`}
                    onClick={(e) => {
                      e.preventDefault();
                      signOut();
                    }}
                    className="text-black hover:text-green-300 ml-4"
                  >
                    Sign out
                  </a>
                </>
              )}
            </div>
          </li>
        
        </ul>
      </nav>
    </header>
    <Link
                   href="/donatepage"
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                  >
                    Donate
                  </Link>
    </div> 
     );
};

export default Header;

