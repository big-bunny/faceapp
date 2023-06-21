import Link from "next/link";
import { signIn, signOut, useSession } from "next-auth/react";
import { useState, useEffect, useRef } from "react";
import { Transition } from "@headlessui/react";
import { MenuIcon, XIcon } from "@heroicons/react/outline";
import { useRouter } from "next/router";
import type { Session } from "next-auth";

function Header() {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const router = useRouter();
  const dropdownRef = useRef(null);
  const { data: session, status: sessionStatus } = useSession();

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleLogoClick = () => {
    router.push("/Dashboard");
  };

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 0) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    const handleClickOutsideDropdown = (event: { target: any }) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    document.addEventListener("mousedown", handleClickOutsideDropdown);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      document.removeEventListener("mousedown", handleClickOutsideDropdown);
    };
  }, []);

  const navigationItems = [
    { href: "/home", text: "Home" },
    { href: "/about", text: "About" },
    { href: "#", text: "Sponsor", subItems: [{ href: "/child", text: "Child" }, { href: "/program", text: "Program" }] },
    { href: "/team", text: "Team" },
    { href: "/gallery", text: "Gallery" },
  ];

  const menuItems = navigationItems.map((item) => (
    <li key={item.href} className="relative">
      <Link href={item.href} passHref legacyBehavior>
        <a className="text-gray-600 hover:text-gray-400">{item.text}</a>
      </Link>
      {item.subItems && (
        <div className="pl-4">
          <ul>
            {item.subItems.map((subItem) => (
              <li key={subItem.href}>
                <Link href={subItem.href} passHref legacyBehavior>
                  <a className="block py-2 text-gray-600 hover:text-gray-400">{subItem.text}</a>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}
    </li>
  ));

  const dropdownTransition = (
    <Transition
      show={isDropdownOpen}
      enter="transition ease-out duration-100 transform"
      enterFrom="opacity-0 scale-95"
      enterTo="opacity-100 scale-100"
      leave="transition ease-in duration-75 transform"
      leaveFrom="opacity-100 scale-100"
      leaveTo="opacity-0 scale-95"
    >
      <Transition.Child
        enter="opacity-0"
        enterFrom="opacity-0"
        enterTo="opacity-100"
        leave="opacity-100"
        leaveFrom="opacity-100"
        leaveTo="opacity-0"
      >
        <div className="md:hidden bg-white py-2 px-4" ref={dropdownRef}>
          <ul>{menuItems}</ul>
        </div>
      </Transition.Child>
    </Transition>
  );

  return (
    <header className={`${isScrolled ? "fixed top-0 left-0 right-0  shadow-lg" : ""}`}>
      <div className="container mx-auto py-4 px-6 bg-gray-200 flex items-center justify-between">
        <h1 className="text-2xl font-bold cursor-pointer" onClick={handleLogoClick}>
          Schield Centre
        </h1>
        <nav className="hidden md:block">
          <ul className="flex space-x-4">{menuItems}</ul>
        </nav>
        <div className="md:hidden">
          <button className="focus:outline-none" onClick={toggleDropdown} aria-label="Toggle menu">
            {isDropdownOpen ? (
              <XIcon className="h-6 w-6 text-gray-600" />
            ) : (
              <MenuIcon className="h-6 w-6 text-gray-600" />
            )}
          </button>
        </div>
        <div>
          {session ? (
            <button className="text-gray-600 hover:text-gray-400" onClick={() => signOut()}>
              Sign Out
            </button>
          ) : (
            <button
              className="text-gray-600 hover:text-gray-400"
              onClick={() => signIn()}
              disabled={sessionStatus === "loading"}
            >
              {sessionStatus === "loading" ? "Signing in..." : "Sign In"}
            </button>
          )}
        </div>
      </div>
      {dropdownTransition}
    </header>
  );
}

export default Header;
