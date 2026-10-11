import { Cpu, CircuitBoard, ScanLine, Bot, Braces } from 'lucide-react';
import type { Project } from '../data/projects';

export function ProjectVisual({ kind, compact = false }: { kind: Project['kind']; compact?: boolean }) {
  const Icon = { ocr: ScanLine, fpga: CircuitBoard, embedded: Cpu, robotics: Bot, software: Braces }[kind];
  return <div className={`project-visual visual-${kind}${compact ? ' compact' : ''}`} aria-hidden="true">
    <div className="visual-grid" />
    {kind === 'ocr' && <div className="doc-visual"><span>VEHICLE REGISTRATION · SYNTHETIC</span><i /><i /><i className="highlight" /><i /><small>VIN&nbsp;&nbsp; 1A2BC3D4E5F6G7H8J</small></div>}
    {kind === 'fpga' && <div className="logic-visual"><span>INPUT</span><b>FSM</b><span>OUTPUT</span><i /><i /></div>}
    {kind === 'embedded' && <div className="chip-visual"><span>MSP432</span><i>GPIO</i><i>UART</i><i>TIMER</i></div>}
    {kind === 'robotics' && <div className="robot-visual"><span className="joint"/><span className="arm"/><span className="joint j2"/><span className="arm arm2"/><span className="servo"/></div>}
    {kind === 'software' && <div className="code-visual"><span>Document</span><b>→</b><span>Chunker</span><b>→</b><span>Workspace</span></div>}
    <Icon className="visual-icon" strokeWidth={1.15} />
  </div>;
}

export function Pipeline({ items }: { items: string[] }) { return <div className="pipeline" aria-label={items.join(' then ')}>{items.map((item, index) => <div className="pipeline-step" key={item}><span>{String(index + 1).padStart(2, '0')}</span><b>{item}</b>{index < items.length - 1 && <i aria-hidden="true">→</i>}</div>)}</div>; }

export function MultiplierDiagram() { return <div className="multiplier-diagram" aria-label="Conceptual sequential multiplier datapath"><div className="md-input">Multiplicand<br/><b>A register</b></div><div className="md-input">Multiplier<br/><b>B register</b></div><div className="md-arrow">→</div><div className="md-compute"><b>Adder / shift datapath</b><span>partial product · accumulator</span></div><div className="md-arrow">→</div><div className="md-output">Result<br/><b>Product register</b></div><div className="md-controller"><span>CONTROL FSM</span><i>load</i><i>iterate</i><i>done</i></div></div>; }
