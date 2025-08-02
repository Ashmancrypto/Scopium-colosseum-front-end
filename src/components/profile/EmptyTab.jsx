import React from 'react';
import { Activity } from 'lucide-react';
import { useTheme } from '../../contexts/ThemeContext.jsx';

const EmptyTab = ({ title, description }) => {
  const { isDark } = useTheme();

  return (
    <div className="p-4 sm:p-6">
      <div className="text-center py-12">
        <Activity className={`w-12 h-12 mx-auto mb-4 transition-colors duration-300 ${
          isDark ? 'text-gray-400' : 'text-gray-500'
        }`} />
        <p className={`text-lg transition-colors duration-300 ${
          isDark ? 'text-gray-400' : 'text-gray-600'
        }`}>{title}</p>
        <p className={`text-sm mt-2 transition-colors duration-300 ${
          isDark ? 'text-gray-500' : 'text-gray-500'
        }`}>{description}</p>
      </div>
    </div>
  );
};

export default EmptyTab;