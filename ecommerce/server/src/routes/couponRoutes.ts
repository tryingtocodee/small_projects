import express from "express"
import { adminRoutes, protectedRoutes } from "../middleware/protectedRoutes.js"
import { createCouponController, deleteCouponController, getAllCouponsController, updateCouponController } from "../controller/couponController.js"

const router = express.Router()

router.get("/" , protectedRoutes , adminRoutes, getAllCouponsController)
router.post("/" , protectedRoutes , adminRoutes, createCouponController)
router.put("/:couponId", protectedRoutes , adminRoutes, updateCouponController)
router.delete("/delete" , protectedRoutes , adminRoutes , deleteCouponController)

export default router