import React from 'react';
import { Card, Tag, Button, Tooltip } from 'antd';
import { Share2, Download, ExternalLink } from 'lucide-react';
import { Link } from 'react-router-dom';
import { DeepfakeVideo } from '../../../types';

interface VideoCardProps {
  video: DeepfakeVideo;
  onShare: () => void;
}

export const VideoCard: React.FC<VideoCardProps> = ({ video, onShare }) => {
  const getStatusColor = (status: DeepfakeVideo['status']) => {
    switch (status) {
      case 'completed': return 'success';
      case 'processing': return 'processing';
      case 'failed': return 'error';
      default: return 'default';
    }
  };

  return (
    <Card className="mb-4">
      <div className="flex items-center gap-4">
        <div className="w-32 h-24 bg-gray-200 rounded-lg overflow-hidden flex-shrink-0">
          <img 
            src={video.templateUrl} 
            alt="Video preview" 
            className="w-full h-full object-cover"
          />
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between mb-2">
            <Tag color={getStatusColor(video.status)}>
              {video.status.charAt(0).toUpperCase() + video.status.slice(1)}
            </Tag>
            <span className="text-sm text-gray-500">
              {new Date(video.createdAt).toLocaleDateString()}
            </span>
          </div>
          {video.status === 'completed' && (
            <div className="flex flex-wrap gap-2">
              <Tooltip title="Share">
                <Button 
                  type="text" 
                  icon={<Share2 className="w-4 h-4" />}
                  onClick={onShare}
                />
              </Tooltip>
              <Tooltip title="Download">
                <Button
                  type="text"
                  icon={<Download className="w-4 h-4" />}
                  onClick={() => {/* TODO: Implement download */}}
                />
              </Tooltip>
              <Tooltip title="View">
                <Link to={video.shareableLink}>
                  <Button
                    type="text"
                    icon={<ExternalLink className="w-4 h-4" />}
                  />
                </Link>
              </Tooltip>
            </div>
          )}
        </div>
      </div>
    </Card>
  );
};