/**
 * Result Panel Component
 * Displays the selected restaurant after a spin
 */

import React from 'react';
import { useAppState } from '../context/AppStateContext';

const PRICE_SYMBOLS = {
  1: '$',
  2: '$$',
  3: '$$$',
  4: '$$$$'
};

export const ResultPanel = ({ restaurant }) => {
  const { setPreference, clearPreference, getPreference, addHistoryEntry } = useAppState();

  if (!restaurant) {
    return (
      <div className="bg-white rounded-lg shadow-lg p-8 text-center">
        <p className="text-gray-600 text-lg">
          👈 Click the spin button to select a restaurant!
        </p>
      </div>
    );
  }

  const isFavorite = getPreference(restaurant.id) === 'FAVORITE';

  const handleFavorite = () => {
    if (isFavorite) {
      clearPreference(restaurant.id);
    } else {
      setPreference(restaurant.id, 'FAVORITE');
      addHistoryEntry(restaurant.id, restaurant.name);
    }
  };

  const handleDirections = () => {
    const { lat, lng } = restaurant.location;
    const url = `https://www.google.com/maps/search/?api=1&query=${lat},${lng}`;
    window.open(url, '_blank');
  };

  return (
    <div className="bg-gradient-to-br from-[#3aa6a0]/10 to-[#2a5b69]/10 rounded-lg shadow-lg overflow-hidden">
      {/* Header */}
      <div className="bg-gradient-to-r from-[#3aa6a0] to-[#2a5b69] text-white p-6">
        <div className="flex items-start justify-between">
          <div>
            <p className="text-sm opacity-90 mb-2">🎡 You're going to...</p>
            <h2 className="text-3xl font-bold">{restaurant.name}</h2>
            <p className="text-cyan-100 mt-2">
              {restaurant.cuisineTypes.join(', ')}
            </p>
          </div>
          <div className="text-5xl">{restaurant.iconUrl}</div>
        </div>
      </div>

      {/* Content */}
      <div className="p-6 space-y-4">
        {/* Rating and Price */}
        <div className="grid grid-cols-3 gap-4">
          <div className="bg-white rounded-lg p-4 text-center">
            <p className="text-sm text-gray-600 mb-1">Rating</p>
            <p className="text-2xl font-bold">
              {restaurant.rating ? `${restaurant.rating.toFixed(1)}⭐` : 'N/A'}
            </p>
            {restaurant.userRatingsTotal && (
              <p className="text-xs text-gray-500">({restaurant.userRatingsTotal})</p>
            )}
          </div>

          <div className="bg-white rounded-lg p-4 text-center">
            <p className="text-sm text-gray-600 mb-1">Price</p>
            <p className="text-2xl font-bold">
              {PRICE_SYMBOLS[restaurant.priceLevel] || '?'}
            </p>
          </div>

          <div className="bg-white rounded-lg p-4 text-center">
            <p className="text-sm text-gray-600 mb-1">Distance</p>
            <p className="text-2xl font-bold">
              {(restaurant.distanceMeters / 1609.34).toFixed(1)} mi
            </p>
          </div>
        </div>

        {/* Hours */}
        <div className="bg-white rounded-lg p-4">
          <p className="text-sm font-semibold text-gray-700 mb-1">Hours</p>
          <p className={`text-lg font-medium ${
            restaurant.isOpenNow ? 'text-green-600' : 'text-red-600'
          }`}>
            {restaurant.hoursText}
          </p>
        </div>

        {/* Address */}
        <div className="bg-white rounded-lg p-4">
          <p className="text-sm font-semibold text-gray-700 mb-1">Address</p>
          <p className="text-gray-600">{restaurant.location.address}</p>
        </div>

        {/* Review Keywords */}
        {restaurant.reviewKeywords && restaurant.reviewKeywords.length > 0 && (
          <div className="bg-white rounded-lg p-4">
            <p className="text-sm font-semibold text-gray-700 mb-2">Why people love it</p>
            <div className="flex flex-wrap gap-2">
              {restaurant.reviewKeywords.map((keyword, idx) => (
                <span
                  key={idx}
                  className="bg-blue-100 text-blue-700 text-sm px-3 py-1 rounded-full"
                >
                  ✓ {keyword}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Actions */}
        <div className="grid grid-cols-2 gap-3">
          <button
            onClick={handleFavorite}
            className={`py-3 rounded-lg font-semibold transition ${
              isFavorite
                ? 'bg-yellow-100 text-yellow-600 hover:bg-yellow-200'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            {isFavorite ? '⭐ Favorite' : '☆ Add to Favorites'}
          </button>

          <button
            onClick={handleDirections}
            className="bg-gradient-to-r from-[#3aa6a0] to-[#2a5b69] text-white py-3 rounded-lg font-semibold hover:shadow-lg transition"
          >
            📍 Directions
          </button>
        </div>

        {/* Coordinates (for debugging) */}
        <div className="bg-gray-50 rounded-lg p-3 text-xs text-gray-500 text-center">
          {restaurant.location.lat.toFixed(4)}, {restaurant.location.lng.toFixed(4)}
        </div>
      </div>
    </div>
  );
};

export default ResultPanel;
