/**
 * Initial UI showing geolocation prompt and loading state
 */

import React from 'react';

export const GeolocationPrompt = ({ isLoading, error, onRetry }) => {
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
            <p className="text-sm text-gray-500">
              Check your browser for location permission popup
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default GeolocationPrompt;
