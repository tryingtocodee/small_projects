"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteUserController = exports.logoutController = exports.loginController = exports.signUpController = void 0;
const userSchema_1 = require("../db/userSchema");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const dotenv_1 = __importDefault(require("dotenv"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
dotenv_1.default.config();
const secret = process.env.SECRET;
function setCookie(res, token) {
    res.cookie("token", token, {
        httpOnly: true,
        sameSite: "strict",
        maxAge: 7 * 24 * 60 * 60 * 1000
    });
}
const signUpController = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { username, email, password } = req.body;
    try {
        const userExists = yield userSchema_1.User.findOne({ email });
        if (userExists) {
            return res.status(400).json("user already exists");
        }
        if (!secret) {
            console.log("jwt secret not found ");
            return res.json("error occured ");
        }
        const token = jsonwebtoken_1.default.sign({ email }, secret, { expiresIn: "1h" });
        const hashPassword = yield bcryptjs_1.default.hash(password, 10);
        const user = yield userSchema_1.User.create({ username, email, password: hashPassword });
        setCookie(res, token);
        return res.status(200).json({
            message: "user created successfully",
            user: {
                id: user._id,
                username: user.username,
                email: user.email
            }
        });
    }
    catch (error) {
        console.log("error in signup controller", error.message);
        return res.status(400).json("error occured");
    }
});
exports.signUpController = signUpController;
const loginController = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    try {
        const userExist = yield userSchema_1.User.findOne({ email });
        if (!userExist) {
            return res.json("no user found");
        }
        const checkPassword = yield bcryptjs_1.default.compare(password, userExist.password);
        if (!checkPassword) {
            return res.json("incorrect password");
        }
        if (!secret) {
            console.log("no jwt secret found");
            return res.json("error occured ");
        }
        const token = jsonwebtoken_1.default.sign({ email: userExist.email }, secret, { expiresIn: "1h" });
        if (!token) {
            return res.json("no token found");
        }
        return res.status(200).json({
            message: "logged in ",
            user: {
                id: userExist._id,
                email: userExist.email
            }
        });
    }
    catch (error) {
        console.log("error in login controller", error.message);
        return res.json("error occured");
    }
});
exports.loginController = loginController;
const logoutController = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const token = req.cookies.token;
        if (!token) {
            return res.json("user is already logged out");
        }
        res.clearCookie("token");
        return res.json("user logged out");
    }
    catch (error) {
        console.log("error in log out controller", error.message);
        return res.json("error occures");
    }
});
exports.logoutController = logoutController;
const deleteUserController = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    try {
        const userExist = yield userSchema_1.User.findOneAndDelete({ email });
        if (!userExist) {
            return res.json("no user found");
        }
        return res.json("user deleted");
    }
    catch (error) {
        console.log("error in delete user controller", error.message);
        return res.status(400).json("error occured");
    }
});
exports.deleteUserController = deleteUserController;
