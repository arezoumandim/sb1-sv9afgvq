import React from 'react';
import { Steps } from 'antd';
import { useDeepfakeCreation } from './hooks/useDeepfakeCreation';
import { TemplateSelection } from './components/TemplateSelection';
import { MediaStep } from './components/MediaStep';
import { Preview } from './components/Preview';
import { StepIcon } from '../../components/ui/StepIcon';

export const CreateDeepfake: React.FC = () => {
  const { currentStep, steps } = useDeepfakeCreation();

  const renderStepContent = () => {
    switch (currentStep) {
      case 0:
        return <TemplateSelection />;
      case 1:
        return <MediaStep type="photo" />;
      case 2:
        return <MediaStep type="audio" />;
      case 3:
        return <Preview />;
      default:
        return <TemplateSelection />;
    }
  };

  return (
    <div className="max-w-4xl mx-auto pb-16">
      <h1 className="text-2xl font-semibold mb-6 px-4 sm:px-0">Create Deepfake</h1>
      <div className="mb-8 px-4 sm:px-0">
        <Steps 
          current={currentStep} 
          items={steps.map(step => ({
            ...step,
            icon: <StepIcon type={step.icon} />
          }))}
          responsive={true}
          size="small"
        />
      </div>
      {renderStepContent()}
    </div>
  );
};