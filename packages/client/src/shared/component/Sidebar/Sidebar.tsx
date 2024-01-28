/*
1. 아이콘 넣기
2. 사이드바 구조
메인버튼1
 - 자식버튼1
 - 자식버튼2
메인버튼2
 - 자식버튼1
 - 자식버튼2
3. 자식버튼 접히게

*/
import { useNavigate } from 'react-router-dom';
import { Avatar, Drawer, List, Stack, Toolbar } from "@mui/material";
import { styled } from '@mui/material/styles';
import { SidebarItem } from './SidebarItem';
import { SidebarItemWithChild } from './SidebarItemWithChild';
import * as SystemModel from '../../model/SystemModel';
// import assets from '../../../resource';

//******************************************************************************
// 스타일
//******************************************************************************
const StyledButton = styled(Drawer)(({theme}) => ({
  width: theme.palette.size.menuWidth,
  flexShrink: 0,

  "& .MuiDrawer-paper": {
    width: theme.palette.size.menuWidth,
    boxSizing: "border-box",
    borderRight: "0px",
    backgroundColor: "#000000",
    color: "inherit"
  }
}));;


//******************************************************************************
// 랜더링
//******************************************************************************
interface SidebarProps{
  menu: SystemModel.AppRouter[]
}
export const Sidebar = (props: SidebarProps) => {

  const navigate = useNavigate();


  //! 매뉴 클릭에 따른 페이지 이동
  const movePage = (path: string, moveable: boolean) => {
    console.log(moveable);
    if(!moveable) return;
    console.log(path);
    navigate(path);
  }


  return (
    <>
      <StyledButton variant="permanent">
        <List>
          <Toolbar sx={{ marginBottom: "20px" }}>
            <Stack
              sx={{ width: "100%" }}
              direction="row"
              justifyContent="center">
              {/* <Avatar src={assets.images.logo} /> */}
            </Stack>
          </Toolbar>
          {
            props.menu.map((value: SystemModel.AppRouter, index: number) => {
              return (
                value.child.length > 0 ? 
                <SidebarItemWithChild item={value} clickCallback={movePage}/>
                : 
                <SidebarItem item={value} clickCallback={movePage}/>
              )
            })
          }
        </List>
      </StyledButton>
    </>
  )
}