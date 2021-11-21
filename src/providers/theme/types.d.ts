import React from "react";

declare module "@mui/material/styles" {
  interface TypographyVariants {
    chart: React.CSSProperties;
  }

  // allow configuration using `createTheme`
  interface TypographyVariantsOptions {
    chart?: React.CSSProperties;
  }
}

// Update the Typography's variant prop options
declare module "@mui/material/Typography" {
  interface TypographyPropsVariantOverrides {
    chart: true;
  }
}
