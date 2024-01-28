import express, { Express, Request, Response, NextFunction } from 'express';
import * as process from "child_process";
import * as Model from "../model/models"

const create_default_packet = <T>(flag: boolean, msg: string, body: T) => {
  var result: Model.response_packet<T> = 
  {
    is_success: flag,
    message: msg,
    body: body
  }
  return result;
}

export const svn_router = express.Router();

const svn_root_path = "/home/svn";

svn_router.use("/", (req: Request, res: Response, next: NextFunction) => {
  console.log('Time: ', Date.now())
  console.log(`${req.url} => ${JSON.stringify(req.query)}`);
  next()
});


//! find svn repository root path
svn_router.get("/root", async (req: Request, res: Response) => {
  var query: Model.svn_heartheat_request = JSON.parse(JSON.stringify(req.query));
  var hb_response = create_default_packet<string>(true, "", svn_root_path);
  res.send(hb_response);
});


//! check status svn process either live or dead.
svn_router.get("/heartbeat", async (req: Request, res: Response) => {
  var query: Model.svn_heartheat_request = JSON.parse(JSON.stringify(req.query));
  var p = await process.exec(query.query, (err, output) => 
  {
    var hb_response = create_default_packet<string>(err ? true : false, output, output);
    res.send(hb_response);
  });
});


//! create new repositoy
svn_router.get("/create", async (req: Request, res: Response) => {
  var query: Model.svn_create_request = JSON.parse(JSON.stringify(req.query));
  var command = "svnadmin create --fs-type fsfs " + 
                  svn_root_path + 
                  "/" + 
                  query.repository_name;

  var p = await process.exec(command, (err, output) => 
  {
    var response = create_default_packet<string>(err ? true : false, output, output);
    
    // error check
    if(output.length < 1)
    {
      response.is_success = true;
      response.message = "success";
    }
    else if (output.indexOf("E165002") < 0)
    {
      response.is_success = false;
      response.message = "Already exist repository. please use another name!";
    }

    res.send(response);
  });
});


//! find all repository
svn_router.get("/list", async (req: Request, res: Response) => {
  var command = "ls " + svn_root_path;

  var p = await process.exec(command, (err, output) => 
  {
    var response = create_default_packet<string>(err ? true : false, output, output);
    var packet: Model.svn_list_response = 
    {
      repostiories: []
    }

    // delete last word
    var repo_list = output.split("\n");
    for(var repo of repo_list)
    {
      if(repo === "") continue;
      packet.repostiories.push({
        name: repo
      });
    }

    // serialization
    response.body = JSON.stringify(packet)
    res.send(response);
  });
});