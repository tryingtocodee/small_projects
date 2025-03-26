import express from "express"
import { signUpController , loginController , deleteUserController , logoutController } from "../controller/userController"
const router = express.Router()

router.post("/signup" , signUpController) 
router.post("/login" , loginController) 
router.post("/logout" , logoutController) 
router.post("/deleteuser" , deleteUserController) 

export default router

