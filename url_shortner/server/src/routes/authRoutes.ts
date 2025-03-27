import express from "express"
import { deleteController, loginController , logoutController, signUpController, updateUserController } from "../controllers/authController";
const router = express.Router();

router.post("/signup" , signUpController) 
router.post("/login" , loginController) 
router.post("/logout" , logoutController) 
router.delete("/delete" , deleteController) 
router.put("/update" , updateUserController) 



export default router ;