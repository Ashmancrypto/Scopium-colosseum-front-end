import React from "react";
import Header from "../components/Header.jsx";
import { useTheme } from "../contexts/ThemeContext.jsx";
import { Link } from "react-router-dom";

const NotFoundPage = () => {
  const { isDark } = useTheme();

  return (
    <div
      className={`flex flex-col min-h-screen ${
        isDark ? "bg-neutral-950" : "bg-[#EBEBEB]"
      }`}
    >
      {/* Header at the top */}
      <Header />

      {/* 404 Content */}
      <div className="flex-1 flex flex-col items-center justify-center px-4">
        <div className="text-center max-w-md">
          {/* Scopium Logo/Icon */}
          <div className="mb-8">
            <img
              src={isDark ? "/images/Logo-dark.png" : "/images/Logo.png"}
              alt="Scopium Logo"
              className="h-20 w-auto mx-auto opacity-60"
            />
          </div>

          {/* 404 Text */}
          <h1
            className={`text-6xl font-bold mb-4 ${
              isDark ? "text-green-400" : "text-pink-500"
            }`}
          >
            404
          </h1>

          <h2
            className={`text-2xl font-semibold mb-6 ${
              isDark ? "text-white" : "text-gray-900"
            }`}
          >
            Page Not Found
          </h2>

          <p
            className={`text-lg mb-8 ${
              isDark ? "text-gray-400" : "text-gray-600"
            }`}
          >
            Sorry, the page you're looking for doesn't exist yet.
          </p>

          {/* Back to Home Button */}
          <Link
            to="/"
            className={`inline-flex items-center px-6 py-3 rounded-lg font-medium transition-colors duration-200 ${
              isDark
                ? "bg-green-500 hover:bg-green-600 text-black"
                : "bg-pink-500 hover:bg-pink-600 text-white"
            }`}
          >
            Back to Home
          </Link>
        </div>

        {/* Decorative Scopium Pattern */}
        <div className="absolute bottom-0 left-0 w-full overflow-hidden opacity-20">
          <svg
            viewBox="0 0 1200 120"
            className={`w-full h-32 ${
              isDark ? "text-green-500/20" : "text-pink-500/20"
            }`}
            fill="currentColor"
          >
            <path d="M0,32L40,37.3C80,43,160,53,240,69.3C320,85,400,107,480,112C560,117,640,107,720,90.7C800,75,880,53,960,42.7C1040,32,1120,32,1160,32L1200,32L1200,120L1160,120C1120,120,1040,120,960,120C880,120,800,120,720,120C640,120,560,120,480,120C400,120,320,120,240,120C160,120,80,120,40,120L0,120Z" />
          </svg>
        </div>
      </div>
    </div>
  );
};

export default NotFoundPage;
