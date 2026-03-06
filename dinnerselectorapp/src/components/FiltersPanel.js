/**
 * Filters Panel Component
 * UI for controlling filters: radius, cuisine, price, open now
 */

import React, { useState } from 'react';
import { useAppState } from '../context/AppStateContext';
import { getAllCuisineTypes, getPriceLevels } from '../services/restaurantService';

const RADIUS_OPTIONS = [
  { value: 8000, label: '5 miles' },
  { value: 16000, label: '10 miles' },
  { value: 24000, label: '15 miles' },
  { value: 32000, label: '20 miles' }
];

const PRICE_SYMBOLS = {
  1: '$',
  2: '$$',
  3: '$$$',
  4: '$$$$'
};

export const FiltersPanel = () => {
  const { filters, updateFilters } = useAppState();
  const [showFilters, setShowFilters] = useState(false);
  const [expanded, setExpanded] = useState(false);
  
  const cuisines = getAllCuisineTypes();
  const priceLevels = getPriceLevels();

  const handleRadiusChange = (e) => {
    updateFilters({ radiusMeters: parseInt(e.target.value) });
  };

  const handleCuisineToggle = (cuisine) => {
    const newCuisines = filters.cuisines.includes(cuisine)
      ? filters.cuisines.filter(c => c !== cuisine)
      : [...filters.cuisines, cuisine];
    updateFilters({ cuisines: newCuisines });
  };

  const handlePriceToggle = (level) => {
    const newPriceLevels = filters.priceLevels.includes(level)
      ? filters.priceLevels.filter(p => p !== level)
      : [...filters.priceLevels, level];
    updateFilters({ priceLevels: newPriceLevels });
  };

  const handleOpenNowToggle = () => {
    updateFilters({ openNow: !filters.openNow });
  };

  const handleReset = () => {
    updateFilters({
      radiusMeters: 16000,
      cuisines: [],
      priceLevels: [],
      openNow: false
    });
  };

  const getRadiusLabel = () => {
    const option = RADIUS_OPTIONS.find(opt => opt.value === filters.radiusMeters);
    return option ? option.label : '10 miles';
  };

  return (
    <div className="bg-white rounded-lg shadow-md">
      {/* Filter Toggle Button */}
      <button
        onClick={() => setShowFilters(!showFilters)}
        className="w-full px-6 py-4 flex items-center justify-between hover:bg-gray-50 transition"
      >
        <div className="flex items-center gap-2">
          <span className="text-xl">🔍</span>
          <span className="font-semibold text-gray-800">Filters</span>
          {(filters.cuisines.length > 0 || filters.priceLevels.length > 0) && (
            <span className="bg-blue-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
              {filters.cuisines.length + filters.priceLevels.length}
            </span>
          )}
        </div>
        <span className={`text-2xl transform transition-transform ${showFilters ? 'rotate-180' : ''}`}>
          ▼
        </span>
      </button>

      {/* Filters Content */}
      {showFilters && (
        <div className="border-t px-6 py-6 space-y-6">
          {/* Radius Selector */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-3">
              📍 Search Radius: {getRadiusLabel()}
            </label>
            <select
              value={filters.radiusMeters}
              onChange={handleRadiusChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {RADIUS_OPTIONS.map(option => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>

          {/* Cuisine Filter */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-3">
              🍽️ Cuisines {filters.cuisines.length > 0 && `(${filters.cuisines.length} selected)`}
            </label>
            <div className="flex flex-wrap gap-2">
              {cuisines.map(cuisine => (
                <button
                  key={cuisine}
                  onClick={() => handleCuisineToggle(cuisine)}
                  className={`px-3 py-1.5 rounded-full text-sm font-medium transition ${
                    filters.cuisines.includes(cuisine)
                      ? 'bg-blue-500 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {cuisine}
                </button>
              ))}
            </div>
          </div>

          {/* Price Level Filter */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-3">
              💰 Price Level {filters.priceLevels.length > 0 && `(${filters.priceLevels.length} selected)`}
            </label>
            <div className="flex gap-2">
              {priceLevels.map(level => (
                <button
                  key={level}
                  onClick={() => handlePriceToggle(level)}
                  className={`px-4 py-2 rounded-lg font-semibold transition ${
                    filters.priceLevels.includes(level)
                      ? 'bg-blue-500 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {PRICE_SYMBOLS[level] || level}
                </button>
              ))}
            </div>
          </div>

          {/* Open Now Toggle */}
          <div className="flex items-center justify-between">
            <label className="text-sm font-semibold text-gray-700">
              🕐 Open Now
            </label>
            <button
              onClick={handleOpenNowToggle}
              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                filters.openNow ? 'bg-blue-500' : 'bg-gray-300'
              }`}
            >
              <span
                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                  filters.openNow ? 'translate-x-6' : 'translate-x-1'
                }`}
              />
            </button>
          </div>

          {/* Reset Button */}
          <button
            onClick={handleReset}
            className="w-full px-4 py-2.5 text-blue-600 hover:bg-blue-50 active:bg-blue-100 rounded-lg transition text-sm font-medium touch-manipulation"
          >
            🔄 Reset Filters
          </button>
        </div>
      )}
    </div>
  );
};

export default FiltersPanel;
