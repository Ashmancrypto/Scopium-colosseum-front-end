import { Loader, AlertCircle, RefreshCw } from "lucide-react";
import { useTheme } from "../../contexts/ThemeContext.jsx";
import TokenScrollSection from "./TokenScrollSection.jsx";
import CardCarouselDots from "./CardCarouselDots.jsx";
import { formatTokenAmount, formatTimeAgo } from "../../utils/formatters.js";
import TokenChart from "./TokenChart.jsx";
import TokenGrid from "./TokenGrid.jsx";

const TokenSections = ({
  tokens,
  loading,
  error,
  onRefresh,
  isFilterBarVisible,
}) => {
  const { isDark } = useTheme();

  const formatPriceDiv = (price) => {
    if (price > 0) {
      return <div className="text-[rgba(41,167,37,1)]">+{price}%</div>;
    } else {
      return <div className="text-[rgba(211,54,54,1)]">{price}%</div>;
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-16">
        <Loader
          className={`w-8 h-8 ${
            isDark ? "text-green-400" : "text-pink-400"
          } animate-spin`}
        />
        <span
          className={`ml-3 text-lg ${isDark ? "text-white" : "text-gray-900"}`}
        >
          Loading tokens...
        </span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center py-16">
        <AlertCircle className="w-12 h-12 text-red-400 mb-4" />
        <p className="text-red-400 text-lg font-semibold mb-2">
          Error Loading Tokens
        </p>
        <p
          className={`text-sm mb-4 text-center max-w-md ${
            isDark ? "text-gray-400" : "text-gray-600"
          }`}
        >
          {error}
        </p>
        {onRefresh && (
          <button
            onClick={onRefresh}
            className={`flex items-center space-x-2 px-4 py-2 border rounded-lg transition-colors ${
              isDark
                ? "bg-green-500/20 text-green-400 border-green-500/30 hover:bg-green-500/30"
                : "bg-pink-500/20 text-pink-400 border-pink-500/30 hover:bg-pink-500/30"
            }`}
          >
            <RefreshCw className="w-4 h-4" />
            <span>Try Again</span>
          </button>
        )}
      </div>
    );
  }

  // Split tokens into favorite and new tokens
  const favoriteTokens = tokens?.filter((token) => token.isFavorited) || [];
  const newTokens = tokens?.slice(0, 24) || []; // Show first 12 as new tokens

  const handleViewAllFavorites = () => {
    setShowAllFavorites(!showAllFavorites);
  };

  const handleViewAllNew = () => {
    setShowAllNew(!showAllNew);
  };

  return (
    <div className="space-y-8 max-w-screen">
      {/* Favorite Tokens Section */}
      <div>
        <div className="flex items-center justify-start gap-5 pb-4 mb-4 pl-[28px]">
          <h2
            className={`text-xl font-semibold transition-colors duration-300 ${
              isDark ? "text-white" : "text-gray-900"
            }`}
          >
            Favorite Tokens
          </h2>
        </div>

        {favoriteTokens.length > 0 ? (
          <div>
            <TokenScrollSection
              tokens={favoriteTokens}
              paddingLeft={52}
              isFilterBarVisible={isFilterBarVisible}
            />
            <div className="block sm:hidden w-[calc(100vw-10px)] overflow-hidden">
              <CardCarouselDots
                dots={true}
                cardVw={90}
                dotsDark={!isDark}
                cards={favoriteTokens.map((token) => (
                  <div
                    className="w-[90vw] bg-[rgb(255, 255, 255)] border-[3px] border-[rgba(21,153,254,0.6)] relative min-h-[100px] rounded-[12px] pt-[36px] pb-[20px] px-[20px]"
                    key={token.id || token.tokenId}
                  >
                    <img
                      src={token.logo}
                      alt={token.ticker}
                      className="absolute top-0 left-[16px] w-[84] h-[84px] -translate-y-[10%] rounded-[12px] pointer-events-none"
                      style={{
                        boxShadow: "0px 0px 15px 0px rgba(128, 128, 128, 0.25)",
                      }}
                    />

                    <div
                      className={`ml-[100px] mb-[20px] ${
                        isDark ? "text-white" : "text-black"
                      }`}
                    >
                      <h3 className="text-[16px] font-bold mb-[18px]">
                        {token.name}
                      </h3>
                      <div
                        className={`flex items-start gap-[20px] text-[16px] justify-start w-full ${
                          isDark ? "text-white" : "text-[rgba(10,10,10,0.6)]"
                        }`}
                      >
                        <h4>Volume : {formatTokenAmount(token.volume)}</h4>
                        <h4>Age : {formatTimeAgo(token.cdate)}</h4>
                      </div>
                    </div>
                    <div className="w-full h-[230px] rounded-[12px] overflow-hidden">
                      <TokenChart />
                    </div>
                    <div className="grid grid-cols-2 gap-[20px] w-[95%] mx-auto text-black">
                      {token.priceHistory.slice(-4).map((price, index) => (
                        <div className="flex items-center gap-[6px] py-4">
                          <h4
                            className={`${
                              isDark ? "text-white" : "text-black"
                            }`}
                          >
                            {formatTimeAgo(price.timestamp)}
                          </h4>
                          <h4>
                            {formatPriceDiv(
                              (price.price /
                                token.priceHistory[
                                  token.priceHistory.length - 1
                                ].price) *
                                100
                            )}
                          </h4>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              />
            </div>
          </div>
        ) : (
          <div
            className={`text-center py-8 ${
              isDark ? "text-gray-400" : "text-gray-600"
            }`}
          >
            <p>No favorite tokens yet</p>
            <p className="text-sm mt-1">
              Start adding tokens to your favorites!
            </p>
          </div>
        )}
      </div>

      {/* New Tokens Section */}
      <div>
        <div className="flex items-center justify-start gap-5 pb-4 sm:mb-4 pl-[28px] mb-12">
          <h2
            className={`text-xl font-semibold transition-colors duration-300 ${
              isDark ? "text-white" : "text-black"
            }`}
          >
            New tokens
          </h2>
        </div>

        {newTokens.length > 0 ? (
          <div>
            <TokenScrollSection
              reversed={true}
              tokens={newTokens}
              paddingLeft={52}
              isFilterBarVisible={isFilterBarVisible}
            />
            <div className="block sm:hidden w-[calc(100vw-10px)] px-4">
              <TokenGrid
                tokens={newTokens}
                isFilterBarVisible={isFilterBarVisible}
              />
            </div>
          </div>
        ) : (
          <div
            className={`text-center py-8 ${
              isDark ? "text-gray-400" : "text-gray-600"
            }`}
          >
            <p>No new tokens available</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default TokenSections;
