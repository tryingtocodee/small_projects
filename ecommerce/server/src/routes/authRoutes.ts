import express from "express"
import { deleteController, loginController, logoutController, signupController, updateUserController, verifyEmailController } from "../controller/authController"
import protectedRoutes from "../middleware/protectedRoutes"

const router = express.Router()

router.post("/signup" , signupController )
router.post("/login" , loginController )
router.post("/logout" , logoutController )
router.post("/:id", protectedRoutes , updateUserController )
router.post("/delete" , deleteController )
router.post("/verify-email" , protectedRoutes , verifyEmailController )




export default router