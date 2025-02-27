import React, { useEffect, useState } from "react";
import axios from "axios";

function Find({ searchQuery }) {
  const [results, setResults] = useState([]);

  const fetchURL = `${process.env.REACT_APP_BACKEND_URL}/`;

  const getAllDetails = () => {
    axios
      .get(fetchURL)
      .then((res) => {
        setResults(res.data.places);
      })
      .catch((err) => console.error(err));
  };

  useEffect(() => {
    getAllDetails();
  }, [searchQuery]);

  return (
    <div className="p-4">
      {results && results.length > 0 ? (
        <div className="flex flex-wrap gap-6 justify-center">
          {results
            .filter((val) => val.placeName.toLowerCase().includes(searchQuery))
            .map((val, index) => (
              <div
                key={index}
                className="flex items-center space-x-4 bg-white p-4 rounded-lg shadow-md w-full sm:w-96 hover:shadow-lg transition-shadow duration-200"
              >
                <img
                  src={val.Photo}
                  alt="food-pic"
                  className="w-24 h-24 rounded-lg object-cover"
                />
                <div className="flex-1">
                  <p className="text-lg font-semibold">{val.placeName}</p>
                  <div className="flex items-center space-x-2 mt-1">
                    <div className="flex items-center text-sm font-bold text-white bg-green-500 px-3 py-1 rounded-md">
                      {val.Rating}
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5 ml-1"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    </div>
                  </div>
                  <p className="text-sm text-gray-600 mt-1">{val.Type}</p>
                </div>
              </div>
            ))}
        </div>
      ) : (
        <p className="text-center text-gray-500">No results found</p>
      )}
    </div>
  );
}

export default Find;
