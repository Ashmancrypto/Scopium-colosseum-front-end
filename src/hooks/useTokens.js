import { useState, useEffect, useCallback, useContext } from "react";
import { findTokens } from "../api/token/index.js";
import { getTrendingTokens } from "../api/token/index.js";
import { useLogin } from "./auth/useLogin.js";
import { useWallet } from "@solana/wallet-adapter-react";
import { getUser } from "../utils/index.js";
import { useLogout } from "./auth/useLogout.js";
import { AuthContext } from "../contexts/AuthContext.jsx";
import { REAL_SOL_THRESHOLD } from "../contexts/contractsOnSolana/contracts/constants.js";

export const useTokens = () => {
  const { user } = useContext(AuthContext);
  const userId = user?.userId;

  const isMockup = import.meta.env.VITE_IS_MOCKUP === "true";

  const mockupTokens = [
    {
      id: 1,
      tokenId: "1",
      name: "Mockup Token 1",
      symbol: "MTK1",
      price: 100000,
      marketCap: 1000000000,
      priceChange: 100,
      logo: "https://placehold.net/3.png",
      ticker: "MTK1",
      category: "Meme Tokens",
      isFavorited: false,
      isWatchListed: false,
      priceHistory: [
        {
          price: 100000,
          timestamp: "2024-02-09T11:01:00.000Z",
        },
        {
          price: 100000,
          timestamp: "2024-02-10T11:01:00.000Z",
        },
        {
          price: 100000,
          timestamp: "2024-02-11T11:01:00.000Z",
        },
      ],
      cdate: "2023-06-09T11:01:00.000Z",
    },
    {
      id: 2,
      tokenId: "2",
      name: "Mockup Token 2",
      symbol: "MTK2",
      price: 100000,
      marketCap: 1000000000,
      priceChange: 100,
      logo: "https://placehold.net/1.png",
      ticker: "MTK2",
      category: "Meme Tokens",
      isFavorited: true,
      isWatchListed: false,
      priceHistory: [
        {
          price: 100000,
          timestamp: "2024-02-09T11:01:00.000Z",
        },
      ],
      cdate: "2023-07-09T11:01:00.000Z",
    },
    {
      id: 3,
      tokenId: "3",
      name: "Mockup Token 3",
      symbol: "MTK3",
      price: 100000,
      marketCap: 1000000000,
      priceChange: 100,
      logo: "https://placehold.net/2.png",
      ticker: "MTK3",
      category: "Meme Tokens",
      isFavorited: true,
      isWatchListed: false,
      priceHistory: [
        {
          price: 100000,
          timestamp: "2024-02-09T11:01:00.000Z",
        },
      ],
      cdate: "2023-08-09T11:01:00.000Z",
    },
    {
      id: 4,
      tokenId: "4",
      name: "Mockup Token 4",
      symbol: "MTK4",
      price: 100000,
      marketCap: 1000000000,
      priceChange: 100,
      logo: "https://placehold.net/4.png",
      ticker: "MTK4",
      category: "Meme Tokens",
      isFavorited: true,
      isWatchListed: false,
      priceHistory: [
        {
          price: 100000,
          timestamp: "2024-02-09T11:01:00.000Z",
        },
      ],
      cdate: "2023-09-09T11:01:00.000Z",
    },
    {
      id: 5,
      tokenId: "5",
      name: "Mockup Token 5",
      symbol: "MTK5",
      price: 100000,
      marketCap: 1000000000,
      priceChange: 100,
      logo: "https://placehold.net/5.png",
      ticker: "MTK5",
      category: "Meme Tokens",
      isFavorited: true,
      isWatchListed: false,
      priceHistory: [
        {
          price: 100000,
          timestamp: "2024-02-09T11:01:00.000Z",
        },
      ],
      cdate: "2025-02-05T11:01:00.000Z",
    },
  ];

  const [allTokens, setAllTokens] = useState([]);
  const [trendingTokens, setTrendingTokens] = useState([]);
  const [tokens, setTokens] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadingTrending, setLoadingTrending] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  const [filters, setFilters] = useState({
    name: "",
    sortCondition: "creation time",
    sortOrder: "desc",
    nsfw: false,
    category: "All Tokens",
  });
  const { publicKey, disconnecting } = useWallet();

  const { login } = useLogin();
  const { logout } = useLogout();

  const TOKENS_PER_PAGE = 9;

  const fetchTokens = async () => {
    if (isMockup) {
      setAllTokens(mockupTokens);
      setLoading(false);
      setError(null);
      return;
    }
    try {
      setLoading(true);
      setError(null);

      const result = await findTokens(
        filters.name,
        `sort: ${filters.sortCondition}`,
        `sort: ${filters.sortOrder}`,
        filters.nsfw,
        userId || null
      );

      if (result && Array.isArray(result)) {
        setAllTokens(result);
      } else {
        setAllTokens([]);
      }
    } catch (err) {
      console.error("Error fetching tokens:", err);
      setError(err.message || "Failed to fetch tokens");
      setAllTokens([]);
    } finally {
      setLoading(false);
    }
  };

  const fetchTrendingTokens = async () => {
    if (isMockup) {
      setTrendingTokens(mockupTokens);
      setLoadingTrending(false);
      setError(null);
      return;
    }
    try {
      setLoadingTrending(true);
      const userId = user?.userId || "";

      console.log("Fetching trending tokens for userId:", userId);

      // Fetch tokens sorted by market cap (trending)
      const result = await getTrendingTokens(userId);

      console.log("Trending tokens API result:", result);

      if (result && Array.isArray(result)) {
        // Take first 20 tokens for trending section
        const tokensToSet = result.slice(0, 20);
        console.log("Setting trending tokens:", tokensToSet);
        setTrendingTokens(tokensToSet);
      } else {
        console.log("No trending tokens or invalid format:", result);
        setTrendingTokens([]);
      }
    } catch (error) {
      console.error("Error fetching trending tokens:", error);
      setTrendingTokens([]);
    } finally {
      setLoadingTrending(false);
    }
  };

  // Filter tokens by category
  const filterTokensByCategory = useCallback((tokens, category) => {
    if (category === "All Tokens") {
      return tokens;
    }

    const categoryMap = {
      "Meme Tokens": 1,
      "Fame Tokens": 2,
      "AI Tokens": 3,
    };

    const categoryId = categoryMap[category];
    if (categoryId !== undefined) {
      const filtered = tokens.filter((token) => token.category === categoryId);
      return filtered;
    }

    return tokens;
  }, []);

  // Apply category filter and pagination
  useEffect(() => {
    const filteredTokens = filterTokensByCategory(allTokens, filters.category);

    // Apply pagination
    const startIndex = (currentPage - 1) * TOKENS_PER_PAGE;
    const endIndex = startIndex + TOKENS_PER_PAGE;
    const paginatedTokens = filteredTokens.slice(startIndex, endIndex);

    setTokens(paginatedTokens);
  }, [allTokens, filters.category, currentPage, filterTokensByCategory]);

  useEffect(() => {
    fetchTokens();
    fetchTrendingTokens();
  }, [userId]);

  useEffect(() => {
    fetchTokens();
  }, [filters.name, filters.sortCondition, filters.sortOrder, filters.nsfw]);

  const updateFilters = useCallback((newFilters) => {
    setFilters((prev) => ({ ...prev, ...newFilters }));
    // Reset to first page when filters change
    setCurrentPage(1);
  }, []);

  const searchTokens = useCallback(
    (searchTerm) => {
      updateFilters({ name: searchTerm });
    },
    [updateFilters]
  );

  const sortTokens = useCallback(
    (sortCondition, sortOrder = "desc") => {
      updateFilters({ sortCondition, sortOrder });
    },
    [updateFilters]
  );

  const setCategory = useCallback(
    (category) => {
      updateFilters({ category });
    },
    [updateFilters]
  );

  const refreshTokens = useCallback(() => {
    fetchTokens();
    fetchTrendingTokens();
  }, [fetchTokens]);

  const toggleNSFW = useCallback(() => {
    updateFilters({ nsfw: !filters.nsfw });
  }, [filters.nsfw, updateFilters]);

  const nextPage = useCallback(() => {
    const filteredTokens = filterTokensByCategory(allTokens, filters.category);
    const totalPages = Math.ceil(filteredTokens.length / TOKENS_PER_PAGE);
    if (currentPage < totalPages) {
      const newPage = currentPage + 1;
      setCurrentPage(newPage);
    }
  }, [allTokens, filters.category, currentPage, filterTokensByCategory]);

  const prevPage = useCallback(() => {
    if (currentPage > 1) {
      const newPage = currentPage - 1;
      setCurrentPage(newPage);
    }
  }, [currentPage]);

  const goToPage = useCallback(
    (page) => {
      const filteredTokens = filterTokensByCategory(
        allTokens,
        filters.category
      );
      const totalPages = Math.ceil(filteredTokens.length / TOKENS_PER_PAGE);
      if (page >= 1 && page <= totalPages) {
        setCurrentPage(page);
      }
    },
    [allTokens, filters.category, filterTokensByCategory]
  );

  // Calculate pagination info
  const filteredTokens = filterTokensByCategory(allTokens, filters.category);
  const favoriteTokens = allTokens.filter((token) => token.isFavorited);
  const watchListedTokens = allTokens.filter((token) => token.isWatchListed);
  const migratedTokens = allTokens.filter(
    (token) => token.quoteReserve / 10 ** 9 >= REAL_SOL_THRESHOLD
  );
  const totalTokens = filteredTokens.length;
  const totalPages = Math.ceil(totalTokens / TOKENS_PER_PAGE);
  const hasNextPage = currentPage < totalPages;
  const hasPrevPage = currentPage > 1;

  const paginationInfo = {
    currentPage,
    totalPages,
    totalTokens,
    tokensPerPage: TOKENS_PER_PAGE,
    hasNextPage,
    hasPrevPage,
    nextPage,
    prevPage,
    goToPage,
  };

  return {
    tokens,
    allTokens: filteredTokens,
    trendingTokens,
    favoriteTokens,
    watchListedTokens,
    migratedTokens,
    loading,
    loadingTrending,
    error,
    filters,
    pagination: paginationInfo,
    searchTokens,
    sortTokens,
    setCategory,
    updateFilters,
    refreshTokens,
    toggleNSFW,
    fetchTrendingTokens,
  };
};
