import { Link, useNavigate, useLocation } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

function Navbar() {
  const { user, logout } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()
  const isDark = ['/', '/about'].includes(location.pathname)

  const handleLogout = () => {
    logout()
    navigate('/login')
  }

  return (
    <nav
      className={`flex items-center justify-between px-8 py-4 border-b transition-colors ${
        isDark
          ? 'border-white/10 bg-black'
          : 'border-gray-200 bg-white'
      }`}
    >
      <Link
        to="/"
        className={`text-lg font-bold no-underline transition-colors ${
          isDark ? 'text-white hover:text-white/70' : 'text-gray-900 hover:text-black'
        }`}
      >
        CampusConnect
      </Link>

      <div className="flex items-center gap-6">
        <Link
          to="/about"
          className={`text-sm no-underline transition-colors ${
            isDark ? 'text-white/60 hover:text-white' : 'text-gray-600 hover:text-gray-900'
          }`}
        >
          About
        </Link>

        {user ? (
          <>
            <Link
              to="/dashboard"
              className={`text-sm no-underline transition-colors ${
                isDark ? 'text-white/60 hover:text-white' : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              Dashboard
            </Link>
            <button
              onClick={handleLogout}
              className={`text-sm px-4 py-2 rounded-md font-semibold border-none cursor-pointer transition-colors ${
                isDark
                  ? 'bg-white text-black hover:bg-white/90'
                  : 'bg-gray-900 text-white hover:bg-black'
              }`}
            >
              Logout
            </button>
          </>
        ) : (
          <>
            <Link
              to="/login"
              className={`text-sm no-underline transition-colors ${
                isDark ? 'text-white/60 hover:text-white' : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              Login
            </Link>
            <Link
              to="/signup"
              className={`text-sm px-4 py-2 rounded-md font-semibold no-underline transition-colors ${
                isDark
                  ? 'bg-white text-black hover:bg-white/90'
                  : 'bg-gray-900 text-white hover:bg-black'
              }`}
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
