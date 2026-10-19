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

export function OcrBaselineChart({ facts }: { facts: NonNullable<Project['verifiedResults']> }) {
  const matchCount = Number(facts.find(fact => fact.label === 'Exact VIN matches')?.value ?? 0);
  const imageCount = Number(facts.find(fact => fact.label === 'Images evaluated')?.value ?? 0);
  const percentage = imageCount ? matchCount / imageCount * 100 : 0;
  return <div className="baseline-chart">
    <div className="baseline-chart-top"><span>Initial exact-string baseline</span><strong>{matchCount} / {imageCount}</strong></div>
    <div className="baseline-track" role="img" aria-label={`${matchCount} exact matches from ${imageCount} images, ${percentage.toFixed(2)} percent`}><span style={{ width: `${percentage}%` }}/></div>
    <div className="baseline-chart-foot"><span>{percentage.toFixed(2)}% exact matches</span><span>{imageCount - matchCount} without an exact match</span></div>
  </div>;
}

export function SyntheticCharacterExample() {
  return <div className="character-example">
    <div><span className="eyebrow">FICTIONAL CHARACTER EXAMPLE</span><p><code>Expected: 1A2B C3D4</code><br/><code>OCR read: 1A28 C3D4</code></p></div>
    <div className="character-confusion" aria-label="The illustrative confusion is B read as 8"><strong>B</strong><span>read as</span><strong>8</strong></div>
    <p className="table-note">Illustrative only; this is not copied from a source document or a measured failure. VIN rules exclude I, O, and Q, which can help flag implausible candidates.</p>
  </div>;
}
