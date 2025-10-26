import { axiosPrivate } from "../axiosPrivate";
import { axiosPublic } from "../axiosPublic";

export const fetchPosts = async (username) => {
  const { data } = await axiosPublic.get(`/streamer/${encodeURIComponent(username)}/posts`);
  return data;
};

export const createPost = async (payload) => {
  const { data } = await axiosPrivate.post("/streamer/posts", payload);
  return data;
};

export const updatePost = async (postId, payload) => {
  const { data } = await axiosPrivate.put(`/streamer/posts/${postId}`, payload);
  return data;
};

export const deletePost = async (postId) => {
  await axiosPrivate.delete(`/streamer/posts/${postId}`);
};

export const fetchVideos = async (username) => {
  const { data } = await axiosPublic.get(`/streamer/${encodeURIComponent(username)}/videos`);
  return data;
};

export const createVideo = async (payload) => {
  const { data } = await axiosPrivate.post("/streamer/videos", payload);
  return data;
};

export const updateVideo = async (videoId, payload) => {
  const { data } = await axiosPrivate.put(`/streamer/videos/${videoId}`, payload);
  return data;
};

export const deleteVideo = async (videoId) => {
  await axiosPrivate.delete(`/streamer/videos/${videoId}`);
};

export const fetchBanner = async (tokenAddress) => {
  const { data } = await axiosPublic.get(`/assets/banner/${encodeURIComponent(tokenAddress)}`);
  return data;
};

export const uploadBanner = async (tokenAddress, file) => {
  const formData = new FormData();
  formData.append("banner", file);
  const { data } = await axiosPrivate.post(`/assets/banner?tokenAddress=${encodeURIComponent(tokenAddress)}`, formData, {
    headers: { "Content-Type": "multipart/form-data" }
  });
  return data;
};

export const deleteBanner = async (tokenAddress) => {
  await axiosPrivate.delete(`/assets/banner/${encodeURIComponent(tokenAddress)}`);
};
