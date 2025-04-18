import React from "react";
import { motion } from "framer-motion";

const CustomPopUp = ({ imageSrc, imageAlt, title, address }) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.2 }}
      className="relative bg-white/60 backdrop-blur-lg shadow-xl rounded-lg p-3 max-w-xs border border-gray-300"
    >
      {/* Title */}
      <h1 className="text-lg font-semibold text-gray-900 text-center">{title}</h1>

      {/* Image Container with Overlay */}
      <div className="relative mt-2 overflow-hidden rounded-lg">
        <motion.img
          src={imageSrc}
          alt={imageAlt}
          className="w-full h-40 object-cover transition-transform duration-300 transform hover:scale-105 rounded-lg"
          whileHover={{ scale: 1.05 }}
          transition={{ duration: 0.2 }}
        />
        <motion.div
          className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent rounded-lg"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        />
      </div>

      {/* Address */}
      <h2 className="text-gray-700 text-center mt-2 text-xs font-medium px-2">
        📍 {address}
      </h2>
    </motion.div>
  );
};

export default CustomPopUp;
