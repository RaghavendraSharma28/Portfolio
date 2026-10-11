import { Link, useParams } from 'react-router-dom';
import { ArrowLeft, ArrowRight, MapPin, GraduationCap, BriefcaseBusiness, Cpu, Sparkles } from 'lucide-react';
import { projects, getProject } from '../data/projects';
import { ProjectCard } from '../components/ProjectCard';
import { MultiplierDiagram, Pipeline, ProjectVisual } from '../components/Visual';
import { profile } from '../data/profile';

export function Projects() { return <><section className="page-hero page-wrap"><div className="eyebrow section-kicker">WORK / ENGINEERING PORTFOLIO</div><h1>Selected work,<br/><em>thoughtfully built.</em></h1><p>Projects across computer vision, digital design, embedded systems, robotics, and software architecture.</p></section><section className="section projects-page-section"><div className="page-wrap"><div className="project-grid">{projects.map((p, i) => <ProjectCard key={p.slug} project={p} index={i}/>)}</div></div></section></> }

const details: Record<string, { title: string; subtitle: string; sections: { title: string; body: string }[]; flow: string[] }> = {
  'vehicle-identification-ocr': { title: 'Automated Vehicle Identification Using Computer Vision', subtitle: 'Investigating OCR and vision-language approaches for extracting vehicle identifiers from document images.', flow: ['Document image', 'Preprocessing', 'OCR / vision model', 'Text extraction', 'VIN validation', 'Output'], sections: [
    { title: 'The problem', body: 'Vehicle registration documents vary in layout, text size, image quality, lighting, and clarity. The goal was to investigate methods for finding and extracting a 17-character Vehicle Identification Number (VIN) from document images.' },
    { title: 'Evaluation approach', body: 'I evaluated PaddleOCR against a dataset of 147 document images and compared extracted VIN strings with expected outputs. This initial baseline helped establish the scale of exact-match recognition challenges.' },
    { title: 'Error analysis', body: 'Failure modes to investigate include visually similar characters, missed or duplicated characters, image noise, blur, and text detection or grouping. These are illustrative categories; category frequencies were not measured here.' },
    { title: 'Alternative approaches', body: 'I explored Qwen2.5-VL-3B as an alternative for visual document understanding. Further comparison would require controlled evaluation under consistent prompts and scoring criteria.' },
    { title: 'VIN constraints', body: 'A valid VIN is 17 characters and excludes the letters I, O, and Q. These format constraints can help identify implausible candidates; this portfolio does not claim that a complete production validation system was built.' },
    { title: 'What I learned', body: 'Document OCR is a pipeline problem: image quality, text localization, character recognition, and exact-match evaluation all matter. A model’s output needs careful comparison against task-specific constraints.' },
  ] },
  'fpga-digital-systems': { title: 'FPGA Digital Systems', subtitle: 'Digital design and verification, from logic requirements to a mapped FPGA implementation.', flow: ['Requirements', 'RTL design', 'Simulation', 'Verification', 'FPGA implementation'], sections: [
    { title: 'Design scope', body: 'Academic work spans combinational logic, decoders, comparators, Gray-code counters, bus systems, function units, sequential multiplication, FSM controllers, and seven-segment displays.' },
    { title: 'Design process', body: 'Translate behavior into Verilog or SystemVerilog, simulate expected and boundary cases in Questa Intel FPGA, refine the RTL, and implement on DE10-Lite or DE1-SoC boards using Intel Quartus Prime.' },
    { title: 'Sequential datapath', body: 'A conceptual multiplier datapath uses registers, arithmetic logic, and a finite state machine to coordinate repeated operations. This diagram represents a general educational architecture, not a documented project schematic.' },
    { title: 'Verification mindset', body: 'Simulation helps compare observed outputs against expected behavior across clocked transitions and input conditions. No resource usage, timing closure, operating frequency, or benchmark figures are claimed.' },
  ] },
  'embedded-systems': { title: 'Embedded Systems', subtitle: 'Academic microcontroller projects connecting C firmware to real peripherals.', flow: ['Application', 'Hardware abstraction', 'Drivers', 'MSP432 hardware'], sections: [
    { title: 'Firmware foundations', body: 'Representative work includes GPIO input and output, button debouncing, LED control, timer-driven behavior, UART configuration, peripheral initialization, and finite state machines.' },
    { title: 'Working across layers', body: 'Firmware can interact through higher-level TI DriverLib calls or closer to device registers. A hardware abstraction layer helps keep application behavior separate from peripheral-specific details.' },
    { title: 'Event-driven behavior', body: 'Timers and interrupts provide a way to react to hardware events without tying every action to a blocking loop. Debugging involves checking configuration, signal behavior, and state transitions.' },
    { title: 'Academic context', body: 'These are learning projects using C, MSP432, TI DriverLib, and Code Composer Studio. They are presented as academic embedded work, not commercial products.' },
  ] },
  'robotics-mechatronics': { title: 'Robotics & Mechatronics', subtitle: 'Building at the boundary between control logic, electronics, and physical motion.', flow: ['Analog keypad', 'ADC thresholds', 'State logic', 'Servo actuation'], sections: [
    { title: 'Keypad-controlled servo lock', body: 'An academic prototype reads a resistor-ladder keypad through an analog input, identifies key presses using ADC thresholds, and controls a servo to demonstrate lock and unlock behavior.' },
    { title: 'System behavior', body: 'Input readings map to key states; control logic interprets the input and requests servo movement. The diagram is a conceptual representation of the described setup.' },
    { title: 'Robotics experience', body: 'My background includes World Robot Olympiad, FIRST LEGO League, FIRST Tech Challenge, and VEXU robotics. I have participated in robotics and engineering teams involving electrical systems and programming.' },
    { title: 'Hands-on integration', body: 'Small prototypes make the interaction between electrical input, software decisions, and mechanical output tangible. No competition awards, rankings, or commercial deployments are claimed.' },
  ] },
  'cpp-ai-workspace': { title: 'C++ AI Workspace', subtitle: 'A modular software project exploring document processing and workspace organization.', flow: ['Document', 'TextProcessor', 'Chunker', 'Workspace'], sections: [
    { title: 'A modular foundation', body: 'The project concepts center on Document, Workspace, TextProcessor, and Chunker components, with responsibilities separated so text ingestion and organization can evolve independently.' },
    { title: 'Engineering focus', body: 'The work highlights data structures, ownership and interfaces, text tokenization and chunking, unit testing, and build tooling with CMake, Git, and Docker.' },
    { title: 'Scope', body: 'This is a software engineering and academic systems project. It is not described as a complete production retrieval-augmented generation system.' },
  ] },
};

