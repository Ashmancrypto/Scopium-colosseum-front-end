import React from "react";
import { TokenGrid } from "./index.js";
import { Loader, AlertCircle, RefreshCw, Filter } from "lucide-react";
import { useTheme } from "../../contexts/ThemeContext.jsx";

const FilteredTokensList = ({
  tokens,
  activeFilters,
  loading,
  error,
  onRefresh,
}) => {
  const { isDark } = useTheme();

  // Filter tokens based on active filters
  const getFilteredTokens = () => {
    if (!tokens) return [];

    let filtered = [...tokens];

    // Apply trending filters
    if (activeFilters.trending.length > 0) {
      activeFilters.trending.forEach((filter) => {
        switch (filter) {
          case "newly_created":
            filtered = filtered.sort(
              (a, b) => new Date(b.cdate) - new Date(a.cdate)
            );
            break;
          case "popular":
            filtered = filtered.sort(
              (a, b) => (b.replies || 0) - (a.replies || 0)
            );
            break;
          case "biggest_gainers":
            filtered = filtered
              .filter((token) => parseFloat(token.priceChange || 0) > 0)
              .sort(
                (a, b) =>
                  parseFloat(b.priceChange || 0) -
                  parseFloat(a.priceChange || 0)
              );
            break;
          case "biggest_losers":
            filtered = filtered
              .filter((token) => parseFloat(token.priceChange || 0) < 0)
              .sort(
                (a, b) =>
                  parseFloat(a.priceChange || 0) -
                  parseFloat(b.priceChange || 0)
              );
            break;
          case "scopium_picks":
            // Filter for featured tokens (you can implement your own logic)
            filtered = filtered.filter((token) => token.featured);
            break;
        }
      });
    }

    // Apply market cap filters
    if (activeFilters.marketCap.length > 0) {
      activeFilters.marketCap.forEach((filter) => {
        switch (filter) {
          case "high_to_low":
            filtered = filtered.sort(
              (a, b) =>
                parseFloat(b.marketCap || 0) - parseFloat(a.marketCap || 0)
            );
            break;
          case "low_to_high":
            filtered = filtered.sort(
              (a, b) =>
                parseFloat(a.marketCap || 0) - parseFloat(b.marketCap || 0)
            );
            break;
        }
      });
    }

    // Apply category filters
    if (activeFilters.categories.length > 0) {
      filtered = filtered.filter((token) => {
        const categoryMap = {
          meme: 1,
          fame: 2,
          ai: 3,
          utility: 4,
          other: 5,
        };

        return activeFilters.categories.some(
          (category) => token.category === categoryMap[category]
        );
      });
    }

    // Apply user-specific filters
    if (activeFilters.userSpecific.length > 0) {
      activeFilters.userSpecific.forEach((filter) => {
        switch (filter) {
          case "watchlist":
            filtered = filtered.filter((token) => token.isFavorited);
            break;
        }
      });
    }

    return filtered;
  };

  const filteredTokens = getFilteredTokens();

  // Get active filter labels for display
  const getActiveFilterLabels = () => {
    const labels = [];

    Object.entries(activeFilters).forEach(([key, values]) => {
      values.forEach((value) => {
        const labelMap = {
          newly_created: "Newly created",
          popular: "Popular",
          scopium_picks: "Scopium picks",
          biggest_gainers: "Biggest gainers",
          biggest_losers: "Biggest losers",
          high_to_low: "High to low",
          low_to_high: "Low to high",
          ai: "AI",
          meme: "Meme",
          utility: "Utility",
          watchlist: "Watchlist",
        };

        if (labelMap[value]) {
          labels.push(labelMap[value]);
        }
      });
    });

    return labels;
  };

  const activeFilterLabels = getActiveFilterLabels();

  if (loading) {
    return (
      <div className="flex items-center justify-center py-16">
        <Loader className="w-8 h-8 text-pink-400 animate-spin" />
        <span
          className={`ml-3 text-lg ${isDark ? "text-white" : "text-gray-900"}`}
        >
          Loading filtered tokens...
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
            className="flex items-center space-x-2 px-4 py-2 bg-pink-500/20 text-pink-400 border border-pink-500/30 rounded-lg hover:bg-pink-500/30 transition-colors"
          >
            <RefreshCw className="w-4 h-4" />
            <span>Try Again</span>
          </button>
        )}
      </div>
    );
  }

  return (
    <div className="pl-[28px]">
      {/* Active Filters Display */}
      {activeFilterLabels.length > 0 && (
        <div className="mb-6">
          <div className="flex items-center space-x-2 mb-3">
            <Filter
              className={`w-4 h-4 ${
                isDark ? "text-gray-400" : "text-gray-600"
              }`}
            />
            <span
              className={`text-sm font-medium ${
                isDark ? "text-gray-300" : "text-gray-700"
              }`}
            >
              Active Filters:
            </span>
          </div>
          <div className="flex flex-wrap gap-2">
            {activeFilterLabels.map((label, index) => (
              <span
                key={index}
                className={`px-3 py-1 rounded-xl text-xs font-medium border ${
                  isDark
                    ? "bg-green-500/20 text-green-400 border-green-500/30"
                    : "bg-pink-100 text-pink-600 border-pink-300"
                }`}
              >
                {label}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Results Count */}
      <div className="mb-10">
        <p className={`text-sm ${isDark ? "text-gray-400" : "text-gray-600"}`}>
          Showing {filteredTokens.length} token
          {filteredTokens.length !== 1 ? "s" : ""}
        </p>
      </div>

      {/* Filtered Tokens Grid */}
      {filteredTokens.length > 0 ? (
        <TokenGrid tokens={filteredTokens} />
      ) : (
        <div
          className={`text-center py-16 ${
            isDark ? "text-gray-400" : "text-gray-600"
          }`}
        >
          <Filter className="w-12 h-12 mx-auto mb-4 opacity-50" />
          <p className="text-lg mb-2">No tokens match your filters</p>
          <p className="text-sm">Try adjusting your filter criteria</p>
        </div>
      )}
    </div>
  );
};

export default FilteredTokensList;
