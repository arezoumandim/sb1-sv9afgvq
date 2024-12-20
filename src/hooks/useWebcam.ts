import { useRef, useState, useCallback } from 'react';

export const useWebcam = () => {
  const webcamRef = useRef<HTMLVideoElement>(null);
  const [showWebcam, setShowWebcam] = useState(false);

  const toggleWebcam = useCallback(async () => {
    if (showWebcam) {
      const stream = webcamRef.current?.srcObject as MediaStream;
      stream?.getTracks().forEach(track => track.stop());
      setShowWebcam(false);
    } else {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ video: true });
        if (webcamRef.current) {
          webcamRef.current.srcObject = stream;
        }
        setShowWebcam(true);
      } catch (error) {
        console.error('Error accessing webcam:', error);
      }
    }
  }, [showWebcam]);

  const captureImage = useCallback(() => {
    if (webcamRef.current) {
      const canvas = document.createElement('canvas');
      canvas.width = webcamRef.current.videoWidth;
      canvas.height = webcamRef.current.videoHeight;
      const ctx = canvas.getContext('2d');
      
      if (ctx) {
        ctx.drawImage(webcamRef.current, 0, 0);
        return canvas.toDataURL('image/jpeg');
      }
    }
    return null;
  }, []);

  return {
    webcamRef,
    showWebcam,
    toggleWebcam,
    captureImage,
  };
};