import { motion } from 'framer-motion'
import { Github, ExternalLink, Star, Lock } from 'lucide-react'

export default function ProjectCard({ project }) {
  const { name, blurb, highlights, tags, links = {}, featured, note } = project
  const hasLinks = links.github || links.live

  return (
    <motion.article
      layout
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 8 }}
      transition={{ duration: 0.35, ease: 'easeOut' }}
      className={`group relative flex h-full flex-col rounded-2xl border bg-white p-6 shadow-card transition-all duration-300 hover:-translate-y-1 hover:shadow-cardHover ${
        featured ? 'border-accent/30 ring-1 ring-accent/10' : 'border-slate-200'
      }`}
    >
      {featured && (
        <span className="absolute -top-3 left-6 inline-flex items-center gap-1 rounded-full bg-accent px-3 py-1 text-xs font-semibold text-white shadow-sm">
          <Star size={12} className="fill-white" />
          Featured
        </span>
      )}

      <div className="flex items-start justify-between gap-3">
        <h3 className="text-xl font-bold text-ink">{name}</h3>
        <div className="flex flex-none items-center gap-2 text-ink-faint">
          {links.github && (
            <a
              href={links.github}
              target="_blank"
              rel="noreferrer"
              aria-label={`${name} source code`}
              className="transition-colors hover:text-accent"
            >
              <Github size={18} />
            </a>
          )}
          {links.live && (
            <a
              href={links.live}
              target="_blank"
              rel="noreferrer"
              aria-label={`${name} live demo`}
              className="transition-colors hover:text-accent"
            >
              <ExternalLink size={18} />
            </a>
          )}
          {!hasLinks && (
            <span
              title="Private / internship work — code not public"
              className="flex items-center text-ink-faint/70"
            >
              <Lock size={16} />
            </span>
          )}
        </div>
      </div>

      {note && (
        <p className="mt-1 text-xs font-medium uppercase tracking-wide text-accent/80">{note}</p>
      )}

      <p className="mt-3 leading-relaxed text-ink-muted">{blurb}</p>

      {highlights?.length > 0 && (
        <ul className="mt-4 space-y-1.5">
          {highlights.map((h, i) => (
            <li key={i} className="flex gap-2 text-sm text-ink-muted">
              <span className="mt-1.5 h-1 w-1 flex-none rounded-full bg-accent/60" />
              {h}
            </li>
          ))}
        </ul>
      )}

      <div className="mt-auto flex flex-wrap gap-2 pt-5">
        {tags.map((t) => (
          <span key={t} className="tag">
            {t}
          </span>
        ))}
      </div>
    </motion.article>
  )
}
