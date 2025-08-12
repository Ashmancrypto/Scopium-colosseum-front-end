import { useState } from 'react';
import { TokenCard, LiveStreamCard, SectionHeader } from './index.js';
import { useTheme } from '../../contexts/ThemeContext.jsx';
import DragScroll from '../../hooks/dragScroll/DragScroll.jsx';

const Migrated = ({ migratedTokens, loading }) => {
  const { isDark } = useTheme();
  const [showAll, setShowAll] = useState(false);


  const handleViewAll = () => {
    setShowAll(!showAll);
  };

  return (
    <div className="px-4 lg:pl-14 lg:pr-6">
      <div className="max-w-7xl mx-auto">
        <SectionHeader
          title="Migrated"
          onViewAll={handleViewAll}
          viewAllText={showAll ? "Show Less" : "View All"}
        />

        {showAll ? (
          // Grid layout for "Show All" - Tokens first, then livestreams
          <div className="space-y-8">
            {/* All Trending Tokens in Grid */}
            {migratedTokens.length > 0 && (
              <div>
                <h3 className={`text-lg font-semibold mb-4 ${isDark ? 'text-white' : 'text-gray-900'
                  }`}>
                  Trending Tokens ({migratedTokens.length})
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-6 gap-4">
                  {loading ? (
                    [...Array(12)].map((_, index) => (
                      <div
                        key={index}
                        className={`animate-pulse rounded-xl p-4 ${isDark ? 'bg-gray-900' : 'bg-white'}`}
                      >
                        <div className="flex items-center space-x-3">
                          <div className={`w-12 h-12 rounded-full ${isDark ? 'bg-gray-700' : 'bg-gray-300'}`}></div>
                          <div className="flex-1">
                            <div className={`h-4 rounded w-16 mb-2 ${isDark ? 'bg-gray-700' : 'bg-gray-300'}`}></div>
                            <div className={`h-3 rounded w-20 ${isDark ? 'bg-gray-700' : 'bg-gray-300'}`}></div>
                          </div>
                        </div>
                      </div>
                    ))
                  ) : (
                    migratedTokens.map((token) => (
                      <TokenCard key={token._id || token.tokenId} token={token} />
                    ))
                  )}
                </div>
              </div>
            )}
          </div>
        ) : (
          // Default horizontal scroll layout
          <div className="space-y-8">
            {/* Trending Tokens - Horizontal Scroll */}
            <div>
              <DragScroll className='flex space-x-4 overflow-x-auto'>
                {loading ? (
                  [...Array(6)].map((_, index) => (
                    <div
                      key={index}
                      className={`min-w-[200px] flex-shrink-0 animate-pulse rounded-xl p-4 ${isDark ? 'bg-gray-900' : 'bg-white'}`}
                    >
                      <div className="flex items-center space-x-3">
                        <div className={`w-12 h-12 rounded-full ${isDark ? 'bg-gray-700' : 'bg-gray-300'}`}></div>
                        <div className="flex-1">
                          <div className={`h-4 rounded w-16 mb-2 ${isDark ? 'bg-gray-700' : 'bg-gray-300'}`}></div>
                          <div className={`h-3 rounded w-20 ${isDark ? 'bg-gray-700' : 'bg-gray-300'}`}></div>
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  migratedTokens.slice(0, 6).map((token) => (
                    <div key={token._id || token.tokenId} className="min-w-[200px] flex-shrink-0">
                      <TokenCard token={token} />
                    </div>
                  ))
                )}
              </DragScroll>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Migrated;