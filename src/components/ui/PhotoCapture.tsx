import React from 'react';
import { Button } from 'antd';
import { Camera } from 'lucide-react';
import { useWebcam } from '../../hooks/useWebcam';

interface PhotoCaptureProps {
  onCapture: (data: string) => void;
}

export const PhotoCapture: React.FC<PhotoCaptureProps> = ({ onCapture }) => {
  const { webcamRef, captureImage, showWebcam, toggleWebcam } = useWebcam();

  const handleCapture = () => {
    const imageData = captureImage();
    if (imageData) {
      onCapture(imageData);
    }
  };

  return (
    <div className="space-y-4">
      <div className="relative aspect-video bg-gray-100 rounded-lg overflow-hidden">
        {showWebcam ? (
          <video
            ref={webcamRef}
            autoPlay
            playsInline
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="flex items-center justify-center h-full">
            <Camera className="w-12 h-12 text-gray-400" />
          </div>
        )}
      </div>
      <div className="flex gap-2">
        <Button block onClick={toggleWebcam}>
          {showWebcam ? 'Stop Camera' : 'Start Camera'}
        </Button>
        {showWebcam && (
          <Button block type="primary" onClick={handleCapture}>
            Capture
          </Button>
        )}
      </div>
    </div>
  );
};