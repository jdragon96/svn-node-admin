import axios, {AxiosResponse} from "axios";

// const server_url = "http://localhost:5000"
const server_url = "http://172.30.1.91:5000"

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

export const svn_repository_list = async (): ApiType => {
  var response: AxiosResponse | null = null;
  try{
    response = await axios.get(mysvn("/svn/list"));
  }
  catch(err)
  {
    // ERROR 
    response = null;
  }
  return response;
}