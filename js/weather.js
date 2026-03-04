// Configuration
const DEFAULT_CONFIG = {
  latitude: 33.7490,    // Fallback: Atlanta
  longitude: -84.3880,  // Fallback: Atlanta
  cityName: 'Atlanta',  // Fallback: Atlanta
  units: 'fahrenheit'   // or 'celsius'
};

let CONFIG = { ...DEFAULT_CONFIG };

// Get city and state from coordinates using Nominatim API
async function getCityName(latitude, longitude) {
  try {
    const response = await fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`);
    const data = await response.json();
    
    // Try to find the best city/location name from various address fields
    const address = data.address || {};
    const city = address.city || 
                 address.town || 
                 address.village || 
                 address.suburb || 
                 address.county ||
                 address.district ||
                 'Unknown';
    
    const state = address.state || '';
    
    return state ? `${city}, ${state}` : city;
  } catch (error) {
    console.log('Reverse geocoding failed, using coordinates');
    return `${latitude.toFixed(2)}°N, ${Math.abs(longitude).toFixed(2)}°W`;
  }
}

// Get user's location using Geolocation API
function getUserLocation() {
  return new Promise((resolve) => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const { latitude, longitude } = position.coords;
          CONFIG.latitude = latitude;
          CONFIG.longitude = longitude;
          CONFIG.cityName = await getCityName(latitude, longitude);
          resolve();
        },
        (error) => {
          console.log('Geolocation denied or unavailable, using fallback location');
          resolve(); // Use default config
        }
      );
    } else {
      console.log('Geolocation not supported, using fallback location');
      resolve(); // Use default config
    }
  });
}

// Get weather condition from code

// Weather code to description/icon mapping
const WEATHER_CONDITIONS = {
  0: { description: 'Clear sky', icon: '☀️' },
  1: { description: 'Mainly clear', icon: '🌤️' },
  2: { description: 'Partly cloudy', icon: '⛅' },
  3: { description: 'Overcast', icon: '☁️' },
  45: { description: 'Foggy', icon: '🌫️' },
  48: { description: 'Foggy', icon: '🌫️' },
  51: { description: 'Light drizzle', icon: '🌧️' },
  53: { description: 'Drizzle', icon: '🌧️' },
  55: { description: 'Heavy drizzle', icon: '🌧️' },
  61: { description: 'Light rain', icon: '🌧️' },
  63: { description: 'Rain', icon: '🌧️' },
  65: { description: 'Heavy rain', icon: '🌧️' },
  71: { description: 'Light snow', icon: '🌨️' },
  73: { description: 'Snow', icon: '🌨️' },
  75: { description: 'Heavy snow', icon: '❄️' },
  77: { description: 'Snow grains', icon: '🌨️' },
  80: { description: 'Light showers', icon: '🌦️' },
  81: { description: 'Showers', icon: '🌦️' },
  82: { description: 'Heavy showers', icon: '🌧️' },
  85: { description: 'Snow showers', icon: '🌨️' },
  86: { description: 'Heavy snow showers', icon: '🌨️' },
  95: { description: 'Thunderstorm', icon: '⛈️' },
  96: { description: 'Thunderstorm with hail', icon: '⛈️' },
  99: { description: 'Thunderstorm with hail', icon: '⛈️' }
};

// Get weather condition from code
function getWeatherCondition(code) {
  return WEATHER_CONDITIONS[code] || { description: 'Unknown', icon: '❓' };
}

// Fetch weather data from Open-Meteo
async function fetchWeather() {
  const url = `https://api.open-meteo.com/v1/forecast?latitude=${CONFIG.latitude}&longitude=${CONFIG.longitude}&current=temperature_2m,relative_humidity_2m,weather_code,wind_speed_10m&daily=temperature_2m_max,temperature_2m_min&temperature_unit=${CONFIG.units}&timezone=auto`;

  try {
    const response = await fetch(url);
    
    if (!response.ok) {
      throw new Error('Weather data unavailable');
    }
    
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching weather:', error);
    return null;
  }
}

// Render the widget
function renderWeather(data) {
  const widget = document.getElementById('weather-widget');
  
  if (!data) {
    widget.innerHTML = `
      <div class="weather-error">
        Unable to load weather data
      </div>
    `;
    return;
  }

  const condition = getWeatherCondition(data.current.weather_code);
  const unitSymbol = CONFIG.units === 'fahrenheit' ? '°F' : '°C';

  widget.innerHTML = `
    <div class="weather-content">
      <div class="weather-icon">${condition.icon}</div>
      <div class="weather-info">
        <div class="weather-location">${CONFIG.cityName}</div>
        <div class="weather-temp">${Math.round(data.current.temperature_2m)}${unitSymbol}</div>
        <div class="weather-condition">${condition.description}</div>
        <div class="weather-details">
          <span>H: ${Math.round(data.daily.temperature_2m_max[0])}° </span>
          <span>L: ${Math.round(data.daily.temperature_2m_min[0])}°</span>
        </div>
      </div>
    </div>
  `;
}

// Initialize
async function initWeather() {
  await getUserLocation();
  const data = await fetchWeather();
  renderWeather(data);
}

// Run on page load
initWeather();
