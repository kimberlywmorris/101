/**
 * Mock restaurant data service
 * Returns hardcoded restaurant data for MVP
 */

const MOCK_RESTAURANTS = [
  {
    id: 'rest_001',
    name: 'The Italian Corner',
    cuisineTypes: ['Italian', 'Mediterranean'],
    priceLevel: 2,
    rating: 4.5,
    userRatingsTotal: 342,
    reviewKeywords: ['Great pasta', 'Romantic ambiance', 'Good wine list'],
    hoursText: 'Open ⋅ Closes 10 PM',
    isOpenNow: true,
    location: {
      lat: 33.7490,
      lng: -84.3880,
      address: '123 Peachtree St, Atlanta, GA'
    },
    distanceMeters: 1200,
    iconUrl: '🍝'
  },
  {
    id: 'rest_002',
    name: 'Spice Route',
    cuisineTypes: ['Indian', 'South Asian'],
    priceLevel: 2,
    rating: 4.3,
    userRatingsTotal: 256,
    reviewKeywords: ['Authentic flavors', 'Great biryanis', 'Friendly staff'],
    hoursText: 'Open ⋅ Closes 11 PM',
    isOpenNow: true,
    location: {
      lat: 33.7510,
      lng: -84.3850,
      address: '456 Highland Ave, Atlanta, GA'
    },
    distanceMeters: 2100,
    iconUrl: '🍛'
  },
  {
    id: 'rest_003',
    name: 'Dragon Palace',
    cuisineTypes: ['Chinese', 'Asian'],
    priceLevel: 1,
    rating: 4.1,
    userRatingsTotal: 418,
    reviewKeywords: ['Great dumplings', 'Fast service', 'Good value'],
    hoursText: 'Open ⋅ Closes 10:30 PM',
    isOpenNow: true,
    location: {
      lat: 33.7470,
      lng: -84.3900,
      address: '789 Buford Hwy, Atlanta, GA'
    },
    distanceMeters: 1800,
    iconUrl: '🥡'
  },
  {
    id: 'rest_004',
    name: 'El Mariachi',
    cuisineTypes: ['Mexican', 'Latin American'],
    priceLevel: 1,
    rating: 4.4,
    userRatingsTotal: 287,
    reviewKeywords: ['Fresh ingredients', 'Great tacos', 'Lively atmosphere'],
    hoursText: 'Open ⋅ Closes 11 PM',
    isOpenNow: true,
    location: {
      lat: 33.7450,
      lng: -84.3920,
      address: '321 Memorial Dr, Atlanta, GA'
    },
    distanceMeters: 2500,
    iconUrl: '🌮'
  },
  {
    id: 'rest_005',
    name: 'The Burger House',
    cuisineTypes: ['American', 'Burgers'],
    priceLevel: 1,
    rating: 4.0,
    userRatingsTotal: 521,
    reviewKeywords: ['Classic burgers', 'Good fries', 'Casual vibe'],
    hoursText: 'Open ⋅ Closes 10 PM',
    isOpenNow: true,
    location: {
      lat: 33.7520,
      lng: -84.3870,
      address: '555 Ponce de Leon Ave, Atlanta, GA'
    },
    distanceMeters: 1500,
    iconUrl: '🍔'
  },
  {
    id: 'rest_006',
    name: 'Sakura Sushi',
    cuisineTypes: ['Japanese', 'Sushi'],
    priceLevel: 3,
    rating: 4.6,
    userRatingsTotal: 389,
    reviewKeywords: ['Fresh fish', 'Creative rolls', 'Elegant presentation'],
    hoursText: 'Open ⋅ Closes 11 PM',
    isOpenNow: true,
    location: {
      lat: 33.7480,
      lng: -84.3860,
      address: '888 W Paces Ferry Rd, Atlanta, GA'
    },
    distanceMeters: 2800,
    iconUrl: '🍣'
  },
  {
    id: 'rest_007',
    name: 'The Greek Taverna',
    cuisineTypes: ['Greek', 'Mediterranean'],
    priceLevel: 2,
    rating: 4.2,
    userRatingsTotal: 195,
    reviewKeywords: ['Authentic Greek', 'Great feta', 'Outdoor seating'],
    hoursText: 'Open ⋅ Closes 10 PM',
    isOpenNow: true,
    location: {
      lat: 33.7500,
      lng: -84.3890,
      address: '444 10th St, Atlanta, GA'
    },
    distanceMeters: 1900,
    iconUrl: '🫒'
  },
  {
    id: 'rest_008',
    name: 'Sweet & Savory Bistro',
    cuisineTypes: ['French', 'Contemporary'],
    priceLevel: 3,
    rating: 4.5,
    userRatingsTotal: 267,
    reviewKeywords: ['Elegant dining', 'Excellent wine', 'Chef\'s specials'],
    hoursText: 'Open ⋅ Closes 10:30 PM',
    isOpenNow: true,
    location: {
      lat: 33.7460,
      lng: -84.3840,
      address: '777 Midtown Ave, Atlanta, GA'
    },
    distanceMeters: 2200,
    iconUrl: '🥖'
  },
  {
    id: 'rest_009',
    name: 'Thai Garden',
    cuisineTypes: ['Thai', 'Southeast Asian'],
    priceLevel: 2,
    rating: 4.3,
    userRatingsTotal: 312,
    reviewKeywords: ['Authentic spices', 'Pad Thai perfection', 'Great curry'],
    hoursText: 'Open ⋅ Closes 10 PM',
    isOpenNow: true,
    location: {
      lat: 33.7530,
      lng: -84.3850,
      address: '222 Peachtree Center, Atlanta, GA'
    },
    distanceMeters: 1400,
    iconUrl: '🍜'
  },
  {
    id: 'rest_010',
    name: 'BBQ Smokehouse',
    cuisineTypes: ['Barbecue', 'American'],
    priceLevel: 2,
    rating: 4.4,
    userRatingsTotal: 654,
    reviewKeywords: ['Slow smoked meats', 'Tangy sauce', 'Family friendly'],
    hoursText: 'Open ⋅ Closes 9:30 PM',
    isOpenNow: true,
    location: {
      lat: 33.7470,
      lng: -84.3810,
      address: '999 East Side, Atlanta, GA'
    },
    distanceMeters: 3200,
    iconUrl: '🍖'
  }
];

