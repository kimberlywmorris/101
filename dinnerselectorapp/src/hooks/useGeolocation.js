/**
 * Custom hook for geolocation
 * Handles requesting user location and error states
 */

import { useState, useEffect } from 'react';

export const useGeolocation = () => {
  const [location, setLocation] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!navigator.geolocation) {
      setError('Geolocation is not supported by your browser');
      setIsLoading(false);
      return;
    }

    // Request user's location
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        setLocation({ lat: latitude, lng: longitude });
        setError(null);
        setIsLoading(false);
      },
      (err) => {
        let errorMessage = 'Unable to get your location';
        
        if (err.code === err.PERMISSION_DENIED) {
          errorMessage = 'Location permission denied. Please enable location access in your browser settings.';
        } else if (err.code === err.POSITION_UNAVAILABLE) {
          errorMessage = 'Location information is unavailable.';
        } else if (err.code === err.TIMEOUT) {
          errorMessage = 'Location request timed out.';
        }
        
        setError(errorMessage);
        setIsLoading(false);
      },
      {
        timeout: 10000,
        enableHighAccuracy: false
      }
    );
  }, []);

  const retry = () => {
    setIsLoading(true);
    setError(null);
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setLocation({ lat: latitude, lng: longitude });
          setError(null);
          setIsLoading(false);
        },
        (err) => {
          setError('Failed to get location. Please try again.');
          setIsLoading(false);
        },
        { timeout: 10000, enableHighAccuracy: false }
      );
    }
  };

  return { location, error, isLoading, retry };
};
