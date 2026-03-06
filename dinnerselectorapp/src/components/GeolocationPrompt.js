/**
 * Initial UI showing geolocation prompt and loading state
 */

import React from 'react';

export const GeolocationPrompt = ({ isLoading, error, onRetry }) => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-purple-500 to-blue-600">
      <div className="bg-white rounded-lg shadow-2xl p-8 max-w-md w-full mx-4">
        <div className="text-center">
          <div className="mb-6">
            <div className="text-5xl mb-4">📍</div>
            <h2 className="text-2xl font-bold text-gray-800 mb-2">
              Welcome!
            </h2>
            <p className="text-gray-600">
              We need your location to find nearby restaurants
            </p>
          </div>

          {isLoading && (
            <div className="flex flex-col items-center">
              <div className="animate-spin mb-4">
                <div className="w-8 h-8 border-4 border-purple-200 border-t-purple-600 rounded-full"></div>
              </div>
              <p className="text-gray-500">Finding your location...</p>
            </div>
          )}

          {error && (
            <div className="mb-4">
              <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-4">
                <p className="text-red-600 text-sm mb-3">{error}</p>
                <button
                  onClick={onRetry}
                  className="w-full bg-red-600 hover:bg-red-700 text-white font-semibold py-2 px-4 rounded-lg transition"
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
            <p className="text-gray-500">
              Check your browser for location permission popup
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default GeolocationPrompt;
