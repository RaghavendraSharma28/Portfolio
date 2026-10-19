import { ArrowUpRight, Github } from 'lucide-react';
import { Link } from 'react-router-dom';
import type { Project } from '../data/projects';
import { ProjectVisual } from './Visual';
import { motion, useReducedMotion } from 'framer-motion';
export function ProjectCard({ project, index = 0 }: { project: Project; index?: number }) {
  const reduceMotion = useReducedMotion();
  return <motion.article className={`project-card${project.featured ? ' featured-card' : ''}`} initial={reduceMotion ? false : { opacity: 0, y: 18 }} whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }} viewport={{ once: true, amount: .15 }} transition={reduceMotion ? { duration: 0 } : { duration: .5, delay: index * .07 }}>
    <Link to={`/projects/${project.slug}`} className="card-link">{project.screenshots?.[0]
      ? <img className="project-card-image" src={project.screenshots[0].src} alt={project.screenshots[0].alt} loading="lazy"/>
      : <ProjectVisual kind={project.kind} compact={!project.featured}/>}<div className="card-copy"><div className="card-eyebrow">{project.eyebrow}<span>{project.category}</span></div><h3>{project.title}<ArrowUpRight size={18}/></h3><p>{project.description}</p><div className="project-card-meta">{project.status && <span className="project-status">{project.status}</span>}<div className="tag-row">{project.tags.map(tag => <span className="tag" key={tag}>{tag}</span>)}</div></div></div></Link>
    {project.repositoryUrl && <a className="card-source" href={project.repositoryUrl} target="_blank" rel="noreferrer"><Github size={14}/> {project.repositoryLabel ?? 'View project repository'} <ArrowUpRight size={13}/></a>}
  </motion.article>;
}
