import React from 'react';
import { Copy, Edit } from 'lucide-react';
import { formatAddress } from '../../utils/formatters.js';
import { useTheme } from '../../contexts/ThemeContext.jsx';
import { formatBalance, formatBalanceUsd } from '../../utils/formatters.js';
import { BACKEND_URL } from '../../contexts/contractsOnSolana/contracts/constants.js';

const ProfileHeader = ({
  userProfile,
  isOwnProfile,
  publicKey,
  onCopyAddress,
  onEditProfile,
  solBalance,
  loadingBalance,
  solPrice
}) => {
  const { isDark } = useTheme();

  return (
    <div className={`backdrop-blur-md rounded-xl border p-4 sm:p-6 lg:p-8 mb-4 lg:mb-6 transition-colors duration-300 ${isDark
        ? 'bg-gray-900/90 border-gray-700'
        : 'bg-white/90 border-gray-200'
      }`}>
      <div className="flex flex-col sm:flex-row sm:items-start justify-between space-y-4 sm:space-y-0">
        <div className="flex flex-col sm:flex-row items-center sm:items-start space-y-4 sm:space-y-0 sm:space-x-4 lg:space-x-6">
          {/* Avatar */}
          <div className="relative">
            <div className={`w-16 h-16 sm:w-20 sm:h-20 rounded-full flex items-center justify-center border-3 p-3 transition-colors duration-300 ${isDark ? 'bg-gray-700 border-gray-600' : 'bg-gray-200 border-gray-300'
              }`}>
              <img
                src={
                  userProfile?.avatar
                    ? `${BACKEND_URL}${userProfile.avatar}`
                    : isDark
                      ? '/images/Logo-dark.png'
                      : '/images/Logo.png'
                }
                // src={isDark ? '/images/Logo-dark.png' : '/images/Logo.png'} 
                alt="Default Avatar"
                className="w-full h-full object-contain"
              />
            </div>
          </div>

          {/* User Info */}
          <div className="flex-1 text-center sm:text-left">
            <div className="flex flex-col sm:flex-row sm:items-center space-y-2 sm:space-y-0 sm:space-x-4 mb-2">
              <h1 className={`text-xl sm:text-2xl font-bold transition-colors duration-300 ${isDark ? 'text-white' : 'text-gray-900'
                }`}>
                @{userProfile?.username || 'user'}
              </h1>
              {/* SOL Balance (only for own profile) */}
              {isOwnProfile && (
                <div className={`font-medium text-sm sm:text-base transition-colors duration-300 ${isDark ? 'text-white' : 'text-gray-900'
                  }`}>
                  {formatBalance(solBalance, loadingBalance)} SOL
                  <span className={`text-xs sm:text-sm ml-2 transition-colors duration-300 ${isDark ? 'text-gray-400' : 'text-gray-600'
                    }`}>
                    ({formatBalanceUsd(solBalance, solPrice, loadingBalance)})
                  </span>
                </div>
              )}
            </div>
            <div className="flex items-center justify-center sm:justify-start space-x-2 sm:space-x-3 mb-2">
              <span className={`font-mono text-xs sm:text-sm transition-colors duration-300 ${isDark ? 'text-gray-300' : 'text-gray-700'
                }`}>
                {formatAddress(
                  isOwnProfile ? publicKey?.toString() : userProfile?.walletAddr,
                  6, 4
                )}
              </span>
              <button
                onClick={onCopyAddress}
                className={`p-1 rounded transition-colors flex-shrink-0 ${isDark
                    ? 'text-gray-400 hover:text-white'
                    : 'text-gray-600 hover:text-gray-900'
                  }`}
                title="Copy address"
              >
                <Copy className="w-3 h-3 sm:w-4 sm:h-4" />
              </button>
            </div>
            {/* Bio */}
            <div className={`text-xs sm:text-sm transition-colors duration-300 ${isDark ? 'text-gray-400' : 'text-gray-600'
              }`}>
              {userProfile?.bio || 'No bio available'}
            </div>
          </div>
        </div>

        {/* Action Button */}
        {isOwnProfile ? (
          <button
            onClick={onEditProfile}
            className={`flex items-center justify-center space-x-2 px-3 sm:px-4 py-2 border rounded-lg transition-colors text-sm sm:text-base w-full sm:w-auto ${isDark
                ? 'bg-gray-700/50 hover:bg-gray-600/50 border-gray-600 text-gray-300'
                : 'bg-gray-100/50 hover:bg-gray-200/50 border-gray-300 text-gray-700'
              }`}
          >
            <Edit className="w-3 h-3 sm:w-4 sm:h-4" />
            <span className="text-sm font-medium">Edit</span>
          </button>
        ) : (
          <button className={`flex items-center justify-center space-x-2 px-3 sm:px-4 py-2 border rounded-lg transition-colors text-sm sm:text-base w-full sm:w-auto ${isDark
              ? 'bg-green-500/20 hover:bg-green-500/30 border-green-500/30 text-green-400'
              : 'bg-pink-100 hover:bg-pink-200 border-pink-300 text-pink-600'
            }`}>
            <span className="text-sm font-medium">Follow</span>
          </button>
        )}
      </div>
    </div>
  );
};

export default ProfileHeader;