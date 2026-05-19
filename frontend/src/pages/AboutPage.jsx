function AboutPage() {
  const members = [
    {
      name: "Abdul Rehman Khan",
      focus: "Backend CRUD routes, database-related logic, and API testing",
    },
    {
      name: "Ahmed Al-Temimi",
      focus: "Project setup, authentication flow, and backend/frontend integration",
    },
    {
      name: "Atheer Sadoon",
      focus: "About page, team contribution documentation, and frontend route integration",
    },
    {
      name: "Ibrahim Al Jamous",
      focus: "Frontend structure, protected routes, dashboard shell, and navigation",
    },
  ]

  return (
    <main className="page about-page">
      <section className="about-hero">
        <p className="eyebrow">Group 6</p>
        <h1>About CampusConnect Study Hub</h1>
        <p>
          CampusConnect Study Hub is a fullstack web application built to help
          university students manage study groups, tasks, study sessions, and
          progress in one shared place.
        </p>
      </section>

      <section className="about-section">
        <h2>Project purpose</h2>
        <p>
          Students often use separate chats, notes, and calendars for group work.
          This can make it difficult to track tasks, deadlines, and study sessions.
          Our goal is to create a simple and organized system where group members
          can collaborate more clearly.
        </p>
      </section>

      <section className="about-section">
        <h2>Team members and focus areas</h2>
        <div className="member-grid">
          {members.map((member) => (
            <article className="member-card" key={member.name}>
              <h3>{member.name}</h3>
              <p>{member.focus}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="about-section">
        <h2>Technology choices</h2>
        <div className="tech-list">
          <span>React</span>
          <span>Node.js</span>
          <span>Express</span>
          <span>PostgreSQL</span>
          <span>Prisma</span>
          <span>JWT Authentication</span>
        </div>
      </section>
    </main>
  )
}

export default AboutPage
