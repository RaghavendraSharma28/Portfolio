import { ArrowLeft, ArrowRight, BriefcaseBusiness, GraduationCap, MapPin } from 'lucide-react';
import { Link, useParams } from 'react-router-dom';
import { caseStudies } from '../data/caseStudies';
import { getProject } from '../data/projects';
import { FpgaArchitectureDiagram, OcrProductionArchitecture, Pipeline, ProjectVisual } from '../components/Visual';
import { FpgaOperationTable, MultiplierWalkthrough, OcrBenchmarkComparison, OcrDatasetFacts, OcrExperimentCards, OcrFutureWork, OcrProductionResult, ProjectGallery, ProjectResources, SyntheticCharacterExample, VerifiedFacts } from '../components/CaseStudyExtras';
import { NotFound } from './NotFound';

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
      {isInternship && <OcrProductionResult facts={project.verifiedResults ?? []}/>}
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
      <aside className="detail-aside"><div className="eyebrow section-kicker">{isInternship ? 'PRODUCTION PIPELINE' : 'SYSTEM FLOW'}</div><h3>{isInternship ? 'From document to reviewed prediction.' : isFpga ? 'Controller to output.' : 'Conceptual process'}</h3><p className="aside-note">{isInternship ? 'RapidOCR runs locally, followed by candidate validation, conservative VIN-specific correction, and review flags.' : 'A high-level view based on the described work and available source.'}</p>
        <Pipeline items={content.flow}/><div className="aside-rule"/><div className="eyebrow section-kicker">TOOLS & TECHNOLOGIES</div><div className="tag-row">{project.tags.map(tag => <span className="tag" key={tag}>{tag}</span>)}</div>
        {isInternship && <><div className="aside-rule"/><div className="eyebrow section-kicker">CONFIDENTIALITY</div><p className="aside-note">The document and VIN examples are synthetic. No customer documents, private datasets, or internal materials are shown.</p></>}
        {isInternship && <p className="aside-note">Qwen2.5-VL-3B and the other vision-language approaches remain experimental. No comparable VLM accuracy is claimed.</p>}
      </aside>
    </section>

    {isInternship && <section className="ocr-architecture-section"><div className="page-wrap"><div className="eyebrow section-kicker">PRODUCTION SYSTEM</div><h2>Local OCR, deterministic checks, review when uncertain.</h2><p>The system treats text recognition as a candidate-generation step. Format checks and conservative correction help keep plausible-looking but incorrect VINs from passing silently.</p><OcrProductionArchitecture/></div></section>}
    {isInternship && <section className="comparison-section section"><div className="page-wrap"><div className="eyebrow section-kicker">RESULTS IN THEIR EVALUATION CONTEXT</div><h2>Production outcome and initial baseline.</h2><OcrBenchmarkComparison facts={project.verifiedResults ?? []}/><OcrDatasetFacts facts={project.verifiedResults ?? []}/></div></section>}
    {isInternship && <section className="ocr-experiments-section"><div className="page-wrap"><div className="eyebrow section-kicker">MODEL EXPERIMENTS</div><h2>Choose the approach the evidence supports.</h2><p className="section-intro">I compared OCR and vision-language approaches, including their output reliability and environment constraints. The VLM experiments informed the design, but none replaced the production OCR pipeline.</p><OcrExperimentCards/></div></section>}
    {isInternship && <section className="ocr-challenges-section"><div className="page-wrap"><div className="eyebrow section-kicker">ENGINEERING CHALLENGES & LESSONS</div><h2>Reliable extraction depends on more than model output.</h2><div className="ocr-challenge-grid"><article><span>01 · DATA</span><h3>Make labels trustworthy</h3><p>File-to-label audits, invalid and duplicate checks, and label normalization made training and evaluation inputs more consistent.</p></article><article><span>02 · GPU ENVIRONMENT</span><h3>Diagnose before choosing</h3><p>CUDA diagnostics worked on Windows with an RTX 4050 Laptop GPU (6 GB VRAM), while model-specific GPU training remained unstable. CPU training was the stable fallback.</p></article><article><span>03 · OUTPUT CONTRACT</span><h3>Validate structure and meaning</h3><p>A well-formed 17-character candidate can still be wrong. Exact-match evaluation and conservative review flags matter, and caption-style generations do not satisfy strict extraction.</p></article></div></div></section>}
    {isInternship && <section className="ocr-future-section"><div className="page-wrap ocr-future-layout"><div><div className="eyebrow section-kicker">FUTURE WORK · NOT YET IMPLEMENTED</div><h2>A practical next set of experiments.</h2><p>Possible next steps identified in the report:</p></div><OcrFutureWork/></div></section>}
    {isInternship && <section className="error-demo"><div className="page-wrap"><div className="eyebrow section-kicker">SYNTHETIC SAMPLE · ILLUSTRATIVE FAILURES</div><h2>Where recognition can break.</h2><p>The sample content is fictional. These are possible OCR error modes, not measured failure categories.</p><SyntheticCharacterExample/><div className="error-grid">{['Similar-looking characters', 'Blurred or low contrast', 'Missed / extra characters', 'Text detection boundaries'].map((label, index) => <div className="error-item" key={label}><span>0{index + 1}</span><b>{label}</b><div className="synthetic-line"><i/></div></div>)}</div></div></section>}
    {isFpga && <section className="conceptual-diagram"><div className="page-wrap"><div className="eyebrow section-kicker">SOURCE-ALIGNED ARCHITECTURE</div><h2>Controller, datapath, and multiplier.</h2><p>Module roles and signal widths follow the public RTL. This schematic describes connections and control flow, not a timing waveform.</p><FpgaArchitectureDiagram/></div></section>}
    {isFpga && <AdditionalDigitalDesign/>}

    <ProjectGallery project={project}/>

    <section className="next-project page-wrap"><div><span className="eyebrow section-kicker">KEEP EXPLORING</span><h2>More engineering work.</h2></div><Link className="button button-primary" to="/projects">Browse projects <ArrowRight size={16}/></Link></section>
  </>;
}
