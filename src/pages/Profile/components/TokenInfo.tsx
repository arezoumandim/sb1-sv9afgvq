import React from 'react';
import { Card, Progress, Button } from 'antd';
import { Coins, TrendingUp } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../../../store/authStore';

export const TokenInfo: React.FC = () => {
  const navigate = useNavigate();
  const user = useAuthStore((state) => state.user);
  const maxTokens = 100; // This should come from the user's plan
  const percentage = Math.round((user?.tokens || 0) / maxTokens * 100);

  return (
    <Card
      title={
        <div className="flex items-center space-x-2">
          <Coins className="w-5 h-5 text-yellow-500" />
          <span>Token Balance</span>
        </div>
      }
    >
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-3xl font-bold">{user?.tokens || 0}</p>
            <p className="text-gray-500">tokens remaining</p>
          </div>
          <Button
            type="primary"
            icon={<TrendingUp className="w-4 h-4" />}
            onClick={() => navigate('/subscription')}
          >
            Get More Tokens
          </Button>
        </div>

        <div>
          <div className="flex justify-between mb-2">
            <span className="text-sm text-gray-600">Usage</span>
            <span className="text-sm font-medium">{percentage}%</span>
          </div>
          <Progress 
            percent={percentage} 
            showInfo={false}
            strokeColor={{
              '0%': '#4F46E5',
              '100%': '#818CF8',
            }}
          />
        </div>

        <div className="bg-gray-50 p-4 rounded-lg">
          <p className="text-sm text-gray-600">
            Each deepfake video creation costs 10 tokens. Get more tokens to continue creating amazing videos!
          </p>
        </div>
      </div>
    </Card>
  );
};