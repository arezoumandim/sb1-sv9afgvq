import React from 'react';
import { PlanList } from './components/PlanList';
import { CurrentPlan } from './components/CurrentPlan';
import { TokenUsage } from './components/TokenUsage';

export const Subscription: React.FC = () => {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold mb-6">Subscription Plans</h1>
      <TokenUsage />
      <CurrentPlan />
      <PlanList />
    </div>
  );
};