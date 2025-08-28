import React, { useState, useEffect, useContext } from "react";
import { useWallet } from "@solana/wallet-adapter-react";
import { WalletReadyState } from "@solana/wallet-adapter-base";
import { Wallet, ChevronDown, Loader } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { formatAddress } from "../utils/formatters.js";
import { useLogout } from "../hooks/auth/useLogout.js";
import {
  WalletSelectionModal,
  WalletDropdown,
  WalletModal,
} from "./wallet/index.js";
import { SecondaryButton } from "./ui/index.js";
import { getUser } from "../utils/index.js";
import { useTheme } from "../contexts/ThemeContext.jsx";
import { AuthContext } from "../contexts/AuthContext.jsx";

const CustomWalletButton = ({ className = "" }) => {
  const navigate = useNavigate();
  const { isDark } = useTheme();
  const {
    wallets,
    wallet,
    publicKey,
    connected,
    connecting,
    disconnecting,
    select,
    connect,
    disconnect,
  } = useWallet();

  const { isAuthenticated, user, setUser } = useContext(AuthContext);

  const { logout } = useLogout();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [showMore, setShowMore] = useState(false);
  const [isWalletModalOpen, setIsWalletModalOpen] = useState(false);

  // Prevent body scroll when modal is open
  useEffect(() => {
    if (isModalOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }

    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isModalOpen]);

  const shortAddress = publicKey ? formatAddress(publicKey.toString()) : "";

  const handleConnect = async () => {
    if (connected) {
      setIsDropdownOpen(!isDropdownOpen);
      return;
    }

    if (wallet) {
      try {
        await connect();
      } catch (error) {
        console.error("Failed to connect:", error);
      }
    } else {
      setIsModalOpen(true);
    }
  };

  const handleWalletSelect = async (selectedWallet) => {
    try {
      select(selectedWallet.adapter.name);
      setIsModalOpen(false);
      // The autoConnect feature will handle the connection automatically
    } catch (error) {
      console.error("Failed to select wallet:", error);
    }
  };

  const handleDisconnect = async () => {
    try {
      await disconnect();
      logout();
      setUser(null);
      setIsDropdownOpen(false);
    } catch (error) {
      console.error("Failed to disconnect:", error);
    }
  };

  const handleProfileClick = () => {
    if (!user) {
      return;
    } else {
      navigate(`/profile/${user.username}`);
    }
    setIsDropdownOpen(false);
  };

  const handleViewWallet = () => {
    setIsWalletModalOpen(true);
    setIsDropdownOpen(false);
  };

  const availableWallets = wallets.filter(
    (wallet) => wallet.readyState === WalletReadyState.Installed
  );

  const otherWallets = wallets.filter(
    (wallet) => wallet.readyState !== WalletReadyState.Installed
  );

  const buttonText = () => {
    if (connecting) return "Connecting...";
    if (disconnecting) return "Disconnecting...";
    if (isAuthenticated) return "Logging in...";
    if (connected) return user?.username;
    return "Log In";
  };

  const isLoading = connecting || disconnecting || isAuthenticated;

  return (
    <div className={`relative ${className}`}>
      {/* Main Button */}
      <SecondaryButton
        onClick={handleConnect}
        disabled={isLoading}
        size="md"
        className={`flex items-center space-x-2 ${className}`}
      >
        {isLoading ? (
          <Loader className="w-4 h-4 animate-spin" />
        ) : (
          <Wallet className="w-4 h-4" />
        )}
        <span className="text-sm">{buttonText()}</span>
        {connected && !isLoading && <ChevronDown className="w-3 h-3" />}
      </SecondaryButton>

      {/* Connected Wallet Dropdown - New Design */}
      <WalletDropdown
        isOpen={connected && isDropdownOpen && !isLoading}
        onProfileClick={handleProfileClick}
        onViewWallet={handleViewWallet}
        onDisconnect={handleDisconnect}
        onClose={() => setIsDropdownOpen(false)}
      />

      {/* Wallet Modal */}
      <WalletModal
        userData={user}
        isOpen={isWalletModalOpen}
        onClose={() => setIsWalletModalOpen(false)}
      />

      {/* Wallet Selection Modal */}
      <WalletSelectionModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        availableWallets={availableWallets}
        otherWallets={otherWallets}
        showMore={showMore}
        setShowMore={setShowMore}
        onWalletSelect={handleWalletSelect}
      />
    </div>
  );
};

export default CustomWalletButton;
