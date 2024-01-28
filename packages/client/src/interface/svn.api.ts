import axios from "axios";

// const server_url = "http://localhost:5000"
const server_url = "http://172.30.1.91:5000"

const mysvn = (router: string): string => {
  return server_url + router;
}

export const svn_heartbeat = async () => {
  const res = await axios.get(mysvn("/svn/heartbeat?query=ls /home/ubuntu"));
  return res.data;
}

export const svn_repository_list = async () => {
  const res = await axios.get(mysvn("/svn/list"));
  return res.data;
}