import React from "react";

const Newsletter = () => {
  return (
    <div className="flex flex-col gap-5 items-center justify-center bg-purple-600 h-[65vh] px-4 text-white relative overflow-hidden">

      {/* Content */}
      <div className="text-3xl text-center mb-4 font-semibold flex flex-col md:gap-5">
        <span className="md:text-[50px]">Get our stories delivered </span>
        <span className="md:text-4xl">From us to your inbox weekly.</span>
      </div>
      <form className="flex items-center space-x-2 w-full max-w-md mt-4">
        <input
          type="email"
          placeholder="Your Email"
          className="flex-1 px-6 py-2 placeholder:text-zinc-950 border-none focus:ring focus:ring-purple-300 text-gray-700"
          required
        />
        <button
          type="submit"
          className="bg-transparent border border-white hover:bg-white hover:text-purple-700 hover:font-bold text-white px-6 py-2 transition-all duration-300"
        >
          Get Started
        </button>
      </form>
      <p className="mt-4 text-md opacity-90 text-center">
        Get a response tomorrow if you submit by 5pm today. If we received after <br />
        5pm, we’ll get a response the following day.
      </p>
    </div>
  );
};

export default Newsletter;
