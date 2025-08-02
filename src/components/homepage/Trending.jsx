import { useState } from 'react';
import { TokenCard, LiveStreamCard, SectionHeader } from './index.js';
import { useTheme } from '../../contexts/ThemeContext.jsx';
import DragScroll from '../../hooks/dragScroll/DragScroll.jsx';

const Trending = ({ trendingTokens, loading }) => {
  const { isDark } = useTheme();
  const [showAll, setShowAll] = useState(false);

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
      isLive: true
    },
    {
      id: 2,
      title: "Top 10 NFT Drops This Week!",
      username: "PixelHunter",
      followers: "56k followers",
      avatar: "/images/sample/sample2.png",
      thumbnail: "/images/sample/sample2.png",
      viewCount: "2.7k",
      isLive: true
    },
    {
      id: 3,
      title: "Unboxing Rare NFTs: What Did We Get?",
      username: "CryptoCollectorX",
      followers: "142k followers",
      avatar: "/images/sample/sample1.png",
      thumbnail: "/images/sample/sample1.png",
      viewCount: "6.8k",
      isLive: true
    },
    {
      id: 4,
      title: "Live Mint Party: Join and Win Giveaways!",
      username: "NFT_Wizard",
      followers: "203k followers",
      avatar: "/images/sample/sample3.png",
      thumbnail: "/images/sample/sample3.png",
      viewCount: "12.4k",
      isLive: true
    },
    {
      id: 5,
      title: "Q&A: Ask Me Anything About NFTs & Crypto",
      username: "BlockChainBabe",
      followers: "311k followers",
      avatar: "/images/sample/sample1.png",
      thumbnail: "/images/sample/sample1.png",
      viewCount: "15.9k",
      isLive: true
    }
  ];

  const handleViewAll = () => {
    setShowAll(!showAll);
  };

  return (
    <div className="px-4 lg:pl-14 lg:pr-6">
      <div className="max-w-7xl mx-auto">
        <SectionHeader
          title="Trending"
          onViewAll={handleViewAll}
          viewAllText={showAll ? "Show Less" : "View All"}
        />

        {showAll ? (
          // Grid layout for "Show All" - Tokens first, then livestreams
          <div className="space-y-8">
            {/* All Trending Tokens in Grid */}
            {trendingTokens.length > 0 && (
              <div>
                <h3 className={`text-lg font-semibold mb-4 ${isDark ? 'text-white' : 'text-gray-900'
                  }`}>
                  Trending Tokens ({trendingTokens.length})
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
                    trendingTokens.map((token) => (
                      <TokenCard key={token._id || token.tokenId} token={token} />
                    ))
                  )}
                </div>
              </div>
            )}

            {/* All Trending Live Streams in Grid */}
            <div>
              <h3 className={`text-lg font-semibold mb-4 ${isDark ? 'text-white' : 'text-gray-900'
                }`}>
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
                  trendingTokens.slice(0, 6).map((token) => (
                    <div key={token._id || token.tokenId} className="min-w-[200px] flex-shrink-0">
                      <TokenCard token={token} />
                    </div>
                  ))
                )}
              </DragScroll>
            </div>

            {/* Trending Live Streams - Horizontal Scroll */}
            <DragScroll className='flex space-x-4 overflow-x-auto pb-2'>
              {trendingStreams.map((stream) => (
                <div key={stream.id} className="w-80 flex-shrink-0">
                  <LiveStreamCard stream={stream} />
                </div>
              ))}
            </DragScroll>
          </div>
        )}
      </div>
    </div>
  );
};

export default Trending;