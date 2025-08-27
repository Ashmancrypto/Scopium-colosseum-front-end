import React from 'react';
import { StreamPlayer } from './index.js';
import { useTheme } from '../../contexts/ThemeContext.jsx';

const HeroLiveStream = () => {
  const { isDark } = useTheme();

  // Mock data for the main live stream
  const mainStream = {
    id: 1,
    title: "Stream title - Live NFT Reveal: Let's See What We Pulled",
    username: "Username",
    followers: "225k followers",
    avatar: "/images/comingSoon.png",
    thumbnail: "/images/sample/sample3.png",
    viewCount: "9.3k",
    isLive: true,
    categories: ["Category tag", "Category tag"]
  };

  return (
    <div className="pt-20 md:pt-40 px-4 md:px-0 lg:pt-40">
      <div className="max-w-7xl mx-auto">
        <StreamPlayer stream={mainStream} />
      </div>
    </div>
  );
};

export default HeroLiveStream;