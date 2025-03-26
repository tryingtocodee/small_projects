import { useState } from "react";
import { Link, useNavigate } from "react-router";

function SignUpPage(){
    const [username , setUsername] = useState("")
    const [email , setEmail] = useState("")
    const [password , setPassword] = useState("")
    const [loading , setLoading] = useState(false)
    const [error , setError] = useState("")
    const navigate = useNavigate()

    async function handleSubmit(e : React.FormEvent){
        e.preventDefault()
        setLoading(true)
        try {
            const res = await fetch("http://localhost:4000/api/auth/signup" , {
                method:'POST',
                credentials:'include',
                headers:{
                    'Content-Type' : 'application/json'
                },
                body: JSON.stringify({
                    username ,
                    email ,
                    password
                })
            })
            if(!res.ok){
               throw new Error("Sign up failed")
            }
            const data = await res.json()

            navigate("/")
            console.log(data)
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (error : any) {
            console.log("error occured in signup page handle submit function" , error.message)
            setError("error occured")
        }finally{
            setLoading(false)
        }
    } 

    return (
        <div className="flex items-center justify-center h-screen w-screen">
            <form onSubmit={handleSubmit} className="w-96 bg-white p-8 shadow-md rounded-lg">
            <h2 className="text-lg mb-4">Sign Up</h2>
            {error && (
                <div className="text-red-500 p-4">{error}</div>
            )}
                <div className="mb-4" >
                    <label htmlFor="username" className="block mb-4 text-left text-lg"> Username</label>
                    <input type="text" placeholder="Enter Username" className="w-full rounded text-lg p-2 border focus:outline-none focus:ring-2  focus:ring-blue-500" value={username} 
                    onChange={(e) =>setUsername(e.target.value)}/>
                </div>
                <div className="mb-4">
                    <label htmlFor="email" className="block mb-4 text-left text-lg">Email</label>
                    <input type="text" placeholder="Enter Email" className="text-lg rounded border foucs:outline-none focus:ring-2 focus:ring-blue-500 w-full p-2" value={email} onChange={(e)=>setEmail(e.target.value)} />
                </div>
                <div className="mb-4">
                    <label htmlFor="password" className="block text-lg text-left mb-4 " >Password</label>
                    <input type="password" placeholder="Enter Password" className=" text-lg rounded border focus:outline-none focus:ring-2 focus:ring-blue-500 w-full p-2 " value={password} onChange={(e) =>setPassword(e.target.value)} />
                </div>
                <button className="w-full text-lg p-3 mt-5 mb-3 bg-blue-500 rounded-lg text-white">{loading ? "Signing Up ..." : "Sign Up"}</button>
                <span className="text-lg">Already have an account <Link to="/login" className="text-blue-500">Login</Link></span>
            </form>

        </div>
    )
}


export default SignUpPage