import React from "react";
import { Button } from "@mui/material";
import PlayIcon from "@mui/icons-material/PlayArrow";
import PauseIcon from "@mui/icons-material/Pause";
import ClearIcon from "@mui/icons-material/Clear";

type Props = {
  isPaused: boolean;

  onPause: () => void;
  onResume: () => void;
  onClear: () => void;
};

const Actions: React.FC<Props> = ({ isPaused, onPause, onResume, onClear }) => {
  return (
    <>
      {isPaused ? (
        <Button
          color={"success"}
          variant="contained"
          startIcon={<PlayIcon />}
          onClick={() => {
            onResume();
          }}
        >
          Resume
        </Button>
      ) : (
        <Button
          color={"warning"}
          variant="contained"
          startIcon={<PauseIcon />}
          onClick={() => {
            onPause();
          }}
        >
          Pause
        </Button>
      )}
      <Button
        color={"error"}
        variant="contained"
        startIcon={<ClearIcon />}
        onClick={() => {
          onClear();
        }}
      >
        Clear
      </Button>
    </>
  );
};

export default Actions;
