import { useMemo, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import Section from './Section.jsx'
import ProjectCard from './ProjectCard.jsx'
import { projects, projectCategories } from '../data/portfolio.js'

export default function Projects() {
  const [filter, setFilter] = useState('All')

  const visible = useMemo(() => {
    if (filter === 'All') return projects
    return projects.filter((p) => p.categories.includes(filter))
  }, [filter])

  return (
    <Section id="projects" kicker="Projects" title="Things I've built">
      {/* Filter tabs */}
      <div className="mb-10 flex flex-wrap gap-2">
        {projectCategories.map((cat) => {
          const isActive = filter === cat
          return (
            <button
              key={cat}
              type="button"
              onClick={() => setFilter(cat)}
              className={`rounded-full px-4 py-2 text-sm font-medium transition-all ${
                isActive
                  ? 'bg-accent text-white shadow-cardHover'
                  : 'border border-slate-200 bg-white text-ink-muted hover:border-accent hover:text-accent'
              }`}
            >
              {cat}
            </button>
          )
        })}
      </div>

      <motion.div layout className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        <AnimatePresence mode="popLayout">
          {visible.map((project) => (
            <ProjectCard key={project.name} project={project} />
          ))}
        </AnimatePresence>
      </motion.div>
    </Section>
  )
}
