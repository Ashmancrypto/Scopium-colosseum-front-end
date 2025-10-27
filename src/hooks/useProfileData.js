import { useState, useEffect } from 'react';
import { useWallet } from '@solana/wallet-adapter-react';
import { getProfileInfo } from '../api/user/index.js';
import { getUser } from '../utils/index.js';
import { connection } from '../config/configSolana/index.js';
import { LAMPORTS_PER_SOL } from '@solana/web3.js';

export const useProfileData = (username) => {
  const { publicKey, connected } = useWallet();
  const [currentUser, setCurrentUser] = useState(null);
  const [userProfile, setUserProfile] = useState(null);
  const [loadingProfile, setLoadingProfile] = useState(false);
  const [profileNotFound, setProfileNotFound] = useState(false);
  const [solBalance, setSolBalance] = useState(0);
  const [loadingBalance, setLoadingBalance] = useState(false);

  // Determine profile type
  const isOwnProfile = !username || (connected && currentUser && currentUser.username === username);
  const isViewingOtherProfile = username && (!currentUser || currentUser.username !== username);

  // Load current user from cookies
  useEffect(() => {
    const user = getUser();
    setCurrentUser(user);
  }, []);

  // Fetch user profile information
  useEffect(() => {
    const fetchProfileInfo = async () => {
      if (isViewingOtherProfile) {
        // Fetch other user's profile by username
        try {
          setLoadingProfile(true);
          setProfileNotFound(false);
          
          const result = await getProfileInfo(username);
          
          if (result) {
            setUserProfile({
              username: result.username || username,
              bio: result.bio || '',
              avatar: result.avatar || null,
              walletAddr: result.walletAddr,
              coinsCreated: result.coinsCreated || [],
              coinsHeld: result.coinsHeld || []
            });
          } else {
            setProfileNotFound(true);
          }
        } catch (error) {
          console.error('Error fetching user profile:', error);
          setProfileNotFound(true);
        } finally {
          setLoadingProfile(false);
        }
      } else if (isOwnProfile && currentUser) {
        // Fetch current user's profile using getProfileInfo
        try {
          setLoadingProfile(true);
          
          const result = await getProfileInfo(currentUser.username);
          
          if (result) {
            setUserProfile({
              username: result.username || currentUser.username,
              bio: result.bio || '',
              avatar: result.avatar || currentUser.avatar || null,
              walletAddr: publicKey?.toString(),
              coinsCreated: result.coinsCreated || [],
              coinsHeld: result.coinsHeld || []
            });
          } else {
            // Fallback to current user data
            setUserProfile({
              username: currentUser.username || '',
              bio: '',
              avatar: currentUser.avatar || null,
              walletAddr: publicKey?.toString(),
              coinsCreated: [],
              coinsHeld: []
            });
          }
        } catch (error) {
          console.error('Error fetching user profile:', error);
          // Fallback to current user data
          setUserProfile({
            username: currentUser.username || '',
            bio: '',
            avatar: currentUser.avatar || null,
            walletAddr: publicKey?.toString(),
            coinsCreated: [],
            coinsHeld: []
          });
        } finally {
          setLoadingProfile(false);
        }
      }
    };

    fetchProfileInfo();
  }, [username, publicKey, currentUser, isOwnProfile, isViewingOtherProfile]);

  // Fetch SOL balance (only for own profile)
  useEffect(() => {
    const fetchBalance = async () => {
      if (!isOwnProfile || !publicKey || !connected) return;
      
      try {
        setLoadingBalance(true);
        const balance = await connection.getBalance(publicKey);
        setSolBalance(balance / LAMPORTS_PER_SOL);
      } catch (error) {
        console.error('Error fetching balance:', error);
        setSolBalance(0);
      } finally {
        setLoadingBalance(false);
      }
    };

    fetchBalance();
  }, [publicKey, connected, isOwnProfile]);

  const updateUserProfile = (updatedProfile) => {
    setUserProfile(prev => ({ ...prev, ...updatedProfile }));
  };

  return {
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
  };
};