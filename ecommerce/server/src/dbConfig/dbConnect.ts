import mongoose from "mongoose";
import dotenv from "dotenv"

dotenv.config()



async function dbConnect () {
    try {
        const db = process.env.DB_CONNECT

        if(!db){
            console.log("db from .env file not found ")
            return 
        }
        await mongoose.connect(db)
    } catch (error : any) {
        console.log("error in db connect")
        return 
    }
} 

export default dbConnect