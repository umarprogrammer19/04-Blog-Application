import Link from "next/link";

const not-found = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50 px-4">
      {/* Card */}
      <div className="bg-purple-600 text-white rounded-lg shadow-lg p-16 w-full max-w-4xl h-[60vh] text-center flex flex-col justify-center">
        {/* 404 Heading */}
        <h1 className="text-8xl font-bold mb-6">404</h1>

        {/* Message */}
        <p className="mb-8 text-2xl">
          Sorry! <br />
          The link is broken, try to refresh or go to home
        </p>

        {/* Button */}
        <Link href="/">
          <button className="px-8 py-3 bg-white text-purple-600 rounded-md font-medium hover:bg-gray-200 transition duration-300">
            Go To Home
          </button>
        </Link>
      </div>
    </div>
  );
};

export default not-found;
