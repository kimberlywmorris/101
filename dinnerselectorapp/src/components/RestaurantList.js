/**
 * Restaurant List Component
 * Displays restaurants based on current filters
 */

import React from 'react';
import { useAppState } from '../context/AppStateContext';

/**
 * Filter restaurants based on current filters
 */
const applyFilters = (restaurants, filters, preferences) => {
  return restaurants.filter(rest => {
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

export const RestaurantList = () => {
  const {
    restaurants,
    filters,
    preferences,
    selectedRestaurant,
    setSelectedRestaurant,
    setPreference,
    clearPreference
  } = useAppState();

  const filteredRestaurants = applyFilters(restaurants, filters, preferences);

  if (restaurants.length === 0) {
    return (
      <div className="bg-white rounded-lg shadow-md p-8 text-center">
        <p className="text-gray-600">Loading restaurants...</p>
      </div>
    );
  }

  if (filteredRestaurants.length === 0) {
    return (
      <div className="bg-white rounded-lg shadow-md p-8 text-center">
        <p className="text-xl mb-2">😕 No restaurants found</p>
        <p className="text-gray-600">
          Try expanding your radius or adjusting your filters
        </p>
      </div>
    );
  }

  const toggleFavorite = (restaurantId) => {
    const current = preferences[restaurantId];
    if (current === 'FAVORITE') {
      clearPreference(restaurantId);
    } else {
      setPreference(restaurantId, 'FAVORITE');
    }
  };

  const toggleNoGo = (restaurantId) => {
    const current = preferences[restaurantId];
    if (current === 'NO_GO') {
      clearPreference(restaurantId);
    } else {
      setPreference(restaurantId, 'NO_GO');
    }
  };

  return (
    <div className="space-y-3">
      <div className="text-sm text-gray-600 px-4 py-2">
        Found {filteredRestaurants.length} restaurants
      </div>

      {filteredRestaurants.map(restaurant => {
        const isFavorite = preferences[restaurant.id] === 'FAVORITE';
        const isSelected = selectedRestaurant?.id === restaurant.id;

        return (
          <div
            key={restaurant.id}
            onClick={() => setSelectedRestaurant(restaurant)}
            className={`bg-white rounded-lg shadow-md p-4 cursor-pointer transition hover:shadow-lg ${
              isSelected ? 'ring-2 ring-blue-500' : ''
            }`}
          >
            <div className="flex items-start justify-between">
              <div className="flex-1">
                {/* Header with name and icon */}
                <div className="flex items-center gap-3 mb-2">
                  <span className="text-3xl">{restaurant.iconUrl}</span>
                  <div>
                    <h3 className="font-bold text-gray-800 text-lg">
                      {restaurant.name}
                    </h3>
                    <p className="text-sm text-gray-600">
                      {restaurant.cuisineTypes.join(', ')}
                    </p>
                  </div>
                </div>

                {/* Rating and price */}
                <div className="flex items-center gap-4 text-sm mb-2">
                  {restaurant.rating && (
                    <span className="flex items-center gap-1">
                      ⭐ {restaurant.rating.toFixed(1)} ({restaurant.userRatingsTotal})
                    </span>
                  )}
                  <span className="text-gray-600">
                    {'$'.repeat(restaurant.priceLevel)}
                  </span>
                </div>

                {/* Hours and distance */}
                <div className="flex items-center gap-4 text-sm mb-2">
                  <span className="text-gray-600">🕐 {restaurant.hoursText}</span>
                  <span className="text-gray-600">
                    📍 {(restaurant.distanceMeters / 1000).toFixed(1)} km
                  </span>
                </div>

                {/* Address */}
                <p className="text-xs text-gray-500 mb-2">{restaurant.location.address}</p>

                {/* Review keywords */}
                {restaurant.reviewKeywords?.length > 0 && (
                  <div className="flex flex-wrap gap-1">
                    {restaurant.reviewKeywords.slice(0, 2).map((keyword, idx) => (
                      <span
                        key={idx}
                        className="bg-blue-50 text-blue-700 text-xs px-2 py-1 rounded"
                      >
                        {keyword}
                      </span>
                    ))}
                  </div>
                )}
              </div>

              {/* Action buttons */}
              <div className="ml-2 flex flex-col gap-2">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleFavorite(restaurant.id);
                  }}
                  className={`px-3 py-1 rounded text-lg transition ${
                    isFavorite
                      ? 'bg-yellow-100 text-yellow-600'
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                  title={isFavorite ? 'Remove favorite' : 'Add favorite'}
                >
                  {isFavorite ? '⭐' : '☆'}
                </button>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default RestaurantList;
