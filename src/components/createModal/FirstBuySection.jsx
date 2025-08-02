import React from 'react';
import { Shield, Info, ChevronDown, ChevronUp } from 'lucide-react';
import { useTheme } from '../../contexts/ThemeContext.jsx';
import { getInitialOutputAmount } from '../../contexts/contractsOnSolana/contracts/index.js';
import { TOKEN_TOTAL_SUPPLY } from '../../contexts/contractsOnSolana/contracts/constants.js';

const FirstBuySection = ({ refs, state, disabled = false }) => {
  const { isDark } = useTheme();
  const [firstBuyValue, setFirstBuyValue] = React.useState('');
  const [currentTicker, setCurrentTicker] = React.useState('TOKENS');
  
  // Listen for ticker changes
  React.useEffect(() => {
    const updateTicker = () => {
      const tickerValue = refs.ticker.current?.value || 'TOKENS';
      setCurrentTicker(tickerValue);
    };

    // Update ticker immediately
    updateTicker();

    // Set up interval to check for ticker changes
    const interval = setInterval(updateTicker, 100);

    return () => clearInterval(interval);
  }, [refs.ticker]);

  const calculateTokensReceived = (solAmount) => {
    const amount = parseFloat(solAmount);
    if (!amount || amount <= 0) return 0;
    
    // Convert SOL to lamports (9 decimals)
    const lamports = amount * Math.pow(10, 9);
    
    // Get tokens from bonding curve (returns tokens with 6 decimals)
    const tokensWithDecimals = getInitialOutputAmount(lamports);
    
    // Convert to human readable format (divide by 10^6)
    const tokens = tokensWithDecimals / Math.pow(10, 6);
    
    return tokens;
  };

  const calculatePercentageOfSupply = (solAmount) => {
    const tokens = calculateTokensReceived(solAmount);
    if (!tokens || tokens <= 0) return 0;
    
    // Calculate percentage of total supply (1 billion tokens)
    const percentage = (tokens / TOKEN_TOTAL_SUPPLY) * 100;
    return percentage;
  };

  const handleInputChange = (e) => {
    const value = e.target.value;
    setFirstBuyValue(value);
    // Update the ref value as well for form submission
    if (refs.firstBuyAmount.current) {
      refs.firstBuyAmount.current.value = value;
    }
  };

  return (
    <div>
      <button
        type="button"
        onClick={() => !disabled && state.setShowFirstBuy(!state.showFirstBuy)}
        disabled={disabled}
        className={`flex items-center text-sm font-semibold transition-colors disabled:opacity-50 disabled:cursor-not-allowed ${
          isDark 
            ? 'text-green-400 hover:text-green-300' 
            : 'text-pink-600 hover:text-pink-700'
        }`}
      >
        <Shield className="w-4 h-4 mr-2" />
        Dev buy <span className={`ml-1 font-normal ${
          isDark ? 'text-gray-400' : 'text-gray-500'
        }`}>(optional)</span>
        {state.showFirstBuy ? (
          <ChevronUp className="w-4 h-4 ml-2" />
        ) : (
          <ChevronDown className="w-4 h-4 ml-2" />
        )}
      </button>

      {/* First Buy Section - Expandable */}
      {state.showFirstBuy && (
        <div className={`mt-4 space-y-4 p-4 rounded-lg border transition-colors duration-300 ${
          isDark 
           ? 'bg-gray-700/70 border-gray-500' 
            : 'bg-gray-50 border-gray-200'
        }`}>
          <div className={`border rounded-lg p-3 transition-colors duration-300 ${
            isDark 
              ? 'bg-green-500/10 border-green-500/30' 
              : 'bg-pink-50 border-pink-200'
          }`}>
            <div className="flex items-start space-x-2">
              <Info className={`w-4 h-4 flex-shrink-0 mt-0.5 transition-colors duration-300 ${
                isDark ? 'text-green-400' : 'text-pink-600'
              }`} />
              <p className={`text-xs leading-relaxed transition-colors duration-300 ${
                isDark ? 'text-green-200' : 'text-pink-800'
              }`}>
                It's optional but buying a small amount of coins helps protect your coin from snipers
              </p>
            </div>
          </div>

          <div className="space-y-3">
            <div>
              <label className={`block text-sm font-medium mb-2 transition-colors duration-300 ${
                isDark ? 'text-[#F7F7F7]' : 'text-gray-800'
              }`}>
                Amount (SOL)
              </label>
              <div className="relative">
                <input
                  ref={refs.firstBuyAmount}
                  type="number"
                  placeholder="0.1"
                  step="0.01"
                  min="0"
                  value={firstBuyValue}
                  onChange={handleInputChange}
                  disabled={disabled}
                  className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 transition-all text-sm disabled:opacity-50 disabled:cursor-not-allowed ${
                    isDark 
                      ? 'focus:ring-green-500 focus:border-green-500' 
                      : 'focus:ring-pink-500 focus:border-pink-500'
                  } ${
                    isDark 
                      ? 'bg-gray-600/90 border-gray-400 text-[#F7F7F7] placeholder-gray-400' 
                      : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500'
                  }`}
                />
                <div className={`absolute right-3 top-1/2 transform -translate-y-1/2 text-sm font-medium transition-colors duration-300 ${
                  isDark ? 'text-gray-300' : 'text-gray-600'
                }`}>
                  SOL
                </div>
              </div>
            </div>

            {firstBuyValue && parseFloat(firstBuyValue) > 0 && (
              <div className={`border rounded-lg p-3 transition-colors duration-300 ${
                isDark 
                  ? 'bg-gray-700/70 border-gray-500' 
                  : 'bg-gray-100 border-gray-200'
              }`}>
                <div className="flex items-center justify-between text-xs">
                  <span className={`transition-colors duration-300 ${
                    isDark ? 'text-gray-300' : 'text-gray-600'
                  }`}>Estimated tokens received:</span>
                  <span className={`font-medium transition-colors duration-300 ${
                    isDark ? 'text-[#F7F7F7]' : 'text-gray-900'
                  }`}>
                    ~{calculateTokensReceived(firstBuyValue).toLocaleString('en-US', {
                      minimumFractionDigits: 0,
                      maximumFractionDigits: 0
                    })} {currentTicker}
                  </span>
                </div>
                <div className="flex items-center justify-between text-xs mt-1">
                  <span className={`transition-colors duration-300 ${
                    isDark ? 'text-gray-300' : 'text-gray-600'
                  }`}>Percentage of total supply:</span>
                  <span className={`font-medium transition-colors duration-300 ${
                    isDark ? 'text-[#F7F7F7]' : 'text-gray-900'
                  }`}>
                    {calculatePercentageOfSupply(firstBuyValue).toFixed(4)}%
                  </span>
                </div>
                <div className="flex items-center justify-between text-xs mt-1">
                  <span className={`transition-colors duration-300 ${
                    isDark ? 'text-gray-300' : 'text-gray-600'
                  }`}>Protection level:</span>
                  <span className="text-green-400 font-medium">
                    {parseFloat(firstBuyValue) >= 0.1 ? 'High' : 
                     parseFloat(firstBuyValue) >= 0.05 ? 'Medium' : 'Low'}
                  </span>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default FirstBuySection;