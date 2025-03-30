import mongoose from "mongoose"

const productSchema = new mongoose.Schema({
    title : {

    },
    decription : {

    },
    stock : {

    },
    price : {

    },
    category : {
        enum : ["shirt" , "t-shirt" , "jeans" , "pants" , "shoes"]
    },
    brand : {
        enum : ["addidas" , "nike" , "h&m" , "zara" ]
    }  
})