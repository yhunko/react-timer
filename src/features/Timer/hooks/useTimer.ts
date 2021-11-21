import React from "react";
import useInterval from "react-use/lib/useInterval";
import { FormattedValue } from "./types";

export type TimerHookType = {
  value: number;
  initialValue: number;
  start: (time: number) => void;
  pause: () => void;
  resume: () => void;
  clear: () => void;
  isPaused: boolean;
  isEnded: boolean;
  isCleared: boolean;
  getFormattedValue: () => {
    days: FormattedValue;
    hours: FormattedValue;
    minutes: FormattedValue;
    seconds: FormattedValue;
  };
};
const useTimer = (): TimerHookType => {
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
    getFormattedValue: () => {
      let seconds = value;

      const days = Math.floor(seconds / (3600 * 24));
      seconds -= days * 3600 * 24;
      const hours = Math.floor(seconds / 3600);
      seconds -= hours * 3600;
      const minutes = Math.floor(seconds / 60);
      seconds -= minutes * 60;

      return {
        days: {
          value: days,
          percent: ((days * 3600 * 24) / (3600 * 24 * 60)) * 100,
        },
        hours: { value: hours, percent: ((hours * 60) / 3600) * 100 },
        minutes: { value: minutes, percent: ((minutes * 60) / 3600) * 100 },
        seconds: { value: seconds, percent: (seconds / 60) * 100 },
      };
    },
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
      setIsEnded(false);
      setIsPaused(false);
    },
  };
};

export default useTimer;
