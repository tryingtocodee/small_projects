import { NextFunction , Response , Request } from "express";
import {User} from "../models/userSchema"
import jwt from "jsonwebtoken"
import dotenv from "dotenv"

dotenv.config()

const secret = process.env.SECRET

async function protectedRoutes(req :Request, res:Response , next:NextFunction) : Promise<any>{
    try {
        const token = req.cookies.token

        if(!token){
            return res.status(400).json("no token found")
        }

        if(!secret){
          
            return res.json("error occured")
        }

        const verifyToken :any =  jwt.verify(token , secret)

        if(!verifyToken){
           
            return res.json("incorrect token")
        }

        const user = await User.findOne({email : verifyToken.email})

        //@ts-ignore
        req.user = user
        console.log("user found" , user)

        next()
    } catch (error : any) {
        console.log("error occured in protected Routes" , error.message)
        return res.json("error occured")
    }
}


export default protectedRoutes