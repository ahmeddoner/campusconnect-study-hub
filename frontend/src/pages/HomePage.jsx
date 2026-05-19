import { Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

function HomePage() {
  const { user } = useAuth()

  return (
    <main className="page home-page">
      <section className="home-hero">
        <div>
          <p className="eyebrow">CampusConnect Study Hub</p>
          <h1>Organize study groups, tasks, and sessions in one place.</h1>
          <p>
            CampusConnect helps university students collaborate more clearly by
            keeping group work, study sessions, and task progress inside one
            shared fullstack web application.
          </p>

          <div className="home-actions">
            {user ? (
              <Link className="primary-link" to="/dashboard">
                Go to dashboard
              </Link>
            ) : (
              <>
                <Link className="primary-link" to="/signup">
                  Get started
                </Link>
                <Link className="secondary-link" to="/login">
                  Log in
                </Link>
              </>
            )}
          </div>
        </div>

        <div className="home-card">
          <h2>What students can do</h2>
          <ul>
            <li>Create and join study groups</li>
            <li>Track group tasks and progress</li>
            <li>Schedule study sessions</li>
            <li>Keep collaboration organized</li>
          </ul>
        </div>
      </section>

      <section className="feature-grid">
        <article>
          <h3>Groups</h3>
          <p>Create study groups and invite classmates using a join code.</p>
        </article>
        <article>
          <h3>Tasks</h3>
          <p>Add tasks, update status, and keep group work visible.</p>
        </article>
        <article>
          <h3>Sessions</h3>
          <p>Schedule study sessions with title, time, location, and details.</p>
        </article>
      </section>
    </main>
  )
}

export default HomePage
