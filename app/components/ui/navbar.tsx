import { List } from "lucide-react";
import { useState } from "react";
import { Link, NavLink } from "react-router";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };  

  const navLinks = [
    { name: "Katalog", path: "/categories" },
    { name: "Galeri", path: "/gallery" },
    { name: "Tentang Kami", path: "/about" },
    { name: "Kontak", path: "/contact" },
  ];

  return (
    <nav className="bg-[#2D1C0F] border-gray-200 shadow-sm fixed w-full z-50 top-0 start-0 border-b">
      <div className="max-w-7xl flex flex-wrap items-center justify-between mx-auto p-4">
        <Link
          to="/"
          className="flex items-center space-x-3 rtl:space-x-reverse">
          <span className="self-center text-2xl font-semibold whitespace-nowrap text-gray-900">
            <img src="/assets/jamu-logo.png" className="h-10" />
          </span>
        </Link>
        <button
          onClick={toggleMenu}
          type="button"
          className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200"
          aria-controls="navbar-default"
          aria-expanded={isOpen}>
          <span className="sr-only">Open main menu</span>
          {/* <svg
            className="w-5 h-5"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 17 14">
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M1 1h15M1 7h15M1 13h15"
            />
          </svg> */}

          <List className="w-6 h-6 text-white" />
        </button>
        <div
          className={`${isOpen ? "block" : "hidden"} w-full md:block md:w-auto`}
          id="navbar-default">
          <ul className="font-medium flex flex-col p-4 md:p-0 mt-4 border rounded-lg bg-[#f87108] md:flex-row md:space-x-8 rtl:space-x-reverse md:mt-0 md:border-0 md:bg-transparent">
            {navLinks.map((link) => (
              <li key={link.path}>
                <NavLink
                  to={link.path}
                  className={({ isActive }) =>
                    `block py-2 px-3 rounded md:p-0 ${
                      isActive ?
                        "text-[#f87108] bg-blue-100 rounded-lg md:rounded-none md:bg-transparent md:text-white"
                      : "text-black hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:text-[#f87108] md:hover:text-white"
                    }`
                  }>
                  {link.name}
                </NavLink>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </nav>
  );
}
