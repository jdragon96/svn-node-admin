import * as Layout from "@/page/layout/MainLayout";
import * as Style from "@/shared/theme/LayoutStyle";
import * as Theme from "@/shared/theme/createMyTheme";
import * as SystemModel from "@/shared/model/SystemModel";
import * as API from "@/extern_api/svn.api";
import * as MyListView from "@/shared/component";
import { GradientButton } from "@/shared/component";
import { DarkTitleBar } from "@/shared/component";
import {Model} from "@svn-admin/shared";
import * as Impl from "./Impl";

import { PopupModel } from "@/model/popup";

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
  IconButton,
  TextField,
  Dialog,
  DialogTitle,
  DialogContent,
  FormControlLabel,
  Checkbox,
  DialogActions
} from '@mui/material';

import { Close } from "@mui/icons-material";

export interface PopupCreateRepoProps
{
  isOpen: boolean
  create_callback: (repoName: string) => void
  close_callback: () => void
}
export const PopupCreateRepo = (props: PopupCreateRepoProps) => 
{
  const [open, setOpen] = useState<boolean>(props.isOpen);
  const [repoName, setRepoName] = useState<string>("");

  useEffect(() => 
  {
    setOpen(props.isOpen);
  });

  const onSaveNewRepository = () => 
  {
    // 1. Repository name validation check
    if(repoName.length < 1) return;

    // 2. try to create repository
    props.create_callback(repoName);
  }
  
  const justClosePopup = () => 
  {
    props.close_callback();
    setOpen(false);
  }

  return (
    <>
      <Dialog 
        open={open} 
        onClose={justClosePopup} 
        fullWidth maxWidth="sm">
          <DialogTitle>Create New Repository  
            <IconButton onClick={justClosePopup} style={{float:'right'}}>
              <Close color="primary"/>
            </IconButton>  
          </DialogTitle>
          <DialogContent>
              {/* <DialogContentText>Do you want remove this user?</DialogContentText> */}
              <Stack spacing={2} margin={2}>
                <TextField variant="outlined" label="Repository Name" value={repoName} onChange={(e) => setRepoName(e.target.value)}></TextField>
                {/* <TextField variant="outlined" label="Password"></TextField>
                <TextField variant="outlined" label="Email"></TextField>
                <TextField variant="outlined" label="Phone"></TextField>
                <FormControlLabel control={<Checkbox defaultChecked color="primary"></Checkbox>} label="Agree terms & conditions"></FormControlLabel> */}
                <Button color="primary" variant="contained" onClick={onSaveNewRepository}>Save</Button>
              </Stack>
          </DialogContent>
          <DialogActions>
          {/* <Button color="success" variant="contained">Yes</Button>
              <Button onClick={closepopup} color="error" variant="contained">Close</Button> */}
          </DialogActions>
      </Dialog>
    </>
  )
}