import React, { useState, useEffect } from 'react';

export const useWeather = (locations) => {
  const [weatherData, setWeatherData] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchWeatherData = async () => {
      try {
        const data = await Promise.all(locations.map(async (location) => {
          const response = await fetch(`https://api.tomorrow.io/v4/timelines?timestep=1d&location=${location}&fields=temperature,rainIntensity,snowIntensity,visibility&timezone=auto&apikey=rz23zLTtA5bp70WKZiMLbYKL7XO27sBv`);
          const json = await response.json();
          
          // Extract and transform data here
          return json.data.timelines[0].intervals.map(interval => ({
            location,
            temperature: interval.values.temperature,
            rainIntensity: interval.values.rainIntensity,
            snowIntensity: interval.values.snowIntensity,
            visibility: interval.values.visibility,
          }));
        }));

        // Flatten the data array
        const flattenedData = data.flat();
        setWeatherData(flattenedData);
      } catch (err) {
        setError(err);
      }
    };

    fetchWeatherData();
  }, [locations]);

  return { weatherData, error };
};
