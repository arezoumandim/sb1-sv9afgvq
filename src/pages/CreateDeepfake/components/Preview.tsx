import React from 'react';
import { Card, Button, Alert, Divider } from 'antd';
import { useNavigate } from 'react-router-dom';
import { useDeepfakeStore } from '../../../store/deepfakeStore';
import { ShareButtons } from '../../../components/ui/ShareButtons';

export const Preview: React.FC = () => {
  const navigate = useNavigate();
  const { templateId, faceImage, audioUrl, reset } = useDeepfakeStore();

  const handleCreateAnother = () => {
    reset();
    navigate('/create');
  };

  // TODO: Replace with actual video URL
  const mockVideoUrl = 'https://example.com/deepfake-video';

  return (
    <div className="space-y-6 px-4 sm:px-0">
      <Card>
        <div className="aspect-video bg-gray-100 rounded-lg mb-6">
          {faceImage && (
            <img 
              src={faceImage} 
              alt="Preview" 
              className="w-full h-full object-cover rounded-lg"
            />
          )}
        </div>
        
        {audioUrl && (
          <div className="mb-6">
            <audio src={audioUrl} controls className="w-full" />
          </div>
        )}

        <Alert
          message="Processing Video"
          description="Your deepfake video is being processed. This may take a few minutes."
          type="info"
          showIcon
          className="mb-6"
        />

        <Divider>Share Your Video</Divider>
        
        <ShareButtons url={mockVideoUrl} />

        <Divider />

        <div className="flex justify-end space-x-4">
          <Button onClick={() => navigate('/history')}>
            View in History
          </Button>
          <Button type="primary" onClick={handleCreateAnother}>
            Create Another
          </Button>
        </div>
      </Card>
    </div>
  );
};