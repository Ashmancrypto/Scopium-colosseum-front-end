import React from 'react';
import { Activity } from 'lucide-react';
import { useTheme } from '../../contexts/ThemeContext.jsx';

const CreatedTab = ({ userProfile, isOwnProfile }) => {
  const { isDark } = useTheme();

  return (
    <div className="p-4 sm:p-6">
      <div className="grid grid-cols-1 gap-4">
        {/* Header Row */}
        <div className={`hidden sm:grid grid-cols-3 gap-4 text-sm font-medium pb-2 transition-colors duration-300 ${
          isDark ? 'text-gray-400' : 'text-gray-600'
        }`}>
          <div>Coins</div>
          <div className="text-right">Market Cap</div>
          <div className="text-right">Replies</div>
        </div>

        {/* User Created Tokens */}
        {userProfile?.coinsCreated && userProfile.coinsCreated.length > 0 ? (
          userProfile.coinsCreated.map((token, index) => (
            <div 
              key={index} 
              className={`flex flex-col sm:grid sm:grid-cols-3 gap-2 sm:gap-4 items-start sm:items-center py-3 rounded-lg px-2 transition-colors cursor-pointer ${
                isDark ? 'hover:bg-gray-700/30' : 'hover:bg-gray-100/30'
              }`}
              onClick={() => window.location.href = `/token/${token.mintAddr}`}
            >
              <div className="flex items-center space-x-3 w-full sm:w-auto">
                <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-br from-pink-500 to-violet-500 rounded-full flex items-center justify-center overflow-hidden flex-shrink-0">
                  {token.logo ? (
                    <img 
                      src={token.logo} 
                      alt={token.tokenName} 
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        e.target.style.display = 'none';
                        e.target.nextSibling.style.display = 'flex';
                      }}
                    />
                  ) : (
                    <span className="text-white font-bold text-sm flex items-center justify-center w-full h-full">
                      {token.ticker?.charAt(0) || 'T'}
                    </span>
                  )}
                  {token.logo && (
                    <span className="text-white font-bold text-sm items-center justify-center w-full h-full" style={{ display: 'none' }}>
                      {token.ticker?.charAt(0) || 'T'}
                    </span>
                  )}
                </div>
                <div>
                  <div className={`font-medium text-sm sm:text-base transition-colors duration-300 ${
                    isDark ? 'text-white' : 'text-gray-900'
                  }`}>
                    {token.tokenName || 'Unknown Token'} {token.ticker && `(${token.ticker})`}
                  </div>
                  {token.desc && (
                    <p className={`text-xs mt-1 line-clamp-1 transition-colors duration-300 ${
                      isDark ? 'text-gray-500' : 'text-gray-600'
                    }`}>{token.desc}</p>
                  )}
                </div>
              </div>
              <div className="flex justify-between sm:block w-full sm:w-auto">
                <span className={`text-sm sm:hidden transition-colors duration-300 ${
                  isDark ? 'text-gray-400' : 'text-gray-600'
                }`}>Market Cap:</span>
                <div className="text-right sm:text-right">
                  <div className={`text-sm sm:text-base transition-colors duration-300 ${
                    isDark ? 'text-white' : 'text-gray-900'
                  }`}>${(token.marketCap * 200).toFixed(2)}</div>
                  <div className={`text-xs transition-colors duration-300 ${
                    isDark ? 'text-gray-400' : 'text-gray-600'
                  }`}>{token.marketCap} SOL</div>
                </div>
              </div>
              <div className="flex justify-between sm:block w-full sm:w-auto">
                <span className={`text-sm sm:hidden transition-colors duration-300 ${
                  isDark ? 'text-gray-400' : 'text-gray-600'
                }`}>Replies:</span>
                <div className={`font-medium text-sm sm:text-base sm:text-right transition-colors duration-300 ${
                  isDark ? 'text-white' : 'text-gray-900'
                }`}>{token.replies || 0}</div>
              </div>
            </div>
          ))
        ) : (
          <div className="text-center py-12">
            <Activity className={`w-12 h-12 mx-auto mb-4 transition-colors duration-300 ${
              isDark ? 'text-gray-400' : 'text-gray-500'
            }`} />
            <p className={`text-lg transition-colors duration-300 ${
              isDark ? 'text-gray-400' : 'text-gray-600'
            }`}>No tokens created yet</p>
            <p className={`text-sm mt-2 transition-colors duration-300 ${
              isDark ? 'text-gray-500' : 'text-gray-500'
            }`}>
              {isOwnProfile ? 'Your created tokens will appear here' : 'This user hasn\'t created any tokens yet'}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default CreatedTab;