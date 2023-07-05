import { useState } from 'react';
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
import RegisterForm from './RegisterForm';
import Image from 'next/image';

const Header = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showRegisterForm, setShowRegisterForm] = useState(false);
  const [isDonateButtonMoving, setIsDonateButtonMoving] = useState(false);
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
          <Link href={link.href} legacyBehavior>
            <a className="text-black font-bold text-2xl hover:text-green-300 ml-4 flex items-center space-x-1">
              <FontAwesomeIcon icon={link.icon} className="mr-2" />
              <span>{link.label}</span>
            </a>
          </Link>
        </li>
      ))}
    </>
  );

  const renderDropdown = () => (
    <li className="relative">
      <button
        onClick={toggleDropdown}
        className="text-black font-bold text-2xl hover:text-green-300 mt-2 flex items-center space-x-1"
      >
        <FontAwesomeIcon icon={faDonate} className="mr-1" />
        <span>Sponsor</span>
      </button>
      {isDropdownOpen && (
        <ul className="absolute top-10 right-0 bg-white text-gray-900 rounded-md shadow-lg p-2">
          <li>
            <Link href="/child" legacyBehavior>
              <a className="block py-2 hover:text-blue-500 flex items-center space-x-1">
                <FontAwesomeIcon icon={faChild} className="mr-2" />
                <span>Child</span>
              </a>
            </Link>
          </li>
          <li>
            <Link href="/program" legacyBehavior>
              <a className="block py-2 hover:text-blue-500 flex items-center space-x-1">
                <FontAwesomeIcon icon={faHandsHelping} className="mr-2" />
                <span>Program</span>
              </a>
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
            className="bg-green-500 hover:bg-red-400 hover:rounded-full font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outlinetext-black hover:text-green-300"
          >
            <FontAwesomeIcon icon={faUser} className="mr-1" />
            Sign in
          </button>
          <button
            onClick={redirectToRegisterPage}
            className="bg-red-500 hover:bg-green-400 hover:rounded-full font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline text-black hover:text-green-300 ml-4"
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

  const redirectToDonatePage = () => {
    router.push('/donatepage');
  };
  const redirectToRegisterPage = () => {
    router.push('/register'); // Replace '/register' with the actual URL of your register page
  };

  const handleDonateButtonClick = () => {
    setIsDonateButtonMoving(true);
    setTimeout(() => {
      setIsDonateButtonMoving(false);
    }, 2000);
  };

  return (
    <div className="fixed top-0 w-full h-6 z-50">
      <header className="backdrop-filter backdrop-blur-3xl rounded-3xl shadow-md">
        <nav className="container mx-auto px-2 md:px-8">
          <div className="flex items-center justify-between py-4">
            <div className="flex items-center space-x-2">
              <Link href="/" onClick={redirectToDashboard}>
                <div className="h-8 w-8 cursor-pointer">
                  <Image src="/logo.png" alt="Logo" width={32} height={32} />
                </div>
                <span>
                  <h1 className="flex text-3xl font-bold cursor-pointer">Schield Centre</h1>
                </span>
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
            <div className="hidden md:flex md:space-x-4">
              <ul className="flex space-x-4">
                {renderMenuLinks()}
                {renderDropdown()}
              </ul>
              <div className="flex items-center space-x-4">
                {!loading && renderUserSection()}
              </div>
              <div className="flex items-center">
                <button
                  onClick={redirectToDonatePage}
                  className={`bg-green-500 hover:bg-green-400 font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline text-black hover:text-green-300 ${
                    isDonateButtonMoving ? 'animate-bounce' : ''
                  }`}
                >
                  Donate
                </button>
              </div>
            </div>
          </div>
        </nav>
        {isMenuOpen && (
          <div className="md:hidden">
            <ul className="bg-white text-gray-900 text-center mt-2 py-4">
              {renderMenuLinks()}
              {renderDropdown()}
              <li className="mt-4">
                <div className="flex justify-center">
                  {!loading && renderUserSection()}
                </div>
              </li>
              <li className="mt-4">
                <div className="flex justify-center">
                  <button
                    onClick={redirectToDonatePage}
                    className={`bg-green-500 hover:bg-green-400 font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline text-black hover:text-green-300 ${
                      isDonateButtonMoving ? 'animate-bounce' : ''
                    }`}
                  >
                    Donate
                  </button>
                </div>
              </li>
            </ul>
          </div>
        )}
      </header>
      {showRegisterForm && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <RegisterForm onClose={toggleRegisterForm} />
        </div>
      )}
    </div>
  );
};

export default Header;
