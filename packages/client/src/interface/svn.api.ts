import axios, {AxiosResponse} from "axios";
import { Model } from "@svn-admin/shared";


// const server_url = "http://localhost:5000"
const server_url = "http://172.30.1.91:5000"

interface ApiResult
{

}
type ApiType = Promise<AxiosResponse<any, any> | null>;

const mysvn = (router: string): string => {
  return server_url + router;
}

export const svn_heartbeat = async (): ApiType => {
  var response: AxiosResponse | null = null;
  try{
    response = await axios.get(mysvn("/svn/heartbeat?query=ls /home/ubuntu"));
  }
  catch(err)
  {
    // ERROR 
    response = null;
  }
  return response;
}

export const svn_repository_list = async (): Promise<Model.response_packet<Model.svn_list_response>> => {
  try{
    var response = await axios.get(mysvn("/svn/list"));
    console.log(response.data);
    return response.data;
  }
  catch(err)
  {
    // ERROR 
    return null;
  }
}

export const get_account_list = async(req: Model.svn_account_request): Promise<Model.response_packet<Model.svn_account_response>> => {
  try{
    var response = await axios.get(mysvn(`/svn/account?repository_name=${req.repository_name}`));
    return response.data;
  }
  catch(err){

  }
  return null;
}

export const add_new_account = async(req: Model.add_acount_request): Promise<Model.response_packet<Model.svn_account_response>> => {
  try{
    console.log(req);
    var response = await axios.post(mysvn("/svn/account"), req);
    return response.data;
  }
  catch(err){

  }
  return null;
}