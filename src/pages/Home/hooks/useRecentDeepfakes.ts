import { useState, useEffect } from 'react';
import { DeepfakeVideo } from '../../../types';
import { generateMockVideos } from '../../../utils/mockData';

export const useRecentDeepfakes = (limit: number = 5) => {
  const [videos, setVideos] = useState<DeepfakeVideo[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRecentVideos = async () => {
      try {
        // Generate mock videos and sort by date
        const mockVideos = generateMockVideos(limit)
          .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
        setVideos(mockVideos);
      } finally {
        setLoading(false);
      }
    };

    fetchRecentVideos();
  }, [limit]);

  return { videos, loading };
};