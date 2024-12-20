import React, { useState } from 'react';
import { Card, Upload, Button } from 'antd';
import { Camera, Upload as UploadIcon } from 'lucide-react';
import { useDeepfakeCreation } from '../hooks/useDeepfakeCreation';
import { useWebcam } from '../hooks/useWebcam';
import { useDeepfakeStore } from '../../../store/deepfakeStore';
import { useMessage } from '../../../hooks/useMessage';

export const FaceUpload: React.FC = () => {
  const { nextStep } = useDeepfakeCreation();
  const { webcamRef, captureImage, showWebcam, toggleWebcam } = useWebcam();
  const { setFaceImage, faceImage } = useDeepfakeStore();
  const message = useMessage();

  const handleImageUpload = async (file: File) => {
    try {
      const reader = new FileReader();
      reader.onloadend = () => {
        if (reader.result) {
          setFaceImage(reader.result as string);
        }
      };
      reader.readAsDataURL(file);
      return false; // Prevent default upload behavior
    } catch (error) {
      message.error('Failed to upload image');
      return false;
    }
  };

  const handleCapture = () => {
    const imageData = captureImage();
    if (imageData) {
      setFaceImage(imageData);
      message.success('Image captured successfully');
    }
  };

  const handleContinue = () => {
    if (!faceImage) {
      message.error('Please upload or capture an image first');
      return;
    }
    nextStep();
  };

  return (
    <div className="px-4 sm:px-0 space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card title="Upload Image" className="h-full">
          <Upload.Dragger
            accept="image/*"
            showUploadList={false}
            beforeUpload={handleImageUpload}
            className="mb-4"
          >
            <p className="text-4xl mb-4">
              <UploadIcon className="mx-auto" />
            </p>
            <p className="text-gray-600">
              Click or drag image to upload
            </p>
          </Upload.Dragger>
          {faceImage && (
            <div className="mt-4">
              <img 
                src={faceImage} 
                alt="Uploaded face" 
                className="w-full h-32 object-cover rounded-lg"
              />
            </div>
          )}
        </Card>

        <Card title="Take Photo" className="h-full">
          <div className="relative aspect-video bg-gray-100 rounded-lg overflow-hidden mb-4">
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
          <div className="flex flex-col sm:flex-row gap-2">
            <Button block onClick={toggleWebcam}>
              {showWebcam ? 'Stop Camera' : 'Start Camera'}
            </Button>
            {showWebcam && (
              <Button block type="primary" onClick={handleCapture}>
                Capture
              </Button>
            )}
          </div>
        </Card>
      </div>

      <div className="flex justify-end">
        <Button type="primary" onClick={handleContinue}>
          Continue
        </Button>
      </div>
    </div>
  );
};