import { useTokens } from "../../hooks/useTokens.js";
import TokenGraphCard from "../allTokens/TokenGraphCard.jsx";
import { useTheme } from "../../contexts/ThemeContext";

const TokensTab = () => {
  const { allTokens } = useTokens();
  const { isDark } = useTheme();
  // Always show mockup data for streamer profile pages - Does not have API call for streamer tokens yet
  const isMockup = true;
  if (!isMockup || allTokens.length === 0) {
    return (
      <div className="pt-[80px] w-full px-4 sm:px-0">
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
            No tokens yet
          </p>
          <p
            className={`text-sm ${isDark ? "text-gray-400" : "text-gray-600"}`}
          >
            Check back later for token content!
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-[80px] w-full px-4 sm:px-0">
      <div className="flex flex-col gap-[80px] sm:hidden">
        {allTokens.map((token) => (
          <TokenGraphCard key={token.id} token={token} wFull={true} />
        ))}
      </div>

      <div className="flex-col gap-[80px] sm:flex hidden">
        {allTokens.map((token) => (
          <TokenGraphCard key={token.id} token={token} wFull={false} />
        ))}
      </div>
    </div>
  );
};

export default TokensTab;
