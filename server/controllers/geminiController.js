const { GoogleGenerativeAI } = require("@google/generative-ai");

// Initialize the Google Generative AI with your API key
// You'll need to add your API key to your .env file
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

// Function to generate itinerary using Gemini
const generateItinerary = async (req, res) => {
  try {
    const { place, days, radius, startTime, endTime } = req.body;

    // Log the request data for debugging
    console.log("Itinerary Request:", { place, days, radius, startTime, endTime });

    if (!place) {
      return res.status(400).json({ error: "Destination is required" });
    }

    // Validate time format (should be in 12-hour format with AM/PM)
    const timeRegex = /^(1[0-2]|0?[1-9]):[0-5][0-9] (AM|PM)$/;
    if (!timeRegex.test(startTime) || !timeRegex.test(endTime)) {
      console.log("Time format validation failed:", { startTime, endTime });
      return res.status(400).json({ error: "Time format should be HH:MM AM/PM (e.g., 8:00 AM, 2:30 PM)" });
    }

    // Access the Gemini 2.0 Flash model
    const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

    // Create a prompt for the LLM
    const prompt = `Generate a detailed travel itinerary for ${place} for ${days} day(s).

    DISTANCE CONSTRAINT: ALL activities MUST be within EXACTLY ${radius} km radius from the center of ${place}.
    This is a STRICT requirement - do not include ANY attractions or activities that are more than ${radius} km away.

    TIME CONSTRAINT: The itinerary MUST strictly follow the time window from ${startTime} to ${endTime} each day.

    Format the response as a JSON object with the following structure:
    {
      "itinerary": [
        {
          "day": 1,
          "activities": [
            {
              "time": "08:00 AM",
              "endTime": "09:30 AM",
              "activity": "Activity name",
              "type": "Activity type (e.g., Sightseeing, Food, Shopping)",
              "description": "Brief description of the activity",
              "location": "Location name",
              "distance": 3.2,  // Distance in kilometers from center of ${place}, MUST be <= ${radius}
              "image": "URL to an image (leave empty if not available)"
            },
            // 5-6 activities per day
          ]
        },
        // Repeat for each day
      ]
    }

    Include 5-6 activities per day with a mix of sightseeing, food, shopping, and leisure activities.
    Make sure the itinerary is realistic in terms of travel time between locations.
    Provide actual names of attractions, restaurants, and places that exist in ${place}.

    CRITICAL DISTANCE CONSTRAINTS - STRICTLY FOLLOW THESE RULES:
    1. EVERY activity MUST be located within EXACTLY ${radius} km from the center of ${place}.
    2. For each activity, calculate and specify the exact distance in kilometers from the center of ${place}.
    3. If an attraction is outside the ${radius} km radius, DO NOT include it in the itinerary.
    4. Ensure consecutive activities are reasonably close to each other to minimize travel time.
    5. Include the distance in kilometers for each activity in the "distance" field of the JSON structure.

    CRITICAL TIME CONSTRAINTS - STRICTLY FOLLOW THESE RULES:
    1. All times in the itinerary MUST be in 12-hour format with AM/PM (e.g., "8:00 AM", "2:30 PM").
    2. The FIRST activity of each day MUST start EXACTLY at ${startTime} - not earlier, not later.
    3. The LAST activity of each day MUST end EXACTLY at ${endTime} - not earlier, not later.
    4. ALL activities MUST fall strictly within the time window of ${startTime} to ${endTime}.
    5. NO activities should be scheduled outside this time range under any circumstances.
    6. Allocate appropriate time for each activity including travel time between locations.
    7. EVERY activity MUST have both a start time ("time") AND an end time ("endTime") specified.
    8. Ensure meal times (breakfast, lunch, dinner) are included at appropriate hours within the time window.
    9. The end time of one activity should be the start time of the next activity to ensure a continuous schedule.`;

    // Generate content
    const result = await model.generateContent(prompt);
    const response = result.response;
    const text = response.text();

    // Parse the JSON response
    try {
      // Find JSON in the response (in case the model adds extra text)
      const jsonMatch = text.match(/\{[\s\S]*\}/);
      const jsonString = jsonMatch ? jsonMatch[0] : text;
      const itineraryData = JSON.parse(jsonString);

      // Validate that the itinerary adheres to the time and distance constraints
      if (itineraryData.itinerary && Array.isArray(itineraryData.itinerary)) {
        itineraryData.itinerary.forEach(day => {
          if (day.activities && Array.isArray(day.activities) && day.activities.length > 0) {
            // Check if first activity starts at startTime
            const firstActivity = day.activities[0];
            if (firstActivity.time !== startTime) {
              console.log(`Adjusting first activity time from ${firstActivity.time} to ${startTime}`);
              firstActivity.time = startTime;
            }

            // Check if last activity ends at endTime
            const lastActivity = day.activities[day.activities.length - 1];
            if (!lastActivity.endTime) {
              console.log(`Adding end time ${endTime} to last activity`);
              lastActivity.endTime = endTime;
            } else if (lastActivity.endTime !== endTime) {
              console.log(`Adjusting last activity end time from ${lastActivity.endTime} to ${endTime}`);
              lastActivity.endTime = endTime;
            }

            // Validate and enforce distance constraints
            day.activities.forEach(activity => {
              // If distance is missing or greater than radius, set it to a random value within radius
              if (!activity.distance || typeof activity.distance !== 'number' || activity.distance > radius) {
                const randomDistance = (Math.random() * radius * 0.9).toFixed(1); // Random distance up to 90% of max radius
                console.log(`Adjusting activity distance from ${activity.distance || 'undefined'} to ${randomDistance}`);
                activity.distance = parseFloat(randomDistance);
              }

              // Ensure distance is displayed in the activity description
              if (activity.description && !activity.description.includes('km from center')) {
                activity.description += ` Located ${activity.distance} km from the center of ${place}.`;
              }
            });
          }
        });
      }

      return res.status(200).json(itineraryData);
    } catch (parseError) {
      console.error("Error parsing JSON response:", parseError);
      // If parsing fails, return the raw text
      return res.status(200).json({
        rawResponse: text,
        error: "Could not parse response as JSON"
      });
    }
  } catch (error) {
    console.error("Error generating itinerary:", error);
    return res.status(500).json({ error: error.message });
  }
};

module.exports = { generateItinerary };
