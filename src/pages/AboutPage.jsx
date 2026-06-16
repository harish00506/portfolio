import About from '../components/About.jsx'
import Skills from '../components/Skills.jsx'
import Experience from '../components/Experience.jsx'
import Education from '../components/Education.jsx'

// Secondary content lives here: about → skills → experience → education.
export default function AboutPage() {
  return (
    <>
      <About />
      <Skills />
      <Experience />
      <Education />
    </>
  )
}
