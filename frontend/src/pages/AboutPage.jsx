const members = [
  {
    name: 'Abdul Rehman Khan',
    focus: 'Backend CRUD routes, database-related logic, and API testing',
  },
  {
    name: 'Ahmed Al-Temimi',
    focus: 'Project setup, authentication flow, and backend/frontend integration',
  },
  {
    name: 'Atheer Sadoon',
    focus: 'About page, team contribution documentation, and frontend route integration',
  },
  {
    name: 'Ibrahim Al Jamous',
    focus: 'Frontend structure, protected routes, dashboard shell, and navigation',
  },
]

const stack = ['React', 'Node.js', 'Express', 'PostgreSQL', 'Prisma', 'JWT Authentication']

function AboutPage() {
  return (
    <main className="px-8 py-16 max-w-4xl mx-auto">
      <section className="mb-12 text-center">
        <p className="text-sm font-semibold uppercase tracking-wider text-blue-600 mb-3">
          Group 6
        </p>
        <h1 className="text-4xl md:text-5xl font-semibold text-gray-900 tracking-tight mb-4">
          About CampusConnect
        </h1>
        <p className="text-lg text-gray-500 leading-relaxed max-w-2xl mx-auto">
          A fullstack web application built to help university students manage study
          groups, tasks, study sessions, and progress in one shared place.
        </p>
      </section>

      <section className="mb-6 rounded-2xl border border-gray-200 bg-white p-8">
        <h2 className="text-xl font-semibold text-gray-900 mb-3">Project Purpose</h2>
        <p className="text-gray-500 leading-relaxed">
          Students often use separate chats, notes, and calendars for group work. This
          makes it difficult to track tasks, deadlines, and study sessions. Our goal is
          to create a simple, organized system where group members can collaborate more
          clearly — everything in one place, visible to everyone in the group.
        </p>
      </section>

      <section className="mb-6 rounded-2xl border border-gray-200 bg-white p-8">
        <h2 className="text-xl font-semibold text-gray-900 mb-6">Team Members</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {members.map((member) => (
            <article
              key={member.name}
              className="p-5 rounded-xl border border-gray-100 bg-gray-50"
            >
              <h3 className="text-base font-semibold text-gray-900 mb-1">{member.name}</h3>
              <p className="text-sm text-gray-500 leading-relaxed">{member.focus}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="rounded-2xl border border-gray-200 bg-white p-8">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Technology Stack</h2>
        <div className="flex flex-wrap gap-2">
          {stack.map((tech) => (
            <span
              key={tech}
              className="px-3 py-1.5 rounded-full bg-blue-50 text-blue-700 text-sm font-medium"
            >
              {tech}
            </span>
          ))}
        </div>
      </section>
    </main>
  )
}

export default AboutPage
