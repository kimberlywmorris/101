/**
 * Loading Spinner Component
 * Reusable loading indicator
 */

import React from 'react';

export const LoadingSpinner = ({ size = 'md', message = 'Loading...' }) => {
  const sizeClasses = {
    sm: 'w-6 h-6 border-2',
    md: 'w-12 h-12 border-4',
    lg: 'w-16 h-16 border-4'
  };

  return (
    <div className="flex flex-col items-center justify-center gap-3">
      <div className={`${sizeClasses[size]} border-purple-200 border-t-purple-600 rounded-full animate-spin`}></div>
      {message && <p className="text-gray-600 text-sm">{message}</p>}
    </div>
  );
};

export default LoadingSpinner;
