import { Card as CardType } from '@/Data/Home-Cards';
import Image from 'next/image';
import React from 'react';

const Cards: React.FC<CardType> = (data) => {
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
      </div>
    </div>
  );
};

export default Cards;
