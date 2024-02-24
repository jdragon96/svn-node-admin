import express, { Express, Request, Response, NextFunction } from 'express';
import * as process from "child_process";
// import * as Model from "../../../shared/model/models"
import {Model} from "@svn-admin/shared";
import * as SvnModule from "../module/svn_module";

const create_default_packet = <T>(flag: boolean, msg: string, body: T) => {
  var result: Model.response_packet<T> = 
  {
    is_success: flag,
    message: msg,
    body: body
  }
  return result;
}

const print_packet = (packet: any) => {
  console.log(packet);
}

export const svn_router = express.Router();

const svn_root_path = "/home/svn";

svn_router.use("/", (req: Request, res: Response, next: NextFunction) => {
  console.log(`[${Date.now().toLocaleString()}] ${req.url}`)
  // console.log(`${req.url} => ${JSON.stringify(req.query)}`);
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
  var command = SvnModule.cmd_create_new_repository(svn_root_path, query.repository_name);

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
  var command = SvnModule.cmd_get_repository_list(svn_root_path);

  var p = await process.exec(command, async(err, output: string) => 
  {
    var response: Model.response_packet<Model.svn_list_response> = 
    {
      is_success: true,
      message: "success",
      body: await SvnModule.search_svn_repository_list(output)
    }
    console.log(output);

    res.send(JSON.stringify(response));
  });
});

//! get account list
svn_router.get("/account", async (req: Request, res: Response) => {
  var query: Model.svn_account_request = JSON.parse(JSON.stringify(req.query));
  var command = SvnModule.cmd_get_account_list(svn_root_path, query.repository_name);

  var p = await process.exec(command, async(err, output) => 
  {
    var response: Model.response_packet<Model.svn_account_response> = 
    {
      is_success: true,
      message: "success",
      body:
      {
        accounts: await SvnModule.parsing_svn_accounts(output)
      }
    };
    console.log(response);
    // serialization
    res.send(JSON.stringify(response));
  });
});

//! get account list
svn_router.delete("/account", async (req: Request, res: Response) => {
  var query: Model.delete_acount_request = JSON.parse(JSON.stringify(req.query));
  var command = SvnModule.cmd_find_line_number(
    svn_root_path, 
    query.repository_name,
    query.id,
    query.password);
  var response: Model.response_packet<boolean> = 
    {
      is_success: true,
      message: "success",
      body: true
    };

  var p = await process.exec(command, async(err, output) => 
  {
    if(err) {
      response.is_success = false;
      res.send(JSON.stringify(response));
      return;
    }
    var num = Number(output.split(":")[0])
    command = SvnModule.cmd_delete_account(svn_root_path, query.repository_name, num);

    var p = await process.exec(command, async(err, output) => 
    {
      if(err) response.is_success = false;
      res.send(JSON.stringify(response));
    })
  });
});

//! add new account
svn_router.post("/account", async (req: Request, res: Response) => {
  var query: Model.add_acount_request = req.body;
  var command = SvnModule.cmd_get_account_list(svn_root_path, query.repository_name);
  var response: Model.response_packet<Model.svn_account_response> = 
  {
    is_success: true,
    message: "success",
    body: {accounts: []}
  }

  // 1. 기존 계정 목록을 조회한다.
  var p = await process.exec(command, async(err, output) => 
  {
    var account_list: Model.account[] = await SvnModule.parsing_svn_accounts(output);

    // 2. 중복체크를 한다.
    for(var account of account_list)
    {
      if(account.id === query.id)
      {
        console.log("중복 아이디 조회");
        response.is_success = false;
        response.message = "already exist account";
        res.send(JSON.stringify(response));
        return;
      }
    }

    // 3. 추가
    // 반드시 passwd가 chmod 777로 설정되어야 함
    command = SvnModule.cmd_append_account(query.id, query.password, svn_root_path, query.repository_name);
    p = await process.exec(command, async(err, output) => 
    {
      if(err)
      {
        console.log(`3 ${err.message}`);
        response.is_success = false;
        response.message = "fail to insert id...";
      }
      response.message = output;
      account_list.push({id: query.id, password: query.password});
      response.body.accounts = account_list;
      res.send(JSON.stringify(response));
    });
  });
});