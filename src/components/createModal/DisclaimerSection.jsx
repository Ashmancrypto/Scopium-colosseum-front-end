import React from 'react';
import { useTheme } from '../../contexts/ThemeContext.jsx';

const DisclaimerSection = () => {
  const { isDark } = useTheme();
  
  return (
    <div className={`border rounded-lg p-4 transition-colors duration-300 ${
      isDark 
        ? 'bg-gray-900/70 border-gray-500' 
        : 'bg-yellow-100 border-yellow-300'
    }`}>
      <div className="flex items-start space-x-2">
        <div className="w-4 h-4 bg-yellow-500 rounded-full flex-shrink-0 mt-0.5"></div>
        <p className={`text-xs transition-colors duration-300 ${
          isDark ? 'text-gray-200' : 'text-gray-800'
        }`}>
          Coin data (social links, banner, etc) can only be added now, and can't be changed or edited after creation
        </p>
      </div>
    </div>
  );
};

export default DisclaimerSection;