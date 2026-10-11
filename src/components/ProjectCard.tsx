import { ArrowUpRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import type { Project } from '../data/projects';
import { ProjectVisual } from './Visual';
import { motion } from 'framer-motion';
export function ProjectCard({ project, index = 0 }: { project: Project; index?: number }) {
  return <motion.article className={`project-card${project.featured ? ' featured-card' : ''}`} initial={{ opacity: 0, y: 18 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: .15 }} transition={{ duration: .5, delay: index * .07 }}>
    <Link to={`/projects/${project.slug}`} className="card-link"><ProjectVisual kind={project.kind} compact={!project.featured}/><div className="card-copy"><div className="card-eyebrow">{project.eyebrow}<span>{project.category}</span></div><h3>{project.title}<ArrowUpRight size={18}/></h3><p>{project.description}</p><div className="tag-row">{project.tags.map(tag => <span className="tag" key={tag}>{tag}</span>)}</div></div></Link>
  </motion.article>;
}
