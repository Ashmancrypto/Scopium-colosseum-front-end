import { useContext, useEffect, useState } from 'react';
import { Copy, Edit } from 'lucide-react';
import { useWallet } from '@solana/wallet-adapter-react';
import { useLogout } from '../../hooks/auth/useLogout.js';
import { formatAddress, formatAddressFront } from '../../utils/formatters.js';
import { useNavigate } from 'react-router-dom';
import { useToastContext } from '../../contexts/ToastContext.jsx';
import { connection } from '../../config/configSolana/index.js';
import { LAMPORTS_PER_SOL } from '@solana/web3.js';
import { solPriceContext } from '../../contexts/SolPriceContext.jsx';
import { useTheme } from '../../contexts/ThemeContext.jsx';
import { formatBalance, formatBalanceUsd } from '../../utils/formatters.js';
import { AuthContext } from '../../contexts/AuthContext.jsx';

const WalletModal = ({ userData, isOpen, onClose }) => {
  const { isDark } = useTheme();
  const { publicKey, disconnect } = useWallet();
  const { logout } = useLogout();
  const navigate = useNavigate();
  const toast = useToastContext();
  const [solBalance, setSolBalance] = useState(0);
  const [loadingBalance, setLoadingBalance] = useState(false);
  const { solPrice } = useContext(solPriceContext);

  const { user, setUser } = useContext(AuthContext);

  // Load user from cookies
  useEffect(() => {
    if (userData) {
      try {
        setUser(userData);
      } catch (error) {
        console.error('Error parsing saved user:', error);
      }
    }
  }, [isOpen]);

  // Disable background scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      // Store current scroll position
      const scrollY = window.scrollY;

      // Prevent body scroll
      document.body.style.position = 'fixed';
      document.body.style.top = `-${scrollY}px`;
      document.body.style.width = '100%';
      document.body.style.overflow = 'hidden';

      return () => {
        // Restore body scroll and position
        document.body.style.position = '';
        document.body.style.top = '';
        document.body.style.width = '';
        document.body.style.overflow = '';

        // Restore scroll position
        window.scrollTo(0, scrollY);
      };
    }
  }, [isOpen]);

  // Fetch SOL balance
  useEffect(() => {
    const fetchBalance = async () => {
      if (!publicKey || !isOpen) return;

      try {
        setLoadingBalance(true);
        const balance = await connection.getBalance(publicKey);
        setSolBalance(balance / LAMPORTS_PER_SOL);
      } catch (error) {
        console.error('Error fetching balance:', error);
        setSolBalance(0);
      } finally {
        setLoadingBalance(false);
      }
    };

    fetchBalance();
  }, [publicKey, isOpen]);

  if (!isOpen) return null;

  const handleDisconnect = async () => {
    try {
      await disconnect();
      logout();
      setUser(null);
      onClose();
    } catch (error) {
      console.error('Failed to disconnect:', error);
    }
  };

  const handleEditProfile = () => {
    navigate(`/profile/${user.username}`);
    onClose();
  };

  const copyAddress = () => {
    if (publicKey) {
      navigator.clipboard.writeText(publicKey.toString());
      toast.success('Copied!', 'Wallet address copied to clipboard', 1500);
    }
  };

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div
      className="fixed inset-0 bg-black/80 backdrop-blur-md flex items-start justify-center"
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        zIndex: 99999,
        width: "100vw",
        height: "100vh"
      }}
      onClick={handleBackdropClick}
    >
      <div
        className={`rounded-2xl shadow-2xl w-full max-w-72 border relative transition-colors duration-300 ${isDark
            ? 'bg-gray-700 border-gray-700'
            : 'bg-white border-gray-200'
          }`}
        onClick={(e) => e.stopPropagation()}
        style={{
          marginTop: '20vh',
          maxHeight: '80vh',
          overflow: 'hidden'
        }}
      >
        {/* Header */}
        <div className={`p-4 border-b transition-colors duration-300 ${isDark ? 'border-gray-700' : 'border-gray-200'
          }`}>
          <div className="flex items-center justify-between">
            <div className="flex-1"></div>
            <h2 className={`text-xl font-semibold transition-colors duration-300 ${isDark ? 'text-white' : 'text-gray-900'
              }`}>
              @{formatAddressFront(publicKey.toBase58())}
            </h2>
            <div className="flex-1 flex justify-end">
              <button
                onClick={onClose}
                className={`transition-colors p-1 ${isDark
                    ? 'text-gray-400 hover:text-white'
                    : 'text-gray-600 hover:text-gray-900'
                  }`}
              >
                <img
                  src="/images/icons/close.svg"
                  alt="Close"
                  className={`w-5 h-5 transition-all duration-300 ${isDark ? '' : 'filter invert'
                    }`}
                />
              </button>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="space-y-4 max-h-96 overflow-y-auto p-4">
          {/* Edit Profile Button */}
          <button
            onClick={handleEditProfile}
            className={`w-fit mx-auto flex items-center space-x-2 px-4 py-2 rounded-lg transition-all duration-200 border ${isDark
                ? 'hover:bg-gray-900/50 border-gray-700 hover:border-gray-600'
                : 'hover:bg-gray-100/50 border-gray-300 hover:border-gray-400'
              }`}
          >
            <span className={`font-medium text-sm transition-colors duration-300 ${isDark ? 'text-white' : 'text-gray-900'
              }`}>Edit profile</span>
            <Edit className={`w-4 h-4 transition-colors duration-300 ${isDark ? 'text-gray-400' : 'text-gray-600'
              }`} />
          </button>
          {/* {formatBalance(solBalance, loadingBalance)} SOL */}

          {/* User Info Section */}
          <div className="flex flex-col items-center space-y-3 p-3">
            {/* Avatar */}
            <div className="relative flex justify-center">
              <img
                src="/images/Logo.png"
                alt="Default Avatar"
                className={`w-12 h-12 rounded-full object-cover p-2 transition-colors duration-300 ${isDark ? 'bg-gray-700' : 'bg-gray-200'
                  }`}
              />
            </div>

            {/* Balance Info */}
            <div className="text-center">
              <div className={`font-bold text-lg transition-colors duration-300 ${isDark ? 'text-white' : 'text-gray-900'
                }`}>
                {formatBalance(solBalance)} SOL
              </div>
              <div className={`text-sm transition-colors duration-300 ${isDark ? 'text-gray-400' : 'text-gray-600'
                }`}>

                {formatBalanceUsd(solBalance, solPrice, loadingBalance)}
              </div>
            </div>
          </div>

          {/* Wallet Address - Centered */}
          <div className="p-3 text-center">
            <div className="flex items-center justify-center space-x-2">
              <span className={`font-medium text-sm font-mono transition-colors duration-300 ${isDark ? 'text-white' : 'text-gray-900'
                }`}>
                {formatAddress(publicKey?.toString(), 8, 6)}
              </span>
              <button
                onClick={copyAddress}
                className={`p-1 transition-colors ${isDark
                    ? 'text-gray-400 hover:text-white'
                    : 'text-gray-600 hover:text-gray-900'
                  }`}
                title="Copy address"
              >
                <Copy className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Disconnect Button */}
          <button
            onClick={handleDisconnect}
            className={`w-full p-3 rounded-lg transition-all duration-200 border ${isDark
                ? 'hover:bg-gray-900/50 border-gray-700 hover:border-gray-600'
                : 'hover:bg-gray-100/50 border-gray-300 hover:border-gray-400'
              }`}
          >
            <span className={`font-medium text-sm transition-colors duration-300 ${isDark ? 'text-white' : 'text-gray-900'
              }`}>Disconnect Wallet</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default WalletModal;