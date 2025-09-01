import { useState, useEffect, useRef } from 'react';
import { useTheme } from '../../contexts/ThemeContext.jsx';

const HamburgerMenu = ({ onMenuToggle }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef(null);
    const { isDark } = useTheme();
  

  const general = [
    { name: 'About', url: '#' },
    { name: 'Advertise', url: '#' },
    { name: 'API Data', url: '#' },
    { name: 'Affiliate Program', url: '#' },
    { name: 'Socials', url: '#' },
  ];
  const legal = [
    { name: 'All Legal Docs', url: '#' },
    { name: 'Disclaimers', url: '/disclaimer', isRoute: true },
    { name: 'Support', url: '#' },
    { name: 'Security', url: '#' },
    { name: 'Privacy Policy', url: '/privacy', isRoute: true  },
    { name: 'Terms of Service', url: '/terms-of-service', isRoute: true }
  ]
  const handleMenuClick = () => {
    setIsMenuOpen(!isMenuOpen);
    onMenuToggle && onMenuToggle(!isMenuOpen);
  };

  const handleLinkClick = () => {
    setIsMenuOpen(false);
    onMenuToggle && onMenuToggle(false);
  };

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsMenuOpen(false);
        onMenuToggle && onMenuToggle(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [onMenuToggle]);

  return (
    <div className="relative" ref={menuRef}>
      {/* Hamburger Button */}
      <button
        onClick={handleMenuClick}
        className="p-2 hover:bg-gray-100 rounded-md transition-colors duration-200"
        aria-label="Toggle menu"
      >
        <div className="w-6 h-6 flex flex-col justify-center space-y-1">
          <div className={`h-0.5 ${isDark ?'bg-green-600':'bg-pink-600'} rounded transition-all duration-300 ${
            isMenuOpen ? 'rotate-45 translate-y-2' : ''
          }`}></div>
          <div className={`h-0.5 ${isDark ?'bg-green-600':'bg-pink-600'} rounded transition-all duration-300 ${
            isMenuOpen ? 'opacity-0' : ''
          }`}></div>
          <div className={`h-0.5 ${isDark ?'bg-green-600':'bg-pink-600'} rounded transition-all duration-300 ${
            isMenuOpen ? '-rotate-45 -translate-y-2' : ''
          }`}></div>
        </div>
      </button>

      {/* Dropdown Menu */}
      {isMenuOpen && (
        <div className={`absolute top-full left-0 mt-2 w-64 ${isDark ?'bg-black':'bg-white'} rounded-lg shadow-lg border border-green-200 py-2 z-50`}>
            <span className='flex items-center px-7 font-bold'>General</span>
          {general.map((item, index) => (
            <a
              key={index}
              href={item.url}
              className={`flex items-center space-x-3 px-4 py-1 text-gray-700 hover:bg-gray-50 ${isDark ? 'hover:text-green-600':'hover:text-pink-600'} transition-colors duration-200`}
              onClick={handleLinkClick}
            >
              <span className="text-lg">{item.icon}</span>
              <span className="font-medium">{item.name}</span>
            </a>
          ))}
          
          {/* Divider */}
          <div className="border-t border-gray-200 my-2 w-48 mx-auto"></div>
          <span className='flex items-center px-7 font-bold'>Legal</span>
          {legal.map((item, index) => (
            <a
              key={index}
              href={item.url}
              className={`flex items-center space-x-3 px-4 py-1 text-gray-700 ${isDark ? 'hover:text-green-600':'hover:text-pink-600'} hover:bg-gray-50  transition-colors duration-200`}
              onClick={handleLinkClick}
            >
              <span className="text-lg">{item.icon}</span>
              <span className="font-medium">{item.name}</span>
            </a>
          ))}
        </div>
      )}
    </div>
  );
};

export default HamburgerMenu;
