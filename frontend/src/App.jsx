import { Routes, Route } from 'react-router-dom'
import LoginPage from './pages/LoginPage'
import SignupPage from './pages/SignupPage'



function App() {
  return (
    <Routes>
      <Route path="/" element={<div>Home page (coming soon)</div>} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/signup" element={<SignupPage />} />
      <Route path="/dashboard" element={<div>Dashboard (coming soon)</div>} />
    </Routes>
  )
}

export default App
