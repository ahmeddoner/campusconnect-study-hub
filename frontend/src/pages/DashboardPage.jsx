import { useAuth } from '../context/AuthContext'

function DashboardPage() {
  const { user, logout } = useAuth()

  return (
    <div>
      <h1>Welcome, {user.name}</h1>
      <button onClick={logout}>Logout</button>

      <section>
        <h2>Your Groups</h2>
        <p>No groups yet.</p>
        <button>Create Group</button>
        <button>Join Group</button>
      </section>
    </div>
  )
}

export default DashboardPage
