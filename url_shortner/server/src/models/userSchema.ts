import mongoose from "mongoose"

const userSchema = new mongoose.Schema({
    username : {
        type : String ,
        required : true
    },
    email :{
        type : String ,
        requied : true ,
        unique : true,
    },
    password :{
        type :String ,
        required : true ,
    },
    profile : {
        firstName : {type :String},
        lastName : {type :String} ,
        bio : { type :String} ,
    }
} , {timestamps : true})


export const User =  mongoose.model('User' , userSchema)