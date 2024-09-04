"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteTweetController = exports.updateTweetController = exports.createTweetController = exports.getTweetController = void 0;
const twitter_repositary_1 = require("../repository/twitter.repositary");
const user_repository_1 = require("../repository/user.repository");
const getTweetController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const tweetId = req.params.tweetId;
    try {
        const tweet = yield (0, twitter_repositary_1.getTweetRepo)(tweetId);
        if (tweet) {
            res.status(200).json({ data: tweet });
        }
        else {
            res.status(500).json({ error: " Tweet not found" });
        }
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ error: error });
    }
});
exports.getTweetController = getTweetController;
const createTweetController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const tweet = req.body;
    console.log(tweet);
    try {
        const success = yield (0, twitter_repositary_1.createTweetRepo)(tweet);
        if (success) {
            const userUpdateSuccess = yield (0, user_repository_1.updateUserWithTweetIdRepo)(tweet.adminId, tweet.tweetId);
            if (userUpdateSuccess) {
                res.status(200).json({ data: tweet });
            }
            else {
                res.status(500).json({ error: "User not updated " });
            }
        }
        else {
            res.status(500).json({ error: " Tweet not Created" });
        }
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ error: error });
    }
});
exports.createTweetController = createTweetController;
const updateTweetController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const updatedTweet = req.body;
    try {
        const success = yield (0, twitter_repositary_1.updateTweetRepo)(updatedTweet.tweetId, updatedTweet);
        if (success) {
            res.status(200).json({ data: "tweet updated " });
        }
        else {
            res.status(404).json({ error: " Tweet not updated" });
        }
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ error: error });
    }
});
exports.updateTweetController = updateTweetController;
const deleteTweetController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const tweetId = req.params.tweetId;
    const updatedTweet = req.body;
    try {
        const success = yield (0, twitter_repositary_1.deleteTweetRepo)(tweetId);
        if (success) {
            const deleteUpdateSuccess = yield (0, user_repository_1.deleteUserWithTweetIdRepo)(updatedTweet.adminId, updatedTweet.tweetId);
            if (deleteUpdateSuccess) {
                res.status(200).json({ data: "tweet deleted " });
            }
            else {
                res.status(404).json({ error: " Tweet not deleted from user data" });
            }
        }
        else {
            res.status(500).json({ error: " Tweet not deleted" });
        }
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ error: error });
    }
});
exports.deleteTweetController = deleteTweetController;
