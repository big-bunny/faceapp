import { SetStateAction, useState } from 'react';
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
  const [isSponsorDropdownOpen, setIsSponsorDropdownOpen] = useState(false);
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const router = useRouter();

  const toggleState = (setState: { (value: SetStateAction<boolean>): void; (value: SetStateAction<boolean>): void; (value: SetStateAction<boolean>): void; (arg0: (prevState: any) => boolean): void; }) => {
    setState((prevState) => !prevState);
  };

  const toggleSponsorDropdown = () => {
    toggleState(setIsSponsorDropdownOpen);
  };

  const toggleProfileDropdown = () => {
    toggleState(setIsProfileDropdownOpen);
  };

  const toggleMenu = () => {
    toggleState(setIsMenuOpen);
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
            <a className="text-white font-extrabold text-2xl hover:text-red-800 ml-4 flex items-center space-x-1">
              <FontAwesomeIcon icon={link.icon} className="mr-2" />
              <span>{link.label}</span>
            </a>
          </Link>
        </li>
      ))}
    </>
  );

  const renderSponsorDropdown = () => (
    <li className="relative">
      <button
        onClick={toggleSponsorDropdown}
        className="text-white font-extrabold text-2xl hover:text-blue-500 ml-4 flex items-center space-x-1"
      >
        <FontAwesomeIcon icon={faDonate} className="mr-1" />
        <span>Sponsor</span>
      </button>
      {isSponsorDropdownOpen && (
        <ul className="absolute top-10 right-0 bg-white text-gray-900 rounded-md shadow-lg p-2">
          <li>
            <Link href="/child" legacyBehavior>
              <a className="block py-2 hover:text-blue-500 items-center space-x-1">
                <FontAwesomeIcon icon={faChild} className="mr-2" />
                <span>Child</span>
              </a>
            </Link>
          </li>
          <li>
            <Link href="/program" legacyBehavior>
              <a className="block py-2 hover:text-blue-500 items-center space-x-1">
                <FontAwesomeIcon icon={faHandsHelping} className="mr-2" />
                <span>Program</span>
              </a>
            </Link>
          </li>
        </ul>
      )}
    </li>
  );

  const renderProfileDropdown = () => {
    const handleSignOut = async () => {
      await signOut();
      router.push('/');
    };

    return (
      <ul className="relative">
        <button
          onClick={toggleProfileDropdown}
          className="text-white font-extrabold text-2xl hover:text-green-300 ml-4 flex items-center space-x-1"
        >
          <FontAwesomeIcon icon={faUser} className="mr-1" />
          <span>{session?.user ? session.user.email || session.user.name : 'Profile'}</span>
        </button>
        {isProfileDropdownOpen && (
          <ul className="absolute top-10 right-0 bg-white text-gray-900 rounded-md shadow-lg p-2">
            {!session?.user ? (
              <>
                <ul>
                  <button
                    onClick={() => {
                      signIn();
                    }}
                    className="block py-2 hover:text-blue-500 items-center space-x-1"
                  >
                    <FontAwesomeIcon icon={faUser} className="mr-2" />
                    <span>Sign in</span>
                  </button>
                </ul>
                <ul>
                  <button
                    onClick={redirectToRegisterPage}
                    className="py-2 hover:text-blue-500 flex items-center space-x-1"
                  >
                    <span>Register</span>
                  </button>
                </ul>
              </>
            ) : (
              <>
                <ul>
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
                  </div>
                </ul>
                <ul>
                  <button
                    onClick={handleSignOut}
                    className="py-2 hover:text-blue-500 flex items-center space-x-1"
                  >
                    <FontAwesomeIcon icon={faSignOutAlt} className="mr-2" />
                    <span>Sign out</span>
                  </button>
                </ul>
              </>
            )}
          </ul>
        )}
      </ul>
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

  const renderLogo = () => (
    <Link href="/" onClick={redirectToDashboard}>
      <div className="h-8 w-8 cursor-pointer">
        <Image src="/logo.png" alt="Logo" width={32} height={32} />
      </div>
    </Link>
  );

  const renderTitle = () => (
    <Link href="/" onClick={redirectToDashboard}>
      <div className="cursor-pointer">
        <h1 className="text-3xl  text-black font-extrabold hover:text-white cursor-pointer">Schield Centre</h1>
      </div>
    </Link>
  );

  return (
    <div className="fixed top-0 w-full z-50">
      <header className="backdrop-blur-3xl ">
        <nav className="container mx-auto px-4 py-3 md:flex md:items-center md:justify-between">
          <div className="flex items-center justify-between">
            {renderLogo()}
            {renderTitle()}
          </div>
          <div className="flex items-center mt-4 md:mt-0 space-x-4">
            <ul className="hidden md:flex">
              {renderMenuLinks()}
              {renderSponsorDropdown()}
            </ul>
            <div className="flex items-center ml-4 space-x-4">
              {renderProfileDropdown()}
              <button
                onClick={redirectToDonatePage}
                className="text-white font-extrabold text-2xl hover:text-red-800 ml-4 flex items-center space-x-1"
              >
                <FontAwesomeIcon icon={faDonate} className="mr-0" />
            
              </button>
            </div>
          </div>
          <div className="md:hidden">
            <button
              type="button"
              className="text-white top-0 hover:text-red-500 focus:outline-none"
              onClick={toggleMenu}
            >
              <svg
                className="h-8 w-8"
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
            {isMenuOpen && (
              <div className="absolute top-0 left-0 bg-white text-gray-900 rounded-md shadow-lg p-2 mt-40">
                <ul className="flex flex-col">
                  {renderMenuLinks()}
                  {renderSponsorDropdown()}
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
