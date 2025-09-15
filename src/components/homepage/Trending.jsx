import { useEffect, useRef, useState, useContext } from "react";
import { TokenCard, LiveStreamCard, SectionHeader } from "./index.js";
import { useTheme } from "../../contexts/ThemeContext.jsx";
import DragScroll from "../../hooks/dragScroll/DragScroll.jsx";
import { formatTokenMarketCap } from "../../utils/formatters.js";
import { solPriceContext } from "../../contexts/SolPriceContext.jsx";
import { useTokens } from "../../hooks/useTokens.js";
import { setFavor } from "../../api/user/index.js";

const Trending = () => {
  const { isDark } = useTheme();
  const { solPrice } = useContext(solPriceContext);
  const [showAll, setShowAll] = useState(false);
  const { trendingTokens, loading } = useTokens();

  // Mock trending live streams
  const trendingStreams = [
    {
      id: 1,
      title: "Behind the Scenes: Creating a 1/1 NFT Art",
      username: "ArtByLuna",
      followers: "87.5k followers",
      avatar: "/images/sample/sample2.png",
      thumbnail: "/images/sample/sample2.png",
      viewCount: "3.1k",
      isLive: true,
    },
    {
      id: 2,
      title: "Top 10 NFT Drops This Week!",
      username: "PixelHunter",
      followers: "56k followers",
      avatar: "/images/sample/sample2.png",
      thumbnail: "/images/sample/sample2.png",
      viewCount: "2.7k",
      isLive: true,
    },
    {
      id: 3,
      title: "Unboxing Rare NFTs: What Did We Get?",
      username: "CryptoCollectorX",
      followers: "142k followers",
      avatar: "/images/sample/sample1.png",
      thumbnail: "/images/sample/sample1.png",
      viewCount: "6.8k",
      isLive: true,
    },
    {
      id: 4,
      title: "Live Mint Party: Join and Win Giveaways!",
      username: "NFT_Wizard",
      followers: "203k followers",
      avatar: "/images/sample/sample3.png",
      thumbnail: "/images/sample/sample3.png",
      viewCount: "12.4k",
      isLive: true,
    },
    {
      id: 5,
      title: "Q&A: Ask Me Anything About NFTs & Crypto",
      username: "BlockChainBabe",
      followers: "311k followers",
      avatar: "/images/sample/sample1.png",
      thumbnail: "/images/sample/sample1.png",
      viewCount: "15.9k",
      isLive: true,
    },
  ];

  const handleViewAll = () => {
    setShowAll(!showAll);
  };

  return (
    <div className="">
      <div className="max-w-7xl mx-auto">
        <SectionHeader
          title="Trending"
          onViewAll={handleViewAll}
          viewAllText={showAll ? "Show Less" : "View All"}
          paddingX={20}
        />

        <div className="mt-7">
          {trendingTokens && trendingTokens.length > 0 ? (
            showAll ? (
              // Grid layout for "Show All" - Tokens first, then livestreams
              <div className="space-y-8 px-5">
                {/* All Trending Tokens in Grid */}
                {console.log(
                  "Trending tokens length check:",
                  trendingTokens?.length
                )}
                <div>
                  <h3
                    className={`text-lg font-semibold mb-4 ${
                      isDark ? "text-white" : "text-gray-900"
                    }`}
                  >
                    Trending Tokens ({trendingTokens?.length || 0})
                    {!trendingTokens && " - Loading..."}
                    {trendingTokens?.length === 0 && " - No tokens found"}
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-6 gap-4">
                    {loading
                      ? [...Array(12)].map((_, index) => (
                          <div
                            key={index}
                            className={`animate-pulse rounded-xl p-4 ${
                              isDark ? "bg-gray-900" : "bg-white"
                            }`}
                          >
                            <div className="flex items-center space-x-3">
                              <div
                                className={`w-12 h-12 rounded-full ${
                                  isDark ? "bg-gray-700" : "bg-gray-300"
                                }`}
                              ></div>
                              <div className="flex-1">
                                <div
                                  className={`h-4 rounded w-16 mb-2 ${
                                    isDark ? "bg-gray-700" : "bg-gray-300"
                                  }`}
                                ></div>
                                <div
                                  className={`h-3 rounded w-20 ${
                                    isDark ? "bg-gray-700" : "bg-gray-300"
                                  }`}
                                ></div>
                              </div>
                            </div>
                          </div>
                        ))
                      : trendingTokens.map((token, index) => (
                          <TokenCard
                            key={token.tokenId || index}
                            token = {token}
                          
                          />
                        ))}
                  </div>
                </div>

                {/* All Trending Live Streams in Grid */}
                <div className="mt-7">
                  <h3
                    className={`text-lg font-semibold mb-4 ${
                      isDark ? "text-white" : "text-gray-900"
                    }`}
                  >
                    Trending Live Streams ({trendingStreams.length})
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {trendingStreams.map((stream) => (
                      <LiveStreamCard key={stream.id} stream={stream} />
                    ))}
                  </div>
                </div>
              </div>
            ) : (
              // Default horizontal scroll layout
              <div className="space-y-7">
                {/* Trending Tokens - Horizontal Scroll */}
                <div>
                  <DragScroll className="flex pt-4 space-x-4 overflow-x-auto pl-5 pr-6 pb-7 items-stretch">
                    {loading
                      ? [...Array(6)].map((_, index) => (
                          <div
                            key={index}
                            className={`min-w-[200px] flex-shrink-0 animate-pulse rounded-xl p-4 ${
                              isDark ? "bg-gray-900" : "bg-white"
                            }`}
                          >
                            <div className="flex items-center space-x-3">
                              <div
                                className={`w-12 h-12 rounded-full ${
                                  isDark ? "bg-gray-700" : "bg-gray-300"
                                }`}
                              ></div>
                              <div className="flex-1">
                                <div
                                  className={`h-4 rounded w-16 mb-2 ${
                                    isDark ? "bg-gray-700" : "bg-gray-300"
                                  }`}
                                ></div>
                                <div
                                  className={`h-3 rounded w-20 ${
                                    isDark ? "bg-gray-700" : "bg-gray-300"
                                  }`}
                                ></div>
                              </div>
                            </div>
                          </div>
                        ))
                      : trendingTokens.slice(0, 6).map((token) => (
                          <div
                            key={
                              token.tokenId ||
                              token._id ||
                              token.mintAddr ||
                              token.id
                            }
                            className="min-w-[200px] flex-shrink-0"
                          >
                            <TokenCard
                              token={token}
                            />
                          </div>
                        ))}
                  </DragScroll>
                </div>

                {/* Trending Live Streams - Horizontal Scroll */}
                <DragScroll className="flex space-x-4 overflow-x-auto pl-5 pr-6 pb-7 items-stretch">
                  {trendingStreams.map((stream) => (
                    <div key={stream.id} className="w-80 flex-shrink-0">
                      <LiveStreamCard stream={stream} />
                    </div>
                  ))}
                </DragScroll>
              </div>
            )
          ) : (
            <div className="text-center py-4 mx-5">
              <div
                className={`w-12 h-12 mx-auto mb-4 rounded-full flex items-center justify-center ${
                  isDark ? "text-gray-400" : "text-gray-500"
                }`}
              >
                <svg
                  className="w-8 h-8"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M16 6l2.29 2.29-4.88 4.88-4-4L2 16.59 3.41 18l6-6 4 4 6.3-6.29L22 12V6z" />
                </svg>
              </div>
              <p
                className={`text-lg mb-2 ${
                  isDark ? "text-gray-300" : "text-gray-700"
                }`}
              >
                No trending tokens yet
              </p>
              <p
                className={`text-sm ${
                  isDark ? "text-gray-400" : "text-gray-600"
                }`}
              >
                Check back later for trending token content!
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Trending;
