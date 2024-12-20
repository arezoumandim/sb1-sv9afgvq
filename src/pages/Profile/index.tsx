import React from 'react';
import { ProfileInfo } from './components/ProfileInfo';
import { SecuritySettings } from './components/SecuritySettings';
import { NotificationSettings } from './components/NotificationSettings';
import { TokenInfo } from './components/TokenInfo';
import { useAuthStore } from '../../store/authStore';

export const Profile: React.FC = () => {
  const user = useAuthStore((state) => state.user);

  if (!user) return null;

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold mb-6">Profile Settings</h1>
      <ProfileInfo user={user} />
      <TokenInfo />
      <SecuritySettings />
      <NotificationSettings />
    </div>
  );
};