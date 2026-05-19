import { useAuth } from '../context/AuthContext'

function DashboardPage() {
  const { user, logout } = useAuth()

  return (
    <main className="page dashboard-page">
      <section className="dashboard-hero">
        <div>
          <p className="eyebrow">Student dashboard</p>
          <h1>Welcome back, {user?.name}</h1>
          <p>
            This is your personal workspace for study groups, tasks, and study
            sessions. Once you join or create a group, your group work will appear
            here.
          </p>
        </div>

        <button className="secondary-button" onClick={logout}>
          Logout
        </button>
      </section>

      <section className="dashboard-grid">
        <article className="dashboard-card">
          <h2>Your Groups</h2>
          <p>
            You are not part of any study groups yet. Create a group for your
            classmates or join an existing group using a join code.
          </p>

          <div className="dashboard-actions">
            <button className="primary-button">Create Group</button>
            <button className="secondary-button">Join Group</button>
          </div>
        </article>

        <article className="dashboard-card">
          <h2>Tasks</h2>
          <p>
            Group tasks will show up here after you join a group. You will be able
            to track what needs to be done and update task progress.
          </p>
        </article>

        <article className="dashboard-card">
          <h2>Study Sessions</h2>
          <p>
            Upcoming study sessions will appear here so your group can keep track
            of meeting times, locations, and online links.
          </p>
        </article>
      </section>

      <section className="empty-state">
        <h2>Next step</h2>
        <p>
          Start by creating your first study group or ask a classmate for a join
          code. This keeps the dashboard focused on your own groups and progress.
        </p>
      </section>
    </main>
  )
}

export default DashboardPage
