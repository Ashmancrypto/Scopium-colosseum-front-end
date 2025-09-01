import React from "react";
import { Play, ChevronLeft, ChevronRight } from "lucide-react";
import { useTheme } from "../../contexts/ThemeContext.jsx";
import { FollowButton, EyeFilled } from "../ui/index.js";
import { useEffect, useRef, useState } from "react";
import Hls from "hls.js";

const StreamPlayer = ({ stream }) => {
  const { isDark } = useTheme();
  const videoRef = useRef(null);
  const hlsRef = useRef(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [viewerSession, setViewerSession] = useState(null);
  const [sessionId, setSessionId] = useState(null);
  const [currentViewers, setCurrentViewers] = useState(
    stream?.viewer_count || 0
  );
  const [availableStreams, setAvailableStreams] = useState([]);

  // session ID
  useEffect(() => {
    let storedSessionId = localStorage.getItem("viewer_session_id");
    if (!storedSessionId) {
      storedSessionId = `viewer_${Date.now()}_${Math.random()
        .toString(36)
        .substr(2, 9)}`;
      localStorage.setItem("viewer_session_id", storedSessionId);
    }
    setSessionId(storedSessionId);
  }, []);

  // Join stream when component mounts and session ID is ready
  useEffect(() => {
    if (!stream || !sessionId || !stream.is_live) return;

    const joinStream = async () => {
      try {
        const response = await fetch(
          "https://api.scopium.fun/api/streams/join/",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              stream_id: stream.id,
              session_id: sessionId,
            }),
          }
        );

        if (response.ok) {
          const data = await response.json();
          setViewerSession(data);
          console.log("Joined stream:", data);
        } else {
          console.error("Failed to join stream:", response.statusText);
        }
      } catch (error) {
        console.error("Error joining stream:", error);
      }
    };

    joinStream();

    // Leave stream when component unmounts
    return () => {
      if (viewerSession && sessionId) {
        fetch("https://api.scopium.fun/api/streams/leave/", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            stream_id: stream.id,
            session_id: sessionId,
          }),
        }).catch(console.error);
      }
    };
  }, [stream, sessionId]);

  // Poll for viewer count updates
  useEffect(() => {
    if (!stream) return;

    const pollViewerCount = async () => {
      try {
        const response = await fetch(
          `https://api.scopium.fun/api/streams/${stream.id}/viewers/`,
          {
            headers: {
              "Cache-Control": "no-cache",
            },
          }
        );
        if (response.ok) {
          const data = await response.json();
          setCurrentViewers(data.current_viewer_count);
        }
      } catch (error) {
        console.error("Error fetching viewer count:", error);
      }
    };

    const interval = setInterval(pollViewerCount, 15000);
    pollViewerCount();

    return () => clearInterval(interval);
  }, [stream]);

  useEffect(() => {
    // Only run HLS logic if we have a valid stream with proper data
    if (!stream || !videoRef.current || !stream.stream_key || !stream.is_live) {
      setIsLoading(false);
      setError(null);
      return;
    }

    setIsLoading(true);
    setError(null);

    const video = videoRef.current;
    const hlsUrl = `https://streamer.scopium.fun/hls/${stream.stream_key}/index.m3u8`;

    if (Hls.isSupported()) {
      // Use HLS.js for browsers that don't natively support HLS
      const hls = new Hls({
        enableWorker: false,
        lowLatencyMode: true,
        backBufferLength: 90,
      });

      hlsRef.current = hls;

      hls.loadSource(hlsUrl);
      hls.attachMedia(video);

      hls.on(Hls.Events.MANIFEST_PARSED, () => {
        setIsLoading(false);
        video.play().catch(console.error);
      });

      hls.on(Hls.Events.ERROR, (event, data) => {
        console.error("HLS Error:", data);
        if (data.fatal) {
          setError("Failed to load stream");
          setIsLoading(false);
        }
      });
    } else if (video.canPlayType("application/vnd.apple.mpegurl")) {
      // Native HLS support (Safari)
      video.src = hlsUrl;
      video.addEventListener("loadedmetadata", () => {
        setIsLoading(false);
        video.play().catch(console.error);
      });

      video.addEventListener("error", () => {
        setError("Failed to load stream");
        setIsLoading(false);
      });
    } else {
      setError("HLS is not supported in this browser");
      setIsLoading(false);
    }

    return () => {
      if (hlsRef.current) {
        hlsRef.current.destroy();
        hlsRef.current = null;
      }
    };
  }, [stream]);

  // Periodic check for available streams every 2.5 minutes
  useEffect(() => {
    const checkForStreams = async () => {
      try {
        const response = await fetch(
          "https://api.scopium.fun/api/streams/live/",
          {
            headers: {
              "Cache-Control": "no-cache",
            },
          }
        );
        if (response.ok) {
          const data = await response.json();
          setAvailableStreams(data.streams || []);
          console.log(
            "Available streams check:",
            data.streams?.length || 0,
            "streams found"
          );
        }
      } catch (error) {
        console.log(
          "No streams available or error checking streams:",
          error.message
        );
        setAvailableStreams([]);
      }
    };

    // Check immediately
    checkForStreams();

    // Then check every 2.5 minutes (150000ms)
    const streamCheckInterval = setInterval(checkForStreams, 150000);

    return () => clearInterval(streamCheckInterval);
  }, []);

  if (!stream) {
    return null;
  }

  // is_live property from the API

  return (
    <div className="relative w-full h-fit max-h-[800px] mx-auto">
      {/* Main Stream Container */}
      <div className={`relative rounded-2xl md:rounded-none overflow-hidden`}>
        {/* Stream Video Area */}
        <div className={`${stream.is_live ? "bg-white" : ""} overflow-hidden`}>
          <div className="relative">
            {/* Video/Stream Container */}
            <div
              className="w-full relative aspect-video  group cursor-pointer"
              style={{ height: "70vh" }}
            >
              {stream.is_live ? (
                <>
                  <video
                    ref={videoRef}
                    className="w-full h-full"
                    controls
                    muted
                    playsInline
                    style={{ display: error ? "none" : "block" }}
                  />
                  {isLoading && (
                    <div className="loading-overlay">
                      <p>Loading stream...</p>
                    </div>
                  )}

                  {error && (
                    <div className="error-overlay">
                      <p>⚠️ {error}</p>
                      <p>Make sure the stream is live and try refreshing</p>
                    </div>
                  )}
                </>
              ) : (
                <div className="w-full h-full bg-gradient-to-br from-gray-800 to-gray-900 flex items-center justify-center">
                  <div className="text-center text-white space-y-4">
                    <div className="w-24 h-24 mx-auto bg-gray-700 rounded-full flex items-center justify-center mb-6">
                      <svg
                        className="w-12 h-12 text-gray-400"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"
                        />
                      </svg>
                    </div>
                    <h3 className="text-2xl font-bold">No Live Stream</h3>
                    <p className="text-gray-300">
                      No streams are currently live
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Live indicator */}
          <div className="absolute top-10 left-10 bg-gray-200/10 text-white px-4 py-2 rounded-lg text-xs font-semibold flex items-center space-x-1">
            <div
              className={`w-2 h-2 rounded-full ${
                stream.is_live ? "bg-red-600 animate-pulse" : "bg-gray-500"
              }`}
            ></div>
            <span>{stream.is_live ? "LIVE" : "OFFLINE"}</span>
          </div>

          {/* Navigation Arrows */}
          {/* <button className="absolute left-2 top-1/2 -translate-y-1/2 w-10 h-10 bg-black/30 hover:bg-black/50 backdrop-blur-sm rounded-full flex items-center justify-center text-white transition-all">
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button className="absolute right-2 top-1/2 -translate-y-1/2 w-10 h-10 bg-black/30 hover:bg-black/50 backdrop-blur-sm rounded-full flex items-center justify-center text-white transition-all">
            <ChevronRight className="w-5 h-5" />
          </button> */}

          {/* Play Button Overlay */}
          {/* <div className="absolute inset-0 flex items-center justify-center">
            <button className="w-16 h-16 bg-white/20 hover:bg-white/30 backdrop-blur-sm rounded-full flex items-center justify-center text-white transition-all transform hover:scale-110">
              <Play className="w-8 h-8 ml-1" fill="currentColor" />
            </button>
          </div> */}

          {/* Stream Info */}
          <div className="absolute bottom-0 left-0 right-0 px-10 pb-10 pt-0 bg-transparent">
            {/* Top line: Left group + View count */}
            <div className="flex justify-between items-center mb-2">
              {/* Left group: avatar + username/followers + follow button */}
              <div className="flex items-center space-x-4">
                <div className="relative">
                  {stream.is_live ? (
                    <img
                      src={stream.avatar}
                      alt={stream.username}
                      className="w-9 h-9 rounded-full object-cover"
                    />
                  ) : (
                    <div className="w-9 h-9 rounded-full bg-gray-600 flex items-center justify-center">
                      <svg
                        className="w-5 h-5 text-gray-400"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                        />
                      </svg>
                    </div>
                  )}
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
                <span>{currentViewers}</span>
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
                <span
                  className={`px-2 py-1.5 rounded-lg text-xs text-white font-medium bg-gray-200/10`}
                >
                  {stream.category}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StreamPlayer;
