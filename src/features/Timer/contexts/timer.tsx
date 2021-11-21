import React from "react";
import { TimerContext } from "../../../providers/timer";
import { TimerHookType } from "../hooks/useTimer";

const useTimerContext = (): TimerHookType => {
  const timerClient = React.useContext(TimerContext);

  if (!timerClient)
    throw new Error(
      `There is no timer context. Did you forget to use <TimerProvider>?`
    );

  return timerClient;
};

export default useTimerContext;
