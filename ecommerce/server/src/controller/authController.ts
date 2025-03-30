import { Request, Response } from "express";
import jwt from "jsonwebtoken"
import dotenv from "dotenv"
import bcrypt from "bcryptjs"
import { User } from "../model/userModel.js";
import setCookie from "../utils/setCookie.js";
import sendVerificationEmail from "../utils/emailService.js";
import { nanoid } from "nanoid";
import { EmailVerification } from "../model/emailVerifcationSchema.js";

dotenv.config()

const secret = process.env.JWT_SECRET


const signupController = async (req: Request, res: Response): Promise<any> => {
    try {

        const { username, email, password, confirmPassword } = req.body

        const user = await User.findOne({ email })

        if (user) {
            return res.json("user already exists login")
        }

        if (password != confirmPassword) {
            return res.status(400).json("password and confirm doesnt match")
        }

        if (!secret) {
            console.log("jwt secret not found")
            return res.status(400).json("error occured")
        }

        const token = jwt.sign({ email }, secret, { expiresIn: "1h" })

        const hashedPassword = await bcrypt.hash(password, 10)

        //adding cookie 
        setCookie(res, token)

        const newUser = new User({
            username,
            email,
            password: hashedPassword,
        })

        await newUser.save()

        return res.json({
            message: "user created successfully",
            user: {
                username: newUser.username,
                email: newUser.email,
                role: newUser.role,
                verfied: newUser.isVerified
            }
        })

    } catch (error: any) {
        console.log("error in sign up controller", error.message)
        return res.status(400).json("error occured")
    }
}



const loginController = async (req: Request, res: Response): Promise<any> => {
    try {
        const { email, password } = req.body

        const user = await User.findOne({ email })

        if (!user) {
            return res.json("no user found with this email ")
        }

        if (!secret) {
            console.log("jwt secret not found ")
            return res.json("error occured ")
        }

        const token = jwt.sign({ email }, secret, { expiresIn: "1h" })

        const verifyPassword = await bcrypt.compare(password, user.password)

        if (!verifyPassword) {
            return res.json("incorrect password ")
        }

        //adding cookie
        setCookie(res, token)

        return res.json({
            message: "user logged in successfully",
            user: {
                username: user.username,
                email: user.email,
                role: user.role,
                verifiedd: user.isVerified
            }
        })
    } catch (error: any) {
        console.log("error in loginControllerr", error.message)
        return res.status(400).json("error occured")
    }
}



const logoutController = async (req: Request, res: Response): Promise<any> => {
    try {
        const token = req.cookies.token

        if (!token) {
            return res.json("no token found")
        }

        res.clearCookie("token")
    } catch (error: any) {
        console.log("error in logoutController", error.message)
        return res.status(400).json("error occured")
    }
}



const updateUserController = async (req: Request, res: Response): Promise<any> => {
    try {
        const { username, email, password  } = req.body
        const userId = req.user?._id

        const user = await User.findById({ userId })

        if (!user) {
            return res.json("no user found")
        }

        user.username = username || user.username
        user.email = email || user.email 

        if(password){
            const hashedPassword = await bcrypt.hash(password , 10)
            user.password = hashedPassword
        }

        await user.save()

        return res.json({
            message : "user updated",
            user : {
                username : user.username,
                email : user.email
            }
        })

    } catch (error: any) {
        console.log("error in updateUserController", error.message)
        return res.status(400).json("error occured")
    }
}



const deleteController = async (req: Request, res: Response): Promise<any> => {
    try {
        const { email } = req.body

        const user = await User.findOneAndDelete({ email })
        if (!user) {
            return res.json("no user found with this email")
        }

        return res.json("user deleted")
    } catch (error: any) {
        console.log("error in deleteController", error.message)
        return res.status(400).json("error occured")
    }
}

const verifyEmailController = async (req:Request , res : Response ) :Promise<any> =>{
    try {
        const {email} = req.body
        const userId = req.user

        const user = await User.findOne({email})

        if(!user){
            return res.json("email not found")
        }

        const emailToken = nanoid(20)

        const newEmailToken = new EmailVerification({
            userId : user._id,
            token : emailToken,
            created : new Date()
        })

        await newEmailToken.save()

        await sendVerificationEmail(email , emailToken)

        return res.json({
            message : "email send",
            email
        })


    } catch (error : any) {
        console.log("error occured in verifyEmailController" , )
        return res.json("error occured")
    }
}


const confirmEmailController = async (req:Request , res : Response ) :Promise<any> =>{
    try {
     
        const {token} = req.query

        if(!token){
            return res.status(400).json("incorrect token for email verification")
        }

        const emailTokenRecord : any = await EmailVerification.findOne({token})

        const tokenCreatedAt= new Date(emailTokenRecord?.createdAt!)

        const now = new Date()

        const tokenAge = (now.getTime() - tokenCreatedAt.getTime()) / (1000 * 60 * 60 )


        if(tokenAge > 24){
            await EmailVerification.deleteOne({_id : emailTokenRecord._id})
            return res.json("token has expired . Request for a new token ")
        }

        if(!emailTokenRecord){
            return res.status(400).json("no email token record found ")
        }

        await User.updateOne({_id : emailTokenRecord.userId} , {$set : {isVerified : true}})


        await EmailVerification.deleteOne({_id : emailTokenRecord._id})

        return res.json("email verified successfully")
    } catch (error : any) {
        console.log("error occured in confirmEmailController" , )
        return res.json("error occured")
    }
}

export { signupController, loginController, logoutController, updateUserController, deleteController  , verifyEmailController , confirmEmailController}