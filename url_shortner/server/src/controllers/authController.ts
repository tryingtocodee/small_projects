import { Request , Response  } from "express";

const signUpController = async( req :Request , res : Response ): Promise<any> =>{
    try {
        
    } catch (error : any) {
        console.log("error in singup controller" , error.message)
        return res.json("error occured")
    }
}

const loginController = async( req :Request , res : Response ) : Promise<any> =>{
    try {
        
    } catch (error : any) {
        console.log("error in login Controller" , error.message)
        return res.json("error occured")
    }
}

const logoutController = async( req :Request , res : Response ) : Promise<any> =>{
    try {
        
    } catch (error : any) {
        console.log("error in logout Controller" , error.message)
        return res.json("error occured")
    }
}


const deleteController = async( req :Request , res : Response ): Promise<any> =>{
    try {
        
    } catch (error : any) {
        console.log("error in delete Controller " , error.message)
        return res.json("error occured")
    }
}


const updateUserController = async( req :Request , res : Response ) : Promise<any> =>{
    try {
        
    } catch (error : any) {
        console.log("error in updateUser Controller  " , error.message)
        return res.json("error occured")
    }
}

export  {signUpController , loginController , logoutController , deleteController , updateUserController} 