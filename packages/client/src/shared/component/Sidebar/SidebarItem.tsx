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

※ 참고자료
https://github.com/mui/material-ui/issues/32985
*/

import * as React from 'react';
import { ListItemButton, ListItemIcon } from "@mui/material";
import { Link } from "react-router-dom";

import { Avatar, Drawer, List, Stack, Toolbar } from "@mui/material";
import { Box, Button, Grid, Typography, ToggleButton, Radio } from "@mui/material";
import { styled } from '@mui/material/styles';
// import { AppRouter } from '../types';
import * as SystemModel from '../../model/SystemModel';

//******************************************************************************
// 스타일
//******************************************************************************
const SidebarItemStyle = styled(ListItemButton)(({theme}) => ({
  margin: "4px",
  background: theme.palette.color.menu.buttonBase,

  "&: hover": {
    backgroundColor: theme.palette.color.menu.hover
  },
  "&: active": {
    backgroundColor: theme.palette.color.menu.click
  },
}));


//******************************************************************************
// 랜더링
//******************************************************************************
export interface Sidebar1ItemProps{
  item: SystemModel.AppRouter,
  clickCallback: (link: string, clickable: boolean) => void
}
export const SidebarItem = (props: Sidebar1ItemProps) => {
  return (
    <SidebarItemStyle onClick={() => {props.clickCallback(props.item.path, props.item.clickable)}}>
      <ListItemIcon>
        {props.item.icon}
      </ListItemIcon>
    {props.item.title}
  </SidebarItemStyle>
  );
}