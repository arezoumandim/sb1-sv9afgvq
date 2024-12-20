import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { compressImage } from '../utils/mediaUtils';

interface DeepfakeState {
  templateId: string | null;
  faceImage: string | null;
  audioUrl: string | null;
  currentStep: number;
  setTemplate: (id: string) => void;
  setFaceImage: (url: string) => void;
  setAudio: (url: string) => void;
  setStep: (step: number) => void;
  reset: () => void;
}

const MAX_STORAGE_SIZE = 5 * 1024 * 1024; // 5MB limit

const customStorage = {
  getItem: (name: string) => {
    try {
      return localStorage.getItem(name);
    } catch (error) {
      console.error('Error reading from localStorage:', error);
      return null;
    }
  },
  setItem: (name: string, value: string) => {
    try {
      if (value.length > MAX_STORAGE_SIZE) {
        throw new Error('Data size exceeds storage limit');
      }
      localStorage.setItem(name, value);
    } catch (error) {
      console.error('Error writing to localStorage:', error);
      // Clear storage if quota is exceeded
      localStorage.removeItem(name);
    }
  },
  removeItem: (name: string) => {
    try {
      localStorage.removeItem(name);
    } catch (error) {
      console.error('Error removing from localStorage:', error);
    }
  },
};

export const useDeepfakeStore = create<DeepfakeState>()(
  persist(
    (set) => ({
      templateId: null,
      faceImage: null,
      audioUrl: null,
      currentStep: 0,
      setTemplate: (id) => set({ templateId: id }),
      setFaceImage: async (url) => {
        try {
          const compressedImage = await compressImage(url);
          set({ faceImage: compressedImage });
        } catch (error) {
          console.error('Error compressing image:', error);
          // Fallback to original image if compression fails
          set({ faceImage: url });
        }
      },
      setAudio: (url) => {
        try {
          set({ audioUrl: url });
        } catch (error) {
          console.error('Error setting audio:', error);
          // Clear existing audio if storage fails
          set({ audioUrl: null });
        }
      },
      setStep: (step) => set({ currentStep: step }),
      reset: () => set({ 
        templateId: null, 
        faceImage: null, 
        audioUrl: null, 
        currentStep: 0 
      }),
    }),
    {
      name: 'deepfake-storage',
      storage: createJSONStorage(() => customStorage),
      partialize: (state) => ({
        templateId: state.templateId,
        currentStep: state.currentStep,
        // Don't persist media data
        faceImage: null,
        audioUrl: null,
      }),
    }
  )
);