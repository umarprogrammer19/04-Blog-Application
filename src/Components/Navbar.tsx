import React, { useState } from "react";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Function to toggle menu
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="text-purple-600 font-bold text-2xl">Blogs</div>

          {/* Desktop Links */}
          <div className="hidden md:flex space-x-6">
            <a href="/" className="text-gray-700 hover:text-purple-600 transition">
              Home
            </a>
            <a href="/Blogs" className="text-gray-700 hover:text-purple-600 transition">
              Blogs
            </a>
            <a href="/about" className="text-gray-700 hover:text-purple-600 transition">
              About
            </a>
            <a href="/Login" className="text-gray-700 hover:text-purple-600 transition">
              Login
            </a>
            <a href="/Register" className="text-gray-700 hover:text-purple-600 transition">
              Register
            </a>
          </div>

          {/* Contact Button */}
          <div className="hidden md:block">
            <a
              href="/Contact"
              className="bg-purple-600 text-white px-4 py-2 rounded-md hover:bg-purple-700 transition"
            >
              Contact
            </a>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={toggleMenu}
              className="text-purple-600 hover:text-purple-800 focus:outline-none"
              aria-label="Toggle navigation"
            >
              {isMenuOpen ? (
                // Close Icon
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              ) : (
                // Hamburger Icon
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h16m-7 6h7"
                  />
                </svg>
              )}
            </button>
          </div>
        </div>

        {/* Mobile Links */}
        <div className={`md:hidden ${isMenuOpen ? "block" : "hidden"}`}>
          <div className="flex flex-col space-y-2 mt-2">
            <a href="/" className="text-gray-700 hover:text-purple-600 transition">
              Home
            </a>
            <a href="/Blogs" className="text-gray-700 hover:text-purple-600 transition">
              Blogs
            </a>
            <a href="/about" className="text-gray-700 hover:text-purple-600 transition">
              About
            </a>
            <a href="/Login" className="text-gray-700 hover:text-purple-600 transition">
              Login
            </a>
            <a href="/Register" className="text-gray-700 hover:text-purple-600 transition">
              Register
            </a>
            <a
              href="/Contact"
              className="bg-purple-600 text-white px-4 py-2 rounded-md hover:bg-purple-700 transition text-center"
            >
              Contact
            </a>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
