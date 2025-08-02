import React from 'react';
import { RefreshCw, TrendingUp, Clock } from 'lucide-react';
import { useContext } from 'react';
import { solPriceContext } from '../contexts/SolPriceContext.jsx';
import { useTheme } from '../contexts/ThemeContext.jsx';

const SolPriceDisplay = ({ className = '', showRefresh = false, compact = false }) => {
  const { isDark } = useTheme();
  const { solPrice, loading, error, lastUpdated, formatPrice, refreshPrice } = useContext(solPriceContext);

  const formatTimeAgo = (date) => {
    if (!date) return '';
    const now = new Date();
    const diffMs = now - date;
    const diffMins = Math.floor(diffMs / 60000);
    
    if (diffMins < 1) return 'Just now';
    if (diffMins < 60) return `${diffMins}m ago`;
    const diffHours = Math.floor(diffMins / 60);
    if (diffHours < 24) return `${diffHours}h ago`;
    return `${Math.floor(diffHours / 24)}d ago`;
  };

  if (compact) {
    return (
      <div className={`flex items-center space-x-2 ${className}`}>
        <img src="/images/solana.svg" alt="Solana" className={`w-4 h-4 ${
          isDark ? 'filter invert' : ''
        }`} />
        <span className={`font-medium transition-colors duration-300 ${
          isDark ? 'text-white' : 'text-gray-900'
        }`}>
          {loading ? '...' : error ? 'Error' : formatPrice(solPrice)}
        </span>
      </div>
    );
  }

  return (
    <div className={`backdrop-blur-sm rounded-xl p-4 border transition-colors duration-300 ${
      isDark 
        ? 'bg-gray-900/90 border-gray-700' 
        : 'bg-white/90 border-gray-200'
    } ${className}`}>
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-blue-500 rounded-full flex items-center justify-center">
            <img src="/images/solana.svg" alt="Solana" className="w-6 h-6 filter invert" />
          </div>
          <div>
            <h3 className={`font-semibold transition-colors duration-300 ${
              isDark ? 'text-white' : 'text-gray-900'
            }`}>SOL Price</h3>
            <div className="flex items-center space-x-2">
              {loading ? (
                <div className="flex items-center space-x-2">
                  <RefreshCw className={`w-4 h-4 animate-spin transition-colors duration-300 ${
                    isDark ? 'text-gray-400' : 'text-gray-500'
                  }`} />
                  <span className={`text-sm transition-colors duration-300 ${
                    isDark ? 'text-gray-400' : 'text-gray-500'
                  }`}>Loading...</span>
                </div>
              ) : error ? (
                <span className="text-red-400 text-sm">Failed to load</span>
              ) : (
                <>
                  <span className="text-2xl font-bold text-green-400">
                    {formatPrice(solPrice)}
                  </span>
                  <TrendingUp className="w-4 h-4 text-green-400" />
                </>
              )}
            </div>
          </div>
        </div>

        {showRefresh && (
          <button
            onClick={refreshPrice}
            disabled={loading}
            className={`p-2 rounded-lg transition-all duration-200 ${
              loading 
                ? `${isDark ? 'text-gray-500' : 'text-gray-400'} cursor-not-allowed` 
                : `${isDark ? 'text-gray-400 hover:text-white hover:bg-gray-700' : 'text-gray-600 hover:text-gray-900 hover:bg-gray-200'}`
            }`}
            title="Refresh SOL price"
          >
            <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
          </button>
        )}
      </div>

      {lastUpdated && !loading && (
        <div className={`flex items-center space-x-1 mt-2 text-xs transition-colors duration-300 ${
          isDark ? 'text-gray-500' : 'text-gray-500'
        }`}>
          <Clock className="w-3 h-3" />
          <span>Updated {formatTimeAgo(lastUpdated)}</span>
        </div>
      )}
    </div>
  );
};

export default SolPriceDisplay;