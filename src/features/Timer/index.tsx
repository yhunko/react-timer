import React from "react";
import { Stack } from "@mui/material";
import Inputs from "./components/Inputs";
import Charts from "./components/Charts";
import Actions from "./components/Actions";
import useTimerContext from "./contexts/timer";

const Timer: React.FC = () => {
  const { value, start, pause, isPaused, resume, clear } = useTimerContext();

  return (
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
            <Charts count={value} />
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
  );
};

export default Timer;
