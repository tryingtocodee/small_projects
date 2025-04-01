import mongoose, { mongo } from "mongoose"

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: [true, "username is required"],
        minlength: [6 , "minimum character required in username"] ,
        maxlength : [50 , "maximum 50 character in username "]
    },
    email: {
        type: String,
        unique : true,
        required: [true, "email is required"],
        minlength: [6 , "minimum character required in email"] ,
        maxlength : [50 , "maximum 50 character in email "]
    },
    password: {
        type: String,
        unique : true,
        required: [true, "password is required"],
        minlength: [6 , "minimum character required in password"] ,
        maxlength : [50 , "maximum 50 character in password "]
    },
    role: {
        type : String,
        enum : ["user" , "admin"] ,
        default : "user"
    },
    isVerified : {
        type : Boolean,
        default : false
    },
    updatedAt : {
        type : Date,
        defaule : null
    },
    cartItems : [
        {
            quantity : {
                type : Number,
                default : 1 ,
            },
            product : {
                type : mongoose.Schema.Types.ObjectId,
                ref : "Products"
            }
        }
    ]
}, { timestamps: true })

export const User = mongoose.model("User" , userSchema)