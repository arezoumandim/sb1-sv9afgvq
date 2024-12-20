import React from 'react';
import { Drawer, Button, Tabs } from 'antd';
import { Upload as UploadIcon, Camera, Mic } from 'lucide-react';
import { MediaUploader } from './MediaUploader';
import { PhotoCapture } from './PhotoCapture';
import { AudioRecorder } from './AudioRecorder';

interface MediaCaptureDrawerProps {
  open: boolean;
  onClose: () => void;
  type: 'photo' | 'audio';
  onCapture: (data: string) => void;
}

export const MediaCaptureDrawer: React.FC<MediaCaptureDrawerProps> = ({
  open,
  onClose,
  type,
  onCapture,
}) => {
  const items = [
    {
      key: 'upload',
      label: (
        <span className="flex items-center gap-2">
          <UploadIcon className="w-4 h-4" />
          Upload
        </span>
      ),
      children: (
        <MediaUploader
          type={type}
          onUpload={(file) => {
            onCapture(file);
            onClose();
          }}
        />
      ),
    },
    {
      key: 'capture',
      label: (
        <span className="flex items-center gap-2">
          {type === 'photo' ? (
            <Camera className="w-4 h-4" />
          ) : (
            <Mic className="w-4 h-4" />
          )}
          {type === 'photo' ? 'Take Photo' : 'Record'}
        </span>
      ),
      children: type === 'photo' ? (
        <PhotoCapture
          onCapture={(data) => {
            onCapture(data);
            onClose();
          }}
        />
      ) : (
        <AudioRecorder
          onRecord={(data) => {
            onCapture(data);
            onClose();
          }}
        />
      ),
    },
  ];

  return (
    <Drawer
      title={type === 'photo' ? 'Add Photo' : 'Add Audio'}
      placement="right"
      width={420}
      onClose={onClose}
      open={open}
    >
      <Tabs
        items={items}
        className="h-full"
        defaultActiveKey="upload"
      />
    </Drawer>
  );
};