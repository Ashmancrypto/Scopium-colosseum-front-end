import React from 'react';
import { useTheme } from '../../contexts/ThemeContext.jsx';

const HolderDistribution = ({ holders }) => {
  const { isDark } = useTheme();

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h3 className={`text-lg font-semibold mb-2 ${isDark ? 'text-white' : 'text-gray-900'}`}>
          Bubblemap
        </h3>
        <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
          Token holder distribution visualization
        </p>
      </div>

      {/* Bubble Chart */}
      <div className="relative h-80 flex items-center justify-center">
        <svg width="100%" height="100%" viewBox="0 0 400 300">
          {/* Main holder - 60% */}
          <circle
            cx="200"
            cy="150"
            r="80"
            fill="#ec4899"
            opacity="0.8"
          />
          <text
            x="200"
            y="145"
            textAnchor="middle"
            className="fill-white text-sm font-bold"
          >
            USERNAME
          </text>
          <text
            x="200"
            y="160"
            textAnchor="middle"
            className="fill-white text-lg font-bold"
          >
            60%
          </text>

          {/* Second holder - 25% */}
          <circle
            cx="320"
            cy="200"
            r="50"
            fill="#f472b6"
            opacity="0.8"
          />
          <text
            x="320"
            y="195"
            textAnchor="middle"
            className="fill-white text-xs font-bold"
          >
            USERNAME
          </text>
          <text
            x="320"
            y="208"
            textAnchor="middle"
            className="fill-white text-sm font-bold"
          >
            25%
          </text>

          {/* Third holder - 8% */}
          <circle
            cx="120"
            cy="80"
            r="30"
            fill="#f9a8d4"
            opacity="0.8"
          />
          <text
            x="120"
            y="77"
            textAnchor="middle"
            className="fill-white text-xs font-bold"
          >
            USERNAME
          </text>
          <text
            x="120"
            y="88"
            textAnchor="middle"
            className="fill-white text-xs font-bold"
          >
            8%
          </text>

          {/* Fourth holder - 5% */}
          <circle
            cx="80"
            cy="220"
            r="25"
            fill="#fbb6ce"
            opacity="0.8"
          />
          <text
            x="80"
            y="217"
            textAnchor="middle"
            className="fill-white text-xs font-bold"
          >
            USERNAME
          </text>
          <text
            x="80"
            y="228"
            textAnchor="middle"
            className="fill-white text-xs font-bold"
          >
            5%
          </text>

          {/* Fifth holder - 2% */}
          <circle
            cx="300"
            cy="80"
            r="18"
            fill="#fce7f3"
            opacity="0.8"
          />
          <text
            x="300"
            y="77"
            textAnchor="middle"
            className="fill-gray-800 text-xs font-bold"
          >
            USERNAME
          </text>
          <text
            x="300"
            y="88"
            textAnchor="middle"
            className="fill-gray-800 text-xs font-bold"
          >
            2%
          </text>
        </svg>
      </div>

      {/* Navigation dots */}
      <div className="flex items-center justify-center space-x-2">
        <div className="w-2 h-2 bg-pink-400 rounded-full"></div>
        <div className="w-2 h-2 bg-gray-300 rounded-full"></div>
      </div>

      {/* Holder List */}
      <div className="space-y-2">
        {holders.map((holder, index) => (
          <div key={index} className="flex items-center justify-between p-2 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
            <div className="flex items-center space-x-3">
              <div 
                className="w-4 h-4 rounded-full"
                style={{ backgroundColor: holder.color }}
              ></div>
              <span className={`text-sm font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>
                {holder.address}
              </span>
            </div>
            <div className="text-right">
              <div className={`text-sm font-semibold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                {holder.percentage}%
              </div>
              <div className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                {holder.amount}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HolderDistribution;