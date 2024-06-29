"use client";

import { createTheme } from "@mui/material/styles";
import { cyan } from "@mui/material/colors";

const theme = createTheme({
  palette: {
    primary: {
      main: cyan[600],
      dark: cyan[800],
      light: cyan[400],
    },
  },
});

export default theme;
