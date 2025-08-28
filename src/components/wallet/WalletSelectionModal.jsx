import React, { useEffect } from "react";
import { Wallet, ChevronRight } from "lucide-react";
import { useTheme } from "../../contexts/ThemeContext.jsx";

const WalletSelectionModal = ({
  isOpen,
  onClose,
  availableWallets,
  otherWallets,
  showMore,
  setShowMore,
  onWalletSelect,
}) => {
  const { isDark } = useTheme();

  // Handle body scroll when modal is open/closed
  useEffect(() => {
    if (isOpen) {
      // Store current scroll position
      const scrollY = window.scrollY;

      // Prevent body scroll
      document.body.style.position = "fixed";
      document.body.style.top = `-${scrollY}px`;
      document.body.style.width = "100%";
      document.body.style.overflow = "hidden";

      return () => {
        // Restore body scroll and position
        document.body.style.position = "";
        document.body.style.top = "";
        document.body.style.width = "";
        document.body.style.overflow = "";

        // Restore scroll position
        window.scrollTo(0, scrollY);
      };
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div
      className="fixed inset-0 z-[9999] flex items-center justify-center p-4"
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        height: "100vh",
        width: "100vw",
      }}
    >
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/80 backdrop-blur-sm"
        onClick={handleBackdropClick}
      ></div>

      <div
        className={`relative rounded-2xl shadow-2xl w-full max-w-72 border transition-colors duration-300 ${
          isDark ? "bg-gray-900 border-gray-900" : "bg-white border-gray-200"
        }`}
        onClick={(e) => e.stopPropagation()}
        style={{
          maxHeight: "80vh",
          overflow: "hidden",
        }}
      >
        {/* Header */}
        <div
          className={`p-6 border-b transition-colors duration-300 ${
            isDark ? "border-gray-700" : "border-gray-200"
          }`}
        >
          <div className="flex items-center justify-between mb-4">
            <div className="flex-1"></div>
            <h2
              className={`text-xl font-semibold transition-colors duration-300 ${
                isDark ? "text-white" : "text-gray-900"
              }`}
            >
              Connect Wallet
            </h2>
            <div className="flex-1 flex justify-end">
              <button
                onClick={onClose}
                className={`p-1 transition-colors ${
                  isDark
                    ? "text-gray-400 hover:text-white"
                    : "text-gray-600 hover:text-gray-900"
                }`}
              >
                <img
                  src="/images/icons/close.svg"
                  alt="Close"
                  className={`w-5 h-5 transition-all duration-300 ${
                    isDark ? "" : "filter invert"
                  }`}
                />
              </button>
            </div>
          </div>
          <div className="flex justify-center">
            <img
              src={isDark ? "/images/Logo-dark.png" : "/images/Logo.png"}
              alt="Scopium Logo"
              className="w-12 h-auto"
            />
          </div>
        </div>

        {/* Wallet List */}
        <div className="p-4 space-y-2 max-h-96 overflow-y-auto">
          {availableWallets.length > 0 ? (
            <>
              {/* Installed Wallets */}
              {availableWallets.map((wallet) => (
                <button
                  key={wallet.adapter.name}
                  onClick={() => onWalletSelect(wallet)}
                  className={`w-full flex items-center space-x-3 p-3 rounded-lg transition-all duration-200 ${
                    isDark ? "hover:bg-gray-900/50" : "hover:bg-gray-100/80"
                  }`}
                >
                  <img
                    src={wallet.adapter.icon}
                    alt={wallet.adapter.name}
                    className="w-8 h-8 rounded-lg"
                  />
                  <div className="flex-1 text-left">
                    <div className="flex items-center space-x-2">
                      <p
                        className={`font-medium transition-colors duration-300 ${
                          isDark ? "text-white" : "text-gray-900"
                        }`}
                      >
                        {wallet.adapter.name}
                      </p>
                      <span
                        className={`text-xs px-2 py-0.5 rounded-full transition-colors duration-300 ${
                          isDark
                            ? "text-green-400 bg-green-400/10"
                            : "text-green-600 bg-green-100"
                        }`}
                      >
                        Installed
                      </span>
                    </div>
                  </div>
                </button>
              ))}

              {/* More Options Toggle */}
              {otherWallets.length > 0 && (
                <button
                  onClick={() => setShowMore(!showMore)}
                  className={`w-full flex items-center p-3 rounded-lg transition-all duration-200 ${
                    isDark
                      ? "text-gray-400 hover:text-white hover:bg-gray-900/50"
                      : "text-gray-600 hover:text-gray-900 hover:bg-gray-100/80"
                  }`}
                >
                  <span className="text-sm font-medium">More options</span>
                  <ChevronRight
                    className={`w-4 h-4 ml-1 transition-transform ${
                      showMore ? "rotate-90" : ""
                    }`}
                  />
                </button>
              )}

              {/* Not Installed Wallets */}
              {showMore &&
                otherWallets.map((wallet) => (
                  <button
                    key={wallet.adapter.name}
                    onClick={() => onWalletSelect(wallet)}
                    className={`w-full flex items-center space-x-3 p-3 rounded-lg transition-all duration-200 opacity-60 ${
                      isDark ? "hover:bg-gray-900/50" : "hover:bg-gray-100/80"
                    }`}
                  >
                    <img
                      src={wallet.adapter.icon}
                      alt={wallet.adapter.name}
                      className="w-8 h-8 rounded-lg"
                    />
                    <div className="flex-1 text-left">
                      <div className="flex items-center space-x-2">
                        <p
                          className={`font-medium transition-colors duration-300 ${
                            isDark ? "text-white" : "text-gray-900"
                          }`}
                        >
                          {wallet.adapter.name}
                        </p>
                        <span
                          className={`text-xs px-2 py-0.5 rounded-full transition-colors duration-300 ${
                            isDark
                              ? "text-gray-500 bg-gray-500/10"
                              : "text-gray-600 bg-gray-200"
                          }`}
                        >
                          Not Installed
                        </span>
                      </div>
                    </div>
                  </button>
                ))}
            </>
          ) : (
            /* No Wallets Found */
            <div className="text-center py-8">
              <Wallet
                className={`w-12 h-12 mx-auto mb-4 transition-colors duration-300 ${
                  isDark ? "text-gray-400" : "text-gray-500"
                }`}
              />
              <p
                className={`transition-colors duration-300 ${
                  isDark ? "text-gray-400" : "text-gray-600"
                }`}
              >
                No wallets detected
              </p>
              <p
                className={`text-sm mt-2 transition-colors duration-300 ${
                  isDark ? "text-gray-500" : "text-gray-500"
                }`}
              >
                Please install a Solana wallet extension
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default WalletSelectionModal;
