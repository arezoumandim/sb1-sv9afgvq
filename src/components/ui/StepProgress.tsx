import React from 'react';
import { Steps } from 'antd';

interface StepProgressProps {
  current: number;
  steps: Array<{
    title: string;
    description?: string;
  }>;
}

export const StepProgress: React.FC<StepProgressProps> = ({ current, steps }) => {
  return (
    <Steps
      current={current}
      direction="vertical"
      items={steps}
      className="max-w-md mx-auto"
    />
  );
};