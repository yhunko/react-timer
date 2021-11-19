import React from "react";
import ThemeProvider from "./theme";

const AppProviders: React.FC = ({ children }) => {
  return <ThemeProvider>{children}</ThemeProvider>;
};

export default AppProviders;
