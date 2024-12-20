import React from 'react';
import { Button, Tooltip } from 'antd';
import { Coins } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../../store/authStore';

export const TokenDisplay: React.FC = () => {
  const navigate = useNavigate();
  const user = useAuthStore((state) => state.user);

  return (
    <div className="flex items-center gap-2">
      <Tooltip title="Available tokens">
        <div className="flex items-center gap-1 bg-blue-50 px-3 py-1.5 rounded-full">
          <Coins className="w-4 h-4 text-blue-600" />
          <span className="font-medium text-blue-600">{user?.tokens || 0}</span>
        </div>
      </Tooltip>
      <Button 
        type="primary"
        size="small"
        onClick={() => navigate('/subscription')}
        className="bg-gradient-to-r from-blue-600 to-indigo-600"
      >
        Get More
      </Button>
    </div>
  );
};