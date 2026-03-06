/**
 * Wheel Component
 * SVG-based wheel displaying restaurants as slices
 */

import React, { useEffect, useRef, useState } from 'react';

const COLORS = [
  '#1BA098', '#0F4C5C', '#5A189A', '#9D0208',
  '#D4A574', '#1E7B5F', '#663399', '#A01F36',
  '#2E8B9E', '#6B2D5C', '#C89856', '#0C5F4C'
];

export const Wheel = ({ restaurants, onSpinComplete, isSpinning }) => {
  const svgRef = useRef(null);
  const [rotation, setRotation] = useState(0);
  const [selectedIndex, setSelectedIndex] = useState(null);

  if (!restaurants || restaurants.length === 0) {
    return (
      <div className="flex items-center justify-center w-full h-96 bg-white rounded-lg shadow-lg">
        <div className="text-center">
          <p className="text-xl text-gray-600">😕 No restaurants available</p>
          <p className="text-sm text-gray-500 mt-2">Adjust your filters to find more options</p>
        </div>
      </div>
    );
  }

  const sliceAngle = 360 / restaurants.length;
  const radius = 150;
  const centerX = 180;
  const centerY = 180;

  // Generate SVG slices
  const slices = restaurants.map((restaurant, index) => {
    const startAngle = (index * sliceAngle - 90) * (Math.PI / 180);
    const endAngle = ((index + 1) * sliceAngle - 90) * (Math.PI / 180);

    const x1 = centerX + radius * Math.cos(startAngle);
    const y1 = centerY + radius * Math.sin(startAngle);
    const x2 = centerX + radius * Math.cos(endAngle);
    const y2 = centerY + radius * Math.sin(endAngle);

    const largeArc = sliceAngle > 180 ? 1 : 0;
    const pathData = [
      `M ${centerX} ${centerY}`,
      `L ${x1} ${y1}`,
      `A ${radius} ${radius} 0 ${largeArc} 1 ${x2} ${y2}`,
      'Z'
    ].join(' ');

    // Text positioning
    const textAngle = (index * sliceAngle - 90 + sliceAngle / 2) * (Math.PI / 180);
    const textRadius = radius * 0.6;
    const textX = centerX + textRadius * Math.cos(textAngle);
    const textY = centerY + textRadius * Math.sin(textAngle);

    return {
      pathData,
      color: COLORS[index % COLORS.length],
      name: restaurant.name,
      textX,
      textY,
      textAngle: (index * sliceAngle - 90 + sliceAngle / 2),
      index
    };
  });

  const handleSpin = () => {
    if (isSpinning) return;

    // Random selection
    const randomIndex = Math.floor(Math.random() * restaurants.length);
    setSelectedIndex(randomIndex);

    // Calculate target rotation
    // Target: selected slice should stop at top (pointer position)
    const sliceStartAngle = randomIndex * sliceAngle;
    const sliceMiddleAngle = sliceStartAngle + sliceAngle / 2;
    const targetRotation = 360 * 5 + (360 - sliceMiddleAngle); // 5 full rotations + to position

    setRotation(targetRotation);

    // Call parent callback after animation completes (3 seconds)
    setTimeout(() => {
      onSpinComplete(randomIndex);
    }, 3000);
  };

  return (
    <div className="flex flex-col items-center gap-6">
      <div className="relative">
        {/* Pointer/Marker at top */}
        <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-2 z-10">
          <div className="w-0 h-0 border-l-4 border-r-4 border-t-8 border-l-transparent border-r-transparent border-t-red-500"></div>
        </div>

        {/* Wheel SVG */}
        <svg
          ref={svgRef}
          width="360"
          height="360"
          viewBox="0 0 360 360"
          className={`transition-transform ${
            isSpinning ? 'transition-none' : 'transition-transform'
          }`}
          style={{
            transform: `rotate(${rotation}deg)`,
            transitionDuration: isSpinning ? '3s' : '0s',
            transitionTimingFunction: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)',
            filter: 'drop-shadow(0 4px 12px rgba(0, 0, 0, 0.15))'
          }}
        >
          {/* Draw slices */}
          {slices.map((slice) => (
            <g key={slice.index}>
              {/* Slice path */}
              <path
                d={slice.pathData}
                fill={slice.color}
                stroke="white"
                strokeWidth="2"
                opacity="0.9"
              />
              {/* Slice text */}
              <text
                x={slice.textX}
                y={slice.textY}
                textAnchor="middle"
                dominantBaseline="middle"
                transform={`rotate(${slice.textAngle} ${slice.textX} ${slice.textY})`}
                fill="white"
                fontSize="11"
                fontWeight="bold"
                className="pointer-events-none"
                style={{
                  textShadow: '0 1px 2px rgba(0, 0, 0, 0.3)'
                }}
              >
                {slice.name.length > 15
                  ? slice.name.substring(0, 12) + '...'
                  : slice.name}
              </text>
            </g>
          ))}

          {/* Center circle */}
          <circle
            cx={centerX}
            cy={centerY}
            r="15"
            fill="white"
            stroke="#333"
            strokeWidth="2"
          />
        </svg>
      </div>

      {/* Spin button */}
      <button
        onClick={handleSpin}
        disabled={isSpinning || restaurants.length === 0}
        className={`px-8 py-4 rounded-full text-white font-bold text-xl transition-all transform hover:scale-105 ${
          isSpinning || restaurants.length === 0
            ? 'bg-gray-400 cursor-not-allowed'
            : 'bg-gradient-to-r from-purple-600 to-blue-600 hover:shadow-lg active:scale-95'
        }`}
      >
        {isSpinning ? '🎡 Spinning...' : '🎲 SPIN!'}
      </button>

      {/* Info */}
      <div className="text-center text-sm text-gray-600">
        {restaurants.length} restaurant{restaurants.length !== 1 ? 's' : ''} available
      </div>
    </div>
  );
};

export default Wheel;
