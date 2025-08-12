/**
 * Utility functions for formatting data
 */

/**
 * Format a number with commas as thousands separators
 * @param {number} num - The number to format
 * @returns {string} - Formatted number string
 */
export const formatNumber = (num) => {
  if (typeof num !== 'number') return '0';
  return num.toLocaleString();
};

/**
 * Format a currency amount
 * @param {number} amount - The amount to format
 * @param {string} currency - The currency symbol (default: '$')
 * @param {number} decimals - Number of decimal places (default: 2)
 * @returns {string} - Formatted currency string
 */
export const formatCurrency = (amount, currency = '$', decimals = 2) => {
  if (typeof amount !== 'number') return `${currency}0`;
  return `${currency}${amount.toFixed(decimals)}`;
};

/**
 * Format a token amount with appropriate decimal places and smart formatting
 * @param {number} amount - The token amount
 * @param {number} decimals - Number of decimal places (default: 2)
 * @param {boolean} compact - Whether to use compact notation for large numbers
 * @returns {string} - Formatted token amount
 */
export const formatTokenAmount = (amount, decimals = 2, compact = false) => {
  if (typeof amount !== 'number') return '0';
  
  // If compact is true and number is large, use compact notation
  if (compact && amount >= 1000000) {
    if (amount >= 1000000000) {
      return (amount / 1000000000).toFixed(1) + 'B';
    } else if (amount >= 1000000) {
      return (amount / 1000000).toFixed(1) + 'M';
    } else if (amount >= 1000) {
      return (amount / 1000).toFixed(1) + 'K';
    }
  }
  
  // For smaller numbers or when compact is false, use regular formatting
  if (amount >= 1000) {
    return amount.toLocaleString('en-US', {
      minimumFractionDigits: decimals,
      maximumFractionDigits: decimals
    });
  }
  
  return amount.toFixed(decimals);
};

/**
 * Format a large token amount with smart display (compact for very large numbers)
 * @param {number} amount - The token amount
 * @param {number} decimals - Number of decimal places for small numbers
 * @returns {string} - Formatted token amount with smart display
 */
export const formatTokenAmountSmart = (amount, decimals = 2) => {
  if (typeof amount !== 'number') return '0';
  
  // For very large numbers (over 1 million), use compact notation
  if (amount >= 1000000) {
    if (amount >= 1000000000) {
      return (amount / 1000000000).toFixed(2) + 'B';
    } else if (amount >= 1000000) {
      return (amount / 1000000).toFixed(2) + 'M';
    }
  }
  
  // For numbers over 1000, use comma separators with fewer decimals
  if (amount >= 1000) {
    return amount.toLocaleString('en-US', {
      minimumFractionDigits: 0,
      maximumFractionDigits: 2
    });
  }
  
  // For smaller numbers, use the specified decimals
  return amount.toFixed(decimals);
};

/**
 * Format a wallet address for display (shortened)
 * @param {string} address - The wallet address
 * @param {number} startChars - Characters to show at start (default: 6)
 * @param {number} endChars - Characters to show at end (default: 4)
 * @returns {string} - Formatted address
 */
export const formatAddress = (address, startChars = 6, endChars = 4) => {
  if (!address) return '';
  if (address.length <= startChars + endChars) return address;
  return `${address.slice(0, startChars)}...${address.slice(-endChars)}`;
};

/**
 * Format a wallet address for display (shortened)
 * @param {string} address - The wallet address
 * @param {number} startChars - Characters to show at start (default: 6)
 * @param {number} endChars - Characters to show at end (default: 4)
 * @returns {string} - Formatted address
 */
export const formatAddressFront = (address, startChars = 6) => {
  if (!address) return '';
  if (address.length <= startChars) return address;
  return `${address.slice(0, startChars)}`;
};

/**
 * Format a timestamp to a readable date
 * @param {number} timestamp - Unix timestamp
 * @param {object} options - Intl.DateTimeFormat options
 * @returns {string} - Formatted date string
 */
export const formatDate = (timestamp, options = {}) => {
  if (!timestamp) return 'TBA';
  
  const defaultOptions = {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    timeZoneName: 'short'
  };
  
  const date = new Date(timestamp * 1000);
  return date.toLocaleDateString('en-US', { ...defaultOptions, ...options });
};

/**
 * Format a percentage value
 * @param {number} value - The percentage value (0-100)
 * @param {number} decimals - Number of decimal places (default: 2)
 * @returns {string} - Formatted percentage string
 */
export const formatPercentage = (value, decimals = 2) => {
  if (typeof value !== 'number') return '0%';
  return `${value.toFixed(decimals)}%`;
};

/**
 * Format time ago from timestamp
 * @param {number|Date} timestamp - Timestamp or Date object
 * @returns {string} - Formatted time ago string
 */
export const formatTimeAgo = (timestamp) => {
  if (!timestamp) return 'Unknown';
  
  const now = Date.now();
  const time = timestamp instanceof Date ? timestamp.getTime() : new Date(timestamp).getTime();
  const diffMs = now - time;
  const diffMins = Math.floor(diffMs / 60000);
  const diffHours = Math.floor(diffMins / 60);
  const diffDays = Math.floor(diffHours / 24);

  if (diffMins < 1) return 'Just now';
  if (diffMins < 60) return `${diffMins}m ago`;
  if (diffHours < 24) return `${diffHours}h ago`;
  return `${diffDays}d ago`;
};

/**
 * Format price with smart decimal places
 * @param {number} price - The price value
 * @param {string} currency - Currency symbol (default: '$')
 * @returns {string} - Formatted price string
 */
