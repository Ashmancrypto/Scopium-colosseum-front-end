import React, { useState } from "react";
import { Plus } from "lucide-react";
import { useTheme } from "../../contexts/ThemeContext.jsx";
import { motion, AnimatePresence } from "motion/react";
import NewlyFollowedTokenCard from "./NewlyFollowedTokenCard.jsx";

const RightSidebar = ({ livestreamers = [], watchListedTokens = [] }) => {
  const { isDark } = useTheme();

  // Fix duplicate IDs in mock data
  const mockLivestreamers = [
    {
      id: 1,
      username: "streamer1",
      avatar: "/images/sample/savatar1.png",
      streamCategory: "Art",
      viewCount: "100k",
    },
    {
      id: 2,
      username: "streamer2",
      avatar: "/images/sample/savatar2.png",
      streamCategory: "Music",
      viewCount: "50k",
    },
    {
      id: 3,
      username: "streamer3",
      avatar: "/images/sample/savatar3.png",
      streamCategory: "Sports",
      viewCount: "20k",
    },
    {
      id: 4,
      username: "streamer4",
      avatar: "/images/sample/savatar4.png",
      streamCategory: "Gaming",
      viewCount: "10k",
    },
    {
      id: 5,
      username: "streamer5",
      avatar: "/images/sample/savatar5.png",
      streamCategory: "Art",
      viewCount: "1k",
    },
    {
      id: 6,
      username: "streamer6",
      avatar: "/images/sample/savatar1.png",
      streamCategory: "Gaming",
      viewCount: "1k",
    },
    {
      id: 7,
      username: "streamer7",
      avatar: "/images/sample/savatar2.png",
      streamCategory: "Sports",
      viewCount: "1k",
    },
  ];

  const mockWatchListedTokens = [
    {
      id: 1,
      name: "token1",
      logo: "/images/placeholders/tokenPlaceholders/dog.png",
    },
    {
      id: 2,
      name: "token2",
      logo: "/images/placeholders/tokenPlaceholders/pepe.png",
    },
    {
      id: 3,
      name: "token3",
      logo: "/images/placeholders/tokenPlaceholders/shiba.png",
    },
    {
      id: 4,
      name: "token4",
      logo: "/images/placeholders/tokenPlaceholders/dog.png",
    },
    {
      id: 5,
      name: "token5",
      logo: "/images/placeholders/tokenPlaceholders/pepe.png",
    },
  ];

  const displayLivestreamers =
    livestreamers.length > 0 ? livestreamers : mockLivestreamers;
  const displayWatchListedTokens =
    watchListedTokens.length > 0 ? watchListedTokens : mockWatchListedTokens;
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <motion.div
      className={`backdrop-blur-md transition-colors duration-300 flex flex-col ${
        isDark ? "bg-green-500/50" : "bg-pink-500/20"
      }`}
      transition={{ duration: 0.3, ease: "easeInOut" }}
      animate={{ width: isExpanded ? "250px" : "80px" }}
    >
      {/* Collapse Button */}
      <div className="flex p-1 pt-2 relative">
        <motion.button
          className={`p-2 rounded-lg transition-all duration-300 ${
            isDark ? "hover:bg-green-500/30" : "hover:bg-pink-500/30"
          }`}
          animate={{
            rotate: isExpanded ? 180 : 0,
            x: isExpanded ? 0 : "50%",
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
                className="space-y-2 px-4"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
              >
                {displayLivestreamers.map((streamer) => (
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
                ))}
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

                {displayLivestreamers.map((streamer) => (
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
                            fill-opacity="0.6"
                          />
                        </svg>
                      </div>
                    </div>
                  </div>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Divider */}
      <div className="h-[2px] w-[90%] bg-[#0A0A0A99] mx-auto my-2 rounded"></div>

      {/* Bottom Half - Tokens */}
      <div className="flex-1 flex flex-col items-center justify-center min-h-0">
        <div className="flex-1 overflow-y-auto scrollbar-hide py-2 px-2">
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
                {displayWatchListedTokens.map((token) => (
                  <div
                    key={token.tokenId || token.address || token.id}
                    className="cursor-pointer group"
                    title={token.name}
                  >
                    <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-white/20 hover:border-white/40 transition-colors bg-gradient-to-br from-pink-500 to-violet-500 flex items-center justify-center">
                      <img
                        src={token.logo}
                        alt={token.name}
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
                        {token.name?.charAt(0) || "T"}
                      </span>
                    </div>
                  </div>
                ))}
              </motion.div>
            ) : (
              <motion.div
                key="expanded"
                className="space-y-2 px-2"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3, ease: "linear" }}
              >
                <h3 className="text-[16px] font-bold mb-2 text-black">
                  Followed Tokens
                </h3>
                {displayWatchListedTokens.map((token) => (
                  <NewlyFollowedTokenCard
                    key={token.tokenId || token.address || token.id}
                    tokenImage={token.logo}
                    tokenSymbol={token.name}
                    tokenValue={token.value}
                    tokenValueChangePercentage={token.changePercentage}
                    backgroundColor="white"
                  />
                ))}
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