/**
 * Get nearby restaurants (mock version)
 * In a real app, this would call an API
 */
export const fetchNearbyRestaurants = async (params) => {
  // Simulate network delay
  return new Promise((resolve) => {
    setTimeout(() => {
      // For mock data, we just return all restaurants with calculated distances
      // In real app, we'd filter by radius, cuisine, price, etc.
      const restaurants = MOCK_RESTAURANTS.map(rest => ({
        ...rest,
        // In real app, compute distance based on user location
        // For now, keep the mock distance
      }));
      resolve(restaurants);
    }, 500);
  });
};

/**
 * Get a single restaurant by ID
 */
export const getRestaurantById = (restaurantId) => {
  return MOCK_RESTAURANTS.find(rest => rest.id === restaurantId);
};

/**
 * Get all unique cuisine types available
 */
export const getAllCuisineTypes = () => {
  const cuisines = new Set();
  MOCK_RESTAURANTS.forEach(rest => {
    rest.cuisineTypes.forEach(cuisine => cuisines.add(cuisine));
  });
  return Array.from(cuisines).sort();
};

/**
 * Get unique price levels
 */
export const getPriceLevels = () => {
  const levels = new Set();
  MOCK_RESTAURANTS.forEach(rest => {
    if (rest.priceLevel) levels.add(rest.priceLevel);
  });
  return Array.from(levels).sort((a, b) => a - b);
};
