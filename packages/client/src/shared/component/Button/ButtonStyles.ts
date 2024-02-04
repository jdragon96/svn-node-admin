import { useEffect, useState } from "react";
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

export const GradientButton = styled(Button)(({ theme }) => ({
  color: theme.palette.text.primary,
  border: '0px solid',
  borderColor: '#0a85ff',
  background: 'linear-gradient(to right top, #7d00ff, #0010ff)',
  // marginBottom: '5px',
  borderRadius: '2px',
}));
