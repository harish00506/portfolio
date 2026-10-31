import { useMemo, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import Section, { Reveal, stagger } from '../components/Section.jsx'
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
    <Section id="works" title="Everything I've built" className="pt-28 sm:pt-32" alt headingLevel={1}>
      {/* The index had no prose at all, which left the page with nothing describing what these
          projects are — for a reader skimming, or for a search engine deciding what it is about. */}
      <Reveal as="p" delay={0.07} className="mb-10 max-w-[70ch] text-lg leading-relaxed text-foreground">
        {projects.length} case studies, each with the problem it solved, the architecture behind it, real code
        from the repository and what actually shipped. The work spans AI engineering — Gemini Live
        voice agents, RAG retrieval, tool-calling agents and output guardrails — alongside
        full-stack platforms in FastAPI, Spring Boot and React, machine-learning forecasting, and
        Android apps in Kotlin and Jetpack Compose.
      </Reveal>

      {/* Filter tabs */}
      <Reveal delay={0.14}>
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
          <span className="text-sm font-medium text-muted-foreground">
            {visible.length} projects
          </span>
        </div>
      </Tabs>
      </Reveal>

      <motion.div layout className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        <AnimatePresence mode="popLayout">
          {visible.map((project, i) => (
            // Staggered by column (three at lg), so each row ripples left to right as it scrolls in.
            <ProjectCard key={project.slug} project={project} delay={stagger(i % 3)} headingLevel={2} />
          ))}
        </AnimatePresence>
      </motion.div>
    </Section>
  )
}
