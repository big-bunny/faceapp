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
import Image from 'next/image';

const Header = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
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
            <a className="text-black font-bold text-lg hover:text-green-300 ml-4 flex items-center space-x-1">
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
        className="text-black font-bold text-lg hover:text-green-300 mt-2 flex items-center space-x-1"
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

  const renderUserSection = () => {
    if (!session || !session.user) {
      return (
        <>
          <span className="mr-2">You are not signed in</span>
          <button
            onClick={() => {
             signIn();
            }}
            className="bg-green-500 hover:bg-red-400 hover:rounded-full font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline text-black hover:text-green-300"
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
          {session.user.image && (
            <div
              className="w-8 h-8 rounded-full bg-cover bg-center mr-2"
              style={{ backgroundImage: `url(${session.user.image})` }}
            />
          )}
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
    <div className="fixed top-0 w-full z-50">
      <header className="backdrop-blur-3xl shadow-md">
        <nav className="container mx-auto px-4 py-3 md:flex md:items-center md:justify-between">
          <div className="flex items-center justify-between">
            <Link href="/" onClick={redirectToDashboard}>
              <div className="h-8 w-8 cursor-pointer">
                <Image src="/logo.png" alt="Logo" width={32} height={32} />
              </div>
            </Link>
            <h1 className="text-2xl font-bold cursor-pointer">Schield Centre</h1>
          </div>
          <div className="flex items-center mt-4 md:mt-0">
            <div className="hidden md:block">
              <ul className="flex space-x-4">
                {renderMenuLinks()}
                {renderDropdown()}
              </ul>
            </div>
            <div className="flex items-center ml-4">
              {renderUserSection()}
            </div>
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
                  d="M4 6h16M4 12h16M4 18h-16"
                />
              </svg>
            </button>
            {isMenuOpen && (
              <div className="absolute top-0 right-0 bg-white text-gray-900 rounded-md shadow-lg p-2 mt-10">
                <ul>
                  {renderMenuLinks()}
                  {renderDropdown()}
                </ul>
              </div>
            )}
          </div>
        </nav>
      </header>
    </div>
  );
};

export default Header;
