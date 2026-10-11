import { projects } from '../data/projects';
import { ProjectCard } from '../components/ProjectCard';

export function Projects() {
  return <>
    <section className="page-hero page-wrap">
      <div className="eyebrow section-kicker">WORK / ENGINEERING PORTFOLIO</div>
      <h1>Selected work,<br/><em>thoughtfully built.</em></h1>
      <p>Projects across computer vision, digital design, embedded systems, robotics, and software architecture.</p>
    </section>
    <section className="section projects-page-section">
      <div className="page-wrap"><div className="project-grid">{projects.map((project, index) => <ProjectCard key={project.slug} project={project} index={index}/>)}</div></div>
    </section>
  </>;
}
