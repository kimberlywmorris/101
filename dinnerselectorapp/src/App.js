import React, { useEffect } from 'react';
import './App.css';
import { AppStateProvider, useAppState } from './context/AppStateContext';
import { useGeolocation } from './hooks/useGeolocation';
import { fetchNearbyRestaurants } from './services/restaurantService';
import GeolocationPrompt from './components/GeolocationPrompt';

/**
 * Main App Component (with state context)
 */
function App() {
  return (
    <AppStateProvider>
      <AppContent />
    </AppStateProvider>
  );
}

/**
 * App Content Component (uses context)
 */
function AppContent() {
  const {
    userLocation,
    setUserLocation,
    setRestaurants,
    isLoading: isAppLoading,
    setIsLoading
  } = useAppState();

  const {
    location,
    error,
    isLoading: isGeoLoading,
    retry
  } = useGeolocation();

  // Load restaurants when location is available
  useEffect(() => {
    if (location && !userLocation) {
      setUserLocation(location);
      loadRestaurants(location);
    }
  }, [location, userLocation, setUserLocation]);

  const loadRestaurants = async (loc) => {
    setIsLoading(true);
    try {
      const data = await fetchNearbyRestaurants({
        lat: loc.lat,
        lng: loc.lng,
        radiusMeters: 16000 // 10 miles
      });
      setRestaurants(data);
    } catch (err) {
      console.error('Error loading restaurants:', err);
    } finally {
      setIsLoading(false);
    }
  };

  // Show geolocation prompt while waiting for location
  if (isGeoLoading || (isGeoLoading && !userLocation)) {
    return <GeolocationPrompt isLoading={isGeoLoading} error={error} onRetry={retry} />;
  }

  if (error) {
    return <GeolocationPrompt isLoading={false} error={error} onRetry={retry} />;
  }

  // Main app loaded
  return (
    <div className="App">
      <header className="bg-gradient-to-r from-purple-600 to-blue-600 text-white p-6 shadow-lg">
        <h1 className="text-3xl font-bold">🍽️ Family Dinner Spinner</h1>
        <p className="text-lg mt-2">Let the wheel decide where you eat!</p>
      </header>

      <main className="container mx-auto p-6">
        {isAppLoading ? (
          <div className="flex justify-center items-center min-h-64">
            <div className="animate-spin">
              <div className="w-12 h-12 border-4 border-purple-200 border-t-purple-600 rounded-full"></div>
            </div>
            <p className="ml-4 text-gray-600">Loading restaurants...</p>
          </div>
        ) : (
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">
              Ready to spin the wheel!
            </h2>
            <p className="text-gray-600">
              ✅ Location: {userLocation?.lat.toFixed(4)}, {userLocation?.lng.toFixed(4)}
            </p>
            <p className="text-gray-600 mt-2">
              More features coming in the next steps...
            </p>
          </div>
        )}
      </main>
    </div>
  );
}

export default App;
