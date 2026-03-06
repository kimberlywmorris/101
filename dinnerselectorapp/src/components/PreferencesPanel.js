/**
 * Preferences Panel Component
 * Manages favorites and no-go restaurants
 */

import React, { useState } from 'react';
import { useAppState } from '../context/AppStateContext';

export const PreferencesPanel = () => {
  const {
    restaurants,
    preferences,
    setSelectedRestaurant,
    setPreference,
    clearPreference
  } = useAppState();

  const [tab, setTab] = useState('favorites'); // 'favorites' or 'nogo'

  const favoriteRestaurants = restaurants.filter(
    rest => preferences[rest.id] === 'FAVORITE'
  );

  const noGoRestaurants = restaurants.filter(
    rest => preferences[rest.id] === 'NO_GO'
  );

  const handleSelectRestaurant = (restaurant) => {
    setSelectedRestaurant(restaurant);
  };

  const handleRemovePreference = (restaurantId, e) => {
    e.stopPropagation();
    clearPreference(restaurantId);
  };

  const handleAddNoGo = (restaurantId, e) => {
    e.stopPropagation();
    setPreference(restaurantId, 'NO_GO');
  };

  const handleRemoveNoGo = (restaurantId, e) => {
    e.stopPropagation();
    clearPreference(restaurantId);
  };

  return (
    <div className="bg-white rounded-lg shadow-md">
      {/* Tabs */}
      <div className="border-b flex">
        <button
          onClick={() => setTab('favorites')}
          className={`flex-1 px-4 py-3 font-semibold transition ${
            tab === 'favorites'
              ? 'text-blue-600 border-b-2 border-blue-600'
              : 'text-gray-600 hover:text-gray-800'
          }`}
        >
          ⭐ Favorites ({favoriteRestaurants.length})
        </button>
        <button
          onClick={() => setTab('nogo')}
          className={`flex-1 px-4 py-3 font-semibold transition ${
            tab === 'nogo'
              ? 'text-blue-600 border-b-2 border-blue-600'
              : 'text-gray-600 hover:text-gray-800'
          }`}
        >
          ⛔ No-Go ({noGoRestaurants.length})
        </button>
      </div>

      {/* Content */}
      <div className="p-6">
        {tab === 'favorites' ? (
          <div>
            {favoriteRestaurants.length === 0 ? (
              <div className="text-center py-8">
                <p className="text-gray-500 mb-2">No favorites yet</p>
                <p className="text-xs text-gray-400">
                  Click the star icon to add restaurants to your favorites
                </p>
              </div>
            ) : (
              <div className="space-y-3 max-h-96 overflow-y-auto">
                {favoriteRestaurants.map(restaurant => (
                  <div
                    key={restaurant.id}
                    onClick={() => handleSelectRestaurant(restaurant)}
                    className="bg-yellow-50 rounded-lg p-4 cursor-pointer hover:shadow-md transition border-l-4 border-yellow-400"
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="text-2xl">{restaurant.iconUrl}</span>
                          <div>
                            <h4 className="font-semibold text-gray-800">
                              {restaurant.name}
                            </h4>
                            <p className="text-xs text-gray-600">
                              {restaurant.cuisineTypes.join(', ')}
                            </p>
                          </div>
                        </div>
                      </div>
                      <button
                        onClick={(e) => handleRemovePreference(restaurant.id, e)}
                        className="text-yellow-600 hover:text-yellow-700 font-semibold"
                      >
                        ✕
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        ) : (
          <div>
            {noGoRestaurants.length === 0 ? (
              <div className="text-center py-8">
                <p className="text-gray-500 mb-2">No no-go restaurants</p>
                <p className="text-xs text-gray-400">
                  These restaurants won't appear on the wheel
                </p>
              </div>
            ) : (
              <div className="space-y-3 max-h-96 overflow-y-auto">
                {noGoRestaurants.map(restaurant => (
                  <div
                    key={restaurant.id}
                    className="bg-red-50 rounded-lg p-4 border-l-4 border-red-400"
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <span className="text-2xl">{restaurant.iconUrl}</span>
                          <div>
                            <h4 className="font-semibold text-gray-800">
                              {restaurant.name}
                            </h4>
                            <p className="text-xs text-gray-600">
                              {restaurant.cuisineTypes.join(', ')}
                            </p>
                          </div>
                        </div>
                      </div>
                      <button
                        onClick={(e) => handleRemoveNoGo(restaurant.id, e)}
                        className="text-red-600 hover:text-red-700 font-semibold"
                      >
                        ✕
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default PreferencesPanel;
