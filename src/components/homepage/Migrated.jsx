import { useState } from "react";
import { TokenCard, LiveStreamCard, SectionHeader } from "./index.js";
import { useTheme } from "../../contexts/ThemeContext.jsx";
import DragScroll from "../../hooks/dragScroll/DragScroll.jsx";

const Migrated = ({ migratedTokens, loading }) => {
  const { isDark } = useTheme();
  const [showAll, setShowAll] = useState(false);

  const handleViewAll = () => {
    setShowAll(!showAll);
  };

  return (
    <div className="">
      <div className="max-w-7xl mx-auto">
        <SectionHeader
          title="Migrated"
          onViewAll={handleViewAll}
          viewAllText={showAll ? "Show Less" : "View All"}
          paddingX={20}
        />

        <div className="mt-7">
          {migratedTokens.length > 0 ? (
            showAll ? (
              // Grid layout for "Show All" - Tokens first, then livestreams
              <div className="space-y-8 px-5">
                {/* All Trending Tokens in Grid */}
                <div>
                  <h3
                    className={`text-lg font-semibold mb-4 ${
                      isDark ? "text-white" : "text-gray-900"
                    }`}
                  >
                    Trending Tokens ({migratedTokens.length})
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
                      : migratedTokens.map((token) => (
                          <TokenCard
                            key={token._id || token.tokenId}
                            token={token}
                          />
                        ))}
                  </div>
                </div>
              </div>
            ) : (
              // Default horizontal scroll layout
              <div className="space-y-8">
                {/* Trending Tokens - Horizontal Scroll */}
                <div>
                  <DragScroll className="flex space-x-4 overflow-x-auto pl-5 pr-6 pb-7">
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
                      : migratedTokens.slice(0, 6).map((token) => (
                          <div
                            key={token._id || token.tokenId}
                            className="min-w-[200px] flex-shrink-0"
                          >
                            <TokenCard token={token} />
                          </div>
                        ))}
                  </DragScroll>
                </div>
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
                  <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-5 14H7v-2h7v2zm3-4H7v-2h10v2zm0-4H7V7h10v2z" />
                </svg>
              </div>
              <p
                className={`text-lg mb-2 ${
                  isDark ? "text-gray-300" : "text-gray-700"
                }`}
              >
                No migrated tokens yet
              </p>
              <p
                className={`text-sm ${
                  isDark ? "text-gray-400" : "text-gray-600"
                }`}
              >
                Migrated tokens will appear here when available!
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Migrated;
