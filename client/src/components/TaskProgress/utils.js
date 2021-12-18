import { useState, useEffect, useMemo } from 'react';

export function useTaskTime({ start, end }) {
  const total = useMemo(() => end - start, [start, end]);
  const [currentTime, setCurrentTime] = useState(new Date().getTime());
  useEffect(() => {
    const now = new Date().getTime();
    setCurrentTime(now);
    if (start >= end || now >= end) {
      return;
    }

    const interval = setInterval(() => {
      const then = new Date().getTime();
      setCurrentTime(then);
    }, [1000]);

    return () => {
      clearInterval(interval);
    };
  }, [start, end]);

  const timeLeft = Math.max(end - currentTime, 0);

  const progress = total ? Math.ceil(100 - (timeLeft * 100) / total) : 0;

  return { timeLeft, progress };
}
