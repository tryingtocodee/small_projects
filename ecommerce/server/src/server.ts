import express from "express"
import cookieParser from "cookie-parser"
import dotenv from "dotenv"
import dbConnect from "./dbConfig/dbConnect.js"
import authRoutes from "./routes/authRoutes.js"
import productRoutes from "./routes/productRoutes.js"
import cartRoutes from "./routes/productRoutes.js"
import analyticsRoutes from "./routes/productRoutes.js"
import couponRoutes from "./routes/productRoutes.js"

//complete in last 
import paymentRoutes from "./routes/productRoutes.js"

dotenv.config()

const app = express()

const port = process.env.PORT

app.use(express.json())
app.use(cookieParser())

app.use("/api/auth" , authRoutes)
app.use("/api/products" , productRoutes)
app.use("/api/cart" , cartRoutes)
app.use("/api/payment" , paymentRoutes)
app.use("/api/analytics" , analyticsRoutes)
app.use("/api/coupon" , couponRoutes)


app.listen(port , () => {
    dbConnect()
    console.log("port is running on " , port)
})


