import mongoose, { mongo } from "mongoose"

const productSchema = new mongoose.Schema({
    title : {
        title : String ,
        required : [true , "title is required"]
    },
    description : {
        title : String ,
        required : [true , "description is required"]
    },
    stock : {
        type : Number ,
        min : 1 ,
        required : true
    },
    price : {
        type : Number,
        min : 0 ,
        required : true 
    },
    category : {
        type : String,
        enum : ["shirt" , "t-shirt" , "jeans" , "pants" , "shoes"],
        required : true
    },
    brand : {
        type :String,
        enum : ["addidas" , "nike" , "h&m" , "zara" , "other" ],
        required : true
    },
    image : {
        type :String,
        required : [true , "image is required"]
    },
    userId : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "User"
    },
    imageUrl : {
        type :String,
        required : true
    }
}, {timestamps : true})

export const Products = mongoose.model("Products" , productSchema)