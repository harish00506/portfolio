import { useMemo, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import Section from '../components/Section.jsx'
import ProjectCard from '../components/ProjectCard.jsx'
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { projects, projectCategories } from '../data/portfolio.js'

export default function WorksPage() {
  const [filter, setFilter] = useState('All')

  const visible = useMemo(() => {
    if (filter === 'All') return projects
    return projects.filter((p) => p.categories.includes(filter))
  }, [filter])

  return (
    <Section id="works" kicker="Work" title="Everything I've built" className="pt-28 sm:pt-32">
      {/* Filter tabs */}
      <Tabs value={filter} onValueChange={setFilter} className="mb-10">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="max-w-full overflow-x-auto">
            <TabsList>
              {projectCategories.map((cat) => (
                <TabsTrigger key={cat} value={cat}>
                  {cat}
                </TabsTrigger>
              ))}
            </TabsList>
          </div>
          <span className="font-mono text-xs text-muted-foreground/70">
            {String(visible.length).padStart(2, '0')} projects
          </span>
        </div>
      </Tabs>

      <motion.div layout className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        <AnimatePresence mode="popLayout">
          {visible.map((project, i) => (
            <ProjectCard key={project.slug} project={project} index={i} />
          ))}
        </AnimatePresence>
      </motion.div>
    </Section>
  )
}
