import React from 'react';
import { User, Eye, LogOut } from 'lucide-react';
import { useTheme } from '../../contexts/ThemeContext.jsx';

const WalletDropdown = ({ 
  isOpen, 
  onProfileClick, 
  onViewWallet, 
  onDisconnect,
  onClose 
}) => {
  const { isDark } = useTheme();

  if (!isOpen) return null;

  return (
    <>
      {/* Dropdown */}
      <div className={`absolute top-full right-0 mt-2 w-48 backdrop-blur-md border rounded-lg shadow-2xl z-50 overflow-hidden transition-colors duration-200 ${
        isDark 
          ? 'bg-gray-900 border-gray-600' 
          : 'bg-white border-gray-200'
      }`}>
        {/* Profile Option */}
        <button
          onClick={onProfileClick}
          className={`w-full flex items-center space-x-3 px-4 py-3 transition-colors text-left ${
            isDark 
              ? 'text-gray-300 hover:text-white hover:bg-gray-700/50' 
              : 'text-gray-700 hover:text-gray-900 hover:bg-gray-100/50'
          }`}
        >
          <User className="w-4 h-4" />
          <span className="text-sm">Profile</span>
        </button>

        {/* View Wallet Option */}
        <button
          onClick={onViewWallet}
          className={`w-full flex items-center space-x-3 px-4 py-3 transition-colors text-left ${
            isDark 
              ? 'text-gray-300 hover:text-white hover:bg-gray-700/50' 
              : 'text-gray-700 hover:text-gray-900 hover:bg-gray-100/50'
          }`}
        >
          <Eye className="w-4 h-4" />
          <span className="text-sm">View wallet</span>
        </button>

        {/* Divider */}
        <div className={`border-t my-1 ${isDark ? 'border-gray-600' : 'border-gray-200'}`}></div>

        {/* Log Out Option */}
        <button
          onClick={onDisconnect}
          className="w-full flex items-center space-x-3 px-4 py-3 text-red-400 hover:text-red-300 hover:bg-red-500/10 transition-colors text-left"
        >
          <LogOut className="w-4 h-4" />
          <span className="text-sm">Log out</span>
        </button>
      </div>

      {/* Click outside handler */}
      <div
        className="fixed inset-0 z-40"
        onClick={onClose}
      ></div>
    </>
  );
};

export default WalletDropdown;