/**
 * Error Alert Component
 * Displays error messages with retry capability
 */

import React from 'react';

export const ErrorAlert = ({ message, onRetry, title = 'Error' }) => {
  return (
    <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded-lg">
      <div className="flex items-start gap-4">
        <span className="text-2xl">⚠️</span>
        <div className="flex-1">
          <h3 className="font-semibold text-red-800 mb-1">{title}</h3>
          <p className="text-red-700 text-sm mb-3">{message}</p>
          {onRetry && (
            <button
              onClick={onRetry}
              className="text-sm font-semibold text-red-600 hover:text-red-700 underline transition"
            >
              Try Again
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default ErrorAlert;
