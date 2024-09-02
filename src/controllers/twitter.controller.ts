import { Request, Response } from "express";
import { getTweetRepo, createTweetRepo, updateTweetRepo, deleteTweetRepo } from "../repository/twitter.repositary";
import { ITweetInterface } from "../database/interfaces/twitter.interface";
import { error, log } from "console";
import { updateUserWithTweetIdRepo, deleteUserWithTweetIdRepo } from "../repository/user.repository";
import { IUserInterface } from "../database/interfaces/user.interface";
export const getTweetController = async (req: Request, res: Response) => {
    const tweetId = req.params.tweetId as string;
    try {
        const tweet = await getTweetRepo(tweetId);
        if (tweet) {
            res.status(200).json({ data: tweet });
        } else {
            res.status(500).json({ error: " Tweet not found" });
        }
    } catch (error) {
        console.log(error)
        res.status(500).json({ error: error });
    }
}

export const createTweetController = async (req: Request, res: Response) => {
    const tweet: ITweetInterface = req.body;
    console.log(tweet);
    try {
        const success = await createTweetRepo(tweet);
        if (success) {
            const userUpdateSuccess = await updateUserWithTweetIdRepo(tweet.adminId, tweet.tweetId);
            if (userUpdateSuccess) {
                res.status(200).json({ data: tweet });
            } else {
                res.status(500).json({ error: "User not updated " });
            }

        } else {
            res.status(500).json({ error: " Tweet not Created" });
        }

    } catch (error) {
        console.log(error)
        res.status(500).json({ error: error });
    }
}
export const updateTweetController = async (req: Request, res: Response) => {
    const updatedTweet: ITweetInterface = req.body;

    try {
        const success = await updateTweetRepo(updatedTweet.tweetId, updatedTweet);
        if (success) {
            res.status(200).json({ data: "tweet updated " });
        } else {
            res.status(404).json({ error: " Tweet not updated" });
        }

    } catch (error) {
        console.log(error)
        res.status(500).json({ error: error });

    }
}
export const deleteTweetController = async (req: Request, res: Response) => {
    const tweetId = req.params.tweetId as string;
    const updatedTweet: ITweetInterface = req.body;
    console.log(tweetId);
    console.log(updatedTweet);
    console.log(updatedTweet.adminId);
    try {
        const success = await deleteTweetRepo(tweetId);
        if (success) {
            // const deleteUpdateSuccess = await deleteUserWithTweetIdRepo(tweetId, tweetId);
            // if (deleteUpdateSuccess) {
            res.status(200).json({ data: "tweet deleted " });
            // } else {
            //     res.status(404).json({ error: " Tweet not deleted from user data" });
            // }
        } else {
            res.status(500).json({ error: " Tweet not deleted" });
        }
    } catch (error) {
        console.log(error)
        res.status(500).json({ error: error });
    }
}

