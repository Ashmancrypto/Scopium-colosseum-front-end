import React, { useState, useEffect, useRef } from "react";
import { Plus } from "lucide-react";
import { useTheme } from "../../contexts/ThemeContext.jsx";
import { motion, AnimatePresence } from "motion/react";
import NewlyFollowedTokenCard from "./NewlyFollowedTokenCard.jsx";
import { getFavoriteTokens } from "../../api/user/index.js";
import { getUser } from "../../utils/index.js";

const RightSidebar = ({ livestreamers = [], tokens = [] }) => {
  const { isDark } = useTheme();
  const [isExpanded, setIsExpanded] = useState(false);
  const [favoriteTokens, setFavoriteTokens] = useState([]);
  const [loading, setLoading] = useState(true);
  const [height, setHeight] = useState(0);
  const ref = useRef(null);

  const updateHeight = () => {
    const bottomOfViewport = window.innerHeight;
    const topOfElement = ref.current.getBoundingClientRect().top;
    setHeight(bottomOfViewport - topOfElement);
  };

  // Fetch user's favorite tokens
  useEffect(() => {
    const fetchFavoriteTokens = async () => {
      try {
        const currentUser = getUser();
        if (currentUser && currentUser._id) {
          const tokens = await getFavoriteTokens(currentUser._id);
          setFavoriteTokens(tokens || []);
        }
      } catch (error) {
        console.error("Error fetching favorite tokens:", error);
        setFavoriteTokens([]);
      } finally {
        setLoading(false);
      }
    };

    fetchFavoriteTokens();
    updateHeight();

    window.addEventListener("scroll", updateHeight);
    return () => {
      window.removeEventListener("scroll", updateHeight);
    };
  }, []);

  // Use real data if available, otherwise show empty state
  const displayLivestreamers = livestreamers.length > 0 ? livestreamers : [];
  const displayWatchListedTokens =
    favoriteTokens.length > 0 ? favoriteTokens : watchListedTokens;

  return (
    <motion.div
      className={`hidden lg:block backdrop-blur-md transition-colors duration-300 flex flex-col absolute right-0 bottom-0 translate-y-full ${
        isDark ? "bg-green-500/50" : "bg-pink-500/20"
      }`}
      transition={{ duration: 0.3, ease: "easeInOut" }}
      animate={{ width: isExpanded ? "250px" : "80px" }}
      style={{ height: `${height}px` }}
      ref={ref}
    >
      {/* Collapse Button */}
      <div className="flex p-1 my-2 pt-2 relative">
        <motion.button
          className={`p-2 rounded-lg transition-all duration-300 ${
            isDark ? "hover:bg-green-500/30" : "hover:bg-pink-500/30"
          }`}
          animate={{
            rotate: isExpanded ? 180 : 0,
            x: isExpanded ? 10 : "50%",
            xPercent: isExpanded ? 0 : -50,
          }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
          onClick={() => setIsExpanded(!isExpanded)}
        >
          <img
            src="/images/icons/expand.png"
            alt="Expand"
            className="w-4 h-full"
          />
        </motion.button>
      </div>

      {/* Top Half - Livestreamers */}
      <div className="flex-1 flex flex-col min-h-0">
        <div className="flex-1 overflow-y-auto scrollbar-hide py-2">
          <AnimatePresence mode="wait">
            {!isExpanded && (
              <motion.div
                key="collapsed"
                className="flex flex-col items-center gap-2 px-4"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
              >
                {displayLivestreamers.length > 0 ? (
                  displayLivestreamers.map((streamer) => (
                    <div
                      key={streamer.id || streamer.username}
                      className="relative group cursor-pointer"
                      title={streamer.username}
                    >
                      <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-white/20 hover:border-white/40 transition-colors">
                        <img
                          src={streamer.avatar}
                          alt={streamer.username}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="text-center py-4">
                    <p className="text-sm text-gray-500">No live streams</p>
                  </div>
                )}
              </motion.div>
            )}
            {isExpanded && (
              <motion.div
                key="expanded"
                className="space-y-2 px-4"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
              >
                <h3 className="text-[16px] font-bold mb-2 text-black">
                  Live Now{" "}
                </h3>

                {displayLivestreamers.length > 0 ? (
                  displayLivestreamers.map((streamer) => (
                    <div
                      key={streamer.id || streamer.username}
                      className="relative cursor-pointer flex items-center justify-between"
                      title={streamer.username}
                    >
                      <div className="flex items-center gap-[12px] justify-start">
                        <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-white/20 hover:border-white/40 transition-colors">
                          <img
                            src={streamer.avatar}
                            alt={streamer.username}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div className="flex flex-col justify-center items-start">
                          <p className="text-[14px]">{streamer.username}</p>
                          <p className="text-[12px] text-black/60">
                            {streamer.streamCategory}
                          </p>
                        </div>
                      </div>
                      <div className="flex flex-col justify-end items-end gap-[4px]">
                        <div className="w-2 h-2 rounded-full bg-[rgba(211,54,54,1)]" />
                        <div className="flex items-center justify-end gap-[4px]">
                          <p className="text-[12px] text-black/60">
                            {streamer.viewCount}
                          </p>
                          <svg
                            width="18"
                            height="12"
                            viewBox="0 0 18 12"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M9 3.6C8.34901 3.6 7.72469 3.85286 7.26437 4.30294C6.80406 4.75303 6.54545 5.36348 6.54545 6C6.54545 6.63652 6.80406 7.24697 7.26437 7.69706C7.72469 8.14714 8.34901 8.4 9 8.4C9.65099 8.4 10.2753 8.14714 10.7356 7.69706C11.1959 7.24697 11.4545 6.63652 11.4545 6C11.4545 5.36348 11.1959 4.75303 10.7356 4.30294C10.2753 3.85286 9.65099 3.6 9 3.6ZM9 10C7.91502 10 6.87448 9.57857 6.10729 8.82843C5.3401 8.07828 4.90909 7.06087 4.90909 6C4.90909 4.93913 5.3401 3.92172 6.10729 3.17157C6.87448 2.42143 7.91502 2 9 2C10.085 2 11.1255 2.42143 11.8927 3.17157C12.6599 3.92172 13.0909 4.93913 13.0909 6C13.0909 7.06087 12.6599 8.07828 11.8927 8.82843C11.1255 9.57857 10.085 10 9 10ZM9 0C4.90909 0 1.41545 2.488 0 6C1.41545 9.512 4.90909 12 9 12C13.0909 12 16.5845 9.512 18 6C16.5845 2.488 13.0909 0 9 0Z"
                              fill="#0A0A0A"
                              fillOpacity="0.6"
                            />
                          </svg>
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="text-center py-4">
                    <p className="text-sm text-gray-500">No live streams</p>
                  </div>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Divider */}
      <div className="h-[2px] w-[90%] bg-[#0A0A0A99] mx-auto my-2 rounded"></div>

      {/* Bottom Half - Tokens */}
      <div className="flex-1 flex flex-col items-center justify-center min-h-0 w-full px-4">
        <div className="flex-1 overflow-y-auto scrollbar-hide py-2 w-full">
          <AnimatePresence mode="wait">
            {!isExpanded ? (
              <motion.div
                key="collapsed"
                className="space-y-2 flex flex-col items-center"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
              >
                {loading ? (
                  [...Array(3)].map((_, index) => (
                    <div
                      key={index}
                      className="w-10 h-10 rounded-full bg-gray-300 animate-pulse"
                    />
                  ))
                ) : displayWatchListedTokens.length > 0 ? (
                  displayWatchListedTokens.map((token) => (
                    <div
                      key={token.tokenId || token._id || token.id}
                      className="cursor-pointer group"
                      title={token.ticker || token.name}
                      onClick={() => {
                        if (token.mintAddr) {
                          window.location.href = `/token/${token.mintAddr}`;
                        }
                      }}
                    >
                      <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-white/20 hover:border-white/40 transition-colors bg-gradient-to-br from-pink-500 to-violet-500 flex items-center justify-center">
                        <img
                          src={token.logo}
                          alt={token.ticker || token.name}
                          className="w-full h-full object-cover"
                          onError={(e) => {
                            e.target.style.display = "none";
                            e.target.nextSibling.style.display = "flex";
                          }}
                        />
                        <span
                          className="text-white font-bold text-xs items-center justify-center w-full h-full"
                          style={{ display: "none" }}
                        >
                          {(token.ticker || token.name)?.charAt(0) || "T"}
                        </span>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="text-center py-4">
                    <p className="text-xs text-gray-500">No favorite tokens</p>
                  </div>
                )}
              </motion.div>
            ) : (
              <motion.div
                key="expanded"
                className="space-y-2 w-full"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3, ease: "linear" }}
              >
                <h3 className="text-[16px] font-bold mb-2 text-black">
                  Followed Tokens
                </h3>
                {loading ? (
                  [...Array(3)].map((_, index) => (
                    <div
                      key={index}
                      className="w-full h-16 bg-gray-200 rounded-lg animate-pulse"
                    />
                  ))
                ) : displayWatchListedTokens.length > 0 ? (
                  displayWatchListedTokens.map((token) => (
                    <NewlyFollowedTokenCard
                      key={token.tokenId || token._id || token.id}
                      tokenImage={token.logo}
                      tokenSymbol={token.ticker || token.name}
                      tokenValue={
                        token.marketCap
                          ? `$${(token.marketCap / 1000000).toFixed(1)}M`
                          : "N/A"
                      }
                      tokenValueChangePercentage={token.priceChange || 0}
                      backgroundColor="white"
                      onClick={() => {
                        if (token.mintAddr) {
                          window.location.href = `/token/${token.mintAddr}`;
                        }
                      }}
                    />
                  ))
                ) : (
                  <div className="text-center py-8">
                    <p className="text-sm text-gray-500">No favorite tokens</p>
                    <p className="text-xs text-gray-400 mt-1">
                      Add tokens to favorites to see them here
                    </p>
                  </div>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Add Button */}
        <div className="p-2 justify-center items-center">
          <button className="w-10 h-10 rounded-full bg-white flex items-center justify-center">
            <Plus className="w-5 h-5 text-black" />
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default RightSidebar;
