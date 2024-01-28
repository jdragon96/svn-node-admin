import { Outlet } from "react-router-dom";
import { AppBar, Toolbar, Typography, Box } from "@mui/material";
import * as SystemModel from "../../shared/model/SystemModel";
import { Sidebar } from "../../shared/component/Sidebar/Sidebar";
import * as Component from '../../shared/component';
import {useTheme} from "@mui/material/styles";
import { Topbar } from "./TopbarLayout";

interface MainLayoutProps{
  menu: SystemModel.AppRouter[]
}
export const MainLayout = (props: MainLayoutProps) => {
  const theme = useTheme();

  return (
    <Box sx={{ display: "flex" }}>
      {/* 상단 네비게이션바 */}
      <Topbar />
      {/* 사이드바 */}
      <Box
        component="nav"
        sx={{
          width: theme.palette.size.menuWidth,
          flexShrink: 0
        }}>
        <Component.Sidebar menu={props.menu}/>
      </Box>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          width: `calc(100% - ${theme.palette.size.menuWidth})`,
          minHeight: "100vh",
          backgroundColor: theme.palette.background.default
        }}>

        <Toolbar/>
        <Outlet />
      </Box>
    </Box>
  );
};

export default MainLayout;