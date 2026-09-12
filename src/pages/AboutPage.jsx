import About from '../components/About.jsx'
import Skills from '../components/Skills.jsx'
import Experience from '../components/Experience.jsx'
import Education from '../components/Education.jsx'

// Secondary content lives here: about → skills → experience → education.
// The About section's title is this page's single <h1>.
export default function AboutPage() {
  return (
    <>
      <About headingLevel={1} />
      <Skills />
      <Experience />
      <Education />
    </>
  )
}
