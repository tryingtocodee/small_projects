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
const userSchema_1 = require("../db/userSchema");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const secret = process.env.SECRET;
const protectedRoutes = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const token = req.cookies.token;
        if (!token) {
            return res.json("no token found .login again");
        }
        if (!secret) {
            console.log("no secret token found");
            return res.json("error occured");
        }
        const decode = jsonwebtoken_1.default.verify(token, secret);
        if (!decode) {
            return res.json("incorrect token");
        }
        const user = yield userSchema_1.User.findOne({ email: decode.email });
        //@ts-ignore
        req.user = user;
        next();
    }
    catch (e) {
        console.log("error in protected Routes", e.message);
        return res.status(400).json("error occured");
    }
});
exports.default = protectedRoutes;
