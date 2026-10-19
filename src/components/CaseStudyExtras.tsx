import { ArrowUpRight, Play, FileText, Github } from 'lucide-react';
import type { Project } from '../data/projects';

export function ProjectResources({ project }: { project: Project }) {
  const links = [
    project.repositoryUrl && { href: project.repositoryUrl, label: project.repositoryLabel ?? 'View project repository', Icon: Github },
    project.videoDemoUrl && { href: project.videoDemoUrl, label: 'Watch demonstration', Icon: Play },
    project.technicalDocumentationUrl && { href: project.technicalDocumentationUrl, label: 'Technical documentation', Icon: FileText },
  ].filter((link): link is { href: string; label: string; Icon: typeof Github } => Boolean(link));

  if (links.length === 0) return null;
  return <div className="project-resources" aria-label="Project resources">
    {links.map(({ href, label, Icon }) => <a className="button resource-button" href={href} target="_blank" rel="noreferrer" key={`${label}-${href}`}>
      <Icon size={15}/>{label}<ArrowUpRight size={14}/>
    </a>)}
  </div>;
}

export function ProjectGallery({ project }: { project: Project }) {
  if (!project.screenshots?.length) return null;
  return <section className="project-gallery section" aria-label="Project screenshots">
    <div className="page-wrap">
      <div className="eyebrow section-kicker">PROJECT SCREENSHOTS</div>
      <div className="gallery-grid">{project.screenshots.map((image, index) => <figure key={`${image.src}-${index}`}>
        <img src={image.src} alt={image.alt} loading="lazy"/>
        {image.caption && <figcaption>{image.caption}</figcaption>}
      </figure>)}</div>
    </div>
  </section>;
}

export function VerifiedFacts({ facts, heading }: { facts: NonNullable<Project['verifiedResults']>; heading: string }) {
  if (!facts.length) return null;
  return <section className="verified-facts" aria-label={heading}>
    <div className="page-wrap"><h2>{heading}</h2><div className="verified-facts-grid">{facts.map(fact => <div className="verified-fact" key={fact.label}>
      <strong>{fact.value}</strong><span>{fact.label}</span>{fact.note && <small>{fact.note}</small>}
    </div>)}</div></div>
  </section>;
}

const operations = [
  ['0x0', 'OR with project constant', '{A, B} OR 16’h1143'],
  ['0x1', 'NAND', '8-bit result, zero-extended'],
  ['0x2', 'NOR', '8-bit result, zero-extended'],
  ['0x3', 'XOR', '8-bit result, zero-extended'],
  ['0x4', 'Complement A', 'Bitwise NOT of A'],
  ['0x5', 'Signed addition', 'Sign-extended A + B'],
  ['0x6', 'Signed subtraction', 'Sign-extended A − B'],
  ['0x7', 'Negation A', 'Two’s-complement negation'],
  ['0x8', 'Arithmetic left shift', 'Sign-extended A; shift by B[3:0]'],
  ['0x9', 'Arithmetic right shift', 'Explicit sign-fill; shift by B[3:0]'],
  ['0xA', 'Circular shift left', 'Rotate zero-extended A by B[3:0]'],
  ['0xB', 'Circular shift right', 'Rotate zero-extended A by B[3:0]'],
  ['0xC', 'Sequential multiplication', 'Eight manually advanced steps'],
  ['0xD', 'Debug / operand inspection', 'A and B routed to result, displays, and LEDs'],
];

export function FpgaOperationTable() {
  return <details className="technical-disclosure">
    <summary>Explore the 14-opcode operation set</summary>
    <div className="table-scroll"><table className="operation-table">
      <thead><tr><th scope="col">Opcode</th><th scope="col">Operation</th><th scope="col">RTL behavior</th></tr></thead>
      <tbody>{operations.map(([opcode, operation, behavior]) => <tr key={opcode}><td><code>{opcode}</code></td><th scope="row">{operation}</th><td>{behavior}</td></tr>)}</tbody>
    </table></div>
    <p className="table-note">Operation names and widths are summarized from the public Datapath.v source. Opcode 0 uses a coursework-specific constant.</p>
  </details>;
}

const multiplicationSteps = ['00783', '00B41', '00D20', '00690', '00348', '001A4', '000D2', '00069'];

export function MultiplierWalkthrough() {
  return <details className="technical-disclosure">
    <summary>Walk through the 8-step example: 15 × 7</summary>
    <div className="multiplier-example">
      <div className="example-input"><span>Multiplicand A</span><b>0x0F (15)</b></div>
      <div className="example-input"><span>Initial product register</span><b>0x00007</b></div>
      <div className="table-scroll"><table className="operation-table step-table">
        <thead><tr><th scope="col">Step</th><th scope="col">product_reg[16:0]</th><th scope="col">Display [15:0]</th></tr></thead>
        <tbody>{multiplicationSteps.map((value, index) => <tr key={value}><th scope="row">{index + 1}</th><td><code>0x{value}</code></td><td><code>0x{(Number.parseInt(value, 16) & 0xffff).toString(16).padStart(4, '0')}</code></td></tr>)}</tbody>
      </table></div>
      <p className="table-note">Hand-derived from the repository’s add-then-shift RTL for A=15 and B=7. This is an explanatory calculation, not a simulator trace or a claimed test pass.</p>
    </div>
  </details>;
}

type OcrFacts = NonNullable<Project['verifiedResults']>;
const factValue = (facts: OcrFacts, label: string) => facts.find(fact => fact.label === label);

