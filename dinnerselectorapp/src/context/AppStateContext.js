/**
 * Global app state context
 * Manages: restaurants, filters, preferences, history, selected restaurant
 */

import React, { createContext, useState, useCallback } from 'react';

/**
 * Simple UUID-like ID generator
 */
const generateId = () => {
  return Date.now().toString(36) + Math.random().toString(36).substr(2);
};

export const AppStateContext = createContext();

export const AppStateProvider = ({ children }) => {
  const [userLocation, setUserLocation] = useState(null);
  const [restaurants, setRestaurants] = useState([]);
  const [filters, setFilters] = useState({
    radiusMeters: 16000, // 10 miles
    cuisines: [],
    priceLevels: [],
    openNow: true
  });
  const [preferences, setPreferences] = useState({}); // { restaurantId: 'FAVORITE' | 'NO_GO' }
  const [history, setHistory] = useState([]);
  const [selectedRestaurant, setSelectedRestaurant] = useState(null);
  const [isSpinning, setIsSpinning] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // Update filters
  const updateFilters = useCallback((newFilters) => {
    setFilters(prev => ({ ...prev, ...newFilters }));
  }, []);

  // Update a single preference
  const setPreference = useCallback((restaurantId, status) => {
    setPreferences(prev => ({
      ...prev,
      [restaurantId]: status
    }));
  }, []);

  // Remove a preference
  const clearPreference = useCallback((restaurantId) => {
    setPreferences(prev => {
      const updated = { ...prev };
      delete updated[restaurantId];
      return updated;
    });
  }, []);

  // Get preference for a restaurant
  const getPreference = useCallback((restaurantId) => {
    return preferences[restaurantId];
  }, [preferences]);

  // Add entry to history
  const addHistoryEntry = useCallback((restaurantId, restaurantName) => {
    const entry = {
      id: generateId(),
      timestamp: Date.now(),
      restaurantId,
      restaurantName,
      filtersSnapshot: { ...filters }
    };
    setHistory(prev => [entry, ...prev]); // Add to beginning
  }, [filters]);

  // Get eligible restaurants (excluding NO_GO)
  const getEligibleRestaurants = useCallback(() => {
    return restaurants.filter(rest => {
      const pref = preferences[rest.id];
      return pref !== 'NO_GO'; // Exclude no-go restaurants
    });
  }, [restaurants, preferences]);

  const value = {
    // State
    userLocation,
    setUserLocation,
    restaurants,
    setRestaurants,
    filters,
    updateFilters,
    preferences,
    setPreference,
    clearPreference,
    getPreference,
    history,
    addHistoryEntry,
    selectedRestaurant,
    setSelectedRestaurant,
    isSpinning,
    setIsSpinning,
    isLoading,
    setIsLoading,
    
    // Computed
    getEligibleRestaurants
  };

  return (
    <AppStateContext.Provider value={value}>
      {children}
    </AppStateContext.Provider>
  );
};

// Hook to use the context
export const useAppState = () => {
  const context = React.useContext(AppStateContext);
  if (!context) {
    throw new Error('useAppState must be used within AppStateProvider');
  }
  return context;
};
