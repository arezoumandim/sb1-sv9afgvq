import React from 'react';
import { Card, Button } from 'antd';
import { Coins } from 'lucide-react';
import { useAuthStore } from '../../../store/authStore';
import { useNavigate } from 'react-router-dom';

export const TokenBalance: React.FC = () => {
  const navigate = useNavigate();
  const user = useAuthStore((state) => state.user);

  return (
    <Card className="bg-white">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="p-2 bg-yellow-100 rounded-full">
            <Coins className="w-6 h-6 text-yellow-600" />
          </div>
          <div>
            <p className="text-sm text-gray-600">Available Tokens</p>
            <p className="text-xl font-semibold">{user?.tokens || 0}</p>
          </div>
        </div>
        <Button 
          type="primary"
          onClick={() => navigate('/subscription')}
          className="bg-gradient-to-r from-blue-600 to-indigo-600"
        >
          Get More Tokens
        </Button>
      </div>
    </Card>
  );
};