function Metric({ value, label }: { value: string; label: string }) { return <div className="metric"><strong>{value}</strong><span>{label}</span></div>; }
export function ProjectDetail() {
  const { slug = '' } = useParams(); const project = getProject(slug); const content = details[slug];
  if (!project || !content) return <section className="page-wrap not-found"><h1>Project not found.</h1><Link to="/projects" className="text-link"><ArrowLeft size={15}/> Back to work</Link></section>;
  return <><section className={`detail-hero page-wrap detail-${project.kind}`}><Link to="/projects" className="back-link"><ArrowLeft size={15}/> All projects</Link><div className="eyebrow section-kicker">{project.eyebrow} <i/> {project.category.toUpperCase()}</div><h1>{content.title}</h1><p className="detail-subtitle">{content.subtitle}</p><div className="detail-meta">{project.kind === 'ocr' ? <><span><BriefcaseBusiness size={15}/> Data Science Intern · A.W. Rostamani</span><span><MapPin size={15}/> Dubai, UAE</span><span>Summer 2026</span></> : <><span><GraduationCap size={16}/> Academic engineering work</span><span>Virginia Tech coursework and projects</span></>}</div><ProjectVisual kind={project.kind}/></section>
    {slug === 'vehicle-identification-ocr' && <section className="metrics-band"><div className="page-wrap metrics-inner"><Metric value="147" label="document images evaluated"/><Metric value="22" label="exact VIN matches"/><Metric value="14.97%" label="initial baseline exact-match accuracy"/><p>INITIAL PADDLEOCR BASELINE<br/>Not the final internship result</p></div></section>}
    <section className="detail-content page-wrap">
      <div className="detail-main">
        <div className="eyebrow section-kicker">OVERVIEW</div>
        <h2>{slug === 'vehicle-identification-ocr' ? 'A closer look at document understanding.' : 'From idea to implementation.'}</h2>
        <p className="detail-lead">{content.subtitle}</p>
        <div className="detail-sections">
          {content.sections.map((section, i) => (
            <article key={section.title}>
              <span className="detail-number">{String(i + 1).padStart(2, '0')}</span>
              <div><h3>{section.title}</h3><p>{section.body}</p></div>
            </article>
          ))}
        </div>
      </div>
      <aside className="detail-aside">
        <div className="eyebrow section-kicker">TECHNICAL OVERVIEW</div>
        <h3>Conceptual process</h3>
        <p className="aside-note">Illustrative architecture based on the described work.</p>
        <Pipeline items={content.flow}/>
        <div className="aside-rule"/>
        <div className="eyebrow section-kicker">TOOLS & TECHNOLOGIES</div>
        <div className="tag-row">{project.tags.map(tag => <span className="tag" key={tag}>{tag}</span>)}</div>
        {slug === 'vehicle-identification-ocr' && <>
          <div className="aside-rule"/>
          <div className="eyebrow section-kicker">CONFIDENTIALITY</div>
          <p className="aside-note">All visuals on this page are original and illustrative. No customer documents, private data, or internal materials are shown.</p>
        </>}
      </aside>
    </section>
    {slug === 'vehicle-identification-ocr' && <section className="error-demo"><div className="page-wrap"><div className="eyebrow section-kicker">ILLUSTRATIVE ERROR ANALYSIS</div><h2>Where recognition can break.</h2><p>Example failure categories to consider — no measured frequencies are implied.</p><div className="error-grid">{['Similar-looking characters', 'Blurred or low contrast', 'Missed / extra characters', 'Text detection boundaries'].map((x, i) => <div className="error-item" key={x}><span>0{i + 1}</span><b>{x}</b><div className="synthetic-line"><i/></div></div>)}</div></div></section>}
    {slug === 'fpga-digital-systems' && <section className="conceptual-diagram"><div className="page-wrap"><div className="eyebrow section-kicker">CONCEPTUAL DATAPATH</div><h2>Sequential multiplier, at a glance.</h2><p>A general teaching architecture; no project-specific schematic is represented.</p><MultiplierDiagram/></div></section>}
    <section className="next-project page-wrap"><div><span className="eyebrow section-kicker">KEEP EXPLORING</span><h2>More engineering work.</h2></div><Link className="button button-primary" to="/projects">Browse projects <ArrowRight size={16}/></Link></section></>;
}

