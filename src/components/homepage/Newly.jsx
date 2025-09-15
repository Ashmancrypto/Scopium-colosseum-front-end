import { useState } from "react";
import { useTheme } from "../../contexts/ThemeContext.jsx";
import { useTokens } from "../../hooks/useTokens.js";
import { useEffect, useRef } from "react";

const Newly = () => {
  const { isDark } = useTheme();
  const { allTokens, loading } = useTokens();
  const [height, setHeight] = useState(0);
  const ref = useRef(null);

  const handleTokenClick = (tokenAddress) => {
    if (tokenAddress) {
      window.location.href = `/token/${tokenAddress}`;
    }
  };

  const updateHeight = () => {
    if(!ref.current) return;
    const bottomOfViewport = window.innerHeight;
    const topOfElement = ref.current.getBoundingClientRect().top;
    setHeight(bottomOfViewport - topOfElement);
  };

  useEffect(() => {
    updateHeight();
    window.addEventListener("scroll", updateHeight);
    return () => {
      window.removeEventListener("scroll", updateHeight);
    };
  }, []);

  return (
    <div
      className={`hidden lg:block asbolute left-0 top-20 w-[192px] space-y-3 p-4 overflow-scroll no-scrollbar ${
        isDark ? "bg-[rgba(26,26,26,1)]" : "bg-white"
      }`}
      style={{
        boxShadow: isDark
          ? "inset 0 4px 3px -2px rgba(1, 219, 117, 0.25)"
          : "inset 0 4px 3px -2px rgba(250, 78, 171, 0.25)",
        height: `${height}px`,
      }}
      ref={ref}
    >
      <div>
        <h2
          className={`text-[min(18px,1.5vw)] font-bold ${
            isDark ? "text-white" : "text-gray-900"
          }`}
        >
          New Tokens
        </h2>
      </div>
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
            : allTokens.slice(0, 6).map((token) => (
                <div
                  key={token.tokenId}
                  className={`w-full rounded-[12px] ransition-all duration-200 cursor-pointer hover:scale-105 border p-[12px] pb-[16px] flex flex-col items-center gap-[16px] ${
                    isDark
                      ? "bg-[rgba(46,46,46,1)] border-[rgba(1,219,117,0.3)]"
                      : "bg-white border-gray-700 hover:bg-gray-750"
                  }`}
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
                      <h3 className="font-bold">
                        ${token.ticker.toUpperCase().slice(0, 5)}
                      </h3>
                      <h3>
                        $
                        {token.marketCap > 1000000
                          ? (token.marketCap / 1000000).toFixed(2) + "M"
                          : (token.marketCap / 1000).toFixed(2) + "K"}
                      </h3>
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
