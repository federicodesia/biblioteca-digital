import { useEffect } from "react"
import { Navigate, Route, Routes } from "react-router-dom"
import LoginForm from "./components/forms/login-form"
import RegisterForm from "./components/forms/register-form"
import VerificationForm from "./components/forms/verification-form"
import ProtectedRoute from "./components/protected-route"
import AccessCodesPage from "./pages/access-codes-page"
import MainPage from "./pages/main-page"
import MyDocumentsPage from "./pages/my-documents-page"
import UploadRequestsPage from "./pages/upload-requests-page"
import UsersPage from "./pages/users-page"
import WelcomePage from "./pages/welcome-page"
import { accessTokenRequest } from "./services/auth-service"
import useAuthStore from "./zustand/stores/auth-store"

function App() {

  useEffect(() => {
    if (useAuthStore.getState().userSession) accessTokenRequest()
  }, [])

  return (
    <Routes>
      <Route element={<ProtectedRoute requiresAuth={false} navegateTo='/home' />}>
        <Route path="/" element={<Navigate to='/login' replace />} />
        <Route path="/login" element={<WelcomePage form={<LoginForm />} />} />
        <Route path="/verification" element={<WelcomePage form={<VerificationForm />} />} />
        <Route path="/register/:code" element={<WelcomePage form={<RegisterForm />} />} />
      </Route>

      <Route element={<ProtectedRoute />}>
        <Route path="/home" element={<MainPage />} />
        <Route path="/my-documents" element={<MainPage children={<MyDocumentsPage />} />} />
      </Route>

      <Route element={<ProtectedRoute requiredRoles={['Profesor', 'Administrador']} />}>
        <Route path="/access-codes" element={<MainPage children={<AccessCodesPage />} />} />
      </Route>

      <Route element={<ProtectedRoute requiredRoles={['Administrador']} />}>
        <Route path="/users" element={<MainPage children={<UsersPage />} />} />
        <Route path="/upload-requests" element={<MainPage children={<UploadRequestsPage />} />} />
      </Route>

      <Route path='*' element={<Navigate to='/' />} />
    </Routes>
  )
}

export default App