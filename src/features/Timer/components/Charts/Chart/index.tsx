import React from "react";
import { Typography } from "@mui/material";
import classes from "./Chart.module.css";

type Props = {
  percent: number;
  color: string;
  count: number;
  text: string;
};

const Chart: React.FC<Props> = ({ percent, color, count, text }) => {
  return (
    <svg
      viewBox="0 0 36 36"
      className="block"
      style={{
        maxWidth: "250px",
      }}
    >
      <path
        className={classes.circle}
        strokeDasharray={percent + ", 100"}
        stroke={color}
        d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
      />
      <Typography
        variant={"chart"}
        component={"text"}
        x="50%"
        y="50%"
        textAnchor="middle"
      >
        <tspan x="50%" y="43%">
          {count}
        </tspan>
        <tspan x="50%" y="57%">
          {text}
        </tspan>
      </Typography>
    </svg>
  );
};

export default Chart;
