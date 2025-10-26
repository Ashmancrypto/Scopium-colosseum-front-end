import { useCallback, useEffect, useMemo, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Header from '../../components/Header.jsx';
import { useTheme } from '../../contexts/ThemeContext.jsx';
import {
  ProfileCard,
  BannerBoard,
  PostComposer,
  ContentTabs,
  PostsFeed,
  VideosFeed,
  TokensFeed
} from './components/index.js';
import { useProfileData } from '../../hooks/useProfileData.js';
import { fetchPosts, createPost, fetchVideos } from '../../api/streamer/index.js';
import { ProfileNotFound, LoadingProfile } from '../../components/profile/index.js';
import { BACKEND_URL } from '../../contexts/contractsOnSolana/contracts/constants.js';

const USE_MOCK_CONTENT = false;

const getIconPath = (fileName) => encodeURI(`/images/icons/Streamer POV/${fileName}`);
const getGenericIconPath = (fileName) => encodeURI(`/images/icons/${fileName}`);

const assetPair = (fileName) => ({
  light: getIconPath(fileName),
  dark: getIconPath(`dark/${fileName}`)
});

const streamerAssets = {
  edit: assetPair('Streamer-profile-edit.png'),
  union: assetPair('Union.png'),
  verified: assetPair('Verified icon.png'),
  actions: [
    assetPair('X-twitter-3d icon 1.png'),
    assetPair('X-twitter-3d icon 2.png'),
    assetPair('X-twitter-3d icon 3.png'),
    assetPair('X-twitter-3d icon 4.png')
  ]
};

const tabs = [
  { id: 'posts', label: 'Posts' },
  { id: 'videos', label: 'Videos' },
  { id: 'tokens', label: 'Tokens' }
];

const mockBanners = [
  {
    id: 1,
    title: 'Banner #139',
    description: 'Promotion of new art, cover color adjustments. Deserunt fanny tump, consoput.'
  },
  {
    id: 2,
    title: 'Banner #138',
    description: 'Weekly stream schedule update, calendar drop. Deserunt fanny tump, consoput.'
  },
  {
    id: 3,
    title: 'Banner #136',
    description: 'Exclusive Q&A stream teaser, merch preview. Deserunt fanny tump, consoput.'
  }
];

const mockPosts = [
  {
    id: 1,
    content:
      'Hey everyone! I have been working on a new graphic overlay, and it is nearing completion! Cannot wait for the storytelling stream where I share my inspiration behind the new design. #CryptoArt #NFTCommunity #Scopium',
    tags: ['Image'],
    mediaUrl: '/images/sample/sample1.png',
    reactions: {
      likes: 1298,
      comments: 244,
      shares: 91
    },
    publishedAt: new Date().toISOString()
  },
  {
    id: 2,
    content:
      'Happy release day! I have been teasing this on my weekly updates, and it is finally dropping tonight. See you for the streaming launch stream! Thanks you all! #CryptoArt #NFTCommunity #Scopium',
    tags: ['Image'],
    mediaUrl: '/images/sample/sample2.png',
    reactions: {
      likes: 984,
      comments: 167,
      shares: 54
    },
    publishedAt: new Date(Date.now() - 1000 * 60 * 60).toISOString()
  }
];

const mockVideoSections = [
  {
    id: 'recent-streams',
    title: 'Recent Streams',
    actions: [
      {
        id: 'add-video',
        label: 'Add Video',
        variant: 'primary',
        icon: {
          light: getGenericIconPath('new.png'),
          dark: getGenericIconPath('new.png')
        }
      },
      {
        id: 'view-all-recent',
        label: 'View All',
        variant: 'secondary',
        icon: {
          light: getGenericIconPath('arrow.svg'),
          dark: getGenericIconPath('arrow.svg')
        }
      }
    ],
    items: [
      {
        id: 'stream-1',
        title: "Stream title - Live NFT Reveal: Let's See What Happens",
        thumbnail: '/images/sample/sample1.png',
        liveLabel: 'Live',
        duration: '2h 14m',
        viewerCount: '32.5k watching',
        actions: [
          { id: 'likes', icon: getGenericIconPath('favorite.png'), label: '1.8k' },
          { id: 'comments', label: '320' },
          { id: 'shares', icon: getGenericIconPath('up.png'), label: '54' }
        ]
      },
      {
        id: 'stream-2',
        title: "Stream title - Live NFT Reveal: Let's See What Happens",
        thumbnail: '/images/sample/sample2.png',
        liveLabel: 'Live',
        duration: '1h 48m',
        viewerCount: '24.1k watching',
        actions: [
          { id: 'likes', icon: getGenericIconPath('favorite.png'), label: '1.2k' },
          { id: 'comments', label: '205' },
          { id: 'shares', icon: getGenericIconPath('up.png'), label: '37' }
        ]
      }
    ]
  },
  {
    id: 'videos-library',
    title: 'Videos',
    actions: [
      {
        id: 'add-video-library',
        label: 'Add Video',
        variant: 'secondary',
        icon: {
          light: getGenericIconPath('new.png'),
          dark: getGenericIconPath('new.png')
        }
      },
      {
        id: 'view-all-library',
        label: 'View All',
        variant: 'secondary',
        icon: {
          light: getGenericIconPath('arrow.svg'),
          dark: getGenericIconPath('arrow.svg')
        }
      }
    ],
    items: [
      {
        id: 'video-1',
        title: "Stream title - Live NFT Reveal: Let's See What Happens",
        thumbnail: '/images/sample/sample3.png',
        duration: '32m',
        viewerCount: '9.6k views',
        actions: [
          { id: 'likes', icon: getGenericIconPath('favorite.png'), label: '832' },
          { id: 'comments', label: '147' },
          { id: 'shares', icon: getGenericIconPath('up.png'), label: '26' }
        ]
      },
      {
        id: 'video-2',
        title: "Stream title - Live NFT Reveal: Let's See What Happens",
        thumbnail: '/images/sample/sample1.png',
        duration: '28m',
        viewerCount: '6.3k views',
        actions: [
          { id: 'likes', icon: getGenericIconPath('favorite.png'), label: '614' },
          { id: 'comments', label: '103' },
          { id: 'shares', icon: getGenericIconPath('up.png'), label: '19' }
        ]
      }
    ]
  }
];

const mockTokens = [
  {
    id: 'token-1',
    name: 'Token name',
    symbol: 'TKN',
    icon: '/images/placeholders/tokenPlaceholders/pepe.png',
    chart: '/images/chart.png',
    marketCap: 6_010_000,
    price: 1.12,
    replies: 482,
    stats: [
      { label: '5 Min', value: '+0.27%', trend: 'up' },
      { label: '1 hour', value: '+0.52%', trend: 'up' },
      { label: '6 hour', value: '+1.24%', trend: 'up' },
      { label: '24 hour', value: '-0.62%', trend: 'down' }
    ]
  },
  {
    id: 'token-2',
    name: 'Token name',
    symbol: 'COIN',
    icon: '/images/placeholders/tokenPlaceholders/dog.png',
    chart: '/images/chart.png',
    marketCap: 4_380_000,
    price: 0.84,
    replies: 321,
    stats: [
      { label: '5 Min', value: '+0.12%', trend: 'up' },
      { label: '1 hour', value: '+0.37%', trend: 'up' },
      { label: '6 hour', value: '+0.91%', trend: 'up' },
      { label: '24 hour', value: '-0.84%', trend: 'down' }
    ]
  }
];

const mockProfileDetails = {
  username: 'USERNAME',
  followers: '150000',
  pnl: '+12.5%',
  bio: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam tortor turpis, consequat vel nibh at, maximus rhoncus lacus.',
  avatar: '/images/icons/Streamer POV/Rectangle 56.png'
};

const formatDuration = (seconds) => {
  const totalSeconds = Number(seconds);
  if (!totalSeconds || Number.isNaN(totalSeconds) || totalSeconds < 0) return null;
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const secs = totalSeconds % 60;
  const parts = [];
  if (hours) parts.push(`${hours}h`);
  if (minutes) parts.push(`${minutes}m`);
  if (!hours && !minutes) parts.push(`${secs}s`);
  return parts.join(' ');
};

const withBackendUrl = (path) => {
  if (!path) return null;
  if (typeof path !== 'string') return null;
  if (path.startsWith('http://') || path.startsWith('https://')) return path;
  const normalised = path.startsWith('/') ? path : `/${path}`;
  return `${BACKEND_URL}${normalised}`;
};

const renderErrorCard = (message, isDark) => (
  <div
    className={`rounded-2xl border p-8 text-center text-sm font-medium transition-colors ${
      isDark ? 'border-gray-700 bg-gray-900/90 text-rose-300' : 'border-rose-200 bg-rose-50 text-rose-600'
    }`}
  >
    {message}
  </div>
);

const StreamerProfilePage = () => {
  const { isDark } = useTheme();
  const { username } = useParams();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('posts');
  const [posts, setPosts] = useState([]);
  const [postsLoading, setPostsLoading] = useState(false);
  const [postsError, setPostsError] = useState(null);
  const [videos, setVideos] = useState([]);
  const [videosLoading, setVideosLoading] = useState(false);
  const [videosError, setVideosError] = useState(null);

  const {
    userProfile,
    loadingProfile,
    profileNotFound,
    isOwnProfile
  } = useProfileData(username);

  useEffect(() => {
    if (USE_MOCK_CONTENT || !username) return undefined;
    let cancelled = false;

    const loadPosts = async () => {
      try {
        setPostsLoading(true);
        setPostsError(null);
        if (!cancelled) {
          setPosts([]);
        }
        const data = await fetchPosts(username);
        if (!cancelled) {
          setPosts(Array.isArray(data) ? data : []);
        }
      } catch (err) {
        console.error('Failed to load posts:', err);
        if (!cancelled) {
          setPostsError(err?.response?.data?.error || 'Failed to load posts.');
          setPosts([]);
        }
      } finally {
        if (!cancelled) {
          setPostsLoading(false);
        }
      }
    };

    loadPosts();

    return () => {
      cancelled = true;
    };
  }, [username]);

  useEffect(() => {
    if (USE_MOCK_CONTENT || !username) return undefined;
    let cancelled = false;

    const loadVideos = async () => {
      try {
        setVideosLoading(true);
        setVideosError(null);
        if (!cancelled) {
          setVideos([]);
        }
        const data = await fetchVideos(username);
        if (!cancelled) {
          setVideos(Array.isArray(data) ? data : []);
        }
      } catch (err) {
        console.error('Failed to load videos:', err);
        if (!cancelled) {
          setVideosError(err?.response?.data?.error || 'Failed to load videos.');
          setVideos([]);
        }
      } finally {
        if (!cancelled) {
          setVideosLoading(false);
        }
      }
    };

    loadVideos();

    return () => {
      cancelled = true;
    };
  }, [username]);

  const handlePublish = useCallback(async ({ content }) => {
    if (USE_MOCK_CONTENT) {
      return;
    }
    try {
      const newPost = await createPost({ content });
      setPostsError(null);
      setPosts((prev) => [
        {
          ...newPost,
          reactions: newPost.reactions ?? { likes: 0, comments: 0, shares: 0 }
        },
        ...prev
      ]);
    } catch (err) {
      console.error('Failed to publish post:', err);
      setPostsError(err?.response?.data?.error || 'Failed to publish post.');
      throw err;
    }
  }, []);

  const pageBackground = isDark ? 'bg-gray-800' : 'bg-[#EBEBEB]';

  const profileDetails = useMemo(() => {
    if (!userProfile) return null;
    return {
      username: userProfile.username ?? 'Unknown',
      followers: userProfile.followers,
      pnl: userProfile.pnl || mockProfileDetails.pnl,
      bio: userProfile.bio || mockProfileDetails.bio,
      avatar: withBackendUrl(userProfile.avatar) ?? '/images/icons/Streamer POV/Rectangle 56.png'
    };
  }, [userProfile]);

  const tokens = useMemo(() => {
    if (!userProfile?.coinsCreated?.length) return [];
    return userProfile.coinsCreated.map((token) => ({
      id: token.mintAddr ?? token.ticker ?? token.tokenName,
      name: token.tokenName ?? 'Unknown Token',
      symbol: token.ticker ?? '',
      icon: withBackendUrl(token.logo),
      marketCap: token.marketCap,
      price: token.price,
      replies: token.replies
    }));
  }, [userProfile]);

  const videoSections = useMemo(() => {
    if (!videos.length) return [];
    return [
      {
        id: 'videos',
        title: 'Videos',
        items: videos.map((video) => {
          const durationLabel = formatDuration(video.duration);
          const viewerCount = video.metadata?.viewerCount;
          const viewerLabel = viewerCount
            ? `${Number(viewerCount).toLocaleString()} ${video.metadata?.liveLabel ? 'watching' : 'views'}`
            : null;

          return {
            id: video._id ?? video.id,
            title: video.title,
            thumbnail: withBackendUrl(video.thumbnailUrl) ?? '/images/sample/sample1.png',
            liveLabel: video.metadata?.liveLabel ?? null,
            duration: durationLabel,
            viewerCount: viewerLabel,
            actions: []
          };
        })
      }
    ];
  }, [videos]);

  const effectiveProfileDetails = profileDetails || mockProfileDetails;
  const effectiveTokens = tokens.length > 0 ? tokens : mockTokens;
  const effectiveVideoSections = videoSections.length > 0 ? videoSections : mockVideoSections;
  const effectivePosts = USE_MOCK_CONTENT ? mockPosts : posts.length > 0 ? posts : mockPosts;

  const renderActiveTabContent = () => {
    switch (activeTab) {
      case 'videos':
        if (!USE_MOCK_CONTENT && videosError) return renderErrorCard(videosError, isDark);
        return <VideosFeed sections={effectiveVideoSections} isDark={isDark} isLoading={videosLoading} />;
      case 'tokens':
        return <TokensFeed tokens={effectiveTokens} isDark={isDark} isLoading={loadingProfile && !userProfile} />;
      case 'posts':
      default:
        if (!USE_MOCK_CONTENT && postsError) return renderErrorCard(postsError, isDark);
        return (
          <PostsFeed
            posts={effectivePosts}
            isDark={isDark}
            isLoading={postsLoading}
            displayName={(effectiveProfileDetails?.username ?? 'Streamer').toString()}
          />
        );
    }
  };

  if (profileNotFound) {
    return (
      <div className={`min-h-screen md:mt-40 transition-colors duration-300 ${pageBackground}`}>
        <Header />
        <div className="pt-16 flex">
          <div className={`flex-1 p-4 md:p-6 ${pageBackground}`}>
            <ProfileNotFound username={username} onBackClick={() => navigate(-1)} />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={`min-h-screen md:mt-40 transition-colors duration-300 ${pageBackground}`}>
      <Header />

      <div className="pt-16 flex">
        <div className={`flex-1 p-2 sm:p-4 lg:p-6 min-h-screen transition-colors duration-300 ${pageBackground}`}>
          <div className="mx-auto flex max-w-6xl flex-col gap-6 lg:flex-row">
            <aside className="w-full space-y-6 lg:w-80 xl:w-96 lg:sticky lg:top-28 lg:self-start">
              {loadingProfile && !profileDetails ? (
                <LoadingProfile />
              ) : null}
              {effectiveProfileDetails ? (
                <ProfileCard profile={effectiveProfileDetails} assets={streamerAssets} isDark={isDark} />
              ) : null}
              <BannerBoard banners={mockBanners} isDark={isDark} />
            </aside>

            <main className="flex-1 space-y-6">
              <PostComposer isDark={isDark} onPublish={handlePublish} canPost={isOwnProfile} />
              <ContentTabs tabs={tabs} activeTab={activeTab} onChange={setActiveTab} isDark={isDark} />
              {renderActiveTabContent()}
            </main>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StreamerProfilePage;