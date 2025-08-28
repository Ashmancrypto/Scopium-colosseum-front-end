import React from "react";
import { Play, ChevronLeft, ChevronRight } from "lucide-react";
import { useTheme } from "../../contexts/ThemeContext.jsx";
import { FollowButton, EyeFilled } from "../ui/index.js";

const StreamPlayer = ({ stream }) => {
  const { isDark } = useTheme();

  return (
    <div className="relative w-full h-fit max-h-[800px] mx-auto">
      {/* Main Stream Container */}
      <div className={`relative rounded-2xl md:rounded-none overflow-hidden`}>
        {/* Stream Video Area */}
        <div className="relative aspect-video">
          <img
            src={stream.thumbnail}
            alt={stream.title}
            className="w-full h-full object-cover"
          />

          {/* Live Badge */}
          <div className="absolute top-10 left-10 bg-gray-200/10 text-white px-4 py-2 rounded-lg text-xs font-semibold flex items-center space-x-1">
            <div className="w-2 h-2 bg-red-600 rounded-full animate-pulse"></div>
            <span>LIVE</span>
          </div>

          {/* Navigation Arrows */}
          <button className="absolute left-2 top-1/2 -translate-y-1/2 w-10 h-10 bg-black/30 hover:bg-black/50 backdrop-blur-sm rounded-full flex items-center justify-center text-white transition-all">
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button className="absolute right-2 top-1/2 -translate-y-1/2 w-10 h-10 bg-black/30 hover:bg-black/50 backdrop-blur-sm rounded-full flex items-center justify-center text-white transition-all">
            <ChevronRight className="w-5 h-5" />
          </button>

          {/* Play Button Overlay */}
          <div className="absolute inset-0 flex items-center justify-center">
            <button className="w-16 h-16 bg-white/20 hover:bg-white/30 backdrop-blur-sm rounded-full flex items-center justify-center text-white transition-all transform hover:scale-110">
              <Play className="w-8 h-8 ml-1" fill="currentColor" />
            </button>
          </div>

          {/* Stream Info */}
          <div className="absolute bottom-0 left-0 right-0 px-10 pb-10 pt-0 bg-transparent">
            {/* Top line: Left group + View count */}
            <div className="flex justify-between items-center mb-2">
              {/* Left group: avatar + username/followers + follow button */}
              <div className="flex items-center space-x-4">
                <div className="relative">
                  <img
                    src={stream.avatar}
                    alt={stream.username}
                    className="w-9 h-9 rounded-full object-cover"
                  />
                </div>

                <div className="flex items-center space-x-3">
                  <div className="space-y-1">
                    <div className={`text-sm font-regular text-white`}>
                      {stream.username}
                    </div>
                    <div
                      className={`text-xs font-regular text-white opacity-60`}
                    >
                      {stream.followers}
                    </div>
                  </div>

                  {/* Follow Button next to username */}
                  <FollowButton size="md">Follow</FollowButton>
                </div>
              </div>

              {/* View count box */}
              <div className="flex items-center space-x-1 bg-gray-200/10 backdrop-blur-sm text-white px-2 py-1.5 rounded-lg text-xs">
                <span>{stream.viewCount}</span>
                <EyeFilled className="w-4 h-4" />
              </div>
            </div>

            {/* Bottom line: Stream title + Categories */}
            <div className="flex justify-between items-center">
              {/* Stream Title */}
              <h1 className={`text-2xl font-bold text-white`}>
                {stream.title}
              </h1>

              {/* Categories */}
              <div className="flex flex-wrap gap-2 justify-end">
                {stream.categories.map((category, index) => (
                  <span
                    key={index}
                    className={`px-2 py-1.5 rounded-lg text-xs text-white font-medium bg-gray-200/10`}
                  >
                    {category}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StreamPlayer;
