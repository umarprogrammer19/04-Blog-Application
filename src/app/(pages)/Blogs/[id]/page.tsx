import React from "react";

const BlogPost = () => {
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
    <>
      {/* Blog Section */}
      <div className="bg-gray-50 min-h-screen py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Blog Header */}
          <p className="text-sm text-gray-500 uppercase mb-2">Technology</p>
          <h1 className="text-4xl font-bold text-gray-800 mb-6 leading-snug">
            How to make a Game look more attractive with New VR & AI Technology
          </h1>
          {/* Blog Image */}
          <img
            src="src/assets/image/Image Placeholder (1).png"
            alt="VR & AI Technology"
            className="w-screen h-64 object-cover rounded-lg mb-8"
          />


          {/* Blog Content */}
          <div className="text-gray-600 space-y-6 leading-relaxed">
            <p>
              New advancements in VR and AI technologies are bringing the gaming
              experience to a whole new level. The integration of artificial
              intelligence enables more realistic NPCs and immersive environments,
              while VR takes players into worlds beyond their imagination.
            </p>
            <p>
              Developers now have the tools to optimize the graphics and gameplay
              experience, pushing the boundaries of gaming. With VR headsets and
              responsive AI, games are becoming interactive and visually stunning
              like never before.
            </p>

            {/* Quote Section */}
            <div className="border-l-4 border-purple-600 pl-4 italic text-gray-700">
              "I could see a day where Virtual Reality and Artificial Intelligence
              dominate the world, but the collaboration of both will be the future
              that sets visuals and design apart."
            </div>

            <p>
              With more developers working on integrating these technologies into
              mainstream games, the opportunities are limitless. We are looking at
              a future where gaming will no longer be a screen experience but a
              fully immersive adventure that blends reality and fiction together.
            </p>
          </div>

          {/* Secondary Image */}
          <img
            src="/assets/image/Image.png"
            alt="VR Development"
            className="w-full rounded-lg mt-8 mb-6"
          />

          <p className="text-gray-600 leading-relaxed">
            Many leading studios are currently working on perfecting VR and AI
            integration, which will revolutionize the gaming industry. From
            real-time rendering to interactive storytelling, the future looks
            brighter for gamers across the world.
          </p>
        </div>
      </div>

      {/* Popular Post Section */}
      <section className="py-8 bg-white flex flex-col items-center justify-center">
        <div className="flex items-center justify-between w-full max-w-4xl px-4">
          <h3 className="text-3xl font-semibold">Popular Posts</h3>
          <a
            href="#"
            className="bg-purple-600 text-white py-2 px-6 rounded-lg hover:bg-purple-700 transition duration-300"
          >
            View All
          </a>
        </div>
      </section>


      {/* Cards Section */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {cardData.map((card, index) => (
              <div
                key={index}
                className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300"
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
    </>
  );
};

export default BlogPost;
