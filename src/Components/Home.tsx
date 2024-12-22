import React from "react";
import Hero from "./Home/Hero";
import Section2 from "./Home/Section2";
import Link from "next/link";
import Section3 from "./Home/Section3";

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
      <Hero />
      <Section2 />
      <Section3 />

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
