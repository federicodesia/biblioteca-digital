import { Navigate, Route, Routes } from "react-router-dom"
import LoginForm from "./components/forms/login-form"
import RegisterForm from "./components/forms/register-form"
import VerificationForm from "./components/forms/verification-form"
import MainPage from "./pages/main-page"
import WelcomePage from "./pages/welcome-page"

function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to='/login' replace />} />
      <Route path="/login" element={<WelcomePage form={<LoginForm />} />} />
      <Route path="/verification" element={<WelcomePage form={<VerificationForm />} />} />
      <Route path="/register" element={<WelcomePage form={<RegisterForm />} />} />

      <Route path="/home" element={<MainPage />} />
      <Route path="/my-documents" element={<MainPage />} />
      <Route path="/access-codes" element={<MainPage />} />
      <Route path="/upload-requests" element={<MainPage />} />
    </Routes>
  )
}

export default App