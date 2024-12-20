import React from 'react';
import { Hero } from './components/Hero';
import { RecentDeepfakes } from './components/RecentDeepfakes';

export const Home: React.FC = () => {
  return (
    <div className="space-y-8">
      <Hero />
      <RecentDeepfakes />
    </div>
  );
};