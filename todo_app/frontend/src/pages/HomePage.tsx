import { useState, useEffect } from "react"


interface Todo {
    _id : string,
    title : string,
    description : string,
    done : boolean 
}

export default function HomePage() {
    const [title, setTitle] = useState("")
    const [description, setDescription] = useState("")
    const [loading, setLoading] = useState(false)
    const [todos, setTodos] = useState<Todo[]>([])
    const [editingTodoId , setEditingTodoId] = useState<string | null > (null)
    async function fetchTodos() {
        try {
            const res = await fetch("http://localhost:4000/api/todo", {
                method: "Get",
                credentials: 'include'
            })

            if (!res.ok) {
                throw new Error("error in useEffect")
            }

            const data = await res.json()
            setTodos(data)

            console.log(data)

            // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (error: any) {
            console.log("error in useEffect", error.message)
        }
    }

    useEffect(() => {  
        fetchTodos();
    }, [])

    async function handleTodoSubmit(e: React.MouseEvent) {
        e.preventDefault()
        setLoading(true)
        try {
            const res = await fetch("http://localhost:4000/api/todo", {
                method: 'POST',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    title,
                    description
                })
            })

            if (!res.ok) {
                throw new Error("error occured in handle todo submit")
            }

            const data = await res.json()

            console.log(data)
            fetchTodos();
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (error: any) {
            console.log("error in handle todo submit button", error.message)
        } finally {
            setLoading(false)
        }
    }

    async function handleTodoDelete(id : string){
        try {
            const res = await fetch(`http://localhost:4000/api/todo/${id}` , {
                method : 'DELETE',
                credentials:'include'
            })

            if(!res.ok){
                throw new Error ("error occured in handle todo delete")
            }

           fetchTodos()


        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (error : any) {
            console.log("error in handleTodo delete" , error.message)
        }
    }

   async function handleTodoUpdate(todo :Todo){
    if(editingTodoId == todo._id) {

    
        try {
            const res = await fetch(`http://localhost:4000/api/todo/${todo._id}`, {
                method: "PUT",
                credentials: "include",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify({ title, description }),
              });

              if (!res.ok) {
                throw new Error("error occured in handle todo update");
              }

              fetchTodos();
        setEditingTodoId(null);
        setTitle("");
        setDescription("");
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (error : any) {
            console.log("error occured in handle todo update" , error.message)
        }
    }else {
        setEditingTodoId(todo._id);
      setTitle(todo.title);
      setDescription(todo.description);
    }
    }
    return (
        <div className="h-screen w-screen bg-gray-300 flex justify-center items-center ">
            <div className="shadow-md rounded-lg bg-white p-8 w-250" >
                <h2 className="text-2xl mt-2 mb-5 underline font-bold">Add Todo</h2>
                <div className="mb-4">
                    <label htmlFor="title" className="block text-lg text-left mb-3 text-gray-700">Title</label>
                    <input type="text" placeholder="Add Title" className="text-lg rounded border focus:outline-none focus:ring-2 focus:ring-blue-500 w-full p-2 " value={title} onChange={(e) => setTitle(e.target.value)} />
                </div>
                <div className="mb-4">
                    <label htmlFor="description" className="block mb-3 text-left text-lg text-gray-700">Description</label>
                    <input type="text" placeholder="Add description" className="w-full text-lg p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500" value={description} onChange={(e) => setDescription(e.target.value)} />
                </div>
                <button className="text-lg bg-blue-800 mb-5 text-white rounded-lg w-full p-2" onClick={handleTodoSubmit}>{loading ? "Adding Todo" : "Add Todo"}</button>

                <div className="mt-8">
                    <h2 className=" text-2xl underline font-bold">Your Todos</h2>
                    <ul>
                        {todos.map((todo) => (

                            <li key={todo._id} className="mb-2 p-2 border rounded flex  justify-between">
                                <div className="text-lg mb-3">
                                    <strong>{todo.title}</strong>
                                </div>
                                <div className="text-lg">
                                    {todo.description}
                                </div>
                                <button className="text-lg text-red-500" onClick={() => handleTodoDelete(todo._id)}>Delete</button>
                                <button className="text-lg text-blue-500" onClick={() => handleTodoUpdate(todo)}>{editingTodoId == todo._id ? "save" : "update"}</button>
                            </li>
                        ))}
                    </ul>
                   
                </div>
            </div>
        </div>
    )
}