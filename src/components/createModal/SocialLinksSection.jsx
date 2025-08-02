import React from 'react';
import { Link, ChevronDown, ChevronUp } from 'lucide-react';
import { useTheme } from '../../contexts/ThemeContext.jsx';

const SocialLinksSection = ({ refs, state, disabled = false }) => {
  const { isDark } = useTheme();
  
  return (
    <div>
      <button
        type="button"
        onClick={() => !disabled && state.setShowSocialLinks(!state.showSocialLinks)}
        disabled={disabled}
        className={`flex items-center text-sm font-semibold transition-colors disabled:opacity-50 disabled:cursor-not-allowed ${
          isDark 
            ? 'text-green-400 hover:text-green-300' 
            : 'text-pink-600 hover:text-pink-700'
        }`}
      >
        <Link className="w-4 h-4 mr-2" />
        Add social links <span className={`ml-1 font-normal ${
          isDark ? 'text-gray-400' : 'text-gray-500'
        }`}>(optional)</span>
        {state.showSocialLinks ? (
          <ChevronUp className="w-4 h-4 ml-2" />
        ) : (
          <ChevronDown className="w-4 h-4 ml-2" />
        )}
      </button>

      {/* Social Links Inputs - Expandable Section */}
      {state.showSocialLinks && (
        <div className={`mt-4 space-y-3 p-4 rounded-lg border transition-colors duration-300 ${
          isDark 
           ? 'bg-gray-700/70 border-gray-500' 
            : 'bg-gray-50 border-gray-200'
        }`}>
          {/* Website */}
          <div className="relative">
            <input
              ref={refs.website}
              type="url"
              placeholder="Insert website link here"
              disabled={disabled}
              className={`w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 transition-all text-sm disabled:opacity-50 disabled:cursor-not-allowed ${
                isDark 
                  ? 'focus:ring-green-500 focus:border-green-500' 
                  : 'focus:ring-pink-500 focus:border-pink-500'
              } ${
                isDark 
                  ? 'bg-gray-600/90 border-gray-400 text-[#F7F7F7] placeholder-gray-400' 
                  : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500'
              }`}
            />
            <img 
              src="/images/icons/website.svg" 
              alt="Website" 
              className={`absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 opacity-60 transition-all duration-300 ${
                isDark ? 'filter invert' : ''
              }`}
            />
          </div>

          {/* Telegram */}
          <div className="relative">
            <input
              ref={refs.telegramLink}
              type="url"
              placeholder="Insert telegram link here"
              disabled={disabled}
              className={`w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 transition-all text-sm disabled:opacity-50 disabled:cursor-not-allowed ${
                isDark 
                  ? 'focus:ring-green-500 focus:border-green-500' 
                  : 'focus:ring-pink-500 focus:border-pink-500'
              } ${
                isDark 
                  ? 'bg-gray-600/90 border-gray-400 text-[#F7F7F7] placeholder-gray-400' 
                  : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500'
              }`}
            />
            <img 
              src="/images/icons/telegram.svg" 
              alt="Telegram" 
              className={`absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 opacity-60 transition-all duration-300 ${
                isDark ? 'filter invert' : ''
              }`}
            />
          </div>

          {/* Twitter/X */}
          <div className="relative">
            <input
              ref={refs.twitterLink}
              type="url"
              placeholder="Input X link here"
              disabled={disabled}
              className={`w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 transition-all text-sm disabled:opacity-50 disabled:cursor-not-allowed ${
                isDark 
                  ? 'focus:ring-green-500 focus:border-green-500' 
                  : 'focus:ring-pink-500 focus:border-pink-500'
              } ${
                isDark 
                  ? 'bg-gray-600/90 border-gray-400 text-[#F7F7F7] placeholder-gray-400' 
                  : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500'
              }`}
            />
            <img 
              src="/images/icons/x.svg" 
              alt="X (Twitter)" 
              className={`absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 opacity-60 transition-all duration-300 ${
                isDark ? 'filter invert' : ''
              }`}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default SocialLinksSection;