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

  const filteredResults = results
    .filter((val) => val.placeName.toLowerCase().includes(searchQuery.toLowerCase()))
    .slice(0, 5); // Limit to 5 results for better UI

  return (
    <div className="p-2">
      {filteredResults.length > 0 ? (
        <div className="space-y-2">
          {filteredResults.map((val, index) => (
            <div
              key={index}
              className="flex items-center p-3 hover:bg-gray-50 rounded-md cursor-pointer transition-colors duration-150"
              onClick={() => window.location.href = `/place/${val.id || index}`}
            >
              <img
                src={val.Photo}
                alt={val.placeName}
                className="w-16 h-16 rounded-md object-cover flex-shrink-0"
                loading="lazy"
                onError={(e) => {
                  e.target.src = 'https://via.placeholder.com/64?text=No+Image';
                }}
              />
              <div className="ml-3 flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-900 truncate">{val.placeName}</p>
                <div className="flex items-center mt-1">
                  <div className="flex items-center text-xs font-medium text-white bg-green-500 px-1.5 py-0.5 rounded">
                    {val.Rating}
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-3 w-3 ml-0.5"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  </div>
                  <p className="text-xs text-gray-500 ml-2 truncate">{val.Type}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="py-3 px-4 text-center">
          <p className="text-sm text-gray-500">No results found</p>
        </div>
      )}
    </div>
  );
}

export default Find;
