import express from "express";
import dotenv from "dotenv"
import userRoutes from "./route/userRoute"
import mongoose from "mongoose";
import cookieParser from "cookie-parser";
import cors from "cors"
import todoRoutes from "./route/todoRoutes" 

dotenv.config();

async function connectDb (){
    await mongoose.connect(process.env.DB_CONNECT!)
    console.log("connected to db")
}

const app = express()
app.use(express.json())
app.use(cookieParser())
app.use(cors({
    origin:"http://localhost:5173",
    credentials:true
}))

app.use("/api/auth" , userRoutes)
app.use("/api/todo" , todoRoutes)



const port = process.env.PORT;

app.listen(port , () =>{
    connectDb()
    console.log("server is runing on port " , port)
})
