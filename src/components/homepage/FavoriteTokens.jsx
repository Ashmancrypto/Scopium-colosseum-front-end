import React, { useState } from 'react';
import { Heart } from 'lucide-react';
import { TokenCard, SectionHeader } from './index.js';
import { useTheme } from '../../contexts/ThemeContext.jsx';
import DragScroll from '../../hooks/dragScroll/DragScroll.jsx';

const FavoriteTokens = ({ favoriteTokens, loading }) => {
  const { isDark } = useTheme();
  const [showAllFavorites, setShowAllFavorites] = useState(false);

  const handleViewAll = () => {
    setShowAllFavorites(!showAllFavorites);
  };

  return (
    <div className="">
      <div className="max-w-7xl mx-auto">
        <SectionHeader
          title="Your Favorite Tokens"
          onViewAll={handleViewAll}
          viewAllText={showAllFavorites ? "Show Less" : "View All"}
          paddingX={20}
        />

        {/* Favorite Tokens Grid */}
        {loading ? (
          // Loading skeleton
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-6 gap-4">
            {[...Array(6)].map((_, index) => (
              <div key={index} className={`animate-pulse rounded-xl p-4 ${isDark ? 'bg-gray-900' : 'bg-white'
                }`}>
                <div className="flex items-center space-x-3">
                  <div className={`w-12 h-12 rounded-full ${isDark ? 'bg-gray-700' : 'bg-gray-300'
                    }`}></div>
                  <div className="flex-1">
                    <div className={`h-4 rounded w-16 mb-2 ${isDark ? 'bg-gray-700' : 'bg-gray-300'
                      }`}></div>
                    <div className={`h-3 rounded w-20 ${isDark ? 'bg-gray-700' : 'bg-gray-300'
                      }`}></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : favoriteTokens.length > 0 ? (
          <>
            {showAllFavorites ? (
              // Grid layout for "Show All"
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-6 gap-4">
                {favoriteTokens.map((token) => (
                  <TokenCard key={token._id || token.tokenId} token={token} />
                ))}
              </div>
            ) : (
              // Default horizontal scroll layout
              <DragScroll className='flex space-x-4 overflow-x-auto pb-4'>
                {favoriteTokens.slice(0, 6).map((token) => (
                  <div key={token._id || token.tokenId} className="min-w-[200px] flex-shrink-0">
                    <TokenCard token={token} />
                  </div>
                ))}
              </DragScroll>
            )}
            
            {/* Show count when viewing all in grid */}
            {showAllFavorites && favoriteTokens.length > 0 && (
              <div className={`text-center text-sm mt-4 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                Showing all {favoriteTokens.length} favorite tokens
              </div>
            )}
          </>
        ) : (
          <div className={`text-center py-12 rounded-xl ${isDark ? 'bg-gray-900/50' : 'bg-white/50'
            }`}>
            <Heart className={`w-12 h-12 mx-auto mb-4 ${isDark ? 'text-gray-400' : 'text-gray-500'
              }`} />
            <p className={`text-lg mb-2 ${isDark ? 'text-gray-300' : 'text-gray-700'
              }`}>
              No favorite tokens yet
            </p>
            <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'
              }`}>
              Start adding tokens to your favorites to see them here!
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default FavoriteTokens;