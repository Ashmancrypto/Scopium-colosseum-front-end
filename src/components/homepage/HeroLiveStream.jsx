import React from "react";
import { StreamPlayer } from "./index.js";
import { useTheme } from "../../contexts/ThemeContext.jsx";

const HeroLiveStream = ({ stream }) => {
  const { isDark } = useTheme();
  let passedStream;

  // Mock data for "no live stream" state - maintains same design with different content
  const noStreamData = {
    id: null,
    title: "No Active Stream",
    username: "No Streamer",
    followers: "0 followers",
    avatar: "/images/comingSoon.png",
    thumbnail: "/images/sample/sample3.png",
    viewer_count: 0,
    category: "General",
    is_live: false,
    stream_key: null,
  };

  if (stream && stream.is_live && stream.stream_key) {
    passedStream = stream;
  } else {
    passedStream = noStreamData;
  }
  return (
    <div className="px-4 md:px-0 py-4 md:py-0 ">
      <div className="max-w-7xl mx-auto">
        <StreamPlayer stream={passedStream} />
      </div>
    </div>
  );
};

export default HeroLiveStream;
