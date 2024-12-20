import React from 'react';
import { Card, Tag } from 'antd';
import { Calendar } from 'lucide-react';
import { DeepfakeVideo } from '../../../types';

interface VideoInfoProps {
  video: DeepfakeVideo;
}

export const VideoInfo: React.FC<VideoInfoProps> = ({ video }) => {
  return (
    <Card className="mb-6">
      <div className="flex items-center gap-4 mb-4">
        <div className="p-2 bg-blue-50 rounded-full">
          <Calendar className="w-5 h-5 text-blue-600" />
        </div>
        <div>
          <h1 className="text-xl font-semibold">Deepfake Video</h1>
          <p className="text-gray-500">
            Created {new Date(video.createdAt).toLocaleDateString()}
          </p>
        </div>
      </div>
      <div className="space-y-4">
        <div>
          <Tag color="blue">Template Video</Tag>
          <img
            src={video.templateUrl}
            alt="Template"
            className="mt-2 rounded-lg w-32 h-24 object-cover"
          />
        </div>
      </div>
    </Card>
  );
};