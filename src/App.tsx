import { BrowserRouter, Route, Routes, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { Layout } from './components/Layout';
import { Home } from './pages/Home';
import { About, Experience, ProjectDetail, Projects } from './pages/Pages';

function AnimatedRoutes() {
  const location = useLocation();
  return <AnimatePresence mode="wait"><motion.div key={location.pathname} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: .18 }}><Routes location={location}><Route element={<Layout/>}><Route index element={<Home/>}/><Route path="projects" element={<Projects/>}/><Route path="projects/:slug" element={<ProjectDetail/>}/><Route path="experience" element={<Experience/>}/><Route path="about" element={<About/>}/><Route path="*" element={<Home/>}/></Route></Routes></motion.div></AnimatePresence>;
}
export default function App() { return <BrowserRouter><AnimatedRoutes/></BrowserRouter>; }
