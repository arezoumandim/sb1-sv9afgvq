import { IconType } from '../../../components/ui/StepIcon';
import { useDeepfakeStore } from '../../../store/deepfakeStore';
import { useMessage } from '../../../hooks/useMessage';

export const useDeepfakeCreation = () => {
  const { currentStep, setStep, templateId, faceImage, audioUrl } = useDeepfakeStore();
  const message = useMessage();

  const steps = [
    {
      title: 'Select Template',
      icon: 'video' as IconType,
    },
    {
      title: 'Upload Face',
      icon: 'camera' as IconType,
    },
    {
      title: 'Record Audio',
      icon: 'mic' as IconType,
    },
    {
      title: 'Preview',
      icon: 'eye' as IconType,
    },
  ];

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
    setStep(Math.min(currentStep + 1, steps.length - 1));
  };

  const prevStep = () => {
    setStep(Math.max(currentStep - 1, 0));
  };

  return {
    currentStep,
    steps,
    nextStep,
    prevStep,
    validateStep,
  };
};