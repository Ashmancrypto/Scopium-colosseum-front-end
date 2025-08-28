import React from "react";
import { useTheme } from "../../contexts/ThemeContext.jsx";

const AdvertisingBanner = () => {
  const { isDark } = useTheme();

  return (
    <div className="max-w-7xl max-h-48 mx-auto">
      <div
        className={`w-full h-32 md:h-40 flex items-center justify-center transition-colors duration-300 ${
          isDark ? "bg-gray-800" : "bg-gray-300"
        }`}
      >
        <div className="text-center">
          <p
            className={`text-lg md:text-xl font-medium ${
              isDark ? "text-gray-300" : "text-gray-600"
            }`}
          >
            Advertising
          </p>
          <p
            className={`text-sm md:text-base mt-2 ${
              isDark ? "text-gray-400" : "text-gray-500"
            }`}
          >
            Promote your tokens, businesses, or events here
          </p>
        </div>
      </div>
    </div>
  );
};

export default AdvertisingBanner;
