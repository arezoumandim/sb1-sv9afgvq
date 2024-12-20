import { StepIconType, Step } from '../types/step';
import { useDeepfakeStore } from '../store/deepfakeStore';
import { useMessage } from './useMessage';

const CREATION_STEPS: Step[] = [
  {
    title: 'Select Template',
    icon: 'video',
  },
  {
    title: 'Upload Face',
    icon: 'camera',
  },
  {
    title: 'Record Audio',
    icon: 'mic',
  },
  {
    title: 'Preview',
    icon: 'eye',
  },
];

export const useDeepfakeCreation = () => {
  const { currentStep, setStep, templateId, faceImage, audioUrl } = useDeepfakeStore();
  const message = useMessage();

  const validateStep = () => {
    switch (currentStep) {
      case 0:
        return !!templateId;
      case 1:
        return !!faceImage;
      case 2:
        return !!audioUrl;
      default:
        return true;
    }
  };

  const nextStep = () => {
    if (!validateStep()) {
      message.error('Please complete the current step before continuing');
      return;
    }
    setStep(Math.min(currentStep + 1, CREATION_STEPS.length - 1));
  };

  const prevStep = () => {
    setStep(Math.max(currentStep - 1, 0));
  };

  return {
    currentStep,
    steps: CREATION_STEPS,
    nextStep,
    prevStep,
    validateStep,
  };
};