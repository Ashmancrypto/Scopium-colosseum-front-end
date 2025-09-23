import { useState } from "react";
import LiveStreamCard from "../homepage/LiveStreamCard";
import DragScroll from "../../hooks/dragScroll/DragScroll";
import CardCarouselDots from "../allTokens/CardCarouselDots";
import { useTheme } from "../../contexts/ThemeContext";
import { div } from "motion/react-client";

const VideosTab = ({}) => {
  const [showAllRecent, setShowAllRecent] = useState(false);
  const [showAllVideos, setShowAllVideos] = useState(false);
  const { isDark } = useTheme();

  // Always show mockup data for streamer profile pages - Does not have API call for streamer videos yet
  const isMockup = true;
  const pastStreams = [
    {
      title: "Stream title - Live NFT Reveal: Let’s See What We Got",
      avatar: "/images/sample/sample1.png",
      viewer_count: "1000",
      thumbnail: "/images/sample/sample1.png",
    },
    {
      title: "Stream title - Live NFT Reveal: Let’s See What We Got",
      avatar: "/images/sample/sample1.png",
      viewer_count: "1000",
      thumbnail: "/images/sample/sample1.png",
    },
    {
      title: "Stream title - Live NFT Reveal: Let’s See What We Got",
      avatar: "/images/sample/sample1.png",
      viewer_count: "1000",
      thumbnail: "/images/sample/sample1.png",
    },
    {
      title: "Stream title - Live NFT Reveal: Let’s See What We Got",
      avatar: "/images/sample/sample1.png",
      viewer_count: "1000",
      thumbnail: "/images/sample/sample1.png",
    },
    {
      title: "Stream title - Live NFT Reveal: Let’s See What We Got",
      avatar: "/images/sample/sample1.png",
      viewer_count: "1000",
      thumbnail: "/images/sample/sample1.png",
    },
  ];

  if (!isMockup) {
    return (
      <div className="pt-5 max-w-[100%]">
        <div className="text-center py-12 mx-5">
          <div
            className={`w-12 h-12 mx-auto mb-4 rounded-full flex items-center justify-center ${
              isDark ? "text-gray-400" : "text-gray-500"
            }`}
          >
            <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
            </svg>
          </div>
          <p
            className={`text-lg mb-2 ${
              isDark ? "text-gray-300" : "text-gray-700"
            }`}
          >
            No videos yet
          </p>
          <p
            className={`text-sm ${isDark ? "text-gray-400" : "text-gray-600"}`}
          >
            Check back later for video content!
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-5 max-w-[100%]">
      <div className="flex items-center gap-[17px] mb-[18px]">
        <h3 className="ml-4 sm:ml-0 text-[24px] font-semibold leading-none">
          Recent Streams
        </h3>
        <button
          onClick={() => setShowAllRecent(!showAllRecent)}
          className="text-[14px] text-black font-semibold leading-none px-4 py-3 rounded-[10px] border border-black/40 bg-[rgba(247,247,247,1)]"
        >
          {showAllRecent ? "Show Less" : "View All"}
        </button>
      </div>

      <div className="hidden lg:block">
        {showAllRecent ? (
          <div className="flex gap-8 flex-wrap p-4">
            {pastStreams.map((stream) => (
              <div key={stream.id} className="w-[300px] flex-shrink-0">
                <LiveStreamCard key={stream.id} stream={stream} />
              </div>
            ))}
          </div>
        ) : (
          <DragScroll className="flex space-x-4 overflow-x-auto pb-7 pl-5 pr-6 pt-4">
            {pastStreams.map((stream) => (
              <div key={stream.id} className="w-80 flex-shrink-0">
                <LiveStreamCard key={stream.id} stream={stream} />
              </div>
            ))}
          </DragScroll>
        )}
      </div>

      <div className="hidden sm:block lg:hidden">
        {!showAllRecent ? (
          <CardCarouselDots
            dotsDark={!isDark}
            cardVw={40}
            hideOnDesktop={false}
            cards={pastStreams.map((stream, index) => (
              <div key={stream.id || index} className="w-[40vw] flex-shrink-0">
                <LiveStreamCard key={stream.id} stream={stream} />
              </div>
            ))}
          />
        ) : (
          <div className="grid grid-cols-2 gap-4 p-2">
            {pastStreams.map((stream) => (
              <div key={stream.id} className="flex-shrink-0">
                <LiveStreamCard key={stream.id} stream={stream} />
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="sm:hidden mb-12">
        {!showAllRecent ? (
          <CardCarouselDots
            dotsDark={!isDark}
            cardVw={90}
            hideOnDesktop={false}
            cards={pastStreams.map((stream, index) => (
              <div key={stream.id || index} className="w-[90vw] flex-shrink-0">
                <LiveStreamCard key={stream.id} stream={stream} />
              </div>
            ))}
          />
        ) : (
          <div className="grid grid-cols-2 gap-4 p-2">
            {pastStreams.map((stream) => (
              <div key={stream.id} className="flex-shrink-0">
                <LiveStreamCard key={stream.id} stream={stream} />
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="flex items-center gap-[17px] mb-[18px] mt-[35px]">
        <h3 className="ml-4 sm:ml-0 text-[24px] font-semibold leading-none">
          Videos
        </h3>
        <button
          onClick={() => setShowAllVideos(!showAllVideos)}
          className="text-[14px] text-black font-semibold leading-none px-4 py-3 rounded-[10px] border border-black/40 bg-[rgba(247,247,247,1)]"
        >
          {showAllVideos ? "Show Less" : "View All"}
        </button>
      </div>

      <div className="hidden lg:block">
        {showAllVideos ? (
          <div className="flex gap-8 flex-wrap p-4">
            {pastStreams.map((stream) => (
              <div key={stream.id} className="w-[300px] flex-shrink-0">
                <LiveStreamCard key={stream.id} stream={stream} />
              </div>
            ))}
          </div>
        ) : (
          <DragScroll className="flex space-x-4 overflow-x-auto pb-7 pl-5 pr-6 pt-4">
            {pastStreams.map((stream) => (
              <div key={stream.id} className="w-80 flex-shrink-0">
                <LiveStreamCard key={stream.id} stream={stream} />
              </div>
            ))}
          </DragScroll>
        )}
      </div>

      <div className="hidden sm:block lg:hidden">
        {showAllVideos ? (
          <CardCarouselDots
            dotsDark={!isDark}
            cardVw={40}
            hideOnDesktop={false}
            cards={pastStreams.map((stream, index) => (
              <div key={stream.id || index} className="w-[40vw] flex-shrink-0">
                <LiveStreamCard key={stream.id} stream={stream} />
              </div>
            ))}
          />
        ) : (
          <div className="grid grid-cols-2 gap-4 p-2">
            {pastStreams.map((stream) => (
              <div key={stream.id} className="flex-shrink-0">
                <LiveStreamCard key={stream.id} stream={stream} />
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="sm:hidden mb-12">
        {!showAllVideos ? (
          <CardCarouselDots
            dotsDark={!isDark}
            cardVw={90}
            hideOnDesktop={false}
            cards={pastStreams.map((stream, index) => (
              <div key={stream.id || index} className="w-[90vw] flex-shrink-0">
                <LiveStreamCard key={stream.id} stream={stream} />
              </div>
            ))}
          />
        ) : (
          <div className="grid grid-cols-2 gap-4 p-2">
            {pastStreams.map((stream) => (
              <div key={stream.id} className="flex-shrink-0">
                <LiveStreamCard key={stream.id} stream={stream} />
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default VideosTab;
