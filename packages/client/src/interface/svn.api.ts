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
  var response: Model.response_packet<Model.svn_list_response> | null = null;
  try{
    var responseString = await axios.get(mysvn("/svn/list"));
    response = JSON.parse(responseString.data);
  }
  catch(err)
  {
    // ERROR 
    response = null;
  }
  return response;
}