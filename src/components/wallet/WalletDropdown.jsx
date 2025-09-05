import { useEffect, useRef } from "react";
import { User, Eye, LogOut } from "lucide-react";
import { useTheme } from "../../contexts/ThemeContext.jsx";


const WalletDropdown = ({
  isOpen,
  onProfileClick,
  onViewWallet,
  onDisconnect,
  onClose,
}) => {
  const { isDark } = useTheme();

  if (!isOpen) return null;

  const handleBackdropClick = (e) => {
    onClose();
  };

  const modalRef = useRef(null)

  useEffect(() => {
      if(window.scrollY < 80) {
      modalRef.current.style.top = `${0+window.scrollY}px`
    }else{modalRef.current.style.top = `80px`}

  }, []);

  return (
    <div
      className="fixed h-[calc(100vh+20px)] left-0 z-[9999] w-full flex items-center justify-center p-4"
      onClick={handleBackdropClick} 
      ref={modalRef}
    >
      {/* Backdrop */}
      <div className="absolute top-0 left-0 w-full h-full bg-black/80 backdrop-blur-sm"></div>

      {/* Dropdown Modal */}
      <div
        className={`relative w-full max-w-xs backdrop-blur-md border rounded-lg shadow-2xl overflow-hidden transition-colors duration-200 ${
          isDark
            ? "bg-gray-900/95 border-gray-600"
            : "bg-white/95 border-gray-200"
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Profile Option */}
        <button
          onClick={onProfileClick}
          className={`w-full flex items-center space-x-3 px-4 py-3 transition-colors text-left ${
            isDark
              ? "text-gray-300 hover:text-white hover:bg-gray-700/50"
              : "text-gray-700 hover:text-gray-900 hover:bg-gray-100/50"
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
              ? "text-gray-300 hover:text-white hover:bg-gray-700/50"
              : "text-gray-700 hover:text-gray-900 hover:bg-gray-100/50"
          }`}
        >
          <Eye className="w-4 h-4" />
          <span className="text-sm">View wallet</span>
        </button>

        {/* Divider */}
        <div
          className={`border-t my-1 ${
            isDark ? "border-gray-600" : "border-gray-200"
          }`}
        ></div>

        {/* Log Out Option */}
        <button
          onClick={onDisconnect}
          className="w-full flex items-center space-x-3 px-4 py-3 text-red-400 hover:text-red-300 hover:bg-red-500/10 transition-colors text-left"
        >
          <LogOut className="w-4 h-4" />
          <span className="text-sm">Log out</span>
        </button>
      </div>
    </div>
  );
};

export default WalletDropdown;
