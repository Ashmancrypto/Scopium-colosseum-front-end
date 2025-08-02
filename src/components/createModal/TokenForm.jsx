import React from 'react';
import { Loader } from 'lucide-react';
import { useWallet } from '@solana/wallet-adapter-react';
import { 
  BasicInfoSection,
  SocialLinksSection,
  FileUploadSection,
  BannerUploadSection,
  FirstBuySection,
  DisclaimerSection
} from './index.js';
import CustomWalletButton from '../CustomWalletButton.jsx';
import { useTheme } from '../../contexts/ThemeContext.jsx';

const TokenForm = ({ refs, state, handlers, isCreating = false }) => {
  const { isDark } = useTheme();
  const { connected } = useWallet();

  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (!connected) {
      // Don't submit if wallet is not connected
      return;
    }
    handlers.handleSubmit(e);
  };

  return (
    <form onSubmit={handleFormSubmit} className={`p-6 space-y-6 transition-colors duration-300 ${
      isDark ? 'text-[#F7F7F7] bg-gray-700/95' : 'bg-[#EBEBEB] text-gray-900'
    }`}>
      <BasicInfoSection 
        refs={refs}
        state={state}
        disabled={isCreating}
      />

      <SocialLinksSection 
        refs={refs}
        state={state}
        disabled={isCreating}
      />

      <FileUploadSection 
        state={state}
        handlers={handlers}
        disabled={isCreating}
      />

      <BannerUploadSection 
        state={state}
        handlers={handlers}
        disabled={isCreating}
      />

      <FirstBuySection 
        refs={refs}
        state={state}
        disabled={isCreating}
      />

      <DisclaimerSection />

      {/* Submit Button or Connect Wallet */}
      {connected ? (
        <button
          type="submit"
          disabled={isCreating}
          className={`w-full font-medium py-3 px-6 rounded-lg transition-all duration-200 transform shadow-lg disabled:cursor-not-allowed flex items-center justify-center space-x-2 ${
            isCreating
              ? `${isDark ? 'bg-gray-600 text-gray-300' : 'bg-gray-400 text-white'} disabled:transform-none`
              : isDark 
                ? 'bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white hover:scale-[1.02]'
                : 'bg-gradient-to-r from-pink-500 to-pink-600 hover:from-pink-600 hover:to-pink-700 text-white hover:scale-[1.02]'
          }`}
        >
          {isCreating ? (
            <>
              <Loader className="w-5 h-5 animate-spin" />
              <span>Creating Token...</span>
            </>
          ) : (
            <span>Create Token</span>
          )}
        </button>
      ) : (
        <div className="w-full flex justify-center">
          <CustomWalletButton className="w-[70%] flex justify-center" />
        </div>
      )}
    </form>
  );
};

export default TokenForm;