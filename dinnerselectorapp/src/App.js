import React, { useEffect, useState } from 'react';
import './App.css';
import { AppStateProvider, useAppState } from './context/AppStateContext';
import { useGeolocation } from './hooks/useGeolocation';
import { fetchNearbyRestaurants } from './services/restaurantService';
import GeolocationPrompt from './components/GeolocationPrompt';
import FiltersPanel from './components/FiltersPanel';
import RestaurantList from './components/RestaurantList';
import Wheel from './components/Wheel';
import ResultPanel from './components/ResultPanel';
import HistoryPanel from './components/HistoryPanel';
import PreferencesPanel from './components/PreferencesPanel';
import LoadingSpinner from './components/LoadingSpinner';

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
    restaurants,
    setRestaurants,
    filters,
    preferences,
    selectedRestaurant,
    setSelectedRestaurant,
    isSpinning,
    setIsSpinning,
    addHistoryEntry,
    isLoading: isAppLoading,
    setIsLoading
  } = useAppState();

  const [layout, setLayout] = useState('default'); // 'default', 'preferences', 'history'

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

  // Reload restaurants when filters change
  useEffect(() => {
    if (userLocation && restaurants.length > 0) {
      console.log('Filters updated:', filters);
    }
  }, [filters, userLocation, restaurants.length]);

  const loadRestaurants = async (loc) => {
    setIsLoading(true);
    try {
      const data = await fetchNearbyRestaurants({
        lat: loc.lat,
        lng: loc.lng,
        radiusMeters: 16000
      });
      setRestaurants(data);
    } catch (err) {
      console.error('Error loading restaurants:', err);
    } finally {
      setIsLoading(false);
    }
  };

  // Apply all filters to restaurants
  const applyFilters = (rests) => {
    return rests.filter(rest => {
      // Exclude NO_GO restaurants
      if (preferences[rest.id] === 'NO_GO') {
        return false;
      }

      // Filter by open now
      if (filters.openNow && !rest.isOpenNow) {
        return false;
      }

      // Filter by cuisines (if selected, only show matching cuisines)
      if (filters.cuisines.length > 0) {
        const hasMatchingCuisine = rest.cuisineTypes.some(cuisine =>
          filters.cuisines.includes(cuisine)
        );
        if (!hasMatchingCuisine) return false;
      }

      // Filter by price levels (if selected, only show matching levels)
      if (filters.priceLevels.length > 0) {
        if (!filters.priceLevels.includes(rest.priceLevel)) {
          return false;
        }
      }

      // Filter by radius (distance from user)
      if (rest.distanceMeters > filters.radiusMeters) {
        return false;
      }

      return true;
    });
  };

  // Get eligible restaurants (with all filters applied)
  const getEligibleRestaurants = () => {
    return applyFilters(restaurants);
  };

  const handleSpinComplete = (randomIndex) => {
    const eligibleRests = getEligibleRestaurants();
    if (eligibleRests[randomIndex]) {
      const selected = eligibleRests[randomIndex];
      setSelectedRestaurant(selected);
      addHistoryEntry(selected.id, selected.name);
    }
    setIsSpinning(false);
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
    <div className="App min-h-screen bg-gray-50">
      <header className="bg-gradient-to-r from-purple-600 to-blue-600 text-white p-4 sm:p-6 shadow-lg">
        <h1 className="text-2xl sm:text-3xl font-bold">🍽️ Family Dinner Spinner</h1>
        <p className="text-sm sm:text-lg mt-2">Let the wheel decide where you eat!</p>
        {userLocation && (
          <p className="text-xs sm:text-sm mt-2 opacity-90">
            📍 {userLocation.lat.toFixed(4)}, {userLocation.lng.toFixed(4)}
          </p>
        )}
      </header>

      <main className="container mx-auto p-4 sm:p-6 max-w-7xl">
        {isAppLoading ? (
          <div className="flex justify-center items-center min-h-96">
            <LoadingSpinner size="lg" message="Loading restaurants..." />
          </div>
        ) : layout === 'default' ? (
          <>
            {/* Main Spinning View */}
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 sm:gap-6 mb-6 sm:mb-8">
              {/* Left Sidebar: Filters */}
              <div className="lg:col-span-1">
                <div className="sticky top-4 sm:top-6 space-y-4 sm:space-y-6">
                  <FiltersPanel />
                  <RestaurantList />
                </div>
              </div>

              {/* Center: Wheel */}
              <div className="lg:col-span-2">
                <div className="bg-white rounded-lg shadow-lg p-6 sm:p-8 flex items-center justify-center min-h-96">
                  <Wheel
                    restaurants={getEligibleRestaurants()}
                    onSpinComplete={handleSpinComplete}
                    isSpinning={isSpinning}
                  />
                </div>
              </div>

              {/* Right: Result Panel */}
              <div className="lg:col-span-1">
                <div className="sticky top-4 sm:top-6">
                  <ResultPanel restaurant={selectedRestaurant} />
                </div>
              </div>
            </div>

            {/* Bottom: History & Preferences Panels */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
              <HistoryPanel />
              <PreferencesPanel />
            </div>
          </>
        ) : layout === 'preferences' ? (
          <div className="grid grid-cols-1 gap-6">
            <PreferencesPanel />
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-6">
            <HistoryPanel />
          </div>
        )}
      </main>
    </div>
  );
}

export default App;
