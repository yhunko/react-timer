import React from "react";
import { Stack } from "@mui/material";
import Inputs from "./components/Inputs";
import Charts from "./components/Charts";
import useTimer from "./hooks/useTimer";
import Actions from "./components/Actions";

const Timer: React.FC = () => {
  const { value, initialValue, start, pause, isPaused, resume, clear } =
    useTimer();

  return (
    <>
      <Stack justifyContent="center" alignItems="center">
        {value === 0 && (
          <Inputs
            onTimerStart={(time) => {
              start(time);
            }}
          />
        )}
        {value > 0 && (
          <>
            <Stack direction={"row"} justifyContent={"center"} width={"100%"}>
              <Charts count={value} initialCount={initialValue} />
            </Stack>
            <Stack direction={"row"} gap={5} mt={2}>
              <Actions
                isPaused={isPaused}
                onPause={() => {
                  pause();
                }}
                onResume={() => {
                  resume();
                }}
                onClear={() => {
                  clear();
                }}
              />
            </Stack>
          </>
        )}
      </Stack>
    </>
  );
};

export default Timer;
