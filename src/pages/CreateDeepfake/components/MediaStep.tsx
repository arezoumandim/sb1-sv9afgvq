import React, { useState } from 'react';
import { Button, Card } from 'antd';
import { Camera, Mic } from 'lucide-react';
import { MediaCaptureDrawer } from '../../../components/ui/MediaCaptureDrawer';
import { useDeepfakeStore } from '../../../store/deepfakeStore';
import { useDeepfakeCreation } from '../hooks/useDeepfakeCreation';
import { useMessage } from '../../../hooks/useMessage';

interface MediaStepProps {
  type: 'photo' | 'audio';
}

export const MediaStep: React.FC<MediaStepProps> = ({ type }) => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const { setFaceImage, setAudio, faceImage, audioUrl } = useDeepfakeStore();
  const { nextStep } = useDeepfakeCreation();
  const message = useMessage();

  const handleCapture = (data: string) => {
    if (type === 'photo') {
      setFaceImage(data);
    } else {
      setAudio(data);
    }
    message.success(`${type === 'photo' ? 'Image' : 'Audio'} added successfully`);
  };

  const handleContinue = () => {
    if (type === 'photo' && !faceImage) {
      message.error('Please add a photo first');
      return;
    }
    if (type === 'audio' && !audioUrl) {
      message.error('Please add audio first');
      return;
    }
    nextStep();
  };

  const currentMedia = type === 'photo' ? faceImage : audioUrl;

  return (
    <div className="px-4 sm:px-0 space-y-4">
      <Card className="text-center py-12">
        {!currentMedia ? (
          <Button
            type="primary"
            size="large"
            icon={type === 'photo' ? <Camera className="w-5 h-5" /> : <Mic className="w-5 h-5" />}
            onClick={() => setDrawerOpen(true)}
          >
            {type === 'photo' ? 'Add Photo' : 'Add Audio'}
          </Button>
        ) : (
          <div className="space-y-4">
            {type === 'photo' ? (
              <img
                src={currentMedia}
                alt="Selected face"
                className="max-w-xs mx-auto rounded-lg"
              />
            ) : (
              <audio src={currentMedia} controls className="max-w-xs mx-auto" />
            )}
            <Button onClick={() => setDrawerOpen(true)}>
              Change {type === 'photo' ? 'Photo' : 'Audio'}
            </Button>
          </div>
        )}
      </Card>

      <div className="flex justify-end">
        <Button type="primary" onClick={handleContinue}>
          Continue
        </Button>
      </div>

      <MediaCaptureDrawer
        type={type}
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        onCapture={handleCapture}
      />
    </div>
  );
};