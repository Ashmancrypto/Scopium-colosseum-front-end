import bs58 from "bs58";
import { Keypair } from "@solana/web3.js";
import { axiosPrivate } from "../axiosPrivate"
import { axiosPublic } from "../axiosPublic"
import { BACKEND_URL } from "../../contexts/contractsOnSolana/contracts/constants";

export async function uploadMetadata(logoFile, metadata) {
  const formData = new FormData();
  formData.append('logo', logoFile);
  formData.append('metadata', metadata);
  
  const response = await fetch(`${BACKEND_URL}/api/token/upload_metadata`, {
    method: 'POST',
    body: formData
  });
  
  const data = await response.json();
  return { imageUrl: data.imageUrl, metadataUri: data.metadataUri };
}

export async function updateToken(name, ticker, desc, logo, banner, twitter, telegram, website, mintAddr, category) {
  const result = await axiosPrivate.post(`/token/update_token`, {
    name, ticker, desc, logo, banner, twitter, telegram, website, mintAddr, category
  });
  return result.data;
}

export async function findTokens(name, sort_condition, sort_order, nsfw, userId) {
  const result = await axiosPublic.get(`/token/find_tokens?name=${name}&sort_condition=${sort_condition.replace('sort: ', '')}&sort_order=${sort_order.replace('sort: ', '')}&include_nsfw=${nsfw}&userId=${userId}`)
  return result.data;
}

export async function getTrendingTokens(userId) {
  const result = await axiosPublic.get(`/token/get_trending_tokens?userId=${userId}`)
  return result.data;
}

export async function getKing() {
  const result = await axiosPublic.get('/token/get_king_of_the_hill')
  return result.data;
}

export async function getToken(mintAddr, userId) {
  const userIdStr = encodeURIComponent(JSON.stringify(userId))
  const result = await axiosPublic.get(`/token/get_token_info?mintAddr=${mintAddr}&userId=${userIdStr}`)
  return result.data;
}

export async function getThreadData(mintAddr, userId) {
  const userIdStr = encodeURIComponent(JSON.stringify(userId))
  const result = await axiosPublic.get(`/token/get_thread_data?mintAddr=${mintAddr}&userId=${userIdStr}`)
  return result.data;
}

export async function reply(mintAddr, comment, imageFile) {
  const formData = new FormData()
  formData.append('image', imageFile)
  formData.append('mintAddr', mintAddr)
  formData.append('comment', comment)

  const result = await axiosPrivate.post('/token/reply', formData)
  return result;
}

export async function likeReply(replyMentionId) {
  const result = await axiosPrivate.post('/token/reply_like', { replyMentionId })
  return result;
}

export async function dislikeReply(replyMentionId) {
  const result = await axiosPrivate.post('/token/reply_dislike', { replyMentionId })
  return result;
}

export async function mentionReply(replyMentionId, message, imageFile) {
  const formData = new FormData()
  formData.append('image', imageFile)
  formData.append('replyMentionId', replyMentionId)
  formData.append('message', message)

  const result = await axiosPrivate.post('/token/reply_mention', formData)
  return result;
}

export async function trade(mintAddr, isBuy, baseAmount, quoteAmount, txhash, comment) {
  const result = await axiosPrivate.post(`/token/trade`, {
    mintAddr, isBuy, baseAmount, quoteAmount, txhash, comment
  });
  return result.data;
}

export async function getTradeHistory(mintAddr) {
  const result = await axiosPublic.get(`/token/get_trade_hist?mintAddr=${mintAddr}`)
  return result.data;
}

export async function getTokenHolderDistribution(mintAddr, userId) {
  const userIdStr = encodeURIComponent(JSON.stringify(userId));
  const result = await axiosPublic.get(`/token/get_token_info?mintAddr=${mintAddr}&userId=${userIdStr}`);
  return result.data.tokenHolderDistribution;
}

export async function getMarketId(baseMint, quoteMint) {
  const result = await axiosPublic.get(`/token/get_marketid?baseMint=${baseMint}&quoteMint=${quoteMint}`)
  return result.data;
}

export async function getMintPair(category) {
  if (![1, 2, 3].includes(category)) {
    throw new Error(`Invalid category: ${category}`);
  }

  const result = await axiosPrivate.get(`/token/get_mint`, {
    params: { option: category }
  });

  const { mint } = result.data;

  if (!mint) {
    throw new Error("No secretKeyBase58 returned from backend.");
  }

  const mintBytes = bs58.decode(mint);

  if (mintBytes.length !== 64) {
    throw new Error(`Decoded secret key has invalid length: ${mintBytes.length}`);
  }

  const mintPair = Keypair.fromSecretKey(mintBytes);
  return mintPair;
}
