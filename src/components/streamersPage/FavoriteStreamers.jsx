import { useStreams } from "../../hooks/useStreams.js";
import { SectionHeader } from "../homepage/index.js";
import { useTheme } from "../../contexts/ThemeContext.jsx";
import { useState } from "react";
import DragScroll from "../../hooks/dragScroll/DragScroll.jsx";
import { LiveStreamCard } from "../homepage/index.js";

const FavoriteStreamers = () => {
  const { streams, loadingStreams, errorStreams } = useStreams();
  const { isDark } = useTheme();
  const [showAll, setShowAll] = useState(false);

  const isMockup = import.meta.env.VITE_IS_MOCKUP === "true";

  const handleViewAll = () => {
    setShowAll(!showAll);
  };
  return (
    <div className="">
      <div className="max-w-7xl mx-auto">
        <SectionHeader
          title="Your Favorite Streamers"
          onViewAll={handleViewAll}
          viewAllText={showAll ? "Show Less" : "View All"}
          paddingX={20}
        />

        <div className="mt-7">
          {loadingStreams ? (
            <div className="text-center py-4 mx-5">
              <p
                className={`text-lg mb-2 ${
                  isDark ? "text-white" : "text-black/60"
                }`}
              >
                Loading...
              </p>
            </div>
          ) : isMockup && streams.length > 0 ? (
            showAll ? (
              // Grid layout for "Show All" - Tokens first, then livestreams
              <div className="space-y-8 px-5">
                {/* All Trending Live Streams in Grid */}
                <div className="mt-7">
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {streams.map((stream) => (
                      <LiveStreamCard key={stream.id} stream={stream} />
                    ))}
                  </div>
                </div>
              </div>
            ) : (
              // Default horizontal scroll layout
              <div className="space-y-7">
                {/* Trending Live Streams - Horizontal Scroll */}
                <DragScroll className="flex space-x-4 overflow-x-auto pl-5 pr-6 pb-7 items-stretch">
                  {streams.map((stream) => (
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
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
                </svg>
              </div>
              <p
                className={`text-lg mb-2 ${
                  isDark ? "text-gray-300" : "text-gray-700"
                }`}
              >
                No favorite streamers yet
              </p>
              <p
                className={`text-sm ${
                  isDark ? "text-gray-400" : "text-gray-600"
                }`}
              >
                Start following streamers to see them here!
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default FavoriteStreamers;
