// ./src/components/Card.js
import React from "react";

const Card = ({ image, category, title, description, link }) => {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition duration-300">
      <img src={image} alt="Card Image" className="w-full h-48 object-cover" />
      <div className="p-6">
        <p className="text-sm text-gray-500 uppercase font-semibold">{category}</p>
        <h3 className="text-lg font-bold mt-2 text-gray-800">{title}</h3>
        <p className="text-gray-600 mt-2 text-sm">{description}</p>
        <a href={link} className="text-purple-600 font-semibold mt-4 block hover:underline">
          Read More...
        </a>
      </div>
    </div>
  );
};

export default Card;
