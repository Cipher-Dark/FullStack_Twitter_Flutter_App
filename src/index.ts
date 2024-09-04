import express, { Express } from "express";
import http from "http";
import cors from "cors";
import dotenv from "dotenv";
import bodyParser from "body-parser";
import router from "./routes/routes";
import mongoose from "mongoose";
import { error } from "console";
const app: Express = express();
const server = http.createServer(app);

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended : true}));
app.set("PORT",5000);
app.set("BASE_URL","localhost");

dotenv.config()


// define the routes 

app.use("/api/v1",router)


// mongo connection 
const mongoURI = process.env.MONGO_DB_URI

if(!mongoURI){
    console.error("Mongo db url is not defined")
    process.exit(1)
}
mongoose.connect(mongoURI, {}).then(() => {
    console.log("MongoDb is connected")
})
.catch((error) => {
    console.log(error)
})
try{
    const port: Number = app.get("PORT")
    const baseUrl :String =  app.get("BASE_URL")
    server.listen(port, () : void=>{
        console.log("Server is listening")
    })
}catch (error){
    console.log(error);
}

export default server
