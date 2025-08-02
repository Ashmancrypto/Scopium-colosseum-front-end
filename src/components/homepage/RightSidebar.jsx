import React from 'react';
import { Plus } from 'lucide-react';
import { useTheme } from '../../contexts/ThemeContext.jsx';

const RightSidebar = ({ livestreamers = [], tokens = [] }) => {
  const { isDark } = useTheme();

  // Fix duplicate IDs in mock data
  const mockLivestreamers = [
    { id: 1, username: 'streamer1', avatar: '/images/sample/savatar1.png' },
    { id: 2, username: 'streamer2', avatar: '/images/sample/savatar2.png' },
    { id: 3, username: 'streamer3', avatar: '/images/sample/savatar3.png' },
    { id: 4, username: 'streamer4', avatar: '/images/sample/savatar4.png' },
    { id: 5, username: 'streamer5', avatar: '/images/sample/savatar5.png' },
    { id: 6, username: 'streamer6', avatar: '/images/sample/savatar1.png' },
    { id: 7, username: 'streamer7', avatar: '/images/sample/savatar2.png' },
  ];

  const displayLivestreamers = livestreamers.length > 0 ? livestreamers : mockLivestreamers;

  return (
    <div className={`w-16 backdrop-blur-md transition-colors duration-300 flex flex-col ${
      isDark ? 'bg-green-500/50' : 'bg-pink-500/20'
    }`}>
      {/* Collapse Button */}
      <div className="flex justify-center py-2">
        <button className={`p-1 rounded-lg transition-colors ${
          isDark ? 'hover:bg-green-500/30' : 'hover:bg-pink-500/30'
        }`}>
          <img src="/images/icons/expand.png" alt="Expand" className="w-4 h-4" />
        </button>
      </div>

      {/* Top Half - Livestreamers */}
      <div className="flex-1 flex flex-col min-h-0">
        <div className="flex-1 overflow-y-auto scrollbar-hide py-2">
          <div className="space-y-2 px-2">
            {displayLivestreamers.map((streamer) => (
              <div key={streamer.id || streamer.username} className="relative group cursor-pointer" title={streamer.username}>
                <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-white/20 hover:border-white/40 transition-colors">
                  <img src={streamer.avatar} alt={streamer.username} className="w-full h-full object-cover" />
                </div>
                {/* Live indicator */}
                <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-red-500 border-2 border-white rounded-full"></div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Divider */}
      <div className="h-[2px] w-8 bg-[#0A0A0A99] mx-auto my-2 rounded"></div>

      {/* Bottom Half - Tokens */}
      <div className="flex-1 flex flex-col min-h-0">
        <div className="flex-1 overflow-y-auto scrollbar-hide py-2">
          <div className="space-y-2 px-2">
            {tokens.map((token) => (
              <div key={token.tokenId || token.address || token.id} className="cursor-pointer group" title={token.name}>
                <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-white/20 hover:border-white/40 transition-colors bg-gradient-to-br from-pink-500 to-violet-500 flex items-center justify-center">
                  <img
                    src={token.logo}
                    alt={token.name}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.target.style.display = 'none';
                      e.target.nextSibling.style.display = 'flex';
                    }}
                  />
                  <span
                    className="text-white font-bold text-xs items-center justify-center w-full h-full"
                    style={{ display: 'none' }}
                  >
                    {token.name?.charAt(0) || 'T'}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Add Button */}
        <div className="p-2">
          <button className="w-10 h-10 rounded-full bg-white flex items-center justify-center">
            <Plus className="w-5 h-5 text-black" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default RightSidebar;
