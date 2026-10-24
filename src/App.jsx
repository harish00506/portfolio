import { Routes, Route } from 'react-router-dom'
import Layout from './components/Layout.jsx'
import HomePage from './pages/HomePage.jsx'
import WorksPage from './pages/WorksPage.jsx'
import ProjectDetailPage from './pages/ProjectDetailPage.jsx'
import RekhonPage from './pages/RekhonPage.jsx'
import RekhonDocsPage from './pages/RekhonDocsPage.jsx'
import JournalPage from './pages/JournalPage.jsx'
import JournalPostPage from './pages/JournalPostPage.jsx'
import AboutPage from './pages/AboutPage.jsx'
import NotFoundPage from './pages/NotFoundPage.jsx'

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<HomePage />} />
        <Route path="works" element={<WorksPage />} />
        <Route path="works/:slug" element={<ProjectDetailPage />} />
        <Route path="rekhon" element={<RekhonPage />} />
        <Route path="rekhon/docs" element={<RekhonDocsPage />} />
        <Route path="journal" element={<JournalPage />} />
        <Route path="journal/:slug" element={<JournalPostPage />} />
        <Route path="about" element={<AboutPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  )
}
