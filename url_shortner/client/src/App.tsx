import NavBar from "./components/navbar";
import HomePage from "./pages/homePage";
import LoginPage from "./pages/login";
import { Routes, Route, Navigate } from "react-router";
import SignUpPage from "./pages/signupPage";
import AnalyticsPage from "./pages/analyticsPage";
import useUserStore from "./useStore/authStore";

export default function App() {
  const {user  } = useUserStore()

  // useEffect(()=>{
  //   checkAuth()
  // },[])

  return (
    <div className="">
      <NavBar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={ user ? <Navigate to="/" /> : <LoginPage />} />
        <Route path="/signup" element={ user ? <Navigate to="/" /> : <SignUpPage />} />
        <Route path="/analytics" element={<AnalyticsPage />} />
      </Routes>
    </div>
  )
}