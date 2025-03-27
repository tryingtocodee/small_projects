import NavBar from "./components/navbar";
import HomePage from "./pages/homePage";
import LoginPage from "./pages/login";
import { Routes, Route } from "react-router";
import SignUpPage from "./pages/signupPage";
import AnalyticsPage from "./pages/analyticsPage";

export default function App() {
  return (
    <div className="">
      <NavBar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/analytics" element={<AnalyticsPage />} />
      </Routes>
    </div>
  )
}