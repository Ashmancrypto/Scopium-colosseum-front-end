import { useState } from "react";
import Header from "../components/Header.jsx";
import {
  FilterSidebar,
  TokenSections,
  FilteredTokensList,
} from "../components/allTokens/index.js";
import { ListFilter } from "lucide-react";
import { useTokens } from "../hooks/useTokens.js";
import { useTheme } from "../contexts/ThemeContext.jsx";
import { MainCtaButton } from "../components/ui/index.js";
import { motion, AnimatePresence } from "motion/react";
import { useWindowSize } from "../hooks/useWindowSize.js";

const AllTokensPage = () => {
  const { isDark } = useTheme();
  const { width } = useWindowSize();
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
      className={`min-h-screen transition-colors duration-300 pb-1 max-w-screen relative ${
        isDark ? "bg-neutral-950" : "bg-[#EBEBEB]"
      } ${
        isFilterBarVisible && width < 1024
          ? "w-[97vw] overflow-x-hidden"
          : "w-full"
      }`}
      style={{
        zIndex: 1000,
      }}
    >
      <Header showRightSidebar={true} />

      <div className="flex">
        {/* Filter Sidebar */}
        <AnimatePresence mode="sync">
          {isFilterBarVisible && (
            <motion.div
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ duration: 0.2, ease: "easeInOut" }}
              key="filter-sidebar"
              className={`backdrop-blur-md border-r min-h-screen shadow-lg transition-colors duration-300 ${
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
            </motion.div>
          )}
        </AnimatePresence>

        {/* Main Content - adjusted for right sidebar */}
        <div
          className={`flex-1 pr-0 lg:pr-[80px] min-h-screen transition-colors duration-300 pt-[40px] ${
            isDark ? "bg-neutral-950" : "bg-gray-50"
          }`}
        >
          {/* All Filters Button (when filter bar is hidden) */}
          {!isFilterBarVisible && (
            <div className="mb-6 pl-[28px]">
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
              isFilterBarVisible={isFilterBarVisible}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default AllTokensPage;
