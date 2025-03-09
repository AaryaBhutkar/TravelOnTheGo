import React from "react";

const CustomPopUp = ({ imageSrc, imageAlt, title, address }) => {
  return (
    <div className="relative bg-white/60 backdrop-blur-lg shadow-xl rounded-lg p-3 max-w-xs border border-gray-300">
      {/* Title */}
      <h1 className="text-lg font-semibold text-gray-900 text-center">{title}</h1>

      {/* Image Container with Overlay */}
      <div className="relative mt-2 overflow-hidden rounded-lg">
        <img 
          src={imageSrc} 
          alt={imageAlt} 
          className="w-full h-40 object-cover transition-transform duration-300 transform hover:scale-105 rounded-lg"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent rounded-lg"></div>
      </div>

      {/* Address */}
      <h2 className="text-gray-700 text-center mt-2 text-xs font-medium px-2">
        📍 {address}
      </h2>
    </div>
  );
};

export default CustomPopUp;
