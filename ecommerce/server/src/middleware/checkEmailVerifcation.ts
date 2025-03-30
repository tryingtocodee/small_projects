import { Request , Response , NextFunction } from "express";

const checkEmailVerification = async (req :Request , res : Response , next : NextFunction) =>{
    if(!req.user?.isVerified){
        return res.json("email verification is required to access this resource")
    }

    next()
}


export default checkEmailVerification 