/**
 * Initial UI showing geolocation prompt and loading state
 */

import React, { useState } from 'react';

export const GeolocationPrompt = ({ isLoading, error, onRetry, onAddressSubmit }) => {
  const [address, setAddress] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [addressError, setAddressError] = useState('');

  const handleAddressSubmit = async (e) => {
    e.preventDefault();
    if (!address.trim()) {
      setAddressError('Please enter an address');
      return;
    }

    setIsSubmitting(true);
    setAddressError('');

    try {
      // Geocode address using Nominatim (OpenStreetMap - free, no API key required)
      const response = await fetch(
        `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(address)}`
      );
      const data = await response.json();

      if (data && data.length > 0) {
        const location = {
          lat: parseFloat(data[0].lat),
          lng: parseFloat(data[0].lon)
        };
        onAddressSubmit(location);
      } else {
        setAddressError('Address not found. Please try a different address.');
      }
    } catch (err) {
      console.error('Error geocoding address:', err);
      setAddressError('Error looking up address. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };
  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-purple-500 to-blue-600 p-4">
      <div className="bg-white rounded-lg shadow-2xl p-6 sm:p-8 max-w-md w-full">
        <div className="text-center">
          <div className="mb-6 sm:mb-8">
            <div className="text-4xl sm:text-5xl mb-4">📍</div>
            <h2 className="text-xl sm:text-2xl font-bold text-gray-800 mb-2">
              Welcome!
            </h2>
            <p className="text-sm sm:text-base text-gray-600">
              We need your location to find nearby restaurants
            </p>
          </div>

          {isLoading && (
            <div className="flex flex-col items-center">
              <div className="animate-spin mb-4">
                <div className="w-8 h-8 border-4 border-purple-200 border-t-purple-600 rounded-full"></div>
              </div>
              <p className="text-sm sm:text-base text-gray-500">Finding your location...</p>
            </div>
          )}

          {error && (
            <div className="mb-4">
              <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-4">
                <p className="text-red-600 text-xs sm:text-sm mb-3 font-medium">{error}</p>
                <button
                  onClick={onRetry}
                  className="w-full bg-red-600 hover:bg-red-700 active:bg-red-800 text-white font-semibold py-2.5 sm:py-3 px-4 rounded-lg transition text-sm sm:text-base touch-manipulation"
                >
                  Try Again
                </button>
              </div>
              <p className="text-xs text-gray-500 mt-4">
                Make sure location access is enabled in your browser settings.
              </p>
            </div>
          )}

          {!error && !isLoading && (
            <>
              <p className="text-sm text-gray-500 mb-6">
                Check your browser for location permission popup
              </p>

              {/* OR divider */}
              <div className="flex items-center my-6">
                <div className="flex-1 border-t border-gray-300"></div>
                <span className="px-3 text-sm text-gray-500">or</span>
                <div className="flex-1 border-t border-gray-300"></div>
              </div>

              {/* Address input form */}
              <form onSubmit={handleAddressSubmit} className="text-left">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Enter your address
                </label>
                <input
                  type="text"
                  value={address}
                  onChange={(e) => {
                    setAddress(e.target.value);
                    setAddressError('');
                  }}
                  placeholder="e.g., 123 Main St, New York, NY"
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-purple-500 mb-3"
                  disabled={isSubmitting}
                />
                {addressError && (
                  <p className="text-red-600 text-xs sm:text-sm mb-3">{addressError}</p>
                )}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-purple-600 hover:bg-purple-700 active:bg-purple-800 disabled:bg-gray-400 text-white font-semibold py-2.5 sm:py-3 px-4 rounded-lg transition text-sm sm:text-base touch-manipulation"
                >
                  {isSubmitting ? 'Looking up address...' : 'Find Restaurants'}
                </button>
              </form>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default GeolocationPrompt;
