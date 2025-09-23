import React, { useMemo, useState } from "react";
import Header from "../components/Header.jsx";
import { useHeaderSearch } from "../hooks/useHeaderSearch.js";
import { motion, AnimatePresence } from "framer-motion";
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
  Migrated,
  AdvertisingBanner,
} from "../components/homepage/index.js";
import { useTheme } from "../contexts/ThemeContext.jsx";
import { useTokens } from "../hooks/useTokens.js";
import FavoriteStreamers from "../components/streamersPage/FavoriteStreamers.jsx";
import { useStreams } from "../hooks/useStreams.js";

const HomePage = ({ isStreamersPage = false }) => {
  // Animation variants for smooth page transitions
  const pageVariants = {
    initial: { x: "100%", opacity: 0 },
    animate: { x: 0, opacity: 1 },
    exit: { x: "-100%", opacity: 0 },
  };

  const pageTransition = {
    type: "tween",
    ease: "easeInOut",
    duration: 0.5,
  };
  const { streams, loadingStreams, errorStreams } = useStreams();
  const [selectedStream, setSelectedStream] = useState(null);
  const { isDark } = useTheme();
  const [selectedNetwork, setSelectedNetwork] = useState("Solana");
  const {
    allTokens,
    favoriteTokens,
    trendingTokens,
    watchListedTokens,
    migratedTokens,
    loading,
    loadingTrending,
  } = useTokens();
  const tokens = useMemo(() => {
    const map = new Map();
    favoriteTokens.forEach((token) => map.set(token.tokenId, token));
    watchListedTokens.forEach((token) => map.set(token.tokenId, token));
    migratedTokens.forEach((token) => map.set(token.tokenId, token));
    trendingTokens.forEach((token) => {
      if (!map.has(token.tokenId)) {
        map.set(token.tokenId, token);
      }
    });
    return Array.from(map.values());
  }, [favoriteTokens, trendingTokens, watchListedTokens]);

  const {
    searchQuery,
    searchResults,
    isSearching,
    searchError,
    hasSearched,
    handleSearch,
    clearSearch,
    refreshSearch,
  } = useHeaderSearch(tokens);

  const handleHeaderSearch = (query) => {
    handleSearch(query);
  };
  const handleStreamSelect = (stream) => {
    setSelectedStream(stream);
  };
  return (
    <div
      className={`flex flex-col min-h-screen ${
        isDark ? "bg-neutral-950" : "bg-[#EBEBEB]"
      }`}
    >
      {/* Header at the top */}
      <Header
        selectedNetwork={selectedNetwork}
        setSelectedNetwork={setSelectedNetwork}
        onSearch={handleHeaderSearch}
        showNewly={true}
        showRightSidebar={true}
      />

      <div className="flex flex-1">
        <div className="flex-1 lg:ml-[192px] lg:mr-[80px] overflow-auto">
          <div className="space-y-14 pb-16">
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
                  <HeroLiveStream stream={selectedStream} />
                  {/* Advertising Banner */}
                  <div id="advertising-banner">
                    <AdvertisingBanner />
                  </div>
                </div>

                <div id="live-now">
                  <LiveNow
                    streams={streams}
                    onStreamSelect={handleStreamSelect}
                    selectedStream={selectedStream}
                  />
                </div>
                <AnimatePresence mode="wait">
                  {!isStreamersPage ? (
                    <motion.div
                      key="homepage-content"
                      variants={pageVariants}
                      initial="initial"
                      animate="animate"
                      exit="exit"
                      transition={pageTransition}
                    >
                      <div id="migrated" className="mb-14">
                        <Migrated
                          migratedTokens={migratedTokens}
                          loading={loadingTrending}
                        />
                      </div>
                      <div id="trending" className="mb-14">
                        <Trending
                          trendingTokens={trendingTokens}
                          loading={loadingTrending}
                          isStreamersPage={false}
                        />
                      </div>
                      <div id="favorite-tokens">
                        <FavoriteTokens
                          favoriteTokens={favoriteTokens}
                          loading={loading}
                        />
                      </div>
                    </motion.div>
                  ) : (
                    <motion.div
                      key="streamers-content"
                      variants={pageVariants}
                      initial="initial"
                      animate="animate"
                      exit="exit"
                      transition={pageTransition}
                    >
                      <div id="trending" className="mb-14">
                        <Trending
                          trendingTokens={trendingTokens}
                          loading={loadingTrending}
                          isStreamersPage={true}
                        />
                      </div>
                      <div id="favorite-streamers">
                        <FavoriteStreamers />
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                <div id="stream-categories">
                  <StreamCategories />
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
