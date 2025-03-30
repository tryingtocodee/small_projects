import express from "express"
import { confirmEmailController, deleteController, loginController, logoutController,
         signupController, updateUserController, verifyEmailController } from "../controller/authController.js"
import {protectedRoutes} from "../middleware/protectedRoutes.js"

const router = express.Router()

router.post("/signup" , signupController )
router.post("/login" , loginController )
router.post("/logout" , logoutController )
router.post("/:id", protectedRoutes , updateUserController )
router.post("/delete" , deleteController )
router.post("/verify-email" , protectedRoutes , verifyEmailController )
router.post("/verify-email" ,  confirmEmailController )





export default router