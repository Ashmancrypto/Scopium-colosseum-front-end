import React from "react";
import PostCard from "./PostCard";
import { div } from "motion/react-client";
import { useTheme } from "../../contexts/ThemeContext";

const PostsTab = () => {
  const { isDark } = useTheme();
  // Always show mockup data for streamer profile pages - Does not have API call for streamer posts yet
  const isMockup = true;

  const posts = [
    {
      id: 1,
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam tortor turpis, consequat vel nibh at, maximus rhoncus lacus.",
      image: "/images/sample/sample1.png",
      likes: 100,
      comments: 100,
      shares: 100,
      createdAt: "2021-01-01",
      updatedAt: "2021-01-01",
      avatar: "/images/sample/sample1.png",
      username: "John Doe",
    },
    {
      id: 2,
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam tortor turpis, consequat vel nibh at, maximus rhoncus lacus.",
      image: "/images/sample/sample1.png",
      likes: 100,
      comments: 100,
      shares: 100,
      createdAt: "2021-01-01",
      updatedAt: "2021-01-01",
      avatar: "/images/sample/sample1.png",
      username: "John Doe",
    },
    {
      id: 3,
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam tortor turpis, consequat vel nibh at, maximus rhoncus lacus.",
      image: "/images/sample/sample1.png",
      likes: 100,
      comments: 100,
      shares: 100,
      createdAt: "2021-01-01",
      updatedAt: "2021-01-01",
      avatar: "/images/sample/sample1.png",
      username: "John Doe",
    },
    {
      id: 4,
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam tortor turpis, consequat vel nibh at, maximus rhoncus lacus.",
      image: "/images/sample/sample1.png",
      likes: 100,
      comments: 100,
      shares: 100,
      createdAt: "2021-01-01",
      updatedAt: "2021-01-01",
      avatar: "/images/sample/sample1.png",
      username: "John Doe",
    },
  ];
  if (!isMockup) {
    return (
      <div className="pt-5 w-full flex flex-col gap-4 items-start">
        <div className="text-center py-12 mx-5 w-full">
          <div
            className={`w-12 h-12 mx-auto mb-4 rounded-full flex items-center justify-center ${
              isDark ? "text-gray-400" : "text-gray-500"
            }`}
          >
            <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
            </svg>
          </div>
          <p
            className={`text-lg mb-2 ${
              isDark ? "text-gray-300" : "text-gray-700"
            }`}
          >
            No posts yet
          </p>
          <p
            className={`text-sm ${isDark ? "text-gray-400" : "text-gray-600"}`}
          >
            Check back later for posts!
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-5 w-full flex flex-col gap-4 items-start">
      {posts.map((post) => (
        <div className="max-w-[550px] w-full px-4 sm:px-0">
          <PostCard key={post.id} post={post} />
          <div className="h-[20px]" />
        </div>
      ))}
    </div>
  );
};

export default PostsTab;
