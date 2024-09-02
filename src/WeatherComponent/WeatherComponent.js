import React, { useEffect, useState } from 'react';
import axios from 'axios';

const WeatherComponent = () => {
  const [weatherData, setWeatherData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchWeather = async () => {
      const options = {
        method: 'GET',
        url: 'https://weatherapi-com.p.rapidapi.com/current.json',
        params: { q: '53.1,-0.13' },
        headers: {
          'x-rapidapi-key': '8664a92310mshd2d9f3b7275df93p182c5fjsnae459854c672',
          'x-rapidapi-host': 'weatherapi-com.p.rapidapi.com',
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        }
      };

      try {
        const response = await axios.request(options);
        setWeatherData(response.data);
      } catch (error) {
        setError(error.message);
      }
    };

    fetchWeather();
  }, []);

  if (error) return <div>Error: {error}</div>;

  if (!weatherData) return <div>Loading...</div>;

  return (
     
     <div className="container text-center mt-5 p-4 bg-gradient rounded shadow-lg text-white" style={{ backgroundColor: '#1E90FF' }}>
     <h2 className="text-center mb-4">
       Weather in {weatherData.location.name}, {weatherData.location.country}
     </h2>
     <p><strong>Region:</strong> {weatherData.location.region}</p>
     <p><strong>Local Time:</strong> {weatherData.location.localtime}</p>
     <h3 className="mt-4">Current Weather:</h3>
     <p><strong>Condition:</strong> {weatherData.current.condition.text}</p>
     <img src={`https:${weatherData.current.condition.icon}`} alt="weather icon" className="mb-3" />
     <p><strong>Temperature:</strong> {weatherData.current.temp_c}°C / {weatherData.current.temp_f}°F</p>
     <p><strong>Feels Like:</strong> {weatherData.current.feelslike_c}°C / {weatherData.current.feelslike_f}°F</p>
     <p><strong>Wind:</strong> {weatherData.current.wind_kph} kph ({weatherData.current.wind_mph} mph), Direction: {weatherData.current.wind_dir}</p>
     <p><strong>Humidity:</strong> {weatherData.current.humidity}%</p>
     <p><strong>Pressure:</strong> {weatherData.current.pressure_mb} mb / {weatherData.current.pressure_in} in</p>
     <p><strong>Visibility:</strong> {weatherData.current.vis_km} km / {weatherData.current.vis_miles} miles</p>
     <p><strong>UV Index:</strong> {weatherData.current.uv}</p>
     <p><strong>Cloud Cover:</strong> {weatherData.current.cloud}%</p>
     <p><strong>Gust:</strong> {weatherData.current.gust_kph} kph / {weatherData.current.gust_mph} mph</p>
   </div>
   
  );
};

export default WeatherComponent;
