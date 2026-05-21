import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { get, post } from '../api/client'

function CreateGroupModal({ onClose, onCreated }) {
  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setLoading(true)
    try {
      const data = await post('/groups', { name, description })
      onCreated(data.group)
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <h2>Create a Study Group</h2>
        <form onSubmit={handleSubmit} className="modal-form">
          <label>
            Group Name
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g. COMP101 Finals Group"
              required
            />
          </label>
          <label>
            Description <span className="optional">(optional)</span>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="What is this group for?"
              rows={3}
            />
          </label>
          {error && <p className="form-error">{error}</p>}
          <div className="modal-actions">
            <button type="button" className="secondary-button" onClick={onClose}>
              Cancel
            </button>
            <button type="submit" className="primary-button" disabled={loading}>
              {loading ? 'Creating…' : 'Create Group'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

function JoinGroupModal({ onClose, onJoined }) {
  const [joinCode, setJoinCode] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setLoading(true)
    try {
      const data = await post('/groups/join', { joinCode: joinCode.trim().toUpperCase() })
      onJoined(data.group)
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <h2>Join a Study Group</h2>
        <form onSubmit={handleSubmit} className="modal-form">
          <label>
            Join Code
            <input
              value={joinCode}
              onChange={(e) => setJoinCode(e.target.value)}
              placeholder="e.g. K4R9XZ"
              maxLength={6}
              style={{ textTransform: 'uppercase', letterSpacing: '0.2em' }}
              required
            />
          </label>
          {error && <p className="form-error">{error}</p>}
          <div className="modal-actions">
            <button type="button" className="secondary-button" onClick={onClose}>
              Cancel
            </button>
            <button type="submit" className="primary-button" disabled={loading}>
              {loading ? 'Joining…' : 'Join Group'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

function GroupCard({ group, onClick }) {
  return (
    <article className="group-card" onClick={onClick}>
      <h3>{group.name}</h3>
      {group.description && <p className="group-card-desc">{group.description}</p>}
      <p className="group-card-code">
        Join code: <code>{group.joinCode}</code>
      </p>
    </article>
  )
}

function DashboardPage() {
  const { user, logout } = useAuth()
  const navigate = useNavigate()
  const [groups, setGroups] = useState([])
  const [loadingGroups, setLoadingGroups] = useState(true)
  const [showCreate, setShowCreate] = useState(false)
  const [showJoin, setShowJoin] = useState(false)

  useEffect(() => {
    get('/groups')
      .then((data) => setGroups(data.groups))
      .catch(console.error)
      .finally(() => setLoadingGroups(false))
  }, [])

  const handleCreated = (group) => {
    setGroups((prev) => [group, ...prev])
    setShowCreate(false)
  }

  const handleJoined = (group) => {
    setGroups((prev) => {
      if (prev.find((g) => g.id === group.id)) return prev
      return [group, ...prev]
    })
    setShowJoin(false)
  }

  return (
    <main className="page dashboard-page">
      <section className="dashboard-hero">
        <div>
          <p className="eyebrow">Student dashboard</p>
          <h1>Welcome back, {user?.name}</h1>
          <p>
            Your study groups, tasks, and sessions — all in one place.
          </p>
        </div>
        <button className="secondary-button" onClick={logout}>
          Logout
        </button>
      </section>

      <section className="dashboard-groups">
        <div className="section-header">
          <h2>Your Groups</h2>
          <div className="dashboard-actions">
            <button className="primary-button" onClick={() => setShowCreate(true)}>
              Create Group
            </button>
            <button className="secondary-button" onClick={() => setShowJoin(true)}>
              Join Group
            </button>
          </div>
        </div>

        {loadingGroups ? (
          <p className="loading-text">Loading groups…</p>
        ) : groups.length === 0 ? (
          <div className="empty-state">
            <p>You are not part of any study groups yet.</p>
            <p>Create a group or ask a classmate for a join code to get started.</p>
          </div>
        ) : (
          <div className="groups-grid">
            {groups.map((group) => (
              <GroupCard
                key={group.id}
                group={group}
                onClick={() => navigate(`/groups/${group.id}`)}
              />
            ))}
          </div>
        )}
      </section>

      {showCreate && (
        <CreateGroupModal onClose={() => setShowCreate(false)} onCreated={handleCreated} />
      )}
      {showJoin && (
        <JoinGroupModal onClose={() => setShowJoin(false)} onJoined={handleJoined} />
      )}
    </main>
  )
}

export default DashboardPage
