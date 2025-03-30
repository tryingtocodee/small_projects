import { Response } from "express"

const setCookie = (res :Response , token : string) =>{
    res.cookie("token" , token , {
        httpOnly : true ,
        maxAge : 60 * 60 * 1000 ,
        sameSite : "strict"
    })
}


export default setCookie