/**
 * Type definitions for the app
 */

// Restaurant data structure
export const RestaurantType = {
  id: '',
  name: '',
  cuisineTypes: [],
  priceLevel: 0, // 0-4
  rating: 0, // 0-5
  userRatingsTotal: 0,
  reviewKeywords: [],
  hoursText: '',
  isOpenNow: true,
  location: {
    lat: 0,
    lng: 0,
    address: ''
  },
  distanceMeters: 0,
  iconUrl: ''
};

// Preference status
export const PreferenceStatus = {
  FAVORITE: 'FAVORITE',
  NO_GO: 'NO_GO'
};

// User preference
export const PreferenceType = {
  restaurantId: '',
  status: '' // 'FAVORITE' or 'NO_GO'
};

// History entry
export const HistoryEntryType = {
  id: '',
  timestamp: 0,
  restaurantId: '',
  restaurantName: '',
  filtersSnapshot: {
    radiusMeters: 0,
    cuisines: [],
    priceLevels: [],
    openNow: false
  }
};

// Filters
export const FiltersType = {
  radiusMeters: 16000, // 10 miles default
  cuisines: [],
  priceLevels: [],
  openNow: true
};
