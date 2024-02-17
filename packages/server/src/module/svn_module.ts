import * as Model from "../../../shared/model/models";

//! SVN 계정 목록을 조회한다.
export const parsing_svn_accounts = async(parsing_str: string): Promise<Model.account[]> => {
  var result: Model.account[] = [];

  // 1. 주석 없애기
  var split_str = parsing_str.split("\n");
  var str_list = [];
  for(var value of split_str)
  {
    if(0 <= value.indexOf("#")) continue;
    str_list.push(value);
  }

  // 2. 아이디 파싱하기
  var skip_flag = true;
  const id_start_flag = "[users]"
  for(var value of str_list)
  {
    // 2.1. 플레그 체크
    if(true === skip_flag)
    {
      if(id_start_flag === value) skip_flag = false;
    }
  
    // 2.2. 스킵 여부 확인하기
    if(skip_flag) continue;
  
    // 2.3. ID 추가
    const id_and_password = value.split("=");
    if(id_and_password.length !== 2) continue;
    result.push(
      {
        id: id_and_password[0].replace(" ", ""),
        password: id_and_password[1].replace(" ", "")
      }
    )
  }

  return result;
}

//! SVN 저장소 목록을 조회한다.
export const search_svn_repository_list = async(output: string): Promise<Model.svn_list_response> => {
  
  var packet: Model.svn_list_response = 
  {
    repostiories: []
  };

  // delete last word
  var repo_list = output.split("\n");

  // 저장소 이름을 리스트에 저장한다.
  for(var repo of repo_list)
  {
    if(repo === "") continue;
    packet.repostiories.push({
      name: repo
    });
  }

  return packet;
}

//! SVN 저장소를 생성한다
export const create_svn_repository = async() => {

}

////////////////////////////////////////////////////////////// BASH COMMAND

//! passwd폴더에 계정 정보를 한 줄 추가한다.
export const cmd_append_account = (
  id: string, 
  password: string,
  svn_root_path: string,
  svn_repository: string
) => 
{
  return `echo "${id}=${password}" | tee -a ${svn_root_path}/${svn_repository}/conf/passwd`;
}

//! 계정 정보를 읽어온다.
export const cmd_get_account_list = (
  svn_root_path: string,
  svn_repository: string
) => 
{
  return `cat ${svn_root_path}/${svn_repository}/conf/passwd`;
}

//! 저장소 목록 조회
export const cmd_get_repository_list = (svn_root_path: string,) => 
{
  return `ls ${svn_root_path}`;
}

//! 신규 저장소 생성
export const cmd_create_new_repository = (
  svn_root_path: string,
  repository_name: string
) => {
  return `svnadmin create --fs-type fsfs ${svn_root_path}/${repository_name}`;
}