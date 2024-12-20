import React from 'react';
import { Card, Empty, Spin } from 'antd';
import { useNavigate } from 'react-router-dom';
import { Clock } from 'lucide-react';
import { useRecentDeepfakes } from '../hooks/useRecentDeepfakes';
import { VideoPreview } from './VideoPreview';

export const RecentDeepfakes: React.FC = () => {
  const navigate = useNavigate();
  const { videos, loading } = useRecentDeepfakes(3);

  return (
    <Card 
      title={
        <div className="flex items-center space-x-2">
          <Clock className="w-5 h-5" />
          <span>Recent Deepfakes</span>
        </div>
      }
      extra={
        <a onClick={() => navigate('/history')} className="text-blue-600">
          View All
        </a>
      }
    >
      {loading ? (
        <div className="flex justify-center py-8">
          <Spin />
        </div>
      ) : videos.length > 0 ? (
        <div className="space-y-4">
          {videos.map((video) => (
            <VideoPreview key={video.id} video={video} />
          ))}
        </div>
      ) : (
        <Empty description="No recent deepfakes" />
      )}
    </Card>
  );
};