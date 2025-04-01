import { Request , Response  } from "express";
import { Coupon } from "../model/coupnModel.js";



const getAllCouponsController = async(req : Request , res : Response) : Promise<any> => {
    try {
        const coupon = await Coupon.find()

        if(!coupon){
            return res.status(400).json("no coupon found")
        }

        return res.json({
            message : "coupon found",
            coupon
        })
    } catch (error : any) {
        console.log("error occured in getAllCouponsController" , error.message)
        return res.json("error occured")
    }
}


const createCouponController = async(req : Request , res : Response):Promise<any> => {
    try {
        const {title , discount , category , brand , expiresIn} = req.body

        const coupon = await Coupon.findOne({title})

        if(coupon){
            return res.json("this coupon already exists")
        }

        const newCoupon = new Coupon({
            title ,
            discount ,
            category,
            brand ,
            expiresIn
        })

        await newCoupon.save()

        return res.json({
            message : "coupon created",
            coupon
        })

    } catch (error : any) {
        console.log("error occured in createCouponController" , error.message)
        return res.json("error occured")
    }
}

const updateCouponController = async(req : Request , res : Response) :Promise<any> => {
    try {
        const {title , discount , category , brand , expiresIn} = req.body

        const {couponId} = req.params

        const coupon = await Coupon.findById(couponId)

        if(!coupon){
            return res.json("no coupon found")
        }

        coupon.title  = title || coupon.title
        coupon.brand  = brand || coupon.brand
        coupon.discount  = discount || coupon.discount
        coupon.category  = category || coupon.category
        coupon.expiresIn  = expiresIn || coupon.expiresIn


        return res.json("coupon update")
    } catch (error : any) {
        console.log("error occured in updateCouponController" , error.message)
        return res.json("error occured")
    }
}

const deleteCouponController = async(req : Request , res : Response) : Promise<any> => {
    try {
        const {title} = req.body
        
        const userId = req.user?._id

        if(!userId){
            return res.json("no user found pls login again")
        }

        const coupon = await Coupon.findOneAndDelete({title})

        if(!coupon){
            return res.json("no user found")
        }

        return res.json({
            message : "deleted coupon"
        })

        
    } catch (error : any) {
        console.log("error occured in deleteCouponController" , error.message)
        return res.json("error occured")
    }
}


export {getAllCouponsController , createCouponController , updateCouponController , deleteCouponController}