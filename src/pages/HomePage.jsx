import React, { useMemo, useState } from 'react';
import Header from '../components/Header.jsx';
import { useHeaderSearch } from '../hooks/useHeaderSearch.js';
import {
  HeroLiveStream,
  LiveNow,
  Newly,
  Trending,
  FavoriteTokens,
  StreamCategories,
  NetworkSidebar,
  SearchResults,
  RightSidebar
} from '../components/homepage/index.js';
import { useTheme } from '../contexts/ThemeContext.jsx';
import { useTokens } from '../hooks/useTokens.js';

const HomePage = () => {
  const { isDark } = useTheme();
  const [selectedNetwork, setSelectedNetwork] = useState('Solana');
  const { allTokens, favoriteTokens, trendingTokens, loading, loadingTrending } = useTokens();
  console.log('debug all tokens on Home::', allTokens)
  const tokens = useMemo(() => {
    const map = new Map();
    favoriteTokens.forEach(token => map.set(token.tokenId, token));
    trendingTokens.forEach(token => {
      if (!map.has(token.tokenId)) {
        map.set(token.tokenId, token);
      }
    });
    return Array.from(map.values());
  }, [favoriteTokens, trendingTokens]);

  const {
    searchQuery,
    searchResults,
    isSearching,
    searchError,
    hasSearched,
    handleSearch,
    clearSearch,
    refreshSearch
  } = useHeaderSearch(tokens);

  const handleHeaderSearch = (query) => {
    handleSearch(query);
  };

  return (
    <div className={`flex flex-col min-h-screen ${isDark ? 'bg-neutral-950' : 'bg-[#EBEBEB]'}`}>
      {/* Header at the top */}
      <Header selectedNetwork={selectedNetwork} setSelectedNetwork={setSelectedNetwork} onSearch={handleHeaderSearch} />

      <div className="flex flex-1">
        {/* Fixed Sidebar */}
        <div
          className={`hidden lg:flex flex-col w-128 fixed top-20 bottom-0 pt-20 backdrop-blur-md border-r transition-colors duration-300 ${isDark ? 'bg-gray-900 border-gray-700' : 'bg-white/90 border-gray-200'
            }`}
        >
          <div className="p-4 overflow-y-scroll">
            {/* <NetworkSidebar /> */}
            <Newly
              newlyTokens={allTokens}
              loading={loadingTrending}
            />
          </div>
        </div>

        {/* Main content shifted to the right of the fixed sidebar */}
        <div className="flex-1 lg:ml-64 lg:mr-16 overflow-auto">
          <div className="space-y-8 pb-16">
            {hasSearched || isSearching ? (
              <SearchResults
                searchQuery={searchQuery}
                searchResults={searchResults}
                isSearching={isSearching}
                searchError={searchError}
                hasSearched={hasSearched}
                onClearSearch={clearSearch}
                onRefreshSearch={refreshSearch}
              />
            ) : (
              <>
                {/* Live Stream Section */}
                <div id="hero-live-stream">
                  <HeroLiveStream />
                </div>
                <div id="live-now">
                  <LiveNow />
                </div>
                <div id="trending">
                  <Trending
                    trendingTokens={trendingTokens}
                    loading={loadingTrending}
                  />
                </div>
                <div id="favorite-tokens">
                  <FavoriteTokens
                    favoriteTokens={favoriteTokens}
                    loading={loading}
                  />
                </div>
                <div id="stream-categories">
                  <StreamCategories />
                </div>
              </>
            )}
          </div>
        </div>

        {/* Fixed Right Sidebar */}
        <div className="hidden lg:flex fixed top-20 right-0 bottom-0 pt-20">
          <RightSidebar
            livestreamers={[]}
            tokens={trendingTokens.slice(0, 10)}
          />
        </div>
      </div>
    </div>
  );
};

export default HomePage;
