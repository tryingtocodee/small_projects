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
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateUserController = exports.deleteController = exports.logoutController = exports.loginController = exports.signUpController = void 0;
const signUpController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
    }
    catch (error) {
        console.log("error in singup controller", error.message);
        return res.json("error occured");
    }
});
exports.signUpController = signUpController;
const loginController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
    }
    catch (error) {
        console.log("error in login Controller", error.message);
        return res.json("error occured");
    }
});
exports.loginController = loginController;
const logoutController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
    }
    catch (error) {
        console.log("error in logout Controller", error.message);
        return res.json("error occured");
    }
});
exports.logoutController = logoutController;
const deleteController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
    }
    catch (error) {
        console.log("error in delete Controller ", error.message);
        return res.json("error occured");
    }
});
exports.deleteController = deleteController;
const updateUserController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
    }
    catch (error) {
        console.log("error in updateUser Controller  ", error.message);
        return res.json("error occured");
    }
});
exports.updateUserController = updateUserController;
