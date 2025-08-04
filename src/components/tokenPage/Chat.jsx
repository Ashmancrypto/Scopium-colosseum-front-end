import React, { useState, useEffect, useRef, useLayoutEffect } from 'react';
import { useWallet } from '@solana/wallet-adapter-react';
import { useToastContext } from '../../contexts/ToastContext';
import { formatTimeAgo } from '../../utils/formatters';
import { Send } from 'lucide-react';
import { useTheme } from '../../contexts/ThemeContext';
import { axiosPrivate } from '../../api/axiosPrivate';

const DEBUG = false;
const MESSAGES_PER_PAGE = 10;

const Message = React.memo(({ msg, currentUserId, walletAddress, isDark }) => {
  const isOwnMessage = msg.sender._id === currentUserId || (msg.sender.walletAddr && msg.sender.walletAddr === walletAddress);
  const firstLetter = msg.sender.username?.[0]?.toUpperCase() || '?';

  return (
    <div className={`flex ${isOwnMessage ? 'justify-end' : 'justify-start'} items-start space-x-2`}>
      {!isOwnMessage && (
        msg.sender.avatar ? (
          <img
            src={`/avatars/${msg.sender.avatar}`}
            alt={msg.sender.username}
            className={`w-8 h-8 min-w-8 min-h-8 rounded-full border-2 ${isDark ? 'border-gray-600' : 'border-pink-300'}`}
            onError={(e) => { e.target.src = '/avatars/default-avatar.jpg'; }}
          />
        ) : (
          <div
            className={`w-8 h-8 min-w-8 min-h-8 rounded-full flex items-center justify-center text-base font-medium border-2 ${
              isDark ? 'bg-gray-600 text-white border-gray-600' : 'bg-pink-200 text-pink-600 border-pink-300'
            }`}
          >
            {firstLetter}
          </div>
        )
      )}
      <div
        className={`max-w-xs lg:max-w-md rounded-lg p-3 chat-message ${
          isOwnMessage
            ? isDark
              ? 'bg-gray-700 text-white rounded-br-none'
              : 'bg-gray-200 text-gray-900 rounded-br-none'
            : isDark
            ? 'bg-gray-700 text-white rounded-bl-none'
            : 'bg-pink-100 text-pink-900 rounded-bl-none'
        }`}
      >
        <div>
          <div
            className={`text-sm font-medium ${
              isOwnMessage
                ? isDark
                  ? 'text-gray-300'
                  : 'text-gray-700'
                : isDark
                ? 'text-gray-300'
                : 'text-pink-700'
            }`}
          >
            <b>{msg.sender.username || 'Unknown'}</b>
          </div>
          <div className="text-sm">{msg.content}</div>
          <div
            className={`text-xs mt-1 ${
              isOwnMessage
                ? isDark
                  ? 'text-gray-400'
                  : 'text-gray-500'
                : isDark
                ? 'text-gray-400'
                : 'text-pink-500'
            }`}
          >
            {formatTimeAgo(new Date(msg.timestamp))}
          </div>
        </div>
      </div>
      {isOwnMessage && (
        msg.sender.avatar ? (
          <img
            src={`/avatars/${msg.sender.avatar}`}
            alt={msg.sender.username}
            className={`w-8 h-8 min-w-8 min-h-8 rounded-full border-2 ${isDark ? 'border-gray-600' : 'border-pink-300'}`}
            onError={(e) => { e.target.src = '/avatars/default-avatar.jpg'; }}
          />
        ) : (
          <div
            className={`w-8 h-8 min-w-8 min-h-8 rounded-full flex items-center justify-center text-base font-medium border-2 ${
              isDark ? 'bg-gray-600 text-white border-gray-600' : 'bg-pink-600 text-white border-pink-300'
            }`}
          >
            {firstLetter}
          </div>
        )
      )}
    </div>
  );
});

