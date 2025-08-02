import { useState, useEffect, useCallback, createContext } from 'react';

export const solPriceContext = createContext({});

let solPriceInterval = 0;
export const SolPriceProvider = ({ children }) => {
  const [solPrice, setSolPrice] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [lastUpdated, setLastUpdated] = useState(null);

  const fetchSolPrice = useCallback(async () => {

    try {
      setLoading(true);
      setError(null);

      const response = await fetch('https://api.coingecko.com/api/v3/simple/price?ids=solana&vs_currencies=usd');

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();

      if (data.solana && data.solana.usd) {
        setSolPrice(parseFloat(data.solana.usd));
        setLastUpdated(new Date());
      } else {
        throw new Error('SOL price not found in response');
      }
    } catch (err) {
      console.error('Error fetching SOL price:', err);
      setError(err.message || 'Failed to fetch SOL price');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {

    fetchSolPrice();

    // Update price every 2 minutes (120 seconds) instead of 30 seconds
    clearInterval(solPriceInterval);
    solPriceInterval = setInterval(fetchSolPrice, 120000);

    return () => clearInterval(solPriceInterval);
  }, [fetchSolPrice]);

  const formatPrice = useCallback((price) => {
    if (!price) return '$0.00';
    return `$${parseFloat(price).toFixed(2)}`;
  }, []);

  const refreshPrice = useCallback(() => {
    fetchSolPrice();
  }, [fetchSolPrice]);

  // Helper function to convert SOL amounts to USD
  const convertSolToUsd = useCallback((solAmount) => {
    if (!solAmount || !solPrice) return 0;
    return parseFloat(solAmount) * parseFloat(solPrice);
  }, [solPrice]);

  // Helper function to format SOL to USD conversion
  const formatSolToUsd = useCallback((solAmount, options = {}) => {
    const {
      showSolAmount = false,
      decimals = 2,
      compact = false
    } = options;

    if (!solAmount || !solPrice) return '$0.00';

    const usdValue = convertSolToUsd(solAmount);
    let formattedUsd;

    if (compact) {
      if (usdValue >= 1e9) formattedUsd = `$${(usdValue / 1e9).toFixed(1)}B`;
      else if (usdValue >= 1e6) formattedUsd = `$${(usdValue / 1e6).toFixed(1)}M`;
      else if (usdValue >= 1e3) formattedUsd = `$${(usdValue / 1e3).toFixed(1)}K`;
      else formattedUsd = `$${usdValue.toFixed(decimals)}`;
    } else {
      if (usdValue < 0.000001) formattedUsd = `$${usdValue.toExponential(2)}`;
      else if (usdValue < 0.01) formattedUsd = `$${usdValue.toFixed(6)}`;
      else if (usdValue < 1) formattedUsd = `$${usdValue.toFixed(4)}`;
      else formattedUsd = `$${usdValue.toFixed(decimals)}`;
    }

    if (showSolAmount) {
      return `${formattedUsd} (${parseFloat(solAmount).toFixed(4)} SOL)`;
    }

    return formattedUsd;
  }, [solPrice, convertSolToUsd]);

  return (
    < solPriceContext.Provider value={{
      solPrice,
      loading,
      error,
      lastUpdated,
      formatPrice,
      refreshPrice,
      convertSolToUsd,
      formatSolToUsd
    }
    }>
      {children}
    </solPriceContext.Provider >
  );
};