import { User } from "../db/userSchema";
import jwt from "jsonwebtoken";
import { Request , Response , NextFunction } from "express";
import dotenv from "dotenv"

dotenv.config()

const secret = process.env.SECRET

const protectedRoutes = async( req :Request , res : Response  , next : NextFunction) : Promise<any> =>{
    try {
        const token = req.cookies.token

        if(!token){
            return res.json("no token found .login again")
        }

        if(!secret){
            console.log("no secret token found")
            return res.json("error occured")
        }

        const decode : any = jwt.verify(token , secret)

        if(!decode){
            return res.json("incorrect token")
        }

        const user = await User.findOne({email : decode.email})

       
        //@ts-ignore
        req.user= user ;

        next()

    } catch (e : any) {
        console.log("error in protected Routes" , e.message)
        return res.status(400).json("error occured")
    }
}

export default protectedRoutes