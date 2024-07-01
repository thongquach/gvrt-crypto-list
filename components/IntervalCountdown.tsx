import React, { useState, useEffect } from 'react';
import { ThemedText } from './ThemedText';

const IntervalCountdown = ({
  text = '',
  interval = 60,
  onIntervalFinish,
}: {
  text?: string;
  interval?: number;
  onIntervalFinish?: () => void;
}) => {
  const [countdown, setCountdown] = useState(interval);

  useEffect(() => {
    const countdownInterval = setInterval(() => {
      setCountdown((prevCountdown) => {
        if (prevCountdown === 1) {
          onIntervalFinish?.();
          return interval;
        } else {
          return prevCountdown - 1;
        }
      });
    }, 1000);

    return () => clearInterval(countdownInterval);
  }, [interval, onIntervalFinish]);

  return <ThemedText type="secondary">{`${text}${countdown}s`}</ThemedText>;
};

export default IntervalCountdown;
