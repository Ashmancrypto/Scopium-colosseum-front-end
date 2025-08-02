import React, { useState } from 'react';
import { useTheme } from '../../contexts/ThemeContext.jsx';
import SectionHeader from './SectionHeader.jsx';
import DragScroll from '../../hooks/dragScroll/DragScroll.jsx';

const StreamCategories = () => {
  const { isDark } = useTheme();
  const [showAll, setShowAll] = useState(false);

  const categories = [
    {
      id: 'trending',
      title: 'Trending Streamers',
      icon: '/images/categories/Trending.png',
    },
    {
      id: 'crypto_education',
      title: 'Crypto Education',
      icon: '/images/categories/Education.png',
    },
    {
      id: 'most_popular',
      title: 'Most Popular',
      icon: '/images/categories/Popular.png',
    },
    {
      id: 'gaming',
      title: 'Gaming',
      icon: '/images/categories/Gaming.png',
    },
    {
      id: 'market_insights',
      title: 'Market Insights',
      icon: '/images/categories/Market.png',
    },
    {
      id: 'sponsored',
      title: 'Sponsored',
      icon: '/images/categories/Sponsored.png',
    }
  ];

  const handleViewAll = () => {
    setShowAll(!showAll);
  };

  const handleCategoryClick = (categoryId) => {
    console.log('Category clicked:', categoryId);
    // TODO: Implement category navigation/filtering
  };

  return (
    <div className="px-4 lg:pl-14 lg:pr-6">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <SectionHeader
          title="Stream Categories"
          onViewAll={handleViewAll}
          viewAllText={showAll ? "Show Less" : "View All"}
        />

        {/* Categories Grid */}
        {showAll ? (
          // Grid layout for "Show All"
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4">
            {categories.map((category) => (
              <div
                key={category.id}
                onClick={() => handleCategoryClick(category.id)}
                className={`group cursor-pointer rounded-xl p-6 transition-all duration-300 hover:scale-105 border ${
                  isDark 
                    ? 'bg-gray-900/90 border-gray-700 hover:bg-gray-700/90 hover:border-gray-600' 
                    : 'bg-white/90 border-gray-200 hover:bg-gray-50 hover:border-gray-300'
                }`}
              >
                <div className="flex flex-col items-center text-center space-y-3">
                  {/* Icon */}
                  <div className="w-16 h-16 flex items-center justify-center">
                    <img 
                      src={category.icon} 
                      alt={category.title}
                      className="w-12 h-12 object-contain"
                    />
                  </div>
                  
                  {/* Title */}
                  <h3 className={`font-semibold text-sm transition-colors ${
                    isDark 
                      ? 'text-white group-hover:text-pink-400' 
                      : 'text-gray-900 group-hover:text-pink-600'
                  }`}>
                    {category.title}
                  </h3>
                </div>
              </div>
            ))}
          </div>
        ) : (
          // Horizontal scroll layout (default)
          <DragScroll className="flex space-x-4 overflow-x-auto pb-4 scrollbar-hide">
            {categories.map((category) => (
              <div
                key={category.id}
                onClick={() => handleCategoryClick(category.id)}
                className={`group cursor-pointer rounded-xl p-6 transition-all duration-300 hover:scale-105 border flex-shrink-0 w-48 ${
                  isDark 
                    ? 'bg-gray-900/90 border-gray-700 hover:bg-gray-700/90 hover:border-gray-600' 
                    : 'bg-white/90 border-gray-200 hover:bg-gray-50 hover:border-gray-300'
                }`}
              >
                <div className="flex flex-col items-center text-center space-y-3">
                  {/* Icon */}
                  <div className="w-24 h-24 flex items-center justify-center">
                    <img 
                      src={category.icon} 
                      alt={category.title}
                      className="w-24 h-24 object-contain"
                    />
                  </div>
                  
                  {/* Title */}
                  <h3 className={`font-semibold text-sm transition-colors ${
                    isDark 
                      ? 'text-white group-hover:text-pink-400' 
                      : 'text-gray-900 group-hover:text-pink-600'
                  }`}>
                    {category.title}
                  </h3>
                </div>
              </div>
            ))}
          </DragScroll>
        )}
      </div>
    </div>
  );
};

export default StreamCategories;