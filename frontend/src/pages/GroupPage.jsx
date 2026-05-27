import { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { get, post, put, del } from '../api/client'

// ─── Members Tab ────────────────────────────────────────────────────────────

function MembersTab({ group, currentUserId, isOwner, onLeft, onMemberRemoved }) {
  const [loading, setLoading] = useState(false)

  const handleLeave = async () => {
    if (!confirm('Are you sure you want to leave this group?')) return
    setLoading(true)
    try {
      await del(`/groups/${group.id}/leave`)
      onLeft()
    } catch (err) {
      alert(err.message)
    } finally {
      setLoading(false)
    }
  }

  const handleRemove = async (userId) => {
    if (!confirm('Remove this member from the group?')) return
    try {
      await del(`/groups/${group.id}/members/${userId}`)
      onMemberRemoved(userId)
    } catch (err) {
      alert(err.message)
    }
  }

  return (
    <div className="tab-content">
      <div className="tab-section-header">
        <h3>Members ({group.members.length})</h3>
        {!isOwner && (
          <button className="danger-button" onClick={handleLeave} disabled={loading}>
            Leave Group
          </button>
        )}
      </div>
      <ul className="member-list">
        {group.members.map((m) => (
          <li key={m.id} className="member-row">
            <div className="member-info">
              <span className="member-name">{m.user.name}</span>
              <span className="member-email">{m.user.email}</span>
            </div>
            <div className="member-actions">
              <span className={`role-badge role-${m.role.toLowerCase()}`}>{m.role}</span>
              {isOwner && m.userId !== currentUserId && (
                <button className="danger-button small" onClick={() => handleRemove(m.userId)}>
                  Remove
                </button>
              )}
            </div>
          </li>
        ))}
      </ul>
    </div>
  )
}

// ─── Tasks Tab ───────────────────────────────────────────────────────────────

const STATUS_LABELS = { TODO: 'To Do', IN_PROGRESS: 'In Progress', DONE: 'Done' }
const STATUS_CYCLE = { TODO: 'IN_PROGRESS', IN_PROGRESS: 'DONE', DONE: 'TODO' }

function TasksTab({ groupId }) {
  const [tasks, setTasks] = useState([])
  const [loading, setLoading] = useState(true)
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [creating, setCreating] = useState(false)
  const [formError, setFormError] = useState('')

  useEffect(() => {
    get(`/groups/${groupId}/tasks`)
      .then((d) => setTasks(d.tasks))
      .catch(console.error)
      .finally(() => setLoading(false))
  }, [groupId])

  const handleCreate = async (e) => {
    e.preventDefault()
    setFormError('')
    setCreating(true)
    try {
      const data = await post(`/groups/${groupId}/tasks`, { title, description })
      setTasks((prev) => [data.task, ...prev])
      setTitle('')
      setDescription('')
    } catch (err) {
      setFormError(err.message)
    } finally {
      setCreating(false)
    }
  }

  const handleStatusCycle = async (task) => {
    const nextStatus = STATUS_CYCLE[task.status]
    try {
      const data = await put(`/groups/tasks/${task.id}`, { status: nextStatus })
      setTasks((prev) => prev.map((t) => (t.id === task.id ? data.task : t)))
    } catch (err) {
      alert(err.message)
    }
  }

  const handleDelete = async (taskId) => {
    if (!confirm('Delete this task?')) return
    try {
      await del(`/groups/tasks/${taskId}`)
      setTasks((prev) => prev.filter((t) => t.id !== taskId))
    } catch (err) {
      alert(err.message)
    }
  }

  return (
    <div className="tab-content">
      <form onSubmit={handleCreate} className="inline-form">
        <h3>Add Task</h3>
        <div className="inline-form-row">
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Task title"
            required
          />
          <input
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Description (optional)"
          />
          <button type="submit" className="primary-button" disabled={creating}>
            {creating ? 'Adding…' : 'Add'}
          </button>
        </div>
        {formError && <p className="form-error">{formError}</p>}
      </form>

      {loading ? (
        <p className="loading-text">Loading tasks…</p>
      ) : tasks.length === 0 ? (
        <p className="empty-hint">No tasks yet. Add one above.</p>
      ) : (
        <ul className="item-list">
          {tasks.map((task) => (
            <li key={task.id} className="item-row">
              <div className="item-info">
                <span className={`item-title ${task.status === 'DONE' ? 'done' : ''}`}>
                  {task.title}
                </span>
                {task.description && <span className="item-desc">{task.description}</span>}
              </div>
              <div className="item-actions">
                <button
                  className={`status-badge status-${task.status.toLowerCase()}`}
                  onClick={() => handleStatusCycle(task)}
                  title="Click to advance status"
                >
                  {STATUS_LABELS[task.status]}
                </button>
                <button className="danger-button small" onClick={() => handleDelete(task.id)}>
                  Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

// ─── Sessions Tab ────────────────────────────────────────────────────────────

function SessionsTab({ groupId }) {
  const [sessions, setSessions] = useState([])
  const [loading, setLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)
  const [form, setForm] = useState({ title: '', description: '', startTime: '', endTime: '', location: '' })
  const [creating, setCreating] = useState(false)
  const [formError, setFormError] = useState('')

  useEffect(() => {
    get(`/groups/${groupId}/sessions`)
      .then((d) => setSessions(d.sessions))
      .catch(console.error)
      .finally(() => setLoading(false))
  }, [groupId])

  const handleCreate = async (e) => {
    e.preventDefault()
    setFormError('')
    setCreating(true)
    try {
      const data = await post(`/groups/${groupId}/sessions`, form)
      setSessions((prev) => [data.session, ...prev])
      setForm({ title: '', description: '', startTime: '', endTime: '', location: '' })
      setShowForm(false)
    } catch (err) {
      setFormError(err.message)
    } finally {
      setCreating(false)
    }
  }

  const handleDelete = async (sessionId) => {
    if (!confirm('Delete this session?')) return
    try {
      await del(`/groups/sessions/${sessionId}`)
      setSessions((prev) => prev.filter((s) => s.id !== sessionId))
    } catch (err) {
      alert(err.message)
    }
  }

  const formatDateTime = (iso) =>
    new Date(iso).toLocaleString(undefined, {
      dateStyle: 'medium',
      timeStyle: 'short',
    })

  return (
    <div className="tab-content">
      <div className="tab-section-header">
        <h3>Study Sessions</h3>
        <button className="primary-button" onClick={() => setShowForm((v) => !v)}>
          {showForm ? 'Cancel' : 'Schedule Session'}
        </button>
      </div>

      {showForm && (
        <form onSubmit={handleCreate} className="stacked-form">
          <label>
            Title
            <input
              value={form.title}
              onChange={(e) => setForm({ ...form, title: e.target.value })}
              placeholder="e.g. Midterm Review"
              required
            />
          </label>
          <label>
            Description <span className="optional">(optional)</span>
            <input
              value={form.description}
              onChange={(e) => setForm({ ...form, description: e.target.value })}
              placeholder="What will you cover?"
            />
          </label>
          <div className="form-row">
            <label>
              Start Time
              <input
                type="datetime-local"
                value={form.startTime}
                onChange={(e) => setForm({ ...form, startTime: e.target.value })}
                required
              />
            </label>
            <label>
              End Time <span className="optional">(optional)</span>
              <input
                type="datetime-local"
                value={form.endTime}
                onChange={(e) => setForm({ ...form, endTime: e.target.value })}
              />
            </label>
          </div>
          <label>
            Location / Link <span className="optional">(optional)</span>
            <input
              value={form.location}
              onChange={(e) => setForm({ ...form, location: e.target.value })}
              placeholder="Room 204 or https://meet.google.com/…"
            />
          </label>
          {formError && <p className="form-error">{formError}</p>}
          <button type="submit" className="primary-button" disabled={creating}>
            {creating ? 'Scheduling…' : 'Schedule'}
          </button>
        </form>
      )}

      {loading ? (
        <p className="loading-text">Loading sessions…</p>
      ) : sessions.length === 0 ? (
        <p className="empty-hint">No sessions scheduled yet.</p>
      ) : (
        <ul className="item-list">
          {sessions.map((session) => (
            <li key={session.id} className="item-row">
              <div className="item-info">
                <span className="item-title">{session.title}</span>
                <span className="item-desc">
                  {formatDateTime(session.startTime)}
                  {session.endTime && ` → ${formatDateTime(session.endTime)}`}
                </span>
                {session.location && (
                  <span className="item-desc">📍 {session.location}</span>
                )}
              </div>
              <div className="item-actions">
                <button className="danger-button small" onClick={() => handleDelete(session.id)}>
                  Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

// ─── Settings Tab ────────────────────────────────────────────────────────────

function SettingsTab({ group, onUpdated, onDeleted }) {
  const [name, setName] = useState(group.name)
  const [description, setDescription] = useState(group.description || '')
  const [saving, setSaving] = useState(false)
  const [saveError, setSaveError] = useState('')
  const [deleting, setDeleting] = useState(false)

  const handleSave = async (e) => {
    e.preventDefault()
    setSaveError('')
    setSaving(true)
    try {
      const data = await put(`/groups/${group.id}`, { name, description })
      onUpdated(data.group)
    } catch (err) {
      setSaveError(err.message)
    } finally {
      setSaving(false)
    }
  }

  const handleDelete = async () => {
    if (!confirm('Delete this group? This cannot be undone.')) return
    setDeleting(true)
    try {
      await del(`/groups/${group.id}`)
      onDeleted()
    } catch (err) {
      alert(err.message)
      setDeleting(false)
    }
  }

  return (
    <div className="tab-content">
      <h3>Group Settings</h3>
      <form onSubmit={handleSave} className="stacked-form">
        <label>
          Group Name
          <input value={name} onChange={(e) => setName(e.target.value)} required />
        </label>
        <label>
          Description <span className="optional">(optional)</span>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows={3}
          />
        </label>
        {saveError && <p className="form-error">{saveError}</p>}
        <button type="submit" className="primary-button" disabled={saving}>
          {saving ? 'Saving…' : 'Save Changes'}
        </button>
      </form>

      <div className="danger-zone">
        <h3>Danger Zone</h3>
        <p>Deleting the group will remove all tasks, sessions, and members permanently.</p>
        <button className="danger-button" onClick={handleDelete} disabled={deleting}>
          {deleting ? 'Deleting…' : 'Delete Group'}
        </button>
      </div>
    </div>
  )
}

// ─── GroupPage ───────────────────────────────────────────────────────────────

const TABS = ['Members', 'Tasks', 'Sessions', 'Settings']

function GroupPage() {
  const { id } = useParams()
  const navigate = useNavigate()
  const { user } = useAuth()
  const [group, setGroup] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [activeTab, setActiveTab] = useState('Tasks')

  useEffect(() => {
    get(`/groups/${id}`)
      .then((d) => setGroup(d.group))
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false))
  }, [id])

  if (loading) return <main className="page"><p className="loading-text">Loading group…</p></main>
  if (error) return <main className="page"><p className="form-error">{error}</p></main>
  if (!group) return null

  const isOwner = group.members.some((m) => m.userId === user.id && m.role === 'OWNER')
  const visibleTabs = isOwner ? TABS : TABS.filter((t) => t !== 'Settings')

  const handleMemberRemoved = (userId) => {
    setGroup((g) => ({ ...g, members: g.members.filter((m) => m.userId !== userId) }))
  }

  return (
    <main className="page group-page">
      <div className="group-header">
        <button className="back-link" onClick={() => navigate('/dashboard')}>
          ← Dashboard
        </button>
        <div>
          <h1>{group.name}</h1>
          {group.description && <p className="group-desc">{group.description}</p>}
          <p className="group-code">
            Join code: <code>{group.joinCode}</code>
          </p>
        </div>
      </div>

      <nav className="tab-nav">
        {visibleTabs.map((tab) => (
          <button
            key={tab}
            className={`tab-button ${activeTab === tab ? 'active' : ''}`}
            onClick={() => setActiveTab(tab)}
          >
            {tab}
          </button>
        ))}
      </nav>

      {activeTab === 'Members' && (
        <MembersTab
          group={group}
          currentUserId={user.id}
          isOwner={isOwner}
          onLeft={() => navigate('/dashboard')}
          onMemberRemoved={handleMemberRemoved}
        />
      )}
      {activeTab === 'Tasks' && <TasksTab groupId={id} />}
      {activeTab === 'Sessions' && <SessionsTab groupId={id} />}
      {activeTab === 'Settings' && isOwner && (
        <SettingsTab
          group={group}
          onUpdated={(updated) => setGroup((g) => ({ ...g, ...updated }))}
          onDeleted={() => navigate('/dashboard')}
        />
      )}
    </main>
  )
}

export default GroupPage
