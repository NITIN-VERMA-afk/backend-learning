
import dotenv from "dotenv"
import mongoose from "mongoose";
import { DB_NAME } from "./constants.js";
import connectDB from "./db/index.js";
import {app} from "./app.js"
dotenv.config({
    path:`./.env`
})
connectDB()
.then(()=>{
    app.listen(process.env.port||8000,()=>{
        console.log(`server is running at port :${process.env.port}`);
    })
    app.on("error",()=>{
        console.log("Err:",error);
        throw error
    })
})
.catch((err)=>{
    console.log("MONGO db connection failed !!!",err)
})


