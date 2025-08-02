import React, { useState, useContext } from 'react';
import { useTheme } from '../../contexts/ThemeContext.jsx';
import { useWallet } from '@solana/wallet-adapter-react';
import { solPriceContext } from '../../contexts/SolPriceContext.jsx';
import { useToastContext } from '../../contexts/ToastContext.jsx';
import CustomWalletButton from '../CustomWalletButton.jsx';

const TradingInterface = ({ token }) => {
  const { isDark } = useTheme();
  const { connected } = useWallet();
  const { solPrice } = useContext(solPriceContext);
  const toast = useToastContext();
  
  const [activeTab, setActiveTab] = useState('buy');
  const [orderType, setOrderType] = useState('instant');
  const [amount, setAmount] = useState('');
  const [isTrading, setIsTrading] = useState(false);

  const handleTrade = async () => {
    if (!connected) {
      toast.warning('Wallet Not Connected', 'Please connect your wallet to trade.');
      return;
    }

    if (!amount || parseFloat(amount) <= 0) {
      toast.warning('Invalid Amount', 'Please enter a valid amount.');
      return;
    }

    setIsTrading(true);
    try {
      // TODO: Implement actual trading logic
      await new Promise(resolve => setTimeout(resolve, 2000)); // Mock delay
      
      toast.success(
        `${activeTab === 'buy' ? 'Buy' : 'Sell'} Order Submitted`,
        `Your ${activeTab} order for ${amount} ${activeTab === 'buy' ? 'SOL' : token.ticker} has been submitted.`
      );
      
      setAmount('');
    } catch (error) {
      toast.error('Trade Failed', error.message || 'Failed to execute trade.');
    } finally {
      setIsTrading(false);
    }
  };

  return (
    <div className={`rounded-xl border transition-colors duration-300 ${
      isDark ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
    }`}>
      {/* Buy/Sell Tabs */}
      <div className="flex">
        <button
          onClick={() => setActiveTab('buy')}
          className={`flex-1 py-3 text-sm font-medium transition-colors ${
            activeTab === 'buy'
              ? 'bg-green-500 text-white'
              : isDark ? 'text-gray-400 hover:text-white' : 'text-gray-600 hover:text-gray-900'
          }`}
        >
          Buy
        </button>
        <button
          onClick={() => setActiveTab('sell')}
          className={`flex-1 py-3 text-sm font-medium transition-colors ${
            activeTab === 'sell'
              ? 'bg-red-500 text-white'
              : isDark ? 'text-gray-400 hover:text-white' : 'text-gray-600 hover:text-gray-900'
          }`}
        >
          Sell
        </button>
      </div>

      <div className="p-4 space-y-4">
        {/* Order Type */}
        <div className="flex space-x-2">
          <button
            onClick={() => setOrderType('instant')}
            className={`flex-1 py-2 px-3 text-xs font-medium rounded transition-colors ${
              orderType === 'instant'
                ? isDark ? 'bg-gray-700 text-white' : 'bg-gray-200 text-gray-900'
                : isDark ? 'text-gray-400 hover:text-white' : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            Instant
          </button>
          <button
            onClick={() => setOrderType('trigger')}
            className={`flex-1 py-2 px-3 text-xs font-medium rounded transition-colors ${
              orderType === 'trigger'
                ? isDark ? 'bg-gray-700 text-white' : 'bg-gray-200 text-gray-900'
                : isDark ? 'text-gray-400 hover:text-white' : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            Trigger
          </button>
          <button
            onClick={() => setOrderType('recurring')}
            className={`flex-1 py-2 px-3 text-xs font-medium rounded transition-colors ${
              orderType === 'recurring'
                ? isDark ? 'bg-gray-700 text-white' : 'bg-gray-200 text-gray-900'
                : isDark ? 'text-gray-400 hover:text-white' : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            Recurring
          </button>
        </div>

        {/* Amount Input */}
        <div>
          <label className={`block text-xs font-medium mb-2 ${
            isDark ? 'text-gray-300' : 'text-gray-700'
          }`}>
            {activeTab === 'buy' ? 'Selling' : 'Buying'}
          </label>
          
          <div className={`flex items-center space-x-3 p-3 rounded-lg border ${
            isDark ? 'bg-gray-700 border-gray-600' : 'bg-gray-50 border-gray-300'
          }`}>
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-purple-500 to-blue-500 flex items-center justify-center">
              <span className="text-white text-xs font-bold">SOL</span>
            </div>
            <div className="flex-1">
              <div className="flex items-center justify-between">
                <span className={`text-lg font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                  14.5151
                </span>
                <span className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                  ${(14.5151 * (solPrice || 200)).toFixed(2)}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Buying Amount */}
        <div>
          <label className={`block text-xs font-medium mb-2 ${
            isDark ? 'text-gray-300' : 'text-gray-700'
          }`}>
            {activeTab === 'buy' ? 'Buying' : 'Selling'}
          </label>
          
          <div className={`flex items-center space-x-3 p-3 rounded-lg border ${
            isDark ? 'bg-gray-700 border-gray-600' : 'bg-gray-50 border-gray-300'
          }`}>
            <div className="w-8 h-8 rounded-full overflow-hidden bg-gradient-to-br from-pink-500 to-violet-500 flex items-center justify-center">
              {token?.logo ? (
                <img src={token.logo} alt={token.ticker} className="w-full h-full object-cover" />
              ) : (
                <span className="text-white text-xs font-bold">
                  {token?.ticker?.charAt(0) || 'T'}
                </span>
              )}
            </div>
            <div className="flex-1">
              <div className="flex items-center justify-between">
                <span className={`text-lg font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                  14.5151
                </span>
                <span className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                  ${(14.5151 * 0.23111).toFixed(4)}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Trade Button */}
        {connected ? (
          <button
            onClick={handleTrade}
            disabled={isTrading}
            className={`w-full py-3 rounded-lg font-medium transition-all duration-200 ${
              activeTab === 'buy'
                ? 'bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700'
                : 'bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700'
            } text-white disabled:opacity-50 disabled:cursor-not-allowed`}
          >
            {isTrading ? 'Processing...' : `${activeTab === 'buy' ? 'Buy' : 'Sell'} Now`}
          </button>
        ) : (
          <CustomWalletButton className="w-full justify-center" />
        )}
      </div>
    </div>
  );
};

export default TradingInterface;