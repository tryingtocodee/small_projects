import { NextFunction  , Response , Request} from "express";
import { Url } from "../models/urlSchema";
import ShortUniqueId from "short-unique-id";

const getAnalytics = async (req :Request, res : Response , next : NextFunction) : Promise<any> =>{
    try {
        
    } catch (error : any) {
        console.log("error in  get analytics controller" , error.message)
        return res.json("error occured")
    }
}



const createUrlContoller = async (req :Request, res : Response , next : NextFunction) : Promise<any> =>{
    try {
        const {originalUrl} = req.body

        const urlExists = await Url.findOne({originalUrl})

        //@ts-ignore
        const userId = req.user._id

        if(urlExists){
            return res.json("url already exisits")
        }

        const uuid = new ShortUniqueId({length : 15})

        const newId = uuid.rnd();

        const newUrl = new Url({
            originalUrl ,
            shortUrlId : newId,
            createdBy:userId ,
        })

        await newUrl.save()
 
        return res.json({
            message : "new url created ",
            urlId : newUrl.shortUrlId
        })

    } catch (error : any) {
        console.log("error in  get createUrl Contoller" , error.message)
        return res.json("error occured")
    }
}


const redirectUrl = async (req :Request , res:Response , next :NextFunction) :Promise<any> =>{
    try {
        const {shortUrlId} = req.params

        const url = await Url.findOneAndUpdate({shortUrlId} , {$inc : {clickCount : 1}}, {new : true} )

        if(!url){
            return res.json("error finding url ")
        }

        return res.redirect(url.originalUrl)

    } catch (error : any) {
        console.log("error in redirect url" , error.message)
        return res.json("error occured")
    }
}


const userUrls = async (req :Request , res:Response , next :NextFunction) :Promise<any> =>{
    try {
        

    } catch (error : any) {
        console.log("error in user url" , error.message)
        return res.json("error occured")
    }
}
export {getAnalytics , createUrlContoller , redirectUrl , userUrls}