import React, { useState } from "react";
import { TokenGrid, TokenCard } from "./index.js";
import { Loader, AlertCircle, RefreshCw } from "lucide-react";
import { useTheme } from "../../contexts/ThemeContext.jsx";
import TokenScrollSection from "./TokenScrollSection.jsx";

const TokenSections = ({ tokens, loading, error, onRefresh, isFilterBarVisible }) => {
  const { isDark } = useTheme();

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
          <div className="">
              <TokenScrollSection tokens={favoriteTokens} paddingLeft={52} isFilterBarVisible={isFilterBarVisible} />
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
        <div className="flex items-center justify-start gap-5 pb-4 mb-4 pl-[28px]">
          <h2
            className={`text-xl font-semibold transition-colors duration-300 ${
              isDark ? "text-white" : "text-black"
            }`}
          >
            New tokens
          </h2>
        </div>

        {newTokens.length > 0 ? (
              <TokenScrollSection reversed={true} tokens={newTokens} paddingLeft={52} isFilterBarVisible={isFilterBarVisible} />
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
