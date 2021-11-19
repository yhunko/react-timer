import React from "react";
import Chart from "./Chart";

type Props = {
  count: number;
  initialCount: number;
};

const Charts: React.FC<Props> = ({ count, initialCount }) => {
  const minutes = Math.floor(count / 60);
  const seconds = minutes > 0 ? initialCount - minutes * 60 : count;

  return (
    <>
      <Chart
        percent={(count / 60 / (initialCount / 60)) * 100}
        color="red"
        count={minutes}
        text={`minute${minutes > 1 ? "s" : ""}`}
      />
      <Chart
        percent={(count / 60) * 100}
        color="green"
        count={seconds}
        text={`second${seconds > 1 ? "s" : ""}`}
      />
    </>
  );
};

export default Charts;
