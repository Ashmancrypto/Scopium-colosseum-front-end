import React from 'react';
import { Eye, Play } from 'lucide-react';
import { useTheme } from '../../contexts/ThemeContext.jsx';

const LiveStreamCard = ({ stream }) => {
  const { isDark } = useTheme();

  return (
    <div className={`rounded-xl overflow-hidden shadow-lg transition-all duration-300 hover:scale-105 cursor-pointer ${
      isDark ? 'bg-gray-900' : 'bg-white'
    }`}>
      {/* Stream Thumbnail */}
      <div className="relative aspect-video bg-gradient-to-br from-purple-600 to-pink-600">
        <img 
          src={stream.thumbnail} 
          alt={stream.title}
          className="w-full h-full object-cover"
        />
        
        {/* Live Badge */}
        <div className="absolute top-3 left-3 bg-red-500 text-white px-2 py-1 rounded text-xs font-semibold flex items-center space-x-1">
          <div className="w-1.5 h-1.5 bg-white rounded-full animate-pulse"></div>
          <span>LIVE</span>
        </div>

        {/* View Count */}
        <div className="absolute top-3 right-3 bg-black/50 backdrop-blur-sm text-white px-2 py-1 rounded text-xs flex items-center space-x-1">
          <Eye className="w-3 h-3" />
          <span>{stream.viewCount}</span>
        </div>

        {/* Play Button Overlay */}
        <div className="absolute inset-0 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity bg-black/20">
          <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center text-white">
            <Play className="w-6 h-6 ml-0.5" fill="currentColor" />
          </div>
        </div>
      </div>

      {/* Stream Info */}
      <div className="p-4">
        <div className="flex items-start space-x-3">
          {/* Avatar */}
          <div className="relative flex-shrink-0">
            <img 
              src={stream.avatar} 
              alt={stream.username}
              className="w-10 h-10 rounded-full object-cover"
            />
            <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-500 border-2 border-white rounded-full"></div>
          </div>

          {/* Stream Details */}
          <div className="flex-1 min-w-0">
            <h3 className={`font-semibold text-sm mb-1 line-clamp-2 ${
              isDark ? 'text-white' : 'text-gray-900'
            }`}>
              {stream.title}
            </h3>
            
            <p className={`text-xs mb-1 ${
              isDark ? 'text-gray-300' : 'text-gray-600'
            }`}>
              {stream.username}
            </p>
            
            <p className={`text-xs ${
              isDark ? 'text-gray-400' : 'text-gray-500'
            }`}>
              {stream.followers}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LiveStreamCard;