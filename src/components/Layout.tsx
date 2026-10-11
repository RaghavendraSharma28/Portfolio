import { useEffect, useState } from 'react';
import { Link, NavLink, Outlet, useLocation } from 'react-router-dom';
import { Menu, X, Sun, Moon, ArrowUpRight } from 'lucide-react';
import { profile } from '../data/profile';
import { getProject } from '../data/projects';

export function Layout() {
  const [open, setOpen] = useState(false);
  const location = useLocation();
  const [dark, setDark] = useState(() => localStorage.getItem('theme') === 'dark');
  useEffect(() => {
    const slug = location.pathname.split('/').filter(Boolean).at(-1) ?? '';
    const project = getProject(slug);
    const pages: Record<string, [string, string]> = {
      '/': [`${profile.name} | Computer Engineering & Embedded Systems`, 'Portfolio of Raghav Sharma, a Virginia Tech Computer Engineering student working across embedded systems, FPGA design, robotics, computer vision, and software engineering.'],
      '/projects': [`Projects | ${profile.name}`, 'Engineering projects in computer vision, FPGA design, embedded systems, robotics, and software engineering.'],
      '/experience': [`Experience | ${profile.name}`, 'Professional internship and student engineering team experience at Virginia Tech.'],
      '/about': [`About | ${profile.name}`, 'Meet Raghav Sharma, a Virginia Tech Computer Engineering student interested in hardware and software integration.'],
    };
    const [title, description] = project
      ? [`${slug === 'vehicle-identification-ocr' ? 'Automated Vehicle Identification Using Computer Vision' : project.title} | ${profile.name}`, project.description]
      : pages[location.pathname] ?? pages['/'];
    document.title = title;
    document.querySelector('meta[name="description"]')?.setAttribute('content', description);
    document.querySelector('meta[property="og:title"]')?.setAttribute('content', title);
    document.querySelector('meta[property="og:description"]')?.setAttribute('content', description);
  }, [location.pathname]);
  const toggleTheme = () => { const next = !dark; setDark(next); document.documentElement.dataset.theme = next ? 'dark' : 'light'; localStorage.setItem('theme', next ? 'dark' : 'light'); };
  if (document.documentElement.dataset.theme !== (dark ? 'dark' : 'light')) document.documentElement.dataset.theme = dark ? 'dark' : 'light';
  const resume = <a className="nav-resume" href="/#resume" onClick={() => setOpen(false)}>Resume <ArrowUpRight size={14}/></a>;
  return <><header className="site-header"><div className="header-inner"><Link to="/" className="wordmark" onClick={() => setOpen(false)}>Raghav Sharma<span>.</span></Link><nav className={open ? 'main-nav nav-open' : 'main-nav'} aria-label="Main navigation"><NavLink to="/projects" onClick={() => setOpen(false)}>Work</NavLink><NavLink to="/experience" onClick={() => setOpen(false)}>Experience</NavLink><NavLink to="/about" onClick={() => setOpen(false)}>About</NavLink>{resume}</nav><div className="header-actions"><button className="icon-button theme-toggle" aria-label={`Switch to ${dark ? 'light' : 'dark'} theme`} onClick={toggleTheme}>{dark ? <Sun size={17}/> : <Moon size={17}/>}</button><button className="icon-button menu-toggle" aria-label={open ? 'Close navigation menu' : 'Open navigation menu'} aria-expanded={open} onClick={() => setOpen(!open)}>{open ? <X/> : <Menu/>}</button></div></div></header><main><Outlet/></main><footer className="site-footer"><div><Link to="/" className="wordmark">Raghav Sharma<span>.</span></Link><p>Computer Engineering · Virginia Tech</p></div><div className="footer-links"><Link to="/projects">Work</Link><Link to="/experience">Experience</Link><Link to="/about">About</Link>{profile.github && <a href={profile.github} target="_blank" rel="noreferrer">GitHub ↗</a>}</div><small>© {new Date().getFullYear()} Raghav Sharma</small></footer></>;
}
