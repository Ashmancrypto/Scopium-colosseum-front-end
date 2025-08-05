import React, { useState, useEffect, useRef } from 'react';
import { useTheme } from '../../contexts/ThemeContext.jsx';

const HolderDistribution = ({ holders }) => {
  const { isDark } = useTheme();
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const [selectedHolder, setSelectedHolder] = useState(null);
  const [bubblePositions, setBubblePositions] = useState([]);
  const popupRef = useRef(null);

  // Close popup when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (popupRef.current && !popupRef.current.contains(event.target)) {
        setSelectedHolder(null);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // Adjustable parameters
  const TEXT_OFFSET = 16;
  const PERCENTAGE_GAP_SPECIAL = 30;
  const PERCENTAGE_GAP_ENLARGED = 20;
  const PERCENTAGE_GAP_DEFAULT = 15;
  const USERNAME_FONT = 'text-xs';
  const PERCENTAGE_FONT_SPECIAL = 'text-2xl';
  const PERCENTAGE_FONT_ENLARGED = 'text-base';
  const PERCENTAGE_FONT_DEFAULT = 'text-xs';
  const bubbleGap = 25;
  const specialBubbleGap = 35;
  const TEXT_THRESHOLD = 5;
  const GRADIENT_OFFSET_FACTOR = 0.46;
  const DOT_X_OFFSET_FACTOR = 0.12;
  const DOT_Y_OFFSET_FACTOR = 0.5;

  // Theme-based colors
  const edgeStart = isDark ? '#16b16e' : '#fa4eab';
  const edgeEnd = isDark ? '#65dca0' : '#e89ac4';
  const centerStart = isDark ? '#92f3bf' : '#e995c3';
  const centerEnd = isDark ? '#d3fede' : '#e1b5cd';
  const dotColorPositive = '#27a726';
  const dotColorNegative = '#cd3930';
  const popupBg = isDark ? 'bg-gray-800' : 'bg-white';
  const popupText = isDark ? 'text-white' : 'text-gray-900';
  const avatarFallbackBg = isDark ? 'bg-gray-600' : 'bg-gray-300';

  // SVG dimensions
  const width = 640;
  const height = 320;
  const padding = 20;

  // Calculate bubble sizes
  const totalPercentage = holders.reduce((sum, h) => sum + h.percentage, 0);
  const minRadius = 20;
  const maxRadius = 80;
  const areaScale = (width - 2 * padding) * (height - 2 * padding) / holders.length;

  // Identify the biggest holder
  const maxPercentage = Math.max(...holders.map(h => h.percentage));
  const bubbles = holders.map((holder) => {
    const r = Math.max(minRadius, Math.min(maxRadius, Math.sqrt(holder.percentage / totalPercentage * areaScale)));
    return { 
      ...holder, 
      r, 
      x: 0, 
      y: 0, 
      isBiggest: holder.percentage === maxPercentage,
      displayAddress: holder.address ? holder.address.substring(0, 6) : 'N/A' // Truncate address safely
    };
  });

  // Force simulation for bubble placement
  useEffect(() => {
    const placeBubbles = () => {
      const bubblesCopy = [...bubbles];
      const maxIterations = 100;
      const forceStrength = 0.05;

      // Initial placement
      bubblesCopy.forEach(bubble => {
        const effectiveRadius = bubble.isBiggest ? bubble.r + specialBubbleGap : bubble.r;
        bubble.x = padding + effectiveRadius + Math.random() * (width - 2 * padding - 2 * effectiveRadius);
        bubble.y = padding + effectiveRadius + Math.random() * (height - 2 * padding - 2 * effectiveRadius);
      });

      // Prevent overlaps
      for (let i = 0; i < maxIterations; i++) {
        bubblesCopy.forEach((bubble, idx) => {
          let vx = 0;
          let vy = 0;

          bubblesCopy.forEach((other, otherIdx) => {
            if (idx !== otherIdx) {
              const dx = bubble.x - other.x;
              const dy = bubble.y - other.y;
              const distance = Math.sqrt(dx * dx + dy * dy) || 0.01;
              const minDistance = (bubble.isBiggest ? bubble.r + specialBubbleGap : bubble.r + bubbleGap) + 
                                (other.isBiggest ? other.r + specialBubbleGap : other.r + bubbleGap);
              if (distance < minDistance) {
                const force = (minDistance - distance) * forceStrength;
                vx += (dx / distance) * force;
                vy += (dy / distance) * force;
              }
            }
          });

          // Boundary checks
          const effectiveRadius = bubble.isBiggest ? bubble.r + specialBubbleGap : bubble.r;
          const leftEdge = bubble.x - effectiveRadius;
          const rightEdge = bubble.x + effectiveRadius;
          const topEdge = bubble.y - effectiveRadius;
          const bottomEdge = bubble.y + effectiveRadius;

          if (leftEdge < padding) vx += (padding - leftEdge) * forceStrength * 2;
          if (rightEdge > width - padding) vx -= (rightEdge - (width - padding)) * forceStrength * 2;
          if (topEdge < padding) vy += (padding - topEdge) * forceStrength * 2;
          if (bottomEdge > height - padding) vy -= (bottomEdge - (height - padding)) * forceStrength * 2;

          bubble.x += vx;
          bubble.y += vy;
        });
      }

      setBubblePositions(bubblesCopy);
    };

    placeBubbles();
  }, [holders]);

  // Special path for the biggest holder
  const specialPathData = "m 32.505023,76.881444 c 0,0 5.370396,-3.109174 5.087741,-8.47957 -0.282652,-5.370396 -14.980574,-9.892835 -14.697922,-11.588748 0.282652,-1.695913 10.74079,-7.631615 23.742799,1.13061 13.002008,8.762225 2.826525,-28.265236 4.522438,-29.113194 1.695915,-0.847958 9.327528,20.068318 18.372404,16.393837 9.044877,-3.67448 7.348961,-23.460146 10.74079,-24.025451 3.391828,-0.565305 3.109177,19.785665 17.241795,19.220361 14.132622,-0.565306 16.959142,-14.980576 21.764232,-14.132618 4.80509,0.847956 -0.84796,13.849967 9.61018,18.08975 10.45814,4.239787 15.54588,-2.54387 22.32954,-4.239783 6.78365,-1.695916 10.45813,-2.261219 11.30609,-0.282655 0.84796,1.978568 -4.80509,-0.565303 -11.02344,4.522438 -6.21835,5.087745 -5.65305,9.327529 -1.97857,11.306096 3.67448,1.978567 42.96316,29.395846 43.81112,71.793703 0.84796,42.39786 -30.80911,93.84059 -86.77428,94.68854 C 50.594775,223.01272 13.284662,176.09243 13.002009,137.36905 12.719357,98.645677 32.505023,76.881444 32.505023,76.881444 Z";
  const originalHeight = 147;
  const originalWidth = 163;
  const originalCenterX = 81.5;
  const originalCenterY = 149.5;
  // Format time ago from timestamp
  const formatTimeAgo = (timestamp) => {
    if (!timestamp) return 'N/A';
    
    const now = new Date();
    const createdDate = new Date(timestamp);
    const diffYears = now.getFullYear() - createdDate.getFullYear();
    const diffMonths = now.getMonth() - createdDate.getMonth();
    
    let result = '';
    if (diffYears > 0) result += `${diffYears} Year${diffYears > 1 ? 's' : ''}`;
    if (diffMonths > 0) {
      if (result) result += ', ';
      result += `${diffMonths} Month${diffMonths > 1 ? 's' : ''}`;
    }
    return result ? `${result} Ago` : 'Just Created';
  };

  const circleCenterY = originalCenterY - (originalHeight * GRADIENT_OFFSET_FACTOR);

  return (
    <div className="space-y-6 relative">
      <div className="relative h-80 flex items-center justify-center">
        <svg width="100%" height="100%" viewBox={`0 0 ${width} ${height}`}>
          <defs>
            <radialGradient id="bubbleGradient" cx="0.5" cy="0.5" r="0.5">
              <stop offset="0%" style={{ stopColor: centerEnd }} />
              <stop offset="67%" style={{ stopColor: centerStart }} />
              <stop offset="75%" style={{ stopColor: edgeEnd }} />
              <stop offset="100%" style={{ stopColor: edgeStart }} />
            </radialGradient>
            <radialGradient id="specialBubbleGradient" cx="0.5" cy={circleCenterY / originalHeight} r="0.5">
              <stop offset="0%" style={{ stopColor: centerEnd }} />
              <stop offset="67%" style={{ stopColor: centerStart }} />
              <stop offset="75%" style={{ stopColor: edgeEnd }} />
              <stop offset="100%" style={{ stopColor: edgeStart }} />
            </radialGradient>
            <filter id="textOutline" x="-50%" y="-50%" width="200%" height="200%">
              <feMorphology operator="dilate" radius="1" in="SourceAlpha" result="outline" />
              <feFlood floodColor="white" floodOpacity="1" result="white" />
              <feComposite in="white" in2="outline" operator="in" result="stroke" />
              <feMerge>
                <feMergeNode in="stroke" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>
          <style>
            {`
              .bubble-content { transition: transform 0.3s ease; cursor: pointer; }
              .holder-text { transition: opacity 0.3s ease; }
            `}
          </style>
          {bubblePositions.map((bubble, index) => {
            const dotX = bubble.isBiggest ? (originalWidth * DOT_X_OFFSET_FACTOR) * ((2 * bubble.r) / originalHeight) : 0;
            const dotY = bubble.isBiggest ? -bubble.r * DOT_Y_OFFSET_FACTOR : -bubble.r * 0.34;
            const textY = dotY + TEXT_OFFSET;
            const percentageY = textY + (bubble.isBiggest ? PERCENTAGE_GAP_SPECIAL : 
                                        bubble.percentage > 5 ? PERCENTAGE_GAP_ENLARGED : 
                                        PERCENTAGE_GAP_DEFAULT);
            const showText = bubble.percentage >= TEXT_THRESHOLD || hoveredIndex === index;
            const percentageFontSize = bubble.isBiggest ? PERCENTAGE_FONT_SPECIAL : 
                                      bubble.percentage > 5 ? PERCENTAGE_FONT_ENLARGED : 
                                      PERCENTAGE_FONT_DEFAULT;

            return (
              <g
                key={index}
                transform={`translate(${bubble.x}, ${bubble.y})`}
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
                onClick={() => setSelectedHolder(bubble)}
              >
                <g
                  className="bubble-content"
                  transform={hoveredIndex === index ? 'scale(1.1)' : 'scale(1)'}
                >
                  {bubble.isBiggest ? (
                    <path
                      d={specialPathData}
                      fill="url(#specialBubbleGradient)"
                      transform={`scale(${(2 * bubble.r) / originalHeight}) translate(${-originalCenterX}, ${-originalCenterY})`}
                    />
                  ) : (
                    <circle
                      cx="0"
                      cy="0"
                      r={bubble.r}
                      fill="url(#bubbleGradient)"
                      opacity="0.8"
                    />
                  )}
                  <circle
                    cx={dotX}
                    cy={dotY}
                    r="3"
                    fill={bubble.isNegative ? dotColorNegative : dotColorPositive}
                  />
                  <g className="holder-text" opacity={showText ? 1 : 0}>
                    <text
                      x={dotX}
                      y={textY}
                      textAnchor="middle"
                      className={`${USERNAME_FONT} font-bold`}
                      fill="black"
                      filter="url(#textOutline)"
                    >
                      {bubble.displayAddress}
                    </text>
                    <text
                      x={dotX}
                      y={percentageY}
                      textAnchor="middle"
                      className={`${percentageFontSize} font-bold`}
                      fill="black"
                      filter="url(#textOutline)"
                    >
                      {bubble.percentage.toFixed(2)}%
                    </text>
                  </g>
                </g>
              </g>
            );
          })}
        </svg>
      </div>

      {/* Holder Details Popup */}
      {selectedHolder && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div 
            ref={popupRef}
            className={`${popupBg} ${popupText} rounded-lg p-6 w-full max-w-md shadow-xl`}
            style={{ borderRadius: '10px' }}
          >
            <div className="flex justify-between items-start mb-4">
              <div className="flex items-center">
                <div className="w-16 h-16 rounded-full overflow-hidden">
                  {selectedHolder.avatar ? (
                    <img 
                      src={selectedHolder.avatar} 
                      alt="Holder avatar" 
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className={`w-full h-full ${avatarFallbackBg} flex items-center justify-center text-white text-2xl font-bold`}>
                      {selectedHolder.address?.charAt(0).toUpperCase() || 'N/A'}
                    </div>
                  )}
                </div>
                <div className="ml-4">
                  <h3 className="text-xl font-bold">{selectedHolder.displayAddress}</h3>
                  <div className="flex items-center mt-1">
                    <span className="mr-2">Reliability rating:</span>
                    <div 
                      className={`w-3 h-3 rounded-full ${
                        selectedHolder.isNegative ? 'bg-red-500' : 'bg-green-500'
                      }`}
                    ></div>
                  </div>
                </div>
              </div>
              <button 
                onClick={() => setSelectedHolder(null)}
                className="text-gray-500 hover:text-gray-700 text-xl"
              >
                ×
              </button>
            </div>

            <div className="mb-4">
              <p>Wallet Created: {formatTimeAgo(selectedHolder.createdAt)}</p>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm">Hold percentage</p>
                <p className="text-2xl font-bold">{selectedHolder.percentage.toFixed(2)}%</p>
              </div>
              <div>
                <p className="text-sm">SOL Amount</p>
                <p className="text-2xl font-bold">
                  {selectedHolder.solAmount !== null && selectedHolder.solAmount !== undefined 
                    ? selectedHolder.solAmount.toFixed(3) 
                    : 'N/A'}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default HolderDistribution;