export function Experience() { return <><section className="page-hero page-wrap"><div className="eyebrow section-kicker">EXPERIENCE / 01</div><h1>Learning through<br/><em>building.</em></h1><p>Professional experience, student teams, and hands-on engineering.</p></section><section className="experience-page"><div className="page-wrap timeline"><article className="timeline-item"><div className="timeline-date">SUMMER 2026<br/>DUBAI, UAE</div><div className="timeline-mark"><span/></div><div className="timeline-copy"><div className="eyebrow section-kicker">PROFESSIONAL EXPERIENCE</div><h2>Data Science Intern</h2><h3>A.W. Rostamani</h3><p>Worked on computer vision and optical character recognition for extracting Vehicle Identification Numbers from vehicle registration documents. Evaluated OCR approaches, investigated recognition limitations, and explored vision-language models to improve document understanding.</p><Link className="text-link" to="/projects/vehicle-identification-ocr">Read the case study <ArrowRight size={15}/></Link></div></article><article className="timeline-item student-item"><div className="timeline-date">STUDENT TEAM</div><div className="timeline-mark"><span/></div><div className="timeline-copy"><div className="eyebrow section-kicker">STUDENT DESIGN TEAM</div><h2>Hybrid Electric Vehicle Team</h2><h3>Virginia Tech</h3><p>Student engineering team experience. Specific responsibilities and project details can be added as they are confirmed.</p></div></article><article className="timeline-item student-item"><div className="timeline-date">STUDENT TEAM</div><div className="timeline-mark"><span/></div><div className="timeline-copy"><div className="eyebrow section-kicker">COMPETITIVE ROBOTICS</div><h2>VEXU Robotics</h2><h3>Virginia Tech</h3><p>Student robotics experience involving hardware and programming. Specific responsibilities and dates can be added when confirmed.</p></div></article></div></section><section className="page-wrap experience-note"><Cpu size={19}/><p>Student teams are presented as extracurricular engineering experiences, separate from professional employment.</p></section></> }

