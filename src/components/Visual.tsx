import { Cpu, CircuitBoard, ScanLine, Bot, Braces, ArrowDown, ArrowRight } from 'lucide-react';
import type { Project } from '../data/projects';

export function ProjectVisual({ kind, compact = false }: { kind: Project['kind']; compact?: boolean }) {
  const Icon = { ocr: ScanLine, fpga: CircuitBoard, embedded: Cpu, robotics: Bot, software: Braces }[kind];
  return <div className={`project-visual visual-${kind}${compact ? ' compact' : ''}`} aria-hidden="true">
    <div className="visual-grid" />
    {kind === 'ocr' && <div className="doc-visual"><span>VEHICLE REGISTRATION · SYNTHETIC</span><i /><i /><i className="highlight" /><i /><small>VIN&nbsp;&nbsp; 1A2BC3D4E5F6G7H8J</small></div>}
    {kind === 'fpga' && <div className="logic-visual"><span>14-STATE MOORE FSM</span><div><b>14-OP ALU</b><b>8-STEP MUL</b></div><small>8-BIT OPERANDS · 16-BIT DISPLAY</small></div>}
    {kind === 'embedded' && <div className="chip-visual"><span>MSP432</span><i>GPIO</i><i>UART</i><i>TIMER</i></div>}
    {kind === 'robotics' && <div className="robot-visual"><span className="signal-node">ANALOG<br/>KEYPAD</span><b className="signal-arrow">→</b><span className="signal-node signal-mcu">ADC<br/>THRESHOLDS</span><b className="signal-arrow">→</b><span className="signal-node signal-servo">SERVO</span></div>}
    {kind === 'software' && <div className="code-visual"><span>Document</span><b>→</b><span>TextProcessor</span><b>→</b><span>Chunker</span><b>→</b><span>Workspace</span></div>}
    <Icon className="visual-icon" strokeWidth={1.15} />
  </div>;
}

export function Pipeline({ items }: { items: string[] }) { return <div className="pipeline" aria-label={items.join(' then ')}>{items.map((item, index) => <div className="pipeline-step" key={item}><span>{String(index + 1).padStart(2, '0')}</span><b>{item}</b>{index < items.length - 1 && <i aria-hidden="true">→</i>}</div>)}</div>; }

export function OcrProductionArchitecture() {
  const stages = [
    ['01', 'Mulkiya image', 'Registration-card image enters the local pipeline'],
    ['02', 'RapidOCR', 'Text is extracted locally'],
    ['03', 'Candidate generation', 'VIN-like strings are collected from OCR output'],
    ['04', 'Normalize & validate', '17 characters and allowed VIN characters'],
    ['05', 'VIN-specific correction', 'Edit distance, weighted confusions, known candidates'],
    ['06', 'Prediction & reports', 'Exact evaluation, CSV output, and debugging reports'],
  ];
  return <figure className="ocr-architecture" aria-labelledby="ocr-architecture-caption">
    <div className="ocr-architecture-grid">{stages.map(([number, title, note], index) => <div className="ocr-architecture-step" key={number}>
      <span>{number}</span><strong>{title}</strong><small>{note}</small>{index < stages.length - 1 && <i aria-hidden="true">→</i>}
    </div>)}</div>
    <div className="ocr-human-review"><b>Suspicious or uncertain candidates</b><span>Flagged for human review instead of being accepted automatically</span></div>
    <figcaption id="ocr-architecture-caption">Production architecture summarized from the documented project. OCR and validation run locally; this diagram does not expose company documents or real VINs.</figcaption>
  </figure>;
}

export function FpgaArchitectureDiagram() {
  return <figure className="fpga-architecture" aria-labelledby="fpga-architecture-caption">
    <div className="arch-lane arch-main-flow">
      <div className="arch-node arch-input"><span>USER INPUT</span><b>Switches & buttons</b><small>SW[7:0] · KEY[1:0]</small></div>
      <div className="arch-connector"><span>SW bus</span><ArrowRight aria-hidden="true"/></div>
      <div className="arch-node arch-datapath"><span>REGISTERED DATAPATH</span><b>Opcode · A · B</b><small>Three load-controlled registers</small></div>
      <div className="arch-connector"><span>14 operations</span><ArrowRight aria-hidden="true"/></div>
      <div className="arch-node arch-output"><span>RESULT PATH</span><b>Result register & display mux</b><small>HEX3–HEX0 · 16-bit value</small></div>
    </div>
    <div className="arch-control-row">
      <div className="arch-node arch-keypress"><span>KEY EVENT</span><b>Debouncer</b><small>Press/release → one-cycle Enter pulse</small></div>
      <div className="arch-connector"><span>Enter</span><ArrowRight aria-hidden="true"/></div>
      <div className="arch-node arch-controller"><span>MOORE CONTROLLER</span><b>14-state FSM</b><small>load_op · load_A · load_B · result_load</small></div>
      <div className="arch-connector"><span>mul_load · mul_step</span><ArrowRight aria-hidden="true"/></div>
      <div className="arch-node arch-multiplier"><span>SEQUENTIAL MULTIPLIER</span><b>8 × 8 unsigned shift-and-add</b><small>8 steps · 17-bit product register</small></div>
    </div>
    <div className="arch-feedback">
      <div className="arch-feedback-label"><ArrowDown aria-hidden="true"/><span>Operand A/B registers feed multiplier; its lower 16 product bits feed the display/result path during multiply.</span></div>
      <div className="arch-debug"><b>Debug output</b><span>HEX5–HEX4 show A · LED[7:0] show B</span></div>
    </div>
    <figcaption id="fpga-architecture-caption">Module roles and signals follow the repository RTL. The diagram describes data/control flow; it is not a timing waveform or a synthesis report.</figcaption>
  </figure>;
}
