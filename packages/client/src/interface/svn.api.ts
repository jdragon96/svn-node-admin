import axios from "axios";

const server_url = "http://localhost:5000"

const mysvn = (router: string): string => {
  return server_url + router;
}

export const svn_heartbeat = async () => {
  const res = await axios.get(mysvn("/svn/heartbeat?query=dir"));
  return res.data;
}