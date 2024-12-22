import React from "react";

const HomePage = () => {
  const cardData = [
    {
      image: "/assets/image/ImagePlaceholder(2).png",
      title: "8 Rules Of Travelling In Sea You Need To Know",
      category: "Travel",
      description:
        "Travelling in the sea has many advantages, from better scenery to more relaxed settings.",
      link: "#",
    },
    {
      image: "/assets/image/ImagePlaceholder(1).png",
      title: "How to build strong portfolio and get a Job in UI/UX",
      category: "Design",
      description:
        "Capitalize on key hiring factors and design strategies to land your dream role.",
      link: "#",
    },
    {
      image: "/assets/image/ImagePlaceholder(2).png",
      title: "How to Be a Professional Footballer in 2023",
      category: "Sports",
      description:
        "Organizing your life to initiate a strong career path in football and sports.",
      link: "#",
    },
  ];

  return (
    <div className="w-full">
      {/* Home Section */}
      <div className="bg-purple-600 p-6 md:p-8 lg:p-12 rounded-lg flex flex-col lg:flex-row items-center gap-6 lg:gap-12">
        <div className="w-full lg:w-1/2 text-white text-center lg:text-left">
          <span className="text-xs md:text-sm uppercase font-medium tracking-wide">
            Featured Post
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-[48px] font-bold mb-6 md:mb-8">
            How AI will<br /> Change the Future
          </h2>
          <p className="text-sm md:text-base mb-4 md:mb-6 leading-relaxed">
            The future of AI will see home robots having enhanced intelligence,
            increased capabilities, and becoming more personal and possibly
            cute. For example, home robots will overcome navigation and
            direction challenges.
          </p>
          <button className="bg-white text-purple-600 px-4 md:px-6 py-2 rounded-md hover:bg-purple-200 transition duration-300">
            Read more
          </button>
        </div>
        <div className="w-full lg:w-1/2">
          <img
            src="/assets/image/Haderimg.png"
            alt="Featured Post"
            className="w-full h-auto object-contain rounded-lg"
          />
        </div>
      </div>

      {/* Recent Blog Post with Overlay */}
      <section className="relative bg-gray-100 py-6 md:py-8 lg:py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          {/* Image Container */}
          <div className="relative rounded-lg overflow-hidden">
            <img
              src="/assets/image/ImagePlaceholder(1).png"
              alt="VR Game"
              className="w-full h-auto object-cover rounded-lg"
            />
            {/* Card Positioned Over Image (Right-Aligned) */}
            <div
              className="absolute bottom-8 right-14 transform translate-y-[10%] translate-x-[10%] z-10 bg-white p-4 sm:p-6 md:p-8 rounded-2xl shadow-lg"
              style={{
                width: "clamp(60%, 300px, 40%)", // Responsive width using CSS clamp
              }}
            >
              <span className="text-xs md:text-sm text-gray-500 uppercase">
                01 Jan 2023 - 5 min read
              </span>
              <h2 className="text-sm md:text-lg lg:text-xl font-bold mt-2 text-gray-900">
                How to make a Game look more attractive with New VR & AI Technology
              </h2>
              <p className="text-xs md:text-sm lg:text-base text-gray-600 mt-3">
                Google has been investing in AI for many years and bringing its
                benefits to individuals, businesses, and communities. Whether it’s
                publishing state-of-the-art research, building helpful products, or
                developing tools and resources, we’re committed to making AI
                accessible to everyone.
              </p>
              <a
                href="/SingleBlog"
                className="inline-block mt-4 md:mt-6 bg-purple-600 text-white py-2 px-4 md:px-6 rounded hover:bg-purple-700 transition duration-300"
              >
                Read More
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Recent Posts Section */}
      <section className="pt-12 md:pt-16 lg:pt-24 bg-white flex flex-col items-center">
        <div className="flex justify-between items-center w-full max-w-4xl px-4 sm:px-6">
          <h3 className="text-2xl md:text-3xl font-semibold">Our Recent Posts</h3>
          <a
            href="/SingleBlog"
            className="bg-purple-600 text-white py-2 px-4 md:px-6 rounded-lg hover:bg-purple-700 transition duration-300"
          >
            View All
          </a>
        </div>
      </section>

      {/* Cards Section */}
      <section className="py-6 md:py-8 lg:py-12 bg-gray-50 mt-20">
        <div className="container mx-auto px-4 sm:px-6 max-w-7xl">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {cardData.map((card, index) => (
              <div
                key={index}
                className="bg-white rounded-lg shadow-lg overflow-hidden"
              >
                <img
                  src={card.image}
                  alt={card.title}
                  className="w-full h-48 sm:h-56 md:h-64 lg:h-48 xl:h-64 object-cover"
                />
                <div className="p-4 md:p-6">
                  <span className="text-xs md:text-sm text-gray-500 uppercase">
                    {card.category}
                  </span>
                  <h2 className="text-sm md:text-lg font-semibold text-gray-800 mt-2">
                    {card.title}
                  </h2>
                  <p className="text-gray-600 mt-2 md:mt-3">
                    {card.description}
                  </p>
                  <a
                    href={card.link}
                    className="inline-block mt-3 md:mt-4 text-purple-600 font-medium hover:underline"
                  >
                    Read More
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Popular Posts Section */}
      <section className="py-6 md:py-8 lg:py-12 bg-white flex flex-col items-center">
        <div className="flex items-center justify-between w-full max-w-4xl px-4 sm:px-6">
          <h3 className="text-2xl md:text-3xl font-semibold">Popular Posts</h3>
          <a
            href="/SingleBlog"
            className="bg-purple-600 text-white py-2 px-4 md:px-6 rounded-lg hover:bg-purple-700 transition duration-300"
          >
            View All
          </a>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
