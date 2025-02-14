import Image from "next/image";
import Link from "next/link";
import ShowBlogs from "@/Components/ui/ShowBlogs";
import CommentSection from "@/Components/ui/CommentSection";

const BlogPost = async ({ params }: { params: { id: string } }) => {
  const { id } = params;

  const res = await fetch(`http://localhost:8000/api/v1/blog/${id}`);
  const { message } = await res.json();

  return (
    <>
      {/* Blog Section */}
      <div className="bg-gray-50 min-h-screen py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Blog Header */}
          <p className="text-sm text-gray-500 uppercase mb-2">Posted Blog</p>
          <h1 className="text-4xl font-bold text-gray-800 mb-6 leading-snug">
            {message.title || "Untitled Blog"}
          </h1>

          {/* Blog Image */}
          <Image
            src={message.imageURL || "/assets/image/ImagePlaceholder(2).png"}
            alt="Blog Image"
            width={1000}
            height={800}
            className="w-full h-auto object-cover rounded-lg mb-8"
          />

          {/* Blog Content */}
          <div className="text-gray-600 space-y-6 leading-relaxed">
            <p className="text-lg">{message.description || "No description available."}</p>
          </div>

          {/* Comment Section */}
          <CommentSection blogId={id} comments={message.comments || []} />
        </div>
      </div>

      {/* Popular Post Section */}
      <section className="py-8 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            <h3 className="text-3xl font-semibold text-gray-800">Popular Posts</h3>
            <Link
              href="/Blogs"
              className="bg-purple-600 text-white py-2 px-6 rounded-lg hover:bg-purple-700 transition duration-300"
            >
              View All
            </Link>
          </div>
        </div>
      </section>

      {/* Cards Section */}
      <section className="py-12 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <ShowBlogs show={3} />
        </div>
      </section>
    </>
  );
};

export default BlogPost;
