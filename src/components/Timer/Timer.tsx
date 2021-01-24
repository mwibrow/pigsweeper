import React, { useState, useEffect, useRef } from 'react';

import './Timer.scss';

interface TimerProps {
  running: boolean;
}

const Timer: React.FC<TimerProps> = ({ running }) => {
  const timer = useRef<number | undefined>(undefined);
  const [seconds, setSeconds] = useState<number>(0);

  useEffect(() => {
    if (!timer.current && running) {
      timer.current = window.setInterval(() => {
        setSeconds((seconds: number) => seconds + 1);
      }, 1000);
    }

    return () => {
      clearInterval(timer.current);
    };
  }, [running, timer]);
  return <div className="timer">Time: {seconds}</div>;
};

export default Timer;
