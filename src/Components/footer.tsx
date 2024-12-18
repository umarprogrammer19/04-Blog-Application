import React from "react";

const Footer = () => {
  return (
    <div className="w-full bg-white border-t border-gray-200">
      {/* Footer Container */}
      <div className="max-w-7xl mx-auto py-8 flex flex-col items-center">
        {/* Logo */}
        <div className="mb-4">
          <h1 className="text-3xl font-bold text-purple-600">Blogging app</h1>
        </div>
   

        {/* Navigation Links */}
        <ul className="flex space-x-6 mb-6 text-gray-600">
          <li className="hover:text-purple-600 cursor-pointer">Home</li>
          <li className="hover:text-purple-600 cursor-pointer">Blog</li>
          <li className="hover:text-purple-600 cursor-pointer">About</li>
          <li className="hover:text-purple-600 cursor-pointer">Contact Us</li>
        </ul>

        {/* Social Media Icons */}
        <div className="flex space-x-4 mb-6">
          <div className="w-10 h-10 flex items-center justify-center rounded-full bg-purple-600 text-white cursor-pointer hover:bg-purple-700">
            FB
          </div>
          <div className="w-10 h-10 flex items-center justify-center rounded-full bg-purple-600 text-white cursor-pointer hover:bg-purple-700">
            IG
          </div>
          <div className="w-10 h-10 flex items-center justify-center rounded-full bg-purple-600 text-white cursor-pointer hover:bg-purple-700">
            LN
          </div>
          <div className="w-10 h-10 flex items-center justify-center rounded-full bg-purple-600 text-white cursor-pointer hover:bg-purple-700">
            YT
          </div>
        </div>

        {/* Copyright */}
        <div className="text-gray-500 text-sm">
          © 2024 Blogging. All Right Reserved
        </div>
      </div>
    </div>
  );
};

export default Footer;
