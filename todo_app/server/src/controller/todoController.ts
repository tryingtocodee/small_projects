import { Request, Response, NextFunction } from "express"
import { Todo } from "../db/todoSchema"


const addTodoController = async (req: Request, res: Response, next: NextFunction): Promise<any> => {

    try {
        const { title, description, done } = req.body

        if (title == "" || description == "") {
            return res.json("title and description are required")
        }
        //@ts-ignore
        const userId = req.user._id;

        const newTodo = new Todo({
            title,
            description,
            done,
            userId
        })

        await newTodo.save()



        return res.status(200).json({
            message: "todo created",
            todo: {
                title: newTodo.title,
                description: newTodo.description
            }
        })

    } catch (e: any) {
        console.log("error in addTodo Controller", e.message)
        return res.json("error occures")
    }
}


const getAllTodo = async (req: Request, res: Response, next: NextFunction): Promise<any> => {
    try {
        //@ts-ignore
        const userId = req.user._id

        const todos = await Todo.find({ userId })

        return res.json(todos)

    } catch (e: any) {
        console.log("error in getall todo ", e.message)
        return res.json("error occured")
    }
}



const deleteTodo = async (req: Request, res: Response, next: NextFunction): Promise<any> => {
    try {
        const todoId = req.params.todoId

        const deleteTodo = await Todo.findByIdAndDelete(todoId)

        if(!deleteTodo){
            return res.json("no todo was found ")
        }
        //@ts-ignore
        if(deleteTodo.userId.toString() !== req.user._id.toString()){
            return res.json("you are not allow to delete this todo")
        }

        return res.json("deleted todo")

    } catch (e: any) {
        console.log("error in deleteTood ", e.message)
        return res.json("error occured")
    }
}


const updateTodo = async (req: Request, res: Response, next: NextFunction): Promise<any> => {
    try {
        const todoId = req.params.todoId
        const { title, description, done } = req.body

        const update = await Todo.findByIdAndUpdate(todoId, { title, description, done }, { new: true })

        if (!update) {
            return res.json("no todo was found ")
        }

        //@ts-ignore
        if (update.userId.toString() !== req.user._id.toString()) {
            res.status(403).json({ error: "you are not authorized to update this todo" })
            return;
        }

        return res.json({ messsage : "todo updated" , todo: update } )
    } catch (e: any) {
        console.log("error in updateTodo ", e.message)
        return res.json("error in todo")
    }
}

export { addTodoController, getAllTodo, deleteTodo, updateTodo }