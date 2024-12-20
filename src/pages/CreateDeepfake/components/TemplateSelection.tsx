import React from 'react';
import { useDeepfakeCreation } from '../hooks/useDeepfakeCreation';
import { useDeepfakeStore } from '../../../store/deepfakeStore';
import { TemplateCard } from './TemplateCard';
import { useMessage } from '../../../hooks/useMessage';

const templates = [
  {
    id: '1',
    title: 'Business Presentation',
    thumbnail: 'https://images.unsplash.com/photo-1557804506-669a67965ba0?auto=format&fit=crop&w=300&h=200',
    duration: '30s',
  },
  {
    id: '2',
    title: 'Product Advertisement',
    thumbnail: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=300&h=200',
    duration: '15s',
  },
  {
    id: '3',
    title: 'Educational Video',
    thumbnail: 'https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&w=300&h=200',
    duration: '45s',
  },
];

export const TemplateSelection: React.FC = () => {
  const { nextStep } = useDeepfakeCreation();
  const { setTemplate } = useDeepfakeStore();
  const message = useMessage();

  const handleSelectTemplate = (templateId: string) => {
    setTemplate(templateId);
    message.success('Template selected successfully');
    nextStep();
  };

  return (
    <div className="px-4 sm:px-0">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {templates.map((template) => (
          <TemplateCard
            key={template.id}
            {...template}
            onSelect={handleSelectTemplate}
          />
        ))}
      </div>
    </div>
  );
};