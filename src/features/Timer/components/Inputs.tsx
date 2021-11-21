import React from "react";
import { Box, Button, Stack, TextField } from "@mui/material";

type Props = {
  onTimerStart: (time: number) => void;
};

const Inputs: React.FC<Props> = ({ onTimerStart }) => {
  const [minutes, setMinutes] = React.useState(0);
  const [seconds, setSeconds] = React.useState(10);

  return (
    <Stack alignItems="center" gap={2} m={2} p={2}>
      <TextField
        value={minutes}
        type="number"
        label="Minutes"
        onChange={(event) => {
          setMinutes(Number(event.target.value));
        }}
      />
      <TextField
        value={seconds}
        type="number"
        label="Seconds"
        onChange={(event) => {
          setSeconds(Number(event.target.value));
        }}
      />

      <Box mt={2} minWidth="150px">
        <Button
          variant="contained"
          color="primary"
          onClick={() => {
            onTimerStart(seconds + minutes * 60);
          }}
          fullWidth
        >
          Start
        </Button>
      </Box>
    </Stack>
  );
};

export default Inputs;
