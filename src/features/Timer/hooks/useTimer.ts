import React from "react";
import { useInterval } from "react-use";

const useTimer = () => {
  const [value, setValue] = React.useState(0);
  const [initialValue, setInitialValue] = React.useState(0);

  const [isEnded, setIsEnded] = React.useState(false);
  const [isPaused, setIsPaused] = React.useState(false);
  const [isCleared, setIsCleared] = React.useState(false);

  useInterval(
    () => {
      if (value === 0) {
        setIsEnded(true);
      } else {
        setValue((prev) => prev - 1);
      }
    },
    isCleared || isPaused || isEnded ? null : 1000
  );

  return {
    value,
    initialValue,
    isEnded,
    isPaused,
    isCleared,
    start(time: number) {
      setValue(time);
      setInitialValue(time);
      setIsEnded(false);
      setIsCleared(false);
    },
    pause() {
      setIsPaused(true);
    },
    resume() {
      setIsPaused(false);
    },
    clear() {
      setValue(0);
      setInitialValue(0);
      setIsCleared(true);
    },
  };
};

export default useTimer;
