import { Hero } from '@/components/ui/animated-hero'
import { Users, CheckSquare, Calendar } from 'lucide-react'

const features = [
  {
    icon: Users,
    title: 'Study Groups',
    description: 'Create groups and invite classmates using a 6-character join code. No account sharing needed.',
  },
  {
    icon: CheckSquare,
    title: 'Task Tracking',
    description: 'Add tasks, update their status from To Do to Done, and keep everyone on the same page.',
  },
  {
    icon: Calendar,
    title: 'Study Sessions',
    description: 'Schedule sessions with a time, location or meeting link, and see everything at a glance.',
  },
]

function HomePage() {
  return (
    <main>
      <Hero />

      <section className="px-8 pb-24">
        <div className="text-center mb-12">
          <p className="text-sm font-semibold uppercase tracking-wider text-blue-600 mb-3">
            Everything in one place
          </p>
          <h2 className="text-3xl font-semibold text-gray-900 tracking-tight">
            What you can do with CampusConnect
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
          {features.map(({ icon: Icon, title, description }) => (
            <article
              key={title}
              className="p-6 rounded-2xl border border-gray-200 bg-white hover:border-blue-200 hover:shadow-md transition-all"
            >
              <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center mb-4">
                <Icon className="w-5 h-5 text-blue-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">{title}</h3>
              <p className="text-sm text-gray-500 leading-relaxed">{description}</p>
            </article>
          ))}
        </div>
      </section>
    </main>
  )
}

export default HomePage
