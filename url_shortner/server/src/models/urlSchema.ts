import mongoose from "mongoose"

const urlSchema = new mongoose.Schema({
    originalUrl : {
        type : String ,
        required : true ,
        unique : true,
    },
    shortUrlId :{
        type : String ,
        required :true ,
        unique : true ,
    },
    createdAt : {
        type :Date,
        default : Date.now
    },
    userId :{
        type : mongoose.Schema.Types.ObjectId,
        ref : "User"
    },
    expiredAt : {
        type : Date ,
        default : null
    },
    clickCount : {
        type :Number ,
        default : 0 
    },
    createdBy:{
        type : String,
    },
    clickHistory : [{
        clickedAt : {type : Date , default :Date.now },
        ipAddress : {type : String},
        location :{
            city : {type : String} ,
            country : {type :String}
        }
    }]
}, {timestamps : true} )

export const Url = mongoose.model("Url" , urlSchema)