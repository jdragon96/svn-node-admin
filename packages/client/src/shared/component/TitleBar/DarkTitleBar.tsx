import { useEffect } from 'react';
import { GradientButton } from "@/shared/component";
import { 
  Typography,
  Box,
  Grid
} from '@mui/material';


export interface DarkTitleBarParam
{
  buttonSize: string
  buttonFontSize: string
  selectedRepository: string
  removeCallback: (respository_name: string) => void
}
export const DarkTitleBar = (param: DarkTitleBarParam) => {

  useEffect(() => 
  {
    // console.log(param.items);
  }, [])

  return (
    <>
      <Grid container spacing={1}>
        <Grid item xs>
          <Typography
            sx={
              {
                width: "100%", 
                height: param.buttonSize, 
                background: "#000000",
                fontSize: "14px",
                display: "flex", 
                alignItems: "center",
              }}>
                선택된 저장소 : {param.selectedRepository}
          </Typography>
        </Grid>
        <Grid item>
          <GradientButton 
            onClick={(e) => param.removeCallback(param.selectedRepository)}
            sx={
            {
              width: param.buttonSize, 
              height: param.buttonSize, 
              fontSize: param.buttonFontSize
            }}>
            Delete
          </GradientButton>
        </Grid>
        <Grid item>
          <GradientButton sx={
              {
                width: param.buttonSize, 
                height: param.buttonSize, 
                fontSize: param.buttonFontSize
              }}>
            Save
          </GradientButton>
        </Grid>
      </Grid>
    </>
  )
}