import { Request, Response } from "express";
import { Products } from "../model/productModel.js";
import { User } from "../model/userModel.js";

const addtoCartController = async (req: Request, res: Response): Promise<any> => {
    try {
        const { productId } = req.body

        const user = req.user

        if (!user) {
            return res.json("no user found")
        }

        const existingItem = await user.cartItems.find((item: any) => item.id == productId)

        if (existingItem) {
            user.cartItems.quantity += 1
        } else {
            user.cartItems.push({ productId })
        }

        await user.save()

        return res.json(user.cartItems)

    } catch (error: any) {
        console.log("error occured in addtoCartController", error.message)
        return res.status(400).json("error occured")
    }
}

const getCartProductController = async (req: Request, res: Response): Promise<any> => {
    try {
        const user = await User.findById(req.user?._id).populate('cartItems.product')

        if (!user) {
            return res.json("user not found ")
        }

        return res.json({
            success: "true",
            cartItems: user.cartItems,
            totalItems: user.cartItems.length
        })

    } catch (error: any) {
        console.log("error occured in getCartProductController", error.message)
        return res.status(400).json("error occured")
    }
}

const updateProductInCart = async (req: Request, res: Response): Promise<any> => {
    try {
        const {productId , quantity } = req.body

        if(!productId || !quantity){
            return res.json("product id and quantity are required")
        }

        if(quantity < 1){
            return res.json("quantity should be more than 1")
        }

        const product = await Products.findById(productId)

        if(product?.stock! < quantity){
            return res.json("no enough stock ")
        }


        const user = await User.findById(req.user?._id)

        if(!user){
            return res.json("no user found")
        }

        const cartItemIndex =  user.cartItems.findIndex((item :any) => item.product.toString() === productId)

        if(cartItemIndex === -1){
            return res.json("no product found")
        }

        user.cartItems[cartItemIndex].quantity = quantity

        await user.save()

        return res.json({
            success : true,
            message : "cart updated successffully",
            cartItems : user.cartItems
        })

    } catch (error: any) {
        console.log("error occured in updateProductInCart", error.message)
        return res.status(400).json("error occured")
    }
}

const deleteFromCartController = async (req: Request, res: Response): Promise<any> => {
    try {
        const { productId } = req.body

        if (!productId) {
            return res.json("no product found")
        }

        const user = await User.findById(req.user?._id)

        if(!user){
            return res.json("no user found")
        }

        //@ts-ignore
        user.cartItems = user.cartItems.filter(item => item.product?.toString() !== productId)

        await user.save()

        return res.json({
            success : true,
            message : "deleted product from cart",
            cartItem : user.cartItems
        })

    } catch (error: any) {
        console.log("error occured in deleteFromCartController", error.message)
        return res.status(400).json("error occured")
    }
}

export { addtoCartController, deleteFromCartController, updateProductInCart, getCartProductController }