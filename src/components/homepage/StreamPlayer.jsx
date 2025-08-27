import React from 'react';
import { Play, Eye, ChevronLeft, ChevronRight } from 'lucide-react';
import { useTheme } from '../../contexts/ThemeContext.jsx';
import { PinkGradientButton } from '../ui/index.js';

const StreamPlayer = ({ stream }) => {
  const { isDark } = useTheme();

  return (
    <div className="relative w-full mx-auto">
      {/* Main Stream Container */}
      <div className={`relative rounded-2xl md:rounded-none overflow-hidden shadow-2xl ${
        isDark ? 'bg-gray-900' : 'bg-white'
      }`}>
        {/* Stream Video Area */}
        <div className="relative aspect-video bg-gradient-to-br from-purple-600 to-pink-600">
          <img 
            src={stream.thumbnail} 
            alt={stream.title}
            className="w-full h-full object-cover"
          />

          {/* Live Badge */}
          <div className="absolute top-4 left-4 bg-red-500 text-white px-3 py-1 rounded-full text-sm font-semibold flex items-center space-x-1">
            <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
            <span>LIVE</span>
          </div>

          {/* Navigation Arrows */}
          <button className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-black/30 hover:bg-black/50 backdrop-blur-sm rounded-full flex items-center justify-center text-white transition-all">
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-black/30 hover:bg-black/50 backdrop-blur-sm rounded-full flex items-center justify-center text-white transition-all">
            <ChevronRight className="w-5 h-5" />
          </button>

          {/* Play Button Overlay */}
          <div className="absolute inset-0 flex items-center justify-center">
            <button className="w-16 h-16 bg-white/20 hover:bg-white/30 backdrop-blur-sm rounded-full flex items-center justify-center text-white transition-all transform hover:scale-110">
              <Play className="w-8 h-8 ml-1" fill="currentColor" />
            </button>
          </div>
        </div>

        {/* Stream Info */}
        <div className="p-6">
          <div className="flex justify-between items-start flex-wrap">
            {/* Left group: avatar + username/followers + follow button */}
            <div className="flex items-center space-x-4 flex-wrap">
              <div className="relative">
                <img 
                  src={stream.avatar} 
                  alt={stream.username}
                  className="w-12 h-12 rounded-full object-cover"
                />
                <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 border-2 border-white rounded-full"></div>
              </div>

              <div className="flex items-center space-x-3">
                <div>
                  <div className={`text-sm font-medium ${
                    isDark ? 'text-white' : 'text-gray-900'
                  }`}>
                    {stream.username}
                  </div>
                  <div className={`text-xs ${
                    isDark ? 'text-gray-400' : 'text-gray-600'
                  }`}>
                    {stream.followers}
                  </div>
                </div>

                {/* Follow Button next to username */}
                <PinkGradientButton size="sm">
                  Follow
                </PinkGradientButton>
              </div>
            </div>

            {/* Right group: view count + categories below */}
            <div className="flex flex-col items-end space-y-2 mt-2 sm:mt-0">
              <div className="flex items-center space-x-1 bg-black/50 backdrop-blur-sm text-white px-3 py-1 rounded-full text-sm">
                <Eye className="w-4 h-4" />
                <span>{stream.viewCount}</span>
              </div>
              <div className="flex flex-wrap gap-2 justify-end">
                {stream.categories.map((category, index) => (
                  <span 
                    key={index}
                    className={`px-3 py-1 rounded-full text-xs font-medium ${
                      isDark 
                        ? 'bg-gray-700 text-gray-300' 
                        : 'bg-gray-200 text-gray-700'
                    }`}
                  >
                    {category}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Stream Title */}
          <h1 className={`text-xl font-bold ${
            isDark ? 'text-white' : 'text-gray-900'
          }`}>
            {stream.title}
          </h1>
        </div>
      </div>
    </div>
  );
};

export default StreamPlayer;
