import { useState, useEffect, useCallback } from 'react';

const TIMER_DURATION = 60; // 60 seconds

export const useOtpTimer = () => {
  const [timeLeft, setTimeLeft] = useState(0);
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    let interval: NodeJS.Timeout;

    if (isActive && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft((time) => time - 1);
      }, 1000);
    } else if (timeLeft === 0) {
      setIsActive(false);
    }

    return () => {
      if (interval) {
        clearInterval(interval);
      }
    };
  }, [isActive, timeLeft]);

  const startTimer = useCallback(() => {
    setTimeLeft(TIMER_DURATION);
    setIsActive(true);
  }, []);

  const resetTimer = useCallback(() => {
    setTimeLeft(0);
    setIsActive(false);
  }, []);

  return {
    timeLeft,
    isActive,
    startTimer,
    resetTimer,
  };
};