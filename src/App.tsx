import { BrowserRouter, Route, Routes, useLocation } from 'react-router-dom';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { Layout } from './components/Layout';
import { Home } from './pages/Home';
import { About } from './pages/About';
import { Experience } from './pages/Experience';
import { NotFound } from './pages/NotFound';
import { ProjectDetail } from './pages/ProjectDetail';
import { Projects } from './pages/Projects';

function AnimatedRoutes() {
  const location = useLocation();
  const reduceMotion = useReducedMotion();
  return <AnimatePresence mode="wait"><motion.div key={location.pathname} initial={reduceMotion ? false : { opacity: 0 }} animate={{ opacity: 1 }} exit={reduceMotion ? undefined : { opacity: 0 }} transition={{ duration: reduceMotion ? 0 : .18 }}><Routes location={location}><Route element={<Layout/>}><Route index element={<Home/>}/><Route path="projects" element={<Projects/>}/><Route path="projects/:slug" element={<ProjectDetail/>}/><Route path="experience" element={<Experience/>}/><Route path="about" element={<About/>}/><Route path="*" element={<NotFound/>}/></Route></Routes></motion.div></AnimatePresence>;
}
export default function App() { return <BrowserRouter><AnimatedRoutes/></BrowserRouter>; }
