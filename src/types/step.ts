export type StepIconType = 'video' | 'camera' | 'mic' | 'eye';

export interface Step {
  title: string;
  icon: StepIconType;
}