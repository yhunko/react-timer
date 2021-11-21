import React from "react";
import Chart from "./Chart";
import useTimerContext from "../../contexts/timer";

type Props = {
  count: number;
};

const Charts: React.FC<Props> = () => {
  const { getFormattedValue } = useTimerContext();
  const {
    days: { value: days, percent: daysPercent },
    hours: { value: hours, percent: hoursPercent },
    minutes: { value: minutes, percent: minutesPercent },
    seconds: { value: seconds, percent: secondsPercent },
  } = getFormattedValue();

  return (
    <>
      {days > 0 && (
        <Chart
          percent={daysPercent}
          color={"brown"}
          count={days}
          text={`days`}
        />
      )}
      {hours > 0 && (
        <Chart
          percent={hoursPercent}
          color={"yellow"}
          count={hours}
          text={`hour${hours > 1 ? "s" : ""}`}
        />
      )}
      {minutes > 0 && (
        <Chart
          percent={minutesPercent}
          color="red"
          count={minutes}
          text={`minute${minutes > 1 ? "s" : ""}`}
        />
      )}
      <Chart
        percent={secondsPercent}
        color="green"
        count={seconds}
        text={`second${seconds > 1 ? "s" : ""}`}
      />
    </>
  );
};

export default Charts;