export function OcrProductionResult({ facts }: { facts: OcrFacts }) {
  const accuracy = factValue(facts, 'Production benchmark accuracy')?.value ?? '—';
  const matches = factValue(facts, 'Production benchmark matches')?.value ?? '—';
  const benchmarkNote = factValue(facts, 'Production benchmark accuracy')?.note ?? '';
  return <section className="ocr-production-result" aria-label="Production benchmark result">
    <div><span className="eyebrow">DOCUMENTED PRODUCTION BENCHMARK · RAPIDOCR PIPELINE</span><strong>{accuracy}</strong><p>Chassis-number exact-match accuracy on a cleaned 110-image benchmark.</p></div>
    <div className="ocr-result-count"><strong>{matches}</strong><span>exact predictions</span><small>{benchmarkNote}</small></div>
  </section>;
}

export function OcrBenchmarkComparison({ facts }: { facts: OcrFacts }) {
  const production = factValue(facts, 'Production benchmark accuracy');
  const productionMatches = factValue(facts, 'Production benchmark matches')?.value ?? '';
  const baseline = factValue(facts, 'Initial PaddleOCR baseline');
  const productionPercent = Number.parseFloat(production?.value ?? '0');
  const baselinePercent = Number.parseFloat(baseline?.value ?? '0');
  return <div className="ocr-benchmark-comparison">
    <article className="benchmark-card benchmark-production"><span className="approach-label">FINAL DOCUMENTED PRODUCTION RESULT</span><h3>RapidOCR pipeline</h3><strong>{production?.value}</strong><p>{productionMatches} exact chassis-number predictions</p><div className="benchmark-track" role="img" aria-label={`${production?.value} exact predictions on the cleaned benchmark`}><i style={{ width: `${productionPercent}%` }}/></div><small>{production?.note}</small></article>
    <article className="benchmark-card benchmark-baseline"><span className="approach-label">INITIAL PADDLEOCR BASELINE</span><h3>PaddleOCR</h3><strong>{baseline?.value}</strong><p>Exact VIN matches</p><div className="benchmark-track" role="img" aria-label={`${baseline?.value} exact matches on the initial PaddleOCR evaluation`}><i style={{ width: `${baselinePercent}%` }}/></div><small>{baseline?.note}</small></article>
    <p className="benchmark-context">These results come from different evaluation contexts. The values are shown side by side for context, not as a controlled same-dataset comparison or a measured percentage-point improvement. The 935-image labelled training dataset and its 94-image test split are separate again.</p>
  </div>;
}

const ocrExperiments = [
  { name: 'RapidOCR', tag: 'SELECTED FOR PRODUCTION', result: 'Production system', text: 'Local OCR paired with candidate generation, VIN-specific validation and conservative correction. Suspicious candidates are flagged for review.' },
  { name: 'Qwen2.5-VL-3B-Instruct', tag: 'EXPERIMENTAL', result: 'No comparable accuracy reported', text: 'Inference, structured-output prompts, JSON parsing, and fine-tuning experiments were implemented. GPU training was unstable in the Windows RTX 4050 environment.' },
  { name: 'SmolVLM2', tag: 'EXPLORATORY', result: 'Not selected for production', text: 'CPU training could run, while GPU execution was unstable in the available environment.' },
  { name: 'BLIP', tag: 'NEGATIVE EXPERIMENTAL RESULT', result: '0% valid JSON in the observed evaluation', text: 'CPU fine-tuning completed, but responses were caption-like and hallucinated instead of following strict structured document extraction.' },
  { name: 'Hybrid OCR + VLM', tag: 'CONSERVATIVE MODE', result: 'RapidOCR remains primary', text: 'Early routing sometimes invoked Qwen unnecessarily, increased runtime, and could override a correct OCR prediction. VLM fallback remains a future experiment.' },
];

export function OcrExperimentCards() {
  return <div className="ocr-experiment-grid">{ocrExperiments.map(item => <article className="ocr-experiment-card" key={item.name}><span className="approach-label">{item.tag}</span><h3>{item.name}</h3><strong>{item.result}</strong><p>{item.text}</p></article>)}</div>;
}

export function OcrDatasetFacts({ facts }: { facts: OcrFacts }) {
  const dataset = factValue(facts, 'Clean labelled dataset');
  const split = factValue(facts, 'Documented data split');
  const easyOcr = factValue(facts, 'Separate EasyOCR experiment');
  return <div className="ocr-dataset-strip"><div><strong>{dataset?.value}</strong><span>{dataset?.note}</span></div><div><strong>{split?.value}</strong><span>{split?.note}</span></div><div><strong>{easyOcr?.value}</strong><span>{easyOcr?.note}</span></div></div>;
}

const futureWork = ['Expand the labelled dataset', 'Run document-focused VLM experiments on stable Linux GPU infrastructure', 'Evaluate image augmentation', 'Improve human review tooling', 'Develop a production API', 'Add automated regression tests'];

export function OcrFutureWork() {
  return <ul className="ocr-future-list">{futureWork.map((item, index) => <li key={item}><span>0{index + 1}</span>{item}</li>)}</ul>;
}

export function SyntheticCharacterExample() {
  return <div className="character-example">
    <div><span className="eyebrow">FICTIONAL CHARACTER EXAMPLE</span><p><code>Expected: 1A2B C3D4</code><br/><code>OCR read: 1A28 C3D4</code></p></div>
    <div className="character-confusion" aria-label="The illustrative confusion is B read as 8"><strong>B</strong><span>read as</span><strong>8</strong></div>
    <p className="table-note">Illustrative only; this is not copied from a source document or a measured failure. VIN rules exclude I, O, and Q, which can help flag implausible candidates.</p>
  </div>;
}
