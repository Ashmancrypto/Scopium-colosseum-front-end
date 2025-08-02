import React from 'react';
import { useTheme } from '../../contexts/ThemeContext.jsx';

const FilterSidebar = ({
  activeFilters,
  onFilterChange,
  onClearFilters,
  onHideFilters
}) => {
  const { isDark } = useTheme();

  const filterSections = [
    {
      title: 'Trending Tokens',
      key: 'trending',
      icon: isDark ? '/images/icons/trending-dark.png' : '/images/icons/trending.png',
      options: [
        { id: 'newly_created', label: 'Newly created' },
        { id: 'popular', label: 'Popular' },
        { id: 'scopium_picks', label: 'Scopium picks' },
        { id: 'biggest_gainers', label: 'Biggest gainers' },
        { id: 'biggest_losers', label: 'Biggest losers' }
      ]
    },
    {
      title: 'Market Cap',
      key: 'marketCap',
      icon: isDark ? '/images/icons/market-dark.png' : '/images/icons/market.png',
      options: [
        { id: 'high_to_low', label: 'High to low' },
        { id: 'low_to_high', label: 'Low to high' }
      ]
    },
    {
      title: 'Creation Categories',
      key: 'categories',
      icon: isDark ? '/images/icons/category-dark.png' : '/images/icons/category.png',
      options: [
        { id: 'meme', label: 'Meme' },
        { id: 'fame', label: 'Fame' },
        { id: 'ai', label: 'AI' },
        { id: 'utility', label: 'Utility' },
        { id: 'other', label: 'Other' },
      ]
    },
    {
      title: 'User-Specific',
      key: 'userSpecific',
      icon: isDark ? '/images/icons/favorite-dark.png' : '/images/icons/favorite.png',
      options: [
        { id: 'watchlist', label: 'Watchlist' }
      ]
    }
  ];

  const handleFilterToggle = (sectionKey, optionId) => {
    const isActive = activeFilters[sectionKey].includes(optionId);
    onFilterChange(sectionKey, optionId, !isActive);
  };

  const hasActiveFilters = Object.values(activeFilters).some(filters => filters.length > 0);

  return (
    <div className="p-4 h-full">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h2 className={`text-lg font-semibold transition-colors duration-300 ${isDark ? 'text-white' : 'text-gray-900'
          }`}>
          Filters
        </h2>
        <button
          onClick={onHideFilters}
          className={`p-1 rounded transition-colors ${isDark
              ? 'text-gray-400 hover:text-white hover:bg-gray-700'
              : 'text-gray-600 hover:text-gray-900 hover:bg-gray-200'
            }`}
        >
          <img
            src="/images/icons/hide.svg"
            alt="Hide filters"
            className={`w-4 h-4 ${isDark ? 'filter invert' : ''}`}
          />
        </button>
      </div>

      {/* Clear Filters */}
      {hasActiveFilters && (
        <button
          onClick={onClearFilters}
          className={`text-sm mb-4 transition-colors ${isDark
              ? 'text-green-400 hover:text-[#00b96e]'
              : 'text-black hover:text-pink-700'
            }`}
        >
          Clear filters ×
        </button>
      )}

      {/* Filter Sections */}
      <div className="space-y-6">
        {filterSections.map((section) => (
          <div key={section.key}>
            <div className="flex items-center mb-3">
              <img
                src={section.icon}
                alt={section.title}
                className='w-6 h-6 mr-2'
              />
              <h3 className={`text-sm font-medium transition-colors duration-300 ${isDark ? 'text-gray-300' : 'text-gray-700'
                }`}>
                {section.title}
              </h3>
            </div>

            <div className="space-y-2">
              {section.options.map((option) => {
                const isActive = activeFilters[section.key].includes(option.id);

                return (
                  <label
                    key={option.id}
                    className={`flex items-center space-x-3 p-2 rounded-lg cursor-pointer transition-colors group ${isDark ? 'hover:bg-gray-700/50' : 'hover:bg-gray-100/50'
                      }`}
                  >
                    <span className={`text-sm transition-colors flex-1 ${isActive
                        ? isDark
                          ? 'text-green-400 font-medium'
                          : 'text-pink-500 font-medium'
                        : isDark
                          ? 'text-gray-400 group-hover:text-white'
                          : 'text-gray-600 group-hover:text-gray-900'
                      }`}>
                      {option.label}
                    </span>
                    <div className="relative flex-shrink-0">
                      <input
                        type="checkbox"
                        checked={isActive}
                        onChange={() => handleFilterToggle(section.key, option.id)}
                        className="sr-only"
                      />
                      <div className={`w-4 h-4 rounded border-2 transition-all duration-200 ${isActive
                          ? isDark
                            ? 'bg-green-400 border-green-400'
                            : 'bg-pink-500 border-pink-500'
                          : isDark
                            ? 'border-gray-500 group-hover:border-gray-400'
                            : 'border-gray-400 group-hover:border-gray-300'
                        }`}>
                        {isActive && (
                          <svg
                            className="w-3 h-3 text-white absolute top-0.5 left-0.5"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                          >
                            <path
                              fillRule="evenodd"
                              d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                              clipRule="evenodd"
                            />
                          </svg>
                        )}
                      </div>
                    </div>
                  </label>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FilterSidebar;
