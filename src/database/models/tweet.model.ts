import mongoose, { Document, Schema } from "mongoose";
import { ITweetInterface } from "../interfaces/twitter.interface";

const tweetSchema = new Schema<ITweetInterface>({
    tweetId: {type: String, required: true},
    createdAt:{type: String,  required: true},
    content:{type:String, default:""},
    adminId:{type: String,  required: true}
});

const TweetModel = mongoose.model<ITweetInterface>('TweetModel', tweetSchema)
export default TweetModel;
