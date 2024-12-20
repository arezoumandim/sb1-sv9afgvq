import React from 'react';
import { Button, Progress } from 'antd';
import { Mic, Square } from 'lucide-react';
import { useAudioRecorder } from '../../hooks/useAudioRecorder';

interface AudioRecorderProps {
  onRecord: (audioUrl: string) => void;
}

export const AudioRecorder: React.FC<AudioRecorderProps> = ({ onRecord }) => {
  const {
    isRecording,
    recordingTime,
    startRecording,
    stopRecording,
    audioUrl,
  } = useAudioRecorder();

  React.useEffect(() => {
    if (audioUrl) {
      onRecord(audioUrl);
    }
  }, [audioUrl, onRecord]);

  return (
    <div className="space-y-6">
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
      {audioUrl && (
        <div className="flex items-center justify-center">
          <audio src={audioUrl} controls className="w-full" />
        </div>
      )}
    </div>
  );
};