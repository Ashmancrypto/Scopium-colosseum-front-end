import React from "react";
import { useTheme } from "../../contexts/ThemeContext.jsx";

const MainCtaButton = ({
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
    sm: "px-3 py-1.5 text-xs",
    md: "px-4 py-2 text-sm",
    lg: "px-6 py-3 text-base",
  };

  const buttonStyles = isDark
    ? "bg-green-500 hover:bg-green-400 active:bg-green-600"
    : "bg-pink-500 hover:bg-pink-400 active:bg-pink-600";

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`
        ${buttonStyles}
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

export default MainCtaButton;
