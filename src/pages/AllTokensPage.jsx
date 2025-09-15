import React, { useState } from "react";
import Header from "../components/Header.jsx";
import {
  FilterSidebar,
  TokenSections,
  FilteredTokensList,
} from "../components/allTokens/index.js";
import { ListFilter } from "lucide-react";
import { RightSidebar } from "../components/homepage/index.js";
import { useTokens } from "../hooks/useTokens.js";
import { useTheme } from "../contexts/ThemeContext.jsx";
import { MainCtaButton } from "../components/ui/index.js";

const AllTokensPage = () => {
  const { isDark } = useTheme();
  const [isFilterBarVisible, setIsFilterBarVisible] = useState(false);
  const [activeFilters, setActiveFilters] = useState({
    trending: [],
    marketCap: [],
    categories: [],
    userSpecific: [],
  });

  const { tokens, allTokens, trendingTokens, loading, error, refreshTokens } =
    useTokens();

  // Check if any filters are active
  const hasActiveFilters = () => {
    return Object.values(activeFilters).some(
      (filterArray) => filterArray.length > 0
    );
  };

  const handleFilterChange = (filterType, filterValue, isActive) => {
    setActiveFilters((prev) => ({
      ...prev,
      [filterType]: isActive
        ? [...prev[filterType], filterValue]
        : prev[filterType].filter((f) => f !== filterValue),
    }));
  };

  const clearAllFilters = () => {
    setActiveFilters({
      trending: [],
      marketCap: [],
      categories: [],
      userSpecific: [],
    });
  };

  const toggleFilterBar = () => {
    setIsFilterBarVisible(!isFilterBarVisible);
  };

  return (
    <div
      className={`min-h-screen transition-colors duration-300 pb-1 ${
        isDark ? "bg-neutral-950" : "bg-[#EBEBEB]"
      }`}
    >
      <Header />

      <div className="flex">
        {/* Filter Sidebar */}
        {isFilterBarVisible && (
          <div
            className={`w-64 backdrop-blur-md border-r min-h-screen shadow-lg transition-colors duration-300 ${
              isDark
                ? "bg-gray-900/90 border-gray-700"
                : "bg-white/90 border-gray-200"
            }`}
          >
            <FilterSidebar
              activeFilters={activeFilters}
              onFilterChange={handleFilterChange}
              onClearFilters={clearAllFilters}
              onHideFilters={toggleFilterBar}
            />
          </div>
        )}

        {/* Main Content - adjusted for right sidebar */}
        <div
          className={`flex-1 p-4 lg:p-6 min-h-screen transition-colors duration-300 ${
            isDark ? "bg-neutral-950" : "bg-gray-50"
          }`}
        >
          {/* All Filters Button (when filter bar is hidden) */}
          {!isFilterBarVisible && (
            <div className="mb-6">
              <MainCtaButton
                onClick={toggleFilterBar}
                className="flex items-center space-x-2 px-4 py-2"
              >
                <span>All Filters</span>
                <ListFilter className="w-5 h-5" />
              </MainCtaButton>
            </div>
          )}

          {/* Content based on filter state */}
          {hasActiveFilters() ? (
            <FilteredTokensList
              tokens={allTokens}
              activeFilters={activeFilters}
              loading={loading}
              error={error}
              onRefresh={refreshTokens}
            />
          ) : (
            <TokenSections
              tokens={allTokens}
              loading={loading}
              error={error}
              onRefresh={refreshTokens}
            />
          )}
        </div>

        {/* Fixed Right Sidebar */}
        <div className="hidden lg:flex fixed top-20 right-0 bottom-0 pt-20">
          <RightSidebar
            livestreamers={[]}
            tokens={trendingTokens.slice(0, 10)}
          />
        </div>
      </div>
    </div>
  );
};

export default AllTokensPage;
