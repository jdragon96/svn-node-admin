export interface check_account_validation_return
{
  is_success: boolean
  message: string
}
export const check_account_validation = (id: string, pw: string): check_account_validation_return => 
{
  var result: check_account_validation_return = {is_success: true, message: "success"}
  if(id.length < 1)
  {
    result.is_success = false;
    result.message = "ID가 유효하지 않습니다";
    return result;
  }
  if(pw.length < 1)
  {
    result.is_success = false;
    result.message = "Password가 유효하지 않습니다";
    return result;
  }

  return result;
}