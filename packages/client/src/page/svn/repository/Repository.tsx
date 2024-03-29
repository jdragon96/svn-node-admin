import * as Layout from "@/page/layout/MainLayout";
import * as Style from "@/shared/theme/LayoutStyle";
import * as Theme from "@/shared/theme/createMyTheme";
import * as SystemModel from "@/shared/model/SystemModel";

import {
  Stack,
  Grid,
  List,
  Box,
  Button,
  Typography,
  ListItemButton,
  ListItem,
  IconButton
} from '@mui/material';
import { styled } from '@mui/material';

const CenterAlignBox = styled(Box)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'center'
}));

const GradientButton = styled(Button)(({ theme }) => ({
  color: theme.palette.text.primary,
  border: '0px solid',
  borderColor: '#0a85ff',
  background: 'linear-gradient(to right top, #7d00ff, #0010ff)',
  marginBottom: '5px',
  borderRadius: '8px',
  fontSize: '24px'
}));

export const Repository = () => {

  const CommandAddNewRepository = () => {
    
  }

  return (
    <>
      <Grid container columnSpacing={1} xs={12}>
        <Grid item xs={2}>
          {/* 저장소 추가 버튼 */}
          <CenterAlignBox height={'80px'}>
            <GradientButton fullWidth onClick={CommandAddNewRepository} sx={{fontSize: '40px'}}>+</GradientButton>
          </CenterAlignBox>
        </Grid>
      </Grid>
    </>
  )
}