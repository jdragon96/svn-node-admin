import express, { Express, Request, Response, NextFunction } from 'express';
import * as process from "child_process";

export const svn_router = express.Router();

const svn_root_path = "/home/svn";

svn_router.use("/", (req: Request, res: Response, next: NextFunction) => {
  console.log('Time: ', Date.now())
  console.log(`${req.url} => ${JSON.stringify(req.query)}`);
  next()
});

interface svn_heartheat_request{
  query: string
}
interface response_packet<T>{
  is_success: boolean
  message: string
  query: T
}
svn_router.get("/heartbeat", async (req: Request, res: Response) => {
  var query: svn_heartheat_request = JSON.parse(JSON.stringify(req.query));
  var p = await process.exec(query.query, (err, output) => 
  {
    var hb_response: response_packet<string> = 
    {
      is_success: err ? false : true,
      message: output,
      query: output
    }
    res.send(hb_response);
  });
});

interface svn_create_request{
  repository_name: string
}
svn_router.get("/create", async (req: Request, res: Response) => {
  var query: svn_heartheat_request = JSON.parse(JSON.stringify(req.query));
  var p = await process.exec(query.query, (err, output) => 
  {
    var hb_response: response_packet<string> = 
    {
      is_success: err ? false : true,
      message: output,
      query: output
    }
    res.send(hb_response);
  });
});

interface svn_list_request{
}
svn_router.get("/list", async (req: Request, res: Response) => {
  var command = "ls " + svn_root_path;

  var p = await process.exec(command, (err, output) => 
  {
    var hb_response: response_packet<string> = 
    {
      is_success: err ? false : true,
      message: output,
      query: ""
    }
    
    var repo_list = output.split("\n");
    var resositories = [];
    for(var repo of repo_list)
    {
      if(repo === "") continue;
      resositories.push(repo);
    }

    hb_response.query = JSON.stringify(resositories)

    res.send(hb_response);
  });
});