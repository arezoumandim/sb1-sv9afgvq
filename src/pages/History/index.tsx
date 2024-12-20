import React, { useState } from 'react';
import { Empty, Spin } from 'antd';
import { DeepfakeList } from './components/DeepfakeList';
import { FilterBar } from './components/FilterBar';
import { useHistoryData } from './hooks/useHistoryData';
import { MediaCaptureDrawer } from '../../components/ui/MediaCaptureDrawer';

export const History: React.FC = () => {
  const { videos, loading, filters, setFilters } = useHistoryData();
  const [shareDrawerOpen, setShareDrawerOpen] = useState(false);
  const [selectedVideoId, setSelectedVideoId] = useState<string | null>(null);

  const handleShare = (videoId: string) => {
    setSelectedVideoId(videoId);
    setShareDrawerOpen(true);
  };

  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-semibold mb-6">Deepfake History</h1>
      <FilterBar
        filters={filters}
        onChange={setFilters}
      />
      {loading ? (
        <div className="flex justify-center py-12">
          <Spin size="large" />
        </div>
      ) : videos.length > 0 ? (
        <DeepfakeList
          videos={videos}
          onShare={handleShare}
        />
      ) : (
        <Empty
          description="No videos found"
          className="py-12"
        />
      )}
      
      {selectedVideoId && (
        <MediaCaptureDrawer
          open={shareDrawerOpen}
          onClose={() => setShareDrawerOpen(false)}
          type="photo"
          onCapture={() => {}}
        />
      )}
    </div>
  );
};