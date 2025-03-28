"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const authController_1 = require("../controllers/authController");
const protectedRoutes_1 = __importDefault(require("../middleware/protectedRoutes"));
const router = express_1.default.Router();
router.post("/signup", authController_1.signUpController);
router.post("/login", authController_1.loginController);
router.post("/logout", authController_1.logoutController);
router.delete("/delete", authController_1.deleteController);
router.get("/profile", protectedRoutes_1.default, authController_1.getProfileController);
router.put("/update", protectedRoutes_1.default, authController_1.updateUserController);
exports.default = router;
