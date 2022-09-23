import { Navigate, Route, Routes } from "react-router-dom"
import LoginForm from "./components/forms/login-form"
import RegisterForm from "./components/forms/register-form"
import VerificationForm from "./components/forms/verification-form"
import AccessCodesPage from "./pages/access-codes-page"
import MainPage from "./pages/main-page"
import MyDocumentsPage from "./pages/my-documents-page"
import UploadRequestsPage from "./pages/upload-requests-page"
import UsersPage from "./pages/users-page"
import WelcomePage from "./pages/welcome-page"

function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to='/login' replace />} />
      <Route path="/login" element={<WelcomePage form={<LoginForm />} />} />
      <Route path="/verification" element={<WelcomePage form={<VerificationForm />} />} />
      <Route path="/register" element={<WelcomePage form={<RegisterForm />} />} />

      <Route path="/home" element={<MainPage />} />
      <Route path="/my-documents" element={<MainPage children={<MyDocumentsPage />} />} />
      <Route path="/users" element={<MainPage children={<UsersPage />} />} />
      <Route path="/access-codes" element={<MainPage children={<AccessCodesPage />} />} />
      <Route path="/upload-requests" element={<MainPage children={<UploadRequestsPage />} />} />
    </Routes>
  )
}

export default App