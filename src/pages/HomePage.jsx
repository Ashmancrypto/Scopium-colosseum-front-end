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
  RightSidebar,
  Migrated
} from '../components/homepage/index.js';
import { useTheme } from '../contexts/ThemeContext.jsx';
import { useTokens } from '../hooks/useTokens.js';

const HomePage = () => {
  const { isDark } = useTheme();
  const [selectedNetwork, setSelectedNetwork] = useState('Solana');
  const { allTokens, favoriteTokens, trendingTokens, watchListedTokens, migratedTokens, loading, loadingTrending } = useTokens();
  const tokens = useMemo(() => {
    const map = new Map();
    favoriteTokens.forEach(token => map.set(token.tokenId, token));
    watchListedTokens.forEach(token => map.set(token.tokenId, token));
    migratedTokens.forEach(token => map.set(token.tokenId, token));
    trendingTokens.forEach(token => {
      if (!map.has(token.tokenId)) {
        map.set(token.tokenId, token);
      }
    });
    return Array.from(map.values());
  }, [favoriteTokens, trendingTokens, watchListedTokens]);
  const trendingTokensMockup = [
    {
      id: 1,
      name: "Token 1",
      image: "/images/placeholders/tokenPlaceholders/dog.png",
      tokenValueChangePercentage: -2.4,
    },
    {
      id: 2,
      name: "Token 2",
      image: "/images/placeholders/tokenPlaceholders/shiba.png",
      tokenValueChangePercentage: 1.8,
    },
    {
      id: 3,
      name: "Token 3",
      image: "/images/placeholders/tokenPlaceholders/pepe.png",
      tokenValueChangePercentage: -3.1,
    },
    {
      id: 4,
      name: "Token 1",
      image: "/images/placeholders/tokenPlaceholders/dog.png",
      tokenValueChangePercentage: 2.5,
    },
    {
      id: 5,
      name: "Token 2",
      image: "/images/placeholders/tokenPlaceholders/shiba.png",
      tokenValueChangePercentage: -1.9,
    },
  ]

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
          <div className="overflow-y-scroll h-full no-scrollbar">
            {/* <NetworkSidebar /> */}
            <Newly
              newlyTokens={allTokens}
              loading={loadingTrending}
            />
          </div>
        </div>

        {/* Main content shifted to the right of the fixed sidebar */}
        <div className="flex-1 lg:ml-[192px] lg:mr-[80px] overflow-auto">
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
                <div id="migrated">
                  <Migrated
                    migratedTokens={migratedTokens}
                    loading={loadingTrending}
                  />
                  </div>
                <div id="trending">
                  <Trending
                    trendingTokens={trendingTokensMockup}
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
            watchListedTokens={watchListedTokens.slice(0, 10)}
          />
        </div>
      </div>
    </div>
  );
};

export default HomePage;
