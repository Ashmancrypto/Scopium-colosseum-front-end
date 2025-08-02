import { useState, useEffect, useContext } from 'react';
import { Heart, TrendingUp, TrendingDown } from 'lucide-react';
import { useTheme } from '../../contexts/ThemeContext.jsx';
import { solPriceContext } from '../../contexts/SolPriceContext.jsx';
import { setFavor } from '../../api/user/index.js';
import { useToastContext } from '../../contexts/ToastContext.jsx';
import { getUser } from '../../utils/index.js';
import { formatTokenMarketCap } from '../../utils/formatters.js';

const TokenCard = ({ token }) => {
  const { isDark } = useTheme();
  const { solPrice } = useContext(solPriceContext);
  const toast = useToastContext();
  const [isWatchlisted, setIsWatchlisted] = useState(false);
  const [isUpdatingFavorite, setIsUpdatingFavorite] = useState(false);
  const [imageError, setImageError] = useState(false);

  useEffect(() => {
    setIsWatchlisted(token.isFavorited);
  }, [token.isFavorited]);

  const handleWatchlistToggle = async (e) => {
    e.stopPropagation();

    const currentUser = getUser();
    if (!currentUser) {
      toast.warning('Login Required', 'Please log in to add tokens to favorites.');
      return;
    }

    if (isUpdatingFavorite) return;

    const previousState = isWatchlisted;

    try {
      setIsUpdatingFavorite(true);

      const result = await setFavor(token.tokenId || token._id);

      if (result && typeof result.status === 'boolean') {
        setIsWatchlisted(result.status);

        toast.success(
          result.status ? 'Added to Favorites' : 'Removed from Favorites',
          result.status
            ? `${token.ticker || token.name} has been added to your favorites.`
            : `${token.ticker || token.name} has been removed from your favorites.`
        );
      } else {
        setIsWatchlisted(previousState);
        toast.error(
          'Failed to Update Favorites',
          result?.message || 'Unable to update favorite status. Please try again.'
        );
      }
    } catch (error) {
      console.error('Error updating favorite status:', error);
      setIsWatchlisted(previousState);
      toast.error(
        'Failed to Update Favorites',
        error.message || 'Unable to update favorite status. Please try again.'
      );
    } finally {
      setIsUpdatingFavorite(false);
    }
  };

  const handleImageError = () => {
    setImageError(true);
  };

  const handleCardClick = () => {
    if (token.mintAddr) {
      window.location.href = `/token/${token.mintAddr}`;
    }
  };

  const getPriceChangeColor = (change) => {
    if (!change && change !== 0) return 'text-gray-400';
    const num = parseFloat(change);
    return num >= 0 ? 'text-green-500' : 'text-red-500';
  };

  const getPriceChangeIcon = (change) => {
    if (!change && change !== 0) return null;
    const num = parseFloat(change);
    return num >= 0 ?
      <TrendingUp className="w-3 h-3" /> :
      <TrendingDown className="w-3 h-3" />;
  };

  return (
    <div
      onClick={handleCardClick}
      className={`group rounded-xl p-4 transition-all duration-300 hover:scale-105 cursor-pointer shadow-lg border ${isDark
          ? 'bg-gray-900 border-gray-900'
          : 'bg-white hover:bg-gray-50 border-gray-200'
        }`}
    >
      {/* Top Row: Logo, Chart, Favorite */}
      <div className="flex items-center justify-between mb-4">
        {/* Token Logo */}
        <div className="flex-shrink-0">
          {!imageError && token.logo ? (
            <img
              src={token.logo}
              alt={token.name || token.ticker}
              className="w-12 h-12 rounded-full object-cover"
              onError={handleImageError}
            />
          ) : (
            <div className="w-12 h-12 bg-gradient-to-br from-pink-500 to-violet-500 rounded-full flex items-center justify-center">
              <span className="text-white font-bold text-lg">
                {(token.ticker || token.name || '?').charAt(0).toUpperCase()}
              </span>
            </div>
          )}
        </div>

        {/* Chart */}
        <div className="flex-1 flex justify-center px-4">
          <img
            src="/images/chart.png"
            alt="Price chart"
            className="h-8 w-16 object-contain"
          />
        </div>

        {/* Favorite Button */}
        <button
          onClick={handleWatchlistToggle}
          disabled={isUpdatingFavorite}
          className={`p-2 rounded-lg transition-all duration-200 flex-shrink-0 ${isWatchlisted
            ? isDark 
              ? 'text-green-400 bg-green-400/20 hover:bg-green-400/30'
              : 'text-pink-400 bg-pink-100 hover:bg-pink-200'
            : isDark 
              ? 'text-gray-400 hover:text-green-400 hover:bg-gray-700/50'
              : 'text-gray-500 hover:text-pink-400 hover:bg-gray-100'
          } ${isUpdatingFavorite ? 'opacity-50 cursor-not-allowed' : ''}`}
          title={isWatchlisted ? 'Remove from favorites' : 'Add to favorites'}
        >
          <Heart className={`w-4 h-4 ${isWatchlisted ? 'fill-current' : ''} ${isUpdatingFavorite ? 'animate-pulse' : ''}`} />
        </button>
      </div>

      {/* Bottom Section: Token Info in Single Line */}
      <div className="flex items-center justify-between">
        {/* Token Name */}
        <div className={`font-bold text-base ${isDark ? 'text-white' : 'text-gray-900'
          }`}>
          {token.ticker || token.name || 'Unknown'}
        </div>

        {/* Market Cap */}
        <div className={`text-sm font-medium ${isDark ? 'text-gray-300' : 'text-gray-600'
          }`}>
          {formatTokenMarketCap(token.marketCap, solPrice)}
        </div>

        {/* Price Change */}
        {(token.priceChange || token.priceChange === 0) && (
          <div className={`flex items-center space-x-1 text-sm font-semibold ${getPriceChangeColor(token.priceChange)}`}>
            <span>
              {parseFloat(token.priceChange) >= 0 ? '+' : ''}
              {parseFloat(token.priceChange).toFixed(1)}%
            </span>
            {getPriceChangeIcon(token.priceChange)}
          </div>
        )}
      </div>
    </div>
  );
};

export default TokenCard;