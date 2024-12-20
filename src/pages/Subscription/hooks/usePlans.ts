import { useState } from 'react';
import { SubscriptionPlan } from '../../../types';

const MOCK_PLANS: SubscriptionPlan[] = [
  {
    id: 'basic',
    name: 'Basic',
    tokens: 100,
    price: 9.99,
    description: 'Perfect for beginners\nUp to 10 videos per month\n720p video quality',
  },
  {
    id: 'pro',
    name: 'Professional',
    tokens: 500,
    price: 29.99,
    description: 'For regular creators\nUp to 50 videos per month\n1080p video quality\nPriority processing',
  },
  {
    id: 'enterprise',
    name: 'Enterprise',
    tokens: 2000,
    price: 99.99,
    description: 'For power users\nUnlimited videos\n4K video quality\nPriority support\nCustom templates',
  },
];

export const usePlans = () => {
  const [selectedPlan, setSelectedPlan] = useState<SubscriptionPlan | null>(null);
  const [currentPlan] = useState<SubscriptionPlan | null>(MOCK_PLANS[0]);

  return {
    plans: MOCK_PLANS,
    selectedPlan,
    currentPlan,
    selectPlan: setSelectedPlan,
  };
};