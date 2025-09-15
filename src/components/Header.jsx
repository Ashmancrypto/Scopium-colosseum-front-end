import { useState, useEffect, useRef } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useHeaderSearch } from "../hooks/useHeaderSearch.js";
import { Search, ChevronDown } from "lucide-react";
import { MainCtaButton } from "./ui/index.js";
import CustomWalletButton from "./CustomWalletButton.jsx";
import ThemeToggle from "./ThemeToggle.jsx";
import { useTheme } from "../contexts/ThemeContext.jsx";
import { Link } from "react-router-dom";
import { AnimatePresence, motion } from "motion/react";
import Newly from "./homepage/Newly.jsx";
import RightSidebar from "./homepage/RightSidebar.jsx";
import StreamCreator from "./homepage/StreamCreator.jsx";
import { CreateTokenModal } from "./createModal/index.js";

const Header = ({ onSearch, showNewly = false, showRightSidebar = false }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { handleSearch } = useHeaderSearch();
  const { isDark } = useTheme();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isCreateDropdownOpen, setIsCreateDropdownOpen] = useState(false);
  const [isCreateTokenModalOpen, setIsCreateTokenModalOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isNavigationMenuOpen, setIsNavigationMenuOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  const dropdownRef = useRef(null);

  const createStreamModalRef = useRef(null);

  const navItems = [
    {
      name: "Streamers",
      path: "/coming-soon",
      icon: "/images/icons/streamers.png",
    },
    { name: "Tokens", path: "/all-tokens", icon: "/images/icons/tokens.png" },
  ];

  const navigationMenuItems = {
    general: [
      {
        name: "About",
        path: "/about",
      },
      {
        name: "Advertise",
        path: "/advertise",
      },
      {
        name: "API Data",
        path: "/api-data",
      },
      {
        name: "Affiliate Program",
        path: "/affiliate-program",
      },
      {
        name: "Socials",
        path: "/socials",
      },
    ],
    legal: [
      {
        name: "All Legal Docs",
        path: "/legal-docs",
      },
      {
        name: "Privacy Notice",
        path: "/privacy",
      },
      {
        name: "Disclaimers",
        path: "/disclaimer",
      },
      {
        name: "Cookie Notice",
        path: "/cookie-notice",
      },
      {
        name: "Support",
        path: "/support",
      },
      {
        name: "Security",
        path: "/security",
      },
      {
        name: "Terms",
        path: "/terms-of-service",
      },
    ],
  };

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
    setIsModalOpen(true);
    setIsCreateDropdownOpen(false);
    setIsMobileMenuOpen(false);
  };

  const handleCloseTokenModal = () => {
    setIsCreateTokenModalOpen(false);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleStreamCreated = (newStream) => {
    console.log("Stream created:", newStream);
    setIsModalOpen(false);
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

  useEffect(() => {
    if (isCreateTokenModalOpen || isModalOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
  }, [isCreateTokenModalOpen, isModalOpen]);

  useEffect(() => {
    if (createStreamModalRef.current) {
      if (window.scrollY < 80) {
        createStreamModalRef.current.style.top = `${0 + window.scrollY}px`;
      } else {
        createStreamModalRef.current.style.top = `80px`;
      }
    }
  }, [isModalOpen]);

  return (
    <header
      className={`md:mt-20 md:-mb-20 max-h-40 sticky top-0 left-0 z-40 border-b transition-colors duration-200 md:-translate-y-1/2
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
      <AnimatePresence>
        {isNavigationMenuOpen && (
          <div
            className={`lg:hidden min-h-screen bg-black/50 absolute bottom-0 w-full translate-y-full z-30 backdrop-blur-sm`}
            onClick={toggleNavigationMenu}
          >
            <motion.div
              onClick={(e) => e.stopPropagation()}
              key="navigation-menu-mobile"
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              className={`w-[308px] h-full absolute top-0 left-0 z-10 pt-[28px] pb-[300px] px-[24px] text-[14px] leading-none overflow-y-scroll no-scrollbar ${
                isDark
                  ? "bg-[rgba(46,46,46,1)] text-white"
                  : "bg-white text-black"
              }`}
              style={{
                boxShadow: isDark
                  ? "inset 0px 8px 10px -8px rgba(1,219,117,0.25)"
                  : "inset 0px 8px 10px -8px rgba(250, 78, 171, 0.25)",
              }}
            >
              <svg
                width="22"
                height="16"
                viewBox="0 0 22 16"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="absolute top-6 right-6 cursor-pointer"
                onClick={toggleNavigationMenu}
              >
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M7.60729 1.952C7.82799 2.177 7.95196 2.482 7.95196 2.8C7.95196 3.118 7.82799 3.423 7.60729 3.648L4.51157 6.8L16.1071 6.8C16.4197 6.8 16.7195 6.92643 16.9405 7.15147C17.1615 7.37652 17.2857 7.68174 17.2857 8C17.2857 8.31826 17.1615 8.62348 16.9405 8.84853C16.7195 9.07357 16.4197 9.2 16.1071 9.2L4.51157 9.2L7.60729 12.352C7.81547 12.5795 7.9288 12.8804 7.92342 13.1912C7.91803 13.5021 7.79434 13.7987 7.57841 14.0186C7.36247 14.2385 7.07115 14.3644 6.76582 14.3699C6.46049 14.3754 6.16499 14.26 5.94157 14.048L0 8L5.94 1.952C6.04945 1.84049 6.17941 1.75203 6.32245 1.69168C6.46549 1.63132 6.61881 1.60026 6.77364 1.60026C6.92848 1.60026 7.0818 1.63132 7.22484 1.69168C7.36788 1.75203 7.49784 1.84049 7.60729 1.952ZM19.6429 14.8C19.6429 15.1183 19.767 15.4235 19.9881 15.6485C20.2091 15.8736 20.5089 16 20.8214 16C21.134 16 21.4338 15.8736 21.6548 15.6485C21.8758 15.4235 22 15.1183 22 14.8V1.2C22 0.88174 21.8758 0.576516 21.6548 0.351472C21.4338 0.126429 21.134 -1.39116e-08 20.8214 0C20.5089 1.39116e-08 20.2091 0.126429 19.9881 0.351473C19.767 0.576516 19.6429 0.88174 19.6429 1.2V14.8Z"
                  fill={isDark ? "#F7F7F7" : "#0A0A0A"}
                />
              </svg>

              <div id="general" className="flex flex-col gap-[28px] mb-[24px]">
                <h3 className="font-bold text-[16px]">General</h3>
                {navigationMenuItems.general.map((item, index) => (
                  <Link
                    key={index}
                    to={item.path}
                    className={`transition-colors duration-200 ${
                      isDark ? "hover:text-green-500" : "hover:text-pink-500 "
                    }`}
                  >
                    {item.name}
                  </Link>
                ))}
              </div>
              <div
                className={`border ${
                  isDark
                    ? "border-[rgba(247,247,247,0.6)]"
                    : "border-[rgba(10,10,10,0.2)]"
                }`}
              ></div>
              <div id="legal" className="flex flex-col gap-[28px] mt-[24px]">
                <h3 className="font-bold text-[16px]">Legal</h3>
                {navigationMenuItems.legal.map((item, index) => (
                  <Link
                    key={index}
                    to={item.path}
                    className={`transition-colors duration-200 ${
                      isDark ? "hover:text-green-500" : "hover:text-pink-500 "
                    }`}
                  >
                    {item.name}
                  </Link>
                ))}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
      <div className="relative w-full px-4 sm:px-6 lg:px-8">
        <div className="flex items-center md:items-end justify-between h-14 md:h-40 md:py-4 w-full">
          {/* Left Side - Logo and Create Button (Far Left Edge) */}
          <div className="flex items-center space-x-10 flex-shrink-0">
            <img
              src={`${isDark ? "/images/Logo-dark.png" : "/images/Logo.png"}`}
              alt="Scopium Logo"
              className="h-8 w-auto cursor-pointer hover:opacity-80 transition-opacity duration-200"
              onClick={handleLogoClick}
            />
            <div className="hidden md:block relative ml-4" ref={dropdownRef}>
              <MainCtaButton
                onClick={handleCreateClick}
                className="flex items-center space-x-2"
              >
                <span>Create</span>
                <ChevronDown
                  className={`w-4 h-4 text-white transition-transform duration-200 ${
                    isCreateDropdownOpen ? "rotate-180" : ""
                  }`}
                />
              </MainCtaButton>

              {/* Create Dropdown Menu */}
              <AnimatePresence>
                {isCreateDropdownOpen && (
                  <motion.div
                    initial={{ opacity: 0, translateY: "-10%" }}
                    animate={{ opacity: 1, translateY: "0%" }}
                    exit={{ opacity: 0, translateY: "-10%" }}
                    transition={{ duration: 0.2, ease: "easeInOut" }}
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
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
            {/*Dropdown menu button*/}
            <div className="relative z-10">
              <AnimatePresence>
                <button
                  className="p-2 w-10 h-10 flex items-center justify-center"
                  onClick={toggleNavigationMenu}
                >
                  {isNavigationMenuOpen ? (
                    <motion.svg
                      width="20"
                      height="20"
                      viewBox="0 0 20 20"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.2 }}
                      key="close-icon"
                    >
                      <path
                        d="M19 1L1 19M1 1L19 19"
                        stroke={isDark ? "white" : "#0A0A0A"}
                        strokeOpacity={isDark ? "1" : "0.6"}
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </motion.svg>
                  ) : (
                    <motion.svg
                      width="20"
                      height="20"
                      viewBox="0 0 20 20"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.2 }}
                      key="open-icon"
                    >
                      <path
                        d="M0 17V14.6667H20V17H0ZM0 11.1667V8.83333H20V11.1667H0ZM0 5.33333V3H20V5.33333H0Z"
                        fill={isDark ? "white" : "#0A0A0A"}
                        fillOpacity={isDark ? "1" : "0.6"}
                      />
                    </motion.svg>
                  )}
                </button>
                {isNavigationMenuOpen && (
                  <motion.div
                    className={`lg:block hidden p-[20px] rounded-[12px] absolute bottom-0 left-0  translate-y-full w-[186px] text-[14px] leading-none ${
                      isDark
                        ? "border bg-[rgba(46,46,46,1)] border-[rgba(1,219,117,0.3)]"
                        : "bg-white text-black"
                    }`}
                    style={{
                      boxShadow: "0px 0px 10px 0px rgba(0, 0, 0, 0.15)",
                    }}
                    initial={{ opacity: 0, translateY: "95%" }}
                    animate={{ opacity: 1, translateY: "100%" }}
                    exit={{ opacity: 0, translateY: "95%" }}
                    transition={{ duration: 0.2, ease: "easeInOut" }}
                    key="navigation-menu"
                  >
                    <div
                      id="general"
                      className="flex flex-col gap-[20px] mb-[16px]"
                    >
                      <h3 className="font-bold">General</h3>
                      {navigationMenuItems.general.map((item, index) => (
                        <Link
                          key={index}
                          to={item.path}
                          className={`transition-colors duration-200 ${
                            isDark
                              ? "hover:text-green-500"
                              : "hover:text-pink-500 "
                          }`}
                        >
                          {item.name}
                        </Link>
                      ))}
                    </div>
                    <div
                      className={`border ${
                        isDark
                          ? "border-[rgba(247,247,247,0.6)]"
                          : "border-[rgba(10,10,10,0.2)]"
                      }`}
                    ></div>
                    <div
                      id="legal"
                      className="flex flex-col gap-[20px] mt-[16px]"
                    >
                      <h3 className="font-bold">Legal</h3>
                      {navigationMenuItems.legal.map((item, index) => (
                        <Link
                          key={index}
                          to={item.path}
                          className={`transition-colors duration-200 ${
                            isDark
                              ? "hover:text-green-500"
                              : "hover:text-pink-500 "
                          }`}
                        >
                          {item.name}
                        </Link>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
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
          </div>
        </div>
      </div>
      {showNewly && <Newly />}
      {showRightSidebar && <RightSidebar />}
      {/* Create Token Modal */}
      <CreateTokenModal
        isOpen={isCreateTokenModalOpen}
        onClose={handleCloseTokenModal}
      />
      {/* create stream */}
      {isModalOpen && (
        <div
          className="fixed left-0 z-[9999] w-full h-screen flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
          onClick={closeModal}
          ref={createStreamModalRef}
        >

          <div className="relative max-w-[529px] w-full">
          <div className="absolute left-[100%] rotate-[20deg] top-1/2 -translate-x-[35%] -translate-y-1/2 w-[337px] ">
            <img
              src={`${
                isDark
                  ? "/images/mascot/scopium-mascot-dark.png"
                  : "/images/mascot/scopium-mascot.png"
              }`}
              alt="Stream mascot"
              className="object-contain w-full h-full"
            />
          </div>
          <div
            className={`relative rounded-2xl shadow-2xl w-full border transition-colors duration-300 border-none`}
            style={{ maxHeight: "90vh", overflow: "hidden" }}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className={`absolute top-4 right-4 p-2 rounded-lg transition-colors z-10 ${
                isDark
                  ? "text-gray-400 hover:text-white hover:bg-gray-600"
                  : "text-gray-600 hover:text-gray-900 hover:bg-gray-200"
              }`}
              onClick={closeModal}
            >
              <svg
                width="15"
                height="15"
                viewBox="0 0 15 15"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M13.5 1.5L1.5 13.5M1.5 1.5L13.5 13.5"
                  stroke={isDark ? "white" : "#0A0A0A"}
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
            <div
              className="no-scrollbar border-none"
              style={{ maxHeight: "90vh", overflow: "auto" }}
            >
              <StreamCreator onStreamCreated={handleStreamCreated} />
            </div>
          </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
