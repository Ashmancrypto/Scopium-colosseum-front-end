import React from 'react';
import { Loader } from 'lucide-react';
import { useTheme } from '../../contexts/ThemeContext.jsx';

const LoadingProfile = () => {
  const { isDark } = useTheme();

  return (
    <div className={`backdrop-blur-md rounded-xl border p-8 mb-6 transition-colors duration-300 ${
      isDark 
        ? 'bg-gray-900/90 border-gray-700' 
        : 'bg-white/90 border-gray-200'
    }`}>
      <div className="text-center py-12">
        <Loader className="w-12 h-12 text-pink-400 mx-auto mb-4 animate-spin" />
        <p className={`text-lg transition-colors duration-300 ${
          isDark ? 'text-white' : 'text-gray-900'
        }`}>Loading profile...</p>
      </div>
    </div>
  );
};

export default LoadingProfile;