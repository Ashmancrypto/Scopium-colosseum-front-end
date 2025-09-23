import { useState, useEffect } from "react";
import axios from "axios";

const API_BASE_URL = "https://api.scopium.fun";

export const useStreams = () => {
  const [streams, setStreams] = useState([]);
  const [loadingStreams, setLoadingStreams] = useState(true);
  const [errorStreams, setErrorStreams] = useState(null);

  const isMockup = import.meta.env.VITE_IS_MOCKUP === "true";
  const mockupStreams = [
    {
      id: 1,
      title: "Behind the Scenes: Creating a 1/1 NFT Art",
      username: "ArtByLuna",
      followers: "87.5k followers",
      avatar: "/images/sample/sample2.png",
      thumbnail: "/images/sample/sample2.png",
      viewCount: "3.1k",
      isLive: true,
    },
    {
      id: 2,
      title: "Top 10 NFT Drops This Week!",
      username: "PixelHunter",
      followers: "56k followers",
      avatar: "/images/sample/sample2.png",
      thumbnail: "/images/sample/sample2.png",
      viewCount: "2.7k",
      isLive: true,
    },
    {
      id: 3,
      title: "Unboxing Rare NFTs: What Did We Get?",
      username: "CryptoCollectorX",
      followers: "142k followers",
      avatar: "/images/sample/sample1.png",
      thumbnail: "/images/sample/sample1.png",
      viewCount: "6.8k",
      isLive: true,
    },
    {
      id: 4,
      title: "Live Mint Party: Join and Win Giveaways!",
      username: "NFT_Wizard",
      followers: "203k followers",
      avatar: "/images/sample/sample3.png",
      thumbnail: "/images/sample/sample3.png",
      viewCount: "12.4k",
      isLive: true,
    },
    {
      id: 5,
      title: "Q&A: Ask Me Anything About NFTs & Crypto",
      username: "BlockChainBabe",
      followers: "311k followers",
      avatar: "/images/sample/sample1.png",
      thumbnail: "/images/sample/sample1.png",
      viewCount: "15.9k",
      isLive: true,
    },
  ];

  const fetchStreams = async () => {
    try {
      setLoadingStreams(true);

      if (isMockup) {
        // Use mockup data when in mockup mode
        const response = await new Promise((resolve) =>
          setTimeout(() => {
            resolve(mockupStreams);
          }, 1000)
        );
        setStreams(response);
      } else {
        // Use real API data
        const response = await axios.get(`${API_BASE_URL}/api/streams/live/`);

        // Map API response to expected format
        const formattedStreams = response.data.map((stream) => ({
          id: stream.id,
          title: stream.title || "Untitled Stream",
          username:
            stream.streamer?.username ||
            stream.streamer_name ||
            "Unknown Streamer",
          followers: stream.streamer?.followers
            ? `${stream.streamer.followers} followers`
            : "0 followers",
          avatar:
            stream.streamer?.avatar ||
            stream.avatar ||
            "/images/sample/sample1.png",
          thumbnail: stream.thumbnail || "/images/sample/sample1.png",
          viewer_count: stream.viewer_count || 0,
          viewCount: stream.viewer_count || 0, // For backwards compatibility
          is_live: stream.is_live || false,
          isLive: stream.is_live || false, // For backwards compatibility
          stream_key: stream.stream_key,
          category: stream.category || "General",
        }));

        setStreams(formattedStreams);
      }

      setLoadingStreams(false);
      setErrorStreams(null);
    } catch (error) {
      console.error("Error fetching streams:", error);
      setErrorStreams(error);
      setLoadingStreams(false);
      // Fallback to empty array on error
      setStreams([]);
    }
  };

  useEffect(() => {
    fetchStreams();
  }, []);

  return { streams, loadingStreams, errorStreams };
};
