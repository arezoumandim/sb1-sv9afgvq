import React from 'react';
import { Card, Progress } from 'antd';
import { Coins } from 'lucide-react';
import { useAuthStore } from '../../../store/authStore';

export const TokenUsage: React.FC = () => {
  const user = useAuthStore((state) => state.user);
  const totalTokens = 100; // TODO: Get from subscription plan
  const usedTokens = user?.tokens || 0;
  const percentage = Math.round((usedTokens / totalTokens) * 100);

  return (
    <Card>
      <div className="flex items-center space-x-4 mb-4">
        <div className="p-2 bg-yellow-50 rounded-full">
          <Coins className="w-6 h-6 text-yellow-600" />
        </div>
        <div>
          <h3 className="text-lg font-semibold">Token Usage</h3>
          <p className="text-gray-600">
            {usedTokens} of {totalTokens} tokens remaining
          </p>
        </div>
      </div>
      <Progress percent={percentage} showInfo={false} />
    </Card>
  );
};