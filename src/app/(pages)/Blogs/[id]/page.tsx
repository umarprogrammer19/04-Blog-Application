import ShowBlogs from "@/Components/ui/ShowBlogs";
import Image from "next/image";
import Link from "next/link";

const BlogPost = async ({ params }: { params: { id: string; } }) => {
  const { id } = params;

  const res = await fetch(`http://localhost:8000/api/v1/blog/${id}`);
  const { message } = await res.json();
  console.log(message);
  return (
    <>
      {/* Blog Section */}
      <div className="bg-gray-50 min-h-screen py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Blog Header */}
          <p className="text-sm text-gray-500 uppercase mb-2">Posted Blog</p>
          <h1 className="text-4xl font-bold text-gray-800 mb-6 leading-snug">
            {message.title || "How to make a Game look more attractive with New VR & AI Technology"}
          </h1>
          {/* Blog Image */}
          <Image
            src={message.imageURL || "/assets/image/ImagePlaceholder(2).png"}
            alt="VR & AI Technology"
            width={1000}
            height={800}
            className="w-screen h-96 object-cover rounded-lg mb-8"
          />

          {/* Blog Content */}
          <div className="text-gray-600 space-y-6 leading-relaxed">
            <p className="text-lg">
              {message.description || "The gaming industry has seen a massive shift in the last decade, with the introduction of Virtual Reality (VR) and Artificial Intelligence (AI) technologies. These technologies have revolutionized the way games are played, offering a more immersive and interactive experience for gamers."}
            </p>
          </div>
        </div>
      </div>

      {/* Popular Post Section */}
      <section className="py-8 bg-white flex flex-col items-center justify-center">
        <div className="flex items-center justify-between w-full max-w-4xl px-4">
          <h3 className="text-3xl font-semibold">Popular Posts</h3>
          <Link href="/Blogs"
            className="bg-purple-600 text-white py-2 px-6 rounded-lg hover:bg-purple-700 transition duration-300"
          >
            View All
          </Link>
        </div>
      </section>

      {/* Cards Section */}
      <section className="py-12 w-[90%] mx-auto">
        <div className="container mx-auto px-4">
          <ShowBlogs show={3} />
        </div>
      </section>
    </>
  );
};

export default BlogPost;
