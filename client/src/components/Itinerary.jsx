import React, { useState } from 'react';
import axios from 'axios';

const ItinerarySuggestions = () => {
  const [formData, setFormData] = useState({
    place: '',
    days: 1,
    radius: 5,
    startTime: '06:00',
    endTime: '22:00'
  });
  const [showItinerary, setShowItinerary] = useState(false);
  const [loading, setLoading] = useState(false);
  const [generatedItinerary, setGeneratedItinerary] = useState(null);
  const [error, setError] = useState(null);
  const [selectedActivity, setSelectedActivity] = useState(null);
  const [showPopup, setShowPopup] = useState(false);

  const additionalActivities = {
    restaurants: [
      {
        time: '12:30 PM',
        activity: 'Lunch at Trishna, Fort',
        type: 'Restaurant',
        minTime: '12:00',
        maxTime: '15:00',
        image: 'https://b.zmtcdn.com/data/pictures/8/37008/f9cbada8bfb7a1a55062c8864bb35056.jpg'
      },
      {
        time: '13:00 PM',
        activity: 'The Table, Colaba',
        type: 'Fine Dining',
        minTime: '12:00',
        maxTime: '23:00',
        image: 'https://b.zmtcdn.com/data/pictures/2/18617632/8ac9d16762b4908c60b508f634999bb8.jpg'
      },
      {
        time: '19:30 PM',
        activity: 'Masala Library, BKC',
        type: 'Modern Indian',
        minTime: '18:00',
        maxTime: '23:00',
        image: 'https://b.zmtcdn.com/data/pictures/4/18357374/d26796f358471800fab3ac2332d636c7.jpg'
      },
      {
        time: '20:00 PM',
        activity: 'Yauatcha, BKC',
        type: 'Asian',
        minTime: '12:00',
        maxTime: '23:00',
        image: 'https://b.zmtcdn.com/data/pictures/chains/2/18125822/4be376adb66a75764697c10b6a86c132.jpg'
      },
      {
        time: '13:30 PM',
        activity: 'Bombay Canteen, Lower Parel',
        type: 'Modern Indian',
        minTime: '12:00',
        maxTime: '23:00',
        image: 'https://b.zmtcdn.com/data/pictures/3/18168603/8e3d34b5a90f1eeb4ea5a276edb688f0.jpg'
      },
      {
        time: '19:00 PM',
        activity: 'O Pedro, BKC',
        type: 'Goan',
        minTime: '12:00',
        maxTime: '23:00',
        image: 'https://b.zmtcdn.com/data/pictures/3/18563493/58ee8f08d5e13a3c7c28add4e12b2bf7.jpg'
      },
      {
        time: '20:30 PM',
        activity: 'Smoke House Deli, BKC',
        type: 'Continental',
        minTime: '08:00',
        maxTime: '23:00',
        image: 'https://b.zmtcdn.com/data/pictures/chains/3/18033963/88827649e8c3950ea47840775027e06f.jpg'
      },
      {
        time: '13:00 PM',
        activity: 'Burma Burma, Fort',
        type: 'Burmese',
        minTime: '12:00',
        maxTime: '23:00',
        image: 'https://b.zmtcdn.com/data/pictures/chains/1/18363431/81cab239d11c646e76cc35b01b25c180.jpg'
      },
      {
        time: '19:30 PM',
        activity: 'Britannia & Co., Ballard Estate',
        type: 'Parsi',
        minTime: '11:30',
        maxTime: '16:00',
        image: 'https://b.zmtcdn.com/data/pictures/2/37212/1f8008fc1d775e3f4b5df56c4d71882d.jpg'
      },
      {
        time: '20:00 PM',
        activity: 'Taj Mahal Palace Restaurants',
        type: 'Fine Dining',
        minTime: '07:00',
        maxTime: '23:00',
        image: 'https://b.zmtcdn.com/data/pictures/chains/9/38439/cb5ad4790e2efc8f08903c42667ad703.jpg'
      }
    ],

    shopping: [
      {
        time: '11:00 AM',
        activity: 'Phoenix Palladium, Lower Parel',
        type: 'Shopping Mall',
        minTime: '10:00',
        maxTime: '22:00',
        image: 'https://content.jdmagicbox.com/comp/mumbai/w5/022pxx22.xx22.110521132455.q3w5/catalogue/phoenix-marketcity-kurla-mumbai-malls-0hyxjfa47x.jpg'
      },
      {
        time: '12:00 PM',
        activity: 'Linking Road, Bandra',
        type: 'Street Shopping',
        minTime: '10:00',
        maxTime: '21:00',
        image: 'https://media.tacdn.com/media/attractions-splice-spp-674x446/06/e6/66/58.jpg'
      },
      {
        time: '14:00 PM',
        activity: 'Fashion Street, South Mumbai',
        type: 'Street Shopping',
        minTime: '10:00',
        maxTime: '20:00',
        image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/7c/Fashion_Street%2C_Mumbai.jpg/1200px-Fashion_Street%2C_Mumbai.jpg'
      },
      {
        time: '15:00 PM',
        activity: 'Inorbit Mall, Malad',
        type: 'Shopping Mall',
        minTime: '10:00',
        maxTime: '22:00',
        image: 'https://content3.jdmagicbox.com/comp/mumbai/t5/022pxx22.xx22.180315142250.u8t5/catalogue/inorbit-mall-malad-west-mumbai-malls-2zv1g07.jpg'
      },
      {
        time: '13:00 PM',
        activity: 'R City Mall, Ghatkopar',
        type: 'Shopping Mall',
        minTime: '10:00',
        maxTime: '22:00',
        image: 'https://content.jdmagicbox.com/comp/mumbai/g6/022pxx22.xx22.121213132937.y8g6/catalogue/r-city-mall-ghatkopar-west-mumbai-malls-3e8wt.jpg'
      }
    ],

    leisure: [
      {
        time: '16:00 PM',
        activity: 'Juhu Beach',
        type: 'Beach',
        minTime: '06:00',
        maxTime: '23:00',
        image: 'https://upload.wikimedia.org/wikipedia/commons/4/4e/Juhu_Beach_Mumbai.jpg'
      },
      {
        time: '17:00 PM',
        activity: 'Bandra Worli Sea Link',
        type: 'Landmark',
        minTime: '00:00',
        maxTime: '23:59',
        image: 'https://upload.wikimedia.org/wikipedia/commons/5/5c/Bandra_Worli_Sea_Link_nocturnal.jpg'
      },
      {
        time: '09:00 AM',
        activity: 'Elephanta Caves',
        type: 'Historical',
        minTime: '09:00',
        maxTime: '17:00',
        image: 'https://upload.wikimedia.org/wikipedia/commons/3/3a/Elephanta_Caves_trimurti.jpg'
      },
      {
        time: '16:30 PM',
        activity: 'Bandstand Promenade',
        type: 'Leisure',
        minTime: '06:00',
        maxTime: '23:00',
        image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/7c/Bandra_Bandstand_joggers.jpg/1200px-Bandra_Bandstand_joggers.jpg'
      },
      {
        time: '11:00 AM',
        activity: 'Colaba Causeway',
        type: 'Shopping & Leisure',
        minTime: '10:00',
        maxTime: '22:00',
        image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/8e/Colaba_Causeway.jpg/1200px-Colaba_Causeway.jpg'
      }
    ]
  };

  const sampleItinerary = [
    {
      day: 1,
      activities: [
        {
          time: '07:30 AM',
          activity: 'Morning Walk at Beach',
          type: 'Exercise',
          minTime: '06:00',
          maxTime: '09:00',
          image: 'https://images.mid-day.com/images/images/2022/nov/JuhuBeach1_d.jpg'
        },
        {
          time: '10:00 AM',
          activity: 'Gateway of India',
          type: 'Sightseeing',
          minTime: '09:00',
          maxTime: '12:00',
          image: 'https://s7ap1.scene7.com/is/image/incredibleindia/gateway-of-india-mumbai-maharashtra-2-attr-hero?qlt=82&ts=1727355556744'
        },
        {
          time: '12:30 PM',
          activity: 'Lunch at Bastian Bandra',
          type: 'Lunch',
          minTime: '12:00',
          maxTime: '14:00',
          image: 'https://b.zmtcdn.com/data/pictures/3/18291423/6f84f25cf94d37ab56a0c386bce99bf2.jpg?fit=around|960:500&crop=960:500;*,*'
        },
        {
          time: '02:00 PM',
          activity: 'Shopping at Colaba',
          type: 'Shopping',
          minTime: '01:00',
          maxTime: '16:00',
          image: 'https://magicalmumbaitours.com/wp-content/uploads/2024/08/street.jpg'
        },
        {
          time: '04:30 PM',
          activity: 'Marine Drive',
          type: 'Leisure',
          minTime: '03:00',
          maxTime: '18:00',
          image: 'https://images.wanderon.in/blogs/new/2024/04/marine-drive-2.jpg'
        },
        {
          time: '07:00 PM',
          activity: 'Dinner at Pizza By the Bay',
          type: 'Dinner',
          minTime: '06:00',
          maxTime: '22:00',
          image: 'https://b.zmtcdn.com/data/reviews_photos/ad2/7e71ad43afb4406cae2fb8ae4613bad2_1461915342.jpg'
        },
        ...additionalActivities.restaurants.slice(0, 3),
        ...additionalActivities.shopping.slice(0, 2),
        ...additionalActivities.leisure.slice(0, 2)
      ]
    },
    {
      day: 2,
      activities: [
        ...additionalActivities.restaurants.slice(3, 6),
        ...additionalActivities.shopping.slice(2, 4),
        ...additionalActivities.leisure.slice(2, 4)
      ]
    }
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const filterActivitiesByTimeRange = (activities) => {
    const { startTime, endTime } = formData;
    return activities.filter(activity =>
      activity.minTime >= startTime &&
      activity.maxTime <= endTime
    );
  };

  // Helper function to format time from 24h to 12h with AM/PM
  const formatTimeWithAMPM = (time24h) => {
    if (!time24h) return '';

    const [hours, minutes] = time24h.split(':');
    const hoursNum = parseInt(hours, 10);
    const period = hoursNum >= 12 ? 'PM' : 'AM';
    const hours12 = hoursNum % 12 || 12; // Convert 0 to 12 for 12 AM

    return `${hours12}:${minutes} ${period}`;
  };

  // Function to handle opening the popup with activity details
  const handleActivityClick = (activity) => {
    setSelectedActivity(activity);
    setShowPopup(true);
  };

  // Function to close the popup
  const closePopup = () => {
    setShowPopup(false);
    setSelectedActivity(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      // Format the time values with AM/PM
      const formattedData = {
        ...formData,
        startTime: formatTimeWithAMPM(formData.startTime),
        endTime: formatTimeWithAMPM(formData.endTime)
      };

      // Call the Gemini API endpoint
      const response = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/api/generate-itinerary`, formattedData);

      // Set the generated itinerary
      setGeneratedItinerary(response.data);
      setShowItinerary(true);
    } catch (err) {
      console.error('Error generating itinerary:', err);
      setError(err.response?.data?.error || 'Failed to generate itinerary. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  // Activity Popup Component
  const ActivityPopup = ({ activity, onClose }) => {
    // No state variables needed since we removed the image and URL sections

    // Return null if no activity is provided
    if (!activity) return null;

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
          <div className="relative p-4 border-b border-gray-200">
            <h2 className="text-2xl font-bold pr-10">{activity.activity}</h2>
            <button
              onClick={onClose}
              className="absolute top-4 right-4 bg-gray-100 rounded-full p-2 hover:bg-gray-200 transition"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          <div className="p-6">
            <div className="flex items-center mb-4">
              <div className="bg-pink-100 text-pink-800 text-sm font-medium px-3 py-1 rounded-full mr-3">
                {activity.time}{activity.endTime ? ` - ${activity.endTime}` : ''}
              </div>
              <div className="bg-blue-100 text-blue-800 text-sm font-medium px-3 py-1 rounded-full mr-3">
                {activity.type}
              </div>
              <div className="bg-green-100 text-green-800 text-sm font-medium px-3 py-1 rounded-full">
                {activity.distance ? `${activity.distance} km from center` : `Within ${formData.radius} km`}
              </div>
            </div>

            {activity.location && (
              <div className="mb-4">
                <h3 className="text-lg font-semibold mb-1">Location</h3>
                <p className="text-gray-700">{activity.location}</p>
              </div>
            )}

            {activity.description && (
              <div className="mb-4">
                <h3 className="text-lg font-semibold mb-1">Description</h3>
                <p className="text-gray-700">{activity.description}</p>
              </div>
            )}

            {/* Google Search Link */}
            <div className="mt-6 text-center">
              <a
                href={`https://www.google.com/search?q=${encodeURIComponent(activity.activity + ' ' + (activity.location || formData.place))}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center px-4 py-2 bg-blue-600 text-white font-medium rounded-md hover:bg-blue-700 transition"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
                Search Google for more information
              </a>
            </div>

            <div className="mt-6 flex justify-end">
              <button
                onClick={onClose}
                className="px-4 py-2 bg-pink-600 text-white font-medium rounded-md hover:bg-pink-700 transition"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl">
      <h1 className="text-3xl font-bold text-center mb-8 animate-fadeIn">Itinerary Suggestions</h1>

      {/* Activity Popup */}
      {showPopup && selectedActivity && (
        <ActivityPopup activity={selectedActivity} onClose={closePopup} />
      )}

      {/* Input Form */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-8 animate-slideIn">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="space-y-2">
              <label htmlFor="place" className="block text-gray-700 font-medium">
                Destination
              </label>
              <div className="relative">
                <input
                  type="text"
                  id="place"
                  name="place"
                  value={formData.place}
                  onChange={handleChange}
                  placeholder="Enter destination"
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500"
                  required
                />
                <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                  <svg className="h-5 w-5 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                  </svg>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label htmlFor="startTime" className="block text-gray-700 font-medium">
                  Start Time
                </label>
                <input
                  type="time"
                  id="startTime"
                  name="startTime"
                  value={formData.startTime}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500"
                />

              </div>

              <div className="space-y-2">
                <label htmlFor="endTime" className="block text-gray-700 font-medium">
                  End Time
                </label>
                <input
                  type="time"
                  id="endTime"
                  name="endTime"
                  value={formData.endTime}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500"
                />

              </div>
            </div>

            <div className="space-y-2">
              <label htmlFor="radius" className="block text-gray-700 font-medium">
                Radius (km)
              </label>
              <input
                type="number"
                id="radius"
                name="radius"
                value={formData.radius}
                onChange={handleChange}
                min="1"
                max="50"
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500"
                required
              />
            </div>
          </div>

          <div className="flex justify-center">
            <button
              type="submit"
              className="px-6 py-3 bg-red-600 text-white font-medium rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 transition duration-150 transform hover:scale-105"
              disabled={loading}
            >
              {loading ? (
                <span className="flex items-center">
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Generating Itinerary...
                </span>
              ) : "Generate Itinerary"}
            </button>
          </div>
        </form>
      </div>

      {/* Results Section */}
      {showItinerary && (
        <div className="bg-white rounded-lg shadow-md p-6 mb-8 animate-slideUp">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold">Your AI-Generated Itinerary for {formData.place}</h2>
            <div className="flex space-x-3">
              <button className="px-4 py-2 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200 flex items-center transform hover:scale-105 transition">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" />
                </svg>
                Print
              </button>
              <button className="px-4 py-2 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200 flex items-center transform hover:scale-105 transition">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
                </svg>
                Share
              </button>
            </div>
          </div>

          {error && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
              <p>{error}</p>
            </div>
          )}

          {generatedItinerary && generatedItinerary.itinerary ? (
            <div className="space-y-8">
              {generatedItinerary.itinerary.map((day) => (
                <div key={day.day} className="border border-gray-200 rounded-lg overflow-hidden">
                  <div className="bg-gray-50 px-6 py-4 border-b border-gray-200">
                    <h3 className="text-xl font-semibold">Day {day.day}</h3>
                  </div>
                  <div className="divide-y divide-gray-200">
                    {day.activities.map((item, index) => (
                      <div
                        key={index}
                        className="px-6 py-4 flex items-start hover:bg-gray-50 transition duration-300 ease-in-out transform hover:scale-105 hover:shadow-lg cursor-pointer"
                        onClick={() => handleActivityClick(item)}
                      >
                        <div className="flex-shrink-0 mr-4">
                          <div className="bg-pink-100 text-pink-800 text-xs font-medium px-2.5 py-0.5 rounded-full">
                            {item.time}{item.endTime ? ` - ${item.endTime}` : ''}
                          </div>
                        </div>
                        <div className="flex-1">
                          <h4 className="text-lg font-medium">{item.activity}</h4>
                          <p className="text-gray-500">{item.type}</p>
                          {item.description && (
                            <p className="text-gray-600 mt-1 text-sm">{item.description}</p>
                          )}
                          {item.location && (
                            <p className="text-gray-500 text-sm mt-1">
                              <span className="font-medium">Location:</span> {item.location}
                            </p>
                          )}
                        </div>
                        <div className="flex-shrink-0 ml-4 flex flex-col items-end space-y-2">
                          <span className="inline-flex items-center rounded-full bg-blue-100 px-2.5 py-0.5 text-xs font-medium text-blue-800">
                            {item.distance ? `${item.distance} km` : `${Math.floor(Math.random() * formData.radius) + 1} km`}
                          </span>
                          <span className="text-xs text-gray-500 flex items-center">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            Click for details
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="space-y-8">
              {sampleItinerary.slice(0, formData.days).map((day) => (
                <div key={day.day} className="border border-gray-200 rounded-lg overflow-hidden">
                  <div className="bg-gray-50 px-6 py-4 border-b border-gray-200">
                    <h3 className="text-xl font-semibold">Day {day.day}</h3>
                  </div>
                  <div className="divide-y divide-gray-200">
                    {filterActivitiesByTimeRange(day.activities).map((item, index) => (
                      <div
                        key={index}
                        className="px-6 py-4 flex items-start hover:bg-gray-50 transition duration-300 ease-in-out transform hover:scale-105 hover:shadow-lg cursor-pointer"
                        onClick={() => handleActivityClick(item)}
                      >
                        <div className="flex-shrink-0 mr-4">
                          <div className="bg-pink-100 text-pink-800 text-xs font-medium px-2.5 py-0.5 rounded-full">
                            {item.time}
                          </div>
                        </div>
                        <div className="flex-1">
                          <h4 className="text-lg font-medium">{item.activity}</h4>
                          <p className="text-gray-500">{item.type}</p>
                        </div>
                        <div className="flex-shrink-0 ml-4 flex flex-col items-end space-y-2">
                          <span className="inline-flex items-center rounded-full bg-blue-100 px-2.5 py-0.5 text-xs font-medium text-blue-800">
                            {item.distance ? `${item.distance} km` : `${Math.floor(Math.random() * formData.radius) + 1} km`}
                          </span>
                          <span className="text-xs text-gray-500 flex items-center">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            Click for details
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Image Gallery Section */}
          <div className="mt-8">
            <h3 className="text-2xl font-bold mb-6">Destination Images</h3>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
              {(generatedItinerary && generatedItinerary.itinerary ?
                generatedItinerary.itinerary[0].activities.filter(item => item.image) :
                filterActivitiesByTimeRange(sampleItinerary[0].activities)
              ).map((item, index) => (
                <div
                  key={index}
                  className="rounded-lg overflow-hidden shadow-lg transform transition duration-300 hover:scale-105 hover:shadow-2xl cursor-pointer"
                  onClick={() => handleActivityClick(item)}
                >
                  <img
                    src={item.image || 'https://via.placeholder.com/300x200?text=No+Image'}
                    alt={item.activity}
                    className="w-full h-48 object-cover"
                    onError={(e) => {
                      e.target.src = 'https://via.placeholder.com/300x200?text=Image+Not+Found';
                    }}
                  />
                  <div className="p-4 bg-white">
                    <h4 className="font-semibold text-lg">{item.activity}</h4>
                    <div className="flex justify-between items-center mt-1">
                      <p className="text-gray-500 text-sm">{item.type}</p>
                      <span className="text-xs text-gray-500 flex items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        Details
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-8 flex justify-center">
            <button
              onClick={() => setShowItinerary(false)}
              className="px-6 py-3 bg-pink-600 text-white font-medium rounded-md hover:bg-pink-700 focus:outline-none focus:ring-2 focus:ring-pink-500 transition duration-150 transform hover:scale-105"
            >
              Customize Itinerary
            </button>
          </div>
        </div>
      )}

      {/* Travel Tips Section */}
      <div className="bg-gray-50 rounded-lg p-6 animate-fadeIn">
        <h3 className="text-xl font-semibold mb-4">Travel Tips</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white p-4 rounded-md shadow-sm transform transition hover:scale-105 hover:shadow-md">
            <div className="flex items-center mb-3">
              <div className="rounded-full bg-red-100 p-2 mr-3">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h4 className="font-medium">Best Time to Visit</h4>
            </div>
            <p className="text-gray-600 text-sm">Plan your visits to popular attractions early in the morning to avoid crowds.</p>
          </div>

          <div className="bg-white p-4 rounded-md shadow-sm transform transition hover:scale-105 hover:shadow-md">
            <div className="flex items-center mb-3">
              <div className="rounded-full bg-red-100 p-2 mr-3">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                </svg>
              </div>
              <h4 className="font-medium">Local Transportation</h4>
            </div>
            <p className="text-gray-600 text-sm">Consider getting a daily pass for public transport to save on travel costs.</p>
          </div>

          <div className="bg-white p-4 rounded-md shadow-sm transform transition hover:scale-105 hover:shadow-md">
            <div className="flex items-center mb-3">
              <div className="rounded-full bg-red-100 p-2 mr-3">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </div>
              <h4 className="font-medium">Local Customs</h4>
            </div>
            <p className="text-gray-600 text-sm">Research local customs and etiquette before your trip for a smoother experience.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ItinerarySuggestions;