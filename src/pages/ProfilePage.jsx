/*
 * PROFILE PAGE REDIRECT (for backward compatibility)
 * This component is kept to ensure old /profile/:username links continue to work.
 * The main profile component is now StreamerProfilePage at: src/pages/streamer/ProfilePage.jsx
 * 
 * Note: The route /profile/:username now uses StreamerProfilePage directly in App.jsx
 * This file is only used if explicitly imported elsewhere.
 * 
 * Date updated: 2025-10-27
 */

// This component is no longer needed as the route now directly uses StreamerProfilePage
// Keeping this file for reference and backward compatibility
const ProfilePage = () => null;

export default ProfilePage;
