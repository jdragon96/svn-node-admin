import { OverrideComponentReturn } from "./types";
import { buttonClasses } from "@mui/material";

export const MuiButton: OverrideComponentReturn<"MuiButton"> = {
  defaultProps: {
    disableElevation: true,
  },
  styleOverrides: {
    root: {
      transition: "none",
    },
    containedInherit: ({ theme }) => ({
      backgroundColor: theme.palette.background.default,
    }),
    sizeSmall: {
      [`&.${buttonClasses.text}`]: {
        fontSize: "0.625rem",
      },
      [`&.${buttonClasses.contained}`]: {
        fontSize: "0.625rem",
      },
      [`&.${buttonClasses.outlined}`]: {
        fontSize: "0.625rem",
      },
    },
    sizeLarge: {
      [`&.${buttonClasses.text}`]: {
        fontSize: "0.875rem",
      },
      [`&.${buttonClasses.contained}`]: {
        fontSize: "0.875rem",
      },
      [`&.${buttonClasses.outlined}`]: {
        fontSize: "0.875rem",
      },
    },
  },
};