import React from 'react';
import { Upload } from 'antd';
import { Upload as UploadIcon } from 'lucide-react';

interface MediaUploaderProps {
  type: 'photo' | 'audio';
  onUpload: (file: string) => void;
}

export const MediaUploader: React.FC<MediaUploaderProps> = ({ type, onUpload }) => {
  const handleUpload = async (file: File) => {
    try {
      const reader = new FileReader();
      reader.onload = () => {
        if (reader.result) {
          onUpload(reader.result as string);
        }
      };
      reader.readAsDataURL(file);
    } catch (error) {
      console.error('Error uploading file:', error);
    }
    return false; // Prevent default upload
  };

  return (
    <Upload.Dragger
      accept={type === 'photo' ? 'image/*' : 'audio/*'}
      showUploadList={false}
      beforeUpload={handleUpload}
      className="h-80"
    >
      <p className="text-4xl mb-4">
        <UploadIcon className="mx-auto" />
      </p>
      <p className="text-gray-600">
        Click or drag {type === 'photo' ? 'image' : 'audio'} to upload
      </p>
    </Upload.Dragger>
  );
};