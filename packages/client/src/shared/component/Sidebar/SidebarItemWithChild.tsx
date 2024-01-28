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
import { ListItemButton, ListItemIcon, Collapse, ListItemText } from "@mui/material";
import { Link } from "react-router-dom";
import { useState } from 'react';
import ExpandLessOutlinedIcon from '@mui/icons-material/ExpandLessOutlined';
import ExpandMoreOutlinedIcon from '@mui/icons-material/ExpandMoreOutlined';

import { Avatar, Drawer, List, Stack, Toolbar } from "@mui/material";
import { Box, Button, Grid, Typography, ToggleButton, Radio } from "@mui/material";
import { styled } from '@mui/material/styles';
// import { AppRouter } from '../types';
import * as SystemModel from '../../model/SystemModel';

//******************************************************************************
// 스타일
//******************************************************************************
const SidebarItem = styled(ListItemButton)(({theme}) => ({
  margin: "4px",
  background: theme.palette.color.menu.base,

  "&: hover": {
    backgroundColor: theme.palette.color.menu.hover
  },
  "&: active": {
    backgroundColor: theme.palette.color.menu.click
  },
}));

const SidebarItemChild = styled(ListItemButton)(({theme}) => ({
  margin: "4px",
  background: theme.palette.color.menu.base,

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
export interface SidebarItemWithChildProps{
  item: SystemModel.AppRouter,
  clickCallback: (link: string, move: boolean) => void
}
export const SidebarItemWithChild = (props: SidebarItemWithChildProps) => {
  //! 자식 메뉴를 열고 접는다.
  const [open, setOpen] = useState(true);

  return (
    <>
      <SidebarItem onClick={() => {
        props.clickCallback(props.item.path, props.item.clickable);
        setOpen(!open);
        }}>
        <ListItemIcon>
          {props.item.icon}
        </ListItemIcon>
        <ListItemText
          disableTypography
          primary={
            <Typography>
              {props.item.title}
            </Typography>
          }>
        </ListItemText>
        {open ? <ExpandLessOutlinedIcon /> : <ExpandMoreOutlinedIcon />}
      </SidebarItem>
      <Collapse in={open} timeout="auto">
        <List disablePadding>
          {
          props.item.child?.map((route: SystemModel.AppRouter, index: number) => (
            <SidebarItemChild onClick={() => {props.clickCallback(route.path, route.clickable)}}>
              <ListItemIcon>
                {route.icon}
              </ListItemIcon>
              {route.title}
            </SidebarItemChild>
          ))}
        </List>
      </Collapse>
    </>

  );
}