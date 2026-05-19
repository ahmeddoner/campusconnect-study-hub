import { Routes, Route } from 'react-router-dom'

function App() {
  return (
    <Routes>
      <Route path="/" element={<div>Home page (coming soon)</div>} />
      <Route path="/login" element={<div>Login page (coming soon)</div>} />
      <Route path="/signup" element={<div>Signup page (coming soon)</div>} />
      <Route path="/dashboard" element={<div>Dashboard (coming soon)</div>} />
    </Routes>
  )
}

export default App
