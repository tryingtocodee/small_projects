import { Request , Response  } from "express";
import { Products } from "../model/productModel.js";
import {v2 as cloudinary} from "cloudinary"
import { User } from "../model/userModel.js";

const getAllProductsController = async(req:Request , res : Response) :Promise<any> =>{
    try {
        const products = await Products.find()

        if(!products){
            return res.status(400).json("no product found")
        }

        return res.json({
            message : "producs found",
            products
        })
    } catch (error : any) {
        console.log("error occured in getAllProductsController" , error.message)
        return res.status(400).json("error occured")
    }
}

const getProductByIdController = async(req:Request , res : Response) :Promise<any> =>{
    try {
        const productId = req.params

        const product = await Products.findById({productId})

        if(!product){
            return res.json("no product found with this Id")
        }

        return res.json({
            message : "product found",
            product
        })

    } catch (error : any) {
        console.log("error occured in getProductByIdController" , error.message)
        return res.status(400).json("error occured")
    }
}

const getProductByCategoryController = async(req:Request , res : Response) :Promise<any> =>{
    try {
        const category = req.params

        const product = await Products.find({category})

        if(!product){
            return res.json("no product with this category found")
        }

        return res.json({
            message : "product with this category found",
            product
        })
    } catch (error : any) {
        console.log("error occured in getProductByCategoryController" , error.message)
        return res.status(400).json("error occured")
    }
}

const addProductController = async(req:Request , res : Response) :Promise<any> =>{
    try {
        const {title , description , price , stock , category , brand , image} = req.body 

        const userId = req.user?._id

        const product = await Products.findOne({title})

        if(product){
            return res.json("this product already exists")
        }
        let cloudinaryResponse
        let imagePublicId
        if(image){
            cloudinaryResponse = await cloudinary.uploader.upload(image , {folder : "products"})
            imagePublicId = cloudinaryResponse.public_id
        }

        const newProduct = new Products({
            title ,
            description,
            price ,
            stock,
            category ,
            brand ,
            image : imagePublicId,
            imageUrl : cloudinaryResponse?.secure_url
        })

        await newProduct.save()

        return res.json({
            message : "new product created",
            newProduct
        })
        

    } catch (error : any) {
        console.log("error occured in addProductController" , error.message)
        return res.status(400).json("error occured")
    }
}

const deleteProductController = async(req:Request , res : Response) :Promise<any> =>{
    try {
        const {title} = req.body

        const product = await Products.findOneAndDelete({title})

        if(!product){
            return res.json("no product exists with this title ")
        }

        return res.json("product delete")


    } catch (error : any) {
        console.log("error occured in deleteProductController" , error.message)
        return res.status(400).json("error occured")
    }
}

const updateProductController = async(req:Request , res : Response) :Promise<any> =>{
    try {
        const {title , description , price , stock , category , brand , image} = req.body
        const {productId} = req.params
        const product = await Products.findById({productId})

        if(!product){
            return res.json("no user found")
        }

        product.title = title || product.title;
        product.description = description || product.description;
        product.price = price || product.price;
        product.stock = stock || product.stock;
        product.category = category || product.category;
        product.brand = brand || product.brand;

        if(image){
            if(product.image){
                await cloudinary.uploader.destroy(product.image)
            }
             const cloudinaryResponse = await cloudinary.uploader.upload(image , {folder : "products"})

            product.image = cloudinaryResponse.public_id
        }

       await product.save()

        return res.json({
            message : "product info updated",
            product
        })

        
    } catch (error : any) {
        console.log("error occured in deleteProductController" , error.message)
        return res.status(400).json("error occured")
    }
}

export {getAllProductsController , getProductByIdController , getProductByCategoryController , addProductController , updateProductController , deleteProductController}