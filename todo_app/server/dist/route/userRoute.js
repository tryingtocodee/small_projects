"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const userController_1 = require("../controller/userController");
const router = express_1.default.Router();
router.post("/signup", userController_1.signUpController);
router.post("/login", userController_1.loginController);
router.post("/logout", userController_1.logoutController);
router.post("/deleteuser", userController_1.deleteUserController);
exports.default = router;
