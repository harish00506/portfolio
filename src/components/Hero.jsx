import { motion } from 'framer-motion'
import { ArrowRight, FileText, Github, Linkedin, Mail, MapPin } from 'lucide-react'
import { profile } from '../data/portfolio.js'

export default function Hero() {
  return (
    <section id="top" className="relative overflow-hidden pt-28 pb-16 sm:pt-40 sm:pb-28">
      {/* Soft background accents */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute -top-24 right-1/4 h-72 w-72 rounded-full bg-accent/10 blur-3xl" />
        <div className="absolute top-40 -left-16 h-72 w-72 rounded-full bg-violet-200/40 blur-3xl" />
      </div>

      <div className="container-x">
        <div className="grid items-center gap-10 md:grid-cols-[1.5fr_1fr]">
          {/* Left: intro */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
          >
            <span className="chip mb-5 gap-2 border-accent/20 bg-accent-soft text-accent">
              <span className="h-2 w-2 rounded-full bg-green-500" />
              Open to AI / Backend / Full-Stack roles
            </span>

            <h1 className="text-[2rem] font-extrabold leading-[1.1] text-ink sm:text-5xl lg:text-6xl">
              Hi, I'm {profile.name.split(' ')[0]}.
              <br />
              <span className="text-accent">{profile.title}</span>
            </h1>

            <p className="mt-6 max-w-xl text-base leading-relaxed text-ink-muted sm:text-lg">
              {profile.tagline}
            </p>

            <div className="mt-6 flex items-center gap-2 text-sm text-ink-faint">
              <MapPin size={16} />
              {profile.location}
            </div>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center">
              <a href="#projects" className="btn-primary w-full sm:w-auto">
                View Projects
                <ArrowRight size={16} />
              </a>
              <a
                href={profile.resumeUrl}
                target="_blank"
                rel="noreferrer"
                className="btn-ghost w-full sm:w-auto"
              >
                <FileText size={16} />
                Download Resume
              </a>
            </div>

            <div className="mt-8 flex items-center gap-4">
              <a
                href={profile.socials.github}
                target="_blank"
                rel="noreferrer"
                aria-label="GitHub"
                className="text-ink-faint transition-colors hover:text-accent"
              >
                <Github size={22} />
              </a>
              <a
                href={profile.socials.linkedin}
                target="_blank"
                rel="noreferrer"
                aria-label="LinkedIn"
                className="text-ink-faint transition-colors hover:text-accent"
              >
                <Linkedin size={22} />
              </a>
              <a
                href={`mailto:${profile.email}`}
                aria-label="Email"
                className="text-ink-faint transition-colors hover:text-accent"
              >
                <Mail size={22} />
              </a>
            </div>
          </motion.div>

          {/* Right: avatar placeholder (swap in an <img> later) */}
          <motion.div
            initial={{ opacity: 0, scale: 0.94 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, ease: 'easeOut', delay: 0.15 }}
            className="order-first flex justify-center md:order-none md:justify-end"
          >
            <div className="relative">
              <div className="absolute -inset-3 rounded-full bg-gradient-to-tr from-accent/20 to-violet-300/30 blur-xl" />
              <div className="relative grid h-44 w-44 place-items-center rounded-full border border-slate-200 bg-white shadow-card sm:h-64 sm:w-64">
                {/* Replace this block with: <img src="/profile.jpg" alt="Harish G" className="h-full w-full rounded-full object-cover" /> */}
                <span className="bg-gradient-to-br from-accent to-violet-500 bg-clip-text text-6xl font-extrabold text-transparent sm:text-7xl">
                  HG
                </span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
