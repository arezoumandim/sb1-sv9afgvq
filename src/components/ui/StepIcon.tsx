import React from 'react';
import { Video, Camera, Mic, Eye } from 'lucide-react';
import { StepIconType } from '../../types/step';

interface StepIconProps {
  type: StepIconType;
}

const ICON_MAP = {
  video: Video,
  camera: Camera,
  mic: Mic,
  eye: Eye,
} as const;

export const StepIcon: React.FC<StepIconProps> = ({ type }) => {
  const Icon = ICON_MAP[type];
  return <Icon className="w-5 h-5" />;
};