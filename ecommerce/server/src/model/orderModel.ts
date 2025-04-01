import mongoose, { mongo } from "mongoose"

const orderSchema = new mongoose.Schema({
    userId : {
        type :mongoose.Schema.Types.ObjectId,
        ref : "User",
        required : true
    },
    products :[
        {
            product :{
                type : mongoose.Schema.Types.ObjectId,
                ref : "Products",
                required : true
            },
            quantity : {
                type : Number,
                min : 1,
                required : true
            },
            price : {
                type : Number ,
                required : true,
                min : 0
            }
        }
    ],
    totalAmount : {
        type : Number,
        min : 0,
        required : true
    }
},{timestamps : true})