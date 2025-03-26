import { Route , Routes } from "react-router"
import LoginPage from "./pages/LoginPage"
import SignUpPage from "./pages/SignUpPage"
import HomePage from "./pages/HomePage"

function App(){
  return (
    <div className="text-3xl text-center bg-gray-800 h-screen w-screen">
     <Routes>
      <Route path="/signup" element={<SignUpPage/>}/>
      <Route path="/login" element={<LoginPage/>}/>
      <Route path="/" element={<HomePage/>} />
     </Routes>
    </div>
  )
}

export default App