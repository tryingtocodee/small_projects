import { useState } from "react"
import { Link } from "react-router"
function LoginPage() {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [isLoading , setIsLoading] = useState(false)
    const [error , setError] = useState("")

    async function handleSubmit(e : React.FormEvent){
        e.preventDefault()
        setIsLoading(true)
        
        try {
                const res = await fetch("http://localhost:4000/api/auth/login" , {
                    method : 'POST',
                    credentials : 'include',
                    headers:{
                        'Content-Type' : 'application/json'
                    },
                    body : JSON.stringify({
                        email,
                        password
                    })
                })
            const data = await res.json()

            if(!res.ok){
                throw new Error("login failed")
            }

            console.log(data)

        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (error : any) {
            setError("An unexpected error occured")
            console.log(error.message , "error in handle submit function")
        }finally{
            setIsLoading(false)
        }
    }
    return (
        <div className="h-screen w-screen bg-gray-200 flex items-center justify-center">
            <form onSubmit={handleSubmit} className="rounded-lg shadow-md bg-white w-96 p-8">
                <h2 className="text-center mb-5">Login</h2>
                {error && (
                    <div className="p-3 rounded mb-4 text-red-700">{error}</div>
                )}
                <div className="mb-4">
                    <label htmlFor="email" className="text-xl text-left mb-4 block">Email</label>
                    <input type="text" placeholder="Enter Email" className="text-lg border rounded focus:outline-none focus:ring-2 focus:ring-blue-500 p-2 w-full" value={email} onChange={(e) => setEmail(e.target.value)}/>
                </div>
                <div className="mb-4">
                    <label htmlFor="password" className="text-left block mb-4 text-xl">Password </label>
                    <input type="text" placeholder="Enter Password" className="w-full border focus:outline-none focus:ring-2 focus:ring-blue-500 text-lg rounded p-2" value={password} onChange={(e)=>setPassword(e.target.value)} />
                </div>
            <button className="w-full text-white bg-blue-500 p-1 rounded-lg mt-5 mb-3 text-lg ">{isLoading ? "Loggin in...." : "Login"}</button>
            <span className="text-lg">Already have an account {<Link to="/signup" className="text-blue-400">Sign Up</Link>}</span>
            </form>
        </div>
    )
}
export default LoginPage