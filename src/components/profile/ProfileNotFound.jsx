import React from 'react';
import { User, ArrowLeft } from 'lucide-react';
import { useTheme } from '../../contexts/ThemeContext.jsx';

const ProfileNotFound = ({ username, onBackClick }) => {
  const { isDark } = useTheme();

  return (
    <div className={`backdrop-blur-md md:mt-44 rounded-xl border p-8 mb-6 transition-colors duration-300 ${
      isDark 
       ? 'bg-gray-700/90 border-gray-700' 
        : 'bg-white/90 border-gray-200'
    }`}>
      <div className="text-center py-12">
        <User className={`w-16 h-16 mx-auto mb-4 transition-colors duration-300 ${
          isDark ? 'text-gray-400' : 'text-gray-500'
        }`} />
        <h2 className={`text-2xl font-semibold mb-4 transition-colors duration-300 ${
          isDark ? 'text-white' : 'text-gray-900'
        }`}>Profile Not Found</h2>
        <p className={`mb-6 transition-colors duration-300 ${
          isDark ? 'text-gray-400' : 'text-gray-600'
        }`}>
          The user "@{username}" could not be found.
        </p>
        <button
          onClick={onBackClick}
          className={`text-white px-6 py-3 rounded-lg font-medium transition-all duration-200 transform hover:scale-105 flex items-center space-x-2 mx-auto ${
            isDark 
              ? 'bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700'
              : 'bg-gradient-to-r from-pink-500 to-pink-600 hover:from-pink-600 hover:to-pink-700'
          }`}
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Go Back</span>
        </button>
      </div>
    </div>
  );
};

export default ProfileNotFound;