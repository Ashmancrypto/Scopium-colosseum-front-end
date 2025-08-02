import React from 'react';
import { useTheme } from '../../contexts/ThemeContext.jsx';

const SectionHeader = ({ 
  icon, 
  title, 
  onViewAll, 
  showViewAll = true,
  viewAllText = "View All",
  className = '' 
}) => {
  const { isDark } = useTheme();

  return (
    <div className={`flex items-center justify-between mb-6 p-2 rounded-xl ${
      isDark ? 'bg-green-500' : 'bg-pink-500'
    }`}>
      <div className="flex items-center space-x-3">
        <div className="h-8 flex items-center justify-center">
          <img 
            src={isDark? '/images/icons/section-dark.png' : '/images/icons/section.png'} 
            alt="Section" 
            className="w-12 h-16 filter"
          />
        </div>
        <h2 className={`text-xl font-bold ${
          isDark ? 'text-white' : 'text-[#F7F7F7]'
        }`}>
          {title}
        </h2>
      </div>

      {showViewAll && (
        <button
          onClick={onViewAll}
          className='px-4 py-1 rounded-xl font-medium transition-colors bg-white text-gray-900 hover:bg-gray-50'>
          {viewAllText}
        </button>
      )}
    </div>
  );
};

export default SectionHeader;