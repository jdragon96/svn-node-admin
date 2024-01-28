import { AppBar, Toolbar, Typography, Box } from "@mui/material";
import {useTheme} from "@mui/material/styles";

export const Topbar = () => {
  const theme = useTheme();

  return (
    <AppBar
      position="fixed"
      sx={{
        width: `calc(100% - ${theme.palette.size.menuWidth})`,
        ml: theme.palette.size.menuWidth,
        boxShadow: "unset",
        backgroundColor: theme.palette.color.topbar.base,
        color: theme.palette.text.primary
      }}
    >
      <Toolbar>
        <Typography variant="h6">
          React sidebar with dropdown
        </Typography>
      </Toolbar>
    </AppBar>
  );
};