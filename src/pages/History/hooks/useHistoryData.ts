import { useState, useEffect } from 'react';
import { DeepfakeVideo } from '../../../types';
import { generateMockVideos } from '../../../utils/mockData';

export const useHistoryData = () => {
  const [videos, setVideos] = useState<DeepfakeVideo[]>([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({
    status: 'all',
    dateRange: null as [Date, Date] | null,
  });

  useEffect(() => {
    // Simulate API call
    const fetchVideos = async () => {
      setLoading(true);
      try {
        // Generate 10 mock videos
        const mockVideos = generateMockVideos(10);
        
        // Apply filters
        let filtered = mockVideos;
        
        if (filters.status !== 'all') {
          filtered = filtered.filter(video => video.status === filters.status);
        }
        
        if (filters.dateRange) {
          const [start, end] = filters.dateRange;
          filtered = filtered.filter(video => {
            const date = new Date(video.createdAt);
            return date >= start && date <= end;
          });
        }
        
        setVideos(filtered);
      } finally {
        setLoading(false);
      }
    };

    fetchVideos();
  }, [filters]);

  return {
    videos,
    loading,
    filters,
    setFilters,
  };
};