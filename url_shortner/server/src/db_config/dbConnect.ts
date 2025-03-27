import mongoose, { mongo } from "mongoose";
import dotenv from "dotenv"

dotenv.config()

const db = process.env.DB_CONNECT
async function dbConnect() {
    try {
        await mongoose.connect(db!)

        console.log("connected to db")
    } catch (error: any) {
        console.log("error in connecting db ", error.message)
    }

}

export default dbConnect