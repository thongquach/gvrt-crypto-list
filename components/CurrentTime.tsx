import React, { useState, useEffect } from 'react';
import { ThemedText } from './ThemedText';

const CurrentTime = () => {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const tick = () => {
      setTime(new Date());
    };

    const timerID = setInterval(tick, 1000);

    return () => {
      clearInterval(timerID);
    };
  }, []);

  return <ThemedText type="secondary">{time.toLocaleTimeString()}</ThemedText>;
};

export default CurrentTime;
