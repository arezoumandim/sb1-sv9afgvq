import React from 'react';
import { useParams } from 'react-router-dom';
import { VideoPlayer } from './components/VideoPlayer';
import { VideoInfo } from './components/VideoInfo';
import { ShareSection } from './components/ShareSection';
import { useSharedVideo } from './hooks/useSharedVideo';

export const SharedVideo: React.FC = () => {
  const { id } = useParams();
  const { video, isLoading, error } = useSharedVideo(id);

  if (isLoading) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  }

  if (error || !video) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        Video not found or has been removed
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <VideoPlayer url={video.resultUrl} />
      <VideoInfo video={video} />
      <ShareSection url={window.location.href} />
    </div>
  );
};