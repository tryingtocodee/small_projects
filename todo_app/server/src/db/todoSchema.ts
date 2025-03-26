import mongoose from "mongoose"
import { User } from "./userSchema"

const todoSchema = new mongoose.Schema({
    title:{
        type : String ,
    },
    description:{
        type : String,
    },
    done:{
        type : Boolean ,
        default : false
    },
    userId :{
        type : mongoose.Schema.Types.ObjectId ,
        ref:"User",
        required : true
    }
},{timestamps : true})

export const Todo = mongoose.model("Todo" , todoSchema)