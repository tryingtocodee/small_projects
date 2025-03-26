"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const todoController_1 = require("../controller/todoController");
const authmiddleware_1 = __importDefault(require("../middleware/authmiddleware"));
const router = express_1.default.Router();
router.post("/", authmiddleware_1.default, todoController_1.addTodoController);
router.get("/", authmiddleware_1.default, todoController_1.getAllTodo);
router.delete("/:todoId", authmiddleware_1.default, todoController_1.deleteTodo);
router.put("/:todoId", authmiddleware_1.default, todoController_1.updateTodo);
exports.default = router;
