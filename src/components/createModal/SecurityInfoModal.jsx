import React, { useState, useRef, useEffect } from 'react';
import { X } from 'lucide-react';
import { useToastContext } from '../../contexts/ToastContext.jsx';
import { useTheme } from '../../contexts/ThemeContext.jsx';
import { isMainNet } from '../../config/configSolana/index.js';

const SecurityInfoModal = ({ isOpen, onClose, info }) => {
  const { isDark } = useTheme();
  const toast = useToastContext();
  const isCreating = false;
  useEffect(() => {
    if (isOpen) {
      const scrollY = window.scrollY;
      document.body.style.position = 'fixed';
      document.body.style.top = `-${scrollY}px`;
      document.body.style.width = '100%';
      document.body.style.overflow = 'hidden';
      return () => {
        document.body.style.position = '';
        document.body.style.top = '';
        document.body.style.width = '';
        document.body.style.overflow = '';
        window.scrollTo(0, scrollY);
      };
    }
  }, [isOpen]);


  const handleClose = () => {
    onClose();
  };

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget && !isCreating) handleClose();
  };


  // Calculate wallet age in days
  const getWalletAge = (createdAt) => {
    return Math.floor((new Date() - new Date(createdAt)) / (1000 * 60 * 60 * 24));
  };

  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape' && isOpen) handleClose();
    };
    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      return () => document.removeEventListener('keydown', handleEscape);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4" onClick={handleBackdropClick}>
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/80 backdrop-blur-sm"></div>

      {/* Modal */}
      <div className={`relative rounded-2xl shadow-2xl w-full max-w-[90%] sm:max-w-[400px] md:max-w-[500px] lg:max-w-[550px] border z-10 transition-colors duration-300 ${isDark ? 'bg-gray-700/95 border-gray-600' : 'bg-white border-gray-300'
        }`} style={{ maxHeight: '90vh', overflow: 'hidden' }} onClick={(e) => e.stopPropagation()}>
        <div className={`flex items-center justify-between p-2 border-b ${isDark ? 'border-gray-600' : 'border-gray-200'
          }`}>
          <h2 className={`text-xl font-semibold ${isDark ? 'text-[#F7F7F7]' : 'text-gray-800'}`}>Security Information</h2>
          <button onClick={!isCreating ? handleClose : undefined} disabled={isCreating}
            className={`p-2 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed ${isDark ? 'text-gray-300 hover:text-[#F7F7F7] hover:bg-gray-700/50' : 'text-gray-700 hover:text-gray-900 hover:bg-gray-200'
              }`}>
            <X className="w-5 h-5" />
          </button>
        </div>
        {/* Overall Token Info */}
        <div className='text-black p-2'>
          📶 <span className='underline'> Overall Statistics</span>
        </div>
        <div className="overflow-y-auto text-black px-8" style={{ maxHeight: 'calc(90vh - 80px)' }}>
          <div className='flex justify-between'>
            <span> 📦 Holders:</span>
            <span> {info.holders} </span>
          </div>
          <div className='flex justify-between'>
            <span> 💰 Total SOL Held:</span>
            <span> {info.totalSolHeld} SOL</span>
          </div>
          <div className='flex justify-between'>
            <span> 📈 Current Held Percentage:</span>
            <span> {info.currentHeldPercent}%</span>
          </div>
          <div className='flex justify-between'>
            <span> 🔗 Bonded: </span>
            <span> {info.isBonded ? "Yes" : "No"}</span>
          </div>
        </div>
        {/* Creator Info */}
        <div className='text-black p-2'>
          👨‍💻 <span className='underline'> Creator Risk Profile</span>
        </div>
        <div className="overflow-y-auto text-black px-8" style={{ maxHeight: 'calc(90vh - 80px)' }}>
          <div className='flex justify-between'>
            <span> • Creator Wallet Age:</span>
            <span> {info.creatorWalletAge} days</span>
          </div>
          <div className='flex justify-between'>
            <span> • Total Created:</span>
            <span> {info.creatorTokensCount}</span>
          </div>
          <div className='flex justify-between'>
            <span> • Current Token Held%:</span>
            <span> 0.4 %</span>
          </div>
          <div className='flex justify-between'>
            <span> • VPN Used:</span>
            <span> No</span>
          </div>
        </div>
        {/* Dev warnings */}
        {/* <div className='text-black p-2'>
          ⚠️ <span className='underline'> Dev Warnings</span>
        </div>
        <div className="overflow-y-auto text-black px-8" style={{ maxHeight: 'calc(90vh - 80px)' }}>
          <div className='flex justify-between'>
            <span> • Likely Safe:</span>
          </div>
          <div className='flex justify-between'>
            <span> • Decentralized:</span>
          </div>
          <div className='flex justify-between'>
            <span> • Older Wallets:</span>
          </div>
        </div> */}
        <div className='text-black p-2'>
          👥 <span className='underline'> Top 10 Holders</span>
          {/* <div>
            {info.top10Holders.map((holder, index) => (
              <div key={holder.address}>
                <span>{holder.address}</span>
                <div className='flex justify-between'>
                  <span> • Percentage %:</span>
                  <span> {holder.percentage} %</span>
                </div>
                <div className='flex justify-between'>
                  <span> • SOL Held:</span>
                  <span> {holder.solAmount} SOL</span>
                </div>
                <div className='flex justify-between'>
                  <span> • Wallet Age :</span>
                  <span> {Math.floor((new Date() - holder.createdAt) / (1000 * 60 * 60 * 24))} days</span>
                </div>
              </div>
            ))}
          </div> */}
          <div className="overflow-x-auto rounded-lg">
            <table className="w-full table-auto">
              <thead className="bg-gray-100 text-gray-700 rounded-t-lg">
                <tr>
                  <th
                    className="px-6 py-3 text-left font-semibold cursor-pointer"
                  >
                    Address
                  </th>
                  <th
                    className="px-6 py-3 text-right font-semibold cursor-pointer"
                  >
                    Percentage %
                  </th>
                  <th
                    className="px-6 py-3 text-right font-semibold cursor-pointer"
                  >
                    SOL Held
                  </th>
                  <th
                    className="px-6 py-3 text-right font-semibold cursor-pointer"
                  >
                    Wallet Age
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {info.top10Holders.map((holder, index) => (
                  <tr key={holder.address} className="hover:bg-blue-50 transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex items-center">
                        <a href={isMainNet ?`https://solscan.io/account/${holder.walletAddr}` : `https://solscan.io/account/${holder.walletAddr}?cluster=devnet`} target='_blank'>
                        <span className="bg-blue-100 text-blue-800 font-mono rounded-full px-3 py-1 text-sm">
                          {holder.address}
                        </span>
                        </a>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-right font-medium text-gray-900">
                      {holder.percentage}%
                    </td>
                    <td className="px-6 py-4 text-right font-medium text-purple-700">
                      {holder.solAmount.toLocaleString()} SOL
                    </td>
                    <td className="px-6 py-4 text-right">
                      <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800">
                        {getWalletAge(holder.createdAt)} days
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SecurityInfoModal;
