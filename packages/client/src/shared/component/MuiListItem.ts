import { OverrideComponentReturn } from "./types";

export const MuiListItemButton: OverrideComponentReturn<"MuiListItemButton"> = {
  defaultProps: {
    disableRipple: true,
  },
  styleOverrides: {
    root: {
      transition: "none",
    },
  },
};
