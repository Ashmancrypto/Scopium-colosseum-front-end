import React from 'react';
import { Check } from 'lucide-react';
import { useTheme } from '../../contexts/ThemeContext.jsx';

const MobileNetworkMenu = ({ 
  selectedNetwork, 
  onNetworkChange, 
  isVisible = false 
}) => {
  const { isDark } = useTheme();

  const networks = [
    {
      id: 'solana',
      name: 'Solana',
      icon: '/images/solana.svg',
      color: 'from-purple-500 to-blue-500',
      isActive: true
    },
    {
      id: 'ethereum',
      name: 'Ethereum',
      icon: '/images/ethereum.svg',
      color: 'from-blue-500 to-indigo-500',
      isActive: false
    },
    {
      id: 'sui',
      name: 'Sui',
      icon: '/images/sui.svg',
      color: 'from-blue-400 to-cyan-500',
      isActive: false
    }
  ];

  const handleNetworkSelect = (networkId) => {
    const network = networks.find(n => n.id === networkId);
    if (network?.isActive) {
      onNetworkChange(network.name);
    }
  };

  if (!isVisible) return null;

  return (
    <div className={`border-b pb-4 mb-4 transition-colors duration-300 ${
      isDark ? 'border-white/20' : 'border-gray-900/20'
    }`}>
      <div className="flex items-center justify-center space-x-4">
        {networks.map((network) => {
          const isSelected = selectedNetwork === network.name;
          const isDisabled = !network.isActive;
          
          return (
            <button
              key={network.id}
              onClick={() => handleNetworkSelect(network.id)}
              disabled={isDisabled}
              className={`relative flex items-center justify-center w-12 h-12 rounded-full transition-all duration-200 ${
                isSelected && !isDisabled
                  ? 'ring-2 ring-pink-400 ring-offset-2 ring-offset-transparent'
                  : ''
              } ${
                isDisabled
                  ? 'opacity-50 cursor-not-allowed'
                  : 'hover:scale-110'
              }`}
            >
              <div className={`w-10 h-10 rounded-full flex items-center justify-center bg-gradient-to-br ${network.color} ${
                isDisabled ? 'grayscale' : ''
              }`}>
                <img 
                  src={network.icon} 
                  alt={network.name} 
                  className="w-5 h-5 filter invert"
                />
              </div>
              
              {/* Selected indicator */}
              {isSelected && !isDisabled && (
                <div className="absolute -top-1 -right-1 w-5 h-5 bg-pink-400 rounded-full flex items-center justify-center">
                  <Check className="w-3 h-3 text-white" />
                </div>
              )}
              
              {/* Coming soon indicator for disabled networks */}
              {isDisabled && (
                <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2">
                  <div className={`text-xs px-1.5 py-0.5 rounded-full text-white bg-gray-500 whitespace-nowrap`}>
                    Soon
                  </div>
                </div>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default MobileNetworkMenu;