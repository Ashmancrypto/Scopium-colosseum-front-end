import React, { useState } from 'react';
import { TokenGrid, TokenCard } from './index.js';
import { Loader, AlertCircle, RefreshCw } from 'lucide-react';
import { useTheme } from '../../contexts/ThemeContext.jsx';

const TokenSections = ({ tokens, loading, error, onRefresh }) => {
  const { isDark } = useTheme();
  const [showAllFavorites, setShowAllFavorites] = useState(false);
  const [showAllNew, setShowAllNew] = useState(false);

  if (loading) {
    return (
      <div className="flex items-center justify-center py-16">
        <Loader className={`w-8 h-8 ${isDark? 'text-green-400' : 'text-pink-400'} animate-spin`} />
        <span className={`ml-3 text-lg ${isDark ? 'text-white' : 'text-gray-900'}`}>
          Loading tokens...
        </span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center py-16">
        <AlertCircle className="w-12 h-12 text-red-400 mb-4" />
        <p className="text-red-400 text-lg font-semibold mb-2">Error Loading Tokens</p>
        <p className={`text-sm mb-4 text-center max-w-md ${
          isDark ? 'text-gray-400' : 'text-gray-600'
        }`}>
          {error}
        </p>
        {onRefresh && (
          <button
            onClick={onRefresh}
            className={`flex items-center space-x-2 px-4 py-2 border rounded-lg transition-colors ${
              isDark 
                ? 'bg-green-500/20 text-green-400 border-green-500/30 hover:bg-green-500/30'
                : 'bg-pink-500/20 text-pink-400 border-pink-500/30 hover:bg-pink-500/30'
            }`}
          >
            <RefreshCw className="w-4 h-4" />
            <span>Try Again</span>
          </button>
        )}
      </div>
    );
  }

  // Split tokens into favorite and new tokens
  const favoriteTokens = tokens?.filter(token => token.isFavorited) || [];
  const newTokens = tokens?.slice(0, 12) || []; // Show first 12 as new tokens

  const handleViewAllFavorites = () => {
    setShowAllFavorites(!showAllFavorites);
  };

  const handleViewAllNew = () => {
    setShowAllNew(!showAllNew);
  };

  return (
    <div className="space-y-8">

      {/* Favorite Tokens Section */}
      <div>
        <div className="flex items-center justify-between pb-4 mb-6">
          <h2 className={`text-xl font-semibold transition-colors duration-300 ${
            isDark ? 'text-white' : 'text-gray-900'
          }`}>
            Favorite Tokens
          </h2>
          {favoriteTokens.length > 8 && (
            <button 
              onClick={handleViewAllFavorites}
              className={`text-sm transition-colors ${
                isDark 
                  ? 'text-gray-400 hover:text-white' 
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              {showAllFavorites ? 'Show Less' : 'View All'}
            </button>
          )}
        </div>
        
        {favoriteTokens.length > 0 ? (
          <>
            {showAllFavorites ? (
              // Grid layout for "Show All"
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 lg:gap-6">
                {favoriteTokens.map((token, index) => (
                  <TokenCard 
                    key={token.mintAddr || token._id || index} 
                    token={token} 
                  />
                ))}
              </div>
            ) : (
              // Default grid layout (limited items)
              <TokenGrid tokens={favoriteTokens.slice(0, 8)} />
            )}
            {showAllFavorites && favoriteTokens.length > 0 && (
              <div className={`text-center text-sm mt-4 ${
                isDark ? 'text-gray-400' : 'text-gray-600'
              }`}>
                Showing all {favoriteTokens.length} favorite tokens
              </div>
            )}
          </>
        ) : (
          <div className={`text-center py-8 ${
            isDark ? 'text-gray-400' : 'text-gray-600'
          }`}>
            <p>No favorite tokens yet</p>
            <p className="text-sm mt-1">Start adding tokens to your favorites!</p>
          </div>
        )}
      </div>

      {/* New Tokens Section */}
      <div>
        <div className="flex items-center justify-between pb-4 mb-6">
          <h2 className={`text-xl font-semibold transition-colors duration-300 ${
            isDark ? 'text-white' : 'text-gray-900'
          }`}>
            New tokens
          </h2>
          
            <button 
              onClick={handleViewAllNew}
              className={`text-sm transition-colors ${
                isDark 
                  ? 'text-gray-400 hover:text-white' 
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              {showAllNew ? 'Show Less' : 'View All'}
            </button>

        </div>
        
        {newTokens.length > 0 ? (
          <>
            {showAllNew ? (
              // Grid layout for "Show All"
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 lg:gap-6">
                {newTokens.map((token, index) => (
                  <TokenCard 
                    key={token.mintAddr || token._id || index} 
                    token={token} 
                  />
                ))}
              </div>
            ) : (
              // Default grid layout (limited items)
              <TokenGrid tokens={newTokens.slice(0, 8)} />
            )}
            {showAllNew && newTokens.length > 0 && (
              <div className={`text-center text-sm mt-4 ${
                isDark ? 'text-gray-400' : 'text-gray-600'
              }`}>
                Showing all {newTokens.length} new tokens
              </div>
            )}
          </>
        ) : (
          <div className={`text-center py-8 ${
            isDark ? 'text-gray-400' : 'text-gray-600'
          }`}>
            <p>No new tokens available</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default TokenSections;