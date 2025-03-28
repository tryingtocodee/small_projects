import express from "express"
import { createUrlContoller, getAnalytics, redirectUrl, userUrls } from "../controllers/urlController";
import protectedRoutes from "../middleware/protectedRoutes";
const router = express.Router()

router.post("/", protectedRoutes , createUrlContoller)
router.get("/analytics",protectedRoutes , getAnalytics)
router.get("/:shortUrlId",protectedRoutes , redirectUrl)
router.get("/user",protectedRoutes , userUrls)




export default router ;