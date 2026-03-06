/**
 * Location Header Component
 * Displays title and allows address input/change
 */

import React, { useState } from 'react';

export const LocationHeader = ({ userLocation, onLocationChange }) => {
  const [address, setAddress] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showAddressInput, setShowAddressInput] = useState(false);
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
      // Added parameters for better search results
      const response = await fetch(
        `https://nominatim.openstreetmap.org/search?` +
        `format=json&` +
        `q=${encodeURIComponent(address)}&` +
        `limit=1&` +
        `countrycodes=us`, // Limit to US for better results
        {
          headers: {
            'Accept': 'application/json'
          }
        }
      );
      
      if (!response.ok) {
        throw new Error('Network response failed');
      }
      
      const data = await response.json();

      if (data && data.length > 0) {
        const location = {
          lat: parseFloat(data[0].lat),
          lng: parseFloat(data[0].lon)
        };
        onLocationChange(location);
        setAddress('');
        setShowAddressInput(false);
      } else {
        setAddressError('Address not found. Try entering city, state or full address.');
      }
    } catch (err) {
      console.error('Error geocoding address:', err);
      setAddressError('Error looking up address. Please try again in a moment.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <header className="bg-gradient-to-r from-purple-600 to-blue-600 text-white p-4 sm:p-6 shadow-lg">
      <h1 className="text-2xl sm:text-3xl font-bold">🍽️ Family Dinner Spinner</h1>
      <p className="text-sm sm:text-lg mt-2">Let the wheel decide where you eat!</p>

      {userLocation && !showAddressInput && (
        <div className="flex items-center gap-2 mt-3">
          <p className="text-xs sm:text-sm opacity-90">
            📍 {userLocation.lat.toFixed(4)}, {userLocation.lng.toFixed(4)}
          </p>
          <button
            onClick={() => setShowAddressInput(true)}
            className="text-xs sm:text-sm px-3 py-1 bg-white/20 hover:bg-white/30 rounded-lg transition text-white font-medium"
          >
            Change
          </button>
        </div>
      )}

      {showAddressInput && (
        <form onSubmit={handleAddressSubmit} className="mt-4">
          <div className="flex flex-col gap-2">
            <input
              type="text"
              value={address}
              onChange={(e) => {
                setAddress(e.target.value);
                setAddressError('');
              }}
              placeholder="Enter your address"
              className="px-3 py-2 text-sm rounded-lg text-gray-800 focus:outline-none focus:ring-2 focus:ring-white"
              disabled={isSubmitting}
              autoFocus
            />
            {addressError && (
              <p className="text-red-200 text-xs">{addressError}</p>
            )}
            <div className="flex gap-2">
              <button
                type="submit"
                disabled={isSubmitting}
                className="px-4 py-2 bg-white/20 hover:bg-white/30 disabled:bg-white/10 rounded-lg text-sm font-medium transition text-white"
              >
                {isSubmitting ? 'Looking up...' : 'Search'}
              </button>
              <button
                type="button"
                onClick={() => {
                  setShowAddressInput(false);
                  setAddress('');
                  setAddressError('');
                }}
                className="px-4 py-2 bg-white/10 hover:bg-white/20 rounded-lg text-sm font-medium transition text-white"
              >
                Cancel
              </button>
            </div>
          </div>
        </form>
      )}
    </header>
  );
};

export default LocationHeader;
