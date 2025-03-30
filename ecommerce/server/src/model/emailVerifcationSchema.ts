import mongoose from "mongoose"


const emailSchema = new mongoose.Schema({
    userId : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "User",
        required : true
    },
    token : {
        type : String,
        required : true
    },
    createdAt : {
        type : Date ,
        default : Date.now,
        expires : 86400
    }
})

export const EmailVerification = mongoose.model("EmailVerfication" , emailSchema) 