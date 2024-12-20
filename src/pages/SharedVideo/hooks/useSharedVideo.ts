import { useState, useEffect } from 'react';
import { DeepfakeVideo } from '../../../types';

export const useSharedVideo = (id: string | undefined) => {
  const [video, setVideo] = useState<DeepfakeVideo | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchVideo = async () => {
      if (!id) {
        setError(new Error('Invalid video ID'));
        setIsLoading(false);
        return;
      }

      try {
        // TODO: Replace with actual API call
        const mockVideo: DeepfakeVideo = {
          id,
          userId: '1',
          status: 'completed',
          templateUrl: 'https://images.unsplash.com/photo-1557804506-669a67965ba0',
          faceImageUrl: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80',
          audioUrl: '',
          resultUrl: 'https://example.com/video.mp4',
          shareableLink: window.location.href,
          createdAt: new Date(),
        };
        
        setVideo(mockVideo);
      } catch (err) {
        setError(err instanceof Error ? err : new Error('Failed to fetch video'));
      } finally {
        setIsLoading(false);
      }
    };

    fetchVideo();
  }, [id]);

  return { video, isLoading, error };
};