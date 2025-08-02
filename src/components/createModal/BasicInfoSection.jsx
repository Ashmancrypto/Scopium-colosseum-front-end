import React from 'react';
import { ChevronDown } from 'lucide-react';
import { useTheme } from '../../contexts/ThemeContext.jsx';

const BasicInfoSection = ({ refs, state, disabled = false }) => {
  const { isDark } = useTheme();
  
  const categories = [
    { value: 1, label: 'meme' },
    { value: 2, label: 'Fame' },
    { value: 3, label: 'AI' },
    { value: 4, label: 'Utility' },
    { value: 5, label: 'Other' }
  ];

  return (
    <>
      {/* Token Name and Ticker Row */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Token Name */}
        <div>
          <label className={`block text-sm font-medium mb-2 transition-colors duration-300 ${
            isDark ? 'text-[#F7F7F7]' : 'text-gray-800'
          }`}>
            Token name
          </label>
          <input
            ref={refs.coinName}
            type="text"
            placeholder="Name your coin"
            disabled={disabled}
            className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 transition-all text-sm disabled:opacity-50 disabled:cursor-not-allowed ${
              isDark 
                ? 'focus:ring-green-500 focus:border-green-500' 
                : 'focus:ring-pink-500 focus:border-pink-500'
            } ${
              isDark 
               ? 'bg-gray-700/90 border-gray-500 text-[#F7F7F7] placeholder-gray-400' 
                : 'bg-white border-gray-300 text-gray-900 placeholder-gray-600'
            }`}
            required
          />
        </div>

        {/* Ticker */}
        <div>
          <label className={`block text-sm font-medium mb-2 transition-colors duration-300 ${
            isDark ? 'text-[#F7F7F7]' : 'text-gray-800'
          }`}>
            Ticker
          </label>
          <input
            ref={refs.ticker}
            type="text"
            placeholder="Add a coin ticker (e.g. DOGE)"
            disabled={disabled}
            className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 transition-all text-sm disabled:opacity-50 disabled:cursor-not-allowed ${
              isDark 
                ? 'focus:ring-green-500 focus:border-green-500' 
                : 'focus:ring-pink-500 focus:border-pink-500'
            } ${
              isDark 
               ? 'bg-gray-700/90 border-gray-500 text-[#F7F7F7] placeholder-gray-400' 
                : 'bg-white border-gray-300 text-gray-900 placeholder-gray-600'
            }`}
            maxLength="10"
            required
          />
        </div>
      </div>

      {/* Description */}
      <div>
        <label className={`block text-sm font-medium mb-2 transition-colors duration-300 ${
          isDark ? 'text-[#F7F7F7]' : 'text-gray-800'
        }`}>
          Description <span className={`${
            isDark ? 'text-gray-500' : 'text-gray-500'
          }`}>(optional)</span>
        </label>
        <textarea
          ref={refs.description}
          placeholder="Write a short description"
          rows="3"
          disabled={disabled}
          className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 transition-all resize-none text-sm disabled:opacity-50 disabled:cursor-not-allowed ${
            isDark 
              ? 'focus:ring-green-500 focus:border-green-500' 
              : 'focus:ring-pink-500 focus:border-pink-500'
          } ${
            isDark 
             ? 'bg-gray-700/90 border-gray-500 text-[#F7F7F7] placeholder-gray-400' 
              : 'bg-white border-gray-300 text-gray-900 placeholder-gray-600'
          }`}
        />
      </div>

      {/* Category */}
      <div>
        <label className={`block text-sm font-medium mb-2 transition-colors duration-300 ${
          isDark ? 'text-[#F7F7F7]' : 'text-gray-800'
        }`}>
          Choose a category
        </label>
        <div className="relative">
          <select
            ref={refs.categoryBox}
            value={state.category}
            onChange={(e) => state.setCategory(parseInt(e.target.value))}
            disabled={disabled}
            className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 transition-all text-sm appearance-none cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed ${
              isDark 
                ? 'focus:ring-green-500 focus:border-green-500' 
                : 'focus:ring-pink-500 focus:border-pink-500'
            } ${
              isDark 
               ? 'bg-gray-700/90 border-gray-500 text-[#F7F7F7]' 
                : 'bg-white border-gray-300 text-gray-900'
            }`}
            required
          >
            <option value="" disabled className={isDark ? 'text-gray-500' : 'text-gray-500'}>Select category</option>
            {categories.map((cat) => (
              <option 
                key={cat.value} 
                value={cat.value} 
               className={isDark ? 'text-[#F7F7F7] bg-gray-700' : 'text-gray-900 bg-white'}
              >
                {cat.label}
              </option>
            ))}
          </select>
          <ChevronDown className={`absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 pointer-events-none transition-colors duration-300 ${
            isDark ? 'text-gray-300' : 'text-gray-700'
          }`} />
        </div>
      </div>
    </>
  );
};

export default BasicInfoSection;