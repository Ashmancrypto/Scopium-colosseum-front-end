import React, { useRef, useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { LiveStreamCard, SectionHeader } from "./index.js";
import { useTheme } from "../../contexts/ThemeContext.jsx";
import DragScroll from "../../hooks/dragScroll/DragScroll.jsx";
import axios from "axios";

const LiveNow = ({ streams, onStreamSelect }) => {
  const { isDark } = useTheme();
  const scrollContainerRef = useRef(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);
  const [showAllStreams, setShowAllStreams] = useState(false);
  const [liveStreams, setLiveStreams] = useState([]);
  const [loading, setLoading] = useState(true);

  const API_URL = "https://api.scopium.fun";
  useEffect(() => {
    fetchLiveStreams();
    const interval = setInterval(fetchLiveStreams, 5000); // Refresh every 5 seconds

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    // Update live streams when new streams are created
    setLiveStreams((prev) => {
      const streamIds = prev.map((s) => s.id);
      const newStreams = streams.filter((s) => !streamIds.includes(s.id));
      return [...prev, ...newStreams];
    });
  }, [streams]);

  const fetchLiveStreams = async () => {
    try {
      const response = await axios.get(`${API_URL}/api/streams/live/`);
      setLiveStreams(response.data);
    } catch (error) {
      console.error("Error fetching live streams:", error);
    } finally {
      setLoading(false);
    }
  };

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
        <div className="mt-7">
          {liveStreams.length > 0 ? (
            showAllStreams ? (
              // Grid layout for "Show All"
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 px-5">
                {liveStreams.map((stream) => (
                  <LiveStreamCard
                    key={stream.id}
                    stream={stream}
                    onClick={() => onStreamSelect(stream)}
                  />
                ))}
              </div>
            ) : (
              // Horizontal scroll layout for default view
              <DragScroll className="flex space-x-4 overflow-x-auto pb-7 items-stretch">
                {liveStreams.slice(0, 4).map((stream) => (
                  <div
                    key={stream.id}
                    onClick={() => onStreamSelect(stream)}
                    className="flex-shrink-0 w-80"
                  >
                    <LiveStreamCard key={stream.id} stream={stream} />
                  </div>
                ))}
              </DragScroll>
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
                No live streams yet
              </p>
              <p
                className={`text-sm ${
                  isDark ? "text-gray-400" : "text-gray-600"
                }`}
              >
                Check back later for live streaming content!
              </p>
            </div>
          )}
        </div>

        {/* Show count when viewing all in grid */}
        {showAllStreams && liveStreams.length > 0 && (
          <div
            className={`text-center text-sm ${
              isDark ? "text-gray-400" : "text-gray-600"
            }`}
          >
            Showing all {liveStreams.length} live streams
          </div>
        )}
      </div>
    </div>
  );
};

export default LiveNow;
