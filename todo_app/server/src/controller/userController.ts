import e, { Request , Response , NextFunction  } from "express"
import express from "express"
import { User } from "../db/userSchema";
import jwt from "jsonwebtoken"
import dotenv from "dotenv"
import bcrypt from "bcryptjs"

dotenv.config();

const secret = process.env.SECRET


function setCookie(res : Response, token : string){
    res.cookie("token" , token , {
        httpOnly : true ,
        sameSite : "strict",
        maxAge: 7 * 24 * 60 * 60 * 1000
    })
}

export const signUpController = async (req : Request , res :Response , next : NextFunction) : Promise<any> => {
    const {username , email , password} = req.body;

    try {
        const userExists = await User.findOne({email})

        if(userExists){
            return res.status(400).json("user already exists")
        }

        if(!secret){
            console.log("jwt secret not found ")
            return res.json("error occured ")
        }
        const token = jwt.sign({email} , secret , {expiresIn : "1h"})
        
        const hashPassword = await bcrypt.hash(password , 10)

        const user = await User.create({ username , email , password : hashPassword  })

        setCookie(res , token) ; 

       
        return res.status(200).json({
            message : "user created successfully" ,
            user : {
                id : user._id,
                username : user.username ,
                email : user.email
            }
        })


    } catch (error : any) {
        console.log("error in signup controller" , error.message)
        return res.status(400).json("error occured")
    }
}


export const loginController = async(req : Request , res : Response , next : NextFunction) : Promise<any>=> {
    const {email , password } = req.body 

    try {
        const userExist = await User.findOne({email})

        if(!userExist){
            return res.json("no user found")
        }

        const checkPassword = await bcrypt.compare(password , userExist.password)

        if(!checkPassword){
            return res.json("incorrect password")
        }

        
        if(!secret){
            console.log("no jwt secret found")
            return res.json("error occured ")
        }

        const token =  jwt.sign( {email : userExist.email} , secret , {expiresIn : "1h"})

        if(!token){
            return res.json("no token found")
        }

        return res.status(200).json({
            message: "logged in " ,
            user:{
                id:userExist._id,
                email:userExist.email
            }
        })

    } catch (error : any) {
        console.log("error in login controller" ,  error.message)
        return res.json("error occured")
    }
}


export const logoutController = async(req : Request , res : Response , next : NextFunction) : Promise<any> => {
    
    try{
        const token = req.cookies.token;
        if(!token){
            return res.json("user is already logged out")
        }


        res.clearCookie("token")

        return res.json("user logged out")
    }catch(error : any){
        console.log("error in log out controller" , error.message)
        return res.json("error occures")
    }
}


export const deleteUserController = async(req : Request , res : Response , next : NextFunction): Promise<any> => {
    const {email , password } = req.body

    try {
        const userExist = await User.findOneAndDelete({email})

        if(!userExist){
            return res.json("no user found")
        }

        return res.json("user deleted")
    } catch (error : any) {
        console.log("error in delete user controller" , error.message)
        return res.status(400).json("error occured")
    }
}