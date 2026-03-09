/**
 * Empty State Component
 * Shows friendly message when no data available
 */

import React from 'react';

export const EmptyState = ({ 
  icon = '📋', 
  title = 'Nothing here yet', 
  message = 'Get started by taking an action above', 
  action = null 
}) => {
  return (
    <div className="flex flex-col items-center justify-center py-12 text-center">
      <div className="text-5xl mb-4">{icon}</div>
      <h3 className="text-lg font-semibold text-gray-800 mb-2">{title}</h3>
      <p className="text-gray-600 text-sm mb-6 max-w-xs">{message}</p>
      {action && (
        <button
          onClick={action.onClick}
          className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition font-medium text-sm"
        >
          {action.label}
        </button>
      )}
    </div>
  );
};

export default EmptyState;
