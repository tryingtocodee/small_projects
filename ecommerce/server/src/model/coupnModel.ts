import mongoose from "mongoose"

const couponSchema = new mongoose.Schema({
    title : {
        type :String,
        required : true
    },
    discount :{
        type : Number,
        required : true , 
        default : 0
    },
    category : {
        type : String,
        required :true,
        enum : ["shirt" , "t-shirt" , "jeans" , "pants" , "shoes"]
    },
    brand : {
        type :String,
        required : true,
        enum : ["addidas" , "nike" , "h&m" , "zara" , "other" ]
    },
    expiresIn:{
        type : Number,
        required : true,
        default : 0 
    },
    userId :{
        type :mongoose.Schema.Types.ObjectId ,
        ref : "User"
    }

},{timestamps : true})

export const  Coupon = mongoose.model("Coupon" , couponSchema)