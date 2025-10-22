import { axiosPrivate } from "../axiosPrivate";
import { axiosPublic } from "../axiosPublic";

export async function getProfileInfo(username) {
  const result = await axiosPublic.get(
    `/user/get_profile?username=${username}`
  );
  return result.data;
}

export async function updateProfile(formData) {
  const result = await axiosPrivate.post("/user/update_profile", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return result;
}

export async function checkUsernameAvailability(username) {
  const result = await axiosPublic.get(`/user/check_username?username=${encodeURIComponent(username)}`);
  return result.data?.available;
}

export async function getFollowings(userId) {
  const userIdStr = encodeURIComponent(JSON.stringify(userId));
  const result = await axiosPublic.get(
    `/user/get_followings?userId=${userIdStr}`
  );
  return result.data;
}

export async function setFollow(_id) {
  const result = await axiosPrivate.post(`/user/follow`, { followingId: _id });
  return result.data;
}

export async function setUnFollow(_id) {
  const result = await axiosPrivate.post(`/user/unfollow`, {
    followingId: _id,
  });
  return result.data;
}

export async function getFavoriteTokens(userId) {
  const userIdStr = encodeURIComponent(JSON.stringify(userId));
  const result = await axiosPublic.get(
    `/user/get_favoritetokens?userId=${userIdStr}`
  );
  return result.data;
}

export async function setFavor(tokenId) {
  const result = await axiosPrivate.post(`/user/favor`, { tokenId: tokenId });
  return result.data;
}

export async function setWatchList(tokenId) {
  const result = await axiosPrivate.post(`/user/watchlist`, {
    tokenId: tokenId,
  });
  return result.data;
}
