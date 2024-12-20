import React from 'react';
import { Card, Button } from 'antd';
import { Check } from 'lucide-react';
import { SubscriptionPlan } from '../../../types';
import { usePlans } from '../hooks/usePlans';

export const PlanList: React.FC = () => {
  const { plans, selectedPlan, selectPlan } = usePlans();

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {plans.map((plan) => (
        <Card 
          key={plan.id}
          className={`relative ${
            plan.id === selectedPlan?.id ? 'border-primary border-2' : ''
          }`}
        >
          <div className="text-center">
            <h3 className="text-xl font-semibold mb-2">{plan.name}</h3>
            <div className="text-3xl font-bold mb-4">
              ${plan.price}
              <span className="text-base font-normal text-gray-500">/month</span>
            </div>
            <div className="text-lg mb-4">
              {plan.tokens} tokens
            </div>
            <ul className="text-left space-y-3 mb-6">
              {plan.description.split('\n').map((feature, index) => (
                <li key={index} className="flex items-center">
                  <Check className="w-5 h-5 text-green-500 mr-2" />
                  {feature}
                </li>
              ))}
            </ul>
            <Button
              type="primary"
              size="large"
              block
              onClick={() => selectPlan(plan)}
              className="bg-gradient-to-r from-blue-600 to-indigo-600"
            >
              Choose Plan
            </Button>
          </div>
        </Card>
      ))}
    </div>
  );
};