const Chat = ({ tokenAddress, currentUserId }) => {
  const { publicKey } = useWallet();
  const toast = useToastContext();
  const { isDark } = useTheme();
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [error, setError] = useState(null);
  const [offset, setOffset] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  const [isAtBottom, setIsAtBottom] = useState(true);
  const [lastMessageIsOwn, setLastMessageIsOwn] = useState(false);
  const [adjustScroll, setAdjustScroll] = useState(false);
  const [latestTimestamp, setLatestTimestamp] = useState(null);
  const [token, setToken] = useState(null);
  const ws = useRef(null);
  const chatContainerRef = useRef(null);
  const oldScrollHeightRef = useRef(0);
  const oldScrollTopRef = useRef(0);

  const walletAddress = publicKey ? publicKey.toBase58() : null;

  // Fetch message history and authenticate
  useEffect(() => {
    const authenticateAndFetch = async () => {
      try {
        if (!publicKey) {
          throw new Error('Wallet not connected');
        }
        const walletAddr = publicKey.toBase58();
        if (DEBUG) console.log('DEBUG: Using wallet address:', walletAddr);

        const loginResponse = await axiosPrivate.post('/auth/login', {
          walletAddr,
        });
        if (DEBUG) console.log('DEBUG: Login response:', loginResponse.data);
        const authToken = loginResponse.data.token.replace('Bearer ', '');
        setToken(authToken);
        localStorage.setItem('token', authToken);
        axiosPrivate.defaults.headers['Authorization'] = `Bearer ${authToken}`;

        if (DEBUG) console.log('Fetching messages for token:', tokenAddress);
        const response = await axiosPrivate.get(`/chat/history/${tokenAddress}`, {
          params: { limit: MESSAGES_PER_PAGE },
        });
        if (DEBUG) console.log('Messages response:', response.data);
        const fetchedMessages = response.data.messages || [];
        setMessages(fetchedMessages);
        setOffset(fetchedMessages.length);
        setHasMore(response.data.hasMore || fetchedMessages.length === MESSAGES_PER_PAGE);
        setLatestTimestamp(fetchedMessages.length > 0 ? fetchedMessages[fetchedMessages.length - 1].timestamp : null);
        setError(null);
      } catch (err) {
        if (DEBUG) console.error('Error fetching messages:', err);
        // setError('Failed to load chat history');
        // toast.error('Chat Error', 'Could not load messages');
      } finally {
        setLoading(false);
      }
    };

    authenticateAndFetch();
  }, [tokenAddress, currentUserId, toast, publicKey]);

  // Adjust scroll position after loading more messages
  useLayoutEffect(() => {
    if (adjustScroll && chatContainerRef.current) {
      const chatContainer = chatContainerRef.current;
      const newScrollHeight = chatContainer.scrollHeight;
      chatContainer.scrollTop = newScrollHeight - oldScrollHeightRef.current + oldScrollTopRef.current;
      setAdjustScroll(false);
    }
  }, [adjustScroll]);

  // Load more messages for infinite scrolling
  const loadMoreMessages = async () => {
    if (!hasMore || loadingMore) return;

    setLoadingMore(true);
    if (chatContainerRef.current) {
      oldScrollHeightRef.current = chatContainerRef.current.scrollHeight;
      oldScrollTopRef.current = chatContainerRef.current.scrollTop;
    }
    try {
      if (DEBUG) console.log('Loading more messages, offset:', offset);
      const response = await axiosPrivate.get(`/chat/history/${tokenAddress}`, {
        params: { limit: MESSAGES_PER_PAGE, offset },
      });
      if (DEBUG) console.log('Loaded more messages:', response.data.messages.length);
      const moreMessages = response.data.messages || [];
      setMessages((prev) => [...moreMessages.map((msg) => ({
        ...msg,
        sender: { ...msg.sender, walletAddr: msg.sender.walletAddr || walletAddress },
      })), ...prev]);
      setOffset((prev) => prev + moreMessages.length);
      setHasMore(response.data.hasMore || moreMessages.length === MESSAGES_PER_PAGE);
      setAdjustScroll(true);
    } catch (err) {
      if (DEBUG) console.error('Error loading more messages:', err);
      toast.error('Load Error', 'Could not load older messages');
    } finally {
      setLoadingMore(false);
    }
  };

  // WebSocket and polling
  useEffect(() => {
    if (DEBUG) console.log('DEBUG: Entering WebSocket useEffect', { token, tokenAddress, walletAddress, currentUserId });

    const fetchNewMessages = async () => {
      try {
        if (!token) {
          if (DEBUG) console.log('Polling skipped: Missing token');
          return;
        }
        if (DEBUG) console.log('Polling messages for token:', tokenAddress, 'latestTimestamp:', latestTimestamp);
        const params = { limit: MESSAGES_PER_PAGE };
        if (latestTimestamp) {
          params.since = latestTimestamp;
        }
        const response = await axiosPrivate.get(`/chat/history/${tokenAddress}`, { params });
        if (DEBUG) console.log('Polled messages:', response.data.messages?.length || 0);
        const newMessages = response.data.messages || [];
        setMessages((prev) => {
          const existingIds = new Set(prev.map((msg) => msg._id));
          const uniqueNewMessages = newMessages.filter((msg) => !existingIds.has(msg._id));
          if (uniqueNewMessages.length > 0) {
            if (DEBUG) console.log('Adding polled messages:', uniqueNewMessages);
            const updatedMessages = [...prev, ...uniqueNewMessages.map((msg) => ({
              ...msg,
              sender: { ...msg.sender, walletAddr: msg.sender.walletAddr || walletAddress },
            }))];
            setLatestTimestamp(uniqueNewMessages[uniqueNewMessages.length - 1]?.timestamp || latestTimestamp);
            return updatedMessages;
          }
          return prev;
        });
        setHasMore(newMessages.length === MESSAGES_PER_PAGE);
      } catch (err) {
        if (DEBUG) console.error('Error polling messages:', err);
      }
    };

    if (!publicKey) {
      if (DEBUG) console.error('WebSocket skipped: Missing publicKey', { publicKey });
      // setError('Wallet not connected');
      // toast.error('Auth Error', 'Please connect your wallet');
      // Start polling as a fallback after token is available
      const pollInterval = setInterval(() => {
        if (token) fetchNewMessages();
      }, 5000);
      return () => clearInterval(pollInterval);
    }

    if (!token) {
      if (DEBUG) console.log('WebSocket skipped: Missing token, waiting for authentication');
      // Start polling as a fallback after token is available
      const pollInterval = setInterval(() => {
        if (token) fetchNewMessages();
      }, 5000);
      return () => clearInterval(pollInterval);
    }

    const isTestMode = import.meta.env.VITE_TEST_MODE === 'true';
    const wsBase = isTestMode
      ? import.meta.env.VITE_API_BASE_URL_DEV.replace('http', 'ws')
      : import.meta.env.VITE_API_BASE_URL_PROD.replace('https', 'wss');
    const wsUrl = `${wsBase}?token=${token}`;
    if (DEBUG) console.log('DEBUG: WebSocket URL:', wsUrl);
    let reconnectAttempts = 0;
    const maxReconnectAttempts = 5;
    let pollInterval;

    const connectWebSocket = () => {
      if (DEBUG) console.log('DEBUG: Initializing WebSocket connection');
      ws.current = new WebSocket(wsUrl);

      ws.current.onopen = () => {
        if (DEBUG) console.log('WebSocket connected, URL:', wsUrl);
        reconnectAttempts = 0;
        // Log connection status periodically
        const statusInterval = setInterval(() => {
          if (DEBUG) console.log('WebSocket status:', ws.current?.readyState, ws.current?.readyState === WebSocket.OPEN ? 'OPEN' : 'NOT OPEN');
        }, 10000);
        ws.current.onclose = () => clearInterval(statusInterval);
      };

      ws.current.onmessage = (event) => {
        try {
          if (DEBUG) console.log('WebSocket raw message:', event.data);
          let message;
          try {
            message = JSON.parse(atob(event.data));
          } catch {
            message = JSON.parse(event.data);
          }
          if (DEBUG) console.log('WebSocket parsed message:', message);

          let msgData;
          if (message.message?.type === `chat_${tokenAddress}`) {
            msgData = message.message.data;
          } else if (message.type === 'new_message') {
            msgData = message.data;
          } else {
            if (DEBUG) console.log('WebSocket message ignored:', message);
            return;
          }

          // Ensure tokenAddress is included
          msgData.tokenAddress = msgData.tokenAddress || tokenAddress;

          const isOwnMessage = msgData.sender._id === currentUserId || 
                              (msgData.sender.walletAddr && msgData.sender.walletAddr === walletAddress);
          setMessages((prev) => {
            const existingIds = new Set(prev.map((msg) => msg._id));
            if (!existingIds.has(msgData._id)) {
              if (DEBUG) console.log('Adding new message:', msgData);
              const updatedMessages = [...prev, { 
                ...msgData, 
                sender: { 
                  ...msgData.sender, 
                  walletAddr: msgData.sender.walletAddr || walletAddress 
                } 
              }];
              setLatestTimestamp(msgData.timestamp);
              return updatedMessages;
            }
            if (DEBUG) console.log('Message already exists, ID:', msgData._id);
            return prev;
          });
          setLastMessageIsOwn(isOwnMessage);
        } catch (err) {
          if (DEBUG) console.error('WebSocket message parsing error:', err, 'Raw data:', event.data);
        }
      };

      ws.current.onerror = (error) => {
        if (DEBUG) console.error('WebSocket error:', error);
      };

      ws.current.onclose = (event) => {
        if (DEBUG) console.log(`WebSocket disconnected: ${event.code} ${event.reason}`);
        if (reconnectAttempts < maxReconnectAttempts) {
          const delay = Math.pow(2, reconnectAttempts) * 1000;
          reconnectAttempts++;
          if (DEBUG) console.log(`Reconnecting attempt ${reconnectAttempts}/${maxReconnectAttempts} in ${delay}ms`);
          setTimeout(connectWebSocket, delay);
        } else {
          if (DEBUG) console.log('Falling back to polling');
          pollInterval = setInterval(fetchNewMessages, 5000);
        }
      };
    };

    connectWebSocket();
    // Start polling immediately as a fallback
    pollInterval = setInterval(fetchNewMessages, 5000);

    return () => {
      if (DEBUG) console.log('DEBUG: Cleaning up WebSocket and polling');
      if (ws.current) ws.current.close();
      if (pollInterval) clearInterval(pollInterval);
    };
  }, [token, tokenAddress, toast, walletAddress, currentUserId, publicKey]);

  // Handle scroll for infinite loading and tracking scroll position
  const handleScroll = (e) => {
    const { scrollTop, scrollHeight, clientHeight } = e.currentTarget;
    setIsAtBottom(scrollHeight - scrollTop - clientHeight < 10);
    if (scrollTop === 0 && hasMore && !loadingMore) {
      loadMoreMessages();
    }
  };

  // Scroll to bottom for new messages
  useEffect(() => {
    if (!loadingMore && messages.length > 0 && chatContainerRef.current) {
      if (lastMessageIsOwn || isAtBottom) {
        chatContainerRef.current.scrollTo({
          top: chatContainerRef.current.scrollHeight,
          behavior: 'smooth',
        });
        setIsAtBottom(true);
        setLastMessageIsOwn(false);
      }
    }
  }, [messages, loadingMore, isAtBottom, lastMessageIsOwn]);

  const handleSendMessage = async () => {
    if (!newMessage.trim()) return;

    try {
      const response = await axiosPrivate.post(`/chat/history/${tokenAddress}`, {
        content: newMessage.trim(),
      });
      if (DEBUG) console.log('DEBUG: Send message response:', response.data);
      const newMsg = {
        _id: response.data._id || `temp-${Date.now()}`,
        sender: {
          _id: response.data.sender?._id || currentUserId || walletAddress,
          username: response.data.sender?.username || '',
          avatar: response.data.sender?.avatar || null,
          walletAddr: response.data.sender?.walletAddr || walletAddress,
        },
        content: response.data.content || newMessage.trim(),
        timestamp: response.data.timestamp || new Date().toISOString(),
      };
      setMessages((prev) => [...prev, newMsg]);
      setLatestTimestamp(newMsg.timestamp);
      setLastMessageIsOwn(true);
      setNewMessage('');
    } catch (err) {
      if (DEBUG) console.error('Error sending message:', err);
      toast.error('Send Failed', 'Could not send message');
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-pink-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-full text-red-500 text-center p-4">
        {error}
      </div>
    );
  }

  return (
    <div className={`h-full flex rounded-xl flex-col ${isDark ? 'bg-gray-800' : 'bg-white'}`}>
      <div className={`p-4 border-b ${isDark ? 'border-gray-700' : 'border-gray-200'}`}>
        <h3 className={`font-semibold ${isDark ? 'text-white' : 'text-gray-900'}`}>Chat</h3>
      </div>
      <div
        className="flex-1 p-4 overflow-y-auto max-h-[360px] max-w-md"
        ref={chatContainerRef}
        onScroll={handleScroll}
      >
        {loadingMore && (
          <div className="flex justify-center py-2">
            <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-pink-500"></div>
          </div>
        )}
        {!loading && messages.length === 0 ? (
          <div className="text-center h-full flex items-center justify-center">
            <p className={isDark ? 'text-gray-400' : 'text-gray-500'}>
              {publicKey ? "No messages yet. Start the conversation!" : "Please connect your wallet"}
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {messages.map((msg) => (
              <Message
                key={msg._id}
                msg={msg}
                currentUserId={currentUserId}
                walletAddress={walletAddress}
                isDark={isDark}
              />
            ))}
          </div>
        )}
      </div>
      <div className={`p-4 border-t ${isDark ? 'border-gray-700' : 'border-gray-200'}`}>
        <div className="flex items-center space-x-2">
          <textarea
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            placeholder="Send a message"
            rows="1"
            className={`chat-input flex-1 px-3 py-2 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-pink-500 resize-y max-h-[7.5rem] ${
              isDark
                ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400'
                : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500'
            }`}
            onKeyPress={(e) => e.key === 'Enter' && !e.shiftKey && (e.preventDefault(), handleSendMessage())}
          />
          <button
            onClick={handleSendMessage}
            disabled={!newMessage.trim()}
            className={`chat-button p-2 rounded-lg transition-colors ${
              newMessage.trim()
                ? 'bg-pink-500 hover:bg-pink-600 text-white'
                : 'bg-gray-300 text-gray-500 cursor-not-allowed'
            }`}
          >
            <Send className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Chat;