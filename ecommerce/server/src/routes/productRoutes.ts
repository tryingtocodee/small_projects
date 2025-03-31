import express from "express"
import { adminRoutes, protectedRoutes } from "../middleware/protectedRoutes.js"
import { addProductController, deleteProductController, getAllProductsController, getProductByCategoryController, getProductByIdController, updateProductController } from "../controller/productContoller.js"

const router = express.Router()

router.get("/" , getAllProductsController)
router.get("/:productId" , getProductByIdController)
router.get("/category/:category" , getProductByCategoryController)


router.post("/" , protectedRoutes , adminRoutes , addProductController)
router.delete("/delete" , protectedRoutes , adminRoutes , deleteProductController)
router.put("/:productId" , protectedRoutes , adminRoutes , updateProductController)

export default router