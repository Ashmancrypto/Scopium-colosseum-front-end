import React from 'react';
import { Search, AlertCircle, RefreshCw, X } from 'lucide-react';
import { TokenCard, SectionHeader } from './index.js';
import { useTheme } from '../../contexts/ThemeContext.jsx';

const SearchResults = ({
  searchQuery,
  searchResults,
  isSearching,
  searchError,
  hasSearched,
  onClearSearch,
  onRefreshSearch
}) => {
  const { isDark } = useTheme();

  if (!hasSearched && !isSearching) {
    return null;
  }

  return (
    <div className="px-4 lg:px-6 mt-16 md:mt-44">
      <div className="max-w-7xl mx-auto">
        {/* Search Header */}
        <div className={`flex items-center justify-between mb-6 p-4 rounded-xl ${isDark ? 'bg-gray-800/50' : 'bg-white/50'
          }`}>
          <div className="flex items-center space-x-3">
            <Search className={`w-6 h-6 ${isDark ? 'text-gray-400' : 'text-gray-600'}`} />
            <div>
              <h2 className={`text-xl font-bold ${isDark ? 'text-white' : 'text-gray-900'
                }`}>
                Search Results
              </h2>
              <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'
                }`}>
                {isSearching ? 'Searching...' : `Results for "${searchQuery}"`}
              </p>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            {/* Refresh Button */}
            <button
              onClick={onRefreshSearch}
              disabled={isSearching}
              className={`p-2 rounded-lg transition-all duration-200 ${isSearching
                ? `${isDark ? 'text-gray-500' : 'text-gray-400'} cursor-not-allowed`
                : `${isDark ? 'text-gray-400 hover:text-white hover:bg-gray-700' : 'text-gray-600 hover:text-gray-900 hover:bg-gray-200'}`
                }`}
              title="Refresh search"
            >
              <RefreshCw className={`w-4 h-4 ${isSearching ? 'animate-spin' : ''}`} />
            </button>

            {/* Clear Search Button */}
            <button
              onClick={onClearSearch}
              title="Clear search"
              className={`flex items-center space-x-2 px-4 py-2 border rounded-lg transition-all duration-200
                ${isDark
                  ? 'bg-green-500/20 text-green-400 border-green-500/30 hover:bg-green-500/30 text-gray-400 hover:text-white hover:bg-gray-700'
                  : 'bg-pink-500/20 text-pink-400 border-pink-500/30 hover:bg-pink-500/30 text-gray-600 hover:text-gray-900 hover:bg-gray-200'
                }`}
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Loading State */}
        {isSearching && (
          <div className="flex items-center justify-center py-12">
            <div className="flex items-center space-x-3">
              <RefreshCw className="w-6 h-6 text-pink-400 animate-spin" />
              <span className={`text-lg ${isDark ? 'text-white' : 'text-gray-900'}`}>
                Searching tokens...
              </span>
            </div>
          </div>
        )}

        {/* Error State */}
        {searchError && !isSearching && (
          <div className="flex flex-col items-center justify-center py-12">
            <AlertCircle className="w-12 h-12 text-red-400 mb-4" />
            <p className="text-red-400 text-lg font-semibold mb-2">Search Error</p>
            <p className={`text-sm mb-4 text-center max-w-md ${isDark ? 'text-gray-400' : 'text-gray-600'
              }`}>
              {searchError}
            </p>
            <button
              onClick={onRefreshSearch}
              className="flex items-center space-x-2 px-4 py-2 bg-pink-500/20 text-pink-400 border border-pink-500/30 rounded-lg hover:bg-pink-500/30 transition-colors"
            >
              <RefreshCw className="w-4 h-4" />
              <span>Try Again</span>
            </button>
          </div>
        )}

        {/* Search Results */}
        {!isSearching && !searchError && hasSearched && (
          <>
            {searchResults.length > 0 ? (
              <>
                {/* Results Count */}
                <div className="mb-6">
                  <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                    Found {searchResults.length} token{searchResults.length !== 1 ? 's' : ''} matching "{searchQuery}"
                  </p>
                </div>

                {/* Results Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-6 gap-4">
                  {searchResults.map((token) => (
                    <TokenCard key={token._id || token.tokenId} token={token} />
                  ))}
                </div>
              </>
            ) : (
              /* No Results */
              <div className={`text-center py-12 rounded-xl ${isDark ? 'bg-gray-800/50' : 'bg-white/50'
                }`}>
                <Search className={`w-12 h-12 mx-auto mb-4 ${isDark ? 'text-gray-400' : 'text-gray-500'
                  }`} />
                <p className={`text-lg mb-2 ${isDark ? 'text-gray-300' : 'text-gray-700'
                  }`}>
                  No tokens found
                </p>
                <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'
                  }`}>
                  No tokens match your search for "{searchQuery}"
                </p>
                <p className={`text-xs mt-2 ${isDark ? 'text-gray-500' : 'text-gray-500'
                  }`}>
                  Try searching with different keywords, token symbols, or contract addresses
                </p>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default SearchResults;