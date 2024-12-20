import Image from "next/image";

const Blogs = () => {
  const cardData = [
    {
      image: "/assets/image/ImagePlaceholder(2).png", // Image path for public folder
      title: "8 Rules Of Travelling In Sea You Need To Know",
      category: "Travel",
      description:
        "Travelling in the sea has many advantages, from better scenery to more relaxed settings.",
      link: "#",
    },
    {
      image: "/assets/image/ImagePlaceholder(1).png", // Image path for public folder
      title: "How to build strong portfolio and get a Job in UI/UX",
      category: "Design",
      description:
        "Capitalize on key hiring factors and design strategies to land your dream role.",
      link: "#",
    },
    {
      image: "/assets/image/ImagePlaceholder(2).png", // Image path for public folder
      title: "How to Be a Professional Footballer in 2023",
      category: "Sports",
      description:
        "Organizing your life to initiate a strong career path in football and sports.",
      link: "#",
    },
  ];

  return (
    <div className="bg-gray-50">
      {/* Header Section */}
      <section className="py-12 text-center">
        <div className="max-w-3xl mx-auto px-4">
          <p className="text-sm text-gray-500 uppercase tracking-wide mb-2">
            OUR BLOGS
          </p>
          <h2 className="text-3xl font-bold text-gray-800 mb-4">
            Find all our blogs here
          </h2>
          <p className="text-gray-600 text-base leading-relaxed">
            Our blogs are carefully researched and well-written to provide you
            with the best content. Explore the articles curated just for you.
          </p>
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
                <Image
                  src={card.image}
                  alt={card.title}
                  width={500} // Adjust width as needed
                  height={300} // Adjust height as needed
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
    </div>
  );
};

export default Blogs;
