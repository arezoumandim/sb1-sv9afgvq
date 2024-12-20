import React from 'react';
import { Card } from 'antd';

interface VideoPlayerProps {
  url: string;
}

export const VideoPlayer: React.FC<VideoPlayerProps> = ({ url }) => {
  return (
    <Card className="mb-6">
      <div className="aspect-video rounded-lg overflow-hidden bg-black">
        <video
          src={url}
          controls
          className="w-full h-full"
          controlsList="nodownload"
          playsInline
        />
      </div>
    </Card>
  );
};