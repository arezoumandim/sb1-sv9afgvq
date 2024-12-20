type ClassValue = string | number | boolean | undefined | null;
type ClassArray = ClassValue[];
type ClassObject = { [key: string]: any };
type ClassInput = ClassValue | ClassArray | ClassObject;

export function cn(...inputs: ClassInput[]): string {
  return inputs.filter(Boolean).join(' ');
}