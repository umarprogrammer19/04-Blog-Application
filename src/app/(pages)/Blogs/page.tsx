import ShowBlogs from "@/Components/ui/ShowBlogs";

const Blogs = () => {

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

      {/* Cards Section */}
      <section className="py-12 bg-gray-50">
        <div className="container mx-auto px-4 max-w-7xl">
            <ShowBlogs />
        </div>
      </section>
    </div>
  );
};

export default Blogs;




