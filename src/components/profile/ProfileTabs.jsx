import React from 'react';
import { useTheme } from '../../contexts/ThemeContext.jsx';

const ProfileTabs = ({ activeTab, onTabChange, isOwnProfile }) => {
  const { isDark } = useTheme();

  const tabs = [
    { id: 'balances', label: 'Balances' },
    { id: 'created', label: 'Created' },
    { id: 'replies', label: 'Replies' },
    ...(isOwnProfile ? [{ id: 'notifications', label: 'Notifications' }] : [])
  ];

  return (
    <div className={`backdrop-blur-md rounded-xl border mb-4 lg:mb-6 transition-colors duration-300 ${
      isDark 
        ? 'bg-gray-900/90 border-gray-700' 
        : 'bg-white/90 border-gray-200'
    }`}>
      <div className={`flex border-b transition-colors duration-300 ${
        isDark ? 'border-gray-700' : 'border-gray-200'
      }`}>
        {tabs.map((tab) => (
          <button 
            key={tab.id}
            onClick={() => onTabChange(tab.id)}
            className={`px-3 sm:px-4 lg:px-6 py-3 lg:py-4 font-medium border-b-2 transition-colors text-sm sm:text-base flex-1 sm:flex-none ${
              activeTab === tab.id 
                ? `${isDark ? 'text-white' : 'text-gray-900'} border-pink-500` 
                : `${isDark ? 'text-gray-400 hover:text-white' : 'text-gray-600 hover:text-gray-900'} border-transparent`
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>
    </div>
  );
};

export default ProfileTabs;