import { Router } from "express";
import { getTweetController,updateTweetController,deleteTweetController,createTweetController } from "../controllers/twitter.controller";
const tweetRouter = Router();

// define route path 
tweetRouter.get("/:tweetId", getTweetController)
tweetRouter.get("/", getTweetController)
tweetRouter.post("/", createTweetController)
tweetRouter.delete("/:tweetId",deleteTweetController)
tweetRouter.put("/", updateTweetController)

export default tweetRouter