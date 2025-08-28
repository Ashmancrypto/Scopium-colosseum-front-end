import { useState } from "react";
import { TokenCard, LiveStreamCard, SectionHeader } from "./index.js";
import { useTheme } from "../../contexts/ThemeContext.jsx";
import DragScroll from "../../hooks/dragScroll/DragScroll.jsx";
import NewlyTokenCard from "./NewlyTokenCard.jsx";
import NewlyFollowedTokenCard from "./NewlyFollowedTokenCard.jsx";
import { useTokens } from "../../hooks/useTokens.js";

const Newly = () => {
  const { isDark } = useTheme();
  const [showAll, setShowAll] = useState(false);
  const { allTokens, loading } = useTokens();
  console.log("all tokens from api ", allTokens);
  const handleViewAll = () => {
    setShowAll(!showAll);
  };

  const handleTokenClick = (tokenAddress) => {
    if (tokenAddress) {
      window.location.href = `/token/${tokenAddress}`;
    }
  };

  return (
    <div className={`w-[192px] space-y-3 p-4`}>
      <div>
        <h2
          className={`text-[min(18px,1.5vw)] font-bold ${
            isDark ? "text-white" : "text-gray-900"
          }`}
        >
          New Tokens
        </h2>
      </div>
      {/* <div
        className={`flex items-center justify-between mb-6 p-2 rounded-xl ${
          isDark ? "bg-green-500" : "bg-pink-500"
        }`}
      > */}
      {/* <div className="flex items-center space-x-3">
          <div className="h-8 flex items-center justify-center">
            <img
              src="/images/icons/section.png"
              alt="Section"
              className="w-12 h-16 filter"
            />
          </div>
          <h2 className="text-xl font-bold text-[#F7F7F7]">New Tokens</h2>
        </div> */}
      {/* <img
          src={isDark ? '/images/icons/section-dark.png' : '/images/icons/section.png'}
          alt="Section"
          className="w-12 h-16 filter"
        />
        <h3
          className={`text-lg font-semibold mb-4 text-white`}
        >
          New Tokens
        </h3> */}
      {/* <button
          onClick={handleViewAll}
          className='px-4 py-1 rounded-xl font-medium transition-colors bg-white text-gray-900 hover:bg-gray-50'>
          {showAll ? "Show Less" : "View All"}
        </button> */}
      {/* </div> */}
      {/* Show All or Less Button */}
      {/* {showAll ? newlyTokens.map((token) => (
        <div
          key={token.tokenId}
          className='w-full rounded-lg ransition-all duration-200 cursor-pointer hover:scale-105 border border-gray-700 hover:bg-gray-750 p-1 flex flex-col items-center'
          onClick={() => handleTokenClick(token.mintAddr)}
        >
          <div>
            <img src={token.logo} alt="Token Logo" className='w-44 h-44 border rounded-lg' />
          </div>
          <div className={`font-bold text-sm ${isDark ? 'text-white' : 'text-gray-900'
            }`}>{token.ticker}</div>
        </div>
      )) : (
        <div className='space-y-3'>
          {loading ? (
            [...Array(4)].map((_, index) => (
              <div
                key={index}
                className={`w-full rounded-lg ransition-all duration-200 cursor-pointer hover:scale-105 border border-gray-700 hover:bg-gray-750 p-1 flex flex-col items-center ${isDark ? 'bg-gray-900' : 'bg-white'}`}
              >
                <div className={`w-44 h-44 border rounded-lg ${isDark ? 'bg-gray-700' : 'bg-gray-300'}`}></div>
                <div className={`h-4 rounded w-full mt-2 ${isDark ? 'bg-gray-700' : 'bg-gray-300'}`}></div>
              </div>
            ))
          ) : (
            newlyTokens.slice(0, 4).map((token) => (
              <div
                key={token.tokenId}
                className='w-full rounded-lg ransition-all duration-200 cursor-pointer hover:scale-105 border border-gray-700 hover:bg-gray-750 p-1 flex flex-col items-center'
                onClick={() => handleTokenClick(token.mintAddr)}
              >
                <div>
                  <img src={token.logo} alt="Token Logo" className='w-44 h-44 border rounded-lg' />
                </div>
                <div className={`font-bold text-sm ${isDark ? 'text-white' : 'text-gray-900'
                  }`}>{token.ticker}</div>
              </div>
            ))
          )}
        </div>
      )} */}
      {
        <div className="space-y-3">
          {loading
            ? [...Array(4)].map((_, index) => (
                <div
                  key={index}
                  className={`w-full rounded-lg ransition-all duration-200 cursor-pointer hover:scale-105 border border-gray-700 hover:bg-gray-750 p-1 flex flex-col items-center ${
                    isDark ? "bg-gray-900" : "bg-white"
                  }`}
                >
                  <div
                    className={`w-44 h-44 border rounded-lg ${
                      isDark ? "bg-gray-700" : "bg-gray-300"
                    }`}
                  ></div>
                  <div
                    className={`h-4 rounded w-full mt-2 ${
                      isDark ? "bg-gray-700" : "bg-gray-300"
                    }`}
                  ></div>
                </div>
              ))
            : allTokens.map((token) => (
                <div
                  key={token.tokenId}
                  className={`w-full rounded-[12px] ransition-all duration-200 cursor-pointer hover:scale-105 border p-[12px] pb-[16px] flex flex-col items-center gap-[16px] ${isDark ? "bg-[rgba(46,46,46,1)] border-[rgba(1,219,117,0.3)]" : "bg-white border-gray-700 hover:bg-gray-750"}`}
                  onClick={() => handleTokenClick(token.mintAddr)}
                >
                  
                    <img
                      src={token.logo}
                      alt="Token Logo"
                      className="w-44 aspect-square rounded-lg object-cover"
                    />
                  
                  <div
                    className={`text-[14px] leading-none ${
                      isDark ? "text-white" : "text-gray-900"
                    }`}
                  >
                    <div className="flex items-center gap-[24px]">
                      <h3 className="font-bold">${token.ticker.toUpperCase().slice(0, 5)}</h3>
                      <h3>${token.marketCap > 1000000 ? (token.marketCap / 1000000).toFixed(2) + "M" : (token.marketCap / 1000).toFixed(2) + "K"}</h3>
                    </div>
                  </div>
                </div>
              ))}
        </div>
      }
    </div>
  );
};

export default Newly;
