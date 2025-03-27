import mongoose from "mongoose"

const userSchema = new mongoose.Schema({
    username : {
        type : String ,
    },
    email :{
        type : String ,
        requied : true ,
        unique : true,
    },
    password :{
        type :String ,
        required : true ,
    }
} , {timestamps : true})


export const User =  mongoose.model('User' , userSchema)