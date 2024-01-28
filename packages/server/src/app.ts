import express, { Express, Request, Response } from 'express';
import {svn_router} from "./api/svn"
import cors from "cors"

const app: Express = express();
const port = 5000;

app.use(cors());

app.use("/svn", svn_router);

app.listen(port, () => {
  console.log(`[server]: Server is running at <https://localhost>:${port}`);
});