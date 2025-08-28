import React, { useRef, useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { LiveStreamCard, SectionHeader } from './index.js';
import { useTheme } from '../../contexts/ThemeContext.jsx';
import DragScroll from '../../hooks/dragScroll/DragScroll.jsx';

const LiveNow = () => {
  const { isDark } = useTheme();
  const scrollContainerRef = useRef(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);
  const [showAllStreams, setShowAllStreams] = useState(false);

  // Mock live streams data
  const liveStreams = [
    {
      id: 1,
      title: "Unboxing Rare NFTs: What Did We Get?",
      username: "CryptoCollectorX",
      followers: "142k followers",
      avatar: "/images/sample/sample1.png",
      thumbnail: "/images/sample/sample1.png",
      viewCount: "6.8k",
      isLive: true
    },
    {
      id: 2,
      title: "Behind the Scenes: Creating a 1/1 NFT Art",
      username: "ArtByLuna",
      followers: "87.5k followers",
      avatar: "/images/sample/sample2.png",
      thumbnail: "/images/sample/sample2.png",
      viewCount: "3.1k",
      isLive: true
    },
    {
      id: 3,
      title: "Live Mint Party: Join and Win Giveaways!",
      username: "NFT_Wizard",
      followers: "203k followers",
      avatar: "/images/sample/sample3.png",
      thumbnail: "/images/sample/sample3.png",
      viewCount: "12.4k",
      isLive: true
    },
    {
      id: 4,
      title: "Top 10 NFT Drops This Week!",
      username: "PixelHunter",
      followers: "56k followers",
      avatar: "/images/sample/sample2.png",
      thumbnail: "/images/sample/sample2.png",
      viewCount: "2.7k",
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
    setShowAllStreams(!showAllStreams);
  };

  return (
    <div className="">
      <div className="max-w-7xl mx-auto">
        <SectionHeader
          title="Live Now"
          onViewAll={handleViewAll}
          viewAllText={showAllStreams ? "Show Less" : "View All"}
          paddingX={20}
        />

        {/* Stream Cards Container */}
        {showAllStreams ? (
          // Grid layout for "Show All"
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 px-6">
            {liveStreams.map((stream) => (
              <LiveStreamCard key={stream.id} stream={stream} />
            ))}
          </div>
        ) : (
          // Horizontal scroll layout for default view
          <DragScroll className="px-6 flex space-x-4 overflow-x-auto py-4 items-stretch">
            {liveStreams.slice(0, 4).map((stream) => (
              <div key={stream.id} className="flex-shrink-0 w-80">
                <LiveStreamCard stream={stream} />
              </div>
            ))}
          </DragScroll>
        )}

        {/* Show count when viewing all in grid */}
        {showAllStreams && liveStreams.length > 0 && (
          <div className={`text-center text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
            Showing all {liveStreams.length} live streams
          </div>
        )}
      </div>
    </div>
  );
};

export default LiveNow;