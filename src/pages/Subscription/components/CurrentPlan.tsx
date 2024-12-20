import React from 'react';
import { Card, Button, Tag } from 'antd';
import { Calendar } from 'lucide-react';
import { usePlans } from '../hooks/usePlans';

export const CurrentPlan: React.FC = () => {
  const { currentPlan } = usePlans();

  if (!currentPlan) return null;

  return (
    <Card className="mb-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <div className="p-2 bg-blue-50 rounded-full">
            <Calendar className="w-6 h-6 text-blue-600" />
          </div>
          <div>
            <h3 className="text-lg font-semibold">Current Plan</h3>
            <p className="text-gray-600">{currentPlan.name}</p>
          </div>
        </div>
        <div className="flex items-center space-x-4">
          <Tag color="blue">Active</Tag>
          <Button type="default">Manage Plan</Button>
        </div>
      </div>
    </Card>
  );
};