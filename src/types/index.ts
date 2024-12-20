export interface User {
  id: string;
  phone: string;
  fullName?: string;
  email?: string;
  avatarUrl?: string;
  tokens: number;
}

export interface SubscriptionPlan {
  id: string;
  name: string;
  tokens: number;
  price: number;
  description: string;
}

export interface DeepfakeVideo {
  id: string;
  userId: string;
  status: 'processing' | 'completed' | 'failed';
  templateUrl: string;
  faceImageUrl: string;
  audioUrl: string;
  resultUrl?: string;
  shareableLink?: string;
  createdAt: Date;
}