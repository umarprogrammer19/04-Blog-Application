"use client"
import Link from "next/link";
import React, { useState } from "react";
import Logout from "./Logout";

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
            <Link href="/" className="text-gray-700 hover:text-purple-600 transition">
              Home
            </Link>
            <Link href="/Blogs" className="text-gray-700 hover:text-purple-600 transition">
              Blogs
            </Link>
            <Link href="/About" className="text-gray-700 hover:text-purple-600 transition">
              About
            </Link>
            <Link href="/Login" className="text-gray-700 hover:text-purple-600 transition">
              Login
            </Link>
            <Link href="/Register" className="text-gray-700 hover:text-purple-600 transition">
              Register
            </Link>
            <Link href="/Dashboard" className="text-gray-700 hover:text-purple-600 transition">
              Dashboard
            </Link>
          </div>

          {/* Contact Button */}
          <div className="hidden md:block">
            <Logout />
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
            <Link href="/" className="text-gray-700 hover:text-purple-600 transition">
              Home
            </Link>
            <Link href="/Blogs" className="text-gray-700 hover:text-purple-600 transition">
              Blogs
            </Link>
            <Link href="/About" className="text-gray-700 hover:text-purple-600 transition">
              About
            </Link>
            <Link href="/Login" className="text-gray-700 hover:text-purple-600 transition">
              Login
            </Link>
            <Link href="/Register" className="text-gray-700 hover:text-purple-600 transition">
              Register
            </Link>
            <Logout />
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
