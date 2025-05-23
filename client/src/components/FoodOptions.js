import React from 'react'
import "./FoodOptions.css";
import SideBar from './SideBar';
import { useHistory, useNavigate } from 'react-router-dom';
import mappu from '../images/maps.png'
const FoodOptions = () => {
  const navigate = useNavigate();

  const handleFeedbackClick = () => {
    navigate('/feedback');
  };
  const handleMapClick = () => {
    navigate('/maps');
  };

  const handleItineraryClick = () => {
    navigate('/itinerary');
  };
  return (
    <div className="food-options-container" >

        <div className="nav-item selected-option-border">
          <button className="bg-pink-100 hover:bg-pink-200 mx-2 sm:mx-3 md:mx-5 py-3 px-3 rounded-full">
            <img className="w-8 h-8 sm:w-10 sm:h-10 bg-pink-100 hover:bg-pink-200"
            src="https://b.zmtcdn.com/data/o2_assets/c0bb85d3a6347b2ec070a8db694588261616149578.png?output-format=webp" alt="delivery" />
          </button>
          <h1 className="mt-3.5 font-okra text-base sm:text-lg md:text-xl text-pink-600">Top Places</h1>
        </div>

        <div className="nav-item" onClick={handleItineraryClick}>
        <button className="bg-gray-50 hover:bg-pink-100 mx-2 sm:mx-3 md:mx-5 py-3 px-3 rounded-full">
          <img
            className="w-8 h-8 sm:w-10 sm:h-10 bg-gray-100 hover:bg-pink-100"
            src="https://b.zmtcdn.com/data/o2_assets/78d25215ff4c1299578ed36eefd5f39d1616149985.png?output-format=webp"
            alt="dining out"
          />
        </button>
        <h1 className="mt-3.5 font-okra text-base sm:text-lg md:text-xl text-gray-500">Itinerary</h1>
        </div>

        <div className="nav-item" onClick={handleMapClick}>
          <button className="bg-gray-50 hover:bg-pink-100 mx-2 sm:mx-3 md:mx-5 py-3 px-3 rounded-full">
            <img className="w-8 h-8 sm:w-10 sm:h-10 bg-gray-100 hover:bg-pink-100"
            src={mappu} alt="maps" />
          </button>
          <h1 className="mt-3.5 font-okra text-base sm:text-lg md:text-xl text-gray-500">Maps</h1>
        </div>

        <div className="nav-item" onClick={handleFeedbackClick}>
          <button className="bg-gray-50 hover:bg-pink-100 mx-2 sm:mx-3 md:mx-5 py-3 px-3 rounded-full">
            <img
              className="w-8 h-8 sm:w-10 sm:h-10 bg-gray-100 hover:bg-pink-100"
                src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAYAAABXAvmHAAAACXBIWXMAAAsTAAALEwEAmpwYAAABYklEQVR4nO2YMUoDQRSGP4Us5gSeQkHQmxgPYKMXUKyCASsRxNqk05O4lZW1LihqaaOdZGFlYYrhgZPJOk93zfvgVcn88yYzO/sRMAwjlj4wAgqgBKqIegd2Rc4G8Ow+L13esctXow7PI5uWdSuyTr/5Xg6saC1g1LD5WTtQiRpqLaDwJjkAeolye8Chl32PEv6ZzxJnZ152PU9ylsU2a1Bp5dfNj73wTzq2gEsRfpF6AhSP0LZofuJ2JHXzR1oP8VnDq/MnNUy5gJ1fbv4m9Ytsyf0ib4pNl8CDm0ftLWz8JzutIo5U0XY7ja28jXb6p9eqj9lpgEw8E8npvJ1Oumyn4y7b6WAR7HQKXItxW8BrG67RwRwTr3rjzrtkp1PgSozbBF4imy7NTheZvtkpZqeNMTsNYHYawuw0ArNTzf9On4B1kbsPfLTNTkN1InLv2mSns+oRWBO5e94OmJ0aBmG+AI7jId3IpAQ1AAAAAElFTkSuQmCC"
                alt="feedback"
              />
          </button>
          <h1 className="mt-3.5 font-okra text-base sm:text-lg md:text-xl text-gray-500">Feedback</h1>
        </div>
      </div>
  );
};

export default FoodOptions;