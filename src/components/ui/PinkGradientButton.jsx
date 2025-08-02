import React from 'react';
import { useTheme } from '../../contexts/ThemeContext.jsx';

const PinkGradientButton = ({ 
  children, 
  onClick, 
  disabled = false, 
  className = '', 
  type = 'button',
  size = 'md',
  variant = 'primary',
  ...props 
}) => {
  const { isDark } = useTheme();

  const sizeClasses = {
    sm: 'px-3 py-1.5 text-xs',
    md: 'px-4 py-2 text-sm',
    lg: 'px-6 py-3 text-base'
  };

  const variantClasses = {
    primary: isDark 
      ? 'bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700' 
      : 'bg-gradient-to-r from-pink-500 to-pink-600 hover:from-pink-600 hover:to-pink-700',
    secondary: isDark 
      ? 'bg-gradient-to-r from-green-400 to-green-500 hover:from-green-500 hover:to-green-600'
      : 'bg-gradient-to-r from-pink-400 to-pink-500 hover:from-pink-500 hover:to-pink-600'
  };

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`
        ${variantClasses[variant]}
        text-white font-medium rounded-xl
        transition-all duration-200 transform hover:scale-105
        disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none
        shadow-md hover:shadow-lg
        ${sizeClasses[size]}
        ${className}
      `}
      {...props}
    >
      {children}
    </button>
  );
};

export default PinkGradientButton;