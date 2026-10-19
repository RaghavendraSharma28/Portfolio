import { ArrowDownRight, ArrowRight, ArrowUpRight, Cpu, GitBranch, Layers3, ScanSearch } from 'lucide-react';
import { useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { motion, useReducedMotion } from 'framer-motion';
import { profile } from '../data/profile';
import { projects } from '../data/projects';
import { ProjectCard } from '../components/ProjectCard';
const disciplines = [
  { Icon: Cpu, title: 'Embedded Systems', text: 'C, microcontrollers, peripheral drivers, communication protocols, and real-time firmware.' },
  { Icon: Layers3, title: 'FPGA & Digital Design', text: 'Verilog, digital logic, sequential systems, and hardware simulation.' },
  { Icon: ScanSearch, title: 'Computer Vision & AI', text: 'Image processing, OCR, model evaluation, and machine learning workflows.' },
  { Icon: GitBranch, title: 'Software Engineering', text: 'C++, Python, testing, algorithms, and maintainable software architecture.' },
];
export function Home() {
  const reduceMotion = useReducedMotion();
  const location = useLocation();
  const navigate = useNavigate();
  const featured = projects.find(project => project.featured) ?? projects[0];
  const remainingProjects = projects.filter(project => project !== featured);

  useEffect(() => {
    const state = location.state as { scrollToResume?: boolean } | null;
    if (!state?.scrollToResume && location.hash !== '#resume') return;
    const frame = window.requestAnimationFrame(() => {
      const behavior = window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth';
      document.getElementById('resume')?.scrollIntoView({ behavior, block: 'start' });
      if (state?.scrollToResume) navigate('/', { replace: true, state: null });
    });
    return () => window.cancelAnimationFrame(frame);
  }, [location.hash, location.state, navigate]);
  return <>
    <section className="hero page-wrap"><motion.div className="hero-copy" initial={reduceMotion ? false : { opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: reduceMotion ? 0 : .7 }}><div className="eyebrow"><span className="status-dot"/> COMPUTER ENGINEERING <i/> VIRGINIA TECH</div><h1>Building at the<br/>intersection of<span className="mobile-break"><br/></span>&nbsp;<em>hardware</em><br className="desktop-break"/>and software.</h1><p className="hero-intro">I'm Raghav, a Computer Engineering student at Virginia Tech exploring embedded systems, digital hardware, robotics, and applied AI. I love turning complex engineering challenges into systems that work in the real world.</p><div className="hero-actions"><Link className="button button-primary" to="/projects">Explore my work <ArrowRight size={16}/></Link><a className="text-link" href="#resume">View resume <ArrowUpRight size={15}/></a></div><div className="hero-note"><span>01 — 05</span><span>Selected engineering work</span><ArrowDownRight size={15}/></div></motion.div><motion.div className="hero-art" initial={reduceMotion ? false : { opacity: 0, scale: .96 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: reduceMotion ? 0 : .9, delay: reduceMotion ? 0 : .18 }} aria-label="Abstract circuit-inspired illustration"><div className="art-orbit orbit-one"/><div className="art-orbit orbit-two"/><div className="art-core"><div className="core-mark">R<span>.</span></div></div><span className="art-label label-one">SIGNAL / 01</span><span className="art-label label-two">SYSTEM ONLINE</span><span className="art-cross cross-one"/><span className="art-cross cross-two"/><span className="art-line line-one"/><span className="art-line line-two"/></motion.div></section>
    <section className="section work-section" id="work"><div className="page-wrap"><div className="section-top"><div><div className="eyebrow section-kicker">01 / SELECTED WORK</div><h2>Curiosity, made tangible.</h2><p>A few projects where hardware, software, and curiosity come together.</p></div><Link className="text-link" to="/projects">All projects <ArrowUpRight size={15}/></Link></div><div className="project-grid">{featured && <ProjectCard project={featured} index={0} key={featured.slug}/>}</div><div className="project-grid secondary-grid">{remainingProjects.map((project, index) => <ProjectCard project={project} index={index + 1} key={project.slug}/>)}</div></div></section>
    <section className="section experience-strip"><div className="page-wrap experience-inner"><div><div className="eyebrow section-kicker">02 / EXPERIENCE</div><h2>Learning from<br/>real-world problems.</h2></div><article className="experience-summary"><span className="exp-date">SUMMER 2026 <i/> DUBAI, UAE</span><h3>Data Science Intern</h3><p className="company">A.W. Rostamani</p><p>Worked on computer vision and optical character recognition for extracting Vehicle Identification Numbers from vehicle registration documents. Evaluated OCR approaches, investigated recognition limitations, and explored vision-language models to improve document understanding.</p>{featured && <Link className="text-link" to={`/projects/${featured.slug}`}>Explore the case study <ArrowRight size={15}/></Link>}</article></div></section>
    <section className="section disciplines-section"><div className="page-wrap"><div className="section-top"><div><div className="eyebrow section-kicker">03 / ENGINEERING DISCIPLINES</div><h2>What I work with.</h2><p>Four connected ways of thinking about engineering problems.</p></div></div><div className="discipline-grid">{disciplines.map(({ Icon, title, text }, i) => <motion.article className="discipline" key={title} initial={reduceMotion ? false : { opacity: 0, y: 14 }} whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }} viewport={{ once: true }} transition={reduceMotion ? { duration: 0 } : { delay: i * .07 }}><span className="discipline-icon"><Icon size={20} strokeWidth={1.4}/></span><span className="discipline-index">0{i+1}</span><h3>{title}</h3><p>{text}</p></motion.article>)}</div></div></section>
    <section className="about-preview"><div className="page-wrap about-preview-inner"><div className="eyebrow section-kicker">04 / A LITTLE ABOUT ME</div><p className="about-line">I’m fascinated by the moment <span>software becomes something physical</span> — when code moves a motor, processes a signal, or brings a digital system to life.</p><div className="about-bottom"><p>Computer Engineering at Virginia Tech, with a curiosity for robotics, computing, and the meeting point of electronics and software.</p><Link className="text-link" to="/about">More about me <ArrowRight size={15}/></Link></div></div></section>
    <section className="contact-section" id="resume"><div className="page-wrap contact-inner"><div className="eyebrow section-kicker">05 / NEXT STEPS</div><h2>Let's build something<br/><em>meaningful.</em></h2><p>I'm always interested in engineering opportunities, ambitious projects, and conversations about hardware and software.</p><div className="contact-links">{profile.email && <a className="button button-primary" href={`mailto:${profile.email}`}>Get in touch <ArrowUpRight size={16}/></a>}{profile.github && <a className="text-link" href={profile.github} target="_blank" rel="noreferrer">GitHub <ArrowUpRight size={15}/></a>}{profile.linkedin && <a className="text-link" href={profile.linkedin} target="_blank" rel="noreferrer">LinkedIn <ArrowUpRight size={15}/></a>}<a className="resume-download" href={profile.resumePath} download>Resume <span>Download PDF</span></a></div></div></section>
  </>;
}
