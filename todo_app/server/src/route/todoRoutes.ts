import express from "express"
import { addTodoController, deleteTodo, getAllTodo, updateTodo } from "../controller/todoController"
import protectedRoutes from "../middleware/authmiddleware"

const router = express.Router()

router.post("/", protectedRoutes , addTodoController)
router.get("/" , protectedRoutes , getAllTodo)
router.delete("/:todoId" , protectedRoutes , deleteTodo)
router.put("/:todoId" , protectedRoutes , updateTodo)


export default router