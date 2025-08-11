import React, { useState, useEffect, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Heart, Share2, ExternalLink, TrendingUp, TrendingDown, Users, DollarSign, Activity, MessageCircle, X, Send, Plus } from 'lucide-react';
import Header from '../components/Header.jsx';
import { useTheme } from '../contexts/ThemeContext.jsx';
import { getToken, getTradeHistory, getTokenHolderDistribution } from '../api/token/index.js';
import { setFavor } from '../api/user/index.js';
import { useToastContext } from '../contexts/ToastContext.jsx';
import { getUser } from '../utils/index.js';
import { solPriceContext } from '../contexts/SolPriceContext.jsx';
import { formatTokenPrice, formatTokenMarketCap, formatAddress, formatTimeAgo } from '../utils/formatters.js';
import { TradingInterface, TokenChart, HolderDistribution, TransactionTable } from '../components/tokenPage/index.js';
import Chat from '../components/tokenPage/Chat';

const TokenPage = () => {
  const { tokenAddress } = useParams();
  const navigate = useNavigate();
  const { isDark } = useTheme();
  const toast = useToastContext();
  const { solPrice } = useContext(solPriceContext);

  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [transactions, setTransactions] = useState([]);
  const [loadingTransactions, setLoadingTransactions] = useState(true);
  const [isWatchlisted, setIsWatchlisted] = useState(false);
  const [activeTab, setActiveTab] = useState('chart');
  const user = getUser();
  const currentUserId = user?._id;
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [chatMessage, setChatMessage] = useState('');
  const [holderDistribution, setHolderDistribution] = useState([]);
  const [isTrading, setIsTrading] = useState(false);

  useEffect(() => {
    const fetchHolderDistribution = async () => {
      try {
        const userId = currentUserId || '';
        const data = await getTokenHolderDistribution(tokenAddress, userId);
        // console.log("Holders:", data)
        // Take top 10 holders and transform
        const transformed = data.slice(0, 10).map(holder => ({
          address: holder.username || holder.walletAddr, // Use username if available, else wallet address
          percentage: parseFloat(holder.holdPercent.toFixed(2)), // Format to 2 decimal places
          isNegative: false, // Backend does not provide this information yet
          solAmount: null, // Placeholder until backend provides SOL amount
          createdAt: null,  // Placeholder until backend provides unix timestamp like 1754417665000
          avatar: holder.avatar // Include avatar from backend
        }));
        setHolderDistribution(transformed);
      } catch (error) {
        console.error("Error fetching holder distribution:", error);
      }
    };

    if (tokenAddress) {
      fetchHolderDistribution();
    }
  }, [tokenAddress]);

  useEffect(() => {
    fetchTokenData();
    fetchTransactions();
  }, [tokenAddress]);

  const fetchTokenData = async () => {
    try {
      setLoading(true);
      const user = getUser();
      const userId = user?.userId || '';
      const result = await getToken(tokenAddress, userId);
      if (result) {
        setToken(result);
        console.log('debug token result::', result)
        setIsWatchlisted(result.isFavorited || false);
      } else {
        setError('Token not found');
      }
    } catch (err) {
      console.error('Error fetching token:', err);
      setError('Failed to load token data');
    } finally {
      setLoading(false);
    }
  };

  const fetchTransactions = async () => {
    try {
      setLoadingTransactions(true);
      const result = await getTradeHistory(tokenAddress);
      if (result && Array.isArray(result)) {
        setTransactions(result);
      }
    } catch (err) {
      console.error('Error fetching transactions:', err);
    } finally {
      setLoadingTransactions(false);
    }
  };

  useEffect(() => {
    if (!isTrading) {
      fetchTransactions()
    }
  }, [isTrading])


  const handleWatchlistToggle = async () => {
    const currentUser = getUser();
    if (!currentUser) {
      toast.warning('Login Required', 'Please log in to add tokens to favorites.');
      return;
    }
    try {
      const result = await setFavor(token.tokenId || token._id);
      if (result && typeof result.status === 'boolean') {
        setIsWatchlisted(result.status);
        toast.success(
          result.status ? 'Added to Favorites' : 'Removed from Favorites',
          result.status
            ? `${token.ticker} has been added to your favorites.`
            : `${token.ticker} has been removed from your favorites.`
        );
      }
    } catch (error) {
      console.error('Error updating favorite status:', error);
      toast.error('Failed to Update Favorites', 'Please try again.');
    }
  };

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    toast.success('Link Copied', 'Token page link copied to clipboard');
  };

  const handleBackClick = () => {
    navigate(-1);
  };

  const getPriceChangeColor = (change) => {
    if (!change && change !== 0) return 'text-gray-400';
    const num = parseFloat(change);
    return num >= 0 ? 'text-green-500' : 'text-red-500';
  };

  const getPriceChangeIcon = (change) => {
    if (!change && change !== 0) return null;
    const num = parseFloat(change);
    return num >= 0 ? <TrendingUp className="w-4 h-4" /> : <TrendingDown className="w-4 h-4" />;
  };

  if (loading) {
    return (
      <div className={`min-h-screen transition-colors duration-300 ${isDark ? 'bg-gray-900' : 'bg-[#EBEBEB]'}`}>
        <Header />
        <div className="pt-16 md:pt-40 flex items-center justify-center min-h-[50vh]">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-pink-400 mx-auto mb-4"></div>
            <p className={`text-lg ${isDark ? 'text-white' : 'text-gray-900'}`}>Loading token data...</p>
          </div>
        </div>
      </div>
    );
  }

  if (error || !token) {
    return (
      <div className={`min-h-screen transition-colors duration-300 ${isDark ? 'bg-gray-900' : 'bg-[#EBEBEB]'}`}>
        <Header />
        <div className="pt-16 md:pt-40 flex items-center justify-center min-h-[50vh]">
          <div className="text-center">
            <div className="text-red-400 text-6xl mb-4">⚠️</div>
            <h2 className={`text-2xl font-bold mb-4 ${isDark ? 'text-white' : 'text-gray-900'}`}>
              Token Not Found
            </h2>
            <p className={`mb-6 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
              {error || 'The requested token could not be found.'}
            </p>
            <button
              onClick={handleBackClick}
              className={`text-white px-6 py-3 rounded-lg font-medium transition-all duration-200 transform hover:scale-105 flex items-center space-x-2 mx-auto ${isDark
                ? 'bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700'
                : 'bg-gradient-to-r from-pink-500 to-pink-600 hover:from-pink-600 hover:to-pink-700'
                }`}
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Go Back</span>
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={`min-h-screen transition-colors duration-300 ${isDark ? 'bg-gray-900' : 'bg-[#EBEBEB]'}`}>
      <Header />
      <div className="pt-14 md:pt-40">
        <div className="relative h-32 md:h-48 bg-gradient-to-r from-purple-600 to-pink-600 overflow-hidden">
          <img
            src="https://images.pexels.com/photos/1103970/pexels-photo-1103970.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
            alt="Token Banner"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/20" />
        </div>
        <div className="mb-4 px-4 md:px-6 flex flex-col lg:flex-row lg:items-end lg:justify-between gap-4">
          <div className="z-[1] flex flex-col sm:flex-row sm:items-end sm:space-x-4 -mt-16">
            <div className="w-24 h-24 sm:w-32 sm:h-32 rounded-xl overflow-hidden bg-gradient-to-br from-pink-500 to-violet-500 border-4 border-white shadow-md">
              {token.logo ? (
                <img src={token.logo} alt={token.name} className="w-full h-full object-cover" />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-white text-4xl font-bold">
                  {token.ticker?.charAt(0) || 'T'}
                </div>
              )}
            </div>
            <h1 className={`mt-2 sm:mt-0 text-4xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
              {token.name}
            </h1>
          </div>
          <div className="flex flex-wrap justify-center lg:justify-start gap-x-2 gap-y-2 items-center">
            <div className="bg-pink-200 text-black font-semibold px-3 py-1 rounded-xl text-sm lg:text-base text-center shadow">
              Market Cap: {formatTokenMarketCap(token.marketCap, solPrice)}
            </div>
            <div className="bg-pink-200 text-black font-semibold px-3 py-1 rounded-xl text-sm lg:text-base text-center shadow">
              Holders: 72%
            </div>
            <div className="relative flex items-center justify-center bg-white text-black font-bold px-4 py-1 rounded-xl overflow-hidden border border-pink-500">
              <span className="z-10">Bonding {token.bondingCurveProgress}%</span>
              <div
                className="absolute left-0 top-0 h-full bg-pink-500"
                style={{ width: `${token.bondingCurveProgress}%` }}
              />
            </div>
            <div className="flex items-center justify-center gap-2 px-4 py-1 border border-green-500 bg-white text-black text-sm lg:text-base font-semibold rounded-xl">
              <span>Security rating: 100%</span>
              <div className="w-5 h-5 rounded-full bg-green-500 flex items-center justify-center text-white text-xs font-bold">
                ✓
              </div>
            </div>
            <button className="w-8 h-8 flex items-center justify-center bg-pink-500 hover:bg-pink-600 text-white rounded-full transition">
              <Plus className="w-4 h-4" />
            </button>
          </div>
        </div>
        <div className="mx-4 lg:mx-6 mt-6 grid grid-cols-1 lg:grid-cols-[260px_1fr_280px] gap-6">
          <div className="space-y-6">
            <div className={`rounded-xl p-6 border ${isDark ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}`}>
              {token.desc && (
                <p className={`text-sm leading-relaxed mb-4 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                  {token.desc}
                </p>
              )}
              <div className="flex items-center space-x-3">
                {token.website && (
                  <a href={token.website} target="_blank" rel="noopener noreferrer" className="text-pink-400 hover:text-pink-300">
                    <ExternalLink className="w-5 h-5" />
                  </a>
                )}
                {token.twitter && (
                  <a href={token.twitter} target="_blank" rel="noopener noreferrer" className="text-pink-400 hover:text-pink-300">
                    <img src="/images/icons/x.svg" alt="X" className="w-5 h-5" />
                  </a>
                )}
                {token.telegram && (
                  <a href={token.telegram} target="_blank" rel="noopener noreferrer" className="text-pink-400 hover:text-pink-300">
                    <img src="/images/icons/telegram.svg" alt="Telegram" className="w-5 h-5" />
                  </a>
                )}
              </div>
            </div>
            <TradingInterface token={token} isTrading={isTrading} setIsTrading={setIsTrading} />
          </div>
          <div>
            <div className={`rounded-xl border-2 ${isDark ? 'border-[#122a21]' : 'border-[#d2d2d2]'} h-[500px] ${isDark ? 'bg-[#0a0a0a]' : 'bg-[#f7f7f7]'} overflow-hidden`}>
              <div className={`flex ${isDark ? 'bg-[#2e2e2e]' : 'bg-[#f7f7f7]'} border-b-2 ${isDark ? 'border-[#122a21]' : 'border-[#d2d2d2]'}`}>
                <button
                  onClick={() => setActiveTab('chart')}
                  className={`mx-2 px-4 py-1 my-2 text-sm font-${activeTab === 'chart' ? 'bold' : 'normal'} rounded-xl transition-colors ${activeTab === 'chart'
                    ? `${isDark ? 'bg-[#d8ffe0] text-black' : 'bg-[#ffd7ec] text-black'}`
                    : `bg-transparent ${isDark ? 'text-gray-400 hover:text-gray-200' : 'text-gray-600 hover:text-gray-900'}`
                    }`}
                >
                  Chart
                </button>
                <button
                  onClick={() => setActiveTab('holders')}
                  className={`mx-2 px-4 py-1 my-2 text-sm font-${activeTab === 'holders' ? 'bold' : 'normal'} rounded-xl transition-colors ${activeTab === 'holders'
                    ? `${isDark ? 'bg-[#d8ffe0] text-black' : 'bg-[#ffd7ec] text-black'}`
                    : `bg-transparent ${isDark ? 'text-gray-400 hover:text-gray-200' : 'text-gray-600 hover:text-gray-900'}`
                    }`}
                >
                  Bubblemap
                </button>
              </div>
              <div className={`h-[calc(100%-60px)] ${isDark ? 'bg-[#0a0a0a]' : 'bg-[#f7f7f7]'}`}>
                {activeTab === 'chart' && <TokenChart token={token} />}
                {activeTab === 'holders' && <HolderDistribution holders={holderDistribution} />}
              </div>
            </div>
          </div>
          <Chat tokenAddress={tokenAddress} currentUserId={currentUserId} />
        </div>
        <div className="mx-4 lg:mx-6 mt-6 mb-8">
          <TransactionTable
            transactions={transactions}
            loading={loadingTransactions}
            onRefresh={fetchTransactions}
          />
        </div>
      </div>
    </div>
  );
};

export default TokenPage;