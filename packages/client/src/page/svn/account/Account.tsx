import * as Layout from "@/page/layout/MainLayout";
import * as Style from "@/shared/theme/LayoutStyle";
import * as Theme from "@/shared/theme/createMyTheme";
import * as SystemModel from "@/shared/model/SystemModel";
import * as API from "@/interface/svn.api";
import * as MyListView from "@/shared/component";
import { GradientButton } from "@/shared/component";
import { DarkTitleBar } from "@/shared/component";
import {Model} from "@svn-admin/shared";
import * as Impl from "./Impl";

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
  TextField
} from '@mui/material';
import { styled } from '@mui/material';
import React = require("react");

const CenterAlignBox = styled(Box)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'center'
}));

const BlackTextField = styled(TextField)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'center'
}));


export const Account = () => {
  //! 저장소 목록
  const [repoList, setRepoList] = useState<Model.repository[]>([]);
  //! 현재 선택된 저장소
  const [selectedRepo, setSelectedRepo] = useState<string>("");
  //! 저장소 내 계정 목록
  const [accountList, setAccountList] = useState<Model.account[]>([]);
  //! 새로 등록할 계정
  const [newID, setNewID] = useState<string>("");
  const [newPassword, setNewPassword] = useState<string>("");

  useEffect(() => {
    Initialize();
  }, [])

  const Initialize = async () => {
    // 1. Repository 목록을 조회한다.
    var repo_list = await API.svn_repository_list();
    if(repo_list !== null)
    {
      console.log(`저장소 목록 조회: ${repo_list}`);
      setRepoList(repo_list.body.repostiories);
    }
  }
  
  // 새로운 계정을 생성한다.
  const onCheckSvnHeartBeat = () => {

  }

  const onCreateNewRepository = async() => {
    console.log("[Account] 새 계정 등록 버튼 클릭");
    // TODO: 팝업창 띄우고, 새 저장소 등록
  }

  //! 새로운 계정을 등록한다.
  const onCreateNewAccount = async() => {
    // 1. 유효성 체크
    var validation = Impl.check_account_validation(newID, newPassword);
    if(!validation.is_success)
    {
      //TODO: 토스트 메세지 출력하기
    }

    // 2. API 호출
    var result = await API.add_new_account(
      {
        repository_name: selectedRepo,
        id: newID, 
        password: newPassword
      });
    if(result !== null)
    {
      if(result.is_success)
      {
        setAccountList(result.body.accounts);
      }
    }
  }

  const onSelectRepository = async(repo: string) => {
    console.log(`[Account] 현재 선택된 매뉴 : ${repo}`);
    setSelectedRepo(repo);
    var accountList = await API.get_account_list({repository_name: repo});
    if(accountList !== null)
    {
      console.log(`계정 목록 : ${accountList.body.accounts}, 계정 개수 : ${accountList.body.accounts.length}`);
      accountList.body.accounts.forEach((value, index) => 
      {
        console.log(`${value.id} / ${value.password}`);
        setAccountList(accountList.body.accounts);
      })
    }
  }

  return (
    <>
      <Grid container columnSpacing={1} xs={12} height={"100%"}>
        {/* 저장소 목록 리스트 및 추가버튼 */}
        <Grid item sx={{width: "200px"}}>
          <CenterAlignBox sx={{height: "80px"}}>
            <GradientButton 
              fullWidth
              onClick={onCreateNewRepository} 
              sx={{fontSize: '40px'}}>
                +
            </GradientButton>
          </CenterAlignBox>
          <Grid item xs sx={{paddingTop: "8px", height: "100%"}}>
            <List
            sx={
              {
                background: "#000000",
                height: "100%",
                borderRadius: "2px"
              }}>
              {
                repoList.map((item: Model.repository, index: number) => 
                {
                  return (
                    <ListItem>
                      <ListItemButton onClick={(e) => onSelectRepository(item.name)}>
                        {item.name}
                      </ListItemButton>
                    </ListItem>
                  )
                })
              }
            </List>
          </Grid>
        </Grid>
        
        <Grid item xs>
          <Grid container sx={{height: "100%"}}>
            {/* 상단 타이틀바 */}
            <Grid item xs={12}>
              <DarkTitleBar
                buttonSize="80px"
                buttonFontSize="12px"
                selectedRepository={selectedRepo}/>
            </Grid>

            {/* 저장소 세부 정보창 */}
            <Grid container sx={{paddingTop: "8px", height: "100%"}}>
              <Grid item xs={12} sx={{background: "#000000", width: "100%", height: "100%"}}>
                {/* 계정 목록 */}
                <Grid item>
                  <Typography
                    sx={{fontSize: "18px"}}>
                    계정 설정
                  </Typography>
                  <Grid container xs={12}>
                    <Grid item xs>
                      <BlackTextField
                        hiddenLabel
                        id="new-id"
                        // variant="standard"
                        label="ID"
                        margin="dense"
                        value={newID}
                        onChange={(e) => setNewID(e.target.value)}/>
                      <BlackTextField
                        hiddenLabel
                        id="new-id"
                        // variant="standard"
                        label="Password"
                        margin="dense"
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}/>
                    </Grid>
                    <Grid item
                      direction="column"
                      display="flex"
                      alignItems="center"
                      justifyContent="center">
                      <GradientButton 
                        fullWidth
                        onClick={onCreateNewAccount} 
                        sx={{fontSize: '14px', width: "120px", height: "120px", margin: "8px"}}>
                          계정 추가
                      </GradientButton>
                    </Grid>
                  </Grid>
                  <List
                    sx={
                      {
                        background: "#000000",
                        height: "100%",
                        borderRadius: "2px"
                      }}>
                      {
                        accountList.map((item: Model.account, index: number) => 
                        {
                          return (
                            <ListItem>
                              <Typography>
                                {item.id}
                              </Typography>
                              <Typography>
                                {item.password}
                              </Typography>
                            </ListItem>
                          )
                        })
                      }
                    </List>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </>
  )
}