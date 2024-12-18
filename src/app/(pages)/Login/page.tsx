// import React from 'react';

const Login = () => {
  return (
    <div className="flex items-center justify-center min-h-screen ">
      {/* Card Container */}
      <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-md">
        <h1 className="text-center text-3xl font-bold mb-6 text-violet-700 ">
          Login
        </h1>
        {/* Form Inputs */}
        <form className="space-y-4">
          <input
            type="email"
            placeholder="Email"
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-violet-600"
            disabled
          />
          <input
            type="password"
            placeholder="Password"
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-violet-600"
            disabled
          />
          {/* Login Button */}
          <button
            type="button"
            className="w-full bg-violet-600 text-white font-semibold px-4 py-2 rounded-md hover:bg-violet-700 transition cursor-not-allowed"
            disabled
          >
            Login
          </button>
        </form>

        {/* Register Link */}
        <p className="text-center text-gray-600 mt-4">
          Don't have an account?{' '}
          <a href="/Register" className="text-violet-600 hover:underline">     Register</a>
          <span className="text-violet-600 underline cursor-not-allowed">
        
          </span>
        </p>
      </div>
    </div>
  );
};

export default Login;
