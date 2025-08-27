import React, { useState, useEffect, useRef } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useHeaderSearch } from "../hooks/useHeaderSearch.js";
import { Menu, X, Search, ChevronDown, Briefcase } from "lucide-react";
import { PinkGradientButton } from "./ui/index.js";
import CustomWalletButton from "./CustomWalletButton.jsx";
import ThemeToggle from "./ThemeToggle.jsx";
import { MobileNetworkMenu } from "./ui/index.js";
import MobileBottomNav from "./MobileBottomNav.jsx";
import { CreateTokenModal } from "./createModal/index.js";
import { useTheme } from "../contexts/ThemeContext.jsx";

const Header = ({ selectedNetwork, setSelectedNetwork, onSearch }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { handleSearch } = useHeaderSearch();
  const { isDark } = useTheme();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isCreateDropdownOpen, setIsCreateDropdownOpen] = useState(false);
  const [isCreateTokenModalOpen, setIsCreateTokenModalOpen] = useState(false);
  const [isNavigationMenuOpen, setIsNavigationMenuOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  const dropdownRef = useRef(null);

  const navItems = [
    {
      name: "Streamers",
      path: "/coming-soon",
      icon: "/images/icons/streamers.png",
    },
    { name: "Tokens", path: "/all-tokens", icon: "/images/icons/tokens.png" },
  ];

  const handleLogoClick = () => {
    navigate("/");
    setIsMobileMenuOpen(false);
  };

  const handleNavClick = (path) => {
    navigate(path);
    setIsMobileMenuOpen(false);
  };

  const handleCreateClick = () => {
    setIsCreateDropdownOpen(!isCreateDropdownOpen);
  };

  const handleCreateTokenClick = () => {
    setIsCreateTokenModalOpen(true);
    setIsCreateDropdownOpen(false);
    setIsMobileMenuOpen(false);
  };

  const handleCreateStreamClick = () => {
    // TODO: Implement create stream functionality
    console.log("Create Stream clicked");
    setIsCreateDropdownOpen(false);
    setIsMobileMenuOpen(false);
  };

  const handleCloseTokenModal = () => {
    setIsCreateTokenModalOpen(false);
  };

  const toggleMobileMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);
  const toggleNavigationMenu = () =>
    setIsNavigationMenuOpen(!isNavigationMenuOpen);
  const isActivePage = (path) => location.pathname === path;

  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearchTerm(value);

    // Trigger search and navigate to homepage if not already there
    if (onSearch) {
      onSearch(value);
    }
    handleSearch(value);

    // Navigate to homepage if searching from another page
    if (location.pathname !== "/" && value.trim()) {
      navigate("/");
    }
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    // Form submission is handled by onChange for real-time search
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsCreateDropdownOpen(false);
      }
    };

    if (isCreateDropdownOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isCreateDropdownOpen]);

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 border-b backdrop-blur-sm transition-colors duration-200 
          ${
            isDark ? "border-black shadow-green-bottom" : "shadow-pink-bottom"
          }`}
        style={{
          backgroundImage: isDark
            ? "url(/images/header-image-dark.png)"
            : "url(/images/header-image.png)",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      >
        <div className="relative w-full px-4 sm:px-6 lg:px-8">
          <div className="flex items-center md:items-end justify-between h-14 md:h-40 md:pb-4 w-full">
            {/* Left Side - Logo and Create Button (Far Left Edge) */}
            <div className="flex items-center space-x-10 flex-shrink-0">
              <img
                src={`${isDark ? "/images/Logo-dark.png" : "/images/Logo.png"}`}
                alt="Scopium Logo"
                className="h-8 w-auto cursor-pointer hover:opacity-80 transition-opacity duration-200"
                onClick={handleLogoClick}
              />
              <div className="hidden md:block relative ml-4" ref={dropdownRef}>
                <PinkGradientButton
                  onClick={handleCreateClick}
                  className="flex items-center space-x-2"
                >
                  <span>Create</span>
                  <ChevronDown
                    className={`w-4 h-4 text-white transition-transform duration-200 ${
                      isCreateDropdownOpen ? "rotate-180" : ""
                    }`}
                  />
                </PinkGradientButton>

                {/* Create Dropdown Menu */}
                {isCreateDropdownOpen && (
                  <div
                    className={`absolute top-full left-0 mt-2 w-48 rounded-lg shadow-lg border py-2 z-50 transition-colors duration-300 ${
                      isDark
                        ? "bg-gray-900 border-gray-600"
                        : "bg-white border-gray-200"
                    }`}
                  >
                    <button
                      onClick={handleCreateTokenClick}
                      className={`w-full text-left px-4 py-3 transition-colors duration-200 text-sm font-medium ${
                        isDark
                          ? "text-gray-200 hover:text-white hover:bg-gray-700/50"
                          : "text-gray-800 hover:bg-gray-100"
                      }`}
                    >
                      Create Token
                    </button>
                    <button
                      onClick={handleCreateStreamClick}
                      className={`w-full text-left px-4 py-3 transition-colors duration-200 text-sm font-medium ${
                        isDark
                          ? "text-gray-200 hover:text-white hover:bg-gray-700/50"
                          : "text-gray-800 hover:bg-gray-100"
                      }`}
                    >
                      Create Stream
                    </button>
                  </div>
                )}
              </div>
              {/*Dropdown menu button*/}
              <button className="p-2">
                <Menu className="h-6 w-6" />
              </button>
            </div>

            {/* Middle - Search Bar (Centered with flex-grow) */}
            <div className="hidden md:flex flex-1 justify-center px-8">
              <form onSubmit={handleSearchSubmit} className="w-full max-w-md">
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Search"
                    value={searchTerm}
                    onChange={handleSearchChange}
                    className={`w-full pl-10 pr-4 py-2 border rounded-[12px] focus:outline-none focus:ring-2 focus:ring-pink-400 transition-all text-sm ${
                      isDark
                        ? "border-gray-600 bg-gray-900 text-white placeholder-gray-400"
                        : "border-[#0A0A0A99] bg-[#EBEBEB] text-gray-900 placeholder-gray-500"
                    }`}
                  />
                  <Search
                    className={`absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 transition-colors duration-300 ${
                      isDark ? "text-gray-400" : "text-gray-500"
                    }`}
                  />
                </div>
              </form>
            </div>

            {/* Right Side - Navigation, Theme Toggle, and Login (Far Right Edge) */}
            <div className="hidden md:flex items-center space-x-6 flex-shrink-0">
              {navItems.map((item) => (
                <button
                  key={item.name}
                  onClick={() => handleNavClick(item.path)}
                  className={`relative text-sm font-medium transition-colors duration-200 ${
                    isActivePage(item.path)
                      ? `${
                          isDark
                            ? "text-green-400 hover:text-green-400"
                            : "text-pink-300 font-bold"
                        }`
                      : `${
                          isDark
                            ? "text-[#F7F7F7] hover:text-green-400"
                            : "text-[#0A0A0A99] hover:text-pink-300"
                        }`
                  }`}
                >
                  {item.name}
                  {isActivePage(item.path) && (
                    <div
                      className={`absolute -bottom-1 left-0 right-0 h-0.5 rounded-full ${
                        isDark ? "bg-green-400" : "bg-pink-400"
                      }`}
                    />
                  )}
                </button>
              ))}
              <ThemeToggle
                className={`p-2 ${
                  isDark ? "text-white" : "text-[#0A0A0A99]"
                } hover:text-pink-300 transition-colors`}
              />
              <CustomWalletButton className="w-auto justify-center" />
            </div>

            <div className="md:hidden flex items-center space-x-2 flex-shrink-0">
              <ThemeToggle
                className={`p-2 ${
                  isDark ? "text-white" : "text-[#0A0A0A99]"
                } hover:text-pink-300 transition-colors`}
              />
              <CustomWalletButton className="w-auto justify-center" />
              {/* <button
                onClick={toggleMobileMenu}
                className={`p-2 ${isDark? "white" : "text-[#0A0A0A99]"} hover:text-pink-300 transition-colors`}
              >
                {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </button> */}
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Menu */}
      {/* {isMobileMenuOpen && (
        <div className="fixed inset-0 z-40 md:hidden">
          <div className="fixed inset-0 bg-black/50" onClick={toggleMobileMenu}></div>
          <div
            className="fixed top-16 left-1/2 -translate-x-1/2 w-11/12 max-w-xs bg-white/90 backdrop-blur-md rounded-xl p-4 space-y-4 shadow-pink-bottom transition-all duration-300"
          >
            
            <MobileNetworkMenu
              selectedNetwork={selectedNetwork}
              onNetworkChange={setSelectedNetwork}
              isVisible
            />
            
            <div className="space-y-2">
              {navItems.map((item) => (
                <button
                  key={item.name}
                  onClick={() => handleNavClick(item.path)}
                  className={`w-full text-left px-4 py-3 rounded-lg transition-colors duration-200 font-medium ${isActivePage(item.path)
                      ? 'bg-pink-100 text-pink-600'
                      : 'text-gray-800 hover:bg-gray-100'
                    }`}
                >
                  <div className="flex items-center space-x-3">
                    <img
                      src={item.icon}
                      alt={item.name}
                      className="w-5 h-5"
                    />
                    <span>{item.name}</span>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>
      )} */}

      {/* Create Token Modal */}
      <CreateTokenModal
        isOpen={isCreateTokenModalOpen}
        onClose={handleCloseTokenModal}
      />

      {/* Mobile Bottom Navigation */}
      <MobileBottomNav
        onCreateTokenClick={handleCreateTokenClick}
        onCreateStreamClick={handleCreateStreamClick}
      />
    </>
  );
};

export default Header;
