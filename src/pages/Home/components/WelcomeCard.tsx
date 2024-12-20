import React from 'react';
import { useAuthStore } from '../../../store/authStore';
import { GradientCard } from '../../../components/ui/GradientCard';

export const WelcomeCard: React.FC = () => {
  const user = useAuthStore((state) => state.user);

  return (
    <GradientCard>
      <h2 className="text-xl font-semibold mb-2">
        Welcome{user?.fullName ? `, ${user.fullName}` : ''}! 👋
      </h2>
      <p>Ready to create your next amazing deepfake video?</p>
    </GradientCard>
  );
};