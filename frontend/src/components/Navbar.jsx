import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

function Navbar() {
  const { user, logout } = useAuth()
  const navigate = useNavigate()

  const handleLogout = () => {
    logout()
    navigate('/login')
  }

  return (
    <nav className="flex items-center justify-between px-8 py-4 border-b border-gray-200 bg-white">
      <Link
        to="/"
        className="text-lg font-bold text-gray-900 no-underline hover:text-blue-600 transition-colors"
      >
        CampusConnect
      </Link>

      <div className="flex items-center gap-6">
        <Link
          to="/about"
          className="text-sm text-gray-600 no-underline hover:text-gray-900 transition-colors"
        >
          About
        </Link>

        {user ? (
          <>
            <Link
              to="/dashboard"
              className="text-sm text-gray-600 no-underline hover:text-gray-900 transition-colors"
            >
              Dashboard
            </Link>
            <button
              onClick={handleLogout}
              className="text-sm px-4 py-2 rounded-full bg-blue-600 text-white font-semibold hover:bg-blue-700 transition-colors border-none cursor-pointer"
            >
              Logout
            </button>
          </>
        ) : (
          <>
            <Link
              to="/login"
              className="text-sm text-gray-600 no-underline hover:text-gray-900 transition-colors"
            >
              Login
            </Link>
            <Link
              to="/signup"
              className="text-sm px-4 py-2 rounded-full bg-blue-600 text-white font-semibold no-underline hover:bg-blue-700 transition-colors"
            >
              Sign Up
            </Link>
          </>
        )}
      </div>
    </nav>
  )
}

export default Navbar
