import { useState, useEffect, useCallback } from 'react';

export const useHeaderSearch = (tokens) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [isSearching, setIsSearching] = useState(false);
  const [searchError, setSearchError] = useState(null);
  const [hasSearched, setHasSearched] = useState(false);

  // Debounced search function
  const performSearch = useCallback(async (query) => {
    if (!query || query.trim().length < 2) {
      setSearchResults([]);
      setHasSearched(false);
      setIsSearching(false);
      return;
    }

    try {
      setIsSearching(true);
      setSearchError(null);

      const searchTokens = async (tokens, query) => {
        const searchKey = query.trim().toLowerCase();

        return tokens.filter(token =>
          token.name.toLowerCase().includes(searchKey) ||
          token.ticker.toLowerCase().includes(searchKey) ||
          token.mintAddr.toLowerCase().includes(searchKey)
        );
      };

      const result = await searchTokens(tokens, query);

      if (tokens && Array.isArray(result)) {
        setSearchResults(result);
        setHasSearched(true);
      } else {
        setSearchResults([]);
        setHasSearched(true);
      }
    } catch (error) {
      console.error('Search error:', error);
      setSearchError(error.message || 'Search failed');
      setSearchResults([]);
      setHasSearched(true);
    } finally {
      setIsSearching(false);
    }
  }, [searchQuery]);

  // Debounce search with 500ms delay
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      performSearch(searchQuery);
    }, 500);

    return () => clearTimeout(timeoutId);
  }, [searchQuery, performSearch]);

  const handleSearch = useCallback((query) => {
    setSearchQuery(query);
  }, []);

  const clearSearch = useCallback(() => {
    setSearchQuery('');
    setSearchResults([]);
    setHasSearched(false);
    setSearchError(null);
    setIsSearching(false);
  }, []);

  const refreshSearch = useCallback(() => {
    if (searchQuery) {
      performSearch(searchQuery);
    }
  }, [searchQuery, performSearch]);

  return {
    searchQuery,
    searchResults,
    isSearching,
    searchError,
    hasSearched,
    handleSearch,
    clearSearch,
    refreshSearch
  };
};