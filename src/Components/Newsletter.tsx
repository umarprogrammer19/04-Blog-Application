import React from "react";

const Newsletter = () => {
  return (
    <div className="flex flex-col items-center justify-center bg-purple-600 h-[65vh] px-4 text-white relative overflow-hidden">

      {/* Waves Background */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
        <div className="absolute top-0 left-0 w-64 h-64 bg-gradient-to-br from-purple-400 to-transparent rounded-full opacity-50 -translate-x-1/2 -translate-y-1/2"></div>
        <div className="absolute bottom-0 right-0 w-64 h-64 bg-gradient-to-tl from-purple-400 to-transparent rounded-full opacity-50 translate-x-1/2 translate-y-1/2"></div>
      </div>

      {/* Content */}
      <h1 className="text-3xl md:text-4xl font-semibold text-center mb-4">
        Get our stories delivered <br /> From us to your inbox weekly.
      </h1>
      <form className="flex items-center space-x-2 w-full max-w-md mt-4">
        <input
          type="email"
          placeholder="Your Email"
          className="flex-1 px-4 py-2 rounded-lg border-none focus:ring focus:ring-purple-300 text-gray-700"
          required
        />
        <button
          type="submit"
          className="bg-purple-800 hover:bg-purple-700 text-white px-4 py-2 rounded-lg transition-all duration-300"
        >
          Get Started
        </button>
      </form>
      <p className="mt-4 text-sm opacity-90 text-center">
        Get a response tomorrow if you submit by 5pm today. If we received after
        5pm, we’ll get a response the following day.
      </p>
    </div>
  );
};

export default Newsletter;
