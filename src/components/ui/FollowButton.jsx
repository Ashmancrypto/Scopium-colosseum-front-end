import React from "react";
import { useTheme } from "../../contexts/ThemeContext.jsx";

const FollowButton = ({
  children,
  onClick,
  disabled = false,
  className = "",
  type = "button",
  size = "md",
  ...props
}) => {
  const { isDark } = useTheme();

  const sizeClasses = {
    sm: "px-2 py-1.5 text-xs",
    md: "px-3 py-2 text-sm",
    lg: "px-6 py-3 text-base",
  };

  const buttonStyles = isDark
    ? "border border-green-500 hover:bg-green-400 hover:text-white active:bg-green-600"
    : "border border-pink-500 hover:bg-pink-400 hover:text-white active:bg-pink-600";

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`
        ${buttonStyles}
        font-bold bg-gray-900/20 text-white rounded-[10px]
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

export default FollowButton;
