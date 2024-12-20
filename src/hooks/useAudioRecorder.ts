import { useState, useCallback, useRef, useEffect } from 'react';
import { createObjectURL } from '../utils/mediaUtils';

export const useAudioRecorder = () => {
  const [isRecording, setIsRecording] = useState(false);
  const [recordingTime, setRecordingTime] = useState(0);
  const [audioUrl, setAudioUrl] = useState<string | null>(null);
  const mediaRecorder = useRef<MediaRecorder | null>(null);
  const timerRef = useRef<NodeJS.Timeout>();
  const chunksRef = useRef<Blob[]>([]);
  const streamRef = useRef<MediaStream | null>(null);

  const cleanup = useCallback(() => {
    // Stop all tracks in the stream
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(track => track.stop());
      streamRef.current = null;
    }

    // Clear the recording timer
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = undefined;
    }

    // Reset the media recorder
    if (mediaRecorder.current) {
      if (mediaRecorder.current.state !== 'inactive') {
        mediaRecorder.current.stop();
      }
      mediaRecorder.current = null;
    }

    // Reset recording chunks
    chunksRef.current = [];
    setIsRecording(false);
  }, []);

  const startRecording = useCallback(async () => {
    try {
      // Clean up any existing recording session
      cleanup();

      // Get audio stream
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      streamRef.current = stream;
      
      // Create new MediaRecorder
      const recorder = new MediaRecorder(stream);
      mediaRecorder.current = recorder;

      // Set up recording handlers
      recorder.ondataavailable = (e) => {
        if (e.data.size > 0) {
          chunksRef.current.push(e.data);
        }
      };

      recorder.onstop = () => {
        if (chunksRef.current.length > 0) {
          const blob = new Blob(chunksRef.current, { type: 'audio/webm' });
          const url = createObjectURL(blob);
          setAudioUrl(url);
        }
      };

      // Start recording
      recorder.start(200);
      setIsRecording(true);
      setRecordingTime(0);

      // Start timer
      timerRef.current = setInterval(() => {
        setRecordingTime(prev => prev + 1);
      }, 1000);
    } catch (error) {
      console.error('Error accessing microphone:', error);
      cleanup();
    }
  }, [cleanup]);

  const stopRecording = useCallback(() => {
    if (mediaRecorder.current && mediaRecorder.current.state === 'recording') {
      mediaRecorder.current.stop();
      cleanup();
    }
  }, [cleanup]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      cleanup();
      // Revoke any existing audio URL
      if (audioUrl) {
        URL.revokeObjectURL(audioUrl);
      }
    };
  }, [cleanup, audioUrl]);

  return {
    isRecording,
    recordingTime,
    startRecording,
    stopRecording,
    audioUrl,
  };
};