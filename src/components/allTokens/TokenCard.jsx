import { useContext, useEffect, useState } from 'react';
import { Heart, TrendingUp, TrendingDown } from 'lucide-react';
import { solPriceContext } from '../../contexts/SolPriceContext.jsx';
import { setFavor } from '../../api/user/index.js';
import { useToastContext } from '../../contexts/ToastContext.jsx';
import { getUser } from '../../utils/index.js';
import {
  formatPercentage,
  formatTokenMarketCap,
} from '../../utils/formatters.js';
import { useTheme } from '../../contexts/ThemeContext.jsx';

const TokenCard = ({ token }) => {
  const { isDark } = useTheme();
  const toast = useToastContext();
  const [isWatchlisted, setIsWatchlisted] = useState(false);
  const [imageError, setImageError] = useState(false);
  const [isUpdatingFavorite, setIsUpdatingFavorite] = useState(false);
  const { solPrice } = useContext(solPriceContext);

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
            ? `${token.ticker} added to your favorites.`
            : `${token.ticker} removed from your favorites.`
        );
      } else {
        setIsWatchlisted(previousState);
        toast.error('Failed to Update Favorites');
      }
    } catch (err) {
      console.error(err);
      setIsWatchlisted(previousState);
      toast.error('Favorite update failed', err.message);
    } finally {
      setIsUpdatingFavorite(false);
    }
  };

  const handleImageError = () => setImageError(true);

  const getChangeColor = (change) => {
    if (change === undefined || change === null) return 'text-gray-400';
    const num = parseFloat(change);
    return num >= 0 ? 'text-green-500' : 'text-red-500';
  };

  const getChangeIcon = (change) => {
    if (change === undefined || change === null) return null;
    const num = parseFloat(change);
    return num >= 0 ? (
      <TrendingUp className="w-3 h-3" />
    ) : (
      <TrendingDown className="w-3 h-3" />
    );
  };

  const handleCardClick = () => {
    if (token.mintAddr) {
      window.location.href = `/token/${token.mintAddr}`;
    }
  };

  return (
    <div
      onClick={handleCardClick}
      className={`relative rounded-xl p-3 pt-12 shadow border text-center w-[min(100%,240px)] hover:scale-[1.01] transition-all cursor-pointer mb-3 ${isDark
        ? 'bg-gray-900 border-gray-700 hover:bg-gray-900 hover:border-gray-600'
        : 'bg-white border-black/10 hover:bg-gray-50 hover:border-gray-300'
        }`}
    >
      {/* Token Logo - Floating */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2">
        <div className="w-16 h-16 rounded-[16px] shadow-md overflow-hidden">
          {!imageError && token.logo ? (
            <img
              src={token.logo}
              alt={token.ticker}
              onError={handleImageError}
              className="w-full h-full object-cover"
            />
          ) : (
            <div className={`w-full h-full flex items-center justify-center font-bold text-white text-xl ${isDark ? 'bg-gray-600' : 'bg-gray-300'
              }`}>
              {token.ticker?.charAt(0).toUpperCase() || '?'}
            </div>
          )}
        </div>
      </div>

      {/* Heart Icon */}
      <button
        onClick={handleWatchlistToggle}
        disabled={isUpdatingFavorite}
        className={`absolute top-2 right-2 hover:scale-110 transition-transform ${isWatchlisted
          ? isDark
            ? 'text-green-400'
            : 'text-pink-400'
          : isDark
            ? 'text-gray-500 hover:text-green-400'
            : 'text-gray-400 hover:text-pink-400'
          }`}
      >
        <Heart
          className={`w-4 h-4 ${isWatchlisted ? 'fill-current' : ''} ${isUpdatingFavorite ? 'animate-pulse' : ''
            }`}
        />
      </button>

      {/* Token Info */}
      <div
        className={`mt-1 flex items-center justify-between text-sm font-medium transition-colors duration-300 ${isDark ? 'text-white' : 'text-black'
          }`}
      >
        <span className="truncate max-w-[33%] text-left">${token.ticker || '???'}</span>
        <span
          className={`truncate max-w-[34%] text-center ${isDark ? 'text-gray-300' : 'text-black/80'
            }`}
        >
          {formatTokenMarketCap(token.marketCap, solPrice)}
        </span>
        {(token.priceChange || token.priceChange === 0) && (
          <span
            className={`flex items-center justify-end truncate max-w-[33%] ${getChangeColor(
              token.priceChange
            )}`}
          >
            {getChangeIcon(token.priceChange)}
            <span className="ml-0.5">
              {parseFloat(token.priceChange) >= 0 ? '+' : ''}
              {formatPercentage(token.priceChange)}
            </span>
          </span>
        )}
      </div>
    </div>
  );
};

export default TokenCard;