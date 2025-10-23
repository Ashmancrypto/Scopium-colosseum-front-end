import React, { useState, useEffect } from 'react';
import { Upload, X, Loader } from 'lucide-react';
import { useToastContext } from '../../contexts/ToastContext.jsx';
import { checkUsernameAvailability, updateProfile } from '../../api/user/index.js';
import { getUser } from '../../utils/index.js';

const FirstTimeUsernameModal = () => {
  const toast = useToastContext();
  const [open, setOpen] = useState(false);
  const [username, setUsername] = useState('');
  const [bio, setBio] = useState('');
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    try {
      const flag = localStorage.getItem('usernameIsDefault');
      const user = getUser();
      if (flag === '1' && user) {
        setUsername(user.username || '');
        setOpen(true);
      }
    } catch (err) {
      // ignore
    }
  }, []);

  const close = () => setOpen(false);

  const handleSave = async () => {
    try {
      if (!username || username.trim().length < 3) {
        return toast.error('Choose a username with at least 3 characters');
      }
      setSaving(true);
      const available = await checkUsernameAvailability(username.trim());
      if (!available) {
        setSaving(false);
        return toast.error('Username is taken, try another.');
      }

      const formData = new FormData();
      formData.append('username', username.trim());
      formData.append('bio', bio);

      const res = await updateProfile(formData);
      if (res && res.status === 200) {
        // clear flag and update local token/user
        localStorage.removeItem('usernameIsDefault');
        const user = getUser();
        const updatedUser = { ...user, username: username.trim() };
        localStorage.setItem('token', localStorage.getItem('token')); // keep token
        // Update cookie used elsewhere
        try { window.__setCurrentUser && window.__setCurrentUser(updatedUser); } catch (e) {}
        toast.success('Profile updated', 'Your username has been saved');
        setOpen(false);
      } else {
        throw new Error('Failed to update profile');
      }
    } catch (err) {
      console.error('FirstTimeUsernameModal error:', err);
      toast.error('Failed to save username', err.message || 'Please try again');
    } finally {
      setSaving(false);
    }
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/70"></div>
      <div className="relative w-full max-w-md rounded-2xl bg-white p-6 z-10">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold">Welcome — choose a username</h3>
          <button onClick={close}><X /></button>
        </div>

        <div className="space-y-4">
          <div>
            <label className="block text-sm mb-1">Username</label>
            <input value={username} onChange={(e) => setUsername(e.target.value)} className="w-full border rounded px-3 py-2" />
          </div>
          <div>
            <label className="block text-sm mb-1">Bio (optional)</label>
            <textarea value={bio} onChange={(e) => setBio(e.target.value)} className="w-full border rounded px-3 py-2" />
          </div>

          <div className="flex space-x-2">
            <button onClick={close} className="flex-1 px-3 py-2 border rounded">Cancel</button>
            <button onClick={handleSave} className="flex-1 bg-pink-500 text-white px-3 py-2 rounded">
              {saving ? <><Loader className="inline-block w-4 h-4 animate-spin"/> Saving...</> : 'Save username'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FirstTimeUsernameModal;
