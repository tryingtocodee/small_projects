import express from "express"
import { protectedRoutes } from "../middleware/protectedRoutes.js"
import { addtoCartController, deleteFromCartController, getCartProductController, updateProductInCart } from "../controller/cartController.js"

const router = express.Router()

router.get("/" , protectedRoutes , addtoCartController)
router.get("/" , protectedRoutes , getCartProductController)
router.get("/", protectedRoutes , deleteFromCartController)
router.delete("/", protectedRoutes , updateProductInCart)


export default router