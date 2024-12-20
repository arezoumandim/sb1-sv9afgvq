import React from 'react';
import { Card, CardProps } from 'antd';

interface GradientCardProps extends CardProps {
  gradientFrom?: string;
  gradientTo?: string;
}

export const GradientCard: React.FC<GradientCardProps> = ({
  gradientFrom = '#4F46E5',
  gradientTo = '#818CF8',
  className = '',
  ...props
}) => {
  const gradientClass = `bg-gradient-to-br from-[${gradientFrom}] to-[${gradientTo}]`;
  
  return (
    <Card
      {...props}
      className={`${gradientClass} text-white ${className}`}
    />
  );
};