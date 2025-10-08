import { useEffect, useRef, useCallback } from 'react';

interface UseInactivityDetectorProps {
  onInactive: () => void;
  delay: number; // milliseconds
  events?: string[];
}

export const useInactivityDetector = ({
  onInactive,
  delay,
  events = [
    'mousedown',
    'mousemove',
    'keypress',
    'scroll',
    'touchstart',
    'click',
    'wheel'
  ]
}: UseInactivityDetectorProps) => {
  const timeoutRef = useRef<NodeJS.Timeout>();
  const isActiveRef = useRef(true);

  const resetTimer = useCallback(() => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    isActiveRef.current = true;

    timeoutRef.current = setTimeout(() => {
      isActiveRef.current = false;
      onInactive();
    }, delay);
  }, [onInactive, delay]);

  const handleActivity = useCallback(() => {
    if (!isActiveRef.current) {
      isActiveRef.current = true;
    }
    resetTimer();
  }, [resetTimer]);

  useEffect(() => {
    // Khởi tạo timer
    resetTimer();

    // Thêm event listeners
    events.forEach(event => {
      document.addEventListener(event, handleActivity, true);
    });

    // Cleanup
    return () => {
      events.forEach(event => {
        document.removeEventListener(event, handleActivity, true);
      });
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [events, handleActivity, resetTimer]);

  const isActive = () => isActiveRef.current;

  const resetInactivityTimer = useCallback(() => {
    resetTimer();
  }, [resetTimer]);

  return {
    isActive,
    resetInactivityTimer
  };
};














