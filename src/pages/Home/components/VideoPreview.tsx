import React from 'react';
import { Tag } from 'antd';
import { Link } from 'react-router-dom';
import { DeepfakeVideo } from '../../../types';

interface VideoPreviewProps {
  video: DeepfakeVideo;
}

export const VideoPreview: React.FC<VideoPreviewProps> = ({ video }) => {
  const getStatusColor = (status: DeepfakeVideo['status']) => {
    switch (status) {
      case 'completed': return 'success';
      case 'processing': return 'processing';
      case 'failed': return 'error';
      default: return 'default';
    }
  };

  return (
    <Link to={video.shareableLink} className="block">
      <div className="flex items-center gap-4 p-3 rounded-lg hover:bg-gray-50 transition-colors">
        <div className="w-24 h-16 bg-gray-200 rounded overflow-hidden flex-shrink-0">
          <img 
            src={video.templateUrl} 
            alt="Video preview" 
            className="w-full h-full object-cover"
          />
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between mb-1">
            <Tag color={getStatusColor(video.status)}>
              {video.status.charAt(0).toUpperCase() + video.status.slice(1)}
            </Tag>
            <span className="text-sm text-gray-500">
              {new Date(video.createdAt).toLocaleDateString()}
            </span>
          </div>
          <p className="text-sm text-gray-600 truncate">
            Created using template #{video.id}
          </p>
        </div>
      </div>
    </Link>
  );
};