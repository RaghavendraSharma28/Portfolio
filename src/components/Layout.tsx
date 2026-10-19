import { useCallback, useEffect, useState } from 'react';
import type { MouseEvent } from 'react';
import { Link, NavLink, Outlet, useLocation, useNavigate } from 'react-router-dom';
import { ArrowUpRight, Menu, Moon, Sun, X } from 'lucide-react';
import { profile } from '../data/profile';
import { getProject } from '../data/projects';

function savedTheme() {
  return document.documentElement.dataset.theme === 'dark';
}

export function Layout() {
  const [open, setOpen] = useState(false);
  const [dark, setDark] = useState(savedTheme);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const path = location.pathname.replace(/\/+$/, '') || '/';
    const slug = path.startsWith('/projects/') ? path.slice('/projects/'.length) : '';
    const project = slug && !slug.includes('/') ? getProject(slug) : undefined;
    const pages: Record<string, [string, string]> = {
      '/': [`${profile.name} | Computer Engineering & Embedded Systems`, 'Portfolio of Raghav Sharma, a Virginia Tech Computer Engineering student working across embedded systems, FPGA design, robotics, computer vision, and software engineering.'],
      '/projects': [`Projects | ${profile.name}`, 'Engineering projects in computer vision, FPGA design, embedded systems, robotics, and software engineering.'],
      '/experience': [`Experience | ${profile.name}`, 'Professional internship and student engineering team experience at Virginia Tech.'],
      '/about': [`About | ${profile.name}`, 'Meet Raghav Sharma, a Virginia Tech Computer Engineering student interested in hardware and software integration.'],
    };
    const [title, description] = project
      ? [`${slug === 'vehicle-identification-ocr' ? 'UAE Mulkiya VIN Extraction System' : project.title} | ${profile.name}`, project.description]
      : pages[path] ?? (path.startsWith('/projects/')
        ? [`Project not found | ${profile.name}`, 'The requested project page could not be found. Browse the available engineering case studies.']
        : [`Page not found | ${profile.name}`, 'The requested page could not be found. Return to the portfolio home page or browse the projects.']);
    document.title = title;
    document.querySelector('meta[name="description"]')?.setAttribute('content', description);
    document.querySelector('meta[property="og:title"]')?.setAttribute('content', title);
    document.querySelector('meta[property="og:description"]')?.setAttribute('content', description);
  }, [location.pathname, location.hash]);

  useEffect(() => {
    const media = window.matchMedia('(prefers-color-scheme: dark)');
    const syncSystemTheme = (event: MediaQueryListEvent) => {
      try {
        if (localStorage.getItem('theme') !== null) return;
      } catch {
        // Keep the current theme if browser storage is unavailable.
        return;
      }
      const next = event.matches;
      document.documentElement.dataset.theme = next ? 'dark' : 'light';
      setDark(next);
    };
    media.addEventListener('change', syncSystemTheme);
    return () => media.removeEventListener('change', syncSystemTheme);
  }, []);

  useEffect(() => {
    const state = location.state as { scrollToResume?: boolean } | null;
    if (state?.scrollToResume || (location.pathname === '/' && location.hash === '#resume')) return;
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, [location.pathname]);

  const handleResume = useCallback((event: MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault();
    setOpen(false);
    if (location.pathname === '/') {
      const behavior = window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth';
      document.getElementById('resume')?.scrollIntoView({ behavior, block: 'start' });
    } else {
      navigate('/', { state: { scrollToResume: true } });
    }
  }, [location.pathname, navigate]);

  const toggleTheme = () => {
    const next = !dark;
    setDark(next);
    document.documentElement.dataset.theme = next ? 'dark' : 'light';
    try {
      localStorage.setItem('theme', next ? 'dark' : 'light');
    } catch {
      // The current session still changes theme when storage is unavailable.
    }
  };

  return <>
    <header className="site-header">
      <div className="header-inner">
        <Link to="/" className="wordmark" onClick={() => setOpen(false)}>Raghav Sharma<span>.</span></Link>
        <nav id="main-navigation" className={open ? 'main-nav nav-open' : 'main-nav'} aria-label="Main navigation">
          <NavLink to="/projects" onClick={() => setOpen(false)}>Work</NavLink>
          <NavLink to="/experience" onClick={() => setOpen(false)}>Experience</NavLink>
          <NavLink to="/about" onClick={() => setOpen(false)}>About</NavLink>
          {profile.github && <a href={profile.github} target="_blank" rel="noreferrer">GitHub <ArrowUpRight size={14}/></a>}
          <a className="nav-resume" href="/#resume" onClick={handleResume}>Resume <ArrowUpRight size={14}/></a>
        </nav>
        <div className="header-actions">
          <button className="icon-button theme-toggle" aria-label={`Switch to ${dark ? 'light' : 'dark'} theme`} aria-pressed={dark} onClick={toggleTheme}>{dark ? <Sun size={17}/> : <Moon size={17}/>}</button>
          <button className="icon-button menu-toggle" aria-label={open ? 'Close navigation menu' : 'Open navigation menu'} aria-expanded={open} aria-controls="main-navigation" onClick={() => setOpen(!open)}>{open ? <X/> : <Menu/>}</button>
        </div>
      </div>
    </header>
    <main><Outlet/></main>
    <footer className="site-footer">
      <div><Link to="/" className="wordmark">Raghav Sharma<span>.</span></Link><p>Computer Engineering · Virginia Tech</p></div>
      <div className="footer-links"><Link to="/projects">Work</Link><Link to="/experience">Experience</Link><Link to="/about">About</Link>{profile.github && <a href={profile.github} target="_blank" rel="noreferrer">GitHub ↗</a>}</div>
      <small>© {new Date().getFullYear()} Raghav Sharma</small>
    </footer>
  </>;
}
