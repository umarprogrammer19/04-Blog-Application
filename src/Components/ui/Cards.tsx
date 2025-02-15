"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import { Heart, MessageCircle, Router, Share2 } from "lucide-react";
import { BlogType } from "./ShowBlogs";
import { useRouter } from "next/navigation";

const Cards: React.FC<BlogType> = (data) => {
  const [isLiked, setIsLiked] = useState<boolean>(false);
  const [likesCount, setLikesCount] = useState(data.likesCount || 0);
  const [isProcessing, setIsProcessing] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const fetchIsLiked = async () => {
      try {
        const response = await fetch(`http://localhost:8000/api/v2/blog/${data._id}/isLiked`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
        });
        const result = await response.json();
        if (response.ok) {
          setIsLiked(result.isLiked);
        } else {
          console.error(result.message || "Failed to fetch like status.");
        }
      } catch (error) {
        console.error("Error fetching like status:", error);
      }
    };

    fetchIsLiked();
  }, [data._id]);

  const toggleLike = async () => {
    if (isProcessing) return;

    setIsProcessing(true);
    try {
      const response = await fetch("http://localhost:8000/api/v2/like", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
        body: JSON.stringify({ blogId: data._id }),
      });
      const result = await response.json();
      if (response.ok) {
        setIsLiked(result.isLiked);
        setLikesCount((prev) => (result.isLiked ? prev + 1 : prev - 1));
      } else {
        alert(result.message || "Something went wrong.");
      }
    } catch (error) {
      console.error("Error liking/unliking blog:", error);
      alert("An error occurred. Please try again later.");
    } finally {
      setIsProcessing(false);
    }
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: data.title,
        text: data.description,
        url: "",
      });
    } else {
      alert("Sharing not supported in this browser.");
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden">
      <Image
        src={data.imageURL}
        alt={data.title}
        width={500}
        height={500}
        className="w-full h-48 sm:h-56 md:h-64 lg:h-48 xl:h-64 object-cover"
      />
      <div className="p-4 md:p-6">
        <span className="text-xs md:text-sm text-gray-500 uppercase">
          {data.createdAt.slice(0, 11)}
        </span>
        <h2 className="text-sm md:text-lg font-semibold text-gray-800 mt-2">
          {data.title.slice(0, 30)}
        </h2>
        <p className="text-gray-600 mt-2 md:mt-3">
          {data.description.slice(0, 130)}
        </p>
        <a
          href={`/Blogs/${data._id}`}
          className="inline-block mt-3 md:mt-4 text-purple-600 font-medium hover:underline"
        >
          Read More
        </a>
        <div className="mt-4 flex space-x-6">
          <button
            onClick={toggleLike}
            disabled={isProcessing}
            className={`flex items-center space-x-2 text-sm font-medium ${isLiked ? "text-red-600" : "text-gray-600"
              } hover:text-red-600 focus:outline-none`}
          >
            <Heart
              className={`w-5 h-5 transition-colors ${isLiked ? "fill-red-600 text-red-600" : "text-gray-600"
                }`}
            />
            <span>{isLiked ? "Liked" : "Like"}</span>
          </button>
          <span className="text-sm font-medium text-gray-600">
            {likesCount} {likesCount === 1 ? "Like" : "Likes"}
          </span>

          <button
            onClick={() => router.push(`/Blogs/${data._id}`)}
            className="flex items-center space-x-2 text-sm font-medium text-gray-600 hover:text-blue-600 focus:outline-none"
          >
            <MessageCircle className="w-5 h-5" />
            <span>Comment</span>
          </button>

          <button
            onClick={handleShare}
            className="flex items-center space-x-2 text-sm font-medium text-gray-600 hover:text-green-600 focus:outline-none"
          >
            <Share2 className="w-5 h-5" />
            <span>Share</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Cards;
