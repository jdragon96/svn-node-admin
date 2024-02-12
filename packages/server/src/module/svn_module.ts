import * as Model from "../model/models";

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
        id: id_and_password[0],
        password: id_and_password[1]
      }
    )
  }

  return result;
}