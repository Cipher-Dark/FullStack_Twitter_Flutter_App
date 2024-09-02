"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const twitter_controller_1 = require("../controllers/twitter.controller");
const tweetRouter = (0, express_1.Router)();
// define route path 
tweetRouter.get("/:tweetId", twitter_controller_1.getTweetController);
tweetRouter.get("/", twitter_controller_1.getTweetController);
tweetRouter.post("/", twitter_controller_1.createTweetController);
tweetRouter.delete("/:tweetId", twitter_controller_1.deleteTweetController);
tweetRouter.put("/", twitter_controller_1.updateTweetController);
exports.default = tweetRouter;
