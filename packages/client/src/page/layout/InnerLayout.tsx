import { Outlet } from "react-router-dom";
import { AppBar, Toolbar, Typography, Box } from "@mui/material";
import * as SystemModel from "../../shared/model/SystemModel";
import * as Component from "../../shared/component";
import {useTheme} from "@mui/material/styles";
import { Topbar } from "./TopbarLayout";

interface InnerLayoutProps{
  menu: SystemModel.AppRouter[]
}
export const InnerLayout = (props: InnerLayoutProps) => {
  //! 클라이언트 공통 태마
  const theme = useTheme();


  return (
    <Box sx={{ display: "flex" }}>
      <Topbar />
      <Box
        component="nav"
        sx={{
          width: theme.palette.size.menuWidth,
          flexShrink: 0
        }}>
        <Component.Sidebar menu={props.menu}/>
      </Box>
    </Box>
  );
};

export default InnerLayout;