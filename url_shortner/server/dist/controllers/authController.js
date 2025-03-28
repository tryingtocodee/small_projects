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
exports.getProfileController = exports.updateUserController = exports.deleteController = exports.logoutController = exports.loginController = exports.signUpController = void 0;
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const userSchema_1 = require("../models/userSchema");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
function setCookie(res, token) {
    return __awaiter(this, void 0, void 0, function* () {
        res.cookie("token", token, {
            httpOnly: true,
            sameSite: "strict",
            maxAge: 60 * 60 * 1000
        });
    });
}
const secret = process.env.SECRET;
const signUpController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { username, email, password } = req.body;
        if (!username || !email || !password) {
            return res.json("email and password are required");
        }
        const userExist = yield userSchema_1.User.findOne({ email });
        if (userExist) {
            return res.json("user already exists with this username");
        }
        const hashPassword = yield bcryptjs_1.default.hash(password, 10);
        if (!secret) {
            console.log("no jwt secret found");
            return res.json("error occured");
        }
        const token = jsonwebtoken_1.default.sign({ email }, secret, { expiresIn: "1h" });
        //adding cookie 
        setCookie(res, token);
        const newUser = new userSchema_1.User({
            username,
            email,
            password: hashPassword
        });
        yield newUser.save();
        return res.json({
            message: "user signed in successfully",
            user: {
                username: newUser.username,
                email: newUser.email,
                password: newUser.password
            }
        });
    }
    catch (error) {
        console.log("error in singup controller", error.message);
        return res.json("error occured");
    }
});
exports.signUpController = signUpController;
const loginController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, password } = req.body;
        const userExists = yield userSchema_1.User.findOne({ email });
        if (!userExists) {
            return res.json("no user found with this email ");
        }
        if (!secret) {
            console.log("no jwt secret found");
            return res.json("error occured");
        }
        const token = jsonwebtoken_1.default.sign({ email }, secret, { expiresIn: "1h" });
        //adding cookie
        setCookie(res, token);
        const verifyPassword = yield bcryptjs_1.default.compare(password, userExists.password);
        if (!verifyPassword) {
            return res.json("incorrect password");
        }
        return res.json({
            message: "user logged in successfully",
            user: {
                username: userExists.username,
                email: userExists.email
            }
        });
    }
    catch (error) {
        console.log("error in login Controller", error.message);
        return res.json("error occured");
    }
});
exports.loginController = loginController;
const logoutController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const token = req.cookies.token;
        if (!token) {
            return res.json("no token found ");
        }
        res.clearCookie("token");
        return res.json("logged out successfully");
    }
    catch (error) {
        console.log("error in logout Controller", error.message);
        return res.json("error occured");
    }
});
exports.logoutController = logoutController;
const deleteController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, password } = req.body;
        const userExist = yield userSchema_1.User.findOneAndDelete({ email });
        if (!userExist) {
            return res.json("no user found with this email");
        }
        return res.json({
            message: "deleted user successfully",
            user: {
                email: userExist.email,
                username: userExist.username
            }
        });
    }
    catch (error) {
        console.log("error in delete Controller ", error.message);
        return res.json("error occured");
    }
});
exports.deleteController = deleteController;
const updateUserController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { username, email, password } = req.body;
        //@ts-ignore
        const userId = req.user._id;
        const userExist = yield userSchema_1.User.findById(userId);
        if (!userExist) {
            return res.json("no user found with email or user");
        }
        if (username) {
            userExist.username = username;
        }
        if (email) {
            userExist.email = email;
        }
        if (password) {
            const hashPassword = yield bcryptjs_1.default.hash(password, 10);
            userExist.password = hashPassword;
        }
        yield userExist.save();
        return res.json({
            message: "updated the user",
            userExist: {
                username: userExist.username,
                email: userExist.email
            }
        });
    }
    catch (error) {
        console.log("error in updateUser Controller  ", error.message);
        return res.json("error occured");
    }
});
exports.updateUserController = updateUserController;
const getProfileController = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        //@ts-ignore
        return res.json(req.user);
    }
    catch (error) {
        console.log("error in getprofile controller ", error.message);
        return res.json("error occured in getProfile");
    }
});
exports.getProfileController = getProfileController;