export function About() { return <><section className="page-hero about-hero page-wrap"><div className="eyebrow section-kicker">ABOUT / RAGHAV SHARMA</div><h1>When software<br/>becomes <em>physical.</em></h1><p>I've always been fascinated by the moment software becomes something physical — when a few lines of code control a motor, process a signal, or bring a digital system to life.</p></section><section className="about-story"><div className="page-wrap about-story-grid"><div className="portrait-placeholder" aria-label="Placeholder for a professional photo"><div className="portrait-initials">RS</div><span>PHOTO PLACEHOLDER</span><small>Replace with a professional photo</small></div><div className="story-copy"><div className="eyebrow section-kicker">A CONNECTED DISCIPLINE</div><h2>Hardware gives software a world to act in.</h2><p>Robotics first made the connection between code and physical systems compelling to me. Studying Computer Engineering at Virginia Tech has given me ways to explore that connection through embedded systems, digital logic, and applied AI.</p><p>I’m drawn to challenging, hands-on problems where careful thinking has to meet real constraints: a signal, a peripheral, an image, or a system that needs to work beyond the screen.</p><p>My interests continue to grow across robotics, computing, and the engineering choices that bring electronics and software together.</p></div></div></section><section className="education-section"><div className="page-wrap education-grid"><div><div className="eyebrow section-kicker">EDUCATION</div><h2>Virginia Tech</h2><p>Bachelor of Science in Computer Engineering</p><p>Expected graduation · {profile.graduationYear}</p><div className="minor-list"><span>Computer Science</span><span>Mathematics</span><span>Quantum Information Science & Engineering</span></div></div><div><div className="eyebrow section-kicker">TECHNICAL INTERESTS</div><h3>Questions I like working on.</h3><p>Embedded systems · FPGA & digital design · Robotics · Computer vision · Artificial intelligence · Low-level systems programming</p></div></div></section><section className="skills-section page-wrap"><div className="eyebrow section-kicker">TOOLS & TECHNOLOGIES</div><h2>A working toolkit.</h2><p className="skills-intro">A curated snapshot of languages and tools I’ve worked with across classes, projects, and internship experience.</p><div className="skills-grid">{[
  ['Languages', 'C · C++ · Python · Verilog / SystemVerilog · Java · Assembly · JavaScript / TypeScript'],
  ['Embedded & hardware', 'MSP432 · Arduino · FPGA · UART · SPI / I²C concepts · GPIO · ADC · Timers · Interrupts'],
  ['Tools', 'Git · GitHub · Quartus Prime · Questa · Code Composer Studio · LTspice · MATLAB · Docker · CMake'],
  ['AI & computer vision', 'PaddleOCR · Image processing · Qwen2.5-VL · PyTorch / TensorFlow concepts'],
  ['Web & software', 'React · Vite · HTML · CSS · Testing · Software architecture'],
].map(([title, text]) => <article key={title}><span>{title}</span><p>{text}</p></article>)}</div></section><section className="about-closing"><div className="page-wrap"><Sparkles size={19}/><p>Engineering is most exciting when ideas have to meet the real world.</p><Link className="text-link" to="/projects">See what I’m building <ArrowRight size={15}/></Link></div></section></> }
