import React from "react";
import ThemeProvider from "./theme";
import TimerProvider from "./timer";

const AppProviders: React.FC = ({ children }) => {
  return (
    <ThemeProvider>
      <TimerProvider>{children}</TimerProvider>
    </ThemeProvider>
  );
};

export default AppProviders;
