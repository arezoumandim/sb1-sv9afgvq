import { DeepfakeVideo } from '../types';

export const generateMockVideos = (count: number): DeepfakeVideo[] => {
  const statuses: DeepfakeVideo['status'][] = ['completed', 'processing', 'failed'];
  const templates = [
    'https://images.unsplash.com/photo-1557804506-669a67965ba0',
    'https://images.unsplash.com/photo-1460925895917-afdab827c52f',
    'https://images.unsplash.com/photo-1509062522246-3755977927d7',
  ];

  return Array.from({ length: count }, (_, i) => ({
    id: `video-${i + 1}`,
    userId: '1',
    status: statuses[Math.floor(Math.random() * statuses.length)],
    templateUrl: templates[Math.floor(Math.random() * templates.length)],
    faceImageUrl: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80',
    audioUrl: '',
    resultUrl: 'https://example.com/video.mp4',
    shareableLink: `/shared/video-${i + 1}`,
    createdAt: new Date(Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000),
  }));
};