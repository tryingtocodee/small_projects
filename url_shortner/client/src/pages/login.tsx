import { useState } from "react"
import { Link } from "react-router"

export default function LoginPage() {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [loading, setLoading] = useState(false)


    function handleSubmit(e: React.FormEvent) {
        e.preventDefault()
        setLoading(true)
    }
    return (
        <div className="bg-gray-200 flex items-center justify-center h-screen w-screen">
            <form onSubmit={handleSubmit}>

                <div className="w-96 bg-white p-8 rounded  ">
                    <h2 className="mb-5 text-2xl text-center text-bold">Login</h2>
                    <div className="mb-4">
                        <label htmlFor="email" className="block text-lg mb-2 text-gray-700">Email</label>
                        <input type="text" placeholder="enter email" className="text-lg p-2 w-full border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" value={email} onChange={(e) => setEmail(e.target.value)} />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="password" className="block text-lg text-gray-700 mb-2">Password</label>
                        <input type="password" placeholder="enter password" className="text-lg p-2 w-full border focus:outline-none focus:ring-2 focus:ring-blue-500 rounded-lg" value={password} onChange={(e) => setPassword(e.target.value)} />
                    </div>
                    <button className="w-full p-2 text-white bg-blue-400 rounded hover:bg-blue-400 text-lg mb-4 mt-3">{loading ? "Loggin in ..." : "Login"}</button>
                    <span className="text-center mt-3">Dont have an account {<Link to="/signup" className="text-blue-400 ">  Sign Up</Link>}</span>
                </div>
            </form>

        </div>
    )
}