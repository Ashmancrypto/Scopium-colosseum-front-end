import { TokenGrid } from "./index.js";
import TokenGraphCard from "./TokenGraphCard.jsx";
import { useState, useEffect, useRef } from "react";
import { useTheme } from "../../contexts/ThemeContext.jsx";

const TokenScrollSection = ({ tokens, paddingLeft = 24, reversed = false, isFilterBarVisible = false }) => {

  const {isDark} = useTheme();
  const sectionRepeat = Math.ceil(tokens.length / 12);
  const [highestValueTokenIndex, setHighestValueTokenIndex] = useState(0);

  const scrollContainerRef = useRef(null);
  const [scrollPercent, setScrollPercent] = useState(0);

  const handleScroll = (e) => {
    const ref = scrollContainerRef.current;
    if (!ref) return;
    const scrollLeft = ref.scrollLeft;
    const maxScrollLeft = ref.scrollWidth - ref.clientWidth;
    const percent = (scrollLeft / maxScrollLeft) * 100;
    setScrollPercent(percent);
  };

  useEffect(() => {
    let maxTrendingScore = 0;
    tokens.forEach((token, index) => {
      if (token.trendingScore > maxTrendingScore) {
        maxTrendingScore = token.trendingScore;
        setHighestValueTokenIndex(index);
      }
    });
  }, [tokens]);

  return (
    <div className={`overflow-x-hidden mb-12 ${isFilterBarVisible ? "w-[calc(98vw-275px)] lg:w-[calc(100vw-380px)]" : "w-[98vw] lg:w-[calc(100vw-90px)]"}`}>
      
      {reversed ? <div
        ref={scrollContainerRef}
        onScroll={handleScroll}
        className={"flex items-stretch gap-6 overflow-x-scroll pt-12 pr-36 no-scrollbar"}
        style={{ paddingLeft: `${paddingLeft}px` }}
      >
        <div className="flex-shrink-0">
          <TokenGrid
            tokens={tokens.length > 12 ? tokens.slice(0, 12) : tokens}
          />
        </div>
        <div className="flex-shrink-0 pb-[34px]">
          <TokenGraphCard token={tokens[highestValueTokenIndex || 0]} />
        </div>
        <div className="flex-shrink-0">
          {sectionRepeat > 1 && (
            <div className="flex-shrink-0">
              <TokenGrid
                tokens={
                  tokens.length > 24
                    ? tokens.slice(12, 24)
                    : tokens.slice(12, tokens.length)
                }
              />
            </div>
          )}
        </div>
      </div> : 
      <div
      ref={scrollContainerRef}
      onScroll={handleScroll}
      className={"flex items-stretch gap-6 overflow-x-scroll pt-12 pr-36 no-scrollbar"}
      style={{ paddingLeft: `${paddingLeft}px` }}
    >
      
      <div className="flex-shrink-0 pb-[34px]">
        <TokenGraphCard token={tokens[highestValueTokenIndex || 0]} />
      </div>
      <div className="flex-shrink-0">
        <TokenGrid
          tokens={tokens.length > 12 ? tokens.slice(0, 12) : tokens}
        />
      </div>
      <div className="flex-shrink-0">
        {sectionRepeat > 1 && (
          <div className="flex-shrink-0">
            <TokenGrid
              tokens={
                tokens.length > 24
                  ? tokens.slice(12, 24)
                  : tokens.slice(12, tokens.length)
              }
            />
          </div>
        )}
      </div>
    </div>
      }
      <div
        className={`mx-auto mt-[48px] w-[440px] h-[4px] rounded-full ${
          isDark ? "bg-[rgba(255,255,255,0.5)]" : "bg-[rgba(255,215,236,1)]"
        }`}
      >
        <div
          className={`h-full ${
            isDark ? "bg-[rgba(1,219,117,1)]" : "bg-[rgba(250,78,171,1)]"
          }`}
          style={{ width: `${scrollPercent}%` }}
        />
      </div>
    </div>
  );
};



export default TokenScrollSection;
