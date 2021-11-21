import React from "react";
import useTimer, { TimerHookType } from "../features/Timer/hooks/useTimer";

export const TimerContext = React.createContext<TimerHookType | undefined>(
  undefined
);

const TimerProvider: React.FC = ({ children }) => {
  const timer = useTimer();

  return (
    <TimerContext.Provider value={timer}>{children}</TimerContext.Provider>
  );
};

export default TimerProvider;
