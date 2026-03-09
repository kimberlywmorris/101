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
 * Get nearby restaurants using Overpass API
 * Queries OpenStreetMap for real restaurant data
 */
export const fetchNearbyRestaurants = async (params) => {
  const { lat, lng, radiusMeters = 16000 } = params;
  
  console.log('Fetching restaurants for:', { lat, lng, radiusMeters });
  
  try {
    // Convert radius from meters to degrees (rough approximation)
    // 1 degree ≈ 111 km at the equator
    const radiusDegrees = radiusMeters / 111000;
    
    const bbox = {
      south: lat - radiusDegrees,
      west: lng - radiusDegrees,
      north: lat + radiusDegrees,
      east: lng + radiusDegrees
    };

    console.log('Overpass bbox:', bbox);

    // Overpass API query for restaurants - simplified for better reliability
    const overpassQuery = `
      [out:json][timeout:30];
      (
        node["amenity"="restaurant"](${bbox.south},${bbox.west},${bbox.north},${bbox.east});
        way["amenity"="restaurant"](${bbox.south},${bbox.west},${bbox.north},${bbox.east});
      );
      out center;
    `;

    console.log('Overpass query:', overpassQuery);

    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 15000); // 15 second timeout

    const response = await fetch('https://overpass-api.de/api/interpreter', {
      method: 'POST',
      body: overpassQuery,
      signal: controller.signal
    });

    clearTimeout(timeoutId);

    if (!response.ok) {
      console.error('Overpass API response error:', response.status);
      throw new Error(`Overpass API error: ${response.status}`);
    }

    const data = await response.json();
    
    console.log('Overpass response:', data);
    
    if (!data.elements || data.elements.length === 0) {
      console.warn('No restaurants found via Overpass API, using mock data');
      return getMockRestaurants();
    }

    // Transform Overpass data to app format
    const restaurants = data.elements
      .filter(element => element.tags && element.tags.name)
      .slice(0, 20) // Limit to 20 results for performance
      .map((element, index) => {
        const restaurantLat = element.center?.lat || element.lat;
        const restaurantLng = element.center?.lon || element.lon;
        
        // Calculate distance from user location
        const distance = calculateDistance(
          lat, lng,
          restaurantLat, restaurantLng
        );

        // Determine cuisine type
        const cuisineType = element.tags.cuisine || 'Restaurant';
        const cuisineTypes = cuisineType.split(';').map(c => c.trim()).slice(0, 2);

        // Estimate price level (1-3) based on tags
        const priceLevel = determinePriceLevel(element.tags);

        // Estimate rating (we don't have this from OSM, so use a reasonable range)
        const rating = 3.8 + Math.random() * 0.7; // 3.8 - 4.5

        return {
          id: `rest_osm_${element.id}`,
          name: element.tags.name,
          cuisineTypes: cuisineTypes.length > 0 ? cuisineTypes : ['Restaurant'],
          priceLevel: priceLevel,
          rating: parseFloat(rating.toFixed(1)),
          userRatingsTotal: Math.floor(Math.random() * 300) + 50,
          reviewKeywords: ['Popular spot', 'Local favorite', 'Good atmosphere'],
          hoursText: element.tags.opening_hours ? 'Check hours' : 'Hours vary',
          isOpenNow: true,
          location: {
            lat: restaurantLat,
            lng: restaurantLng,
            address: element.tags['addr:street'] 
              ? `${element.tags['addr:street']}, ${element.tags['addr:city'] || 'Unknown'}`
              : 'See on map for address'
          },
          distanceMeters: distance,
          iconUrl: '🍽️'
        };
      });

    console.log(`Found ${restaurants.length} restaurants from Overpass API`);
    return restaurants.length > 0 ? restaurants : getMockRestaurants();
  } catch (error) {
    console.error('Error fetching from Overpass API:', error);
    console.log('Falling back to mock data');
    // Fall back to mock data if API fails
    return getMockRestaurants();
  }
};

/**
 * Calculate distance between two coordinates using Haversine formula
 */
const calculateDistance = (lat1, lon1, lat2, lon2) => {
  const R = 6371000; // Earth's radius in meters
  const dLat = (lat2 - lat1) * Math.PI / 180;
  const dLon = (lon2 - lon1) * Math.PI / 180;
  const a = 
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
    Math.sin(dLon / 2) * Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return Math.round(R * c);
};

/**
 * Estimate price level from OSM tags
 */
const determinePriceLevel = (tags) => {
  if (tags.price_level) {
    const level = parseInt(tags.price_level);
    return Math.min(3, Math.max(1, level));
  }
  
  // Estimate based on tags
  if (tags.cuisine?.includes('fine') || tags.cuisine?.includes('upscale')) {
    return 3;
  }
  if (tags.cuisine?.includes('fast') || tags.cuisine?.includes('cheap')) {
    return 1;
  }
  return 2; // Default to moderate
};

/**
 * Get mock restaurants as fallback
 */
const getMockRestaurants = () => {
  return MOCK_RESTAURANTS.map(rest => ({ ...rest }));
};

/**
 * Original fetchNearbyRestaurants with mocks (kept for reference)
 */
const fetchNearbyRestaurantsMock = async (params) => {
  // Simulate network delay
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(MOCK_RESTAURANTS.map(rest => ({
        ...rest,
      })));
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
