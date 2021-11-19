import React from "react";
import ReactDOM from "react-dom";

import AppProviders from "./providers";
import Timer from "./features/Timer";

ReactDOM.render(
  <React.StrictMode>
    <AppProviders>
      <Timer />
    </AppProviders>
  </React.StrictMode>,
  document.getElementById("root")
);
