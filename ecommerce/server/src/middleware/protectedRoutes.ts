import { NextFunction , Request , Response } from "express"
import {User} from "../model/userModel"
import jwt from "jsonwebtoken"
import dotenv from "dotenv"
import { Document } from "mongoose"

dotenv.config()

interface IUser extends Document {
    username : string ,
    email : string ,
    password : string ,
    role : string ,
    isVerified : boolean ,
    createdAt : Date ,
    updatedAt : Date
}

declare global {
    namespace Express  {
        interface Request {
            user? : IUser | null
        }
    }
}


const secret = process.env.JWT_SECRET

const protectedRoutes = async(req : Request , res : Response , next : NextFunction) :Promise<any> =>{
    try {
        const token = req.cookies.token

        if(!token){
            return res.json("no token found")
        }

        if(!secret){
            console.log("jwt secret not found")
            return res.json("error occured")
        }
        const verifyToken : any = jwt.verify(token , secret)

        if(!verifyToken){
            return res.json("incorrect token")
        }

        const user = await User.findOne({email : verifyToken.email})

        req.user  = user

        next()
    } catch (error : any) {
        console.log("error in protected Routes" , error.message)
        return res.status(400).json("error occured")
    }
}

export default protectedRoutes