import React, { useState, useEffect } from 'react';
import { Loader, Edit, Upload, X } from 'lucide-react';
import { useToastContext } from '../../contexts/ToastContext.jsx';
import { updateProfile } from '../../api/user/index.js';
import { useTheme } from '../../contexts/ThemeContext.jsx';

const EditProfileModal = ({ isOpen, onClose, user, onSave }) => {
  const { isDark } = useTheme();
  const toast = useToastContext();
  const [username, setUsername] = useState('');
  const [bio, setBio] = useState('');
  const [avatar, setAvatar] = useState(null);
  const [avatarPreview, setAvatarPreview] = useState('');
  const [saving, setSaving] = useState(false);

  // Initialize form with user data
  useEffect(() => {
    if (isOpen && user) {
      setUsername(user.username || '');
      setBio(user.bio || '');
      setAvatarPreview('');
      setAvatar(null);
    }
  }, [isOpen, user]);

  // Handle body scroll when modal is open/closed
  useEffect(() => {
    if (isOpen) {
      const scrollY = window.scrollY;
      document.body.style.position = 'fixed';
      document.body.style.top = `-${scrollY}px`;
      document.body.style.width = '100%';
      document.body.style.overflow = 'hidden';
      
      return () => {
        document.body.style.position = '';
        document.body.style.top = '';
        document.body.style.width = '';
        document.body.style.overflow = '';
        window.scrollTo(0, scrollY);
      };
    }
  }, [isOpen]);

  const handleAvatarChange = (e) => {
    if (e.target.files.length > 0) {
      const file = e.target.files[0];
      setAvatar(file);
      
      // Create preview
      const reader = new FileReader();
      reader.onload = (e) => {
        setAvatarPreview(e.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSave = async () => {
    try {
      setSaving(true);
      
      // Create FormData for API call
      const formData = new FormData();
      formData.append('username', username);
      formData.append('bio', bio);
      if (avatar) {
        formData.append('avatar', avatar);
      }

      // Call updateProfile API
      const result = await updateProfile(formData);

      console.log('Update Profile Result:', result);
      
      if (result && result.status === 200 && result.statusText === "OK") {
        toast.success('Profile Updated', 'Your profile has been updated successfully', 3000);
        
        // Call onSave callback with updated data
        onSave({
          username,
          bio,
        });
        
        onClose();
      } else {
        throw new Error(result?.message || 'Please make sure if you uploaded large size image');
      }
    } catch (error) {
      console.error('Error updating profile:', error);
      toast.error('Update Failed', error.message || 'Failed to update profile. Please try again.', 5000);
    } finally {
      setSaving(false);
    }
  };

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget && !saving) {
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 z-[9999] flex items-center justify-center p-4"
      style={{ 
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0
      }}
    >
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/80 backdrop-blur-sm"
        onClick={handleBackdropClick}
      ></div>
      
      {/* Modal */}
      <div 
        className={`relative rounded-2xl shadow-2xl w-full max-w-md border transition-colors duration-300 ${
          isDark ? 'bg-gray-700 border-gray-700' : 'bg-white border-gray-200'
        }`}
        style={{
          maxHeight: '90vh',
          overflow: 'hidden'
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className={`flex items-center justify-between p-6 border-b transition-colors duration-300 ${
          isDark ? 'border-gray-700' : 'border-gray-200'
        }`}>
          <h2 className={`text-xl font-semibold transition-colors duration-300 ${
            isDark ? 'text-white' : 'text-gray-900'
          }`}>Edit Profile</h2>
          <button 
            onClick={!saving ? onClose : undefined}
            disabled={saving}
            className={`p-2 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed ${
              isDark 
                ? 'text-gray-400 hover:text-white hover:bg-[#1A1A1A]' 
                : 'text-gray-600 hover:text-gray-900 hover:bg-gray-200'
            }`}
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          {/* Avatar Upload */}
          <div className="text-center">
            <div className="relative inline-block">
              <div className={`w-20 h-20 rounded-full overflow-hidden border-3 bg-gray-700 transition-colors duration-300 ${
                isDark ? 'border-gray-600' : 'border-gray-300'
              }`}>
                {avatarPreview ? (
                  <img 
                    src={avatarPreview} 
                    alt="Avatar preview" 
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center p-3">
                    <img 
                      src="/images/logo.svg" 
                      alt="Default Avatar" 
                      className="w-full h-full object-contain"
                    />
                  </div>
                )}
              </div>
              <label 
                htmlFor="avatar-upload"
                className={`absolute -bottom-1 -right-1 text-white p-2 rounded-full cursor-pointer transition-colors ${
                  isDark 
                    ? 'bg-green-500 hover:bg-green-600' 
                    : 'bg-pink-500 hover:bg-pink-600'
                }`}
              >
                <Upload className="w-4 h-4" />
                <input
                  id="avatar-upload"
                  type="file"
                  accept="image/*"
                  onChange={handleAvatarChange}
                  disabled={saving}
                  className="hidden"
                />
              </label>
            </div>
            <p className={`text-sm mt-2 transition-colors duration-300 ${
              isDark ? 'text-gray-400' : 'text-gray-600'
            }`}>Click the icon to change avatar</p>
          </div>

          {/* Username */}
          <div>
            <label className={`block text-sm font-medium mb-2 transition-colors duration-300 ${
              isDark ? 'text-gray-300' : 'text-gray-700'
            }`}>
              Username
            </label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              disabled={saving}
              className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:border-transparent transition-all text-sm disabled:opacity-50 disabled:cursor-not-allowed ${
                isDark 
                  ? 'focus:ring-green-500' 
                  : 'focus:ring-pink-500'
              } ${
                isDark 
                 ? 'bg-gray-600 border-gray-600 text-white placeholder-gray-500' 
                  : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500'
              }`}
              placeholder="Enter username"
            />
          </div>

          {/* Bio */}
          <div>
            <label className={`block text-sm font-medium mb-2 transition-colors duration-300 ${
              isDark ? 'text-gray-300' : 'text-gray-700'
            }`}>
              Bio
            </label>
            <textarea
              value={bio}
              onChange={(e) => setBio(e.target.value)}
              disabled={saving}
              rows="3"
              className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:border-transparent transition-all resize-none text-sm disabled:opacity-50 disabled:cursor-not-allowed ${
                isDark 
                  ? 'focus:ring-green-500' 
                  : 'focus:ring-pink-500'
              } ${
                isDark 
                 ? 'bg-gray-600 border-gray-600 text-white placeholder-gray-500' 
                  : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500'
              }`}
              placeholder="Tell us about yourself..."
            />
          </div>

          {/* Action Buttons */}
          <div className="flex space-x-3 pt-4">
            <button
              onClick={onClose}
              disabled={saving}
              className={`flex-1 px-4 py-2 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed ${
                isDark 
                  ? 'bg-gray-700 hover:bg-gray-600 text-white' 
                  : 'bg-gray-200 hover:bg-gray-300 text-gray-900'
              }`}
            >
              Cancel
            </button>
            <button
              onClick={handleSave}
              disabled={saving}
              className={`flex-1 text-white px-4 py-2 rounded-lg font-medium transition-all duration-200 transform hover:scale-105 disabled:transform-none disabled:cursor-not-allowed flex items-center justify-center space-x-2 ${
                saving 
                  ? 'bg-gradient-to-r disabled:from-gray-600 disabled:to-gray-700'
                  : isDark 
                    ? 'bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700'
                    : 'bg-gradient-to-r from-pink-500 to-pink-600 hover:from-pink-600 hover:to-pink-700'
              }`}
            >
              {saving ? (
                <>
                  <Loader className="w-4 h-4 animate-spin" />
                  <span>Saving...</span>
                </>
              ) : (
                <span>Save Changes</span>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditProfileModal;