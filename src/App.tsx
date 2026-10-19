import { BrowserRouter, Route, Routes, useLocation, useOutlet } from 'react-router-dom';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { Layout } from './components/Layout';
import { Home } from './pages/Home';
import { About } from './pages/About';
import { Experience } from './pages/Experience';
import { NotFound } from './pages/NotFound';
import { ProjectDetail } from './pages/ProjectDetail';
import { Projects } from './pages/Projects';
import { getProject } from './data/projects';
import { profile } from './data/profile';

function AnimatedRouteContent() {
  const location = useLocation();
  const outlet = useOutlet();
  const reduceMotion = useReducedMotion();
  const path = location.pathname.replace(/\/+$/, '') || '/';
  const slug = path.startsWith('/projects/') ? path.slice('/projects/'.length) : '';
  const project = slug && !slug.includes('/') ? getProject(slug) : undefined;
  const announcement = project?.title ?? ({
    '/': `${profile.name}, home`,
    '/projects': 'Engineering projects',
    '/experience': 'Experience',
    '/about': 'About',
  }[path] ?? 'Page not found');

  return <>
    <p className="sr-only" aria-live="polite" aria-atomic="true">{announcement}</p>
    <AnimatePresence initial={false} mode="wait">
      <motion.div key={location.pathname} initial={reduceMotion ? false : { opacity: 0 }} animate={{ opacity: 1 }} exit={reduceMotion ? undefined : { opacity: 0 }} transition={{ duration: reduceMotion ? 0 : .18 }}>
        {outlet}
      </motion.div>
    </AnimatePresence>
  </>;
}

export default function App() {
  return <BrowserRouter><Routes>
    <Route element={<Layout/>}>
      <Route element={<AnimatedRouteContent/>}>
        <Route index element={<Home/>}/>
        <Route path="projects" element={<Projects/>}/>
        <Route path="projects/:slug" element={<ProjectDetail/>}/>
        <Route path="experience" element={<Experience/>}/>
        <Route path="about" element={<About/>}/>
        <Route path="*" element={<NotFound/>}/>
      </Route>
    </Route>
  </Routes></BrowserRouter>;
}
