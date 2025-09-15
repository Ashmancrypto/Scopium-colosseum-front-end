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
    return num >= 0 ? 'text-[rgba(41,167,37,1)]' : 'text-[rgba(211,54,54,1)]';
  };

  const getPriceChangeIcon = (change) => {
    if (!change && change !== 0) return null;
    const num = parseFloat(change);
    return num >= 0 ?
      <TrendingUp className="w-3 h-3" /> :
      <TrendingDown className="w-3 h-3" />;
  };

  const getPriceChartImageSrc = (change) =>{
    if (!change && change !== 0) return null;
    const num = parseFloat(change);
    return num >= 0 ?
    <svg
    width="52"
    height="52"
    viewBox="0 0 52 52"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className='w-[50px] h-[50px]'
  >
    <path
      d="M51 1.01577C49.5455 0.444514 41 15.5351 36.9091 23.1518L33.986 6.01423L27.6876 23.1518L18.7273 26.9235L12.3636 44.2387L9.98482 30.2921L0.999999 51"
      stroke="#29A725"
      strokeWidth="2"
    />
  </svg> :
      <svg
      width="52"
      height="52"
      viewBox="0 0 52 52"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className='w-[50px] h-[50px]'
    >
      <path
        d="M51 50.9842C49.5455 51.5555 41 36.4649 36.9091 28.8482L33.986 45.9858L27.6876 28.8482L18.7273 25.0765L12.3636 7.76131L9.98482 21.7079L0.999999 1"
        stroke="#D33636"
        strokeWidth="2"
      />
    </svg>
  }

  return (
    <div
      onClick={handleCardClick}
      className={`group rounded-[12px] p-4 transition-all duration-300 hover:scale-105 cursor-pointer shadow-lg border ${isDark
          ? 'bg-[rgba(46,46,46,1)] border-[rgba(1,219,117,0.3)]'
          : 'bg-white hover:bg-gray-50 border-[rgba(10,10,10,0.4)]'
        }`}
      style={{boxShadow: '0px 0px 5px 0px rgba(10, 10, 10, 0.15)'}}
    >
      {/* Top Row: Logo, Chart, Favorite */}
      <div className="flex items-center justify-between mb-4">
        {/* Token Logo */}
        <div className="flex-shrink-0">
          {!imageError && token.logo ? (
            <img
              src={token.logo}
              alt={token.name || token.ticker}
              className="w-[60px] h-[60px] rounded-[12px] object-cover"
              onError={handleImageError}
              style={{boxShadow: '0px 0px 15px 0px rgba(151, 151, 151, 0.45)'
              }}
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
        <div className="flex-1 flex justify-center px-6">
          {getPriceChartImageSrc(token.priceChange)}
        </div>

        {/* Favorite Button */}
        <button
          onClick={handleWatchlistToggle}
          disabled={isUpdatingFavorite}
          className={`p-2 rounded-lg transition-all duration-200 self-start flex-shrink-0 ${isWatchlisted
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