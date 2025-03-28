import { Request , Response  } from "express";
import bcrypt from "bcryptjs"
import { User } from "../models/userSchema";
import jwt from "jsonwebtoken"
import dotenv from "dotenv"
import { NextFunction } from "express-serve-static-core";

dotenv.config()


async function setCookie(res : Response , token :string){
    res.cookie("token" , token , {
        httpOnly : true ,
        sameSite : "strict" ,
        maxAge : 60 * 60 * 1000
    })
    console.log("get cookie" , token)
}

const secret = process.env.SECRET
const signUpController = async( req :Request , res : Response ): Promise<any> =>{
    try {

        const {username , email , password } = req.body

        if( !username || !email || !password ){
            return res.json("email and password are required")
        }

        const userExist = await User.findOne({email})

        if(userExist){
            return res.json("user already exists with this username")
        }

        const hashPassword = await bcrypt.hash(password , 10 )

        if(!secret){
            console.log("no jwt secret found")
            return res.json("error occured")
        }

        const token =  jwt.sign({email} , secret , {expiresIn : "1h"})

        //adding cookie 
        setCookie(res , token)

        const newUser = new User({
            username,
            email ,
            password : hashPassword
        })

        await newUser.save()

        return res.json({
            message : "user signed in successfully",
            user : {
                username : newUser.username ,
                email : newUser.email,
                password : newUser.password
            }
        })

    } catch (error : any) {
        console.log("error in singup controller" , error.message)
        return res.json("error occured")
    }
}

const loginController = async( req :Request , res : Response ) : Promise<any> =>{
    try {
        const {email , password} = req.body

        const userExists = await User.findOne({email})

        if(!userExists){
            return res.json("no user found with this email ")
        }

    if(!secret){
        console.log("no jwt secret found")
        return res.json("error occured")
    }

        const token = jwt.sign({email} , secret , {expiresIn : "1h"})

        //adding cookie
        setCookie(res , token)

        const verifyPassword = await bcrypt.compare(password , userExists.password)



        if(!verifyPassword){
            return res.json("incorrect password")
        }

        return res.json({
            message : "user logged in successfully",
            user:{
                username : userExists.username,
                email : userExists.email
            }
        })

    } catch (error : any) {
        console.log("error in login Controller" , error.message)
        return res.json("error occured")
    }
}

const logoutController = async( req :Request , res : Response ) : Promise<any> =>{
    try {
        const token = req.cookies.token

        if(!token){
            return res.json("no token found ")
        }

        res.clearCookie("token")

        return res.json("logged out successfully")
    } catch (error : any) {
        console.log("error in logout Controller" , error.message)
        return res.json("error occured")
    }
}


const deleteController = async( req :Request , res : Response ): Promise<any> =>{
    try {
        const {email , password} = req.body

        const userExist = await User.findOneAndDelete({email})

        if(!userExist){
            return res.json("no user found with this email")
        }

        return res.json({
            message : "deleted user successfully",
            user : {
                email : userExist.email,
                username : userExist.username
            }
        })

    } catch (error : any) {
        console.log("error in delete Controller " , error.message)
        return res.json("error occured")
    }
}


const updateUserController = async( req :Request , res : Response ) : Promise<any> =>{
    try {
        const {username , email , password} = req.body
        //@ts-ignore
        const userId = req.user._id

        const userExist = await User.findById(userId)

        if(!userExist){
            return res.json("no user found with email or user")
        }

        if(username){
            userExist.username = username
        }

        if(email){
            userExist.email = email
        }

        if(password){
            const hashPassword = await bcrypt.hash(password , 10 )
            userExist.password = hashPassword
        }

        await userExist.save()


        return res.json({
            message : "updated the user",
            userExist : {
                username  : userExist.username,
                email : userExist.email
            } 
        })

    } catch (error : any) {
        console.log("error in updateUser Controller  " , error.message)
        return res.json("error occured")
    }
}

const getProfileController = async(req :Request , res : Response , next : NextFunction) : Promise <any> => {
    try {
        //@ts-ignore
       return  res.json(req.user)
    } catch (error : any) {
        console.log("error in getprofile controller " , error.message)
        return res.json("error occured in getProfile")
    }
}

export  {signUpController , loginController , logoutController , deleteController , updateUserController , getProfileController} 