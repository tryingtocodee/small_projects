import express from "express"
import cookieParser from "cookie-parser"
import dotenv from "dotenv"
import dbConnect from "./dbConfig/dbConnect"
import authRoutes from "./routes/authRoutes"


dotenv.config()

const app = express()

const port = process.env.PORT

app.use(express.json())
app.use(cookieParser())

app.use("/api/auth" , authRoutes)


app.listen(port , () => {
    dbConnect()
    console.log("port is running on " , port)
})


