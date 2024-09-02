import { Router, Request, Response } from "express";
const helloRouter = Router();


// define route path 
helloRouter.get("/", (req: Request, res: Response)=>{
    res.json({"data" : "server is live"});
});


export default helloRouter;