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
  var command = "cat " + 
                svn_root_path + 
                "/" + 
                query.repository_name + 
                "/conf/passwd";

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

//! add new account
svn_router.post("/account", async (req: Request, res: Response) => {
  var query: Model.add_acount_request = req.body;
  console.log(`body : ${req.body}`);
  console.log(`query : ${req.query}`);
  var command = "cat " + 
                svn_root_path + 
                "/" + 
                query.repository_name + 
                "/conf/passwd";
  var response: Model.response_packet<Model.svn_account_response> = 
  {
    is_success: true,
    message: "success",
    body: {accounts: []}
  }

  // 1. 기존 계정 목록을 조회한다.
  var account_list: Model.account[] = [];
  var p = await process.exec(command, async(err, output) => 
  {
    account_list = await SvnModule.parsing_svn_accounts(output);
  });
  console.log("조회 완료");

  // 2. 중복체크를 한다.
  for(var account of account_list)
  {
    console.log(account);
    if(account.id == query.id)
    {
      console.log("중복 아이디 조회");
      response.is_success = false;
      response.message = "already exist account";
    }
  }

  // 3. 추가
  // 반드시 passwd가 chmod 777로 설정되어야 함
  command = `echo "${query.id}=${query.password}" > tee -a ${svn_root_path}/${query.repository_name}/conf/passwd`;
  console.log(command);
  p = await process.exec(command, async(err, output) => 
  {
    if(err)
    {
      console.log(`3 ${err.message}`);
      response.is_success = false;
      response.message = "fail to insert id...";
    }
    response.message = output;
  });
  
  res.send(JSON.stringify(response));
});