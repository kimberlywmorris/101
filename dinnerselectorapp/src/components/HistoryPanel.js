/**
 * History Panel Component
 * Displays past spin results with timestamps and filters
 */

import React, { useState } from 'react';
import { useAppState } from '../context/AppStateContext';
import { getRestaurantById } from '../services/restaurantService';

export const HistoryPanel = () => {
  const { history, setSelectedRestaurant } = useAppState();
  const [showHistory, setShowHistory] = useState(false);

  const getRestaurantName = (restaurantId) => {
    const rest = getRestaurantById(restaurantId);
    return rest ? rest.name : 'Unknown Restaurant';
  };

  const formatTime = (timestamp) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diffMs = now - date;
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMs / 3600000);

    if (diffMins < 1) return 'Just now';
    if (diffMins < 60) return `${diffMins}m ago`;
    if (diffHours < 24) return `${diffHours}h ago`;
    
    return date.toLocaleDateString();
  };

  const clearHistory = () => {
    if (window.confirm('Are you sure you want to clear all history?')) {
      // History would need a clear function in context
      // For now, we'll just show the UI
      alert('History clearing not yet implemented - add to future steps');
    }
  };

  const handleSelectRestaurant = (restaurantId) => {
    const rest = getRestaurantById(restaurantId);
    if (rest) {
      setSelectedRestaurant(rest);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md">
      {/* Toggle Button */}
      <button
        onClick={() => setShowHistory(!showHistory)}
        className="w-full px-6 py-4 flex items-center justify-between hover:bg-gray-50 transition"
      >
        <div className="flex items-center gap-2">
          <span className="text-xl">📜</span>
          <span className="font-semibold text-gray-800">History</span>
          {history.length > 0 && (
            <span className="bg-blue-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
              {history.length}
            </span>
          )}
        </div>
        <span className={`text-2xl transform transition-transform ${showHistory ? 'rotate-180' : ''}`}>
          ▼
        </span>
      </button>

      {/* History Content */}
      {showHistory && (
        <div className="border-t px-6 py-6">
          {history.length === 0 ? (
            <div className="text-center py-8">
              <p className="text-gray-500 mb-2">No spins yet</p>
              <p className="text-xs text-gray-400">
                Your spin history will appear here
              </p>
            </div>
          ) : (
            <div className="space-y-3 max-h-96 overflow-y-auto">
              {history.map((entry, idx) => (
                <div
                  key={entry.id}
                  onClick={() => handleSelectRestaurant(entry.restaurantId)}
                  className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg p-4 cursor-pointer hover:shadow-md transition border-l-4 border-blue-500"
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-lg font-semibold text-gray-800">
                          #{history.length - idx}
                        </span>
                        <span className="text-xs text-gray-500">
                          {formatTime(entry.timestamp)}
                        </span>
                      </div>
                      <p className="text-gray-700 font-medium">
                        {entry.restaurantName}
                      </p>
                      <div className="flex items-center gap-2 mt-2 text-xs text-gray-600">
                        <span>📍 {(entry.filtersSnapshot.radiusMeters / 1000).toFixed(0)}km radius</span>
                        {entry.filtersSnapshot.openNow && (
                          <span className="bg-green-100 text-green-700 px-2 py-0.5 rounded">
                            Open Now
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))}

              {/* Clear History Button */}
              {history.length > 0 && (
                <button
                  onClick={clearHistory}
                  className="w-full mt-4 px-4 py-2 text-red-600 hover:bg-red-50 rounded-lg transition text-sm"
                >
                  🗑️ Clear History
                </button>
              )}
            </div>
          )}

          {/* History Stats */}
          {history.length > 0 && (
            <div className="mt-6 pt-6 border-t space-y-2 text-sm text-gray-600">
              <div className="flex justify-between">
                <span>Total Spins:</span>
                <span className="font-semibold text-gray-800">{history.length}</span>
              </div>
              <div className="flex justify-between">
                <span>Unique Restaurants:</span>
                <span className="font-semibold text-gray-800">
                  {new Set(history.map(h => h.restaurantId)).size}
                </span>
              </div>
              {history.length > 0 && (
                <div className="flex justify-between">
                  <span>Most Recent:</span>
                  <span className="font-semibold text-gray-800">
                    {formatTime(history[0].timestamp)}
                  </span>
                </div>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default HistoryPanel;
