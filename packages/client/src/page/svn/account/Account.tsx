import * as Layout from "@/page/layout/MainLayout";
import * as Style from "@/shared/theme/LayoutStyle";
import * as Theme from "@/shared/theme/createMyTheme";
import * as SystemModel from "@/shared/model/SystemModel";
import * as API from "@/interface/svn.api";
import * as MyListView from "@/shared/component";
import { GradientButton } from "@/shared/component";
import { DarkTitleBar } from "@/shared/component";

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

const CenterAlignBox = styled(Box)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'center'
}));


export const Account = () => {
  //! 저장소 목록
  const [repoList, setRepoList] = useState<string[]>([]);
  //! 현재 선택된 저장소
  const [selectedRepo, setSelectedRepo] = useState<string>("");

  useEffect(() => {
    test();
    setRepoList(["Repository1", "Repository2", "DDS"]);
  }, [])

  const test = async () => {
    var res = await API.svn_heartbeat();
    if(res !== null)
    {
      var items = res.data.query.split("\n");
      console.log(items);
    }    

    var repo_list = await API.svn_repository_list();
    if(repo_list !== null)
    {
      console.log(JSON.parse(repo_list.data.query));
    }
  }
  
  // 새로운 계정을 생성한다.
  const onCheckSvnHeartBeat = () => {

  }

  //! 새로운 계정을 등록한다.
  const onCreateNewAccount = () => {
    console.log("[Account] 새 계정 등록 버튼 클릭");
  }

  const onSelectRepository = (selectedRepo: string) => {
    console.log(`[Account] 현재 선택된 매뉴 : ${selectedRepo}`);
    setSelectedRepo(selectedRepo);
  }

  return (
    <>
      <Grid container columnSpacing={1} xs={12} height={"100%"}>
        {/* 저장소 목록 리스트 및 추가버튼 */}
        <Grid item sx={{width: "200px"}}>
          <CenterAlignBox sx={{height: "80px"}}>
            <GradientButton 
              fullWidth
              onClick={onCreateNewAccount} 
              sx={{fontSize: '40px'}}>
                +
            </GradientButton>
          </CenterAlignBox>
          <Grid item sx={{paddingTop: "8px", height: "100%"}}>
            <MyListView.DarkListView
              items={repoList}
              itemSelectCallback={onSelectRepository}/>
          </Grid>
        </Grid>
        
        <Grid item xs>
          <Grid container xs={12} sx={{height: "100%"}}>
            {/* 상단 타이틀바 */}
            <Grid item xs={12}>
              <DarkTitleBar
                buttonSize="80px"
                buttonFontSize="12px"
                selectedRepository={selectedRepo}/>
            </Grid>

            {/* 저장소 세부 정보창 */}
            <Grid container xs={12} sx={{paddingTop: "8px", height: "100%"}}>
              <Grid item xs={12} sx={{background: "#000000", width: "100%", height: "100%"}}>
                <Typography>
                  Test
                </Typography>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </>
  )
}