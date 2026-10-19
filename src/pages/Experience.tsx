import { ArrowRight, Cpu } from 'lucide-react';
import { Link } from 'react-router-dom';

export function Experience() {
  return <>
    <section className="page-hero page-wrap">
      <div className="eyebrow section-kicker">EXPERIENCE / 01</div>
      <h1>Learning through<br/><em>building.</em></h1>
      <p>Professional experience, student teams, and hands-on engineering.</p>
    </section>
    <section className="experience-page">
      <div className="page-wrap timeline">
        <article className="timeline-item">
          <div className="timeline-date">SUMMER 2026<br/>DUBAI, UAE</div><div className="timeline-mark"><span/></div>
          <div className="timeline-copy"><div className="eyebrow section-kicker">PROFESSIONAL EXPERIENCE</div><h2>Data Science Intern</h2><h3>A.W. Rostamani</h3>
            <p>Worked on computer vision and optical character recognition for extracting Vehicle Identification Numbers from vehicle registration documents. Evaluated OCR approaches, investigated recognition limitations, and explored vision-language models to improve document understanding.</p>
            <Link className="text-link" to="/projects/vehicle-identification-ocr">Read the case study <ArrowRight size={15}/></Link>
          </div>
        </article>
        <article className="timeline-item student-item">
          <div className="timeline-date">SEP 2025<br/>— PRESENT</div><div className="timeline-mark"><span/></div>
          <div className="timeline-copy"><div className="eyebrow section-kicker">STUDENT DESIGN TEAM</div><h2>Hybrid Electric Vehicle Team</h2><h3>Electrical / Integration Team Member · Virginia Tech</h3><p>Contribute to the electrical and integration subteam on multidisciplinary electric-vehicle development, with a focus on electrical hardware integration, circuit analysis, embedded systems, and hardware/software interfaces.</p></div>
        </article>
        <article className="timeline-item student-item">
          <div className="timeline-date">AUG 2025<br/>— MAY 2026</div><div className="timeline-mark"><span/></div>
          <div className="timeline-copy"><div className="eyebrow section-kicker">COMPETITIVE ROBOTICS</div><h2>VEX U Robotics</h2><h3>Electrical & Programming Team Member · Virginia Tech</h3><p>Contributed to electrical development and robot programming, working across robot electrical systems and hardware/software integration.</p></div>
        </article>
      </div>
    </section>
    <section className="page-wrap experience-note"><Cpu size={19}/><p>Student teams are presented as extracurricular engineering experiences, separate from professional employment.</p></section>
  </>;
}
