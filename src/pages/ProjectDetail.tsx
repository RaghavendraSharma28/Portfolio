import { ArrowLeft, ArrowRight, BriefcaseBusiness, GraduationCap, MapPin } from 'lucide-react';
import { Link, useParams } from 'react-router-dom';
import { caseStudies } from '../data/caseStudies';
import { getProject } from '../data/projects';
import { FpgaArchitectureDiagram, Pipeline, ProjectVisual } from '../components/Visual';
import { FpgaOperationTable, MultiplierWalkthrough, OcrBaselineChart, ProjectGallery, ProjectResources, SyntheticCharacterExample, VerifiedFacts } from '../components/CaseStudyExtras';
import { NotFound } from './NotFound';

function OCRComparison({ facts }: { facts: NonNullable<ReturnType<typeof getProject>>['verifiedResults'] }) {
  return <section className="comparison-section section">
    <div className="page-wrap"><div className="eyebrow section-kicker">INVESTIGATED APPROACHES</div><h2>One measured baseline. One explored alternative.</h2>
      <OcrBaselineChart facts={facts ?? []}/>
      <div className="comparison-grid">
        <article className="approach-card measured"><span className="approach-label">OBSERVED MEASUREMENT</span><h3>PaddleOCR</h3><p>Initial OCR baseline evaluated with exact-string matching.</p><strong>14.97%</strong><small>22 exact matches among 147 evaluated images</small></article>
        <article className="approach-card explored"><span className="approach-label">EXPLORED · NO COMPARABLE SCORE</span><h3>Qwen2.5-VL-3B</h3><p>Investigated as an alternative for visual document understanding.</p><strong>Qualitative exploration</strong><small>No later accuracy or improvement figure is claimed.</small></article>
      </div>
    </div>
  </section>;
}

function AdditionalDigitalDesign() {
  return <section className="additional-work section"><div className="page-wrap"><div className="eyebrow section-kicker">ADDITIONAL DIGITAL DESIGN</div><h2>Logic beyond the featured system.</h2><p>Other academic work has included combinational logic, decoders, comparators, Gray-code counters, bus systems, function units, FSM controllers, and seven-segment displays. Tools and boards in this coursework include Intel Quartus Prime, Questa Intel FPGA, DE10-Lite, and DE1-SoC.</p></div></section>;
}

export function ProjectDetail() {
  const { slug = '' } = useParams();
  const project = getProject(slug);
  const content = caseStudies[slug];

  if (!project || !content) {
    return <NotFound title="That project isn’t here." message="This project link may be out of date. Browse the available case studies or return home."/>;
  }

  const isInternship = project.kind === 'ocr';
  const isFpga = project.kind === 'fpga';

  return <>
    <section className={`detail-hero page-wrap detail-${project.kind}`}>
      <Link to="/projects" className="back-link"><ArrowLeft size={15}/> All projects</Link>
      <div className="eyebrow section-kicker">{project.eyebrow} <i/> {project.category.toUpperCase()}</div>
      <h1>{content.title}</h1><p className="detail-subtitle">{content.subtitle}</p>
      <div className="detail-meta">
        {isInternship ? <><span><BriefcaseBusiness size={15}/> Data Science Intern · A.W. Rostamani</span><span><MapPin size={15}/> Dubai, UAE</span><span>Summer 2026</span></> : <><span><GraduationCap size={16}/> Academic engineering work</span><span>Virginia Tech coursework and projects</span></>}
        {project.status && <span className="detail-status">{project.status}</span>}
      </div>
      <ProjectResources project={project}/>
      <ProjectVisual kind={project.kind}/>
    </section>

    {!isInternship && project.verifiedResults && <VerifiedFacts facts={project.verifiedResults} heading="Verified implementation facts"/>}

    <section className="detail-content page-wrap">
      <div className="detail-main"><div className="eyebrow section-kicker">{isInternship ? 'PROJECT OVERVIEW' : 'ENGINEERING CASE STUDY'}</div>
        <h2>{isInternship ? 'A closer look at document understanding.' : isFpga ? 'A controller, datapath, and an iterative multiplier.' : 'From idea to implementation.'}</h2>
        <p className="detail-lead">{content.subtitle}</p>
        <div className="detail-sections">{content.sections.map((section, index) => <article key={section.title}><span className="detail-number">{String(index + 1).padStart(2, '0')}</span><div><h3>{section.title}</h3><p>{section.body}</p></div></article>)}</div>
        {isFpga && <div className="fpga-reference-details"><FpgaOperationTable/><MultiplierWalkthrough/></div>}
      </div>
      <aside className="detail-aside"><div className="eyebrow section-kicker">{isInternship ? 'CONCEPTUAL PIPELINE' : 'SYSTEM FLOW'}</div><h3>{isInternship ? 'From document to candidate.' : isFpga ? 'Controller to output.' : 'Conceptual process'}</h3><p className="aside-note">{isInternship ? 'Conceptual representation; the exact production pipeline is not documented here.' : 'A high-level view based on the described work and available source.'}</p>
        <Pipeline items={content.flow}/><div className="aside-rule"/><div className="eyebrow section-kicker">TOOLS & TECHNOLOGIES</div><div className="tag-row">{project.tags.map(tag => <span className="tag" key={tag}>{tag}</span>)}</div>
        {isInternship && <><div className="aside-rule"/><div className="eyebrow section-kicker">CONFIDENTIALITY</div><p className="aside-note">The document and VIN examples are synthetic. No customer documents, private datasets, or internal materials are shown.</p></>}
        {isInternship && <p className="aside-note">The displayed baseline is the initial exact-match measurement. Qwen2.5-VL-3B was explored, but a comparable score is not available here.</p>}
      </aside>
    </section>

    {isInternship && <OCRComparison facts={project.verifiedResults}/>}
    {isInternship && <section className="error-demo"><div className="page-wrap"><div className="eyebrow section-kicker">SYNTHETIC SAMPLE · ILLUSTRATIVE FAILURES</div><h2>Where recognition can break.</h2><p>The sample content is fictional. These are possible OCR error modes, not measured failure categories.</p><SyntheticCharacterExample/><div className="error-grid">{['Similar-looking characters', 'Blurred or low contrast', 'Missed / extra characters', 'Text detection boundaries'].map((label, index) => <div className="error-item" key={label}><span>0{index + 1}</span><b>{label}</b><div className="synthetic-line"><i/></div></div>)}</div></div></section>}
    {isFpga && <section className="conceptual-diagram"><div className="page-wrap"><div className="eyebrow section-kicker">SOURCE-ALIGNED ARCHITECTURE</div><h2>Controller, datapath, and multiplier.</h2><p>Module roles and signal widths follow the public RTL. This schematic describes connections and control flow, not a timing waveform.</p><FpgaArchitectureDiagram/></div></section>}
    {isFpga && <AdditionalDigitalDesign/>}

    <ProjectGallery project={project}/>

    <section className="next-project page-wrap"><div><span className="eyebrow section-kicker">KEEP EXPLORING</span><h2>More engineering work.</h2></div><Link className="button button-primary" to="/projects">Browse projects <ArrowRight size={16}/></Link></section>
  </>;
}
