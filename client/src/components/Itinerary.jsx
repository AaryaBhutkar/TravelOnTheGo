import React, { useState } from 'react';

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

  // Sample itinerary data with image URLs
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
        }
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

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    
    // Simulate API call/processing time
    setTimeout(() => {
      setShowItinerary(true);
      setLoading(false);
    }, 1500);
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl">
      <h1 className="text-3xl font-bold text-center mb-8 animate-fadeIn">Itinerary Suggestions</h1>
      
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
            <h2 className="text-2xl font-bold">Your Itinerary for {formData.place}</h2>
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
                      className="px-6 py-4 flex items-start hover:bg-gray-50 transition duration-300 ease-in-out transform hover:scale-105 hover:shadow-lg"
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
                      <div className="flex-shrink-0 ml-4">
                        <span className="inline-flex items-center rounded-full bg-blue-100 px-2.5 py-0.5 text-xs font-medium text-blue-800">
                          {Math.floor(Math.random() * formData.radius) + 1} km
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Image Gallery Section */}
          <div className="mt-8">
            <h3 className="text-2xl font-bold mb-6">Destination Images</h3>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
              {filterActivitiesByTimeRange(sampleItinerary[0].activities).map((item, index) => (
                <div 
                  key={index} 
                  className="rounded-lg overflow-hidden shadow-lg transform transition duration-300 hover:scale-105 hover:shadow-2xl"
                >
                  <img 
                    src={item.image} 
                    alt={item.activity} 
                    className="w-full h-48 object-cover"
                  />
                  <div className="p-4 bg-white">
                    <h4 className="font-semibold text-lg">{item.activity}</h4>
                    <p className="text-gray-500 text-sm">{item.type}</p>
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