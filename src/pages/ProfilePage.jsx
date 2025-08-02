import { useContext, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import Header from '../components/Header.jsx';
import { useToastContext } from '../contexts/ToastContext.jsx';
import { solPriceContext } from '../contexts/SolPriceContext.jsx';
import { useProfileData } from '../hooks/useProfileData.js';
import { useTheme } from '../contexts/ThemeContext.jsx';
import Cookies from 'js-cookie';
import {
  EditProfileModal,
  ProfileHeader,
  ProfileTabs,
  BalancesTab,
  CreatedTab,
  EmptyTab,
  ProfileNotFound,
  LoadingProfile
} from '../components/profile/index.js';

const ProfilePage = () => {
  const { username } = useParams();
  const navigate = useNavigate();
  const toast = useToastContext();
  const { isDark } = useTheme();
  const { solPrice } = useContext(solPriceContext);
  const [activeTab, setActiveTab] = useState('balances');
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  const {
    currentUser,
    userProfile,
    loadingProfile,
    profileNotFound,
    solBalance,
    loadingBalance,
    isOwnProfile,
    isViewingOtherProfile,
    updateUserProfile,
    setCurrentUser
  } = useProfileData(username);

  const copyAddress = () => {
    const addressToCopy = isOwnProfile ? userProfile?.walletAddr : userProfile?.walletAddr;
    if (addressToCopy) {
      navigator.clipboard.writeText(addressToCopy);
      toast.success('Copied!', 'Wallet address copied to clipboard', 3000);
    }
  };

  const handleEditProfile = () => {
    setIsEditModalOpen(true);
  };

  const handleSaveProfile = (updatedProfile) => {
    updateUserProfile(updatedProfile);
    // Update current user in cookies if this is own profile
    if (isOwnProfile && currentUser) {
      const updatedUser = { ...currentUser, ...updatedProfile };
      Cookies.set('currentUser', JSON.stringify(updatedUser));
      setCurrentUser(updatedUser);
    }
  };

  const handleBackClick = () => {
    navigate(-1);
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case 'balances':
        return <BalancesTab userProfile={userProfile} isOwnProfile={isOwnProfile} />;
      case 'created':
        return <CreatedTab userProfile={userProfile} isOwnProfile={isOwnProfile} />;
      case 'replies':
        return (
          <EmptyTab 
            title="No replies yet"
            description={isOwnProfile ? 'Your replies will appear here' : 'This user hasn\'t made any replies yet'}
          />
        );
      case 'notifications':
        return isOwnProfile ? (
          <EmptyTab 
            title="No notifications"
            description="Your notifications will appear here"
          />
        ) : null;
      default:
        return null;
    }
  };

  // Loading state
  if (loadingProfile) {
    return (
      <div className={`min-h-screen md:mt-40 transition-colors duration-300 ${
        isDark ? 'bg-gray-700' : 'bg-[#EBEBEB]'
      }`}>
        <Header />
        <div className="pt-16 flex">
          <div className={`flex-1 p-3 sm:p-4 lg:p-6 transition-colors duration-300 ${
            isDark ? 'bg-gray-700' : 'bg-[#EBEBEB]'
          }`}>
            <div className="max-w-4xl mx-auto">
              <LoadingProfile />
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Profile not found state
  if (profileNotFound) {
    return (
      <div className={`min-h-screen md:mt-40 transition-colors duration-300 ${
        isDark ? 'bg-gray-700' : 'bg-[#EBEBEB]'
      }`}>
        <Header />
        <div className="pt-16 flex">
          <div className={`flex-1 p-3 sm:p-4 lg:p-6 transition-colors duration-300 ${
            isDark ? 'bg-gray-700' : 'bg-[#EBEBEB]'
          }`}>
            <div className="max-w-4xl mx-auto">
              <ProfileNotFound username={username} onBackClick={handleBackClick} />
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={`min-h-screen md:mt-40 transition-colors duration-300 ${
      isDark ? 'bg-gray-700' : 'bg-[#EBEBEB]'
    }`}>
      <Header />
      
      <div className="pt-16 flex">
        {/* Main Content */}
        <div className={`flex-1 p-2 sm:p-4 lg:p-6 min-h-screen transition-colors duration-300 ${
          isDark ? 'bg-gray-700' : 'bg-[#EBEBEB]'
        }`}>
          <div className="max-w-4xl mx-auto">
            {/* Back Button (only for other user profiles) */}
            {isViewingOtherProfile && (
              <button
                onClick={handleBackClick}
                className={`flex items-center space-x-2 transition-colors mb-4 lg:mb-6 ${
                  isDark 
                    ? 'text-gray-400 hover:text-white' 
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Back</span>
              </button>
            )}

            {/* Profile Header */}
            {(isOwnProfile || isViewingOtherProfile) && userProfile && (
              <ProfileHeader
                userProfile={userProfile}
                isOwnProfile={isOwnProfile}
                publicKey={{ toString: () => userProfile.walletAddr }}
                onCopyAddress={copyAddress}
                onEditProfile={handleEditProfile}
                solBalance={solBalance}
                loadingBalance={loadingBalance}
                solPrice={solPrice}
              />
            )}

            {/* Navigation Tabs */}
            {((isOwnProfile) || isViewingOtherProfile) && userProfile && (
              <>
                <ProfileTabs
                  activeTab={activeTab}
                  onTabChange={setActiveTab}
                  isOwnProfile={isOwnProfile}
                />

                {/* Tab Content */}
                <div className={`backdrop-blur-md rounded-xl border transition-colors duration-300 ${
                  isDark 
                    ? 'bg-gray-900/90 border-gray-700' 
                    : 'bg-white/90 border-gray-200'
                }`}>
                  {renderTabContent()}
                </div>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Edit Profile Modal (only for own profile) */}
      {isOwnProfile && (
        <EditProfileModal 
          isOpen={isEditModalOpen}
          onClose={() => setIsEditModalOpen(false)}
          user={userProfile}
          onSave={handleSaveProfile}
        />
      )}
    </div>
  );
};

export default ProfilePage;