export const formatPrice = (price, currency = '$') => {
  if (!price || typeof price !== 'number') return `${currency}0.00`;
  
  if (price < 0.000001) return `${currency}${price.toExponential(2)}`;
  if (price < 0.01) return `${currency}${price.toFixed(6)}`;
  if (price < 1) return `${currency}${price.toFixed(4)}`;
  if (price < 1000) return `${currency}${price.toFixed(2)}`;
  
  return `${currency}${formatTokenAmountSmart(price)}`;
};

/**
 * Format market cap with smart notation
 * @param {number} marketCap - Market cap value
 * @param {string} currency - Currency symbol (default: '$')
 * @returns {string} - Formatted market cap string
 */
export const formatMarketCap = (marketCap, currency = '$') => {
  if (!marketCap || typeof marketCap !== 'number') return `${currency}0`;
  
  if (marketCap >= 1e9) return `${currency}${(marketCap / 1e9).toFixed(2)}B`;
  if (marketCap >= 1e6) return `${currency}${(marketCap / 1e6).toFixed(2)}M`;
  if (marketCap >= 1e3) return `${currency}${(marketCap / 1e3).toFixed(2)}K`;
  
  return `${currency}${marketCap.toFixed(2)}`;
};

/**
 * Format liquidity value with proper decimals (9 for SOL)
 * @param {number} liquidityValue - Liquidity value in SOL (with 9 decimals)
 * @param {number} solPrice - Current SOL price in USD
 * @param {object} options - Formatting options
 * @returns {string} - Formatted liquidity value
 */
export const formatLiquidity = (liquidityValue, solPrice, options = {}) => {
  const { 
    showSolAmount = true, 
    showUsdAmount = true,
    compact = false 
  } = options;
  
  if (!liquidityValue || !solPrice) {
    return showUsdAmount ? '$0.00' : '0 SOL';
  }
  
  // Convert from lamports (9 decimals) to SOL
  const solAmount = parseFloat(liquidityValue) / Math.pow(10, 9);
  const usdValue = solAmount * parseFloat(solPrice);
  
  if (showSolAmount && showUsdAmount) {
    const formattedSol = solAmount.toFixed(2);
    const formattedUsd = compact ? formatMarketCap(usdValue) : formatPrice(usdValue);
    return `${formattedUsd} (${formattedSol} SOL)`;
  } else if (showUsdAmount) {
    return compact ? formatMarketCap(usdValue) : formatPrice(usdValue);
  } else {
    return `${solAmount.toFixed(2)} SOL`;
  }
};

/**
 * Format SOL amount with USD conversion
 * @param {number} solAmount - Amount in SOL
 * @param {number} solPrice - Current SOL price in USD
 * @param {object} options - Formatting options
 * @returns {string} - Formatted SOL amount with USD value
 */
export const formatSolWithUsd = (solAmount, solPrice, options = {}) => {
  const { 
    showSolAmount = true, 
    showUsdAmount = true,
    solDecimals = 4,
    usdDecimals = 2,
    compact = false 
  } = options;
  
  if (!solAmount || !solPrice) {
    return showUsdAmount ? '$0.00' : '0 SOL';
  }
  
  const usdValue = parseFloat(solAmount) * parseFloat(solPrice);
  
  if (showSolAmount && showUsdAmount) {
    const formattedSol = parseFloat(solAmount).toFixed(solDecimals);
    const formattedUsd = compact ? formatMarketCap(usdValue) : formatPrice(usdValue);
    return `${formattedUsd} (${formattedSol} SOL)`;
  } else if (showUsdAmount) {
    return compact ? formatMarketCap(usdValue) : formatPrice(usdValue);
  } else {
    return `${parseFloat(solAmount).toFixed(solDecimals)} SOL`;
  }
};

/**
 * Format SOL balance with proper decimal places
 * @param {number} balance - SOL balance
 * @param {boolean} loading - Loading state
 * @param {number} decimals - Number of decimal places (default: 4)
 * @returns {string} - Formatted balance string
 */
export const formatBalance = (balance, loading = false, decimals = 4) => {
  if (loading) return '...';
  if (typeof balance !== 'number') return '0.0000';
  return balance.toFixed(decimals);
};

/**
 * Format SOL balance in USD
 * @param {number} balance - SOL balance
 * @param {number} solPrice - Current SOL price
 * @param {boolean} loading - Loading state
 * @param {number} decimals - Number of decimal places (default: 2)
 * @returns {string} - Formatted USD balance string
 */
export const formatBalanceUsd = (balance, solPrice, loading = false, decimals = 2) => {
  if (loading || !solPrice) return '...';
  if (typeof balance !== 'number') return '$0.00';
  const usdValue = balance * parseFloat(solPrice);
  return `$${usdValue.toFixed(decimals)}`;
};

/**
 * Format token price from SOL to USD
 * @param {number} priceInSol - Price in SOL
 * @param {number} solPrice - Current SOL price
 * @returns {string} - Formatted USD price string
 */
export const formatTokenPrice = (priceInSol, solPrice) => {
  if (!priceInSol || !solPrice) return '$0.00';
  const priceInUsd = parseFloat(priceInSol) * parseFloat(solPrice);
  return formatPrice(priceInUsd);
};

/**
 * Format token market cap from SOL to USD
 * @param {number} marketCapInSol - Market cap in SOL
 * @param {number} solPrice - Current SOL price
 * @returns {string} - Formatted USD market cap string
 */
export const formatTokenMarketCap = (marketCapInSol, solPrice) => {
  if (!marketCapInSol || !solPrice) return '$0';
  const marketCapInUsd = parseFloat(marketCapInSol) * parseFloat(solPrice);
  return formatMarketCap(marketCapInUsd);
};