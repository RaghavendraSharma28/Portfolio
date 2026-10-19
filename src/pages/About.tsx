import { ArrowRight, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';
import { profile } from '../data/profile';

const skillGroups = [
  ['Languages', 'C · C++ · Python · Verilog / SystemVerilog · Java · Assembly · JavaScript / TypeScript'],
  ['Embedded & hardware', 'MSP432 · Arduino · FPGA · UART · SPI / I²C concepts · GPIO · ADC · Timers · Interrupts'],
  ['Tools', 'Git · GitHub · Quartus Prime · Questa · Code Composer Studio · LTspice · MATLAB · Docker · CMake'],
  ['AI & computer vision', 'PaddleOCR · Image processing · Qwen2.5-VL · PyTorch / TensorFlow concepts'],
  ['Web & software', 'React · Vite · HTML · CSS · Testing · Software architecture'],
];

export function About() {
  return <>
    <section className="page-hero about-hero page-wrap"><div className="eyebrow section-kicker">ABOUT / RAGHAV SHARMA</div><h1>When software<br/>becomes <em>physical.</em></h1><p>I've always been fascinated by the moment software becomes something physical — when a few lines of code control a motor, process a signal, or bring a digital system to life.</p></section>
    <section className="about-story"><div className="page-wrap about-story-grid">
      <div className="portrait-art" role="img" aria-label="Initials RS graphic for Raghav Sharma">
        <div className="portrait-art-grid"/><span className="portrait-orbit orbit-a"/><span className="portrait-orbit orbit-b"/>
        <div className="portrait-monogram"><span>R</span><span>S</span></div>
        <div className="portrait-art-footer"><span>RAGHAV SHARMA</span><span>COMPUTER ENGINEERING · VT</span></div>
      </div>
      <div className="story-copy"><div className="eyebrow section-kicker">A CONNECTED DISCIPLINE</div><h2>Hardware gives software a world to act in.</h2><p>Robotics first made the connection between code and physical systems compelling to me. Studying Computer Engineering at Virginia Tech has given me ways to explore that connection through embedded systems, digital logic, and applied AI.</p><p>I’m drawn to challenging, hands-on problems where careful thinking has to meet real constraints: a signal, a peripheral, an image, or a system that needs to work beyond the screen.</p><p>My interests continue to grow across robotics, computing, and the engineering choices that bring electronics and software together.</p></div>
    </div></section>
    <section className="education-section"><div className="page-wrap education-grid">
      <div><div className="eyebrow section-kicker">EDUCATION</div><h2>Virginia Tech</h2><p>Bachelor of Science in Computer Engineering</p><p>Expected graduation · {profile.graduationYear}</p><div className="minor-list"><span>Computer Science</span><span>Mathematics</span><span>Quantum Information Science & Engineering</span></div></div>
      <div><div className="eyebrow section-kicker">TECHNICAL INTERESTS</div><h3>Questions I like working on.</h3><p>Embedded systems · FPGA & digital design · Robotics · Computer vision · Artificial intelligence · Low-level systems programming</p></div>
    </div></section>
    <section className="skills-section page-wrap"><div className="eyebrow section-kicker">TOOLS & TECHNOLOGIES</div><h2>A working toolkit.</h2><p className="skills-intro">A curated snapshot of languages and tools I’ve worked with across classes, projects, and internship experience.</p><div className="skills-grid">{skillGroups.map(([title, text]) => <article key={title}><span>{title}</span><p>{text}</p></article>)}</div></section>
    <section className="about-closing"><div className="page-wrap"><Sparkles size={19}/><p>Engineering is most exciting when ideas have to meet the real world.</p><Link className="text-link" to="/projects">See what I’m building <ArrowRight size={15}/></Link></div></section>
  </>;
}
