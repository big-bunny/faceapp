import React, { useState } from 'react';
import { signIn, signOut, useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faHome,
  faUser,
  faSignOutAlt,
  faInfoCircle,
  faUsers,
  faImages,
  faDonate,
  faChild,
  faHandsHelping,
} from '@fortawesome/free-solid-svg-icons';
import Link from 'next/link';
import RegisterForm from './RegisterForm'; // Import the RegisterForm component

const Header: React.FC = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showRegisterForm, setShowRegisterForm] = useState(false); // New state to control the display of RegisterForm
  const router = useRouter();

  const toggleDropdown = () => {
    setIsDropdownOpen((prevState) => !prevState);
  };

  const toggleMenu = () => {
    setIsMenuOpen((prevState) => !prevState);
  };

  const { data: session, status } = useSession();
  const loading = status === 'loading';

  const menuLinks = [
    { href: '/home', label: 'Home', icon: faHome },
    { href: '/about', label: 'About', icon: faInfoCircle },
    { href: '/team', label: 'Team', icon: faUsers },
    { href: '/gallery', label: 'Gallery', icon: faImages },
  ];

  const renderMenuLinks = () => (
    <>
      {menuLinks.map((link) => (
        <li key={link.href}>
          <Link href={link.href} className="text-black font-bold text-2xl hover:text-green-300 ml-4">
            <FontAwesomeIcon icon={link.icon} className="mr-2" />
            {link.label}
          </Link>
        </li>
      ))}
    </>
  );

  const renderDropdown = () => (
    <li className="relative">
      <button onClick={toggleDropdown} className="text-black font-bold text-2xl hover:text-green-300 mt-2">
        <FontAwesomeIcon icon={faDonate} className="mr-1" />
        Sponsor
      </button>
      {isDropdownOpen && (
        <ul className="absolute top-10 right-0 bg-white text-gray-900 rounded-md shadow-lg p-2">
          <li>
            <Link href="/child" className="block py-2 hover:text-blue-500">
              <FontAwesomeIcon icon={faChild} className="mr-2" />
              Child
            </Link>
          </li>
          <li>
            <Link href="/program" className="block py-2 hover:text-blue-500">
              <FontAwesomeIcon icon={faHandsHelping} className="mr-2" />
              Program
            </Link>
          </li>
        </ul>
      )}
    </li>
  );

  const toggleRegisterForm = () => {
    setShowRegisterForm((prevState) => !prevState);
  };

  const renderUserSection = () => {
    if (!session) {
      return (
        <>
          <span className="mr-2">You are not signed in</span>
          <button
            onClick={() => {
              signIn();
            }}
            className=" bg-green-500 hover:bg-red-400 hover:rounded-full  font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outlinetext-black hover:text-green-300"
          >
            <FontAwesomeIcon icon={faUser} className="mr-1" />
            Sign in
          </button>
          <button
            onClick={toggleRegisterForm}
            className=" bg-red-500 hover:bg-green-400 hover:rounded-full font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline text-black hover:text-green-300 ml-4"
          >
            Register
          </button>
        </>
      );
    }

    return (
      <>
        <div className="flex items-center">
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
          <button
            onClick={() => {
              signOut();
            }}
            className="text-black hover:text-green-300 ml-4"
          >
            <FontAwesomeIcon icon={faSignOutAlt} className="mr-1" />
            Sign out
          </button>
        </div>
      </>
    );
  };

  const redirectToDashboard = () => {
    router.push('/');
  };

  return (
    <div className="fixed top-0 w-full z-50">
      <header className="backdrop-filter backdrop-blur-3xl rounded-3xl  shadow-md">
        <nav className="container mx-auto px-4 md:px-8">
          <div className="flex items-center justify-between py-4">
            <div className="flex items-center space-x-4">
              <Link href="/" onClick={redirectToDashboard}>
                <img src="/logo.png" alt="Logo" className="h-8 w-8" />
                <h1 className="text-3xl font-bold cursor-pointer">Schield Centre</h1>
              </Link>
            </div>
            <div className="md:hidden">
              <button
                type="button"
                className="text-black hover:text-green-300 focus:outline-none"
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
            <ul className="hidden md:flex items-center space-x-4">
              {renderMenuLinks()}
              {renderDropdown()}
              <li>{renderUserSection()}</li>
            </ul>
          </div>
          {isMenuOpen && (
            <ul className="md:hidden backdrop-blur-4xl text-black px-4 py-2">
              {renderMenuLinks()}
              <li className="mt-2">
                <button onClick={toggleDropdown} className="block font-bold text-2xl py-2">
                  <FontAwesomeIcon icon={faDonate} className="mr-2" />
                  Sponsor
                </button>
                {isDropdownOpen && (
                  <ul className="ml-4 bg-white text-gray-900 rounded-md shadow-lg py-2">
                    <li>
                      <Link href="/child" className="block py-2 hover:text-blue-500">
                        <FontAwesomeIcon icon={faChild} className="mr-2" />
                        Child
                      </Link>
                    </li>
                    <li>
                      <Link href="/program" className="block py-2 hover:text-blue-500">
                        <FontAwesomeIcon icon={faHandsHelping} className="mr-2" />
                        Program
                      </Link>
                    </li>
                  </ul>
                )}
              </li>
              <li className="mt-2">{renderUserSection()}</li>
            </ul>
          )}
        </nav>
      </header>
      {showRegisterForm && <RegisterForm toggleForm={toggleRegisterForm} />} {/* Render the RegisterForm component when showRegisterForm is true */}
    </div>
  );
};

export default Header;
