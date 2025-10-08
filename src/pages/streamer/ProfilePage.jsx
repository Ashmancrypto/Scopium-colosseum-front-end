import { useState } from 'react';
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
    reactions: {
      likes: 1298,
      comments: 244,
      shares: 91
    }
  },
  {
    id: 2,
    content:
      'Happy release day! I have been teasing this on my weekly updates, and it is finally dropping tonight. See you for the streaming launch stream! Thanks you all! #CryptoArt #NFTCommunity #Scopium',
    tags: ['Image'],
    reactions: {
      likes: 984,
      comments: 167,
      shares: 54
    }
  }
];

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
        title: 'Stream title - Live NFT Reveal: Let\'s See What Happens',
        thumbnail: '/images/sample/sample1.png',
        liveLabel: 'Live',
        duration: '2h 14m',
        viewerCount: '32.5k watching',
        streamer: 'Username',
        followersLabel: '225k followers',
        avatar: '/images/sample/savatar2.png',
        actions: [
          { id: 'likes', icon: getGenericIconPath('favorite.png'), label: '1.8k' },
          { id: 'comments', label: '320' },
          { id: 'shares', icon: getGenericIconPath('up.png'), label: '54' }
        ]
      },
      {
        id: 'stream-2',
        title: 'Stream title - Live NFT Reveal: Let\'s See What Happens',
        thumbnail: '/images/sample/sample2.png',
        liveLabel: 'Live',
        duration: '1h 48m',
        viewerCount: '24.1k watching',
        streamer: 'Username',
        followersLabel: '225k followers',
        avatar: '/images/sample/savatar3.png',
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
        title: 'Stream title - Live NFT Reveal: Let\'s See What Happens',
        thumbnail: '/images/sample/sample3.png',
        duration: '32m',
        viewerCount: '9.6k views',
        streamer: 'Username',
        followersLabel: '225k followers',
        avatar: '/images/sample/savatar4.png',
        actions: [
          { id: 'likes', icon: getGenericIconPath('favorite.png'), label: '832' },
          { id: 'comments', label: '147' },
          { id: 'shares', icon: getGenericIconPath('up.png'), label: '26' }
        ]
      },
      {
        id: 'video-2',
        title: 'Stream title - Live NFT Reveal: Let\'s See What Happens',
        thumbnail: '/images/sample/sample1.png',
        duration: '28m',
        viewerCount: '6.3k views',
        streamer: 'Username',
        followersLabel: '225k followers',
        avatar: '/images/sample/savatar5.png',
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
    volume: '6.01M',
    age: '5 hours',
    holders: '602k',
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
    volume: '4.38M',
    age: '9 hours',
    holders: '482k',
    stats: [
      { label: '5 Min', value: '+0.12%', trend: 'up' },
      { label: '1 hour', value: '+0.37%', trend: 'up' },
      { label: '6 hour', value: '+0.91%', trend: 'up' },
      { label: '24 hour', value: '-0.84%', trend: 'down' }
    ]
  }
];

const profileDetails = {
  username: 'USERNAME',
  followers: '150k',
  pnl: '+12.5%',
  bio: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam tortor turpis, consequat vel nibh at, maximus rhoncus lacus.',
  avatar: '/images/icons/Streamer POV/Rectangle 56.png'
};

const tabs = [
  { id: 'posts', label: 'Posts' },
  { id: 'videos', label: 'Videos' },
  { id: 'tokens', label: 'Tokens' }
];

const StreamerProfilePage = () => {
  const { isDark } = useTheme();
  const [activeTab, setActiveTab] = useState('posts');

  const pageBackground = isDark ? 'bg-gray-800' : 'bg-[#EBEBEB]';

  const renderActiveTabContent = () => {
    switch (activeTab) {
      case 'videos':
        return <VideosFeed sections={mockVideoSections} isDark={isDark} />;
      case 'tokens':
        return <TokensFeed tokens={mockTokens} isDark={isDark} />;
      case 'posts':
      default:
        return <PostsFeed posts={mockPosts} isDark={isDark} />;
    }
  };

  return (
    <div className={`min-h-screen md:mt-40 transition-colors duration-300 ${pageBackground}`}>
      <Header />

      <div className="pt-16 flex">
        <div className={`flex-1 p-2 sm:p-4 lg:p-6 min-h-screen transition-colors duration-300 ${pageBackground}`}>
          <div className="mx-auto flex max-w-6xl flex-col gap-6 lg:flex-row">
            <aside className="w-full space-y-6 lg:w-80 xl:w-96 lg:sticky lg:top-28 lg:self-start">
              <ProfileCard profile={profileDetails} assets={streamerAssets} isDark={isDark} />
              <BannerBoard banners={mockBanners} isDark={isDark} />
            </aside>

            <main className="flex-1 space-y-6">
              <PostComposer isDark={isDark} />
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