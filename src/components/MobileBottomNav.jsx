import React, { useState, useRef, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Home, Bitcoin, Video, User, Plus, ChevronUp, Heart, Search } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';

const MobileBottomNav = ({ onCreateTokenClick, onCreateStreamClick }) => {
    const navigate = useNavigate();
    const location = useLocation();
    const [isCreateDropdownOpen, setIsCreateDropdownOpen] = useState(false);
    const dropdownRef = useRef(null);
    const isDark = useTheme();

    const scrollToSection = (sectionId) => {
        // If not on homepage, navigate to homepage first
        if (location.pathname !== '/') {
            navigate('/');
            // Wait for navigation to complete, then scroll
            setTimeout(() => {
                const element = document.getElementById(sectionId);
                if (element) {
                    element.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }
            }, 100);
        } else {
            // Already on homepage, just scroll
            const element = document.getElementById(sectionId);
            if (element) {
                element.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        }
    };

    const navItems = [
        {
            id: 'home',
            icon: Home,
            label: 'Home',
            path: '/',
            onClick: () => scrollToSection('hero-live-stream')
        },
        {
            id: 'search',
            icon: Search,
            label: 'Search',
            path: '/',
            onClick: () => scrollToSection('hero-live-stream')
        },
        {
            id: 'user',
            icon: User,
            label: 'Live',
            path: '/',
            onClick: () => scrollToSection('live-now')
        },
        {
            id: 'heart',
            icon: Heart,
            label: 'Favorites',
            path: '/',
            onClick: () => scrollToSection('favorite-tokens')
        }        
    ];

    const handleCreateClick = () => {
        setIsCreateDropdownOpen(!isCreateDropdownOpen);
    };

    const handleCreateTokenClick = () => {
        onCreateTokenClick();
        setIsCreateDropdownOpen(false);
    };

    const handleCreateStreamClick = () => {
        if (onCreateStreamClick) {
            onCreateStreamClick();
        } else {
            console.log('Create Stream clicked');
        }
        setIsCreateDropdownOpen(false);
    };

    // Close dropdown when clicking outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsCreateDropdownOpen(false);
            }
        };

        if (isCreateDropdownOpen) {
            document.addEventListener('mousedown', handleClickOutside);
        }

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [isCreateDropdownOpen]);

    return (
        <div className="fixed bottom-4 left-1/2 -translate-x-1/2 z-50 md:hidden flex items-center space-x-3">
            {/* Create Dropdown */}
            {isCreateDropdownOpen && (
                <div 
                    ref={dropdownRef}
                    className={`absolute bottom-16 right-0 w-48 backdrop-blur-md rounded-xl shadow-2xl border py-2 z-50 transition-colors duration-300 ${
                      isDark 
                        ? 'bg-gray-800/95 border-gray-600/50' 
                        : 'bg-white/95 border-gray-200/50'
                    }`}
                >
                    <button
                        onClick={handleCreateTokenClick}
                        className={`w-full text-left px-4 py-3 transition-colors duration-200 text-sm font-medium flex items-center space-x-3 ${
                          isDark 
                            ? 'text-gray-200 hover:text-white hover:bg-gray-700/50' 
                            : 'text-gray-800 hover:bg-gray-100/80'
                        }`}
                    >
                        <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                          isDark 
                            ? 'bg-gradient-to-r from-green-500 to-green-600'
                            : 'bg-gradient-to-r from-pink-500 to-pink-600'
                        }`}>
                            <Bitcoin className="w-4 h-4 text-white" />
                        </div>
                        <span>Create Token</span>
                    </button>
                    <button
                        onClick={handleCreateStreamClick}
                        className={`w-full text-left px-4 py-3 transition-colors duration-200 text-sm font-medium flex items-center space-x-3 ${
                          isDark 
                            ? 'text-gray-200 hover:text-white hover:bg-gray-700/50' 
                            : 'text-gray-800 hover:bg-gray-100/80'
                        }`}
                    >
                        <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-purple-600 rounded-lg flex items-center justify-center">
                            <Video className="w-4 h-4 text-white" />
                        </div>
                        <span>Create Stream</span>
                    </button>
                </div>
            )}

            {/* Larger rounded pill background */}
            <div className="flex items-center justify-between bg-[#CCCCCC20] backdrop-blur-[20px] rounded-full px-4 py-3 space-x-5">
                {navItems.map((item) => {
                    const Icon = item.icon;
                    return (
                        <button
                            key={item.id}
                            onClick={item.onClick}
                            className={`flex flex-col items-center justify-center transition-all duration-200 ${isDark? "black" : "white"}`}
                        >
                            <Icon className="w-6 h-6 mb-0.5" />
                        </button>
                    );
                })}
            </div>

            {/* Floating pink + button */}
            <button
                onClick={handleCreateClick}
              className={`ml-2 flex items-center justify-center w-12 h-12 text-white rounded-full shadow-lg transition-all duration-200 hover:scale-105 ${
                isDark 
                  ? 'bg-gradient-to-r from-green-500 to-green-600'
                  : 'bg-gradient-to-r from-pink-500 to-pink-600'
              } ${
                    isCreateDropdownOpen ? 'rotate-45' : ''
                }`}
            >
                {isCreateDropdownOpen ? (
                    <ChevronUp className="w-6 h-6" />
                ) : (
                    <Plus className="w-6 h-6" />
                )}
            </button>
        </div>
    );
};

export default MobileBottomNav;