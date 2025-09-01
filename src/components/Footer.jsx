import { useState } from 'react';
import { useTheme } from '../contexts/ThemeContext.jsx';
import { useNavigate } from 'react-router-dom';



const Footer = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const { isDark } = useTheme();
  const navigateTo = useNavigate();
  

  

  const social = [
    { name: 'Twitter', icon: '/images/icons/X-twitter.png', url: '#' },
    { name: 'Discord', icon: '/images/icons/discord.png', url: '#' },
    { name: 'Telegram', icon: '/images/icons/Telegram.png', url: '#' },
    { name: 'Threads', icon: '/images/icons/threads.png', url: '#' },
  ];

  const navigate = [
    { name: 'About Us', url: '#' },
    { name: 'Our Team', url: '#' },
    { name: 'Careers', url: '#' },
    { name: 'News', url: '#' },
  ];

  const legal = [
    { name: 'Features', url: '#' },
    { name: 'Pricing', url: '#' },
    { name: 'Enterprise', url: '#' },
    { name: 'API', url: '#' },
  ];

  const contact = [
    { name: 'Help Center', url: '#' },
    { name: 'Contact', url: '#' },
    { name: 'Privacy Policy', url: '/privacy', isRoute: true  },
    { name: 'Terms of Service', url: '/terms-of-service', isRoute: true }
  ];

  const handleLogoClick = () => {
    navigateTo('/');
    setIsMobileMenuOpen(false);
  };

  return (
    <footer className={`bottom-0 left-0 right-0  border-gray-200 shadow-lg z-40 ${isDark ? 'border-black bg-black' : 'bg-white'}`}>
      {/* Expanded Content */}
      <div
        className={`transition-all duration-300 ease-in-out overflow-hidden ${
          isExpanded ? 'max-h-64' : 'max-h-0'
        }`}
      >
        <div className={`px-64 py-8  relative ${isDark ? 'border-black bg-black' : 'bg-white'}`}>
          <div className="grid grid-cols-1 md:grid-cols-6 gap-10">
            {/* Column 1: Logo */}
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <img
                src={`${isDark? '/images/Logo-dark.png' :'/images/Logo.png'}`}
                alt="Scopium"
                className="h-8 w-auto cursor-pointer hover:opacity-80 transition-opacity duration-200"
                onClick={handleLogoClick}
                />
              </div>
            </div>

            {/* Column 2: Company Links */}
            <div>
              <h4 className={`text-sm font-semibold ${ isDark ? 'text-gray-50' : 'text-gray-900'} mb-3`}>Navigate</h4>
              <div className="space-y-2">
                {navigate.map((link, index) => (
                  <a
                    key={index}
                    href={link.url}
                    className={`block text-xs text-gray-600 ${isDark ?'hover:text-green-600':'hover:text-pink-600'} transition-colors duration-200`}
                  >
                    {link.name}
                  </a>
                ))}
              </div>
            </div>

            {/* Column 3: Product Links */}
            <div>
              <h4 className={`text-sm font-semibold ${ isDark ? 'text-gray-50' : 'text-gray-900'} mb-3`}>Legal</h4>
              <div className="space-y-2">
                {legal.map((link, index) => (
                  <a
                    key={index}
                    href={link.url}
                    className={`block text-xs text-gray-600 ${isDark ?'hover:text-green-600':'hover:text-pink-600'} transition-colors duration-200`}
                  >
                    {link.name}
                  </a>
                ))}
              </div>
            </div>

            {/* Column 4: Support Links */}
            <div>
              <h4 className={`text-sm font-semibold ${ isDark ? 'text-gray-50' : 'text-gray-900'} mb-3`}>Contact
              </h4>
              <div className="space-y-2">
                {contact.map((link, index) => (
                  <a
                    key={index}
                    href={link.url}
                    className={`block text-xs text-gray-600 ${isDark ?'hover:text-green-600':'hover:text-pink-600'} transition-colors duration-200`}
                  >
                    {link.name}
                  </a>
                ))}
              </div>
            </div>

            {/* Column 5: Social Links in Square Grid */}
            <div>
              <h4 className={`text-sm font-semibold ${ isDark ? 'text-gray-50' : 'text-gray-900'} mb-3`}>Social Links</h4>
              <div className="grid grid-cols-2 gap-2 w-fit">
                {social.map((social, index) => (
                  <a
                    key={index}
                    href={social.url}
                    className="w-10 h-10 rounded-lg flex items-center justify-center transition-colors duration-200"
                    title={social.name}
                  >
                    <img src={social.icon} alt="" className='h-4 w-4'/>
                  </a>
                ))}
              </div>
            </div>
            <div>
              {/* Collapse Button in Expanded View */}
              <button
                onClick={() => setIsExpanded(false)}
                className="hover:bg-gray-200 rounded-full transition-all duration-200"
                title="Collapse footer"
              >
                <img src="/images/icons/footer-collapse-button.png" alt="" className='w-4 h-2'/>
              </button>
            </div>
          </div>


        </div>
      </div>

      {/* Main Footer Bar - Only show when collapsed */}
      {!isExpanded && (
        <div className="px-24 py-4">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <div className="flex items-center space-x-3">
              <img
                src={`${isDark? '/images/Logo-dark.png' :'/images/Logo.png'}`}
                alt="Scopium"
                className="h-8 w-auto cursor-pointer hover:opacity-80 transition-opacity duration-200"
                onClick={handleLogoClick}
              />
            </div>

            {/* Social Links */}
            <div className="flex items-center space-x-2 pl-32">
              {social.slice(0, 4).map((social, index) => (
                <button
                  key={index}
                  className="p-2 hover:bg-gray-100 rounded-full transition-colors duration-200"
                  title={social.name}
                >
                  <img src={social.icon} alt="" className='w-4 h-4'/>
                </button>
              ))}
              <button
                onClick={() => setIsExpanded(true)}
                className="p-2 hover:bg-gray-100 rounded-full transition-all duration-200"
                title="Expand footer"
              >
                <img src="/images/icons/footer-expand-button.png" alt="" className='w-4 h-2' />
              </button>
            </div>

            {/* Copyright & Expand Button */}
            <div className="flex items-center space-x-4">
              <span className="text-xs text-gray-500 hidden md:block">
                © 2025 Scopium. All rights reserved.
              </span>

            </div>
          </div>
        </div>
      )}
    </footer>
  );
};

export default Footer;
