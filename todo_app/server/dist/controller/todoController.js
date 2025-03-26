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
exports.updateTodo = exports.deleteTodo = exports.getAllTodo = exports.addTodoController = void 0;
const todoSchema_1 = require("../db/todoSchema");
const addTodoController = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { title, description, done } = req.body;
        if (title == "" || description == "") {
            return res.json("title and description are required");
        }
        //@ts-ignore
        const userId = req.user._id;
        const newTodo = new todoSchema_1.Todo({
            title,
            description,
            done,
            userId
        });
        yield newTodo.save();
        return res.status(200).json({
            message: "todo created",
            todo: {
                title: newTodo.title,
                description: newTodo.description
            }
        });
    }
    catch (e) {
        console.log("error in addTodo Controller", e.message);
        return res.json("error occures");
    }
});
exports.addTodoController = addTodoController;
const getAllTodo = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        //@ts-ignore
        const userId = req.user._id;
        const todos = yield todoSchema_1.Todo.find({ userId });
        return res.json(todos);
    }
    catch (e) {
        console.log("error in getall todo ", e.message);
        return res.json("error occured");
    }
});
exports.getAllTodo = getAllTodo;
const deleteTodo = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const todoId = req.params.todoId;
        const deleteTodo = yield todoSchema_1.Todo.findByIdAndDelete(todoId);
        if (!deleteTodo) {
            return res.json("no todo was found ");
        }
        //@ts-ignore
        if (deleteTodo.userId.toString() !== req.user._id.toString()) {
            return res.json("you are not allow to delete this todo");
        }
    }
    catch (e) {
        console.log("error in deleteTood ", e.message);
        return res.json("error occured");
    }
});
exports.deleteTodo = deleteTodo;
const updateTodo = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const todoId = req.params.todoId;
        const { title, description, done } = req.body;
        const update = yield todoSchema_1.Todo.findByIdAndUpdate(todoId, { title, description, done }, { new: true });
        if (!update) {
            return res.json("no todo was found ");
        }
        //@ts-ignore
        if (update.userId.toString() !== req.user._id.toString()) {
            res.status(403).json({ error: "you are not authorized to update this todo" });
            return;
        }
        return res.json({ messsage: "todo updated", todo: update });
    }
    catch (e) {
        console.log("error in updateTodo ", e.message);
        return res.json("error in todo");
    }
});
exports.updateTodo = updateTodo;
