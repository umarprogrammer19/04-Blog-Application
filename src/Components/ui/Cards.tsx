"use client";
import { Card as CardType } from '@/Data/Home-Cards';
import Image from 'next/image';
import React, { useState } from 'react';
import { Heart, MessageCircle, Share2 } from 'lucide-react';

const Cards: React.FC<CardType> = (data) => {
  const [isLiked, setIsLiked] = useState(false);

  const toggleLike = () => {
    setIsLiked((prev) => !prev);
  };
  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: data.title,
        text: data.description,
        url: data.link,
      });
    } else {
      alert('Sharing not supported in this browser.');
    }
  };

  const handleComment = () => {
    alert('Comment functionality coming soon!');
  };
  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden">
      <Image
        src={data.image}
        alt={data.title}
        width={500}
        height={500}
        className="w-full h-48 sm:h-56 md:h-64 lg:h-48 xl:h-64 object-cover"
      />
      <div className="p-4 md:p-6">
        <span className="text-xs md:text-sm text-gray-500 uppercase">
          {data.category}
        </span>
        <h2 className="text-sm md:text-lg font-semibold text-gray-800 mt-2">
          {data.title}
        </h2>
        <p className="text-gray-600 mt-2 md:mt-3">{data.description}</p>
        <a
          href={data.link}
          className="inline-block mt-3 md:mt-4 text-purple-600 font-medium hover:underline"
        >
          Read More
        </a>
        <div className="mt-4 flex space-x-6">
          {/* Like Button */}
          <button
            onClick={toggleLike}
            className={`flex items-center space-x-2 text-sm font-medium ${isLiked ? 'text-red-600' : 'text-gray-600'
              } hover:text-red-600 focus:outline-none`}
          >
            <Heart
              className={`w-5 h-5 transition-colors ${isLiked ? 'fill-red-600 text-red-600' : 'text-gray-600'
                }`}
            />
            <span>{isLiked ? 'Liked' : 'Like'}</span>
          </button>

          {/* Comment Button */}
          <button
            onClick={handleComment}
            className="flex items-center space-x-2 text-sm font-medium text-gray-600 hover:text-blue-600 focus:outline-none"
          >
            <MessageCircle className="w-5 h-5" />
            <span>Comment</span>
          </button>

          {/* Share Button */}
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
