import React from 'react';
import { VideoCard } from './VideoCard';
import { DeepfakeVideo } from '../../../types';

interface DeepfakeListProps {
  videos: DeepfakeVideo[];
  onShare: (videoId: string) => void;
}

export const DeepfakeList: React.FC<DeepfakeListProps> = ({ videos, onShare }) => {
  return (
    <div className="space-y-4">
      {videos.map((video) => (
        <VideoCard
          key={video.id}
          video={video}
          onShare={() => onShare(video.id)}
        />
      ))}
    </div>
  );
};