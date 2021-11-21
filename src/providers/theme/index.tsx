import React from "react";
import {
  createTheme,
  ThemeProvider as MUIThemeProvider,
} from "@mui/material/styles";
import { ThemeProviderProps } from "@mui/material/styles/ThemeProvider";

const theme: ThemeProviderProps["theme"] = createTheme({
  typography: {
    chart: {
      font: "italic 4px sans-serif",
    },
  },
});

const ThemeProvider: React.FC = ({ children }) => {
  return <MUIThemeProvider theme={theme}>{children}</MUIThemeProvider>;
};

export default ThemeProvider;
