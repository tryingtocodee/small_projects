import express from "express"
import { deleteController, loginController , logoutController, signUpController, updateUserController } from "../controllers/authController";
import protectedRoutes from "../middleware/protectedRoutes";
const router = express.Router();

router.post("/signup" , signUpController) 
router.post("/login" , loginController) 
router.post("/logout" , logoutController) 
router.delete("/delete" , deleteController) 
router.put("/update" , protectedRoutes , updateUserController) 



export default router ;