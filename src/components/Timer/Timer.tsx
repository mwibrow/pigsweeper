import React, { useState, useEffect, useRef } from 'react';

import './Timer.scss';

interface TimerProps {
  state: TimerState;
}

export enum TimerState {
  Reset,
  Running,
  Stopped,
}

const Timer: React.FC<TimerProps> = ({ state }) => {
  const timer = useRef<number | undefined>(undefined);
  const [seconds, setSeconds] = useState<number>(0);
  useEffect(() => {
    switch (state) {
      case TimerState.Reset:
        setSeconds(() => 0);
        clearInterval(timer.current);
        timer.current = undefined;
        break;
      case TimerState.Running:
        if (!timer.current) {
          setSeconds(() => 0);
          timer.current = window.setInterval(() => {
            setSeconds((seconds: number) => seconds + 1);
          }, 1000);
        }
        break;
      case TimerState.Stopped:
        clearInterval(timer.current);
        timer.current = undefined;
        break;
      default:
    }
    return () => {
      clearInterval(timer.current);
      timer.current = undefined;
    };
  }, [state, timer]);

  return <div className="timer">Time: {seconds}</div>;
};

export default Timer;
