import React from "react";

const HomePage = () => {
  const cardData = [
    {
      image: "src/assets/image/Image Placeholder (2).png",
      title: "8 Rules Of Travelling In Sea You Need To Know",
      category: "Travel",
      description:
        "Travelling in the sea has many advantages, from better scenery to more relaxed settings.",
      link: "#",
    },
    {
      image: "src/assets/image/Image Placeholder (1).png",
      title: "How to build strong portfolio and get a Job in UI/UX",
      category: "Design",
      description:
        "Capitalize on key hiring factors and design strategies to land your dream role.",
      link: "#",
    },
    {
      image: "src/assets/image/Image Placeholder (2).png",
      title: "How to Be a Professional Footballer in 2023",
      category: "Sports",
      description:
        "Organizing your life to initiate a strong career path in football and sports.",
      link: "#",
    },
  ];

  return (
    <div>
      {/* Home Section */}
      <div className="bg-purple-600 p-8 rounded-lg flex flex-col lg:flex-row items-center gap-8">
        <div className="w-full lg:w-1/2 text-white">
          <h2 className="text-4xl font-semibold mb-4">
            How AI will Change the Future
          </h2>
          <p className="mb-6">
            The future of AI will see home robots having enhanced intelligence,
            increased capabilities, and becoming more personal and possibly cute.
          </p>
          <button className="bg-white text-purple-600 px-6 py-2 rounded-full hover:bg-purple-200 transition duration-300">
            Read more
          </button>
        </div>
        <div className="w-full lg:w-1/2">
          <img
            src="src/assets/image/Haderimg.png"
            alt="Featured Post"
            className="w-full h-auto object-cover rounded-lg"
          />
        </div>
      </div>

      {/* Recent Blog Post with Overlay */}
      <section className="relative bg-gray-100 py-8">
        <div className="max-w-7xl mx-auto px-4">
          <div className="relative rounded-lg overflow-hidden">
            <img
              src="src/assets/image/Image Placeholder (1).png"
              alt="VR Game"
              className="w-full h-64 md:h-96 object-cover"
            />
            <div className="absolute bottom-4 left-4 right-4 bg-white p-4 md:p-6 rounded-lg shadow-lg">
              <span className="text-xs text-gray-500 uppercase">
                01 Jan 2023 - 5 min read
              </span>
              <h2 className="text-lg md:text-2xl font-bold mt-2 text-gray-900">
                How to make a Game look more attractive with New VR & AI
                Technology
              </h2>
              <p className="text-sm md:text-base text-gray-600 mt-3">
                Design has been evolving for years, providing benefits in
                aesthetics and immersive experiences.
              </p>
              <a
                href="/SingleBlog"
                className="inline-block mt-4 bg-purple-600 text-white py-2 px-4 rounded hover:bg-purple-700 transition duration-300"
              >
                Read More
              </a>
            </div>
          </div>
        </div>
      </section>
      <section className="py-8 bg-white flex flex-col items-center justify-center">
        <div className="flex items-center justify-between w-full max-w-4xl px-4">
          <h3 className="text-3xl font-semibold">Our Recent Posts</h3>
          <a
            href="/SingleBlog"
            className="bg-purple-600 text-white py-2 px-6 rounded-lg hover:bg-purple-700 transition duration-300"
          >
            View All
          </a>
        </div>
      </section>

      {/* Cards Section */}
      <section className="py-12 bg-gray-50">
        <div className="container mx-auto px-4">

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {cardData.map((card, index) => (
              <div
                key={index}
                className="bg-white rounded-lg shadow-lg overflow-hidden"
              >
                <img
                  src={card.image}
                  alt={card.title}
                  className="w-full h-48 object-cover"
                />
                <div className="p-6">
                  <span className="text-xs text-gray-500 uppercase">
                    {card.category}
                  </span>
                  <h2 className="text-lg font-semibold text-gray-800 mt-2">
                    {card.title}
                  </h2>
                  <p className="text-gray-600 mt-3">{card.description}</p>
                  <a
                    href={card.link}
                    className="inline-block mt-4 text-purple-600 font-medium hover:underline"
                  >
                    Read More
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Popular Post Section */}
      <section className="py-8 bg-white flex flex-col items-center justify-center">
        <div className="flex items-center justify-between w-full max-w-4xl px-4">
          <h3 className="text-3xl font-semibold">Popular Posts</h3>
          <a
            href="/SingleBlog"
            className="bg-purple-600 text-white py-2 px-6 rounded-lg hover:bg-purple-700 transition duration-300"
          >
            View All
          </a>
        </div>
      </section>

    </div>
  );
};

export default HomePage;
