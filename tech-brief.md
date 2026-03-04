# Open-Meteo Weather Widget: Technical Brief

## Overview

This document outlines the implementation of a weather widget for a static HTML/CSS website hosted on Vercel, using the Open-Meteo API as the data source.

---

## Why Open-Meteo?

| Advantage | Description |
|-----------|-------------|
| **No API Key** | No registration or authentication required |
| **Generous Limits** | Unlimited calls for non-commercial use |
| **Fast & Reliable** | Open-source, well-maintained infrastructure |
| **Rich Data** | Current conditions, hourly, and 7-day forecasts |
| **No CORS Issues** | Works directly from client-side JavaScript |

---

## API Overview

### Base URL
```
https://api.open-meteo.com/v1/forecast
```

### Key Parameters

| Parameter | Description | Example |
|-----------|-------------|---------|
| `latitude` | Location latitude | `47.6062` |
| `longitude` | Location longitude | `-122.3321` |
| `current` | Current weather variables | `temperature_2m,weather_code` |
| `daily` | Daily forecast variables | `temperature_2m_max,temperature_2m_min` |
| `temperature_unit` | Fahrenheit or Celsius | `fahrenheit` |
| `timezone` | Timezone for times | `auto` |

### Example Request
```
https://api.open-meteo.com/v1/forecast?latitude=47.6062&longitude=-122.3321&current=temperature_2m,relative_humidity_2m,weather_code&daily=temperature_2m_max,temperature_2m_min&temperature_unit=fahrenheit&timezone=auto
```

### Example Response (Simplified)
```json
{
  "current": {
    "temperature_2m": 52.3,
    "relative_humidity_2m": 78,
    "weather_code": 3
  },
  "daily": {
    "temperature_2m_max": [58.1, 61.2, 55.8],
    "temperature_2m_min": [45.2, 47.8, 44.1]
  }
}
```

### Weather Codes
Open-Meteo uses WMO weather codes. Key codes include:

| Code | Condition |
|------|-----------|
| 0 | Clear sky |
| 1, 2, 3 | Partly cloudy |
| 45, 48 | Fog |
| 51, 53, 55 | Drizzle |
| 61, 63, 65 | Rain |
| 71, 73, 75 | Snow |
| 95, 96, 99 | Thunderstorm |

---

## Architecture

```
┌─────────────────┐      ┌─────────────────┐
│                 │      │                 │
│  User Browser   │─────▶│  Open-Meteo API │
│                 │◀─────│                 │
└─────────────────┘      └─────────────────┘
        │
        ▼
┌─────────────────┐
│  Weather Widget │
│  (HTML/CSS/JS)  │
└─────────────────┘
```

Since this is a static site with client-side JavaScript, the browser makes requests directly to Open-Meteo. No backend or serverless functions are needed.

---

## Feature Scope

### MVP (Minimum Viable Product)
- Display current temperature
- Show weather condition with icon
- Hardcoded location (city of your choice)

### Phase 2 Enhancements
- High/low temperatures for the day
- Humidity and wind speed
- User geolocation detection

### Phase 3 Enhancements
- 5-day forecast
- Toggle between Fahrenheit/Celsius
- Multiple saved locations

---

## File Structure

```
your-website/
├── index.html
├── css/
│   └── style.css (existing)
│   └── weather.css (new)
└── js/
    └── weather.js (new)
```

---

# Implementation Plan

## Phase 1: MVP

### Step 1: Set Up File Structure
**Time estimate:** 5 minutes

1. Create a `js` folder in your project root (if it doesn't exist)
2. Create an empty `weather.js` file inside the `js` folder
3. Create a `weather.css` file in your `css` folder (or add to existing stylesheet)

---

### Step 2: Add HTML Structure
**Time estimate:** 5 minutes

Add the widget container to your `index.html` where you want the weather to appear:

```html
<!-- Weather Widget -->
<div class="weather-widget" id="weather-widget">
  <div class="weather-loading">Loading weather...</div>
</div>

<!-- Add before closing </body> tag -->
<script src="js/weather.js"></script>
```

---

### Step 3: Create the JavaScript
**Time estimate:** 20 minutes

Create `js/weather.js` with the following functionality:

```javascript
// Configuration
const CONFIG = {
  latitude: 47.6062,    // Replace with your city
  longitude: -122.3321, // Replace with your city
  cityName: 'Seattle',  // Replace with your city
  units: 'fahrenheit'   // or 'celsius'
};

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
  const data = await fetchWeather();
  renderWeather(data);
}

// Run on page load
initWeather();
```

---

### Step 4: Add CSS Styling
**Time estimate:** 15 minutes

Add to your stylesheet or create `css/weather.css`:

```css
.weather-widget {
  background: linear-gradient(135deg, #4facfe 0%, #00f2fe 100%);
  border-radius: 12px;
  padding: 20px;
  color: white;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  max-width: 280px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
}

.weather-content {
  display: flex;
  align-items: center;
  gap: 15px;
}

.weather-icon {
  font-size: 3rem;
}

.weather-location {
  font-size: 0.9rem;
  opacity: 0.9;
  margin-bottom: 2px;
}

.weather-temp {
  font-size: 2.5rem;
  font-weight: 600;
  line-height: 1;
}

.weather-condition {
  font-size: 0.95rem;
  margin-top: 4px;
}

.weather-details {
  font-size: 0.85rem;
  opacity: 0.9;
  margin-top: 6px;
}

.weather-loading,
.weather-error {
  text-align: center;
  padding: 20px;
}

.weather-error {
  background: #ff6b6b;
}
```

If you created a separate file, link it in your HTML `<head>`:

```html
<link rel="stylesheet" href="css/weather.css">
```

---

### Step 5: Find Your Coordinates
**Time estimate:** 5 minutes

1. Go to [Google Maps](https://maps.google.com)
2. Search for your desired city
3. Right-click on the location and click the coordinates to copy them
4. Update `CONFIG.latitude` and `CONFIG.longitude` in `weather.js`

---

### Step 6: Test Locally
**Time estimate:** 5 minutes

1. Open your `index.html` in a browser
2. Verify the widget loads and displays weather
3. Check browser console (F12) for any errors

---

### Step 7: Deploy to Vercel
**Time estimate:** 5 minutes

1. Commit your changes to git
2. Push to your repository
3. Vercel will automatically deploy
4. Verify on your live site

---

## Testing Checklist

- [ ] Widget displays current temperature
- [ ] Weather icon matches conditions
- [ ] High/low temperatures display correctly
- [ ] Loading state appears briefly
- [ ] Error state displays if API fails (test by changing URL)
- [ ] Widget is responsive on mobile

---

## Total Estimated Time

| Phase | Time |
|-------|------|
| Setup | 10 min |
| JavaScript | 20 min |
| CSS | 15 min |
| Testing & Deploy | 10 min |
| **Total** | **~55 minutes** |

---

## Future Enhancements (Phase 2+)

Once MVP is working, consider adding:

1. **Geolocation** - Detect user's location automatically
2. **Caching** - Store data in localStorage to reduce API calls
3. **Auto-refresh** - Update weather every 30 minutes
4. **Extended forecast** - Show 5-day outlook
5. **Unit toggle** - Let users switch °F/°C

---

Let me know when you're ready to start implementing, or if you'd like me to elaborate on any section!