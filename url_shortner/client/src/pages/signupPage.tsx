import { useState } from "react"
import { Link } from "react-router"
import useUserStore from "../useStore/authStore"
export default function SignUpPage(){
    const [username , setUsername] = useState("")
    const [email , setEmail] = useState("")
    const [password , setPassword] = useState("")

    const {signup , loading} = useUserStore()

    function handleSubmit(e : React.FormEvent){
        e.preventDefault()
        signup({username , email , password })
    }

    return (
        <div className="h-screen w-screen bg-gray-200 flex items-center justify-center">
            <form onSubmit={handleSubmit}>
                <div className="w-96 bg-white rounded p-8">
                    <h2 className="text-2xl text-center mb-5 text-bold">Sign Up</h2>
                    <div className="mb-4">
                        <label htmlFor="username" className="block text-lg mb-4 text-gray-700">Username</label>
                        <input type="text" placeholder="enter username" className="text-lg p-2 w-full border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 " value={username} onChange={(e)=>setUsername(e.target.value)}/>
                    </div>
                    <div>
                        <label htmlFor="email" className="text-lg block text-gray-700 mb-4">Email</label>
                        <input type="text" placeholder="enter email" className="w-full text-lg focus:outline-none focus:ring-2 focus:ring-blue-500 mb-2 p-2 border rounded-lg" value={email} onChange={(e)=>setEmail(e.target.value)} />
                    </div>
                    <div>
                        <label htmlFor="password" className="text-lg block text-gray-700 mb-4">Password</label>
                        <input type="password" placeholder="enter password" className="w-full text-lg focus:outline-none focus:ring-2 focus:ring-blue-500 mb-2 p-2 border rounded-lg" value={password} onChange={(e)=>setPassword(e.target.value)} />
                    </div>
                    <button className="text-white bg-blue-400 hover:bg-blue-500 rounded w-full  mb-4 mt-3 p-2">{loading ? "Siging up ..." : "Sign up"}</button>
                    <span>Already have an account {<Link to="/login" className="text-blue-400">  Login</Link>}</span>
                </div>
            </form>
        </div>
    )
}