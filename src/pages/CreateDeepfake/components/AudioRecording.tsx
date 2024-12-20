import React, { useState } from 'react';
import { Card, Button, Progress, Upload } from 'antd';
import { Mic, Upload as UploadIcon, Square } from 'lucide-react';
import { useDeepfakeCreation } from '../hooks/useDeepfakeCreation';
import { useAudioRecorder } from '../hooks/useAudioRecorder';
import { useDeepfakeStore } from '../../../store/deepfakeStore';
import { useMessage } from '../../../hooks/useMessage';

export const AudioRecording: React.FC = () => {
  const { nextStep } = useDeepfakeCreation();
  const { setAudio, audioUrl: storedAudioUrl } = useDeepfakeStore();
  const [hasAudio, setHasAudio] = useState(!!storedAudioUrl);
  const message = useMessage();
  
  const { 
    isRecording,
    recordingTime,
    startRecording,
    stopRecording,
    audioUrl: recordedAudioUrl
  } = useAudioRecorder();

  const handleAudioUpload = (file: File) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      if (e.target?.result) {
        setAudio(e.target.result as string);
        setHasAudio(true);
        message.success('Audio uploaded successfully');
      }
    };
    reader.readAsDataURL(file);
    return false;
  };

  React.useEffect(() => {
    if (recordedAudioUrl) {
      setAudio(recordedAudioUrl);
      setHasAudio(true);
      message.success('Audio recorded successfully');
    }
  }, [recordedAudioUrl, setAudio, message]);

  const handleContinue = () => {
    if (!hasAudio) {
      message.error('Please upload or record audio first');
      return;
    }
    nextStep();
  };

  return (
    <div className="px-4 sm:px-0 space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card title="Upload Audio" className="h-full">
          <Upload.Dragger
            accept="audio/*"
            showUploadList={false}
            beforeUpload={handleAudioUpload}
            className="mb-4"
          >
            <p className="text-4xl mb-4">
              <UploadIcon className="mx-auto" />
            </p>
            <p className="text-gray-600">
              Click or drag audio file to upload
            </p>
          </Upload.Dragger>
          {storedAudioUrl && (
            <div className="mt-4">
              <audio src={storedAudioUrl} controls className="w-full" />
            </div>
          )}
        </Card>

        <Card title="Record Audio" className="h-full">
          <div className="space-y-4">
            <div className="flex justify-center">
              <Button
                type={isRecording ? 'default' : 'primary'}
                shape="circle"
                size="large"
                icon={isRecording ? <Square className="w-5 h-5" /> : <Mic className="w-5 h-5" />}
                onClick={isRecording ? stopRecording : startRecording}
              />
            </div>
            {isRecording && (
              <div className="text-center">
                <p className="text-lg font-semibold">{recordingTime}s</p>
                <Progress percent={Math.min((recordingTime / 60) * 100, 100)} showInfo={false} />
              </div>
            )}
            {recordedAudioUrl && (
              <div className="flex items-center justify-center">
                <audio src={recordedAudioUrl} controls className="w-full" />
              </div>
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