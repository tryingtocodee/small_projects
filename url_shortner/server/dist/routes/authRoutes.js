"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const authController_1 = require("../controllers/authController");
const router = express_1.default.Router();
router.post("/signup", authController_1.signUpController);
router.post("/login", authController_1.loginController);
router.post("/logout", authController_1.logoutController);
router.delete("/delete", authController_1.deleteController);
router.put("/update", authController_1.updateUserController);
exports.default = router;
