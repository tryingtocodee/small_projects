import express from "express"
import dotenv from "dotenv" ;
import cookieParser from "cookie-parser"
import cors from "cors"
import authRoutes from "./routes/authRoutes"
import urlRoutes from "./routes/urlRoutes"
import dbConnect from "./db_config/dbConnect"

dotenv.config() ;


const app = express();
const port = process.env.PORT ;

app.use(express.json())
app.use(cookieParser())
app.use(cors({
    origin : "http://localhost:5000",
    credentials:true
}))


app.use("/api/auth" , authRoutes) 
app.use("/api/url" , urlRoutes)


app.listen(port , () =>{
    dbConnect()
    console.log("server is running on port" , port ) 
})